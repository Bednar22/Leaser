import { Paper, Typography, Stack, Rating } from '@mui/material';


export const Review = ( {author, comment, score} ) => {
    return (
        <>
        <Paper>
            <Stack sx={{p: 1}}>
                <Typography fontWeight='bold' variant='h6'>
                    {author}
                </Typography>
                <Rating readOnly precision={0.1} value={score}/>
                <Typography sx={{pt: 1}}>
                    {comment}
                </Typography>
            </Stack>
        </Paper>
        </>
    );
}
