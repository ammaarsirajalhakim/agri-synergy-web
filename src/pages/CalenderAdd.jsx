import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/CalendarStyles.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom"

function CalenderAdd() {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());

    const handleCalendarDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [formData, setFormData] = useState({
        jenis: '',
        judul: '',
        deskripsi: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDatePickerChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        console.log('Selected date:', selectedDate);
    };

    const handleCancel = () => {
        setFormData({
            jenis: '',
            judul: '',
            deskripsi: ''
        });
        setSelectedDate(null);
    };

    return (
        <>
            <Header />
            <div className="custom-calendar-container">
                <div className="calendar-add-form__container">
                    <form onSubmit={handleSubmit} className="calendar-add-form__form">
                        <div className="calendar-add-form__group">
                            <label>Gambar</label>
                            <input type="file" name="gambar" className="calendar-add-form__file-input" />
                        </div>

                        <div className="calendar-add-form__row">
                            <div className="calendar-add-form__group">
                                <label>Jenis</label>
                                <select name="jenis" value={formData.jenis} onChange={handleChange} className="calendar-add-form__select">
                                    <option value="">Select</option>
                                    <option value="Event">Pengingat</option>
                                    <option value="Task">Peringatan</option>
                                </select>
                            </div>
                            <div className="calendar-add-form__group">
                                <label>Judul</label>
                                <input type="text" name="judul" value={formData.judul} onChange={handleChange} className="calendar-add-form__input" />
                            </div>
                        </div>

                        <div className="calendar-add-form__group">
                            <label>Tanggal</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDatePickerChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="DD/MM/YY"
                                className="calendar-add-form__datepicker"
                            />
                        </div>

                        <div className="calendar-add-form__group">
                            <label>Deskripsi</label>
                            <textarea
                                name="deskripsi"
                                value={formData.deskripsi}
                                onChange={handleChange}
                                className="calendar-add-form__textarea"
                            ></textarea>
                        </div>

                        <div className="calendar-add-form__buttons">
                            <button type="button" onClick={ ()=> navigate('/calendar')} className="calendar-add-form__cancel-button">
                                Batal
                            </button>
                            <button type="submit" onClick={ ()=> navigate('/calendar')} className="calendar-add-form__submit-button">
                                Tambah
                            </button>
                        </div>
                    </form>
                </div>
                <div className="rectangles-kalender"></div>
                <div className="custom-calendar-wrapper">
                    <Calendar 
                        onChange={handleCalendarDateChange} 
                        value={date} 
                        next2Label={null} 
                        prev2Label={null}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CalenderAdd;
