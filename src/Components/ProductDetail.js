import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css'; // Ensure this CSS file exists and is correctly linked

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // Fetch product details based on the product ID
  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product details!', error);
      });
  }, [id]);

  // Add product to cart
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.id === product.id);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`Product ${id} added to cart`);
  };

  // Navigate back to the product listing page
  const handleBackClick = () => {
    navigate('/');
  };

  // Display a loading message if the product data is not yet available
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <div className="product-image-slider">
        <img src={product.image} alt={product.title} className="main-image" />
        {product.additionalImages && product.additionalImages.length > 0 && (
          <div className="additional-images">
            {product.additionalImages.map((img, index) => (
              <img key={index} src={img} alt={`${product.title} ${index + 1}`} className="additional-image" />
            ))}
          </div>
        )}
      </div>

      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>

      <div className="specifications">
        <h3>Specifications:</h3>
        <ul>
          {product.specifications && product.specifications.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      </div>

      <div className="reviews">
        <h3>Reviews:</h3>
        {product.reviews && product.reviews.map((review, index) => (
          <div key={index}>
            <strong>{review.user}</strong>: {review.comment}
          </div>
        ))}
      </div>

      <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
      <button onClick={handleBackClick} className="back-button">Back to Products</button>
      <button onClick={() => navigate('/cart')} className="view-cart-button">View Cart</button>
    </div>
  );
}

export default ProductDetail;
