import { User } from "../react-app-env";

const API_URL = 'https://mate.academy/students-api/users/';

export const getAllUsers = async (): Promise<User[]> => {
  return fetch(API_URL).then(result => result.json());
};

export const getUserById = (userId: number) => {
  return fetch(`${API_URL}${userId}`)
    .then(result => result.json());
};
