import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/products?search=${search}&category=${category}`,
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  }, [search, category]);

  useEffect(() => {
    const delay = setTimeout(() => {
      loadProducts();
    }, 400);

    return () => clearTimeout(delay);
  }, [loadProducts]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart");
      return;
    }
    const res = await api.post("/cart/add", { userId, productId });

    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0,
    );
    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-4 bg-white shadow-md border border-gray-100 rounded-2xl p-4 mb-10 sticky top-4 z-10"
        >
          <input
            type="text"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 outline-none text-sm"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 outline-none text-sm"
          >
            <option value="">All Categories</option>
            <option value="Laptops">Laptops</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Tablets">Tablets</option>
          </select>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            // Skeleton Loader (better UX than spinner)
            <motion.div
              key="skeleton"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white border border-gray-100 rounded-2xl p-4"
                >
                  <div className="h-40 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    {/* Image */}
                    <Link to={`/product/${product._id}`}>
                      <div className="h-48 bg-white flex items-center justify-center p-4">
                        <img
                          src={
                            product.image || "https://via.placeholder.com/300"
                          }
                          alt={product.title}
                          className="h-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                        {product.category || "General"}
                      </p>

                      <Link to={`/product/${product._id}`}>
                        <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-purple-600 transition">
                          {product.title}
                        </h2>
                      </Link>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-lg font-bold text-gray-900">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <button
                          onClick={() => addToCart(product._id)}
                          className="px-3 py-2 bg-gray-900 text-white text-xs rounded-lg hover:bg-purple-600 transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div className="col-span-full text-center py-20 text-gray-400">
                  No products found
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
