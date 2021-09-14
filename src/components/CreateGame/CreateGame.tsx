import React, { useEffect, useState } from 'react'
import { Button, Select, Container, Grid, TextField, Typography, makeStyles, createStyles, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { useGameContext } from '../../context/GameContext';
import { useSocketContext } from '../../context/SocketContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => createStyles({
    fullWidth: {
        width: '100%',
    },
}))

const CreateGame = () => {
    const classes = useStyles();
    const [gameName, setGameName] = useState("");
    const [initialOptions, setInitialOptions] = useState<{ [key: string]: number[] }>({ "simple": [1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10], "fibonacci": [1, 2, 3, 5, 8, 13, 21] })
    const [option, setOption] = useState("")
    const { game, handleGame } = useGameContext();
    const { socket } = useSocketContext();
    const history = useHistory();


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setGameName(event.target.value);
    }

    const handleOptionSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        event.preventDefault();
        const optionVal = event.target.value
        setOption(optionVal as string)
    }

    const handleCreateGame = (event: React.FormEvent) => {
        event.preventDefault();
        socket.emit("create_game", { 'name': gameName, 'option': option })
    }

    

    useEffect(() => {
        socket.on("game_created", (game) => {
            handleGame(game);
        });

        if (game?.id) {
            history.push('/' + game.id);
        }
    }, [game])

    return (
        <Container maxWidth={'sm'}>
            <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <Typography align="center" variant="h4" component="h1">Create Planning Poker Game</Typography>
                </Grid>
                <Grid item className={classes.fullWidth}>
                    <form onSubmit={handleCreateGame}>
                        <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
                            <Grid item className={classes.fullWidth}>
                                <TextField variant="outlined" fullWidth id="gameName" name="gameName" required placeholder="Please enter a Game Name" value={gameName} onChange={handleChange} />
                            </Grid>
                            <Grid item className={classes.fullWidth}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-age-native-simple">Choose an option</InputLabel>
                                    <Select fullWidth onChange={handleOptionSelect} required>
                                        {Object.keys(initialOptions).map((option) =>
                                            <MenuItem key={option} value={option} >{initialOptions[option]?.join(',')} </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button type="submit" color="primary" variant="contained">Create Game</Button>
                            </Grid>
                        </Grid>
                    </form>

                </Grid>
            </Grid>
        </Container>
    )
}

export default CreateGame;
