import "./index.css";

export function Filter({ onFilter }) {
    return (
        <div className="filter-buttons">
            <button onClick={() => onFilter("All")}>All</button>
            <button onClick={() => onFilter("men's clothing")}>
                Men's Clothing
            </button>
            <button onClick={() => onFilter("women's clothing")}>
                Women's Clothing
            </button>
            <button onClick={() => onFilter("electronics")}>Electronics</button>
            <button onClick={() => onFilter("jewelery")}>Jewelery</button>
        </div>
    );
}
