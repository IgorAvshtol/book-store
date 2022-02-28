import { useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';

import { AppRootStateType } from '../../store/store';


type PropsType = {
  children: any
}

export function PrivateRoute({ children: Component }: PropsType) {

  const authenticated = useSelector<AppRootStateType, boolean>(state => state.auth.authenticated);

  if (!authenticated) {
    return <Navigate to="/"/>;
  }

  return <Component/>;
}