import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/CalendarStyles.css';
import KalenderImg from '../assets/kalender_img.png';
import { useNavigate } from "react-router-dom";

function CalenderView() {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        // Perform delete action here
        setShowDeleteModal(false);
        navigate('/calendar');  // Navigate after delete
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
        <Header />
        <div className="custom-calendar-container">
            <div className="custom-content-card">
                <h3>Judul here</h3>
                <img 
                    src={KalenderImg}
                    alt="Placeholder"
                    className="custom-content-image"
                />
                <p>27 Oktober 2024</p>
                <p>
                    Lorem ipsum dolor sit amet consectetur. Rhoncus neque proin nullam netus natoque. Odio accumsan sed hendrerit dignissim interdum. Placerat adipiscing venenatis et lobortis sit nunc risus. Felis turpis nulla enim eget. A suscipit viverra enim ipsum pellentesque interdum et a. Sagittis at neque est in adipiscing. Vulputate habitant sodales hendrerit congue ullamcorper egestas scelerisque ac pharetra. Dui malesuada tellus posuere orci lectus. Orci lorem id sagittis cras nisi diam.
                </p>
                <div className="custom-button-group">
                    <button className="custom-edit-button" onClick={() => navigate('/calendaredit')}>Edit</button>
                    <button onClick={handleDeleteClick} className="custom-delete-button">Hapus</button>
                </div>
            </div>
            <div className="rectangles-kalender"></div>
            <div className="custom-calendar-wrapper">
                <Calendar 
                    onChange={handleDateChange} 
                    value={date} 
                    next2Label={null} 
                    prev2Label={null}
                />
            </div>
        </div>
        
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-icon">
                        {/* Tambahkan tanda seru di sini */}
                        <span className="exclamation-icon">!</span>
                    </div>
                    <h2>Are you sure?</h2>
                    <p>You won't be able to revert this!</p>
                    <button onClick={confirmDelete} className="modal-confirm-button">Yes, delete it!</button>
                    <button onClick={cancelDelete} className="modal-cancel-button">Cancel</button>
                </div>
            </div>
        )}
        
        <Footer />
        </>
    );
}

export default CalenderView;
