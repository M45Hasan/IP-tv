import React, { useEffect, useState } from "react";
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

// import { Table, Thead, Tbody, Tr, Th, td } from "react-super-responsive-table";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

const AdminOrdersList = ({ order }) => {
  const {
    address,
    userName,
    email,
    quantity,
    contactNumber,
    price,
    products,
    paidStatus,
    orderStatus,
    updatedAt,
    note,
  } = order;
  //   [
  //     //   "Order Placed",
  //     "Processing",
  //     "Shipped",
  //     "Delivered",
  //     "canceled",
  //   ];
  const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    if (orderStatus === "Delivered") {
      setStatusColor("green");
    } else if (orderStatus === "canceled") {
      setStatusColor("red");
    } else {
      setStatusColor("#DAAD01");
    }
  }, []);

  const date = new Date();

  return (
    <>
      <tr className="py-10 text-center">
        <td className="py-6 text-center">
          {products?.map((item) => (
            <>
              <p>{item.name}</p>
            </>
          ))}
        </td>

        <td scope="row">{quantity}</td>

        <td>{userName}</td>

        <td>{contactNumber}</td>
        <td>{note}</td>
        <td>{paidStatus.toString()}</td>
        <td>
          <span
            className={`text-primary_hov ${
              statusColor && `text-${statusColor}-400`
            } font-bold`}
          >
            {orderStatus}
          </span>
        </td>
        <td>{date.toLocaleDateString("en-US", updatedAt)}</td>
        <td>{price}</td>
        <td>
          <Link to={`${order?._id}`} className="text-primary_hov font-bold">
            <div className="flex items-center justify-center">
              <span>Update</span> <BiEdit className="text-2xl ml-4" />
            </div>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default AdminOrdersList;
