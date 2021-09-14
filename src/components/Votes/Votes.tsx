import { Grid } from '@material-ui/core';
import Vote from '../Vote';

interface IVotesProps {
    votesCount: { [value: number]: number; };
}

const Votes = (props: IVotesProps) => {
    return !!Object.keys(props.votesCount).length ? (
        <Grid container spacing={3}>
            {Object.keys(props.votesCount).map((option) =>
                <Vote key={option} option={+option} count={props.votesCount[+option]} />
            )}
        </Grid>
    ) : <div />
}

export default Votes;
