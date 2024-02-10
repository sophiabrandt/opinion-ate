import restaurants from './restaurants/reducers';
import {combineSlices} from '@reduxjs/toolkit';

export default combineSlices({restaurants});
