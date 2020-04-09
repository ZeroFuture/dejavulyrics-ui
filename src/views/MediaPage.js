import React, { useEffect, useState } from 'react';
import youtube from '../apis/youtube';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const KEY = process.env.REACT_APP_YOUTUBE_KEY;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: 1500,
      margin: 'auto',
    },
    content: {
      flex: '1 0 auto',
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 'auto',
    },
    media: {
        height: 500,
        width: 1000,
    },
  }));

export default function MediaPage(props) {
    const media = props.selectedMedia;
    const title = media ? media["title"] : null;
    const lyrics = media ? media["lyrics"] : null;
    const artist = media ? media["artist"] : null;
    const classes = useStyles();

    const [video, setVideo] = useState(null);

    useEffect(() => {
        if (media) {
            const query = title + " " + artist;
            youtube.get('/search', {
                params: {
                    q: query,
                    part: 'snippet',
                    maxResults: 1,
                    key: KEY,
                }
            }).then((response) => {
                setVideo(response.data.items[0]);
                console.log("received from youtube");
            }).catch(function (error) {
                console.log("failed to call youtube" + error);
                console.log(error);
                return <div></div>;
            });
        }
    }, [media, artist, title]);

    if (!media) {
        return <div></div>
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <CardMedia className={classes.media} component='iframe' src={video ? `https://www.youtube.com/embed/${video.id.videoId}` : ''} frameBorder="0" title="youtube" style={{ height: 630, width: 1120}}>
                    </CardMedia>
                    <Typography component="h4" variant="h4" color="textSecondary">
                        {title}
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="h5" color="textSecondary">
                        {artist}
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="subtitle1" color="textSecondary" dangerouslySetInnerHTML={{ __html: lyrics.replace(/\n/g, "<br />") }}>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}