import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
 
  ENDPOINT_FLIGHT_GET,
 
  ENDPOINT_FLIGHT_POST,
 
  makeNetworkCall,
} from 'src/network';

import type { IFlightParams } from './types';

// Sellers List
export const requestAddFlights = createAsyncThunk(
  'requestAddFlights',
  async (params: IFlightParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_FLIGHT_POST,
      data: params,
    });
    return response?.data;
  }
);
export const getAllFlights = createAsyncThunk(
  'requestAddFlights',
  async (params: IFlightParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.GET,
      url: ENDPOINT_FLIGHT_GET,
      data: params,
    });
    console.log("response",response)
    return response?.data?.data;
  }
);



