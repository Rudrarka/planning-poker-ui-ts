import { Badge, Button, Grid } from '@material-ui/core';
import { useGameContext } from '../../context/GameContext';
import { useSocketContext } from '../../context/SocketContext';

interface IVoteProps {
    option: number,
    count: number
}



const Vote = ({ option, count }: IVoteProps) => {

    const { socket } = useSocketContext();
    const { game, currentPlayer } = useGameContext();

    const handleVote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        socket.emit("player_vote", { "player_id": currentPlayer.id, "game_id": game.id, "vote": option })
    }

    return (
        <Grid item>
            <Badge badgeContent={count || '0'} color="secondary" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Button variant="contained" color="primary" size="large" onClick={handleVote}>
                    Vote - {option}
                </Button>
            </Badge>
        </Grid>
    )
};

export default Vote;
