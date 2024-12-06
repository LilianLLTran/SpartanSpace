// import React, { useEffect, useState } from 'react';
// import './ProductDetail.css';
// import { useParams } from 'react-router-dom'; // To access product ID from the URL
// import { useStateValue } from './StateProvider';

// function ProductDetail() {
//   const { id } = useParams(); // Get product ID from URL
//   const [{ basket }] = useStateValue(); // Access the basket from global state
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     // Find the product from basket based on the ID
//     const foundProduct = basket.find((item) => item.id === id);
//     if (foundProduct) {
//       setProduct(foundProduct); // Set the product in local state
//     } else {
//       console.log('Product not found');
//     }
//   }, [id, basket]); // Re-run when basket or product ID changes

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="productDetail">
//       <img src={product.image} alt={product.title} className="productDetail__image" />
//       <div className="productDetail__info">
//         <h1>{product.title}</h1>
//         <p className="productDetail__price">${product.price}</p>
//         <p className="productDetail__description">{product.description}</p>
//         <div className="productDetail__rating">
//           {Array(product.rating).fill().map((_, index) => (
//             <span key={index}>⭐</span>
//           ))}
//         </div>
//         <button className="productDetail__addButton">Add to Cart</button>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from 'react';
// import './ProductDetail.css';
// import { useLocation } from 'react-router-dom'; // Import useLocation to get the passed state
// import { useStateValue } from './StateProvider'; // Assuming you are using a global state

// function ProductDetail() {
//   const location = useLocation(); // Get the location object
//   const product = location.state; // Access the product data from the location state

//   const [{ basket }, dispatch] = useStateValue(); // Access global state and dispatch
//   const [isInBasket, setIsInBasket] = useState(false); // Local state to check if product is already in basket

//   // Function to add product to basket
//   const addToBasket = () => {
//     dispatch({
//       type: 'ADD_TO_BASKET',
//       item: product,
//     });
//     setIsInBasket(true); // Mark as added to basket
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="productDetail">
//       <img src={product.image} alt={product.title} className="productDetail__image" />
//       <div className="productDetail__info">
//         <h1>{product.title}</h1>
//         <p className="productDetail__price">${product.price}</p>
//         <p className="productDetail__description">{product.description}</p>
//         <div className="productDetail__rating">
//           {Array(product.rating).fill().map((_, index) => (
//             <span key={index}>⭐</span>
//           ))}
//         </div>

//         <button
//           className="productDetail__addButton"
//           onClick={addToBasket}
//           disabled={isInBasket} // Disable if the product is already in the basket
//         >
//           {isInBasket ? 'Added to Cart' : 'Add to Cart'}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;

import React, { useState } from 'react';
import './ProductDetail.css';
import { useLocation, useHistory } from 'react-router-dom'; // Import useHistory for older versions
import { useStateValue } from './StateProvider';

function ProductDetail() {
  const location = useLocation(); // Get the location object
  const product = location.state; // Access the product data from the location state

  const [{ basket }, dispatch] = useStateValue(); // Access global state and dispatch
  const [isInBasket, setIsInBasket] = useState(false); // Local state to check if product is already in basket
  const history = useHistory(); // Hook to navigate programmatically

  // Function to add product to basket
  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: product,
    });
    setIsInBasket(true); // Mark as added to basket
  };

  // Function to handle the "Go Back" button
  const handleGoBack = () => {
    history.push('/'); // Navigate back to the Home page using history.push()
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="productDetail">
      <img src={product.image} alt={product.title} className="productDetail__image" />
      <div className="productDetail__info">
        <h1>{product.title}</h1>
        <p className="productDetail__price">${product.price}</p>
        <p className="productDetail__description">{product.description}</p>
        <div className="productDetail__rating">
          {Array(product.rating).fill().map((_, index) => (
            <span key={index}>⭐</span>
          ))}
        </div>

        <button
          className="productDetail__addButton"
          onClick={addToBasket}
          disabled={isInBasket} // Disable if the product is already in the basket
        >
          {isInBasket ? 'Added to Cart' : 'Add to Cart'}
        </button>

        {/* Go Back Button */}
        <button
          className="productDetail__goBackButton"
          onClick={handleGoBack} // Handle navigation to the home page
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
