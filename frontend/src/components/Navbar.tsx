import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { logged } = useAuth();

  return (
    <>
      {logged ? (
        <div className="flex bg-orange-200  w-full justify-between p-3">
          <div className="border-2 rounded-xl p-2">Ecommerce Website</div>
          <div className="mt-2">
            <Link
              className="border-2 rounded-lg p-2 m-2 transition hover:scale-110 hover:bg-orange-500 duration-300"
              to="/"
            >
              Home
            </Link>
            <Link
              className="border-2 rounded-lg p-2 m-2 transition hover:scale-110 hover:bg-orange-500 duration-300"
              to="/about"
            >
              About 
            </Link>
             <Link
              className="border-2 rounded-lg p-2 m-2 transition hover:scale-110 hover:bg-orange-500 duration-300"
              to="/contact"
            >
              Contact
            </Link>
            <Link
              className="border-2 rounded-lg p-2 m-2 transition hover:scale-110 hover:bg-orange-500 duration-300"
              to="/cart"
            >
              Cart
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex bg-orange-200  w-full justify-between p-3">
          <div className="border-2 rounded-xl p-2">Ecommerce Website</div>
          <div className="mt-2">
            <Link
              className="border-2 rounded-lg p-2 m-2 transition hover:scale-110 hover:bg-orange-500 duration-300"
              to="/"
            >
              Home
            </Link>
            <Link
              className="border-2 rounded-lg p-2 m-2 transition hover:scale-110 hover:bg-red-500 duration-300"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
