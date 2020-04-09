import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MediaCard from  './MediaCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto', 
    padding: 'auto', 
    textAlign: 'center',
  },
}));

export default function MediaCardList(props) {
    const classes = useStyles();

    if (props.active && props.resultRecords) {
        const renderedResultRecords = props.resultRecords.map((resultRecord) => {
            return (
            <ListItem className={classes.root} key={resultRecord['_id']} alignItems="flex-start">
                    <MediaCard className={classes.root} key={resultRecord['_id']} 
                    onSelectMedia={props.onSelectMedia} 
                    artist={resultRecord['_source']['song_artist']} 
                    title={resultRecord['_source']['song_title']} 
                    lyrics={resultRecord['_source']['song_lyrics']}
                    videoId={resultRecord['_source']['videoId']}
                    />
            </ListItem>
            );
        });

        return (
            <List className={classes.root}>
                {renderedResultRecords}
            </List>
        )
    }
    return (<div></div>);
}