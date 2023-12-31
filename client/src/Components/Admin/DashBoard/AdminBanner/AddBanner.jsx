import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { category } from "../../../../ApiServices/fakeData";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const AddBanner = () => {
  // const { profile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [megaOffer, setMegaOffer] = useState(false);
  const [offerDate, setOfferDate] = useState("");
  const [image, setImage] = useState();
  const [imageMobile, setImageMobile] = useState();

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formDataObj = new FormData();
    formDataObj.append(
      "data",
      JSON.stringify({ category: selectedCategory, megaOffer, offerDate })
    );
    if (image) {
      formDataObj.append("image", image);
    }
    if (imageMobile) {
      formDataObj.append("imageMobile", imageMobile);
    }

    try {
      // console.log(formDataObj);
      let response;
      if (image && image.name) {
        response = await fetch(`${apiUrl}/banner`, {
          method: "POST",
          body: formDataObj,
        });

        const data = await response.json();

        if (response.ok) {
          // Reset form and image state or perform other actions
          setImage({});
          toast.success("Banner added successfully");
        } else {
          // Handle the case where the response status is not OK
          console.error("Upload failed");
          toast.error("Upload failed");
        }
      } else {
        // Handle the case where no image is provided
        console.error("Please provide a banner");
        toast.error("Please provide a banner");
      }
    } catch (error) {
      // Handle any other errors that might occur during the request
      console.error("An error occurred:", error);
      toast.error("An error occurred");
    } finally {
      // This will always run, regardless of success or failure
      setLoading(false);
    }
  };

  // console.log(megaOffer);

  return (
    <div className="md:p-20 p-3 w-[60%] md:w-[80%] pb-20 mx-auto">
      <h3 className="mb-10 font-bold text-3xl tracking-wide text-center uppercase">
        Banners Upload
      </h3>

      <div className="p-10 max-w-3xl mx-auto">
        <h3 className="text-xl bg-primary py-3 px-10 font-extrabold">
          Banner Upload
        </h3>
        <div className="shadow px-10 py-5">
          <div className="form-control mb-3 lg:flex justify-between items-center">
            <span className="">Upload Images for Dekhstop</span>
            <input
              autoComplete="off"
              required
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => setImage(e.target.files[0])}
              className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
            />
          </div>
          <div className="form-control mb-3 lg:flex justify-between items-center">
            <span className="">Upload Images for Mobile</span>
            <input
              autoComplete="off"
              required
              type="file"
              name="imagesMobile"
              accept="image/*"
              multiple
              onChange={(e) => setImageMobile(e.target.files[0])}
              className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
            />
          </div>
        </div>
      </div>

      <div className="p-10 max-w-3xl mx-auto">
        <h3 className="text-xl bg-primary py-3 px-10 font-extrabold">
          Categories
        </h3>
        <div className="shadow px-10 py-5">
          <div className="form-control mb-3 lg:flex justify-between items-center">
            <span className="">Select Category</span>
            <select
              autoComplete="off"
              required
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
              type="text"
              name="category"
            >
              <option> Select Category</option>
              {category?.map((item, idx) => (
                <option key={idx} value={item.category}>
                  {item.category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-10 max-w-3xl mx-auto">
        <h3 className="text-xl bg-primary py-3 px-10 font-extrabold">
          Mega Offer
        </h3>

        <div className="shadow px-10 py-5">
          <div className="form-control mb-3 lg:flex justify-between items-center">
            <span className="">Set offer</span>
            <div className="flex gap-5 items-center">
              <input
                type="checkbox"
                id="mega"
                name="megaOffer"
                onChange={(e) => {
                  setMegaOffer(e.target.checked);
                }}
                className="w-6 h-6 accent-primary_hov"
              />

              <span htmlFor="default-checkbox" className="inline-block">
                Mega Offer
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleUpload}
          className="my-3 px-2 py-2 text-xl text-white rounded-md bg-primary_hov hover:bg-primary"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default AddBanner;
