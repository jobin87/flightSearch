import { createSlice } from '@reduxjs/toolkit';
import { basicInitialArrayState } from '../types';
import {  requestAddFlights } from './flightThunk';

const initialState = {
  flightlist:basicInitialArrayState,
   from: null,
  to: null,
};

export const flightReducer = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setFlightList: (state, action) => {
      state.flightlist = action.payload;
    },
    setSearchParams: (state, action) => {
      state.from = action.payload.from;
      state.to = action.payload.to;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(requestAddFlights.fulfilled, (state, action) => {
        state.flightlist.loading = false;
        state.flightlist.data = action.payload;
      })
      .addCase(requestAddFlights.pending, (state) => {
        state.flightlist.loading = true;
      })
      .addCase(requestAddFlights.rejected, (state, action) => {
        state.flightlist.loading = false;
        state.flightlist.error = action.error;
      })

     

     
  },
});

export const { setSearchParams,setFlightList } =
  flightReducer.actions;

export default flightReducer.reducer;
