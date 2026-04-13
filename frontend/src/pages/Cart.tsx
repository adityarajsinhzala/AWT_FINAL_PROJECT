import React from "react";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../context/cartContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <>
      <Navbar />

      <div className="flex max-w-5xl mx-auto px-6 py-10">
        <CartSidebar />

        <div className="flex-1 ml-16">
          <h1 className="text-xl font-medium mb-6">Cart</h1>

          {cart.length === 0 ? (
            <div className="text-gray-500 text-sm">Your cart is empty</div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      className="px-2 py-1 text-sm border rounded hover:bg-gray-100">
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-xs text-gray-500 hover:text-black">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;