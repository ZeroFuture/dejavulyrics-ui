import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MediaCard from  './MediaCard';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Container from '@material-ui/core/Container';

export default function MediaCardList(props) {
    if (props.active && props.resultRecords) {
        const renderedResultRecords = props.resultRecords.map((resultRecord) => {
            return (
            <ListItem key={resultRecord['_id']} alignItems="flex-start">
                    <MediaCard key={resultRecord['_id']} 
                    onSelectMedia={props.onSelectMedia} 
                    artist={resultRecord['_source']['song_artist']} 
                    title={resultRecord['_source']['song_title']} 
                    lyrics={resultRecord['_source']['song_lyrics']}/>
            </ListItem>
            );
        });

        return (

            // <React.Fragment>
            //     <CssBaseline />
            //     <Container maxWidth="lg">
                <List>
                    {renderedResultRecords}
                </List>
            //     </Container>
            // </React.Fragment>


            // <div>
            //     <List>
            //         {renderedResultRecords}
            //     </List>
            // </div>
        )
    }
    return (<div></div>);
}