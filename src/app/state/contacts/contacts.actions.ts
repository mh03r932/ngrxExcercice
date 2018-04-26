import {Action} from '@ngrx/store';
import {Contact} from '../../models/contact';

export enum ContactsActionTypes {
  LOAD_CONTACTS_SUCCESS = '[Contacts] Load Contacts Success',
  UPDATE_CONTACT = '[Contacts] Update contact',
  SELECT_CONTACT = '[Contacts] Select contact',
  ADD_CONTACT = '[Contacts] Add contact',
  LOAD_CONTACTS = '[Contacts] Load All Contacts',
  UPDATE_CONTACT_SUCCESS = '[Contacts] update contact sucess',


}

/** Implement LoadContactsSuccessAction here */

export class LoadContactsSuccessAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS_SUCCESS;

  constructor(public payload: Array<Contact>) {
  }
}

export class SelectContactAction implements Action {
  readonly type = ContactsActionTypes.SELECT_CONTACT;

  constructor(public payload: number) {
  }

}

export class UpdateContactAction implements Action {
  readonly type = ContactsActionTypes.UPDATE_CONTACT;

  constructor(public payload: Contact) {
  }
}

export class AddContactAction implements Action {
  readonly type = ContactsActionTypes.ADD_CONTACT;

  constructor(public payload: Contact) {
  }
}

export class LoadContactsAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS;

  constructor() {
  }
}

export class UpdateContactSuccessAction implements Action {
  readonly type = ContactsActionTypes.UPDATE_CONTACT_SUCCESS;

  constructor(public payload: Contact) {
  }
}

export type ContactsActions = LoadContactsSuccessAction | SelectContactAction | UpdateContactAction | AddContactAction
  | LoadContactsAction | UpdateContactSuccessAction;
