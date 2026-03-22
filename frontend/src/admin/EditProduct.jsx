import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "image",
    "stock",
  ];

  const loadProduct = useCallback(async () => {
    try {
      const res = await api.get("/products");
      const product = res.data.find(
        (p) => (p._id || p.id).toString() === id.toString(),
      );
      if (product) {
        setForm(product);
      }
    } catch (error) {
      console.error("Error loading product:", error);
    }
  }, [id]);
  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/update/${id}`, form);
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {allowedFields.map(
          (key) =>
            allowedFields.includes(key) && (
              <input
                key={key}
                name={key}
                value={form[key] || ""}
                onChange={handleChange}
                placeholder={key}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ),
        )}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-green-700 active:scale-[0.98] transition duration-200 font-medium"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
