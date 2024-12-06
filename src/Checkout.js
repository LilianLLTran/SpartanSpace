// import React from 'react';
// import { useHistory } from 'react-router-dom';  // Import useHistory for React Router v5
// import "./Checkout.css";
// import Subtotal from './Subtotal';
// import { useStateValue } from './StateProvider';
// import CheckoutProduct from './CheckoutProduct';

// function Checkout() {
//     const [{ basket, user }, dispatch] = useStateValue();
//     const history = useHistory();  // Create history function

//     // Function to handle button click
//     const handleCheckoutClick = () => {
//         if (basket.length === 0) {
//             alert("Your basket is empty! Add items before proceeding.");
//         } else {
//             history.push('/payment');  // Use history.push() to navigate
//         }
//     };

//     return (
//         <div className="checkout">
//             <div className="checkout__left">
//                 <img className='checkout__ad' src="/images/checkout_ad.png" alt=""/>

//                 <div>
//                     <h3>Hello, {user?.email}</h3>
//                     <h2 className="checkout__title">Your Shopping Basket</h2>
//                     {basket.length === 0 ? (
//                         <p>Your basket is empty. Add items to the basket to proceed with checkout.</p>
//                     ) : (
//                         basket.map(item => (
//                             <CheckoutProduct
//                                 key={item.id}
//                                 id={item.id}
//                                 title={item.title}
//                                 image={item.image}
//                                 price={item.price}
//                                 rating={item.rating}
//                             />
//                         ))
//                     )}
//                 </div>
//             </div>
            
//             {/* Right side: Subtotal and Checkout Button */}
//             <div className="checkout__right">
//                 <Subtotal />
//                 <button className="checkout__button" onClick={handleCheckoutClick}>
//                     Proceed to Checkout
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Checkout;


import React, { useEffect, useState } from 'react';  // Import useState and useEffect
import { useHistory } from 'react-router-dom';  // Import useHistory for React Router v5
import "./Checkout.css";
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();  // Create history function
    const [adImage, setAdImage] = useState(""); // State to hold the random ad image

    // Array of ad images
    const adImages = [
        '/images/ad1.png',
        '/images/ad2.png',
        '/images/ad3.png',
        '/images/ad4.png'
    ];

    // Function to select a random ad image
    const getRandomAdImage = () => {
        const randomIndex = Math.floor(Math.random() * adImages.length);  // Random index
        setAdImage(adImages[randomIndex]);  // Set the random ad image to state
    };

    // Call getRandomAdImage on component mount
    useEffect(() => {
        getRandomAdImage();  // Get a random ad image when the component is mounted
    }, []);

    // Function to handle button click
    const handleCheckoutClick = () => {
        if (basket.length === 0) {
            alert("Your basket is empty! Add items before proceeding.");
        } else {
            history.push('/payment');  // Use history.push() to navigate
        }
    };

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className='checkout__ad' src={adImage} alt="Ad" />

                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout__title">Your Shopping Basket</h2>
                    {basket.length === 0 ? (
                        <p>Your basket is empty. Add items to the basket to proceed with checkout.</p>
                    ) : (
                        basket.map(item => (
                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))
                    )}
                </div>
            </div>
            
            {/* Right side: Subtotal and Checkout Button */}
            <div className="checkout__right">
                <Subtotal />
                <button className="checkout__button" onClick={handleCheckoutClick}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default Checkout;
