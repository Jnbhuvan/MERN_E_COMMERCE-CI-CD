import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { useParams } from "react-router";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProducts] = useState(null);

  const loadProduct = useCallback(async () => {
    const res = await api.get(`/products/`);
    const products = res.data.find((item) => item._id === id);
    setProducts(products);
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart");
      return;
    }
    try {
      await api.post("/cart/add", { userId, productId: product._id });
      window.dispatchEvent(new Event("cartUpdated"));
      alert("Item added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain bg-white rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-4">${product.price}</p>

      <button
        onClick={addToCart}
        className="mt-6 w-full md:w-1/2 bg-black text-white py-3 rounded-lg hover:bg-purple-950 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
