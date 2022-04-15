import { Container, Typography } from '@mui/material';

//TO DO ==> component to build
export const NoMatch = (props) => {
    return (
        <>
            <Container maxWidth='sm'>
                <Typography align='center' variant='h3'>
                    Page not found
                </Typography>
                <Typography align='center' variant='h6'>
                    Check your URL
                </Typography>
            </Container>
        </>
    );
};
