import React, { useState } from "react";
import { addToCart, getAllProducts, getUserCart, deleteProduct, adminEditProduct } from "../api";
import { useEffect } from "react";
import "../style/Products.scss";
import { AdminNav } from "../components";

const ProductStyling = {
  border: "2px solid black",
  padding: "1em",
  margin: "1em",
};

const AdminProducts = (props) => {
  const { products, setProducts, guestId, setGuestId, userId, getUserToken, setUserCartItems, getUserCartItems } = props;
  const [editProduct, setEditProduct] = useState(null)
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productInventory, setProductInventory] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productPhotoLink, setProductPhotoLink] = useState('')
  const [productPhotoDescription, setProductPhotoDescription] = useState('')

  const handleRoutines = () => {
    getAllProducts().then((theProducts) => {
      setProducts(theProducts);
    });
  };
  
  useEffect(() => {
    handleRoutines();
  }, []);

  return (
    <div>
      <div className="dashboard-container">
        <AdminNav />
      </div>
      <div> {(!editProduct) ?
        (<div className="Products">
          {products.sort(function(a, b) {
            var keyA = (a.id),
              keyB = (b.id);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
            }).map((product) => {
            return (
              <div className="product-items" key={product.id}>
                <img
                  className="item-img"
                  src={product.photos[0].link}
                  alt={product.photos[0].description}
                />
                <div className="adminProduct-btns">
                  <button
                    className="editItem-btn"
                    onClick={async (event) => {
                      event.preventDefault();
                      setEditProduct(product)
                      console.log(editProduct);
                      handleRoutines();
                    }}
                  >
                    EDIT
                  </button>

                  <button
                    className="deleteItem-btn"
                    onClick={async (event) => {
                      event.preventDefault();
                      await deleteProduct(getUserToken, product.id)
                      handleRoutines();
                    }}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            );
          })}
        </div>)
        : 
        (<div className="Products">
          <img src={editProduct.photos[0].link} alt={editProduct.photos[0].description} style={{height: '300px'}}/>
          <form 
                onSubmit={async (event) => {
                    try {
                        event.preventDefault()
                        await adminEditProduct(editProduct.id, productName, productDescription, productPrice, productInventory, productCategory)
                        handleRoutines()
                        setEditProduct(null)
                    } catch (error) {
                        console.error(error)
                    }
                }}
                id='editProductForm'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    height: '300px'
                }}
            >
                <div><label>Name: </label><input 
                    id='editProductName'
                    type='text'
                    required
                    placeholder={editProduct.name}
                    value={productName}
                    onChange={(event) => {setProductName(event.target.value); console.log(productName)}}
                  /></div>
                <div><label>Description: </label><textarea 
                    id='editProductDescription'
                    type='text'
                    style={{height: '50px'}}
                    required
                    placeholder={editProduct.description}
                    value={productDescription}
                    onChange={(event) => {setProductDescription(event.target.value)}}
                  /></div>
                  <div><label>Price: </label><input 
                    id='editProductPrice'
                    type='number'
                    step="0.01"
                    required
                    placeholder={editProduct.price}
                    value={productPrice}
                    onChange={(event) => {setProductPrice(event.target.value)}}
                  /></div>
                  <div><label>Inventory: </label><input 
                    id='editProductQuantity'
                    type='text'
                    required
                    placeholder={editProduct.qtyAvailable}
                    value={productInventory}
                    onChange={(event) => {setProductInventory(event.target.value)}}
                  /></div>
                  <div><label>Category: </label><input 
                    id='editProductCategory'
                    type='text'
                    required
                    placeholder={editProduct.category}
                    value={productCategory}
                    onChange={(event) => {setProductCategory(event.target.value)}}
                  /></div>
                  <div><label>Photo Link: </label><input 
                    id='editProductPhotoLink'
                    type='text'
                    required
                    placeholder={editProduct.photos[0].link}
                    value={productPhotoLink}
                    onChange={(event) => {setProductPhotoLink(event.target.value)}}
                  /></div>
                  <div><label>Photo Alt Text: </label><input 
                    id='editProductPhotoDescription'
                    type='text'
                    required
                    placeholder={editProduct.photos[0].description}
                    value={productPhotoDescription}
                    onChange={(event) => {setProductPhotoDescription(event.target.value)}}
                  /></div>
                <button id='editProductButton' 
                    // onClick={(event) => {
                      // event.preventDefault();
                      // setEditProduct(null);
                    // }}
                >Submit Change</button>
                
            </form>
        </div>)}
      </div>
    </div>
  );
};

export default AdminProducts;