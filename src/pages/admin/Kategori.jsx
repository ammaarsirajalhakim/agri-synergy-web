import Sidebar from "../../components/Sidebar";
import Update from "../../assets/icons/update.png";
import Delete from "../../assets/icons/delete.png";
import "../../css/kategori.css";

const Kategori = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Sidebar />
        </div>
        <div className="col">
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
              <p>Menampilkan 1 dari 1 entri</p>
              <div className="pagination">
                <button className="pagination-button prev">«</button>
                <button className="pagination-button">1</button>
                <button className="pagination-button">2</button>
                <button className="pagination-button">3</button>
                <button className="pagination-button next">»</button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kategori;
