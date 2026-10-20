import { createSlice} from '@reduxjs/toolkit';
const intiStage = {
    items : [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: intiStage,
    reducers: {
    
    }
});

export default cartSlice.reducers;