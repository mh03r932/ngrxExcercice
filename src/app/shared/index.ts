import { storeFreeze } from 'ngrx-store-freeze';
import { StoreModule } from '@ngrx/store';
import {environment} from '../../environments/environment';

export const MY_META_REDUCERS = !environment.production
  ? [storeFreeze]
  : [];
