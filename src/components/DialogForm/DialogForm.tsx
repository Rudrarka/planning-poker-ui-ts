import TextField from "@material-ui/core/TextField"
import React, { useEffect, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { useGameContext } from '../../context/GameContext';
import { useSocketContext } from '../../context/SocketContext';

interface IDialogFormProps {
    gameId: string;
    isAdmin: boolean;
}

const DialogForm = (props: IDialogFormProps) => {
    const [open, setOpen] = useState(true);
    const [joinError, setJoinError] = useState(false);
    const { game, handleGame, handleCurrentPlayer, currentPlayer } = useGameContext();
    const [displayName, setDisplayName] = useState<string>('');
    const { socket } = useSocketContext();

    let user = (localStorage.getItem('user'))

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDisplayName(e.target.value);
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        socket.emit("create_player", { 'display_name': displayName, 'is_admin': props.isAdmin })
    }

    useEffect(() => {
        if (user && !currentPlayer.id) {
            let formattedUser = JSON.parse(user)
            formattedUser["game_id"] = props.gameId
            handleCurrentPlayer(formattedUser)
            socket.emit("player_rejoin", formattedUser)
        } else {
            setOpen(true)
        }
        // subscribe to socket events

        socket.on("player_created", (player) => {
            handleCurrentPlayer(player);
            if (player?.id && (game?.id || props.gameId)) {
                localStorage.setItem("user", JSON.stringify(player));
                socket.emit("player_join_request", { 'game_id': props.gameId, 'player_id': player.id });
            }
        });
        socket.on("player_joined", (game) => {
            handleGame(game);
            setOpen(false);
        });

        socket.on("player_join_error", (error) => {
            setJoinError(true)
        });

    }, []);


    return (
        <>

            <Dialog fullWidth maxWidth="xs" open={open} aria-labelledby="form-dialog-title">
                {joinError && <Typography color="error">No game found</Typography>}
                <DialogTitle id="form-dialog-title">Choose your display name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id="name"
                        label="Enter your name"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" type="button" onClick={handleSubmit} color="primary">
                        Continue to game
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogForm;
