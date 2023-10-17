import React, { useState } from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProductState, setAddProduct } from "../store/ProductSlice";

const AddProduct = () => {
  const [uniqId, setUniqId] = useState();  
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("");  


  const dataFilled = {
    name: name,
    desc: desc,
    price: price,
    status: status,
    uniqId: uniqId
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addOITemHnle = () => {
    dispatch(setAddProduct(dataFilled));
    navigate("/")
  };

  return (
    <>
      <div className="title">
        <h1>Add Product Page</h1>
      </div>
      <div className="main">
        <div className="">
          <h4>Fill form Here......</h4>
          <div className="UniqId">
            <label>Uniq-Id </label>
            <input type="number" onChange={(e) => setUniqId(e.target.value)} />
          </div>
          <div className="name">
            <label>Name </label>
            <input onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="desc">
            <label>desc </label>
            <input onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className="price">
            <label>price </label>
            <input type="number" onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="status">
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option selected>Select Status</option>
              <option value="available">Available</option>
              <option value="not-available">Not-Available</option>
            </select>
          </div>
          <div className="submit">
            <button onClick={addOITemHnle}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
