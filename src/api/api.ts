import axios from 'axios';
import { ICollection, ILike } from '../store/collections/collectionsTypes';

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
  signIn(email: string, password: string) {
    return instance.post(`auth/login`, { email, password });
  },
  logout() {
    return instance.get(`auth/logout`);
  }
};

export const booksAPI = {
  getBooks() {
    return instance.get<ICollection[]>(`books`);
  },
  setLike(likeData: ILike) {
    return instance.patch(`books/like`, likeData);
  },
  setDislike(likeData: ILike) {
    return instance.patch(`books/dislike`, likeData);
  },
  getCurrentBook(bookId: number) {
    return instance.get(`books/${bookId}`);
  }
};