import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/cartContext";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="mt-3">
          <Link className="border-2 rounded p-1" to="/">
            ⬅️ Go back
          </Link>
          <h1>Product not found</h1>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
  addToCart({
    _id: product._id,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.image,
  });
};

  return (
    <>
      <Navbar />
      <div className="mt-3 p-4">
        <Link className="border-2 rounded p-1" to="/">
          ⬅️ Go back
        </Link>
        <div className="mt-4 flex">
          <img src={product.image} alt={product.name} className="w-64 mr-8" />
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="mt-2">{product.description}</p>
            <p className="mt-2 font-bold text-xl">${product.price}</p>
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;