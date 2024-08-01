import eventModel from "../models/eventModel.js";
import shopModel from "../models/shopModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from 'cloudinary'

export const createEvent = async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await shopModel.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400));
    } else {
      let images = [];
      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      const imagesLink = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "events",
        });

        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      const eventData = req.body;
      eventData.images = imagesLink;
      eventData.shop = shop;

      const event = new eventModel(eventData);

      await event.save();

      res.status(201).json({
        success: true,
        event,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await eventModel.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getAllShopEvents = async (req, res, next) => {
  try {
    const events = eventModel.find({ shopId: req.params.id });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

export const deleteShopEvent = async (req, res, next) => {
  try {
    const event = await eventModel.findById(req.params.id);
    if (!event) {
      return next(new ErrorHandler("Event is not found with this id, 404"));
    }

    for(let i = 0; i < event.images.length; i++){
        const result = await cloudinary.v2.uploader.destroy(
            event.images[i].public_id
        )
    }

    await eventModel.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "Event deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

export const adminAllEvents = async (req, res, next) => {
  try {
    const events = await eventModel.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
