const { createSlice } = require("@reduxjs/toolkit");

const initialCartState = {
  items: [],
  totalQuantity: 0,
  showCart: true,
  notification: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      }
    },
    removeItem(state, action) {
      const itemId = action.payload;
      state.totalQuantity--;
      const existingItem = state.items.find((item) => item.id === itemId.id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId.id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    togleCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.patload.message,
      };
    },
  },
});

export const cartAction = cartSlice.actions;

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      cartAction.showNotification({
        status: "pending",
        title: "Sending.....",
        message: "sending data to cart",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://cloud-kitchen-gk.herokuapp.com/api/kitchen/meals",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        cartAction.showNotification({
          status: "success",
          title: "Success.....",
          message: "cart data sent ",
        })
      );
    } catch (error) {
      dispatch(
        cartAction.showNotification({
          status: "error",
          title: "Error.....",
          message: "Failed to send data to server",
        })
      );
    }
  };
};

export default cartSlice.reducer;
