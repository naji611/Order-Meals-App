import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Error from "./components/Error";
import SuccessCheckout from "./components/SuccessCheckout";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressProvider } from "./store/userProgressContext";
function App() {
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header></Header>
        <Meals></Meals>
        <Cart></Cart>
        <Checkout></Checkout>
        <SuccessCheckout></SuccessCheckout>
        <Error></Error>
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
