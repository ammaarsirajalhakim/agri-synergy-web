import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../css/petalahan.css";
import Testing from "../../assets/background_5.jpg";

const Petalahan = () => {
  const [activePage, setActivePage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= 3) {
      setActivePage(page);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUpdateModal = (product) => {
    setCurrentProduct(product);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentProduct(null);
  };

  return (
    <>
      <Sidebar />
      <div className="card4">
        <div className="title4">List Lahan</div>
        <div className="button4">
          <button onClick={openModal}>+ Tambah</button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama</th>
                <th>Titik Kordinat</th>
                <th>Deskripsi</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={Testing}
                    alt="Gambar"
                    style={{ width: "70px", height: "50px" }}
                  />
                </td>
                <td>Kebogerang</td>
                <td>-7.520045399062036, 112.4692722667032</td>
                <td>Lorem ipsum dolor sit amet consectetur. Eget dictum magna tellus nisi......</td>
                <td>
                  <button className="update4" onClick={() => openUpdateModal({ name: "", coordinates: "", description: "", image: "" })}>
                    <span className="icon update-icon4" />
                  </button>
                  <button className="delete4">
                    <span className="icon delete-icon4" />
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


      {isModalOpen && (
        <div className="modal-overlay2" onClick={closeModal}>
          <div className="modal-content2" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header2">
              <h5>Tambah Lahan</h5>
              <button className="close-button2" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body2">
              <div className="form-group2">
                <label htmlFor="productName">Nama Lahan</label>
                <input type="text" id="productName" placeholder="Masukkan nama Lahan" />
              </div>
              <div className="form-group2">
                <label htmlFor="productStock">Titik Koordinat</label>
                <input type="number" id="productStock" placeholder="Masukkan Titik Koordinat" />
              </div>
              <div className="form-group2 full-width">
                <label htmlFor="productImage">Gambar Lahan</label>
                <input type="file" id="productImage" accept="image/*" />
              </div>
              <div className="form-group2 full-width">
                <label htmlFor="productDescription">Deskripsi</label>
                <textarea id="productDescription" placeholder="Masukkan Deskripsi" rows="4"></textarea>
              </div>
            </div>

            <div className="modal-footer2">
              <button className="cancel-button1" onClick={closeModal}>Kembali</button>
              <button className="save-button2">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {isUpdateModalOpen && (
        <div className="modal-overlay2" onClick={closeUpdateModal}>
          <div className="modal-content2" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header2">
              <h5>Update Lahan</h5>
              <button className="close-button2" onClick={closeUpdateModal}>×</button>
            </div>

            <div className="modal-body2">
              <div className="form-group2">
                <label htmlFor="updateProductName">Nama Lahan</label>
                <input type="text" id="updateProductName" placeholder="Masukkan nama Lahan" defaultValue={currentProduct?.name || ''} />
              </div>
              <div className="form-group2">
                <label htmlFor="updateProductStock">Titik Koordinat</label>
                <input type="text" id="updateProductStock" placeholder="Masukkan Titik Koordinat" defaultValue={currentProduct?.coordinates || ''} />
              </div>
              <div className="form-group2 full-width">
                <label htmlFor="updateProductImage">Gambar Lahan</label>
                <input type="file" id="updateProductImage" accept="image/*" />
              </div>
              <div className="form-group2 full-width">
                <label htmlFor="updateProductDescription">Deskripsi</label>
                <textarea id="updateProductDescription" placeholder="Masukkan Deskripsi" rows="4" defaultValue={currentProduct?.description || ''}></textarea>
              </div>
            </div>

            <div className="modal-footer2">
              <button className="cancel-button2" onClick={closeUpdateModal}>Kembali</button>
              <button className="save-button2Update">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Petalahan;
