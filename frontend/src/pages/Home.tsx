import Navbar from "../components/Navbar";
import { useProducts } from "../context/productContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products } = useProducts();
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-4 p-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
