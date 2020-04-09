import React, {useState} from 'react';
import SearchBar from './SearchBar';
import MediaCardList from './MediaCardList';
import dejavulyrics from '../apis/dejavulyrics';
import MediaPage from './MediaPage';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  margin: {
      margin: theme.spacing(3),
  },
  root: {
      margin: 'auto',
      paddingLeft: 'auto',
      paddingRight: 'auto',
  },
  title: {
    fontFamily: 'Dancing Script',
    flexGrow: 1,
    margin: 20,
    paddingTop: 20,
    paddingLeft: 40,
    paddingBottom: 0,
  },
}));

export default function App() {
  const [searchType, setSearchType] = useState('song_document');
  const [response, setResponse] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const classes = useStyles();

  const onDropDownChange = (value) => {
    console.log(value);
    setSearchType(value);
  };

  const onSelectMedia = (media) => {
    setSelectedMedia(media);
  };

  const onSubmit = (query) => {
    console.log(query);
    console.log(searchType);
    if (query) {
      if (searchType === 'song_document') {
        const data = new FormData();
        data.append('query', query);    
        data.append('field', 'song_lyrics');
        dejavulyrics.post('/suggest', data)
        .then((response) => {
          setSelectedMedia(null);
          setResponse(response.data.results);
          console.log("use suggestion results");
        }).catch(function (error) {
          const data = new FormData();
          data.append('query', query);
          data.append('field', searchType);
          dejavulyrics.post('/search', data)
          .then((response) => {
            setSelectedMedia(null);
            setResponse(response.data.results);
            console.log("use search results");
          }).catch(function (error) {
            console.log("failed execute search" + error);
          });
          console.log("failed execute suggest" + error);
        });
      } else {
        const data = new FormData();
        data.append('query', query);
        data.append('field', searchType);
        dejavulyrics.post('/search', data)
        .then((response) => {
          setSelectedMedia(null);
          setResponse(response.data.results);
        }).catch(function (error) {
          console.log("failed execute search" + error);
        });
      }
    }
  };

  return (
      <Container className={classes.root}>
        <Typography variant="h4" className={classes.title} color="textSecondary">
          <span role="img" aria-label="Musical Notes">Deja Vu Lyrics 🎶</span>
        </Typography>
        <SearchBar onSubmit={onSubmit} onDropDownChange={onDropDownChange}/>
        <MediaCardList resultRecords={response} active={selectedMedia === null} onSelectMedia={onSelectMedia}/>
        <MediaPage selectedMedia={selectedMedia}/>
      </Container>
  )
}
