import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/CalendarStyles.css';
import NotificationCard from '../components/NotificationCard';
import { useNavigate } from "react-router-dom"

const notifications = [
    {
        title: "Peringatan: Waktu Penanaman Jagung",
        message: "Jangan lupa, tanggal 30 Oktober adalah waktu terbaik untuk memulai penanaman jagung musim ini",
        image: "src/assets/notificationimg/nimg3.png",
    },
    {
        title: "Peringatan Cuaca: Hujan Lebat",
        message: "Waspada, hujan lebat diprediksi turun pada tanggal 2 November. Pastikan lahan sudah siap dan terlindungi",
        image: "src/assets/notificationimg/nimg2.png",
    },
    {
        title: "Peringatan: Waktu Panen Mendekat",
        message: "Bersiaplah untuk panen pada 5 November. Pastikan semua alat panen sudah disiapkan dan distribusi telah diatur",
        image: "src/assets/notificationimg/nimg1.png",
    },
];

function Calender() {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

    return (
        <>
            <Header />
            <div className="custom-calendar-container">
                <div className="calendar-notif-list">
                    <div className="calendar-notif-add-button" onClick={()=> navigate('/calendaradd')}>+</div>
                    {notifications.map((notification, index) => (
                        <NotificationCard
                            key={index}
                            title={notification.title}
                            message={notification.message}
                            image={notification.image}
                        />
                    ))}
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
            <Footer />
        </>

    )
}

export default Calender;