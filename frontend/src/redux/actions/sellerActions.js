import axios from "axios"
import { server } from "../../app"

export const loadSeller = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadSellerRequest",
        })
        const {data} = await axios.get(`${server}/shop/get-seller`, {withCredentials: true})
        dispatch({
            type: "LoadSellerSuccess",
            payload: data.seller
        })
    } catch (error) {
        dispatch({
            type: "LoadSellerFailed",
            payload: error.response.data.message
        })
    }
}

export const getAllSeller = () => async (dispath) => {
    try {
        dispath({
            type: "getAllSellersRequest"
        })
        const {data} = await axios.get(`${server}/shop/admin-all-sellers`, {
            withCredentials: true
        })

        dispath({
            type: "getAllSellersSuccess",
            payload: data.sellers
        })
    } catch (error) {
        dispath({
            type: "getAllSellersFail",
            payload: error.response.data.message
        })
    }
}