import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import dejavulyrics from '../apis/dejavulyrics';
import Container from '@material-ui/core/Container';


const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      }
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(3),
    },
    root: {
        display: 'flex',
        margin: 'auto',
        paddingLeft: 'auto',
        paddingRight: 'auto',
    },
}));

export default function SearchBar(props) {
    const classes = useStyles();
    const [suggestions, setSuggestion] = useState([]);
    const [searchType, setSearchType] = useState('song_document');
    const [query, setQuery] = useState(null);
      
    const onInputChange = (value) => {
        if (value) setQuery(value);
        if (searchType === 'song_document') {
            const data = new FormData();
            data.append('query', value);    
            data.append('field', 'song_lyrics');
            dejavulyrics.post('/suggest', data)
            .then((response) => {
                setSuggestion(response.data.results);
            }).catch(function (error) {
                console.log("failed execute search" + error);
            });
        }
    };

    const onKeyPress = (event) => {
        if (event.key === "Enter") {
            props.onSubmit(query);
        }
    };

    const filterOptions = (options, { inputValue }) => options;

    return (
        <Container className={classes.root}>
            <FormControl className={classes.margin}>
            <Autocomplete
                id="lyrics-search-autocomplete"
                freeSolo
                onChange={(event, values) => {
                    onInputChange(values);
                }}
                options={suggestions.map((suggestion) => suggestion.text.replace(/\n/g, " "))}
                renderInput={(params) => {
                    return (<TextField {...params} 
                        label="Enter artist, title, and of course, lyrics :)" margin="normal" 
                        variant="outlined" 
                        onChange={(event, values) => {
                            onInputChange(event.target.value);
                        }}
                        onKeyPress={(event) => onKeyPress(event)}/>);
                    }
                }
                style={{ width: 800 }}
                filterOptions={filterOptions}
            />
            </FormControl>
            <FormControl className={classes.margin}>
            <InputLabel id="search-type-dropdown">search type</InputLabel>
            <Select
                labelId="search-type-dropdown"
                id="search-type-dropdown"
                value={searchType}
                onChange={(event) => {
                    props.onDropDownChange(event.target.value);
                    setSearchType(event.target.value);
                    setSuggestion([]);
                }}
                style={{ width: 200 }}
                input={<BootstrapInput />}
            >
                <MenuItem value={'song_document'}>Song Lyrics</MenuItem>
                <MenuItem value={'song_composite'}>Song Artist and Title</MenuItem>
                <MenuItem value={'song_artist'}>Song Artist</MenuItem>
                <MenuItem value={'song_title'}>Song Title</MenuItem>
            </Select>
            </FormControl>
            <FormControl className={classes.margin}>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                style={{ marginTop: 25 }}
                onClick={() => {props.onSubmit(query)}}
            >
                Submit
            </Button>
            </FormControl>
        </Container>
    );
}