import react, { useEffect, useState } from "react";

import "./style.css";

import "../AdminProducts/product.css";
//for recent order table

import Api from "../../../pages/Api";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  //data fecthing
  const getOrder = async () => {
    try {
      const res = await Api.get("/iptv/api/v1/order/all")
      console.log(res)
      setOrders(res.data.data.reverse())
      const ress = await Api.get("/iptv/api/v1/service/all")
      setProducts(ress.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  //#############################
  const cancelHH = async (uid) => {

    try {
      const res = await Api.delete(`/iptv/api/v1/order/delete/${uid}`)
      if (res.status === 200) {
        getOrder()
        alert("Delete")

      }
     
    } catch (error) {
      console.log(error)
    }
  }
  //#### Effect########
  useEffect(() => {
    getOrder()
  }, [])
  //##### log####
  console.log(orders)
  return (
    <div className=" w-[60%] md:w-[80%] shadow-lg bg-[#F5F5F5] p-20">
      <h3 className="mb-10 text-3xl font-bold">Dashboard</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-10 gap-5">
        <div className="w-full p-5 text-center bg-secondary text-primary">
          <p className="text-xl font-bold mb-3">Total Products</p>
          <h4 className="mb-0 text-center text-xl font-bold">
            {" "}
            {products?.length}
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
                  <th className="text-start ">Service Name</th>
                  <th className="text-start ">Information</th>
                  <th className="text-start ">Price</th>
                  <th className="text-start ">Status</th>
                  <th className="text-start ">Start Date</th>
                  <th className="text-start ">End Date</th>
                  <th className="text-start ">Customer Info</th>
                  <th className="text-start ">Operation</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order} className="border">
                    <td>{order?.serviceName}</td>
                    <td>{order.serviceInfo}</td>
                    <td>{order?.price}</td>
                    <td>{order?.isSuccess ? "Paid" : "Cancel"}</td>
                    <td>{order?.serviceStart?.split("T")[0]}</td>
                    <td>{order?.serviceEnd?.split("T")[0]}</td>
                    <td>
                      <>
                        <p>{order?.customerInfo?.name}</p>
                        <p>{order?.customerInfo?.email}</p>
                        <p>{order?.customerInfo?.mobile}</p>
                        <p> {order?.customerInfo?.orderList?.length}</p>
                      </>

                    </td>
                    <td onClick={() => cancelHH(order?._id)}><p className="font-bold cursor-pointer text-center px-3 py-2 rounded-md bg-green-500 text-red-700">Delete</p></td>
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
