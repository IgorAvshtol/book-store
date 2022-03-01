import {
  ICollection,
  ICollectionState,
  ILike,
  IUpdateDataWithId
} from './collectionsTypes';
import { actions } from './collectionsActions';
import { collectionReducer } from './collectionsReducer';

// let state: ICollectionState;
// let newCollection: ICollection;
//
// beforeEach(() => {
//   state = {
//     collection: [
//       {
//         authors: 'string',
//         title: 'ring',
//         description: 'string',
//         imageURL: 'string',
//         pages: 'string',
//         section: 'string',
//         id: 12,
//         likes: [123],
//         senderEmail: 'string',
//         senderId: 12,
//         departureDate: 'string',
//         comments: [
//           {
//             bookId: 12,
//             author: 'string',
//             text: 'string',
//             date: 'string'
//           }
//         ],
//         dateUTC: 112
//       },
//       {
//         authors: 'string',
//         title: 'ring',
//         description: 'string',
//         imageURL: 'string',
//         pages: 'string',
//         section: 'string',
//         id: 23,
//         likes: [],
//         senderEmail: 'string',
//         senderId: 33,
//         departureDate: 'string',
//         comments: [
//           {
//             bookId: 13,
//             author: 'string',
//             text: 'string',
//             date: 'string'
//           }
//         ],
//         dateUTC: 112
//       }
//     ] as ICollection[],
//     currentBook: {} as ICollection,
//     sections: [
//       'История',
//       'Биография',
//       'Фантастика',
//       'Комедия',
//       'Научная',
//       'Эксклюзив',
//       'Детские',
//       'Классика'
//     ],
//     currentSections: [
//       'Все'
//     ],
//     currentUserPublications: [] as ICollection[],
//   };
//
//   newCollection = {
//     authors: 'string',
//     title: 'ring',
//     description: 'string',
//     imageURL: 'string',
//     pages: 'string',
//     section: 'string',
//     id: 23,
//     likes: [],
//     senderEmail: 'string',
//     senderId: 33,
//     departureDate: 'string',
//     comments: [
//       {
//         bookId: 12,
//         author: 'string',
//         text: 'string',
//         date: 'string'
//       }],
//     dateUTC: 112
//   };
// });

// test('get books collection', () => {
//   const newState = collectionReducer(state, actions.getCollectionAC(newCollection));
//   expect(newState.collection.length).toBe(3);
// });

// test('book has liked', () => {
//   const likeData: ILike = {
//     bookId: '12',
//     userId: '123'
//   };
//   const newState = collectionReducer(state, actions.setLikedAC({ likeData }));
//   const currentCollection = newState.collection.find(col => col.id === likeData.bookId);
//   expect(currentCollection).toBeTruthy();
//   expect(currentCollection!.likes).toEqual(expect.arrayContaining([likeData.userId]));
// });
//
// test('set current book', () => {
//   const newState = collectionReducer(state, actions.setCurrentBookAC('12'));
//   expect(newState.currentBook.id).toBe('12');
// });
//
// test('get current book', () => {
//   const newState = collectionReducer(state, actions.getCurrentBookAC(newCollection));
//   expect(newState.currentBook).toEqual(newCollection);
// });
//
// test('set new comment', () => {
//   const newState = collectionReducer(state, actions.getCurrentBookAC(newCollection));
//   expect(newState.currentBook).toEqual(newCollection);
// });
//
// test('set current sort section', () => {
//   const newState = collectionReducer(state, actions.setCurrentSectionsAC('Комедия'));
//   expect(newState.currentSections).toEqual(expect.arrayContaining(['Комедия']));
// });
//
// test('set current user publications', () => {
//   const newState = collectionReducer(state, actions.setCurrentUserPublicationsAC('33'));
//   expect(newState.currentUserPublications).toEqual(expect.arrayContaining([newCollection]));
// });
//
// test('update current publication', () => {
//   const updateData: IUpdateDataWithId = {
//     publicationId: '12',
//     author: 'igor',
//     description: 'string',
//     pages: 'string',
//     section: 'string',
//   };
//
//   const updateCollection = [
//     {
//       authors: 'igor',
//       title: 'ring',
//       description: 'string',
//       imageURL: 'string',
//       pages: 'string',
//       section: 'string',
//       id: '12',
//       likes: ['123'],
//       senderEmail: 'string',
//       senderId: 'string',
//       departureDate: 'string',
//       comments: [
//         {
//           bookId: 'string',
//           author: 'string',
//           text: 'string',
//           date: 'string'
//         }],
//       dateUTC: 112
//     }
//   ];
//   const newState = collectionReducer(state, actions.setUpdatePublicationAC(updateData));
//   const editablePublication = newState.collection.filter(book => book.id === updateData.publicationId);
//   expect(editablePublication).toEqual(updateCollection);
// });