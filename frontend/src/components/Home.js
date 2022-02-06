import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import MetaData from "./layouts/MetaData";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Loader from "./layouts/Loader";

import Product from "./product/Product";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productsAction";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  let params = useParams();
  const keyword = params.keyword;
  const [currentPage, setCurrentPage] = useState(1); //page change
  const [price, setPrice] = useState([1, 4000]); //price filter
  const [category, setCategory] = useState(""); //caegory category filter
  const [rating, setRating] = useState(0); //rating filter
  const categories = [
    "Fan",
    "Wire",
    "Capacitors",
    "LED",
    "Meters",
    "Pipes",
    "MCB Box",
    "Heaters",
    "Tape",
    "Fan cores",
  ];
  const {
    loding,
    products,
    error,
    productsCount = 0,
    resPerPage,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, currentPage, keyword, price, category, rating, alert, error]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loding ? (
        <Loader />
      ) : (
        <Fragment >
          <MetaData title={"Buy Best Product online"} />
        
          <section id="products" className=" display-5">
          
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5 p-5">
                    <div className="px-5">
                      <Range //price range filter
                        marks={{
                          1: "₹1",
                          4000: "₹4,000",
                        }}
                        min={1}
                        max={4000}
                        defaultValue={[1, 4000]}
                        tipFormatter={(value) => `₹${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />

                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-5">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                                color: "black",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  

                  <hr className="my-3" />
                  <div className="mt-5 p-5">
                    <h4 className="mb-5">Ratings</h4>
                    <ul className="pl-0">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <li
                          style={{
                            cursor: "pointer",
                            listStyleType: "none",
                            color: "black",
                          }}
                          key={star}
                          onClick={() => setRating(star)}
                        >
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{ width: `${star * 20}%` }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  </div> 

                  <div className="col-6 col-md-9">
                    <div className="card__container">
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment>

                <img className="home_poster" src="https://res.cloudinary.com/saienterprises/image/upload/v1644142015/SAI_ENTERPRISES_adkqgy.png" alt="sai_enterprises"></img>
                <div className="home">

                <h1 id="products_heading">Our Latest Products</h1>
                <div className="card__container">
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                         
                          />
                        ))}
                    </div>
                </div>
                </Fragment>
              )}
            </div>
          </section>

          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link" // both are bootstrap class
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
