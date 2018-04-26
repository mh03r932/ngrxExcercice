import {Contact} from '../../models/contact';
import {ContactsActions, ContactsActionTypes} from './contacts.actions';
import {ApplicationState} from '../app.state';
import {createSelector} from '@ngrx/store';

export interface ContactsState {
  list: Array<Contact>;
  selectedContactId: string;
  loaded: boolean;
}

const INITIAL_STATE: ContactsState = {
  list: [],
  selectedContactId: null,
  loaded: false,
};


export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions): ContactsState {

  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {
        ...state, // spread operator to shallow copy
        list: action.payload
      };
    case ContactsActionTypes.SELECT_CONTACT:
      return {
        ...state,
        selectedContactId: action.payload
      };
    case ContactsActionTypes.UPDATE_CONTACT:
      const updatedList = state.list.map(contact => {
        return contact.id == action.payload.id
          ? {...contact, ...action.payload} // apply changes to contact using  spread in this case
          : contact;
      });

      return {...state, list: updatedList};

    case ContactsActionTypes.ADD_CONTACT:
      const findInList = (found, contact) => {
        return found || contact.id == action.payload.id;
      };
      const inStore = state.list.find(findInList);

      return {
        ...state,
        list: !inStore ? [...state.list, action.payload] :
          state.list
      };

    default:
      return state; // ALWAYS return current state as a default

  }

}

export namespace ContactsQuery {
  export const getContacts = (appState: ApplicationState) => appState.contacts.list;
  export const getLoaded = (appState) => appState.contacts.loaded;
  export const getSelectedContactId = (appState) => appState.contacts.selectedContactId;
  export const getSelectedContact = createSelector(
    getContacts,
    getSelectedContactId,
    (contacts, id) => {
      const contact = contacts.find(cntact => cntact.id == id);
      return contact ? Object.assign({}, contact) : undefined;
    }
  );
}
