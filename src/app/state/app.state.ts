import {ActionReducerMap} from '@ngrx/store';
import {contactsReducer, ContactsState} from './contacts/contacts.reducers';

export interface ApplicationState {
  contacts: ContactsState;
}


export const ROOT_REDUCER: ActionReducerMap<ApplicationState> = {
  contacts: contactsReducer
};


