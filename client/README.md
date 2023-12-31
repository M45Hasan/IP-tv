# 🔥 Sliken

its a fashion e-commerce website in bangladesh.

![Logo](https://i.ibb.co/yV95wKS/Sliken-Logo-01.jpg)

## 💦 Home Screen

![App Screenshot](https://i.ibb.co/vkMnb25/silken-2.png)

## 🌐 API Reference

#### 🔗Get all products

```http
  GET /api/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### 🔗 Get single product

```http
  GET /api/product/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

#### 🔗 POST for new user Registration.

```http
  POST /api/signup
```

| Description                                  |
| :------------------------------------------- |
| **Required**. for register new user to fetch |

#### 🔗 POST for user login

```http
  POST /api/login
```

| Description                           |
| :------------------------------------ |
| **Required**. for user login to fetch |

## 🌈 Color Reference

| Color           | Hex                                                              |
| --------------- | ---------------------------------------------------------------- |
| Primary Color   | ![#0C4E67](https://via.placeholder.com/10/26A4DE?text=+) #0C4E67 |
| Secondary Color | ![#03384D](https://via.placeholder.com/10/1b849b?text=+) #03384D |
| Third Color     | ![#3B95B0](https://via.placeholder.com/10/caf5ff?text=+) #3B95B0 |

## 👉Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

## 🛠 Project Skills Setup

Javascript,React, MongoDB, Express, Node js,Tailwind, HTML, CSS...

## 🤵 About Me

I'm a full stack developer. As a proficient MERN Stack Project Leader, I orchestrate the end-to-end site development, ensuring seamless communication and collaboration between the Frontend and Backend Developers. My team members, skilled in their respective domains, deliver captivating user interfaces and robust backend functionality. Together, we create cutting-edge web solutions, elevating user experiences.

## ⚙️ Tech Stack

**Client:** React + Vite, Redux, TailwindCSS

**Server:** Node, Express, mongoDB

## 👥 About My Team

The Frontend Developer adeptly crafts captivating user interfaces, implementing modern design principles and seamless interactions. Meanwhile, the Backend Developer leverages their expertise to architect a robust server-side infrastructure, enabling efficient data management and integration. Together, they ensure our MERN Stack site delivers exceptional performance and user satisfaction.

## Usage/Examples

```javascript
import Component from "my-project";

function App() {
  return <Component />;
}
```

## 👉 Installation

Install my-project with npm

```bash
  npm install reat typscript redux reduxtoolkit tailwindcss react-hot-toast react-toastify sweetalert react-icons axios mongoose mongodb express nodemon
  cd my-project
```

    # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
