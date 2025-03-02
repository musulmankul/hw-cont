import { useState, useEffect, useContext } from "react";
import { Filter } from "../../components/Filter";
import { ProductCard } from "../../components/ProductCard";
import { CartContext } from "../../context/CartContext";
import "./index.css";

export function ProductContainer({ openCart }) {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { cartItems } = useContext(CartContext);
    const totalQuantity = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => {
                setProducts(json);
                setFilteredProducts(json);
            })
            .finally(() => setLoading(false));
    }, []);

    const filterProducts = (category) => {
        if (category === "All") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((product) => product.category === category)
            );
        }
    };

    return (
        <div className="product-container">
            <div className="filter-cart-row">
                <Filter onFilter={filterProducts} />

                <button className="cart-button" onClick={openCart}>
                    Cart
                </button>
            </div>

            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="allCards">
                    {filteredProducts.map((product) => (
                        <ProductCard data={product} key={product.id} />
                    ))}
                </div>
            )}
        </div>
    );
}
