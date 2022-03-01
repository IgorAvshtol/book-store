import { ActionType, ICollection, ICollectionState, TypesKeys } from './collectionsTypes';

const initialState: ICollectionState = {
  collection: [] as ICollection[],
  currentBook: {} as ICollection,
  sections: [
    'История',
    'Биография',
    'Фантастика',
    'Комедия',
    'Научная',
    'Эксклюзив',
    'Детские',
    'Классика'
  ],
  currentSections: [
    'Все'
  ],
  currentUserPublications: [] as ICollection[]
};

export const collectionReducer = (state = initialState, action: ActionType): ICollectionState => {
  switch (action.type) {
    case TypesKeys.GET_COLLECTION:
      return {
        ...state,
        collection: action.payload
      };
    case TypesKeys.CURRENT_BOOK_HAS_LIKED:
      return {
        ...state,
        collection: state.collection.map(n => n.id === action.payload.likeData.id ? {
          ...n,
          likes: Array.from(new Set([...n.likes, action.payload.likeData.userId]))
        } : n)
      };
    case TypesKeys.CURRENT_BOOK_HAS_DISLIKED:
      return {
        ...state,
        collection: state.collection.map(n => n.id === action.payload.likeData.id ? {
          ...n,
          likes: [...n.likes.filter(like => like !== action.payload.likeData.userId)]
        } : n)
      };
    case TypesKeys.SET_CURRENT_BOOK:
      const searchedCollection = state.collection.find(book => book.id === action.payload);
      return {
        ...state,
        currentBook: searchedCollection ? { ...searchedCollection } : { ...state.currentBook }
      };
    case TypesKeys.GET_CURRENT_BOOK:
      return {
        ...state,
        currentBook: action.payload
      };
    case TypesKeys.SET_COMMENT:
      return {
        ...state,
        collection: state.collection.map(book => book.id === action.payload.comments.bookId
            ? {
              ...book,
              comments:
                  [
                    ...book.comments, action.payload.comments
                  ]
            }
            : book),
        currentBook: {
          ...state.currentBook, comments: state.currentBook.comments
              ? [...state.currentBook.comments, action.payload.comments]
              : state.currentBook.comments
        }
      };
      // case TypesKeys.SET_CURRENT_SECTIONS:
      //   return {
      //     ...state,
      //     currentSections: [...state.currentSections, action.payload]
      //   };
    case TypesKeys.SET_CURRENT_SECTIONS:
      return {
        ...state,
        currentSections: [...state.currentSections, ...state.collection.map(book => book.section)]
      };
    case TypesKeys.SET_CURRENT_USER_PUBLICATIONS:
      return {
        ...state,
        currentUserPublications: state.collection.filter(collection => collection.senderId === action.payload)
      };
    case TypesKeys.UPDATE_PUBLICATION:
      return {
        ...state,
        collection: state.collection.map(book => book.id === action.payload.publicationId
            ? {
              ...book,
              authors: action.payload.author,
              description: action.payload.description,
              pages: action.payload.pages,
              section: action.payload.section,
            }
            : book)
      };
    default:
      return state;

  }
};