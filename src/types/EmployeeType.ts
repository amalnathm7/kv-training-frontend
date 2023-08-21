import { AddressType } from './AddressType';
import { DepartmentType } from './DepartmentType';
import { RoleType } from './RoleType';

export type EmployeeType = {
  name: string;
  id: string;
  email: string;
  phone: string;
  password: string;
  joiningDate: Date;
  role?: RoleType;
  roleId?: string;
  status: string;
  experience: number;
  address: AddressType;
  department?: DepartmentType;
  departmentId?: string;
};
