import { Paper, Typography, Stack, Rating } from '@mui/material';


export const Review = ( {reviewAuthor, reviewContents, reviewScore} ) => {
    return (
        <>
        <Paper>
            <Stack sx={{p: 1}}>
                <Typography fontWeight='bold' variant='h6'>
                    {reviewAuthor}
                </Typography>
                <Rating readOnly precision={0.1} value={reviewScore}/>
                <Typography sx={{pt: 1}}>
                    {reviewContents}
                </Typography>
            </Stack>
        </Paper>
        </>
    );
}
