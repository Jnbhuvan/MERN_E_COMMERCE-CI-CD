import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { Link } from "react-router";

function Productslist() {
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/delete/${id}`);
        loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    /* This container ensures the footer stays down */
    <div className="max-w-6xl mx-auto mt-12 px-4 min-h-[70vh] mb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Inventory Overview
          </h2>
          <p className="text-gray-500 mt-1">
            Manage, edit, and track your store's product listings.
          </p>
        </div>
        <Link
          to="/admin/products/add"
          className="bg-purple-600 text-white py-2.5 px-6 rounded-lg hover:bg-purple-700 shadow-lg hover:shadow-purple-200 transition-all duration-200 font-semibold flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add New Product
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
                  Product Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 text-center">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 text-center">
                  Stock Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-purple-50/30 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                          {product.title || "Untitled Product"}
                        </span>
                        <span className="text-xs text-gray-400 font-mono mt-0.5 uppercase">
                          ID: {product._id.slice(-6)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center font-semibold text-gray-700">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.stock > 5
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${product.stock > 5 ? "bg-green-500" : "bg-orange-500"}`}
                        ></span>
                        {product.stock} Units
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          to={`/admin/products/update/${product._id}`}
                          className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md hover:bg-purple-100 hover:text-purple-700 font-medium text-sm transition-all"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md hover:bg-red-100 hover:text-red-600 font-medium text-sm transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-gray-300 mb-2">
                        {/* Simple CSS Icon placeholder */}
                        <svg
                          className="w-12 h-12 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="box-open"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-400 italic">
                        No products in the database.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Productslist;
