/// <reference types="react-scripts" />

export type UserAddress = {
  id?: number,
  userId?: number,
  street?: string,
  suite?: string,
  city?: string,
  zipcode?: string,
};

export type User = {
  id: string,
  name: string,
  username?: string,
  email?: string,
  phone?: string,
  website?: string,
  address?: UserAddress,
};
