// src/components/ProductDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "../css/ProductDetail.css";
import TepungJagungOrganik from "../assets/productpage/TepungJagungOrganik.png";
import KriukJagungManis from "../assets/productpage/KriukJagungManis.png";
import SirupJagungAlami from "../assets/productpage/SirupJagungAlami.png";
import PopcornJagungPremium from "../assets/productpage/PopcornJagungPremium.png";
import KacangJagungPedas from "../assets/productpage/KacangJagungPedas.png";
import KeripikJagungPedasManis from "../assets/productpage/KeripikJagungPedasManis.png";
import TepungJagungGlutenFree from "../assets/productpage/TepungJagungGluten-Free.png";
import JagungSusuKeju from "../assets/productpage/JagungSusuKeju.png";
import Header from "./Header";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Data produk dengan ID
  const products = [
    {
      id: 1,
      name: "Tepung Jagung Organik",
      price: "Rp 16.000",
      stock: 25,
      rating: 5,
      reviews: 30,
      description: "Tepung jagung organik berkualitas tinggi, cocok untuk berbagai keperluan masakan.",
      image: TepungJagungOrganik,
      ingredients: ["Jagung Organik", "Bebas Gluten"],
      sizes: ["250gr", "500gr", "1KG"],
    },
    {
      id: 2,
      name: "Kriuk Jagung Manis",
      price: "Rp 15.000",
      stock: 15,
      rating: 4,
      reviews: 22,
      description: "Camilan kriuk jagung manis yang renyah dan enak untuk segala suasana.",
      image: KriukJagungManis,
      ingredients: ["Jagung Manis", "Garam"],
      sizes: ["100gr", "200gr"],
    },
    {
      id: 3,
      name: "Sirup Jagung Alami",
      price: "Rp 17.000",
      stock: 30,
      rating: 4,
      reviews: 18,
      description: "Sirup jagung alami tanpa bahan pengawet, cocok sebagai pemanis alami.",
      image: SirupJagungAlami,
      ingredients: ["Jagung", "Air"],
      sizes: ["250ml", "500ml"],
    },
    {
      id: 4,
      name: "Popcorn Jagung Premium",
      price: "Rp 16.000",
      stock: 50,
      rating: 5,
      reviews: 45,
      description: "Popcorn jagung premium dengan rasa gurih dan tekstur renyah.",
      image: PopcornJagungPremium,
      ingredients: ["Jagung Premium", "Garam"],
      sizes: ["100gr", "500gr"],
    },
    {
      id: 5,
      name: "Kacang Jagung Pedas",
      price: "Rp 16.000",
      stock: 20,
      rating: 4,
      reviews: 25,
      description: "Kacang jagung pedas yang pas untuk Anda yang suka camilan pedas.",
      image: KacangJagungPedas,
      ingredients: ["Jagung", "Cabai"],
      sizes: ["100gr", "250gr"],
    },
    {
      id: 6,
      name: "Keripik Jagung Pedas Manis",
      price: "Rp 16.000",
      stock: 35,
      rating: 5,
      reviews: 28,
      description: "Keripik jagung dengan rasa pedas manis yang menggugah selera.",
      image: KeripikJagungPedasManis,
      ingredients: ["Jagung", "Gula", "Cabai"],
      sizes: ["100gr", "200gr"],
    },
    {
      id: 7,
      name: "Tepung Jagung Gluten-Free",
      price: "Rp 16.000",
      stock: 40,
      rating: 5,
      reviews: 32,
      description: "Tepung jagung gluten-free yang cocok untuk diet sehat.",
      image: TepungJagungGlutenFree,
      ingredients: ["Jagung Bebas Gluten"],
      sizes: ["250gr", "500gr"],
    },
    {
      id: 8,
      name: "Jagung Susu Keju",
      price: "Rp 16.000",
      stock: 10,
      rating: 4,
      reviews: 15,
      description: "Jagung susu keju dengan rasa manis dan gurih, cocok untuk camilan.",
      image: JagungSusuKeju,
      ingredients: ["Jagung", "Keju", "Susu"],
      sizes: ["250gr", "500gr"],
    },
  ];

  // Temukan produk berdasarkan id
  const product = products.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div>
      <Header />
    
    <div className="product-detail-container">
      
      <div className="product-header">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>{product.name}</h1>
      </div>
      <div className="product-content">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-main-image" />
          <div className="product-thumbnails">
            {product.sizes.map((size, index) => (
              <div key={index} className="thumbnail">
                <img src={product.image} alt={size} />
                <p>{size}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="product-info-section">
        <h2 className="product-price">{product.price}</h2>
          <p className="product-stock">({product.stock} stock)</p>
          <div className="product-rating">
            {"⭐".repeat(product.rating)} <span>({product.reviews} reviews)</span>
          </div>
          <p className="product-description">{product.description}</p>
          <ul className="product-ingredients">
            {product.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <div className="quantity-section">
            <label htmlFor="quantity">Qty:</label>
            <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
          </div>
          <button className="add-to-cart-button" onClick={() => navigate('/checkout')}> <i className="fas fa-shopping-cart"></i> Add to cart</button>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
