import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../css/produk.css";

const produk = [
  {
    kataegori : 'Produk',
    image : 'src/assets/products/produk-1.png',
    nama : 'dajdjad',
    stok : '10',
    harga : '10000',
  },
]

const Produk = () => {
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
      <div className="card1">
        <div className="title1">
          <h6>List Produk</h6>
        </div>
        <div className="button1">
          <button onClick={openModal}>+ Tambah</button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Gambar</th>
                <th>Nama</th>
                <th>Stok</th>
                <th>Harga</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {produk.map((product, index) => (
                <tr key={index}>
                  <td>{product.kataegori}</td>
                  <td>
                    <img src={product.image} alt="Product"
                    width="50"
                    height="50" />
                  </td>
                  <td>{product.nama}</td>
                  <td>{product.stok}</td>
                  <td>{product.harga}</td>
                  <td>
                    <button
                      className="update1"
                      onClick={() =>
                        openUpdateModal({
                          name: "",
                          stock: "",
                          price: "",
                          category: "",
                        })
                      }
                    >
                      <span className="icon update-icon1" />
                    </button>
                    <button className="delete1">
                      <span className="icon delete-icon1" />
                    </button>
                  </td>
                </tr>
              ))}
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
        <div className="modal-overlay1" onClick={closeModal}>
          <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header1">
              <h5>Tambah Produk</h5>
              <button className="close-button1" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="modal-body1">
              <div className="form-group1">
                <label htmlFor="productName">Nama Produk</label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Masukkan nama produk"
                />
              </div>
              <div className="form-group1">
                <label htmlFor="productStock">Stok</label>
                <input
                  type="number"
                  id="productStock"
                  placeholder="Masukkan stok"
                />
              </div>
              <div className="form-group1">
                <label htmlFor="productPrice">Harga</label>
                <input
                  type="text"
                  id="productPrice"
                  placeholder="Masukkan harga"
                />
              </div>
              <div className="form-group1">
                <label htmlFor="productImage">Gambar Produk</label>
                <input type="file" id="productImage" accept="image/*" />
              </div>
              <div className="form-group1 full-width">
                <label htmlFor="productKategori">Kategori</label>
                <select id="productKategori" placeholder="Pilih Kategori">
                  <option value="">Pilih Kategori</option>
                  <option value="elektronik">Elektronik</option>
                  <option value="fashion">Fashion</option>
                  <option value="makanan">Makanan</option>
                  <option value="perabot">Perabot</option>
                </select>
              </div>
            </div>

            <div className="modal-footer1">
              <button className="cancel-button1" onClick={closeModal}>
                Kembali
              </button>
              <button className="save-button1">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {isUpdateModalOpen && currentProduct && (
        <div className="modal-overlay1" onClick={closeUpdateModal}>
          <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header1">
              <h5>Update Produk</h5>
              <button className="close-button1" onClick={closeUpdateModal}>
                ×
              </button>
            </div>

            <div className="modal-body1">
              <div className="form-group1">
                <label htmlFor="updateProductName">Nama Produk</label>
                <input
                  type="text"
                  id="updateProductName"
                  value={currentProduct.name}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group1">
                <label htmlFor="updateProductStock">Stok</label>
                <input
                  type="number"
                  id="updateProductStock"
                  value={currentProduct.stock}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      stock: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group1">
                <label htmlFor="updateProductPrice">Harga</label>
                <input
                  type="text"
                  id="updateProductPrice"
                  value={currentProduct.price}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group1">
                <label htmlFor="updateProductImage">Gambar Produk</label>
                <input type="file" id="updateProductImage" accept="image/*" />
              </div>
              <div className="form-group1 full-width">
                <label htmlFor="updateProductKategori">Kategori</label>
                <select
                  id="updateProductKategori"
                  value={currentProduct.category}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Pilih Kategori</option>
                  <option value="elektronik">Elektronik</option>
                  <option value="fashion">Fashion</option>
                  <option value="makanan">Makanan</option>
                  <option value="perabot">Perabot</option>
                </select>
              </div>
            </div>

            <div className="modal-footer1">
              <button className="cancel-button1" onClick={closeUpdateModal}>
                Kembali
              </button>
              <button className="save-button1Update">Update</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Produk;