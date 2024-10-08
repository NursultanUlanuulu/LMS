
import { SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { Roles, StatusResponse } from "../enums"
export interface IGetById<T> {
    data: T,
    message?: string,
    status: StatusResponse
}
export interface IList<T> {
    data: T[],
    message?: string,
    amount: number,
    limit: number,
    pagesCount: number,
    status: StatusResponse
}

export interface IEdit {
    message?: string,
    status: StatusResponse
}

export interface ICommonForm {
    labelName?: string
    name: string
    onChange: any
    onBlur: (e: React.FocusEvent<any>) => void
    error?: boolean
    errorMessage?: string
    value?: any
    placeholder?: string
    defaultValue?: string
}

export type IHeaders = Record<any, string>
export interface IRoute {
    path: string
    element: JSX.Element
    children?: IRoute[]
}
export interface IAppBarLink {
    text: string;
    href: string;
    roles: Roles[];
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
}
export interface MessageResponse {
    message: string
}
export interface IListTable<T> {
    count: number,
    page_size: number,
    num_pages: number,
    next: string,
    previous: null,
    results: T[]
}
export interface IPayloadList<T> {
    data: T[],
    amount: number,
    limit: number,
    pagesCount: number
}
