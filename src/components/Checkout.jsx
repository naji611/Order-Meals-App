import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext.jsx";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import userProgressContext from "../store/userProgressContext.jsx";
export default function Checkout() {
  const ctxCart = useContext(CartContext);
  const ctxUserProgress = useContext(userProgressContext);
  const totalPrice = ctxCart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  function handleCloseCheckout() {
    ctxUserProgress.hideCheckout();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          order: {
            customer: data,
            items: ctxCart.items,
            totalPrice: totalPrice,
          },
        }),
      });
      const resData = await response.json();
      if (!response.ok) {
        console.log(response.message);
        ctxUserProgress.hideCheckout();
        ctxUserProgress.showError();
      } else {
        ctxUserProgress.hideCheckout();
        ctxUserProgress.showSuccess();
        console.log(resData);
        ctxCart.resetCart();
      }
    } catch (err) {
      console.log(err.message);
      ctxUserProgress.hideCheckout();
      ctxUserProgress.showError();
    }
  }
  return (
    <Modal
      open={ctxUserProgress.progress === "checkout"}
      onClose={
        ctxUserProgress.progress === "checkout" ? handleCloseCheckout : null
      }
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {totalPrice}</p>
        <Input label={"Full Name"} id={"name"} type="text"></Input>
        <Input label={"Email-Address"} id={"email"} type="email"></Input>
        <Input label={"Street"} id={"street"} type="text"></Input>
        <div className={"control-row"}>
          <Input label={"Postal Code"} id={"postal-code"} type="number"></Input>
          <Input label={"City"} id={"city"} type="text"></Input>
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
