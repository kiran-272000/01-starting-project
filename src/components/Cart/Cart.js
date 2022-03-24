import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItem = useSelector((state) => state.cart.items);
  const cart = cartItem.map((item) => {
    return (
      <CartItem
        key={item.id}
        item={{
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          total: item.totalPrice,
          price: item.price,
        }}
      />
    );
  });

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{cart}</ul>
    </Card>
  );
};

export default Cart;
