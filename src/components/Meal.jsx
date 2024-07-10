import { useContext } from "react";
import Button from "../UI/Button";
import CartContext from "../store/CartContext";
export default function Meal({ image, name, id, price, description, meal }) {
  const ctxCart = useContext(CartContext);
  function handleAddItemToCart(meal) {
    ctxCart.addItem(meal);
  }

  return (
    <li className="meal-item" key={id}>
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <h3>{name}</h3>
        <div>
          <p className="meal-item-price">${price}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => handleAddItemToCart(meal)}>Add To Cart</Button>
        </p>
      </article>
    </li>
  );
}
