import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Testing from "../../assets/background_5.jpg";
import "../../css/produk.css";

const Produk = () => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= 3) {
      setActivePage(page);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="card1">
        <div className="title1">
          <h6>List Produk</h6>
        </div>
        <div className="button1">
          <button>+ Tambah</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Nama</th>
              <th>Stok</th>
              <th>Harga</th>
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
              <td>Produk 1</td>
              <td>10</td>
              <td>Rp. 100.000,00</td>
              <td>
                <button className="update1">
                  <span className="icon update-icon1" />
                </button>
                <button className="delete1">
                  <span className="icon delete-icon1" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

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
    </>
  );
};

export default Produk;
