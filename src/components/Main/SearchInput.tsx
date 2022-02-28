import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


interface ISearchInput {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export function SearchInput({ search, setSearch }: ISearchInput) {

  const { t } = useTranslation();

  const onSearchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
      <Paper
          sx={{
            marginTop: '40px',
            p: '2px 4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300
          }}
      >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={`${t('search.input')}`}
            onChange={onSearchHandler}
            value={search}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon/>
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical"/>
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        </IconButton>
      </Paper>
  );
}