import { Address } from "./Address";
import { Department } from "./Department";
import { Role } from "./Role";

export type Employee = {
    name: string,
    id: string,
    joiningDate: Date,
    role: Role,
    status: "Active" | "Inactive" | "Probation",
    experience: number,
    address: Address,
    department: Department
};
