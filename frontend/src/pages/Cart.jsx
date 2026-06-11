import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  //Load cart data
  const loadCart = useCallback(async () => {
    if (!userId) {
      setCart({ items: [] });
      return;
    }
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error("Error loading cart:", error);
      setCart({ items: [] });
    }
  }, [userId]);

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [loadCart]);

  const removeItem = async (productId) => {
    await api.post(`/cart/remove`, { userId, productId });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  //Update item quantity
  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }

    await api.post(`/cart/update`, { userId, productId, quantity });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!cart) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-600">
            {cart.items.length} {cart.items.length === 1 ? "item" : "items"} •{" "}
            {itemCount} {itemCount === 1 ? "unit" : "units"}
          </p>
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-lg font-medium mb-2">
              Your cart is empty
            </p>
            <p className="text-gray-500 mb-6">
              Start shopping to add items to your cart.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.productId._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-indigo-200 transition-all duration-300"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                          <img
                            src={item.productId.image}
                            alt={item.productId.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.productId.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="text-sm font-medium text-gray-600">
                            Unit Price:
                          </span>
                          <span className="text-lg font-bold text-indigo-600">
                            ₹{item.productId.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-gray-50 w-fit px-1 py-1 rounded-lg border border-gray-200">
                          <button
                            onClick={() =>
                              updateQty(item.productId._id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition-all duration-200 active:scale-95"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQty(item.productId._id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition-all duration-200 active:scale-95"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex flex-col items-end justify-between pt-2 sm:pt-0">
                        <div className="text-right mb-4 sm:mb-0">
                          <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                          <p className="text-2xl font-bold text-gray-900">
                            ₹{(item.productId.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId._id)}
                          className="w-full sm:w-auto bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm border border-red-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-20">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  Order Summary
                </h2>

                {/* Summary Items */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Items ({itemCount}):</span>
                    <span className="font-semibold">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-3xl font-bold text-indigo-600">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 text-right">
                    Inclusive of all taxes
                  </p>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate("/checkout-address")}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 text-base shadow-md hover:shadow-lg active:scale-98"
                >
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
