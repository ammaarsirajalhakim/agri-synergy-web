import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/CalendarStyles.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CalendarAdd() {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());

    const [formData, setFormData] = useState({
        jenis: '',
        judul: '',
        deskripsi: '',
        tanggal: '',
        gambar: null,
        id_user: '', 
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const idUser = localStorage.getItem('id_user');
        if (!idUser) {
            alert('Anda harus login terlebih dahulu');
            navigate('/login'); 
        } else {
            setFormData((prevState) => ({
                ...prevState,
                id_user: idUser,
            }));
        }
    }, [navigate]);

    const handleCalendarDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setError('');
    };

    const handleDatePickerChange = (tanggal) => {
        setFormData((prevState) => ({
            ...prevState,
            tanggal: tanggal ? tanggal.toISOString() : '', // Format ISO
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            gambar: file,
        }));
    };

    const validateForm = () => {
        if (
            !formData.jenis ||
            !formData.judul ||
            !formData.deskripsi ||
            !formData.tanggal ||
            isNaN(new Date(formData.tanggal).getTime()) 
        ) {
            setError('Semua field harus diisi dengan benar');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    setError('');
    setLoading(true);

    try {
        const formDataToSend = new FormData();
        formDataToSend.append('jenis', formData.jenis);
        formDataToSend.append('judul', formData.judul);
        formDataToSend.append('deskripsi', formData.deskripsi);
        formDataToSend.append('tanggal', formData.tanggal);
        formDataToSend.append('id_user', formData.id_user);
        if (formData.gambar) {
            formDataToSend.append('gambar', formData.gambar);
        }

        // Debug log
        console.log('Form Data:', Object.fromEntries(formDataToSend));

        const response = await axios.post(
            'http://localhost:3000/api/kalender',
            formDataToSend,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        if (response.data.success) {
            alert('Input Berhasil!');
            navigate('/calendar');
        } else {
            setError(response.data.message || 'Terjadi kesalahan saat Input');
        }
    } catch (err) {
        const errorMessage =
            err.response?.data?.message || 'Terjadi kesalahan pada server';
        setError(errorMessage);
        console.error('Error:', err);
    } finally {
        setLoading(false);
    }
};


    return (
        <>
            <Header />
            <div className="custom-calendar-container">
                <div className="calendar-add-form__container">
                    <form onSubmit={handleSubmit} className="calendar-add-form__form">
                        <div className="calendar-add-form__group">
                            <label>Gambar</label>
                            <input
                                type="file"
                                name="gambar"
                                onChange={handleFileChange}
                                className="calendar-add-form__file-input"
                            />
                        </div>

                        <div className="calendar-add-form__row">
                            <div className="calendar-add-form__group">
                                <label>Jenis</label>
                                <select
                                    name="jenis"
                                    value={formData.jenis}
                                    onChange={handleChange}
                                    className="calendar-add-form__select"
                                >
                                    <option value="">Pilih Jenis</option>
                                    <option value="Event">Pengingat</option>
                                    <option value="Task">Peringatan</option>
                                </select>
                            </div>
                            <div className="calendar-add-form__group">
                                <label>Judul</label>
                                <input
                                    type="text"
                                    name="judul"
                                    value={formData.judul}
                                    onChange={handleChange}
                                    className="calendar-add-form__input"
                                />
                            </div>
                        </div>

                        <div className="calendar-add-form__group">
                            <label>Tanggal</label>
                            <DatePicker
                                selected={
                                    formData.tanggal ? new Date(formData.tanggal) : null
                                }
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

                        {error && <p className="calendar-add-form__error">{error}</p>}

                        <div className="calendar-add-form__buttons">
                            <button
                                type="button"
                                onClick={() => navigate('/calendar')}
                                className="calendar-add-form__cancel-button"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="calendar-add-form__submit-button"
                            >
                                {loading ? 'Loading...' : 'Tambah'}
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

export default CalendarAdd;
