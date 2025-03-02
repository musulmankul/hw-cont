import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./index.css";

export function ProductCard({ data }) {
    const { id, image, category, title, price } = data;
    const { cartItems, addToCart, decreaseQuantity, increaseQuantity } =
        useContext(CartContext);

    const cartItem = cartItems.find((item) => item.product.id === id);
    const quantity = cartItem?.quantity || 0;
    const displayPrice = quantity > 0 ? (price * quantity).toFixed(2) : price;

    return (
        <div className="product-card">
            <div className="header">
                <img className="image" width="200" src={image} alt={title} />
                <div className="category">{category}</div>
                <h4 className="title">{title}</h4>
            </div>

            <div className="footer">
                <div className="price">${displayPrice}</div>
                {quantity === 0 ? (
                    <button className="btn" onClick={() => addToCart(data)}>
                        Add to cart
                    </button>
                ) : (
                    <div className="quantity-wrapper">
                        <button
                            className="quantity-btn"
                            onClick={() => decreaseQuantity(id)}
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            className="quantity-btn"
                            onClick={() => increaseQuantity(id)}
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
