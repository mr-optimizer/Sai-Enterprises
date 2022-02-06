const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandlers");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// create new product   => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images === undefined) {
    return next(
      new ErrorHandler("Please upload at least single image of product", 404)
    );
  }
  let imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id; //aggigning which user is creating this object

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products    =>    /api/v1/products?keywords=Fan
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 12;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search() //all the products in Product collection is now stored in apifeaturs
    .filter() //all the product matching with keyword is store in this
    .pagination(resPerPage); //maximum resPerPage is shown in 1 page
  const products = await apiFeatures.query;

  res.status(200).json({
    sucess: true,
    productsCount,
    resPerPage,
    products,
  });
});

// Get all products (Admin)    =>    /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    sucess: true,
    products,
  });
});

// Get single product details     =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    sucess: true,
    product,
  });
});

// Update product    => /api/v1/admin/product:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images != undefined) {
    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    let imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product              =>  /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Deleting images associated with the product
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
});

// Review Section

// create new or update review                 => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { ratting, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    ratting: Number(ratting),
    comment,
  };
  const product = await Product.findById(productId);
  let isReviewed = false;
  product.reviews.forEach((r) => {
    if (r.user.toString() === req.user._id.toString()) {
      isReviewed = true;
    }
  });
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.ratting = Number(ratting);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.ratting =
    product.reviews.reduce((acc, item) => item.ratting + acc, 0) /
    product.reviews.length;

  product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all the reviews of a product     =>  /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    sucess: true,
    reviews: product.reviews,
  });
});

// Delete Product Review     =>  /api/v1/reviews
exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  const numOfReviews = reviews.length;
  const ratting =
    numOfReviews > 0
      ? reviews.reduce((acc, item) => item.ratting + acc, 0) / reviews.length
      : 0;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratting,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
