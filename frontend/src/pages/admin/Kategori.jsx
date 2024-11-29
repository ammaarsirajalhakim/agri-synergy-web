import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import "../../css/kategori.css";

const Kategori = () => {
  const [activePage, setActivePage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [kategori, setKategori] = useState([]);

  const checkAuthentication = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(
        "http://localhost:3000/api/kategori",

        {
          validateStatus: function (status) {
            return status < 500;
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("jwtToken");
        navigate("/");
        return;
      }

      if (response.data?.token) {
        localStorage.setItem("jwtToken", response.data.token);
      }

      if (response.data?.data) {
        setKategori(response.data.data);
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("jwtToken");
        navigate("/");
        return;
      }
      console.log("Error Vakidating token:", error);
    }
  };

  const handleAddCategory = async () => {
    const NamaCategory = document.getElementById("kategoriName").value;

    try {
      const response = await axios.post("http://localhost:3000/api/kategori", {
        nama: NamaCategory,
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.log("Error adding category:", response);
      }
    } catch (error) {
      console.log("Error adding category:", error);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= 3) {
      setActivePage(page);
    }
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openUpdateModal = (category) => {
    setCategoryToEdit(category);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCategoryToEdit(null);
  };

  return (
    <>
      <Sidebar />
      <div className="card">
        <div className="title">
          <h6>List Kategori</h6>
        </div>
        <div className="button">
          <button onClick={openAddModal}>+ Tambah</button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {kategori.length > 0 ? (
                kategori.map((kategori) => (
                  <tr key={kategori.id_kategori}>
                    <td>{kategori.nama}</td>
                    <td>
                      <button
                        className="update"
                        onClick={() => openUpdateModal({ name: "" })}
                      >
                        <span className="icon update-icon" />
                      </button>
                      <button className="delete">
                        <span className="icon delete-icon" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Tidak ada data produk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="entri">
          <p className="entri-text">Menampilkan 1 dari 1 entri</p>
          <div className="pagination">
            <button
              className={`pagination-button prev ${
                activePage === 1 ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}
            >
              «
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`pagination-button ${
                  activePage === page ? "active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={`pagination-button next ${
                activePage === 3 ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === 3}
            >
              »
            </button>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay" onClick={closeAddModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Tambah Kategori</h5>
              <button className="close-button1" onClick={closeAddModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="kategoriName">Nama Kategori</label>
                <input
                  type="text"
                  id="kategoriName"
                  placeholder="Masukkan nama kategori"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={closeAddModal}>
                Kembali
              </button>
              <button className="save-button" onClick={handleAddCategory}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      {isUpdateModalOpen && categoryToEdit && (
        <div className="modal-overlay" onClick={closeUpdateModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Update Kategori</h5>
              <button className="close-button" onClick={closeUpdateModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="kategoriName">Nama Kategori</label>
                <input
                  type="text"
                  id="kategoriName"
                  placeholder="Masukkan nama kategori"
                  defaultValue={categoryToEdit.name}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={closeUpdateModal}>
                Kembali
              </button>
              <button className="save-buttonUpdate">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Kategori;
