import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartitems, currency, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Create a lookup map to optimize product search in the map function
  const productLookup = products.reduce((acc, product) => {
    acc[product._id] = product;
    return acc;
  }, {});

  // This effect runs every time cartitems change
  useEffect(() => {
    const tempData = [];
    for (const itemId in cartitems) {
      for (const size in cartitems[itemId]) {
        const quantity = cartitems[itemId][size];
        if (quantity > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: quantity,
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartitems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"CART"} />
      </div>
      <div>
        {cartData.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = productLookup[item._id]; // Use the lookup map
            if (!productData) {
              console.error(`Product not found for ID: ${item._id}`);
              return null; // Optionally show some error message or log this for debugging
            }

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div className="flex items-start gap-6">
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-state-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Handle empty or invalid input values safely */}
                <input
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      updateQuantity(item._id, item.size, value);
                    }
                  }}
                  className="border w-12 sm:w-16 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Remove"
                />
              </div>
            );
          })
        )}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text:sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
