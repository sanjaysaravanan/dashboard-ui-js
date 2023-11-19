/* eslint-disable */
import { LOAD_LAYOUT } from "../actions/actionTypes";
import { localStorage } from '../utils/index';


const saveToStorage = (payload) => {
  const { items, layout, layouts } = payload;
  localStorage.setLocalState('ITEMS', items);
  localStorage.setLocalState('LAYOUT', layout);
  localStorage.setLocalState('LAYOUTS', layouts);
}

export default function (state = {
  items: localStorage.getLocalState('ITEMS') || [],
  layout: localStorage.getLocalState('LAYOUT') || [],
  layouts: localStorage.getLocalState('LAYOUTS') || { lg: [], md: [], sm: [] },
}, action) {
  switch (action.type) {
    case LOAD_LAYOUT:
      saveToStorage(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
