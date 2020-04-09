import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: 1150,
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
        height: '100%',
        width: '100%',
    },
  }));

export default function MediaPage(props) {
    const media = props.selectedMedia;
    const title = media ? media["title"] : null;
    const lyrics = media ? media["lyrics"] : null;
    const artist = media ? media["artist"] : null;
    const videoId = media ? media["videoId"] : null;
    const classes = useStyles();

    if (!media) {
        return <div></div>
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <CardMedia className={classes.media} component='iframe' src={videoId ? `https://www.youtube.com/embed/${videoId}` : ''} frameBorder="0" title="youtube" style={{ height: 630, width: 1120}}>
                    </CardMedia>
                    <br />
                    <br />
                    <br />
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