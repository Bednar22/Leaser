import styled from '@emotion/styled';

/* It's a utility component, used to force next grid item to new line, can be used to center grid item
    
    Example: <Grid item sm={6}> takes 1/2 of the space, so next <Grid item sm={6}> will be placed
    next to the first grid item, GridBreak seperates these two grid items
    
    Visual:
    ------ ------   <-- no GridBreak
    
    ------ <GridBreak>  <-- with GridBreak
    ------
*/

export const GridBreak = styled.div`
    width: 100%;
`;
