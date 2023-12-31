import React, { useEffect, useState } from "react";

import AdminProductLists from "./AdminProductLists";
import swal from "sweetalert";
import "./product.css";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const AdminProducts = () => {
  const [products, setProduct] = useState([]);
  // const {Description,category,name,new-price,quantity}=product
  const [reload, setReload] = useState(false);

  const fetchData = () => {
    fetch(`${apiUrl}/products/displayProducts`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setProduct(data.data);
      });
  };
  // console.log(reload);
  //data fecthing
  useEffect(() => {
    fetchData();
  }, [reload]);
  // ! ====> Delet Product
  const handleDelete = (id) => {
    // console.log("delet id", id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`${apiUrl}/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              fetchData();
              setReload((prev) => !prev);
              // console.log(reload);
            }
          });
        // ! ====> Aleart
        swal("Your product item has been deleted !", {
          icon: "success",
        });
      } else {
        swal("Your product item is safe!");
      }
    });
  };

  return (
    <div className="md:px-14 px-2 w-[60%] md:w-[80%] mx-auto pb-20">
      <h1 className="md:mt-20 mt-5 text-3xl font-bold text-center mb-10">
        Products Details
      </h1>

      <div className=" mask w-[90%]">
        <div className="">
          <table className=" border border-gray-700 ">
            <thead className="py-5">
              <tr className="">
                <th className="px-5 font-bold xl:text-xl">#SI</th>
                <th className="pl-5 font-bold xl:text-xl">Product name</th>
                <th className="px-5 font-bold xl:text-xl">Image</th>

                <th className="px-5 font-bold xl:text-xl text-center">
                  Category
                </th>
                <th className="px-5 font-bold xl:text-xl text-center">
                  Quantity
                </th>
                <th className="px-5 font-bold xl:text-xl text-center">Price</th>
                <th className="px-5 font-bold xl:text-xl text-primary_hov text-center">
                  Edit
                </th>
                <th className="px-5 font-bold xl:text-xl text-red-600 text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <AdminProductLists
                  key={product._id}
                  product={product}
                  index={index + 1}
                  handleDelete={handleDelete}
                ></AdminProductLists>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
