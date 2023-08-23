import { AddressType } from './AddressType';
import { OpeningType } from './OpeningType';
import { RoleType } from './RoleType';

export type ApplicationType = {
  id: string;
  name: string;
  email: string;
  experience: number;
  phone: string;
  status?: string;
  resume: string;
  address: AddressType;
  role?: RoleType;
  roleId: string;
  opening?: OpeningType;
  openingId: string;
  applicationCode: string;
};
