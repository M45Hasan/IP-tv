import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "../../../Loading/Loading";
import { SiMinutemailer } from "react-icons/si";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AdminAddGallery = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null); // Initialize with null
  const [link, setLink] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!image) {
        // Handle the case where no image is provided
        toast.error("Please provide an image");
        return;
      }

      let formDataObj = new FormData();
      formDataObj.append("data", JSON.stringify({ link }));
      formDataObj.append("image", image);

      const response = await fetch(`${apiUrl}/banner/gallery`, {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form and image state or perform other actions
        setImage(null);
        setLink("");
        toast.success("Banner added successfully");
      } else {
        // Handle the case where the response status is not OK
        console.error("Upload failed:", data.message);
        toast.error(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      // Handle any other errors that might occur during the request
      console.error("An error occurred:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-20 p-3 w-[60%] md:w-[80%] pb-20 mx-auto">
      <h3 className="mb-10 font-bold text-3xl tracking-wide text-center uppercase">
        Gallery Upload
      </h3>

      <div className="p-10 max-w-3xl mx-auto">
        <h3 className="text-xl bg-primary py-3 px-10 font-extrabold">
          Gallery Upload
        </h3>
        <div className="shadow px-10 py-5">
          <div className="form-control mb-3 lg:flex justify-between items-center">
            <span className="">Upload Image Gallery</span>
            <input
              autoComplete="off"
              required
              type="file"
              name="images"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
            />
          </div>
          <div className="form-control mb-3 lg:flex justify-between items-center">
            <span className="">Link:</span>
            <input
              autoComplete="off"
              required
              type="text"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border bg-secondary text-primary_hov  px-5 py-2  w-full max-w-xs"
            />
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

export default AdminAddGallery;
