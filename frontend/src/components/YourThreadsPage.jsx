import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './footer';
import '../css/CommunityPage.css';

const YourThreadsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="community-page">
            <Header />

            <div className="content-container">
                {/* Sidebar Kiri */}
                <div className="sidebar-left">
                    <button 
                        className="sidebar-button" 
                        onClick={() => navigate('/community')}
                    >
                        <i className="fas fa-users"></i> Community
                    </button>
                    <button className="sidebar-button active">
                        <i className="fas fa-hashtag"></i> Your Threads
                    </button>
                    <button className="sidebar-button" onClick={() => navigate('/saved')}>
                        <i className="fas fa-bookmark"></i> Saved
                    </button>
                    <button className="sidebar-button" onClick={() => navigate('/login')}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>

                {/* Konten Utama */}
                <div className="main-content">
                    <h1 className='your-threads-title'>Your Threads</h1>
                    <div className="post">
                        <div className="post-header">
                            <p><strong>Yayan</strong></p>
                            <span>30m ago</span>
                        </div>
                        <p>Halo saya anggota baru!</p>
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

export default YourThreadsPage;
