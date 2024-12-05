import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/ProductDetail.css";
import Header from "./Header";
import Footer from "./footer";
import axios from "axios";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

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

  // Temukan produk berdasarkan id
  const product = products.find((product) => product.id_produk === parseInt(id));

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        <div className="product-header">
          <button onClick={() => window.history.back()} className="back-button">
            ←
          </button>
          <h1>{product.nama}</h1>
        </div>
        <div className="product-content">
          <div className="product-image-section">
            <img
              src={`http://localhost:3000/api/fileProduk/${product.foto_produk}`}
              alt={product.name}
              className="product-main-image"
            />
            <div className="product-thumbnails">
              {product.sizes?.map((size, index) => (
                <div key={index} className="thumbnail">
                  <img src={`http://localhost:3000/api/fileProduk/${product.foto_produk}`} alt={size} />
                  <p>{size}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="product-info-section">
            <h2 className="product-price">Rp. {product.harga}</h2>
            <p className="product-stock">({product.kuantitas} stock)</p>
            <div className="product-rating">
              {"⭐".repeat(product.rating)} <span>({product.reviews} reviews)</span>
            </div>
            <p className="product-description">{product.deskripsi}</p>
            <ul className="product-ingredients">
              {product.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <div className="quantity-section">
              <label htmlFor="quantity">Qty:</label>
              <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
            </div>
            <button
              className="add-to-cart-button"
              onClick={() => navigate("/checkout")}
            >
              <i className="fas fa-shopping-cart"></i> Add to cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
