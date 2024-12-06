import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';
import { useHistory } from 'react-router-dom'; // useHistory for React Router v5

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory(); // For redirecting to ProductDetail page

  const addToBasket = () => {
    // Dispatch action to add item to basket
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });

    // Redirect to ProductDetail page after adding to the basket
    history.push(`/product/${id}`);
  };

  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title">{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating).fill().map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
      </div>

      <img className="product__image" src={image} alt={title} />

      <button onClick={addToBasket} className="product__button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
