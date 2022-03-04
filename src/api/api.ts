import axios, { AxiosResponse } from 'axios';
import { ICollection, ILike, ISetBook, IUpdateData, IUpdateDataWithId } from '../store/collections/collectionsTypes';

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
  },
  getComments(bookId: number) {
    return instance.get(`comments`, { params: { bookId: bookId } });
  },
  setComments(bookId: number, text: string) {
    return instance.post(`comments`, { bookId, text });
  },
  setBook(data: any) {
    return instance.post(`books`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  },
  editPublication(bookId: number, editData: IUpdateData) {
    return instance.patch(`books/edit/${bookId}`, editData);
  }
};