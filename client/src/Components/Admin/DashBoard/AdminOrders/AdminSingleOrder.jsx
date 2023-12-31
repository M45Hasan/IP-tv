import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Invoice from "../../../Invoice/Invoice";
import Loading from "../../../Loading/Loading";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const OrderStatus = [
  //   "Order Placed",
  "Processing",
  "Shipped",
  "Delivered",
  "canceled",
];

const AdminSingleOrder = () => {
  const [order, setOrderData] = useState({});
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrder();
  }, [id]);
  // console.log({ status });

  const getOrder = async () => {
    try {
      const res = await fetch(`${apiUrl}/order/single/${id}`, {});
      const data = await res.json();
      if (res.ok) {
        // console.log(data);
        setOrderData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatus = async () => {
    if (!status) return alert("please select status");
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/order/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ orderStatus: status }),
        // credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        alert("status updated");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen p-5 w-full">
      <Invoice order={order} />

      <div className="p-5 shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          <div className="flex justify-center">
            {order?.products?.map((product) => (
              <>
                <img src={product.image} alt="" className="w-24 rounded-xl" />
              </>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 my-2 md:my-0">
            <div>
              <h1 className="font-bold pb-1">Product Name</h1>
              <p>
                {order?.products?.map((product) => (
                  <>
                    <p>{product?.name}</p>
                  </>
                ))}
              </p>
            </div>
            <div>
              <h1 className="font-bold pb-1">Quantity</h1>
              <p>
                {" "}
                {order?.products?.map((product) => (
                  <>
                    <p>{product?.quantity}</p>
                  </>
                ))}
              </p>
            </div>
            <div>
              <h1 className="font-bold pb-1">Sizes</h1>
              <p>
                {" "}
                {order?.products?.map((product) => (
                  <>
                    <p>{product?.sizes}</p>
                  </>
                ))}
              </p>
            </div>
            <div>
              <h1 className="font-bold pb-1">Price</h1>
              <p>{order?.price} Taka</p>
            </div>
          </div>
        </div>
      </div>

      <div className="m-5">
        <h1 className="text-xl my-3 border-b w-40">Order Status</h1>
        <select
          className="font-bold outline-none border py-2 px-5 bg-secondary text-primary_hov"
          onChange={(e) => setStatus(e.target.value)}
          defaultValue="Select Status"
        >
          <option value="">updata status</option>
          {OrderStatus?.map((status) => (
            <option value={status}>{status}</option>
          ))}
        </select>

        <button
          disabled={loading}
          onClick={updateStatus}
          className="px-3 py-1 font-medium bg-primary_hov hover:bg-primary duration-300 mx-2"
        >
          {loading ? <Loading /> : "Update"}
        </button>
      </div>
    </div>
  );
};

export default AdminSingleOrder;
