import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useAlert } from "react-alert";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";

import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts, clearErrors, deleteProduct } from "../../actions/productsAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import Sidebar from "./Sidebar";

const ProductsList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loding, error, products } = useSelector((state) => state.products);
  const { error:deleteError, isDeleted } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      alert.success('Product Deleted Successfully');
      history.push('/admin/products');
      dispatch({type: DELETE_PRODUCT_RESET});
    }
  }, [dispatch, alert, error, deleteError, isDeleted, history]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `₹${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2"
            onClick={()=> deleteProductHandler(product._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });
    return data;
  };
  const deleteProductHandler=(id)=>{
    dispatch(deleteProduct(id));
  }
  return (
    <Fragment>
      <MetaData title={`All Products`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Products</h1>
            {loding ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                bordered
                striped
                hover
                className="px-2"
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsList;
