import logo from "../assets/logo.jpg";
import Button from "../UI/Button";
import CartContext from "../store/CartContext";
import userProgressContext from "../store/userProgressContext";
import { useContext } from "react";
export default function Header() {
  const ctxCart = useContext(CartContext);
  const ctxUserProgress = useContext(userProgressContext);
  function handleShowCart() {
    ctxUserProgress.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={handleShowCart}>
          Cart ({ctxCart.items.length})
        </Button>
      </nav>
    </header>
  );
}
