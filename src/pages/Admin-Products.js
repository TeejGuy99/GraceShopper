import React, { useState } from "react";
import {
  addToCart,
  getAllProducts,
  getUserCart,
  deleteProduct,
  adminEditProduct,
  adminEditProductPhoto,
  createNewProduct,
  adminCreatePhoto,
  getUserInfo,
} from "../api";
import { useEffect } from "react";
import "../style/AdminProducts.scss";
import { AdminNav } from "../components";
import { FaPen, FaTrash } from "react-icons/fa";

const AdminProducts = (props) => {
  const {
    products,
    setProducts,
    guestId,
    setGuestId,
    userId,
    getUserToken,
    setUserCartItems,
    getUserCartItems,
  } = props;
  const [editProduct, setEditProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productInventory, setProductInventory] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPhotoLink, setProductPhotoLink] = useState("");
  const [productPhotoDescription, setProductPhotoDescription] = useState("");
  const [addProduct, setAddProduct] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductInventory, setNewProductInventory] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductPhotoLink, setNewProductPhotoLink] = useState("");
  const [newProductPhotoDescription, setNewProductPhotoDescription] =
    useState("");
  const [userInfo, setUserInfo] = useState("");

  const resetEditState = () => {
    setEditProduct(null);
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductInventory("");
    setProductCategory("");
    setProductPhotoLink("");
    setProductPhotoDescription("");
  };

  const resetAddState = () => {
    setAddProduct(null);
    setNewProductName("");
    setNewProductDescription("");
    setNewProductPrice("");
    setNewProductInventory("");
    setNewProductCategory("");
    setNewProductPhotoLink("");
    setNewProductPhotoDescription("");
  };

  const handleRoutines = () => {
    getAllProducts().then((theProducts) => {
      setProducts(theProducts);
    });
    // getUserInfo(5).then((result) => {
    //   setUserInfo(result);
    // });
  };

  useEffect(() => {
    handleRoutines();
  }, []);
  console.log(userInfo);
  return (
    <div className="admin-products-container">
      <div className="dashboard-container">
        <AdminNav />
      </div>
      <div className="products-wrapper">
        {!addProduct ? (
          !editProduct ? (
            <div className="add-new-product">
              <button
                className="addItem-btn"
                onClick={async (event) => {
                  event.preventDefault();
                  setAddProduct(true);
                  handleRoutines();
                }}
              >
                ADD NEW PRODUCT
              </button>
              <div className="item-container">
                {products
                  .sort(function (a, b) {
                    var keyA = a.id,
                      keyB = b.id;
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                  })
                  .map((product) => {
                    return (
                      <div className="items" key={product.id}>
                        <img
                          className="item-imgs"
                          src={product.photos[0].link}
                          alt={product.photos[0].description}
                        />
                        <div className="admin-btns">
                          <button
                            className="edit-btn"
                            onClick={async (event) => {
                              event.preventDefault();
                              setEditProduct(product);
                              handleRoutines();
                            }}
                          >
                            <FaPen />
                          </button>

                          <button
                            className="delete-btn"
                            onClick={async (event) => {
                              event.preventDefault();
                              await deleteProduct(getUserToken, product.id);
                              handleRoutines();
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="edit-container">
              <img
                src={editProduct.photos[0].link}
                alt={editProduct.photos[0].description}
                // style={{ height: "400px" }}
              />
              <form
                onSubmit={async (event) => {
                  try {
                    event.preventDefault();
                    await adminEditProduct(
                      editProduct.id,
                      productName,
                      productDescription,
                      productPrice,
                      productInventory,
                      productCategory
                    );
                    await adminEditProductPhoto(
                      editProduct.photos[0].id,
                      productPhotoDescription,
                      productPhotoLink,
                      editProduct.id
                    );
                    handleRoutines();
                    resetEditState();
                  } catch (error) {
                    console.error(error);
                  }
                }}
                id="editProductForm"
              >
                <div>
                  <label>Name: </label>
                  <input
                    id="editProductName"
                    type="text"
                    required
                    placeholder={editProduct.name}
                    value={productName}
                    onChange={(event) => {
                      setProductName(event.target.value);
                      console.log(productName);
                    }}
                  />
                </div>
                <div>
                  <label>Description: </label>
                  <textarea
                    id="editProductDescription"
                    type="text"
                    style={{ height: "50px" }}
                    required
                    placeholder={editProduct.description}
                    value={productDescription}
                    onChange={(event) => {
                      setProductDescription(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Price: </label>
                  <input
                    id="editProductPrice"
                    type="number"
                    step="0.01"
                    required
                    placeholder={editProduct.price}
                    value={productPrice}
                    onChange={(event) => {
                      setProductPrice(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Inventory: </label>
                  <input
                    id="editProductQuantity"
                    type="text"
                    required
                    placeholder={editProduct.qtyAvailable}
                    value={productInventory}
                    onChange={(event) => {
                      setProductInventory(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Category: </label>
                  <input
                    id="editProductCategory"
                    type="text"
                    required
                    placeholder={editProduct.category}
                    value={productCategory}
                    onChange={(event) => {
                      setProductCategory(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Photo Link: </label>
                  <input
                    id="editProductPhotoLink"
                    type="text"
                    required
                    placeholder={editProduct.photos[0].link}
                    value={productPhotoLink}
                    onChange={(event) => {
                      setProductPhotoLink(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Photo Alt Text: </label>
                  <input
                    id="editProductPhotoDescription"
                    type="text"
                    required
                    placeholder={editProduct.photos[0].description}
                    value={productPhotoDescription}
                    onChange={(event) => {
                      setProductPhotoDescription(event.target.value);
                    }}
                  />
                </div>
                <button id="editProductButton">SUBMIT</button>
              </form>
              <div className="back-btn">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setEditProduct(null);
                  }}
                >
                  BACK
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="add-product">
            <div className="new-product-title">
              <p>ADD NEW PRODUCT</p>
            </div>
            <div className="add-product-form">
              <form
                onSubmit={async (event) => {
                  try {
                    event.preventDefault();
                    const newProduct = await createNewProduct(
                      getUserToken,
                      newProductName,
                      newProductDescription,
                      newProductPrice,
                      newProductInventory,
                      newProductCategory
                    );
                    await adminCreatePhoto(
                      newProductPhotoDescription,
                      newProductPhotoLink,
                      newProduct.id
                    );
                    handleRoutines();
                    resetAddState();
                  } catch (error) {
                    console.error(error);
                  }
                }}
                id="addProductForm"
              >
                <div>
                  <label>Name: </label>
                  <input
                    id="addProductName"
                    type="text"
                    required
                    placeholder="New Product Name*"
                    value={newProductName}
                    onChange={(event) => {
                      setNewProductName(event.target.value);
                      console.log("newProductName:", newProductName);
                    }}
                  />
                </div>
                <div>
                  <label>Description: </label>
                  <textarea
                    id="addProductDescription"
                    type="text"
                    style={{ height: "50px" }}
                    required
                    placeholder="New Product Description*"
                    value={newProductDescription}
                    onChange={(event) => {
                      setNewProductDescription(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Price: </label>
                  <input
                    id="addProductPrice"
                    type="number"
                    step="0.01"
                    required
                    placeholder="New Product Price*"
                    value={newProductPrice}
                    onChange={(event) => {
                      setNewProductPrice(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Inventory: </label>
                  <input
                    id="addProductQuantity"
                    type="text"
                    required
                    placeholder="New Product Inventory*"
                    value={newProductInventory}
                    onChange={(event) => {
                      setNewProductInventory(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Category: </label>
                  <input
                    id="addProductCategory"
                    type="text"
                    required
                    placeholder="New Product Category*"
                    value={newProductCategory}
                    onChange={(event) => {
                      setNewProductCategory(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Photo Link: </label>
                  <input
                    id="addProductPhotoLink"
                    type="text"
                    required
                    placeholder="New Product Photo Link*"
                    value={newProductPhotoLink}
                    onChange={(event) => {
                      setNewProductPhotoLink(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Photo Alt Text: </label>
                  <input
                    id="addProductPhotoDescription"
                    type="text"
                    required
                    placeholder="New Product Photo Alt Text*"
                    value={newProductPhotoDescription}
                    onChange={(event) => {
                      setNewProductPhotoDescription(event.target.value);
                    }}
                  />
                </div>
                <button id="addProductButton">Submit Change</button>
              </form>
            </div>
            <div className="back-btn back-add">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setAddProduct(null);
                }}
              >
                BACK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
