import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  ActionType, ICollection,
  IComment,
  ILike,
  ISetBook,
  ISetDataBook,
  IUpdateData,
  IUpdateDataWithId
} from './collectionsTypes';
import { AppRootStateType, store } from '../store';
import { actions } from './collectionsActions';
import { actionsAlert } from '../alert/alertActions';
import { actionsAuth } from '../auth/authActions';
import { booksAPI } from '../../api/api';

export const getUsersCollections = (): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    dispatch(actionsAuth.setLoadingAC(true));
    const { data } = await booksAPI.getBooks();
    console.log(data);
    dispatch(actions.getCollectionAC(data));
    dispatch(actions.setCurrentSectionsAC());
    dispatch(actionsAuth.setLoadingAC(false));
  };
};

export const getCurrentBook = (bookId: number): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const book = await booksAPI.getCurrentBook(bookId);
      dispatch(actions.getCurrentBookAC(book.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const setLikeBook = (id: number): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const state = store.getState();
      const uid = state.auth.user?.id;
      if (uid) {
        const likeData: ILike = {
          id: id,
          userId: uid
        };
        await booksAPI.setLike(likeData);
        dispatch(actions.setLikedAC({ likeData }));
      }
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const setDislikeBook = (id: number): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const state = store.getState();
      const uid = state.auth.user?.id;
      if (uid) {
        const likeData: ILike = {
          id: id,
          userId: uid
        };
        await booksAPI.setDislike(likeData);
        dispatch(actions.setDislikedAC({ likeData }));
      }
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const setCollection = (data: ISetDataBook): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const state = store.getState();
      const user = state.auth.user;
      const formData = new FormData();
      formData.append('authors', data.author);
      formData.append('title', data.title);
      formData.append('pages', String(data.pages));
      formData.append('description', data.description);
      formData.append('imageURL', data.file);
      formData.append('section', data.section);
      formData.append('senderEmail', user!.email);
      formData.append('senderId', String(user!.id));
      formData.append('departureDate', String(new Date()));
      formData.append('dateUTC', String(new Date().getTime()));
      const responseData = await booksAPI.setBook(formData);
      const bookData: ICollection = {
        authors: data.author,
        title: data.title,
        pages: data.pages,
        description: data.description,
        imageURL: data.file,
        section: data.section,
        senderEmail: user!.email,
        senderId: user!.id,
        departureDate: String(new Date()),
        dateUTC: new Date().getTime(),
        id: responseData.data.id,
        likes: [],
        comments: []
      };
      dispatch(actions.setNewBookAC(bookData));
      dispatch(actionsAlert.setSuccess(true));
      dispatch(actions.setCurrentUserPublicationsAC(user!.id));
    } catch (err: any) {
      console.log(err);
      dispatch(actionsAlert.setError(true));
    }
  };
};

export const getComments = (id: number): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await booksAPI.getComments(id);
      dispatch(actions.getCommentsAC(data));
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const setCommentThunk = (id: number, comment: string): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      await booksAPI.setComments(id, comment);
      const state = store.getState();
      const user = state.auth.user;
      const yearAndMonth = new Date().toLocaleDateString();
      const hoursAndMinutes = new Date().toLocaleTimeString().split(':').slice(0, 2).join(':');
      if (user) {
        const comments: IComment = {
          bookId: id,
          author: user.email,
          text: comment,
          date: `${yearAndMonth} ${hoursAndMinutes}`
        };
        dispatch(actions.setCommentAC({ comments }));
      }
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const editPublication = (publicationId: number, updateData: IUpdateData): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const update: IUpdateDataWithId = {
        publicationId: publicationId,
        authors: updateData.authors,
        description: updateData.description,
        pages: updateData.pages,
        section: updateData.section
      };
      await booksAPI.editPublication(publicationId, updateData);
      dispatch(actions.setUpdatePublicationAC(update));
      dispatch(actionsAlert.setSuccess(true));
    } catch (err: any) {
      console.log(err);
      dispatch(actionsAlert.setError(true));
    }
  };
};





