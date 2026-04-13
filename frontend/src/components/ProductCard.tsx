import { Link } from "react-router-dom";
import type { Product } from "../types/type";
import { useCart } from "../context/cartContext";

const BASE_URL = "http://localhost:5000";

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const handleAddToCart = async () => {
    addToCart({ ...product, _id: String(product._id), quantity: 1 });

    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5000/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product: { ...product, quantity: 1 } }),
      });
    } catch (err) {
      console.error("Failed to add item to backend cart:", err);
    }
  };
  return (
   <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition hover:shadow-lg">
  <Link to={`/product/${product._id}`}>
    
    <div className="w-full h-64 overflow-hidden bg-gray-100">
      <img
        src={`${BASE_URL}${product.image}`}
        alt={product.name}
        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
      />
    </div>

    <div className="p-4 space-y-1">
      <h2 className="text-sm font-medium text-gray-800 line-clamp-2">
        {product.name}
      </h2>

      <p className="text-lg font-semibold text-black">
        ${product.price}
      </p>
    </div>

  </Link>

  <div className="p-4 pt-0">
    <button
      onClick={handleAddToCart}
      className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium transition hover:bg-gray-800 active:scale-[0.98]"
    >
      Add to cart
    </button>
  </div>
</div>
  );
}

export default ProductCard;
