import product from "../models/Products.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const products = await product.create(req.body);
    res.json({
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.error("Product creation error:", error);
    console.error("Error stack:", error.stack);
    console.error("Error message:", error.message);

    // Check if it's a Mongoose validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation error",
        errors: messages,
      });
    }

    res.status(500).json({
      message: "Failed to create product",
      error: error.message || error.toString(),
      stack: error.stack,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    const products = await product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

//update a product

export const updateProduct = async (req, res) => {
  try {
    const updated = await product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: "Product updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

//delete a product

export const deleteProduct = async (req, res) => {
  try {
    await product.findByIdAndDelete(req.params.id);
    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};
