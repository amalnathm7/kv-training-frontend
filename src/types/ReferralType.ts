import { AddressType } from './AddressType';
import { EmployeeType } from './EmployeeType';
import { OpeningType } from './OpeningType';
import { RoleType } from './RoleType';

export type ReferralType = {
  id: number;
  name: string;
  email: string;
  experience: number;
  phone: string;
  status: string;
  resume: string;
  address: AddressType;
  opening: OpeningType;
  referredBy: EmployeeType;
  role: RoleType;
};
