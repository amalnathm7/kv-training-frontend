import { DepartmentType } from "./DepartmentType";
import { RoleType } from "./RoleType";

export type OpeningType = {
    id: string,
    createdAt: Date,
    title: string,
    description: string,
    skills: string,
    count: number,
    location: string,
    experience: number,
    department: DepartmentType,
    role: RoleType,
};
