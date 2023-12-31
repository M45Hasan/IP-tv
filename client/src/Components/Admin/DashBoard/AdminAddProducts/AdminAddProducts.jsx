import React, { useContext } from "react";
// import axios from 'axios';
import { useState } from "react";
import { SiMinutemailer } from "react-icons/si";

import { category } from "../../../../ApiServices/fakeData";

import Loading from "../../../Loading/Loading";
import { toast } from "react-hot-toast";

import TagCom from "./TagCom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AdminAddProducts = () => {
  const [loading, setLoading] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [categoryData, setCategory] = useState(category);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [sizeTags, setSizeTags] = useState([]);
  const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] = useState(0);
  const [subCategory, setSubCategory] = useState("");
  const [formData, setFormData] = useState();

  // feature states for featured products

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formDataObj = new FormData();
    formData.subcategory = subCategory;
    formDataObj.append("sizes", JSON.stringify(sizeTags));

    formDataObj.append("product", JSON.stringify(formData));
    selectedImages.forEach((image) => {
      formDataObj.append("images", image);
    });
    // console.log("formData", formData);
    try {
      const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        body: formDataObj,
      });
      const data = await response.json();

      if (response.ok) {
        setSelectedImages([]);
        document.getElementById("myForm").reset();
        toast.success("product added");
        // console.log("Data and images uploaded successfully");
        return;

        // Reset form and image state or perform other actions
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      toast.error("product upload failed");
      console.error("Error uploading data and images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    let files = e.target.files;
    const imageList = [];
    // console.log(selectedImages);
    if (selectedImages.length > 3) {
      setSelectedImages([]);
      e.target.value = "";
      alert("image cannot be more than 4 images");
    } else {
      setSelectedImages([...selectedImages, ...Array.from(files).reverse()]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(formData);

    setFormData({ ...formData, [name]: value });

    setSubCategory(
      categoryData[selectedCategoryIndex]?.subCategory[selectedSubcategoryIndex]
    );
  };
  // console.log({ subCategory });
  const handleCategoryChange = (event) => {
    const newIndex = event.target.selectedIndex;
    setSelectedCategoryIndex(newIndex);
    setSelectedSubcategoryIndex(0); // Reset subcategory index when category changes
  };

  const handleSubcategoryChange = (event) => {
    const newIndex = event.target.selectedIndex;
    setSelectedSubcategoryIndex(newIndex);
  };

  const handleSizeTagsChange = (newSizeTags) => {
    setSizeTags(newSizeTags);
  };
  // console.log(sizeTags);

  return (
    <div className="md:p-20 p-3 w-[60%] md:w-[80%] pb-20 mx-auto">
      <form onSubmit={handleSubmit} id="myForm" encType="multipart/form-data">
        <h3 className="mb-10 font-bold text-3xl tracking-wide text-center uppercase">
          Add Product
        </h3>

        <div className="p-10 max-w-3xl mx-auto">
          <h3 className="text-xl bg-primary py-3 px-10 font-extrabold">
            Product Information
          </h3>
          <div className="shadow px-10 py-5">
            <div className="form-control mb-3 lg:flex justify-between items-center">
              <span className="mb-2">Product Name</span>
              <input
                autoComplete="off"
                onChange={handleInputChange}
                type="text"
                name="name"
                required
                className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
                placeholder="product name"
              />
            </div>

            <div className="form-control mb-3 lg:flex justify-between items-center">
              <span className="mb-2">Category</span>

              <select
                autoComplete="off"
                required
                onChange={(e) => {
                  handleCategoryChange(e);
                  handleInputChange(e);
                }}
                className="border  bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
                type="text"
                name="category"
              >
                {categoryData.map((item, idx) => (
                  <option key={idx} value={item.category}>
                    {item.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control mb-3 lg:flex justify-between items-center">
              <span htmlFor="subcategory" className="mb-2">
                Sub-category
              </span>

              <select
                onChange={(e) => {
                  handleSubcategoryChange(e);
                  handleInputChange(e);
                }}
                className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
                type="text"
                name="subcategory"
              >
                {categoryData[selectedCategoryIndex]?.subCategory?.map(
                  (item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="form-control mb-3 lg:flex justify-between items-center">
              <span className="mb-2">Quantity</span>
              <input
                autoComplete="off"
                onChange={handleInputChange}
                type="number"
                name="stock"
                required
                className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
                placeholder="quantity"
              />
            </div>

            <div className="form-control mb-3 lg:flex justify-between items-center">
              <span className="mb-2">SKU</span>
              <input
                autoComplete="off"
                onChange={handleInputChange}
                type="text"
                name="sku"
                required
                className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
                placeholder="SKU"
              />
            </div>
            <div className="form-control mb-3 lg:flex justify-between items-center">
              <span className="mb-2">Size</span>
              <TagCom onSizeTagsChange={handleSizeTagsChange} />
            </div>
          </div>
        </div>

        <div className="p-10 max-w-3xl mx-auto">
          <h3 className="text-xl bg-primary py-3 px-10 font-extrabold">
            Product Description
          </h3>
          <div className="shadow px-10 py-5">
            <div className="form-control mb-3 lg:flex justify-between items-center">
              <span className="mb-2">New Product</span>
              <div className="flex gap-5 items-center">
                <input
                  autoComplete="off"
                  onChange={handleInputChange}
                  className="w-6 h-6 accent-primary_hov"
                  type="checkbox"
                  name="newArrival"
                ></input>
                <span htmlFor="default-checkbox" className="inline-block">
                  New Arrival
                </span>
              </div>
            </div>

            <div className="form-control mb-3 lg:flex justify-between items-center">
              <span className="mb-2">Description</span>

              <textarea
                autoComplete="off"
                onChange={handleInputChange}
                className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs h-32"
                type="text"
                name="description"
                rows="10"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <div className="p-10 max-w-3xl mx-auto">
          <h3 className="text-xl bg-primary py-3 px-10 font-extrabold">
            Product Price
          </h3>
          <div className="shadow px-10 py-5">
            <div className="form-control mb-3 lg:flex justify-between items-center">
              <span className="mb-2">Regular Price</span>

              <input
                autoComplete="off"
                onChange={handleInputChange}
                type="number"
                name="price"
                id="price"
                required
                className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
                placeholder="price"
              />
            </div>
          </div>
        </div>

        <div className="p-10 max-w-3xl mx-auto">
          <h3 className="text-xl bg-primary py-3 px-10 font-extrabold">
            Images Upload
          </h3>
          <div className="shadow px-10 py-5">
            <div className="form-control mb-3 lg:flex justify-between items-center">
              <span className="mb-2">Upload Images</span>
              <input
                autoComplete="off"
                required
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
              />
            </div>
          </div>
        </div>

        <div className="p-10 max-w-3xl mx-auto">
          <h3 className="text-xl bg-primary py-3 px-10 font-extrabold">
            Video ADD
          </h3>
          <div className="shadow px-10 py-5">
            <div className="form-control mb-3 lg:flex justify-between items-center">
              <span className="mb-2">Video ADD</span>
              <textarea
                autoComplete="off"
                onChange={handleInputChange}
                className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs h-32"
                type="text"
                name="video"
                rows="10"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            disabled={loading}
            className="flex btn bg-primary_hov hover:bg-primary duration-300 text-white p-3   items-center"
            type="submit"
          >
            Add Product{" "}
            {loading ? <Loading /> : <SiMinutemailer className="ml-2 " />}
          </button>
        </div>
        {/*------------------key feature------------- */}
      </form>
    </div>
  );
};

export default AdminAddProducts;
