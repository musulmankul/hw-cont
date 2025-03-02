import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) => item.product.id === product.id
            );
            if (existingItem) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { product, quantity: 1 }];
            }
        });
    };

    const decreaseQuantity = (productId) => {
        setCartItems((prev) => {
            const foundItem = prev.find(
                (item) => item.product.id === productId
            );
            if (foundItem.quantity === 1) {
                return prev.filter((item) => item.product.id !== productId);
            } else {
                return prev.map((item) =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
        });
    };

    const increaseQuantity = (productId) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCartItems((prev) =>
            prev.filter((item) => item.product.id !== productId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const value = {
        cartItems,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
