import { useDispatch } from "react-redux";
import { cartAction } from "../../Store/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;
  const dispatch = useDispatch();
  const increaseItemHandler = () => {
    dispatch(cartAction.addItem({ id, price, title }));
  };
  const decreaseItemHandler = () => {
    dispatch(cartAction.removeItem({ id }));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseItemHandler}>-</button>
          <button onClick={increaseItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
