import React, {useState, useEffect} from 'react';
import lastfm from '../apis/lastfm';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: 1200,
      margin: 'auto',
      padding: 'auto', 
      textAlign: 'center',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      paddingLeft: 100,
      width: 500,
    },
    cover: {
      width: 300,
      height: 300,
      paddingLeft: 'auto',
      marginLeft:'auto',
    },
  }));


export default function MediaCard(props) {
    const artist = props.artist;
    const lyricsPharagraph = props.lyrics.split(/\n/g);
    const lyrics = lyricsPharagraph.length > 10 ? lyricsPharagraph.slice(0, 10).join("\n") + "......" : props.lyrics;
    const title = props.title;
    const [album, setAlbum] = useState(null);
    const searchQuery = title + ' ' + artist; 
    const classes = useStyles();
    const getAlbum = () => {
        if (album) return album;
        return "https://i.ibb.co/W2j18bZ/defaultcover.jpg";
    };

    useEffect(() => {
        lastfm.get('&album=' + searchQuery)
        .then((response) => {
            const images = response.data.results['albummatches']['album'][0]['image'];
            setAlbum(images[images.length - 1]['#text']);
            console.log("received from lastfm");
        }).catch(function (error) {
            console.log("failed to call lastfm" + error);
        });
    }, [searchQuery]);

    return (
        <Card className={classes.root} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <div className={classes.details}>
            <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
                <Link onClick={(event) => props.onSelectMedia({"artist": props.artist, "title": props.title, "lyrics": props.lyrics})}>
                    {title}
                </Link>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {artist}
            </Typography>
            <Typography variant="body2" color="textSecondary" dangerouslySetInnerHTML={{ __html: lyrics.replace(/\n/g, "<br/ >") }}>
            </Typography>
            </CardContent>
        </div>
        <CardMedia
            className={classes.cover}
            image={getAlbum()}
            title="Album cover"
        />
        </Card>
    )
}