import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from "react-currency-format";
import axios from './axios';
import { db } from './firebase';
import { doc, collection, setDoc } from "firebase/firestore"; // Import Firestore functions

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(null);

    // Fetch the clientSecret when the basket changes
    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const response = await axios({
                    method: 'post',
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`, // Total in cents
                });
                console.log("Fetched Client Secret:", response.data.clientSecret);
                setClientSecret(response.data.clientSecret); // Updated clientSecret
            } catch (err) {
                console.error("Failed to fetch client secret:", err);
            }
        };

        if (basket.length > 0) {
            console.log("Fetching client secret for basket:", basket);
            getClientSecret();
        }
    }, [basket]);

    console.log('The Secret Is >>>', clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        // Prevent `stripe.confirmCardPayment` from executing if clientSecret is null
        if (!clientSecret) {
            console.error("Client secret is null. Payment cannot proceed.");
            setError("An error occurred. Please try again.");
            setProcessing(false);
            return;
        }

        try {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (payload.error) {
                setError(`Payment failed: ${payload.error.message}`);
                setProcessing(false);
            } else {
                const { paymentIntent } = payload;

                // Firestore: Write order details
                const orderRef = doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id);
                await setDoc(orderRef, {
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                });

                setSucceeded(true);
                setError(null);
                setProcessing(false);

                dispatch({ type: "EMPTY_BASKET" }); // Clear basket

                history.replace("/orders");
            }
        } catch (error) {
            console.error("Error during payment submission:", error);
            setError("An error occurred while processing your payment.");
            setProcessing(false);
        }
    };

    const handleChange = (event) => {
        // Listen for changes in the CardElement and display any errors as the customer types
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} item(s)</Link>)
                </h1>
                {/* Delivery Address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>101 San fernando</p>
                        <p>San Jose, CA 95112</p>
                    </div>
                </div>

                {/* Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment Method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe Payment Form */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div className="payment__error">{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;


// import React, { useEffect, useState } from 'react';
// import './Payment.css';
// import { useStateValue } from './StateProvider';
// import CheckoutProduct from './CheckoutProduct';
// import { Link, useHistory } from 'react-router-dom';
// import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
// import { getBasketTotal } from './reducer';
// import CurrencyFormat from "react-currency-format";
// import axios from './axios';
// import { db } from './firebase';
// import { doc, collection, setDoc } from "firebase/firestore"; // Import Firestore functions

// function Payment() {
//     const [{ basket, user }, dispatch] = useStateValue();
//     const history = useHistory();

//     const stripe = useStripe();
//     const elements = useElements();

//     const [succeeded, setSucceeded] = useState(false);
//     const [processing, setProcessing] = useState("");
//     const [error, setError] = useState(null);
//     const [disabled, setDisabled] = useState(true);
//     const [clientSecret, setClientSecret] = useState(null);
//     const [cardError, setCardError] = useState(''); // Error state for empty card details

//     // Fetch the clientSecret when the basket changes
//     useEffect(() => {
//         const getClientSecret = async () => {
//             try {
//                 const response = await axios({
//                     method: 'post',
//                     url: `/payments/create?total=${getBasketTotal(basket) * 100}`, // Total in cents
//                 });
//                 setClientSecret(response.data.clientSecret); // Updated clientSecret
//             } catch (err) {
//                 setError("An error occurred while fetching client secret.");
//                 console.error("Failed to fetch client secret:", err);
//             }
//         };

//         if (basket.length > 0) {
//             getClientSecret();
//         }
//     }, [basket]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setProcessing(true);

//         // Check if card details are empty
//         const cardElement = elements.getElement(CardElement);
//         if (cardElement.isEmpty()) {
//             setCardError('Please enter card details');
//             setProcessing(false);
//             return;
//         }

//         if (!clientSecret) {
//             setError('An error occurred. Please try again.');
//             setProcessing(false);
//             return;
//         }

//         try {
//             const payload = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardElement,
//                 },
//             });

//             if (payload.error) {
//                 setError(`Payment failed: ${payload.error.message}`);
//                 setProcessing(false);
//             } else {
//                 const { paymentIntent } = payload;

//                 // Firestore: Write order details
//                 const orderRef = doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id);
//                 await setDoc(orderRef, {
//                     basket: basket,
//                     amount: paymentIntent.amount,
//                     created: paymentIntent.created,
//                 });

//                 setSucceeded(true);
//                 setError(null);
//                 setProcessing(false);

//                 dispatch({ type: "EMPTY_BASKET" }); // Clear basket
//                 history.replace("/orders");
//             }
//         } catch (error) {
//             setError("An error occurred while processing your payment.");
//             setProcessing(false);
//         }
//     };

//     const handleChange = (event) => {
//         // Listen for changes in the CardElement and display any errors as the customer types
//         setDisabled(event.empty);
//         setError(event.error ? event.error.message : "");
//         setCardError(''); // Clear the card error if the user starts typing
//     };

//     return (
//         <div className='payment'>
//             <div className='payment__container'>
//                 <h1>
//                     Checkout (<Link to="/checkout">{basket?.length} item(s)</Link>)
//                 </h1>
//                 {/* Delivery Address */}
//                 <div className='payment__section'>
//                     <div className='payment__title'>
//                         <h3>Delivery Address</h3>
//                     </div>
//                     <div className='payment__address'>
//                         <p>{user?.email}</p>
//                         <p>123 React Lane</p>
//                         <p>Fremont, CA</p>
//                     </div>
//                 </div>

//                 {/* Review Items */}
//                 <div className='payment__section'>
//                     <div className='payment__title'>
//                         <h3>Review Items and Delivery</h3>
//                     </div>
//                     <div className='payment__items'>
//                         {basket.map(item => (
//                             <CheckoutProduct
//                                 id={item.id}
//                                 title={item.title}
//                                 image={item.image}
//                                 price={item.price}
//                                 rating={item.rating}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* Payment Method */}
//                 <div className='payment__section'>
//                     <div className='payment__title'>
//                         <h3>Payment Method</h3>
//                     </div>
//                     <div className="payment__details">
//                         {/* Stripe Payment Form */}
//                         <form onSubmit={handleSubmit}>
//                             <CardElement onChange={handleChange} />

//                             {/* Show error if card details are missing */}
//                             {cardError && <div className="payment__error">{cardError}</div>}

//                             <div className='payment__priceContainer'>
//                                 <CurrencyFormat
//                                     renderText={(value) => (
//                                         <h3>Order Total: {value}</h3>
//                                     )}
//                                     decimalScale={2}
//                                     value={getBasketTotal(basket)}
//                                     displayType={"text"}
//                                     thousandSeparator={true}
//                                     prefix={"$"}
//                                 />
//                                 <button disabled={processing || disabled || succeeded}>
//                                     <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
//                                 </button>
//                             </div>

//                             {error && <div className="payment__error">{error}</div>}
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Payment;
