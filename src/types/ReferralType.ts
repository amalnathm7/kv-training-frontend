import { AddressType } from './AddressType';
import { EmployeeType } from './EmployeeType';
import { OpeningType } from './OpeningType';
import { RoleType } from './RoleType';

export type ReferralType = {
  id: string;
  name: string;
  email: string;
  experience: number;
  phone: string;
  status?: string;
  resume: string;
  referredBy?: EmployeeType;
  referredById: string;
  address: AddressType;
  role?: RoleType;
  roleId: string;
  opening?: OpeningType;
  openingId: string;
  referralCode: string;
};
