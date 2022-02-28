import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

import { AppRootStateType } from '../../store/store';
import { ICurrentUserPublications } from '../../store/collections/collectionsTypes';
import { PublicationForm } from './PublicationForm';


export function UserPublications() {

  const { t } = useTranslation();

  const currentUserPublications = useSelector<AppRootStateType, ICurrentUserPublications[]>(state => state.collection.currentUserPublications);

  return (
      <Container maxWidth={'xl'}>
        {currentUserPublications.length
            ? currentUserPublications.map(publication => <PublicationForm publication={publication}/>)
            : <Typography sx={{ paddingTop: '20px', textAlign: 'center' }} gutterBottom variant="h5">
              {t('publications.no_publications')}
            </Typography>
        }
      </Container>


  );
}