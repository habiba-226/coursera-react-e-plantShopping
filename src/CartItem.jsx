// CartItem.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, incrementQuantity, decrementQuantity } from './CartSlice';
import { Link } from 'react-router-dom';

const CartItem = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const getItemPrice = (item) => parseFloat(item.price) * item.quantity;

  const handleIncrement = (item) => dispatch(incrementQuantity(item));
  const handleDecrement = (item) => dispatch(decrementQuantity(item));
  const handleRemove = (id) => dispatch(removeItem(id));

  const totalCost = cart.reduce((total, item) => total + getItemPrice(item), 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <p>Total items: {totalItems}</p>
      <p>Total cost: ${totalCost.toFixed(2)}</p>
      <button onClick={() => alert('Coming Soon')}>Checkout</button>
      <Link to="/products">
        <button>Continue Shopping</button>
      </Link>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div>{item.name}</div>
            <div>Price: ${item.price}</div>
            <div>Subtotal: ${(item.price * item.quantity).toFixed(2)}</div>
            <button onClick={() => handleIncrement(item)}>+</button>
            <button onClick={() => handleDecrement(item)} disabled={item.quantity <= 1}>-</button>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItem;
