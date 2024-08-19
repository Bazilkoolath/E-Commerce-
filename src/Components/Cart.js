import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css'; // Ensure this CSS file exists and is correctly linked

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart from localStorage or API (for demonstration, using localStorage)
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Update item quantity
  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Proceed to checkout
  const handleCheckout = () => {
    // Navigate to the checkout page (assuming it's set up at '/checkout')
    navigate('/checkout');
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p><strong>Price:</strong> ${item.price}</p>
                <p>
                  <strong>Quantity:</strong>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                </p>
                <button onClick={() => handleRemove(item.id)} className="remove-button">Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Total: ${calculateTotal()}</h2>
            <button onClick={handleCheckout} className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
      <button onClick={() => navigate('/')} className="continue-shopping-button">Continue Shopping</button>
    </div>
  );
}

export default CartPage;
