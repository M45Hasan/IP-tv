import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import AdminOrdersList from "./AdminOrdersList";
import "../AdminProducts/product.css";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AdminOrders = () => {
  const [orders, setorders] = useState([]);

  //data fecthing
  useEffect(() => {
    fetch(`${apiUrl}/order`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setorders(data.data);
      });
  }, []);

  return (
    <div className="md:px-14 px-2 w-[60%] md:w-[80%] pb-20 mx-auto">
      <h1 className="mt-20 mb-14 text-3xl font-bold text-center">
        Orders Information
      </h1>

      <div className="mask w-[90%] overflow-hidden">
        <div>
          <table
            className="
		 border border-gray-70"
          >
            <thead className="py-5 ">
              <tr className=" ">
                <th className="px-5 py-5  font-bold text-sm  md:text-xl">
                  Product Name
                </th>
                {/* <th className="px-5 py-5  font-bold text-sm  md:text-xl">
                  Image
                </th> */}
                <th className="px-5 font-bold text-sm md:text-xl">Items</th>
                <th className="px-5 font-bold text-sm md:text-xl">
                  Customer Name
                </th>
                <th className="px-5 font-bold text-sm md:text-xl">Mobile</th>
                <th className="px-5 font-bold text-sm md:text-xl">
                  Customer Note
                </th>
                <th className="px-5 font-bold text-sm md:text-xl">paid</th>
                <th className="px-5 font-bold text-sm md:text-xl">Status</th>
                <th className="px-5 font-bold text-sm md:text-xl">Data</th>
                <th className="px-5 font-bold text-sm md:text-xl">Total</th>
                <th className="px-5 font-bold text-sm md:text-xl">Operation</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <AdminOrdersList
                  key={order._id}
                  order={order}
                  index={order + 1}
                ></AdminOrdersList>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AdminOrders;
