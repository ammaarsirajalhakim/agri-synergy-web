import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './footer';
import '../css/CommunityPage.css';

const CommunityPage = () => {
    const [image, setImage] = useState(null);
    const navigate = useNavigate(); // Tambahkan hook useNavigate

    // Fungsi untuk menangani perubahan pada input gambar
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const selectedImage = event.target.files[0];
            setImage(URL.createObjectURL(selectedImage));
        }
    };

    return (
        <div className="community-page">
            <Header />

            <div className="content-container">
                {/* Sidebar Kiri */}
                <div className="sidebar-left">
                    <button className="sidebar-button active">
                        <i className="fas fa-users"></i> Community
                    </button>
                    <button 
                        className="sidebar-button" 
                        onClick={() => navigate('/your-threads')}
                    >
                        <i className="fas fa-hashtag"></i> Your Threads
                    </button>
                    <button className="sidebar-button" onClick={() => navigate('/saved')}>
                        <i className="fas fa-bookmark"></i> Saved
                    </button>
                    <button className="sidebar-button"onClick={() => navigate('/login')}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>

                {/* Konten Utama */}
                <div className="main-content">
                    <div className="share-form">
                        <input type="text" placeholder="Apa yang ingin Anda diskusikan?" />
                        <button className="share-button">Bagikan</button>
                        
                        {/* Input untuk gambar */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="image-input"
                        />

                        {/* Menampilkan preview gambar */}
                        {image && (
                            <div className="image-preview">
                                <img src={image} alt="Preview Gambar" />
                            </div>
                        )}
                    </div>

                    {/* Post Forum */}
                    <div className="post">
                        <div className="post-header">
                            <p><strong>Yanto, Petani Jagung</strong></p>
                            <span>1h ago</span>
                        </div>
                        <p>Forum ini sangat membantu saya dalam berbagai pengalaman dengan petani lain...</p>
                        <div className="post-actions">
                            <button className="like-button">
                                <i className="fas fa-thumbs-up"></i> Like
                            </button>
                            <button className="unlike-button">
                                <i className="fas fa-thumbs-down"></i> Unlike
                            </button>
                        </div>
                    </div>

                    <div className="post">
                        <div className="post-header">
                            <p><strong>Siti, Distributor Hasil Pertanian</strong></p>
                            <span>1h ago</span>
                        </div>
                        <p>Berkat forum ini, saya lebih mudah bertanya tentang pengelolaan hasil pertanian...</p>
                        <div className="post-actions">
                            <button className="like-button">
                                <i className="fas fa-thumbs-up"></i> Like
                            </button>
                            <button className="unlike-button">
                                <i className="fas fa-thumbs-down"></i> Unlike
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Kanan */}
                <div className="sidebar-right">
                    <button className="login-button" onClick={() => navigate('/login')}>Login</button>
                    <div className="community-list">
                        <h3>Anggota Komunitas</h3>
                        <ul>
                            <li>Yanto Pratama</li>
                            <li>Siti Marlina</li>
                            <li>Rudi Santoso</li>
                            <li>Wahyu Nugroho</li>
                            <li>Fifi Rahayu</li>
                            <li>Devi Anggraini</li>
                        </ul>
                    </div>
                    
                    <div className="trending-topics">
                        <h3>Trending Topik</h3>
                        <ul>
                            <li>#Jagung Manis</li>
                            <li>#Tanaman Padi</li>
                            <li>#HapusGuna</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CommunityPage;
