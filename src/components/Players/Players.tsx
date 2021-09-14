import { Grid } from '@material-ui/core';
import { useGameContext } from '../../context/GameContext';
import Player from '../Player';

const Players = () => {
    const { game: { players = [] } = {} } = useGameContext();

    return !!players.length ? (
        <Grid container spacing={3}>
            {players.map((player) => (
                <Player key = {player.id} {...player} />
            ))}
        </Grid>
    ) : <div />
}

export default Players;
