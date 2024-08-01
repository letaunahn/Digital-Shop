import axios from "axios";
import { server } from "../../app";

export const loadUser = () => async(dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest"
        })
        const {data} = await axios.get(`${server}/user/getuser`, {withCredentials: true})
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.response.data.message
        })
    }
}


export const updateUserInformation = (name, email, phoneNumber, password) => async (dispatch) => {
    try {
        dispatch({
            type: "updateUserInfoRequest"
        })

        const {data} = await axios.put(`${server}/user/update-user-info`, {
            email, password, phoneNumber, name
        }, {
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true
            }
        })
        dispatch({
            type: "updateUserInfoSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "updateUserInfoFailed",
            payload: error.response.data.message
        })
    }
}

export const updateUserAddress = (country, province, address1, address2, zipCode, addressType) => async (dispatch) => {
    try {
        dispatch({
            type: 'updateUserAddressRequest'
        })

        const {data} = await axios.put(`${server}/user/update-user-addresses`, {
            country,
            province,
            address1,
            address2,
            zipCode,
            addressType
        }, {
            withCredentials: true
        })

        dispatch({
            type: "updateUserAddressSuccess",
            payload: {
                successMessage: "User address updated successfully!",
                user: data.user
            }
        })
    } catch (error) {
        dispatch({
            type: "updateUserAddressFailed",
            payload: error.response.data.message
        })
    }
}

export const deleteUserAddress = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteUserAddressRequest"
        })

        const {data} = await axios.delete(
            `${server}/user/delete-user-address/${id}`, {
                withCredentials: true
            }
        )
        dispatch({
            type: "deleteUserAddressSuccess",
            payload: {
                successMessage: "User deleted successfully!",
                user: data.user
            }
        })
    } catch (error) {
        dispatch({
            type: 'deleteUserAddressFailed',
            payload: error.response.data.message
        })
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllUsersRequest"
        })
        const {data} = await axios.get(`${server}/user/admin-all-users`, {
            withCredentials: true
        })

        dispatch({
            type: "getAllUsersSuccess",
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: "getAllUsersFailed",
            payload: error.response.data.message
        })
    }
}