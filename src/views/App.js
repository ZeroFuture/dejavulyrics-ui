import React, {useState} from 'react';
import SearchBar from './SearchBar';
import MediaCardList from './MediaCardList';
import dejavulyrics from '../apis/dejavulyrics';
import MediaPage from './MediaPage';

export default function App() {
  const [searchType, setSearchType] = useState('song_document');
  const [response, setResponse] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  
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
    <div>
      <SearchBar onSubmit={onSubmit} onDropDownChange={onDropDownChange}/>
      <MediaCardList resultRecords={response} active={selectedMedia === null} onSelectMedia={onSelectMedia}/>
      <MediaPage selectedMedia={selectedMedia}/>
    </div>
  )
}
