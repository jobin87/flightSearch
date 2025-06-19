import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
 
  ENDPOINT_FKIGHT_POST,
 
  makeNetworkCall,
} from 'src/network';

import type { IPatientParams } from './types';

// Sellers List
export const requestAddFlights = createAsyncThunk(
  'requestAddFlights',
  async (params: IPatientParams) => {
    const response = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_FKIGHT_POST,
      data: params,
    });
    return response?.data;
  }
);




