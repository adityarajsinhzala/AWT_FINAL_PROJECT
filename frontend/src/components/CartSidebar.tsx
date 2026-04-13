import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
const CartSidebar = () => {
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <div className="border-2 rounded-lg p-4 w-72">
      <h2 className="text-lg font-bold mb-2">Cart Items</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-2">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm">
                  ${item.price} × {item.quantity}
                </p>
              </div>
              <div className="flex gap-1"></div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-4 border-t pt-2">
          <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
          <Link
            to="/checkout"
            className="block mt-2 text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};
export default CartSidebar;
