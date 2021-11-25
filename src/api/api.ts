const API_URL = 'https://mate.academy/students-api/users/';

export const getUsers = (userId: number) => {
  return fetch(`${API_URL}${userId}`)
    .then(result => result.json());
};
