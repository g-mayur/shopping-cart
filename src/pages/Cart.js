import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import RemoveShoppingCartSharpIcon from '@mui/icons-material/RemoveShoppingCartSharp';

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      const newTotalAmount = cart.reduce(
        (accumulator, currentValue) => accumulator + parseFloat(currentValue.price),
        0
      );
      setTotalAmount(newTotalAmount);
    }
  }, [cart]);

  return (
    <>
      {cart.length > 0 ? (
        <div className="grid md:grid-cols-2 max-w-screen-2xl mx-auto p-3 mt-4 gap-5">
          <div className="flex flex-col justify-center items-between">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary-wrapper">
            <div className="flex flex-col justify-center">
              <h1 className="font-semibold text-xl text-blue-800 mb-4">YOUR CART SUMMARY</h1>
              <p>
                <span className="text-gray-700 font-semibold">Total Items</span>: {cart.length}
              </p>
              <p>
                <span className="text-gray-700 font-semibold">Total Amount</span>:{" "}
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalAmount || 0)}
              </p>
              <button className="bg-blue-700 hover:bg-blue-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-blue-600 font-bold hover:text-blue-700 p-3">
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <RemoveShoppingCartSharpIcon sx={{ fontSize: 150 }} className="text-slate-200" />
          <h1 className="text-gray-700 font-medium text-2xl mb-2">Your cart is empty!</h1>
          <Link to={"/"}>
            <button className="bg-blue-700 hover:bg-blue-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-blue-600 font-semibold hover:text-blue-700 p-3">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;