import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  // Load cart + addresses
  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    api.get(`/cart/${userId}`).then((res) => setCart(res.data));
    api.get(`/address/${userId}`).then((res) => {
      setAddresses(res.data);
      setSelectedAddress(res.data[0]); // default select
    });
  }, []);

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
        <div className="rounded-3xl bg-white shadow-lg p-10 flex items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
          <span className="text-gray-700 text-lg font-medium">
            Loading checkout...
          </span>
        </div>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  // PLACE ORDER + CLEAR CART
  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address before placing the order.");
      return;
    }

    const res = await api.post("/order/place", {
      userId,
      address: selectedAddress,
    });

    navigate(`/order-success/${res.data.orderId}`);
  };

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg border border-gray-200">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
              <p className="mt-2 text-gray-600 max-w-2xl">
                Review your delivery address and order summary before placing
                your order.
              </p>
            </div>
            <div className="rounded-3xl bg-indigo-600/10 px-5 py-4 text-indigo-700 font-semibold border border-indigo-200">
              <p className="text-sm uppercase tracking-wider">Items</p>
              <p className="text-2xl">{itemCount}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Select Delivery Address
                  </h2>
                  <p className="text-sm text-gray-500">
                    Choose the address you want your order delivered to.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/checkout-address")}
                  className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
                >
                  Edit Addresses
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                  <p className="text-gray-600 font-medium mb-2">
                    No saved addresses found.
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Add an address on the address page before proceeding.
                  </p>
                  <button
                    onClick={() => navigate("/checkout-address")}
                    className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((addr) => {
                    const selected = selectedAddress?._id === addr._id;
                    return (
                      <label
                        key={addr._id}
                        className={`group block cursor-pointer rounded-3xl border p-5 transition ${
                          selected
                            ? "border-indigo-500 bg-indigo-50 shadow-sm"
                            : "border-gray-200 bg-white hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input
                            type="radio"
                            name="address"
                            checked={selected}
                            onChange={() => setSelectedAddress(addr)}
                            className="mt-1 h-5 w-5 text-indigo-600 accent-indigo-600"
                          />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-lg font-semibold text-gray-900">
                                {addr.fullName}
                              </span>
                              {selected && (
                                <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                                  Selected
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 leading-6">
                              {addr.addressLine}, {addr.city}, {addr.state}{" "}
                              {addr.pincode}
                            </p>
                            <p className="mt-3 text-sm text-gray-500">
                              Phone: {addr.phone}
                            </p>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-indigo-600">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <button
                onClick={placeOrder}
                className="w-full rounded-3xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/10 transition hover:bg-indigo-700"
              >
                Place Order (COD)
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="mt-3 w-full rounded-3xl border border-gray-200 bg-white px-5 py-3 text-base font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back to Cart
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
