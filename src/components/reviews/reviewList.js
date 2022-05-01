import React, { useState } from 'react';

import { Stack, Button, Box, Container } from '@mui/material';
import { Review } from './review';


export const ReviewList = ( {reviews} ) => {


    const maxReviewsAtOnce = 5;

    const reviewList = []
    for (let i = 0; i < 13; i++) {
        reviewList.push({author: 'reviewAuthor', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at consectetur purus. Sed sit amet ligula mattis, posuere nulla vitae, dapibus lorem.', score: 4.5})
    }

    const [displayedReviewsCount, setDisplayedReviewsCount] = useState(maxReviewsAtOnce);

    const ShowMoreReviewsButton = () => {

        const showMoreReviewsOnClick = () => {
            setDisplayedReviewsCount(displayedReviewsCount + maxReviewsAtOnce)
        }

        if (displayedReviewsCount < reviewList.length) {
            return (
                <Button variant='contained' sx={{m: 1}} onClick={showMoreReviewsOnClick}>
                    Show more reviews  
                </Button>
            )
        }
        else {
            return null;
        }
    }

    return (
        <>
        <Container>
        <Stack>
            <Stack>
                {reviewList.slice(0, displayedReviewsCount).map((item) => {
                    return (
                        <Box sx={{m: 1}}>
                            <Review
                                author={item.author}
                                comment={item.comment}
                                score={item.score}
                            ></Review>
                        </Box>
                    )
                })}
            </Stack>
            <ShowMoreReviewsButton />
        </Stack>
        </Container>
        </>
    )
}
