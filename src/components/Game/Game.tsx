import { Box, Button, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react'
import { useGameContext } from '../../context/GameContext';
import { useSocketContext } from '../../context/SocketContext';
import DialogForm from '../DialogForm';
import Players from '../Players';
import { initialPlayerState, initialGameState, IGame } from '../../context/GameContext';
import { useHistory } from 'react-router';
import Votes from '../Votes';
import Notification from '../Notification';

const useStyles = makeStyles(() => createStyles({
    container: {
        height: '100%',
    },
    game: {
        textTransform: 'uppercase'
    },
    button: {
        margin: 8
    }
}))

const Game = ({ match }: any) => {
    const classes = useStyles();
    const { game, handleGame, currentPlayer, handleCurrentPlayer } = useGameContext();
    const { socket } = useSocketContext();
    const history = useHistory();
    const [showNotification, setShowNotification] = React.useState<boolean>(false);

    const handleNotification = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowNotification(false);
    };

    const handleInvite = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowNotification(true);
    }

    const resetFactorySettings = () => {
        handleCurrentPlayer(initialPlayerState)
        handleGame(initialGameState)
    }

    const handleNewGame = () => {
        socket.emit("leave_game", { "game_id": game.id, 'player_id': currentPlayer.id })
        resetFactorySettings()
        history.push("/")
    }

    const handleLeave = () => {
        socket.emit("leave_game", { "game_id": game.id, 'player_id': currentPlayer.id })
        resetFactorySettings()
        history.push("/")
    }

    const voteCount = (): { [value: number]: number; } => {
        const totalVotes: { [value: number]: number; } = {};
        game?.options?.map((option) => {
            let count = game.players?.filter((obj) => obj.vote === option)?.length
            totalVotes[option] = count;
        });
        return totalVotes

    }

    useEffect(() => {
        socket.on("player_left", ({ game, player_id }) => {
            handleGame(game);
        });

        socket.on("player_disconnected", (game) => {
            handleGame(game);
        });

        socket.on("player_voted", (game: IGame) => {
            if (game) {
                game.players.map((player) => {
                    if (player.id == currentPlayer.id) {
                        handleCurrentPlayer(player)
                    }
                })
                handleGame(game);
            }
        });
    }, []);

    return (
        <React.Fragment>
            <Grid container direction="column" justifyContent="space-between" alignItems="center" className={classes.container}>

                <Grid item>
                    {game.name && (<Typography gutterBottom variant="h4" component="h1">Welcome to the game <b className={classes.game}>{game.name}</b></Typography>)}
                </Grid>
                <Grid item>
                    <Box mt={3}>
                        <Votes votesCount={voteCount()} />
                    </Box>
                </Grid>
                <Grid item>
                    <Players />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleInvite}>
                        Invite Players
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Reset
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleLeave}>
                        Leave Game
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button}>
                        End Game
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleNewGame}>
                        New Game
                    </Button>
                </Grid>
            </Grid>
            <DialogForm gameId={game.id || match.params?.id} isAdmin />
            <Notification open={showNotification} onClose={handleNotification} />
        </React.Fragment>
    )
};


export default Game;
