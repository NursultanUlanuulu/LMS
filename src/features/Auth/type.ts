import { Roles } from "@/shared/enums"

export interface LoginReq {
    phone: string
    password: string
}
export type LoginRes = {
    auth_token: string
}
export type IProfile = {
    id: number,
    name?: string,
    surname?: string,
    patronymic?: string,
    user_type: Roles,
    branch?: string
}
