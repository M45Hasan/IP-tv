import { Link, useLocation, useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import Api from "../Api"

const ProductsBySubCategory = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState([]);
  const serv = useParams();
  const dipatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  // get service list start
  const getService = async () => {

    const res = await Api.get("/iptv/api/v1/service/all")

    if (res.data.data.length > 0) {
      setProducts(res.data.data.reverse())
    }
  }

  const viewDetail = async (uid) => {
    console.log(uid)
    
    const res = await Api.get(`/iptv/api/v1/service/one/${uid}`)
    setView(res.data.data)
  }
  // get service list end

  //#### effect start #####
  useEffect(() => {
    getService()
  }, [])
  //#### effect end #####

  //filter data start  #####


  const itemFilter = products && products?.filter((item) => {

    if (serv?.subcategory?.toLowerCase().trim() === "demo") {
      return item?.demo === true
    }
    if (serv?.subcategory?.toLowerCase().trim() === "reselleriptv") {
      return item?.reseller === true
    }
    if (serv?.subcategory?.toLowerCase().trim() === "restreamiptv") {
      return item?.restream === true
    }

    return item?.categoryName?.toLowerCase().trim() === serv?.subcategory?.toLowerCase().trim()
  })
  //filter data end  #####
  //######log#######
  console.log(serv?.subcategory)
  console.log(products)
  console.log(itemFilter)
  console.log(view)
  //######log#######

  return (
    <div>
      <div className="max-w-screen-xl mx-auto py-10 mt-[73px]">
        <div className=" flex justify-between flex-wrap gap-y-4 ">

          {Object.values(itemFilter)?.map((service, i) => (
            <p onClick={() => viewDetail(service?._id)} className="text-black text-base cursor-pointer" key={i}>{service?.serviceName}</p>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {view && (
            <p className="text-black text-base cursor-pointer" >{view?.createdAt}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsBySubCategory;
