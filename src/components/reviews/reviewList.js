import React, { useState } from 'react';

import { Paper, Typography, Stack, Button, Box } from '@mui/material';
import { Review } from './review';


export const ReviewList = ( {reviews} ) => {


    const maxReviewsAtOnce = 5;

    const reviewList = []
    for (let i = 0; i < 13; i++) {
        reviewList.push({reviewAuthor: 'reviewAuthor', reviewContents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at consectetur purus. Sed sit amet ligula mattis, posuere nulla vitae, dapibus lorem. Vestibulum quis nunc et est interdum facilisis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam enim odio, porttitor id pretium non, rutrum at nisl. Pellentesque faucibus risus quis orci dapibus, eget rutrum sem congue. Donec ullamcorper ut nibh a vulputate. Integer neque lacus, congue sed ex in, pharetra dapibus lorem.', reviewScore: 4.5})
    }

    const [displayedReviewsCount, setDisplayedReviewsCount] = useState(0);

    // const displayMoreButtonText = () => {
    //     if (reviews.Count() - displayedReviewsCount) 
    // }

    return (
        <>
        <Stack>
            <Stack>
                {reviewList.slice(0, maxReviewsAtOnce).map((item) => {
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
            <Button variant='contained' sx={{m: 1, mt: 3}}>
                Show {maxReviewsAtOnce} more reviews  
            </Button>
        </Stack>
        </>
    )
}
