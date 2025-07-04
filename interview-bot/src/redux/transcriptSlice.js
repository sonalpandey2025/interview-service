import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    audioList: [],
};
const transcriptSlice = createSlice({
    name: 'transcript',
    initialState,
    reducers:{
        addTranscript: (state, action) => {
            const {audio} = action.payload;
            state.audioList.push(audio);
        }
    }
});

export const {addTranscript} = transcriptSlice.actions;
export default transcriptSlice.reducer;