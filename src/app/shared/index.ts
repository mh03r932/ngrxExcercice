import {storeFreeze} from 'ngrx-store-freeze';
import {StoreModule} from '@ngrx/store';
import {environment} from '../../environments/environment';

function logReducer(reducer) {
  return (state, action) => {
    console.log(action.type);
    const newState = reducer(state, action);
    return newState;
  };
}

export const MY_META_REDUCERS = !environment.production
  ? [storeFreeze, logReducer]
  : [];
