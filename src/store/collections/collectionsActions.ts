import {
  TypesKeys,
  ILikeData,
  ICommentData,
  IUpdateDataWithId, ICollection
} from './collectionsTypes';
import { AxiosResponse } from 'axios';

export const actions = {
  getCollectionAC: (collection: AxiosResponse<ICollection[]>) => ({
    type: TypesKeys.GET_COLLECTION,
    payload: collection
  } as const),
  setLikedAC: ({ likeData }: ILikeData) => ({ type: TypesKeys.CURRENT_BOOK_HAS_LIKED, payload: { likeData } } as const),
  setDislikedAC: ({ likeData }: ILikeData) => ({
    type: TypesKeys.CURRENT_BOOK_HAS_DISLIKED,
    payload: { likeData }
  } as const),
  setCurrentBookAC: (bookId: string) => ({ type: TypesKeys.SET_CURRENT_BOOK, payload: bookId } as const),
  getCurrentBookAC: (currentBook: ICollection) => ({ type: TypesKeys.GET_CURRENT_BOOK, payload: currentBook } as const),
  setCommentAC: ({ comments }: ICommentData) => ({ type: TypesKeys.SET_COMMENT, payload: { comments } } as const),
  setCurrentSectionsAC: (select: string) => ({ type: TypesKeys.SET_CURRENT_SECTIONS, payload: select } as const),
  setCurrentUserPublicationsAC: (userId: string) => ({
    type: TypesKeys.SET_CURRENT_USER_PUBLICATIONS,
    payload: userId
  } as const),
  setUpdatePublicationAC: (updateData: IUpdateDataWithId) => ({
    type: TypesKeys.UPDATE_PUBLICATION,
    payload: updateData
  } as const)
};