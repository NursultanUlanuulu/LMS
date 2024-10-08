import { IHeaders } from "@/shared/types"
import { apiRoot } from "../../app/api"
import { IProfile, LoginReq, LoginRes } from "./type"

export const api = {
    login: (data: LoginReq) => apiRoot.post<LoginRes>(`/v1/token/login/`, data),
    getProfile: (headers: IHeaders) => apiRoot.get<IProfile>(`/user/profile/`, { headers }),
}