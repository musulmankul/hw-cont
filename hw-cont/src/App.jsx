import { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { ProductContainer } from "./containers/ProductContainer";
import { Cart } from "./components/Cart";
import "./index.css";

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isCartOpen ? "hidden" : "auto";
    }, [isCartOpen]);

    return (
        <CartProvider>
            <div className="app-layout">
                <ProductContainer openCart={() => setIsCartOpen(true)} />
            </div>

            {isCartOpen && (
                <>
                    <div
                        className="cart-overlay"
                        onClick={() => setIsCartOpen(false)}
                    />

                    <div className="cart-drawer">
                        <button
                            className="close-btn"
                            onClick={() => setIsCartOpen(false)}
                        >
                            ✖
                        </button>
                        <h1 style={{ marginBottom: "40px" }}>Cart</h1>
                        <Cart />
                    </div>
                </>
            )}
        </CartProvider>
    );
}

export default App;
