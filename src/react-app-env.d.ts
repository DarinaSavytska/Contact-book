/// <reference types="react-scripts" />

export type UserAddres = {
  id: number,
  userId: number,
  street: string,
  suite: string,
  city: string,
  zipcode: string,
};

export type User = {
  id: number,
  name: string,
  username?: string,
  email?: string,
  phone?: string,
  website?: string,
  address?: UserAddres,
};
