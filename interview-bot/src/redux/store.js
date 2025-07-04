import { configureStore } from '@reduxjs/toolkit';
import transcriptSlice from './transcriptSlice';
const store = configureStore({
    reducer:{
        transcript: transcriptSlice
    }
});
export default store;