// src/components/ProductPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/ProductPage.css";
import Header from "./Header";
import Footer from "./footer";
import TepungJagungOrganik from "../assets/productpage/TepungJagungOrganik.png";
import KriukJagungManis from "../assets/productpage/KriukJagungManis.png";
import SirupJagungAlami from "../assets/productpage/SirupJagungAlami.png";
import PopcornJagungPremium from "../assets/productpage/PopcornJagungPremium.png";
import KacangJagungPedas from "../assets/productpage/KacangJagungPedas.png";
import KeripikJagungPedasManis from "../assets/productpage/KeripikJagungPedasManis.png";
import TepungJagungGlutenFree from "../assets/productpage/TepungJagungGluten-Free.png";
import JagungSusuKeju from "../assets/productpage/JagungSusuKeju.png";

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState("Keripik Jagung");

  const products = [
    { id: 1, name: "Tepung Jagung Organik", price: "Rp 16.000", img: TepungJagungOrganik, rating: 5, tag: "HOT" },
    { id: 2, name: "Kriuk Jagung Manis", price: "Rp 15.000", img: KriukJagungManis, rating: 4, tag: "" },
    { id: 3, name: "Sirup Jagung Alami", price: "Rp 17.000", img: SirupJagungAlami, rating: 4, tag: "" },
    { id: 4, name: "Popcorn Jagung Premium", price: "Rp 16.000", img: PopcornJagungPremium, rating: 5, tag: "" },
    { id: 5, name: "Kacang Jagung Pedas", price: "Rp 16.000", img: KacangJagungPedas, rating: 3, tag: "" },
    { id: 6, name: "Keripik Jagung Pedas Manis", price: "Rp 16.000", img: KeripikJagungPedasManis, rating: 5, tag: "" },
    { id: 7, name: "Tepung Jagung Gluten-Free", price: "Rp 16.000", img: TepungJagungGlutenFree, rating: 4, tag: "" },
    { id: 8, name: "Jagung Susu Keju", price: "Rp 16.000", img: JagungSusuKeju, rating: 5, tag: "" },
  ];

  const categories = [
    "Keripik Jagung",
    "Tepung Jagung",
    "Popcorn",
    "Camilan Jagung",
    "Jagung Alami",
    "Jagung Manis",
    "Jagung Organik",
    "Olahan Jagung"
  ];

  return (
    <>
      <Header />
      <div className="container">
        <aside className="category-sidebar">
          <h2 className="category-sidebar-h2">Category</h2>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                <a href="#">{category}</a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="product-section">
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-page">
                <div>
                  <img src={product.img} alt={product.name} id="product-image" />
                </div>
                <h3>{product.name}</h3>
                <div className="rating">{"⭐".repeat(product.rating)}</div>
                <p>{product.price}</p>
                <Link to={`/detail/${product.id}`}>
                  <button>Detail</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
