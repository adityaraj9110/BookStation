import { useEffect } from "react";
import { useCart } from "../../CartContext";
import "./addtocart.css";

const CartPage = () => {
  const { cartItems, removeFromCart, setCartItems } = useCart();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("borrowItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleRemoveFromCart = (index) => {
    removeFromCart(index);
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    localStorage.setItem("borrowItems", JSON.stringify(updatedCartItems));
  };

  return (
    <div className="cart-page">
      <h1>Borrowed list</h1>
      {cartItems.length === 0 ? (
        <p>You have not borrowed anything.</p>
      ) : (
        <>
          <p>Total items: {cartItems.length}</p>
          <div className="cart-items">
            {cartItems.map((book, index) => (
              <div className="cart-item" key={index}>
                <img src={book.img} alt={book.title} />
                <div className="details">
                  <h2>{book.title}</h2>
                  <p>{book.authorname}</p>
                </div>
                <button
                  className="remove_btn"
                  onClick={() => handleRemoveFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
