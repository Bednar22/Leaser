import React, { useState } from 'react';

import { Paper, Typography, Stack, Button, Box, Container } from '@mui/material';
import { Review } from './review';


export const ReviewList = ( {reviews} ) => {


    const maxReviewsAtOnce = 5;

    const reviewList = []
    for (let i = 0; i < 13; i++) {
        reviewList.push({reviewAuthor: 'reviewAuthor', reviewContents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at consectetur purus. Sed sit amet ligula mattis, posuere nulla vitae, dapibus lorem.', reviewScore: 4.5})
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
                                reviewAuthor={item.reviewAuthor}
                                reviewContents={item.reviewContents}
                                reviewScore={item.reviewScore}
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
