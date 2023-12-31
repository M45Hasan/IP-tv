import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { SiMinutemailer } from "react-icons/si";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../../../Loading/Loading";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AdminUpdateProduct = () => {
  // const storedProduct = useLoaderData();
  const id = useParams();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    let formDataObj = new FormData();

    if (selectedImages.length) {
      formDataObj.append("product", JSON.stringify(formData));
      selectedImages.forEach((image) => {
        formDataObj.append("images", image);
      });
    }

    try {
      let response;
      if (selectedImages.length) {
        response = await fetch(`${apiUrl}/products/${product._id}`, {
          method: "PUT",
          body: formDataObj,
        });
      } else {
        response = await fetch(`${apiUrl}/products/${product._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(formData),
        });
      }
      const data = await response.json();

      if (response.ok) {
        toast.success("successfully product updated");

        return;

        // Reset form and image state or perform other actions
      } else {
        alert("Update failed");
        console.error("Update failed");
      }
    } catch (error) {
      toast.error("update failed");
      console.error("Error uploading data and images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageList = [];

    setSelectedImages([...selectedImages, ...files]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const res = await fetch(`${apiUrl}/products/${id?.id}`);
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setProduct(data);
        }
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleProduct();
  }, [id?.id]);

  return (
    <div className=" md:p-20  p-3  max-w-screen-xl mx-auto">
      <Link to="/admin/adminProducts">
        <button className="btn bg-cyan-600 text-3xl text-white p-3 rounded-lg">
          Get Products
        </button>
      </Link>
      <div>
        <h3 className="mb-10 font-bold text-3xl tracking-wide text-center">
          Update Product
        </h3>

        <form onSubmit={handleSubmit} id="myForm" encType="multipart/form-data">
          {" "}
          <div className="grid grid-cols-1 items-center  md:grid-cols-2 lg:grid-cols-3 md:gap-10 ">
            <div className="form-control mb-3">
              <span className="mb-2 md:text-xl">Product Name</span>
              <input
                defaultValue={product?.name}
                autoComplete="off"
                onChange={handleInputChange}
                type="text"
                name="name"
                className="input border-2 p-2 rounded-lg w-full max-w-xs"
                placeholder="Enter Your Product name"
              />
            </div>
            <div className="form-control mb-3">
              <span className=" md:text-xl">Quantity</span>
              <input
                defaultValue={product?.stock}
                autoComplete="off"
                onChange={handleInputChange}
                type="number"
                name="stock"
                className="input border-2 p-2 rounded-lg  w-full max-w-xs"
                placeholder="quantity"
              />
            </div>

            <div className="form-control mb-3 ">
              <label className="mb-2 md:text-xl">Pricing</label>
              <div className="grid grid-cols-1  ">
                <span htmlFor="price"> Price</span>
                <input
                  defaultValue={product?.price}
                  autoComplete="off"
                  onChange={handleInputChange}
                  type="number"
                  name="price"
                  id="price"
                  className="input border-2 p-2 rounded-lg  w-full max-w-xs mb-3"
                  placeholder="price"
                />
                <br />
              </div>
            </div>

            <div className=" mb-3   ">
              <span className="mb-2 md:text-xl mr-10 text-black ">
                New Arrival
              </span>

              <div className="border md:border-none">
                {" "}
                <input
                  autoComplete="off"
                  onChange={handleInputChange}
                  className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600   mt-5"
                  type="checkbox"
                  name="newArrival"
                ></input>
                <span
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                >
                  New product
                </span>
              </div>
            </div>
            <div className="form-control flex flex-col ">
              <label className=" text-xl">Image</label> <br />
              <input
                autoComplete="off"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                // onBlur={handleInputBlur}
              />
            </div>

            <div className="form-control mb-3">
              <span className="">Description</span>
              <textarea
                defaultValue={product?.description}
                autoComplete="off"
                onChange={handleInputChange}
                className="input border-2 p-2 rounded-lg w-full h-full"
                type="text"
                name="description"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div className="text-center">
            <button
              disabled={loading}
              className="flex btn bg-blue-500 text-white p-3 rounded-lg  items-center"
              type="submit"
            >
              Update Product{" "}
              {loading ? <Loading /> : <SiMinutemailer className="ml-2 " />}
            </button>
          </div>
          {/*------------------key feature------------- */}
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateProduct;
