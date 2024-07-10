import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext.jsx";
import Button from "../UI/Button";
import userProgressContext from "../store/userProgressContext.jsx";
export default function Cart() {
  const ctxCart = useContext(CartContext);
  const ctxUserProgress = useContext(userProgressContext);
  const totalPrice = ctxCart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  function handleCloseCart() {
    ctxUserProgress.hideCart();
    console.log(ctxUserProgress);
  }
  function handleAddItemToCart(item) {
    ctxCart.addItem(item);
  }
  function handleDeleteItemFromCart(id) {
    ctxCart.deleteItem(id);
  }
  function handleCheckoutClick() {
    ctxUserProgress.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={ctxUserProgress.progress === "cart"}
      onClose={ctxUserProgress.progress === "cart" ? handleCloseCart : null}
    >
      {ctxCart.items.length < 1 && <h2>No Items in cart</h2>}
      {ctxCart.items.length > 0 && (
        <ul className="">
          {ctxCart.items.map((item) => (
            <li key={item.id} className="cart-item ">
              <p>
                {item.name} - {item.quantity} x ${item.price}
              </p>
              <p className="cart-item-actions">
                <button onClick={() => handleAddItemToCart(item)}>+</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleDeleteItemFromCart(item.id)}>
                  -
                </button>
              </p>
            </li>
          ))}
        </ul>
      )}
      <p className="cart-total">Total Price: {totalPrice}</p>
      <p className="modal-actions">
        <Button text-only onClick={handleCloseCart}>
          Close
        </Button>
        {ctxCart.items.length > 0 && (
          <Button onClick={handleCheckoutClick}>go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
