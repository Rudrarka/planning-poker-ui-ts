import { Avatar, createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import { getRandomColor } from '../../utils';
import { IPlayer } from '../../context/GameContext';
import { CSSProperties } from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        avatar: {
            backgroundColor: ({ backgroundColor }: { backgroundColor: CSSProperties['backgroundColor'] }) => backgroundColor,
        },
        name: {
            width: 60,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
    }),
);

const Player = ({ id, name }: IPlayer) => {
    const classes = useStyles({ backgroundColor: getRandomColor() });
    return (
        <Grid item key={id}>
            <Grid container direction="column" alignItems="center">
                <Grid item>
                    <Avatar title={name} className={classes.avatar}>{name?.substring(0, 1)?.toUpperCase()}</Avatar>
                </Grid>
                <Grid item>
                    <Typography align="center" className={classes.name}>{name}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default Player;
