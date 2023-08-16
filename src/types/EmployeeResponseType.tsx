import { EmployeeType } from "./EmployeeType"

export type EmployeeResponseType = {
    data: EmployeeType[]
    errors: [],
    message: string,
    meta: {
        offset: number,
        length: number,
        took: number,
        total: number
    }
}