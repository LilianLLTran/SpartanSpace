import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';
import "./Home.css";

function Home() {
  // Array of image file names for the banner images
  const images = [
    '/images/1photo.jpg',
    '/images/2photo.jpg',
    '/images/3photo.jpg',
    '/images/4photo.jpg'
  ];

  // State to keep track of the current image index for the carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect hook to change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Array of product objects
  const products = [
    { id: "12321341", title: 'The Lean Startup', price: 29.99, rating: 5, image: "/images/product1.png" },
    { id: "49538094", title: "Kenwood Mix Stand Mixer", price: 239.99, rating: 4, image: "/images/product2.png" },
    { id: "4903850", title: "Samsung S23 FE 5G", price: 199.99, rating: 3, image: "/images/product3.png" },
    { id: "23445930", title: "Amazon Echo (3rd generation)", price: 98.99, rating: 5, image: "/images/product4.png" },
    { id: "3254354345", title: "New Apple iPad Pro", price: 539.90, rating: 4, image: "/images/product5.png" },
    { id: "90829332", title: "Samsung Curved Gaming Monitor", price: 874, rating: 4, image: "/images/product6.png" },
    { id: "2343543563", title: "VINGLI 6 Foot Plastic Folding Table", price: 59.99, rating: 4, image: "/images/product7.png" },
    { id: "953698393", title: "KDEWALT 20V MAX XR Reciprocating Saw", price: 110.00, rating: 3, image: "/images/product8.png" },
    { id: "92895285", title: "ECHOGEAR MaxMotion TV Wall Mount", price: 214, rating: 5, image: "/images/product9.png" },
    { id: "42443256", title: "Beats Solo 3 - Wireless Bluetooth", price: 74.99, rating: 3, image: "/images/product10.png" },
    { id: "23445930", title: "Liberty Lifestyle Christmas Tree", price: 238.99, rating: 4, image: "/images/product11.png" },
    { id: "45634646", title: "San Jose State Spartans Arch Sweatshirt", price: 29.90, rating: 5, image: "/images/product12.png" },
    { id: "21324252", title: "Fayquaze Portable Foldable Laptop Bed Table", price: 34.99, rating: 3, image: "/images/product13.png" },
    { id: "54363564", title: "San Jose State Spartans Adjustable Baseball Hat", price: 13.99, rating: 4, image: "/images/product14.png" },
    { id: "45675687", title: "San Jose State Spartans Pullover Hoodie", price: 39.90, rating: 5, image: "/images/product15.png" },
    { id: "5345346", title: "Portable Charger with Built-in Cables", price: 24.99, rating: 5, image: "/images/product16.png" },
    { id: "1242534", title: "39-Piece Household Tools Kit", price: 13.99, rating: 3, image: "/images/product17.png" },
    { id: "2353452", title: "MATEIN Travel Laptop Backpack", price: 29.90, rating: 4, image: "/images/product18.png" },
  ];

  return (
    <div className="home">
      <div className="home__container">
        {/* Banner image carousel */}
        <img className="home__image" src={images[currentImageIndex]} alt="Amazon Home" />

        {/* Product Rows */}
        <div className="home__row">
          {products.slice(0, 3).map(product => (
            <Link key={product.id} to={{ pathname: `/product/${product.id}`, state: product }}>
              <Product {...product} />
            </Link>
          ))}
        </div>

        <div className="home__row">
          {products.slice(3, 6).map(product => (
            <Link key={product.id} to={{ pathname: `/product/${product.id}`, state: product }}>
              <Product {...product} />
            </Link>
          ))}
        </div>

        <div className="home__row">
          {products.slice(6, 9).map(product => (
            <Link key={product.id} to={{ pathname: `/product/${product.id}`, state: product }}>
              <Product {...product} />
            </Link>
          ))}
        </div>

        <div className="home__row">
          {products.slice(9, 12).map(product => (
            <Link key={product.id} to={{ pathname: `/product/${product.id}`, state: product }}>
              <Product {...product} />
            </Link>
          ))}
        </div>

        <div className="home__row">
          {products.slice(12, 15).map(product => (
            <Link key={product.id} to={{ pathname: `/product/${product.id}`, state: product }}>
              <Product {...product} />
            </Link>
          ))}
        </div>

        <div className="home__row">
          {products.slice(15, 18).map(product => (
            <Link key={product.id} to={{ pathname: `/product/${product.id}`, state: product }}>
              <Product {...product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
