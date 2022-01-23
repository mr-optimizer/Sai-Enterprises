import React from "react";
import { Link } from "react-router-dom";
const Product = ({ product, col }) => {
  return (
    // <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
    //   <div className="card p-3 rounded">
    //     <img className="card-img-top mx-auto" src={product.images[0].url} />
    //     <div className="card-body d-flex flex-column">
    //       <h5 className="card-title">
    //         <Link to={`/product/${product._id}`}>{product.name}</Link>
    //       </h5>
    //       <div className="ratings mt-auto">
    //         <div className="rating-outer">
    //           <div
    //             className="rating-inner"
    //             style={{ width: `${(product.ratting / 5) * 100}%` }}
    //           ></div>
    //         </div>
    //         <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
    //       </div>
    //       <p className="card-text">Rs. {product.price}</p>
    //       <Link
    //         to={`/product/${product._id}`}
    //         id="view_btn"
    //         className="btn btn-block"
    //       >
    //         View
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <div class="product-card">
      <div class="badge">New</div>
      <div class="product-tumb">
        <img src={product.images[0].url} alt="" />
      </div>
      <div class="product-details">
        <span class="product-catagory">{product.seller}</span>
        <h4>
          <Link to={`/product/${product._id}`} >{product.name}</Link>
        </h4>
        <p className="card__desc">{product.description}</p>
        <div class="product-bottom-details">
          <div className="card__ratting">
            <div class="product-price">
              Rs.{product.price}&nbsp;
              <small>Rs. {product.price + product.price * 0.1}</small>
            </div>
            <div class="product-links">
              <div className="temp">
                <div className="rating-outer">
                  <div
                    className="rating-inner "
                    style={{ width: `${(product.ratting / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div id="no_of_reviews" className="">
                ({product.numOfReviews} Reviews)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
