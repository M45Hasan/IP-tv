import { Button } from "antd";

import "../Dashboard/style.css";

import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";

const AdminProductLists = ({ product, handleDelete, index }) => {
  const { category, name, stock, subcategory, _id, image, price } = product;
  // console.log({ product });
  return (
    <>
      <tr className="py-10 text-center">
        <td className="py-6 text-center">{index}</td>
        <td className="py-6 text-start pl-5">{name}</td>
        <td className="py-6 text-center">
          <img src={image} alt="" className="w-20 mx-auto" />
        </td>

        <td>{subcategory}</td>
        <td>{stock}</td>
        <td>{price}</td>

        <td>
          <Link to={`/adminUpdateProduct/${_id}`}>
            <p className="text-primary_hov text-2xl font-bold flex justify-center items-center">
              {" "}
              <span className="mr-2">
                <AiFillEdit></AiFillEdit>
              </span>
            </p>
          </Link>
        </td>
        {/* <Link to=``>Edit</Link> */}

        {/* <UpdateProduct></UpdateProduct> */}
        {/* <button onClick={() => navigate(`updateProduct/${product._id}`)}>edit</button> */}
        {/* <button onClick={ handleClick}>edit</button> */}
        {/* <Button   type="submit" className='p-0 text-primary'> <span><AiFillEdit ></AiFillEdit>Edit   </span> </Button> */}

        {/* </td> */}
        <td>
          <Button
            type="submit"
            className="p-0 text-red-800 text-2xl fill-red-500 font-bold flex  items-center mx-auto"
            onClick={() => handleDelete(_id)}
          >
            <span className="text-red-500 mr-2">
              <AiFillDelete></AiFillDelete>
            </span>
          </Button>
        </td>
      </tr>
    </>
  );
};

export default AdminProductLists;
