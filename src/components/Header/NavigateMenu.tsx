import { useDispatch, useSelector } from 'react-redux';
import { MouseEvent, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logOut } from '../../store/auth/authThunk';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Box, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Badge from '@mui/material/Badge';

import { AppRootStateType } from '../../store/store';
import { ICollection } from '../../store/collections/collectionsTypes';
import { IUser } from '../../store/auth/authTypes';
import { actions } from '../../store/collections/collectionsActions';


const useStyles = makeStyles({
      userDataResp: {
        display: 'flex',
        justifyContent: 'flex-end'
      },
      userData: {
        display: 'flex',
        alignItems: 'center'
      }
    }
);


export function NavigateMenu() {

  const { t } = useTranslation();

  const classes = useStyles();

  const smallQuery = useMediaQuery('(max-width:550px)');

  const dispatch = useDispatch();

  const countOfPublications = useSelector<AppRootStateType, ICollection[]>((state: AppRootStateType) => state.collection.currentUserPublications);

  const userData = useSelector<AppRootStateType, IUser | null>(state => state.auth.user);

  useEffect(() => {
    if (userData?.id) {
      dispatch(actions.setCurrentUserPublicationsAC(userData?.id));
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOutButtonHandler = () => {
    dispatch(logOut());
  };

  return (
      <div>
        {
          <Box className={smallQuery ? classes.userDataResp : classes.userData}>
            <Button sx={{ color: 'white' }} onClick={handleClick}>
              <AccountBoxIcon fontSize={'large'}/>
            </Button>
            <Box
                sx={smallQuery ? { display: 'none' } : { color: 'white' }}
            >
              {userData?.email}
            </Box>
          </Box>
        }
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
        >
          <NavLink to={'/addBookForm'} style={{ textDecoration: 'none', color: 'currentcolor' }}>
            <MenuItem onClick={handleClose}>{`${t('select.add_book')}`}</MenuItem>
          </NavLink>
          <NavLink to={`/user:${userData?.id}/publications`} style={{ textDecoration: 'none', color: 'currentcolor' }}>
            <MenuItem onClick={handleClose}>{`${t('select.my_publications')}`}
              <Badge badgeContent={countOfPublications.length || 0} color="primary" showZero>
                <MenuBookIcon color="action" sx={{ paddingLeft: '10px' }}/>
              </Badge>
            </MenuItem>
          </NavLink>
          <MenuItem onClick={onLogOutButtonHandler}>{`${t('select.logout')}`}</MenuItem>
        </Menu>
      </div>
  );
}