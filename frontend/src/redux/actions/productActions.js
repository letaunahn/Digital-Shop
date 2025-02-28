import axios from "axios"
import { server } from "../../app"

export const createProduct = ({name, description, category, tags, originalPrice, discountPrice, stock, shopId, images}) => async (dispatch) => {
    try {
        dispatch({
            type: "productCreateRequest"
        })

        const {data} = await axios.post(`${server}/product/create-product`,{
            name,
            description,
            category,
            tags,
            originalPrice,
            discountPrice,
            stock,
            shopId,
            images 
        }
        )

        dispatch({
            type: "productCreateSuccess",
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: "productCreateFailed",
            payload: error.response.data.message
        })
    }
}

export const getAllProductsShop = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsShopRequest"
        })

        const {data} = await axios.get(`${server}/product/get-all-products-shop/${id}`)
        dispatch({
            type: "getAllProductsShopSuccess",
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: "getAllProductsShopFailed",
            payload: error.response.data.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductRequest"
        })

        const {data} = await axios.delete(`${server}/product/delete-shop-product/${id}`)
        dispatch({
            type: "deleteProductSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "deleteProductFailed",
            payload: error.response.data.message
        })
    }
}

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsRequest"
        })
        const { data } = await axios.get(`${server}/product/get-all-products`)
        dispatch({
            type: "getAllProductsSuccess",
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: "getAllProductsFailed",
            payload: error.response.data.message
        })
    }
}