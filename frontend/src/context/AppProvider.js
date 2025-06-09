import React, { useEffect, useRef, useState } from "react";
import { productContext } from "./productContext/productContext";
import toast from "react-hot-toast";

const AppProvider = ({ children }) => {
  const [items, setitems] = useState([]);
  const [title, setTitle] = useState("");
  const [searchItem, setSearchItem] = useState([]);
  const [categoryMatch, setCategoryMatch] = useState("all");
  const uniqueCategories = [...new Set(items.map((item) => item.category))];
  const [reviewsData, setReviewsData] = useState([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isLogin = !!token;
  const url = "http://localhost:1627";
  const productRef = useRef(null);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null);
  };

  //! User
  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchUser = await fetch(`${url}/users/getUser`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await fetchUser.json();
        setUser(data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    if (token) {
      getUser();
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(`${url}/shop/products`);
        const products = await res.json();
        setitems(products);
        console.log(products);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);

  const searchProduct = async () => {
    try {
      const res = await fetch(`${url}/shop/products/search/${title}`);
      const product = await res.json();
      if (res.ok) {
        setSearchItem(product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // send message on email
  const sendMessageOnEmail = async (order) => {
    try {
      const response = await fetch(`${url}/orders/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        toast.error("Failed to send email");
        return;
      }

      const msg = await response.json();
      toast.success(
        "Order placed successfully! Check your email for order details."
      );
    } catch (error) {
      console.log("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };

  // fetch all orders
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch(`${url}/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const orders = await res.json();
        if (Array.isArray(orders)) {
          setAllOrders(orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [token]);

  return (
    <productContext.Provider
      value={{
        items,
        uniqueCategories,
        categoryMatch,
        setCategoryMatch,
        setTitle,
        searchProduct,
        searchItem,
        title,
        reviewsData,
        setReviewsData,
        user,
        token,
        setToken,
        isLogin,
        logout,
        sendMessageOnEmail,
        url,
        productRef,
        allOrders,
        loading,
        setAllOrders
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default AppProvider;
