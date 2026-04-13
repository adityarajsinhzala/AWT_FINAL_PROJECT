import Product from "../model/product.js";

// GET /products
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err });
  }
};


// GET /product/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};


// POST /product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const product = new Product({
      name,
      description,
      price,
      image
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

  } catch (err) {
    res.status(500).json({ message: "Failed to create product", error: err });
  }
};


// POST /product/bulk
export const createProductBulk = async (req, res) => {
  try {

    const products = await Product.insertMany(req.body);
    res.status(201).json(products);

  } catch (err) {
    res.status(500).json({
      message: "couldn't create bulk products",
      error: err
    });
  }
};


// PUT /product/:id
export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, description, price, image } = req.body;

    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err });
  }
};


// DELETE /product/:id
export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.status(204).send();

  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err });
  }
};