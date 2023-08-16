import { AddressType } from "./AddressType";
import { DepartmentType } from "./DepartmentType";
import { RoleType } from "./RoleType";

export type EmployeeType = {
    name: string,
    id: string,
    joiningDate: Date,
    role: RoleType,
    status: string,
    experience: number,
    address: AddressType,
    department: DepartmentType
};
