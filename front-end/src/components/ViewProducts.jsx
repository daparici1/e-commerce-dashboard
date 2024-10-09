import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/viewproducts.css'

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchProduct = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div>
      <h1>Product List:</h1>
      <input
        type="text"
        placeholder="Search Product"
        onChange={searchProduct}
      />

      <table>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => deleteProduct(item._id)}>Delete</button>
                  <Link to={"/update/" + item._id}>Update</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Result Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
