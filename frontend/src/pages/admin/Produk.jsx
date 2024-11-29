import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import "../../css/produk.css";

const Produk = () => {
  const [activePage, setActivePage] = useState(1);
  const [kategori, setKategori] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(
        "http://localhost:3000/api/produk-detail",

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
        setProducts(response.data.data);
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("jwtToken");
        navigate("/");
      }
      console.error("Error validating token:", error);
    }
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    const productName = document.getElementById("productName").value;
    const productStock = document.getElementById("productStock").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImage = document.getElementById("productImage").files[0];
    const productCategory = document.getElementById("productKategori").value;
    const ProductDeskripsi = document.getElementById("productDeskripsi").value;
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    const userId = localStorage.getItem("id_user");

    formData.append("id_user", userId);
    formData.append("id_kategori", productCategory);
    formData.append("nama", productName);
    formData.append("harga", productPrice);
    formData.append("kuantitas", productStock);
    formData.append("deskripsi", ProductDeskripsi);
    formData.append("foto_produk", productImage);
    formData.append("tanggal_diposting", formattedDate);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/produk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      if (response.status === 200) {
        closeModal();
        setProducts((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/kategori", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.data?.data) {
        setKategori(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    checkAuthentication();
    fetchCategories();
  }, []);

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
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id_produk}>
                    <td>{product.nama_kategori}</td>
                    <td>
                      <img
                        src={`http://localhost:3000/api/file/${product.foto_produk}`}
                        alt="Produk"
                        width="60"
                        height="60"
                      />
                    </td>
                    <td>{product.nama}</td>
                    <td>{product.kuantitas}</td>
                    <td>{`Rp ${Number(product.harga).toLocaleString()}`}</td>
                    <td>
                      <button
                        className="update1"
                        onClick={() =>
                          openUpdateModal({
                            nama: product.nama,
                            kuantitas: product.kuantitas,
                            harga: product.harga,
                            kategori: product.kategori,
                            deskripsi: product.deskripsi,
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
                ))
              ) : (
                <tr>
                  <td colSpan="6">Tidak ada data produk.</td>
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
                  <option  disabled>Pilih Kategori</option>
                  {kategori.map((category) => (
                    <option
                      key={category.id_kategori}
                      value={category.id_kategori}
                    >
                      {category.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group1 full-width">
                <label htmlFor="productDeskripsi">Deskripsi</label>
                <textarea
                  id="productDeskripsi"
                  placeholder="Masukkan deskripsi"
                />
              </div>
            </div>

            <div className="modal-footer1">
              <button className="cancel-button1" onClick={closeModal}>
                Kembali
              </button>
              <button className="save-button1" onClick={handleAddProduct}>
                Simpan
              </button>
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
