const signIn = async (userInfo) => {
  return fetch(`${process.env.REACT_APP_SERVER}/user/login`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(userInfo),
    credentials: "include",
  });
};

const userRegister = (userInfo, setError, toast, setSuccess, setLoading) => {
  const signUp = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_SERVER}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      }
      if (res.ok) {
        setSuccess(data.message);
        toast.success("user created successfully");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  signUp();
};

const logOut = () => {
  fetch(`${process.env.REACT_APP_SERVER}/user/logout`, {
    headers: {
      "Content-Type": "Application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.open("/login", "_self");
    })
    .catch((error) => console.log(error));
};

const getProfile = () => {};

const googleLogin = () => {
  window.open("http://localhost:5000/api/v1/user/google/callback", "_self");
};
const facebookLogin = () => {
  window.open("http://localhost:5000/api/v1/user/facebook/callback", "_self");
};

export { userRegister, signIn, googleLogin, facebookLogin, getProfile, logOut };
