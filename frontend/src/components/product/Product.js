import React from "react";
import { Link } from "react-router-dom";
const Product = ({ product, col }) => {
  return (
    <div className="product-card">
      <div className="badge">New</div>
      <div className="product-tumb">
        <img src={product.images[0].url} alt="" />
      </div>
      <div className="product-details">
        <span className="product-catagory">{product.seller}</span>
        <h4>
          <Link to={`/product/${product._id}`} >{product.name}</Link>
        </h4>
        <p className="card__desc">{product.description}</p>
        <div className="product-bottom-details">
          <div className="card__ratting">
            <span className="product-price">
              Rs.{product.price}&nbsp;
              <small>Rs.{product.price + product.price * 0.1}</small>
            </span>
            <div className="product-links">
              <div className="temp">
                <div className="rating-outer">
                  <div
                    className="rating-inner "
                    style={{ width: `${(product.ratting / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div id="no_of_reviews" className="product__review">
                ({product.numOfReviews}&nbsp;Review)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Product;
