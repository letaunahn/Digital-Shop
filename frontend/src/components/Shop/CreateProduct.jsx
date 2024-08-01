import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from '../../redux/actions/productActions';
import { toast } from 'react-toastify';

export const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error} = useSelector((state) => state.products)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if(error){
      toast.error(error)
    }
    if(success){
      toast.success("Product created succesfully!")
      navigate("/dashboard")
      window.location.reload()
    }
  }, [dispatch, error, success])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      shopId: seller._id,
      images  
    }))
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if(reader.readyState === 2){
          setImages((old) => [...old, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  };
  return (
    <div className="w-[90%] md:w-1/2 bg-white shadow h-[80vh] rounded-md p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-[Poppins] text-center">
        Create Products
      </h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description<span className="text-red-500">*</span>
          </label>
          <textarea
            type="text"
            required
            cols="30"
            rows="8"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
            className="mt-2 appearance-none block w-full px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label>
            Category<span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            className="w-full mt-2 border h-[35px] rounded-[3px]"
            onChange={(e) => setCategory(e.target.value)}>
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <>
                  <option value={i.title} key={i.title}>
                    {i.title}
                  </option>
                </>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Tags<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Original Price<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="originalPrice"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="discountPrice"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <>
                  <img
                    src={i}
                    key={i}
                    className="h-[120px] w-[120px] object-cover m-2"
                    alt=""
                  />
                </>
              ))}
          </div>
          <br />
          <div>
            <input type="submit" value="Create" className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>
      </form>
    </div>
  );
};
