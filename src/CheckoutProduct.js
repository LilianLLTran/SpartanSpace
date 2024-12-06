// import React from 'react';
// import './CheckoutProduct.css';
// import { useStateValue } from './StateProvider';

// function CheckoutProduct({id, image, title, price, rating, hideButton}) {
//     const [{ basket }, dispatch] = useStateValue();

//     const removeFromBasket = () => {
//         dispatch({
//             type:"REMOVE_FROM_BASKET",
//             id: id,
//         })
//     }

//   return (
//     <div className='checkoutProduct'>
//         <img className = 'checkoutProduct__image' src={image} />

//         <div className='checkoutProduct__info'>
//             <p className='checkoutProduct__title'>{title}</p>
//             <p className='checkoutProduct__price'>
//                 <small>$</small>
//                 <strong>{price}</strong>
//             </p>
//             <div className="checkoutProduct__rating">
//                 {Array(rating)
//                 .fill()
//                 .map((_, i) => (
//                     <p>⭐</p>
//                 ))}
//             </div>
//             {!hideButton && (
//             <button onClick={removeFromBasket}>Remove fron Basket</button>)}
//         </div>
//     </div>
//   )
// }

// export default CheckoutProduct


import React, { useState } from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({id, image, title, price, rating, hideButton}) {
    const [{ basket }, dispatch] = useStateValue();
    const [showPopup, setShowPopup] = useState(false);

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        });

        // Show the popup notification
        setShowPopup(true);

        // Hide the popup after 2 seconds
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    }

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} alt={title} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p key={i}>⭐</p>
                    ))}
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>

            {/* Popup notification */}
            {showPopup && (
                <div className="popup">
                    <p>Product Removed from Basket</p>
                </div>
            )}
        </div>
    );
}

export default CheckoutProduct;
