import { createContext, useReducer } from "react";
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  deleteItem: (id) => {},
  resetCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "RESET_CART") {
    return { ...state, items: [] };
  }
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "DELETE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];
    if (existingItem.quantity > 1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.splice(existingCartItemIndex, 1);
    }
    return { ...state, items: updatedItems };
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function deleteItem(id) {
    dispatchCartAction({ type: "DELETE_ITEM", id });
  }
  function resetCart() {
    dispatchCartAction({ type: "RESET_CART" });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    deleteItem,
    resetCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
export default CartContext;
