import { useEffect, useState } from "react";

import "./style.css";

import "../AdminProducts/product.css";
//for recent order table
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  //data fecthing
  useEffect(() => {
    fetch(`${apiUrl}/order`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setOrders(data.data);
      });
  }, []);

  //data fecthing
  useEffect(() => {
    fetch(`${apiUrl}/products/displayProducts`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data.data);
      });
  }, []);

  return (
    <div className=" w-[60%] md:w-[80%] shadow-lg bg-[#F5F5F5] p-20">
      <h3 className="mb-10 text-3xl font-bold">Dashboard</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-10 gap-5">
        <div className="w-full p-5 text-center bg-secondary text-primary">
          <p className="text-xl font-bold mb-3">Total Products</p>
          <h4 className="mb-0 text-center text-xl font-bold">
            {" "}
            {products.length}
          </h4>
        </div>
        <div className="w-full p-5 text-center bg-primary text-secondary">
          <p className="desc text-xl font-bold mb-3">Total Order</p>
          <h4 className="mb-0 text-center font-bold text-blue">
            {" "}
            {orders?.length}
          </h4>
        </div>
      </div>

      <div className="mt-10 ">
        <h2 className="mb-4 text-3xl font-bold ">Recent Orders</h2>
        <div className="w-[90%]">
          <div className="pt-5  ">
            <table className="border">
              <thead>
                <tr>
                  <th className="text-start ">Product Name</th>
                  <th className="text-start ">Quantity</th>
                  <th className="text-start ">Price</th>
                  <th className="text-start ">Sizes</th>
                  <th className="text-start ">Date</th>
                  <th className="text-start ">Location</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order} className="border">
                    <td>{order.products[0]?.name}</td>
                    <td>{order.quantity}</td>
                    <td>{order?.price}</td>
                    <td>{order?.sizes}</td>
                    <td>{order?.createdAt}</td>
                    <td>{order?.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
