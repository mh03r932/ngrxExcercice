import {Action} from '@ngrx/store';
import {Contact} from '../../models/contact';

export enum ContactsActionTypes {
  LOAD_CONTACTS_SUCCESS = '[Contacts] Load Contacts Success',
  LOAD_CONTACTS_ERROR = '[Contacts] Load Contacts ERROR'

}

/** Implement LoadContactsSuccessAction here */

export class LoadContactsSuccessAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS_SUCCESS;

  constructor(public payload: Array<Contact>) {
  }
}

export type ContactsActions = LoadContactsSuccessAction;
