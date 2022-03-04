export enum TypesKeys {
  GET_COLLECTION = 'GET_COLLECTION',
  CURRENT_BOOK_HAS_LIKED = 'CURRENT_BOOK_HAS_LIKED',
  SET_CURRENT_BOOK = 'SET_CURRENT_BOOK',
  GET_CURRENT_BOOK = 'GET_CURRENT_BOOK',
  GET_COMMENTS = 'GET_COMMENTS',
  SET_NEW_BOOK = 'SET_NEW_BOOK',
  CURRENT_BOOK_HAS_DISLIKED = 'CURRENT_BOOK_HAS_DISLIKED',
  SET_COMMENT = 'SET_COMMENT',
  SET_CURRENT_SECTIONS = 'SET_CURRENT_SECTIONS',
  SET_CURRENT_USER_PUBLICATIONS = 'SET_CURRENT_USER_PUBLICATIONS',
  UPDATE_PUBLICATION = 'UPDATE_PUBLICATION'
}

export interface ICollection {
  authors: string;
  title: string;
  description: string;
  imageURL: string;
  pages: number;
  section: string;
  id: number;
  likes: number[];
  senderEmail?: string;
  senderId?: number;
  departureDate: string;
  comments?: IComment[];
  dateUTC: number;
}

export interface ISetDataBook {
  author: string;
  title: string;
  description: string;
  file: any;
  pages: number;
  section: string;
}

export interface ISetBook {
  authors: string;
  title: string;
  description: string;
  pages: number;
  section: string;
  imageURL: any;
  senderEmail: string;
  senderId: number;
  departureDate: string;
  dateUTC: string;
}

export interface ICollectionState {
  collection: ICollection[];
  currentBook: ICollection;
  // comments: IComment[];
  sections: string[];
  currentSections: string[];
  currentUserPublications: ICollection[];
}

export interface ICurrentUserPublications {
  authors: string;
  title: string;
  description: string;
  imageURL: string;
  pages: number;
  section: string;
  id: number;
}

export interface ILike {
  id: number;
  userId: number;
}

export interface ILikeData {
  likeData: ILike;
}

export interface IComment {
  bookId: number;
  author?: string;
  text: string;
  date: string;
}

export interface ICommentData {
  comments: IComment;
}

export interface IUpdateDataWithId {
  publicationId: number;
  authors: string;
  description: string;
  pages: number;
  section: string;
}

export interface IUpdateData {
  authors: string;
  title: string;
  description: string;
  pages: number;
  section: string;
}

export interface IGetCollection {
  type: TypesKeys.GET_COLLECTION;
  payload: ICollection[];
}

export interface ICurrentUserSetLiked {
  type: TypesKeys.CURRENT_BOOK_HAS_LIKED;
  payload: ILikeData;
}

export interface ICurrentUserSetDisliked {
  type: TypesKeys.CURRENT_BOOK_HAS_DISLIKED;
  payload: ILikeData;
}

export interface ISetCurrentBook {
  type: TypesKeys.SET_CURRENT_BOOK;
  payload: number;
}

export interface IGetCurrentBook {
  type: TypesKeys.GET_CURRENT_BOOK;
  payload: ICollection;
}

export interface IGetComments {
  type: TypesKeys.GET_COMMENTS;
  payload: IComment[];
}

export interface INewBook {
  type: TypesKeys.SET_NEW_BOOK,
  payload: ICollection;
}

export interface ISetComment {
  type: TypesKeys.SET_COMMENT,
  payload: ICommentData;
}

export interface ISetCurrentSections {
  type: TypesKeys.SET_CURRENT_SECTIONS,
  payload: string;
}

export interface ISetCurrentUserPublications {
  type: TypesKeys.SET_CURRENT_USER_PUBLICATIONS,
  payload: number;
}

export interface IUpdatePublication {
  type: TypesKeys.UPDATE_PUBLICATION,
  payload: IUpdateDataWithId;
}


export type ActionType = IGetCollection
    | ICurrentUserSetLiked
    | ISetCurrentBook
    | IGetCurrentBook
    | IGetComments
    | INewBook
    | ICurrentUserSetDisliked
    | ISetComment
    | ISetCurrentSections
    | ISetCurrentUserPublications
    | IUpdatePublication

