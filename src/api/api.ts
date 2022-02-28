import axios from 'axios';
import { ICollection } from '../store/collections/collectionsTypes';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000/',
});

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  signUp(fullName: string, email: string, password: string) {
    return instance.post(`auth/register`, { fullName, email, password });
  },
  signIn( email: string, password: string) {
    return instance.post(`auth/login`, { email, password });
  },
  logout() {
    return instance.get(`auth/logout`);
  }
};

export const booksAPI = {
  getBooks() {
    return instance.get<ICollection[]>(`books`);
  }
};