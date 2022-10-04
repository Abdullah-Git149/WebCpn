
import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = process.env.REACT_APP_APIURL
const initialState = {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    coupons: [],
    notification: [],
    couponCounts: null
}

export const addCoupon = createAsyncThunk('business/addcoupon', async (formData, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                "Authorization": token,
            }
        }
        const response = await axios.post(`business/addcoupon`, formData, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const editCoupon = createAsyncThunk('business/editcoupons', async (data, { rejectWithValue }) => {
    try { 
        const token = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                "Authorization": token,
            }
        }
        const response = await axios.post(`business/editcoupons/${data?.id}`, data?.formData, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const deleteCoupon = createAsyncThunk('business/deletecoupon', async (id, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                "Authorization": token,
            }
        }
        const response = await axios.delete(`business/deletecoupon/${id}`, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const allCoupons = createAsyncThunk('business/getbusinesscoupons', async (bodyData = null, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                "Authorization": token,
            }
        }
        const response = await axios.get(`business/getbusinesscoupons`, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getClaimedCoupons = createAsyncThunk('business/getClaimedCoupons', async (bodyData = null, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                "Authorization": token,
            }
        }
        const response = await axios.get(`business/getClaimedCoupons`, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const redeemCoupon = createAsyncThunk('business/redeemcoupon', async (id, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                "Authorization": token,
            }
        }
        const response = await axios.post(`business/redeemcoupon/${id}`, false, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const notification = createAsyncThunk('business/getbusinessNotification', async (bodyData = null, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                "Authorization": token,
            }
        }
        const response = await axios.get(`business/getbusinessNotification`, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const couponCounts = createAsyncThunk('business/couponCounts', async (bodyData = null, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                "Authorization": token,
            }
        }
        const response = await axios.get(`business/couponCounts`, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getLineChart = createAsyncThunk('business/getTotalCouponChart', async (bodyData = null, { rejectWithValue }) => {
    try {
        const token = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                "Authorization": token,
            }
        }
        const response = await axios.get(`business/getTotalCouponChart`, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder

            .addCase(addCoupon.pending, (state, action) => {
                state.status = 'loading'
                state.error = null 
            })
            .addCase(addCoupon.fulfilled, (state, action) => {
                state.status = 'succeeded'
                toast.success(action.payload.Message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                state.error = null
            })
            .addCase(addCoupon.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.card 
                 toast.error(action.payload.Message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })



            .addCase(editCoupon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(editCoupon.fulfilled, (state, action) => {
                state.status = 'succeeded'
                toast.success(action.payload.Message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                state.error = null
            })
            .addCase(editCoupon.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.Message
                toast.error(action.payload.Message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })



            .addCase(deleteCoupon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                toast.success(action.payload.Message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.Message
                toast.error(action.payload.Message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })





            .addCase(allCoupons.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(allCoupons.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                state.coupons = action.payload.coupons
            })
            .addCase(allCoupons.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.Message
                if (action.payload.Message === "No Coupons Found") {
                    state.coupons = []
                }
            })


            .addCase(getClaimedCoupons.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getClaimedCoupons.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                state.coupons = action.payload.coupons
            })
            .addCase(getClaimedCoupons.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.Message
                if (action.payload.Message === "No Coupons Found") {
                    state.coupons = []
                }
            })


            .addCase(redeemCoupon.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(redeemCoupon.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                toast.success(action.payload.Message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .addCase(redeemCoupon.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.Message
                toast.error(action.payload.Message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })




            .addCase(notification.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
                state.notification = null
            })
            .addCase(notification.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                state.notification = action.payload.notification
            })
            .addCase(notification.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.Message
                if (action.payload.Message === "Notification not found") {
                    state.notification = []
                } 
            })



            .addCase(couponCounts.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
                state.couponCounts = null
            })
            .addCase(couponCounts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = null
                state.couponCounts = action.payload
            })
            .addCase(couponCounts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.Message
                state.couponCounts = null
            })
    }
})
export const getNotification = (state) => state.coupons.notification;
export const getCoupons = (state) => state.coupons.coupons;
export const getError = (state) => state.coupons.error;
export const getStatus = (state) => state.coupons.status;
export const getCouponCount = (state) => state.coupons.couponCounts;
export default couponSlice.reducer