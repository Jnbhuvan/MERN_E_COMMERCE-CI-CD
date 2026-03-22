// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router";

// export default function AddProduct() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     category: "",
//     image: "",
//     stock: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/products/add", form);
//       alert("Product added successfully!");
//       navigate("/admin/products");
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
//       <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
//       <form classname="space-y-3" onSubmit={handleSubmit}>
//         {Object.keys(form).map((key) => {
//           <input
//             key={key}
//             name={key}
//             value={form[key]}
//             onChange={handleChange}
//             placeholder={key}
//             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />;
//         })}

//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-2 rounded-md
//         hover:bg-green-700 active:scale-[0.98]
//         transition duration-200 font-medium"
//         >
//           Add products
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/add", form);
      // Optional: replace alert with a toast later
      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4 min-h-[70vh] mb-20">
      {/* Breadcrumb / Back Link */}
      <Link
        to="/admin/products"
        className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1 mb-6"
      >
        ← Back to Product List
      </Link>

      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gray-50/50 p-6 border-b border-gray-100">
          <h2 className="text-2xl font-extrabold text-gray-900">
            Add New Product
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details to list a new item in your storefront.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title - Full Width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Premium Wireless Headphones"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                required
              />
            </div>

            {/* Price & Stock - Side by Side */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="e.g. 50"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                required
              />
            </div>

            {/* Category & Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Electronics, Apparel, etc."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://image-link.com"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
            </div>

            {/* Description - Full Width Textarea */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the product features..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 mt-4 rounded-xl font-bold text-lg hover:bg-purple-700 shadow-lg hover:shadow-purple-200 active:scale-[0.99] transition-all duration-200"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
