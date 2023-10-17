import { useState } from "react";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectProductState,
  setAddItemToCart,
  setAddProduct,
  setClearCartItems,
  setDecreaseItemQTY,
  setIncreaseItemQTY,
  setRemoveItemFromCart,
} from "../store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItems";

const productListData = [
  {
    name: "Laptop",
    desc: "A high-performance laptop with a sleek design.",
    price: 999.99,
    status: "In Stock",
  },
  {
    name: "Smartphone",
    desc: "The latest smartphone with a stunning camera.",
    price: 699.99,
    status: "Out of Stock",
  },
  {
    name: "Headphones",
    desc: "Wireless over-ear headphones with noise cancellation.",
    price: 149.99,
    status: "In Stock",
  },
];

const ProductList = () => {
  const [data, setData] = useState(productListData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ProductsList = useSelector(selectProductState);
  const cartItemsList = useSelector(selectCartItems);

  console.log("cartItemsList", cartItemsList);

  // const cartStateProductsList = useSelector(state => state);

  console.log("ProductsList", ProductsList);

  const handleAddToCart = (data) => {
    dispatch(setAddItemToCart(data));
  };

  const handleIncrement = (data) => {
    dispatch(setIncreaseItemQTY(data));
  };

  const handleDecrement = (data) => {
    dispatch(setDecreaseItemQTY(data));
  };

  const handleRemoveCartItem = (data) => {
    dispatch(setRemoveItemFromCart(data));
  };

  const handleClearCart = () => {
    dispatch(setClearCartItems());
  };

  return (
    <>
      <div>Welcome to my Product Sale</div>

      <div>
        <div className="ProductTitle">
          <h1>Product Lists</h1>
        </div>
        <div className="addProduct">
          <button onClick={() => navigate("AddProduct")}>Add Product</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Uniq ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ProductsList?.map((product, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{product?.uniqId}</td>
                    <td>{product?.name}</td>
                    <td>{product?.desc}</td>
                    <td>{product?.price}</td>
                    <td>{product?.status}</td>
                    <td>
                      <button
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          handleAddToCart(product);
                        }}
                      >
                        Add Cart
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {cartItemsList?.map((item, index) => (
        <CartItem
          key={index}
          name={item?.name}
          quantity={item?.cartQuantity}
          onIncrement={() => handleIncrement(item)}
          onDecrement={() => handleDecrement(item)}
          onDelete={() => handleRemoveCartItem(item)}
        />
      ))}
      {cartItemsList?.length > 0 && (
        <div>
          <button onClick={handleClearCart} className="clearCart">
            Clear Cart Items
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;
