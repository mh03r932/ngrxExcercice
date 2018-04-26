import {Contact} from '../../models/contact';
import {ContactsActions, ContactsActionTypes} from './contacts.actions';

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

    default:
      return state; // ALWAYS return current state as a default

  }
}
