import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";  // Ensure this file contains a valid product array
import { toast } from "react-toastify";
//import Product from "../pages/Product";       // Ensure this is a valid Product component or data
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate =useNavigate();
  // Add to cart function
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product size');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // Increment the size quantity
      } else {
        cartData[itemId][size] = 1;  // Add size to existing item
      }
    } else {
      cartData[itemId] = {};         // Initialize itemId as an object
      cartData[itemId][size] = 1;    // Set size for the new item
    }

    setCartItems(cartData);          // Update the state with modified cart data
  };

  // Function to calculate total cart count
  const getCartCount = () => {
    let count = 0;
    for (let itemId in cartItems) {
      for (let size in cartItems[itemId]) {
        count += cartItems[itemId][size]; // Accumulate the quantities of all items
      }
    }
    return count;
  };

  // Update quantity function
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  useEffect(() => {
    // Any side effects when cartItems changes
  }, [cartItems]);

  // Calculate total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find(product => product._id === itemId);  // Find product by ID

      if (!itemInfo) continue;  // If product is not found, skip

      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalAmount += itemInfo.price * cartItems[itemId][size];  // Calculate total
          }
        } catch (error) {
          console.error("Error calculating cart amount:", error);
        }
      }
    }

    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount, 
    updateQuantity,
    getCartAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
