import React from "react";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../context/cartContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-10">

        <CartSidebar />

        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-8">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="border rounded-lg p-10 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border rounded-lg p-4 hover:shadow-sm transition"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.price} each
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-6">

                    {/* quantity controls */}
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          removeFromCart(item._id)
                        }
                        className="px-3 py-1 text-sm hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="px-4 text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          addToCart({ ...item, quantity: 1 })
                        }
                        className="px-3 py-1 text-sm hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* price */}
                    <div className="w-20 text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* remove */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-sm text-gray-400 hover:text-black"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* TOTAL SECTION */}
              <div className="border-t pt-6 mt-6 flex justify-between items-center">
                <p className="text-lg font-medium">Total</p>
                <p className="text-xl font-semibold">
                  ${total.toFixed(2)}
                </p>
              </div>

              <button className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                Checkout
              </button>

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;