const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const getAllProducts = (setProducts) => {
  const getData = async () => {
    try {
      const res = await fetch(`${apiUrl}/products/dispayProducts`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getData();
};
const getCategories = (setCategory, category) => {
  const getData = async () => {
    try {
      const res = await fetch(`${apiUrl}/category/${category}`);
      const data = await res.json();
      if (res.ok) {
        setCategory(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getData();
};

const getProductsByCategory = (
  setCategoryData,
  category,
  subcategory = null
) => {
  const getData = async () => {
    try {
      let apiUrlWithParams = `${apiUrl}/products?category=${category}`;

      if (subcategory) {
        apiUrlWithParams += `&subcategory=${subcategory}`;
      }

      const res = await fetch(apiUrlWithParams);
      const data = await res.json();

      if (res.ok) {
        setCategoryData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getData();
};

const getProductsByCategorys = (setCategoryData, subcategory, category) => {
  const getData = async () => {
    try {
      const res = await fetch(
        `${apiUrl}/products?subcategory=${subcategory}&&category=${category}`
      );
      const data = await res.json();
      if (res.ok) {
        setCategoryData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getData();
};

export {
  getCategories,
  getProductsByCategory,
  getAllProducts,
  getProductsByCategorys,
};
