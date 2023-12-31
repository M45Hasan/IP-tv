import { useContext } from "react";
import { useState } from "react";

import {
  Form,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

import { toast } from "react-hot-toast";
import Loading from "../Loading/Loading";

import logo from "../../assets/logo/Sliken Logo-01.jpg";

const adminEmail = import.meta.env.VITE_REACT_APP_EMAIL;
const adminPassword = import.meta.env.VITE_REACT_APP_PASSWORD;

const Login = () => {
  const { setProfile } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({}); //create for store getting email for reset
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [adminUpdatePassword, setAdminUpdatePassowrd] = useState(
    adminPassword + "#"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //google sign in

  //login part

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (email !== adminEmail || password !== adminUpdatePassword) {
      toast.error("invalid credential");
      setError("invalid credential");
      setLoading(false);
      return;
    }
    localStorage.setItem("admin", JSON.stringify({ email }));
    const user = { email };
    setProfile(user);
    setLoading(false);
    window.open("/admin", "_self");
  };

  return (
    <div className="my-20">
      <div className="">
        <div className="p-8 max-w-lg mx-auto shadow bg-gray-100">
          <img src={logo} alt="" className="w-14 mx-auto" />
          <p className="text-center font-bold text-gray-700 mt-5 tracking-widest">
            Sign in with
          </p>

          <div className="py-12 px-4 lg:px-20  max-w-lg mx-auto">
            {/* //* Form */}
            <Form className="mt-6" onSubmit={handleLogin}>
              <div className="relative ">
                {/*//!Email field */}
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none border pl-12 bg-secondary border-gray-100 shadow-sm focus:shadow-md focus:placeholder-primary_hov  transition  rounded-md w-full py-3 text-primary leading-tight focus:outline-none focus:ring-primary_hov focus:shadow-outline"
                  type="text"
                  name="email"
                  placeholder="Email"
                  // className="input input-bordered"
                  required
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 ml-3 text-gray-400 p-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
              <div className="relative mt-3">
                {/*//!Password field */}
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none border pl-12 bg-secondary border-gray-100 shadow-sm focus:shadow-md focus:placeholder-primary_hov  transition  rounded-md w-full py-3 text-primary leading-tight focus:outline-none focus:ring-primary_hov focus:shadow-outline"
                  type="password"
                  name="password"
                  placeholder="password"
                  // className="input input-bordered"
                  required
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 ml-3 text-gray-400 p-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-center my-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="text-white py-2 w-full px-4 uppercase rounded bg-primary hover:bg-primary_hov shadow hover:shadow-lg font-medium"
                >
                  {loading ? "Login...." : "Login"}
                </button>
              </div>
              <div>
                <div>
                  <p className="text-red-600">{error}</p>
                </div>{" "}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
