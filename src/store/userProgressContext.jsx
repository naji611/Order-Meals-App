import { createContext, useState } from "react";
const userProgressContext = createContext({
  progress: "", //cart checkout
  showCart: () => {},
  showCheckout: () => {},
  hideCart: () => {},
  hideCheckout: () => {},
  showSuccess: () => {},
  hideSuccess: () => {},
  showError: () => {},
  hideError: () => {},
});
export function UserProgressProvider({ children }) {
  let [userProgress, setUserProgress] = useState("");
  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }
  function showCheckout() {
    setUserProgress("checkout");
  }
  function hideCheckout() {
    setUserProgress("");
  }
  function showSuccess() {
    setUserProgress("success");
  }
  function hideSuccess() {
    setUserProgress("");
  }
  function showError() {
    setUserProgress("error");
  }
  function hideError() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    showCheckout,
    hideCart,
    hideCheckout,
    showSuccess,
    hideSuccess,
    showError,
    hideError,
  };
  return (
    <userProgressContext.Provider value={userProgressCtx}>
      {children}
    </userProgressContext.Provider>
  );
}

export default userProgressContext;
