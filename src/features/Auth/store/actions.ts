import { toastError, toastInfo } from "@/shared/libs"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { NavigateFunction } from "react-router"
import { api } from "../api"
import { LoginReq } from "../type"

/**Получить информацию о профиле*/
export const getProfileInfo = createAsyncThunk(
    "auth/profileInfo",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token") || ""
            const { data } = await api.getProfile({
                Authorization: `Token ${token}`,
            })
            return data
        } catch (e: any) {
            window.localStorage.removeItem("token")
            return rejectWithValue(e.response.data.detail)
        }
    },
)


export const login = createAsyncThunk(
    "auth/login",
    async ({ userData, navigate }: { userData: LoginReq, navigate: NavigateFunction }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await api.login(userData)
            window.localStorage.setItem("token", data.auth_token)
            dispatch(getProfileInfo())
            navigate("/")
        } catch (e: any) {
            if (e.response.data.detail === "CSRF Failed: CSRF token missing.") {

                toastError("Выйдите с админки Django")
            }
            else {
                toastError("Неверные данные.")
            }
            return rejectWithValue(e.response.data.message as string)
        }
    },
)