import { combineReducers } from '@reduxjs/toolkit';
import { flightReducer } from './flight/patientReducer';

export const rootReducer = combineReducers({
flight: flightReducer
});
