import ErrorHandler from "../utils/ErrorHandler.js";
import shopModel from "../models/shopModel.js";
import productModel from "../models/productModel.js";
import orderModel from '../models/orderModel.js';
import cloudinary from 'cloudinary'

export const createProduct = async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await shopModel.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400));
    } else {
      let images = []
      if(typeof req.body.images === "string"){
        images.push(req.body.images)
      } else {
        images = req.body.images
      }

      const imagesLink = []

      for(let i = 0; i< images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products"
        })

        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url
        })
      }

      const productData = req.body 
      productData.images = imagesLink
      productData.shop = shop

      const product = new productModel(productData);

      await product.save()
      
      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getAllProductsShop = async (req, res, next) => {
  try {
    const products = await productModel.find({shopId: req.params.id})
    res.status(201).json({
      success: true,
      products
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400))
  }
}

export const deleteShopProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id)
    if(!product){
      return next(new ErrorHandler("Product is not founded with this id", 404))
    }
    for(let i = 0; i < product.images.length; i++){

    }
    await productModel.findByIdAndDelete(req.params.id)

    res.status(201).json({
      success: true,
      message: "Product has been deleted successfully!"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400))
  }
}

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find().sort({createdAt: -1})

    res.status(201).json({
      success: true,
      products
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400))
  }
}

export const createNewReview = async (req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId} = req.body;
    const product = await productModel.findById(productId)

    const review = {
      user,
      rating,
      comment, 
      productId
    }
    
    const isReviewed = product.reviews.find(
      (rev) => rev.user._id === req.user._id
    )

    if(isReviewed){
      product.reviews.forEach((rev) => {
        if(rev.user._id === req.user._id){
          (rev.rating = rating),
          (rev.comment = comment),
          (rev.user = user)
        }
      })
    } else {
      product.reviews.push(review)
    }

    let avg = 0

    product.reviews.forEach((rev) => {
      avg += rev.rating
    })

    product.ratings = avg/product.reviews.length

    await product.save({validateBeforeSave: false})

    await orderModel.findByIdAndUpdate(
      orderId,
      {
        $set: {
          "cart.$[elem].isReviewed" : true
        }},
        {
          arrayFilters: [{"elem._id": productId}], new: true
        }
      
    )
    res.status(200).json({
      success: true,
      message: "Reviewed successfully"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400))
  }
}

export const adminAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find().sort({createdAt: -1})
    res.status(201).json({
      success: true,
      products
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
}
