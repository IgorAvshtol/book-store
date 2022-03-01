import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AxiosResponse } from 'axios';

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  arrayUnion,
  updateDoc,
  arrayRemove,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import {
  ActionType,
  ICollection,
  IComment, ILike,
  ISetBook,
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
    // @ts-ignore
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

// export const getCurrentBook = (bookId: string): ThunkAction<void, AppRootStateType, null, ActionType> => {
//   return async (dispatch: Dispatch) => {
//     const db = getFirestore();
//     const docRef = doc(db, 'books', `${bookId}`);
//     const docSnap = await getDoc(docRef);
//     const book = docSnap.data();
//     if (book) {
//       const currentBook: ICollection = {
//         authors: book.authors,
//         title: book.title,
//         description: book.description,
//         imageURL: book.imageURL,
//         pages: book.pages,
//         section: book.section,
//         id: book.id,
//         likes: book.likes,
//         senderEmail: book.senderEmail,
//         senderId: book.senderId,
//         departureDate: book.departureDate,
//         comments: book.comments,
//         dateUTC: book.dateUTC
//       };
//       dispatch(actions.getCurrentBookAC(currentBook));
//     }
//   };
// };

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

export const setCollection = (data: ISetBook): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const db = getFirestore();
      const refCollection = doc(collection(db, 'books'));
      console.log(refCollection.id);
      //Upload file
      const storage = getStorage();
      const storageRef = ref(storage);
      const fileName = data.file.name;
      const file = data.file;
      const imagesRef = ref(storageRef, 'books/');
      const spaceRef = ref(imagesRef, `${fileName}`);
      await uploadBytes(spaceRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      await getDownloadURL(spaceRef)
          .then((url) => {
            // `url` is the download URL for 'book'
            const state = store.getState();
            const userEmail = state.auth.user?.email;
            const userId = state.auth.user?.id;
            const yearAndMonth = new Date().toLocaleDateString();
            const hoursAndMinutes = new Date().toLocaleTimeString().split(':').slice(0, 2).join(':');
            const bookData: ICollection = {
              authors: data.author,
              title: data.title,
              pages: data.pages,
              description: data.description,
              imageURL: url,
              section: data.section,
              id: 1,
              likes: [],
              comments: [],
              senderEmail: userEmail,
              // senderId: userId,
              departureDate: `${yearAndMonth} ${hoursAndMinutes}`,
              dateUTC: new Date().getTime()
            };
            setDoc(refCollection, bookData);
            // dispatch(actions.getCollectionAC(bookData));
            if (bookData.senderId) {
              dispatch(actions.setCurrentUserPublicationsAC(bookData.senderId));
            }
            dispatch(actionsAlert.setSuccess(true));
          })
          .catch((error) => {
            dispatch(actionsAlert.setError(true));
            console.log('no download url');
          });
    } catch (err: any) {
      console.log(err);
      dispatch(actionsAlert.setError(true));
    }
  };
};

export const setCommentThunk = (id: number, comment: string): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const state = store.getState();
      const uid = state.auth.user?.id;
      const userEmail = state.auth.user?.email;
      const yearAndMonth = new Date().toLocaleDateString();
      const hoursAndMinutes = new Date().toLocaleTimeString().split(':').slice(0, 2).join(':');
      const db = getFirestore();
      const ref = doc(db, 'books', `${id}`);
      await updateDoc(ref, {
        comments: arrayUnion({ text: comment, author: userEmail, date: `${yearAndMonth} ${hoursAndMinutes}` })
      });
      if (uid) {
        const comments: IComment = {
          bookId: id,
          author: userEmail,
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
      const db = getFirestore();
      const ref = doc(db, 'books', `${publicationId}`);
      await updateDoc(ref, {
        authors: updateData.author,
        description: updateData.description,
        pages: updateData.pages,
        section: updateData.section
      });
      const update: IUpdateDataWithId = {
        publicationId: publicationId,
        author: updateData.author,
        description: updateData.description,
        pages: updateData.pages,
        section: updateData.section
      };
      dispatch(actions.setUpdatePublicationAC(update));
      dispatch(actionsAlert.setSuccess(true));
    } catch (err: any) {
      console.log(err);
      dispatch(actionsAlert.setError(true));
    }
  };
};





