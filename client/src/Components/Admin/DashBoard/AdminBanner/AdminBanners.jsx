import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [refetch, setRefetch] = useState(false);
  // console.log(banners);

  useEffect(() => {
    getBanners();
  }, [refetch]);

  const getBanners = async () => {
    try {
      const res = await fetch(`${apiUrl}/banner`);

      if (res.ok) {
        const data = await res.json();
        setBanners(data);
      } else {
        // Handle the case where the request was not successful
        console.error("Failed to fetch banners");
      }
    } catch (error) {
      console.error("An error occurred while fetching banners:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;

      const res = await fetch(`${apiUrl}/banner/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // If the delete request was successful, update the UI
        setRefetch((prev) => !prev);
        toast.success("Banner deleted successfully");
      } else {
        // Handle the case where the delete request was not successful
        console.error("Failed to delete banner");
      }
    } catch (error) {
      console.error("An error occurred while deleting banner:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-between p-5 md:p-10">
      {banners.map((item) => (
        <div
          key={item._id}
          className="max-w-sm gap-5 relative rounded-md overflow-hidden"
        >
          <img src={item.image} alt="" className="p-2" />

          <Icon
            onClick={() => handleDelete(item._id)}
            icon="ri:close-circle-fill"
            className="text-secondary cursor-pointer text-3xl top-0 right-0 absolute z-[999]"
          />
        </div>
      ))}
    </div>
  );
};

export default AdminBanners;
