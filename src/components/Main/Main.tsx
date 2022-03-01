import { useSelector } from 'react-redux';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { AppRootStateType } from '../../store/store';
import { CardItem } from './Item/CardItem';
import { ICollection } from '../../store/collections/collectionsTypes';
import { TagsSlick } from '../Header/TagsSlick';
import { SearchInput } from './SearchInput';


const useStyles = makeStyles((theme) => ({
  block: {
    width: '90%',
    height: '90vh',
    bgcolor: 'background.default',
    color: 'text.primary',
    margin: '0 auto'
  },
  rootCard: {
    paddingTop: '20px',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  queryRootCard: {
    paddingTop: '20px',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden'
  }
}));

export function Main() {

  const smallQuery = useMediaQuery('(max-width:777px)');

  const classes = useStyles();

  const collection = useSelector<AppRootStateType, ICollection[]>(state => state.collection.collection);

  const collectionsAfterSortDate = collection.sort((prev, next) => next.dateUTC - prev.dateUTC);

  const [filter, setFilter] = useState<string | null>('Все');
  const [search, setSearch] = useState<string>('');

  const filterTasks = (collection: ICollection[]) => {
    if (filter === 'Все') {
      return collection;
    } else {
      return collection.filter(book => book.section === filter);
    }
  };

  const searchCollection = collectionsAfterSortDate.filter(item => {
    return (
        item.title.toLowerCase().includes(search.toLowerCase())
        || item.authors.toLowerCase().includes(search.toLowerCase())
    );
  });


  return (
      <Box className={classes.block}>
        <TagsSlick setFilter={setFilter}/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchInput search={search} setSearch={setSearch}/>
        </div>
        <div className={smallQuery ? classes.queryRootCard : classes.rootCard}>
          {filterTasks(searchCollection).map((book) => {
            return (
                <CardItem image={book.imageURL}
                          authors={book.authors}
                          title={book.title}
                          id={book.id}
                          likes={book.likes}
                          senderEmail={book.senderEmail}
                          departureDate={book.departureDate}
                          description={book.description}
                />
            );
          })}
        </div>
      </Box>
  );
}


