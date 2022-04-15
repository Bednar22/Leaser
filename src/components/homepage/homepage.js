import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { CategoriesTiles } from './categoriesTiles';
export const Homepage = (props) => {
    return (
        <>
            <CategoriesTiles></CategoriesTiles>
        </>
    );
};
