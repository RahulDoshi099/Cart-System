import React, { useState } from "react";
import "./CartItem.css";

function CartItem({ name, quantity, onIncrement, onDecrement, onDelete }) {
  return (
    <>
      <div className="cart-item">
        <h3 className="cart-item-title">{name}</h3> {/* Added a title */}
        <div className="cart-item-quantity"></div>
        <div>
          <button className="quantity-button" onClick={onDecrement}>
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button className="quantity-button" onClick={onIncrement}>
            +
          </button>
          <img
            onClick={onDelete}
            style={{ cursor: "pointer", width: "20px", height: "20px" }}
            src="\trash.png"
          />
        </div>
      </div>
    </>
  );
}

export default CartItem;
