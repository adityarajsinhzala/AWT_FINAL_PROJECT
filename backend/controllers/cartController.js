import Cart from "../model/Cart.js";

// GET /cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is missing" });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);

  } catch (err) {
    console.error("err fetching cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// PUT /cart/additem
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { product } = req.body;

    if (!product) {
      return res.status(400).json({ message: "Product is required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [
          {
            product: product._id,
            quantity: product.quantity || 1
          }
        ]
      });
    } else {

      const existingItem = cart.items.find(
        (item) => item.product.toString() === product._id.toString()
      );

      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
        cart.items.push({
          product: product._id,
          quantity: product.quantity || 1
        });
      }

      await cart.save();
    }

    res.json(cart);

  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};


// DELETE /cart/remove
export const removeFromCart = async (req, res) => {
  try {

    const { userId, productId } = req.body;

    await Cart.updateOne(
      { userId },
      {
        $pull: { items: { product: productId } }
      }
    );

    res.json({ message: "Item removed from cart" });

  } catch (err) {
    console.error("err deleting from cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};