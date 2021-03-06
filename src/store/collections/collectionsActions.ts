import {
  TypesKeys,
  ILikeData,
  ICommentData,
  IUpdateDataWithId, ICollection, IComment, ISetBook
} from './collectionsTypes';
import { AxiosResponse } from 'axios';

export const actions = {
  getCollectionAC: (collection: ICollection[]) => ({
    type: TypesKeys.GET_COLLECTION,
    payload: collection
  } as const),
  setLikedAC: ({ likeData }: ILikeData) => ({ type: TypesKeys.CURRENT_BOOK_HAS_LIKED, payload: { likeData } } as const),
  setDislikedAC: ({ likeData }: ILikeData) => ({
    type: TypesKeys.CURRENT_BOOK_HAS_DISLIKED,
    payload: { likeData }
  } as const),
  setCurrentBookAC: (bookId: number) => ({ type: TypesKeys.SET_CURRENT_BOOK, payload: bookId } as const),
  getCurrentBookAC: (currentBook: AxiosResponse<ICollection>) => ({ type: TypesKeys.GET_CURRENT_BOOK, payload: currentBook } as const),
  getCommentsAC: (comments: IComment[]) => ({ type: TypesKeys.GET_COMMENTS, payload: comments } as const),
  setCommentAC: ({ comments }: ICommentData) => ({ type: TypesKeys.SET_COMMENT, payload: { comments } } as const),
  setCurrentSectionsAC: () => ({ type: TypesKeys.SET_CURRENT_SECTIONS } as const),
  setNewBookAC: (book: ICollection) => ({
    type: TypesKeys.SET_NEW_BOOK,
    payload: book
  } as const),
  setCurrentUserPublicationsAC: (userId: number) => ({
    type: TypesKeys.SET_CURRENT_USER_PUBLICATIONS,
    payload: userId
  } as const),
  setUpdatePublicationAC: (updateData: IUpdateDataWithId) => ({
    type: TypesKeys.UPDATE_PUBLICATION,
    payload: updateData
  } as const)
};