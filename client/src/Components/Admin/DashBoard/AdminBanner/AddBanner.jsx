import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";

import { Controller, useForm } from "react-hook-form";
import Api from "../../../pages/Api";

const Banner = () => {
  const admin = useSelector((state) => state?.orebiSlice?.price);
  const [banData, setBan] = useState("");
  const [banDataa, setBana] = useState([""]);
  const {
    register,
    handleSubmit,

    control,
    formState: { errors },
  } = useForm();
  const [category] = useState([
    "European 4kIPTV", "Asian IPTV ", "bdix IPTV"
  ]);

  // data send to dataBase
  const onSubmit = async (data) => {
    try {

      // assuming your file input name is "url"

      // Add other form data properties
      const name = data.category


      const res = await Api.post("/iptv/api/v1/category/new", { name });

      if (res.data.message) {
        alert(res.data.message);
        isBanner();
      }
    } catch (error) {
      alert(error.response.data.error)
    }
  };

  //###### get Banner start ##########

  const isBanner = async () => {
    try {
      const res = await Api.get("/iptv/api/v1/category/all");

      if (res.data.data.length > 0) {
        setBana(res.data.data);
      }
    } catch (error) { }
  };

  //###### get Banner end ##########
  //###### banner delete star ##########

  //  course del #######
  const handelDel = async (uid) => {
    try {
      const confrim = window.confirm("Are you sure?");
      if (!confrim) {
        return;
      }

      await Api.get(`/iptv/api/v1/category/delete/${uid}`);
      alert("Category Deleted");
      isBanner();
    } catch (err) {
      console.error("Error reason:", err);
    }
  };
  //###### banner delete end ##########
  //############### useEff######
  useEffect(() => {
    isBanner();
  }, []);
  //############### useEff######
  console.log(admin);
  //############### useEff######

  return (
    <div className="m-7 lg:w-full w-[60%] ">


      <form onSubmit={handleSubmit(onSubmit)} className="pb-10">

        <div className="border rounded-md mt-10 ">
          <div className="bg-primary text-white py-2 mb-10">
            <h3 className="font-bold text-xl text-center tracking-wide pl-5">
              Add Category
            </h3>
          </div>

          <div className=" mb-7 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
              <div>
                <label className="mb-2 md:text-lg  text-black">
                  {" "}
                  Position
                </label>
              </div>

              <div className="text-black">
                <Controller
                  name="category"
                  className="text-primary"
                  control={control}

                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      //   variant="outlined"
                      color="blue"
                      className="text-primary"

                    >

                      {category.map((cat, i) => (
                        <Option className="text-primary" key={i} value={cat}>
                          {cat}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                {errors.category && (
                  <p>Category is required and must be valid</p>
                )}
              </div>
            </div>
          </div>
        </div>



        <div className="text-center pt-10">
          <Button type="submit" className="bg-blue-600 px-10 py-3">
            Add Blog
          </Button>
        </div>
      </form>


      <div className=" flex flex-wrap gap-4 ">
        {banDataa &&
          banDataa?.map((kur, i) => (
            <div
              key={i}
              className="max-w-sm w-[300px] relative bg-white border border-gray-200 rounded-lg shadow"
            >


              <div className="p-5">


                <p>{kur?.name}</p>

                <div className="flex justify-between mt-5">
                  <link to="/adminAddProducts" >
                    <p className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Service</p>
                  </link>
                  <p
                    onClick={() => handelDel(kur._id)}
                    className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Delete
                  </p>


                </div>


              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Banner;
