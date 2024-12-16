import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/ProductPage.css";
import Header from "./Header";
import Footer from "./footer";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const navigate = useNavigate();

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
  
    const ratings = reviews.map(review => review.rating);
    
    if (ratings.length === 0) return 0;
  
    const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    return Math.round(averageRating);
  };

  const checkAuthentication = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get("http://localhost:3000/api/produk", {
        validateStatus: (status) => status < 500,
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("jwtToken");
        navigate("/");
        return;
      }

      if (response.data?.token) {
        localStorage.setItem("jwtToken", response.data.token);
      }

      if (response.data?.data) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error validating token:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("jwtToken");
        navigate("/");
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/kategori", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.data?.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    checkAuthentication();
    fetchCategories();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <aside className="category-sidebar">
          <h2 className="category-sidebar-h2">Category</h2>
          <ul>
            {categories.map((kategori) => (
              <li
                key={kategori.id_kategori}
                className={activeCategory === kategori ? "active" : ""}
                onClick={() => setActiveCategory(kategori)}
              >
                <a href="#">{kategori.nama}</a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="product-section">
          <div className="product-list">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id_produk} className="product-page">
                  <div>
                    <img
                      src={`http://localhost:3000/api/fileProduk/${product.foto_produk}`}
                      alt={`Produk ${product.nama}`}
                      id="product-image"
                    />
                  </div>
                  <h3>{product.nama}</h3>
                  <div className="rating">
                    {"⭐".repeat(calculateAverageRating(product.reviews))}
                  </div>
                  <p className="product-description1">{product.deskripsi}</p>
                  <p>{`Rp ${Number(product.harga).toLocaleString('id-ID')}. -`}</p>
                  <Link to={`/detail/${product.id_produk}`}>
                    <button>Detail</button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="no-products">Tidak ada data produk.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;