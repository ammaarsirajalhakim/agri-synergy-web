import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../css/kategori.css";

const Kategori = () => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= 3) {
      setActivePage(page);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="card">
        <div className="title">
          <h6>List Kategori</h6>
        </div>
        <div className="button">
          <button>+ Tambah</button>
        </div>
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
                <button className="update">
                  <span className="icon update-icon" />
                </button>
                <button className="delete">
                  <span className="icon delete-icon" />
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

export default Kategori;
