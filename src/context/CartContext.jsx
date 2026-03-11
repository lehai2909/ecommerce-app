import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
  totalAmount: 0,
};

// Start cart empty, we will load it from API on mount
const initCart = () => initialState;

const cartReducer = (state, action) => {
  let updatedItems;
  let updatedTotalAmount;

  switch (action.type) {
    case "ADD_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat({ ...action.item, quantity: 1 });
      }

      updatedTotalAmount =
        state.totalAmount + action.item.price;
      
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case "REMOVE_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      
      updatedTotalAmount = state.totalAmount - existingItem.price;

      if (existingItem.quantity === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case "CLEAR_CART":
      return initialState;

    case "RELOAD_CART":
      return action.payload || initialState;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, null, initCart);

  // Sync to API whenever cart changes
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail") || "guest";
    // Avoid saving the initial blank state before it's loaded
    if (cartState === initialState && cartState.items.length === 0) return;
    
    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, cart: cartState })
    }).catch(err => console.error("Failed to sync cart", err));
  }, [cartState]);

  // Load cart from API
  const loadCartFromAPI = () => {
    const userEmail = localStorage.getItem("userEmail") || "guest";
    fetch(`/api/cart?email=${userEmail}`)
      .then(res => res.json())
      .then(data => {
        dispatchCartAction({ type: "RELOAD_CART", payload: data });
      })
      .catch(err => console.error("Failed to load cart", err));
  };

  // Listen for userEmail changes (e.g., login/logout) across the app to re-init
  useEffect(() => {
    const handleAuthChange = () => {
      loadCartFromAPI();
    };
    
    // Initial load
    loadCartFromAPI();
    
    // Listen for custom event that we will dispatch on login/logout
    window.addEventListener("user_auth_change", handleAuthChange);
    return () => window.removeEventListener("user_auth_change", handleAuthChange);
  }, []);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
