import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../css/kategori.css";

const Kategori = () => {
  const [activePage, setActivePage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

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
              <tr>
                <td>dadada</td>
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
              <button className="save-button">Simpan</button>
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
