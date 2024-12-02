import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/footer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/CalendarStyles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import nimg3 from "../assets/notificationimg/nimg3.png";

function CalenderEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    jenis: "",
    judul: "",
    deskripsi: "",
    img: "",
  });

  useEffect(() => {
    const fetchCalendarData = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/");
        return;
      }
  
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get("http://localhost:3000/api/kalender", {
          validateStatus: function (status) {
            return status < 500;
          },
        });
  
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("jwtToken");
          navigate("/");
        }
  
        if (response.data?.token) {
          localStorage.setItem("jwtToken", response.data.token);
        }
  
        if (response.data?.data) {
          const selectedCalendar = response.data.data.find(
            (item) => item.id_kalender === parseInt(id)
          );
  
          if (selectedCalendar) {
            setFormData({
              id: selectedCalendar.id_kalender,
              jenis: selectedCalendar.jenis,
              judul: selectedCalendar.judul,
              deskripsi: selectedCalendar.deskripsi,
              img: `http://localhost:3000/api/fileKalender/${selectedCalendar.gambar}`
            });
            setDate(new Date(selectedCalendar.tanggal));
          }
        }
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("jwtToken");
          navigate("/");
          return;
        }
        console.log("Error validating token:", error);
      }
    };
  
    fetchCalendarData();
  }, [id, navigate]);

  const handleCalendarDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDatePickerChange = (date) => {
    setSelectedDate(date);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setFormData({
        ...formData,
        img: imgURL,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    console.log("Selected date:", selectedDate);
  };

  const handleCancel = () => {
    setFormData({
      jenis: "",
      judul: "",
      deskripsi: "",
      img: null,
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
              {formData.img && (
                <img
                  src={formData.img}
                  alt="img field"
                  className="calendar-add-form__img-preview"
                />
              )}
              <input
                type="file"
                name="gambar"
                onChange={handleImageChange}
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
                  <option value="">Select</option>
                  <option value="Pengingat">Pengingat</option>
                  <option value="Peringatan">Peringatan</option>
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
              <button
                type="button"
                onClick={handleCancel}
                className="calendar-add-form__cancel-button"
              >
                Batal
              </button>
              <button
                type="submit"
                className="calendar-add-form__submit-button"
                onClick={() => navigate("/calendarview")}
              >
                Edit
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

export default CalenderEdit;
