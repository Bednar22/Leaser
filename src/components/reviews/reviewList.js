import React, { useState } from 'react';
import { Stack, Button, Box } from '@mui/material';
import { Review } from './review';

export const ReviewList = ({ reviews }) => {
    const maxReviewsAtOnce = 5;

    const [displayedReviewsCount, setDisplayedReviewsCount] = useState(maxReviewsAtOnce);

    const ShowMoreReviewsButton = () => {
        const showMoreReviewsOnClick = () => {
            setDisplayedReviewsCount(displayedReviewsCount + maxReviewsAtOnce);
        };

        if (displayedReviewsCount < reviews.length) {
            return (
                <Button variant='contained' sx={{ m: 1 }} onClick={showMoreReviewsOnClick}>
                    Show more reviews
                </Button>
            );
        } else {
            return null;
        }
    };

    return (
        <>
            <Stack>
                <Stack>
                    {reviews.slice(0, displayedReviewsCount).map((item) => {
                        return (
                            <Box sx={{ m: 1 }}>
                                <Review
                                    key={item.id}
                                    author={item.raterUserId}
                                    comment={item.comment}
                                    score={item.rate}
                                ></Review>
                            </Box>
                        );
                    })}
                </Stack>
                <ShowMoreReviewsButton />
            </Stack>
        </>
    );
};
