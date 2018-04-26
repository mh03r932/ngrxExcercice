import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ContactsService} from './contacts.service';
import {AddContactAction, SelectContactAction} from './state/contacts/contacts.actions';
import {Contact} from './models/contact';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';


import {of} from 'rxjs/observable/of';
import {ContactsQuery} from './state/contacts/contacts.reducers';
import getLoaded = ContactsQuery.getLoaded;

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(private store: Store<Contact>,
              private contactsService: ContactsService) {
  }


  canActivate(route: ActivatedRouteSnapshot) {
    const contactId = route.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+contactId));


    const resolveOrAddContactToList = (loaded: boolean) => {
      const addContactToList = (contact: Contact) => {
        this.store.dispatch(new AddContactAction(contact));
      };

      return loaded ? of(true) : this.contactsService // if loaded we are good to go, otherwise load from rest
        .getContact(contactId)
        .do(addContactToList)
        .map(contact => !!contact);

    };

    // we want to check if the contacts are loaded
    const query =  getLoaded;
    return this.store.select(query)
      .take(1)
      .switchMap(resolveOrAddContactToList);

  }

  // canActivate(route: ActivatedRouteSnapshot) {
  //   const resolveOrAddContactToList = (loaded: boolean) => {
  //
  //     const addContactToList = function (contact: Contact) {
  //
  //     };
  //
  //     return loaded ? Observable.of(true) : this.contactsService
  //       .getContact(contactId)
  //       .do((contact) => {
  //         this.store.dispatch(new AddContactAction(contact));
  //       })
  //       .map(contact => !!contact);
  //   };
  //   const contactId = route.paramMap.get('id');
  //   this.store.dispatch(new SelectContactAction(+contactId));
  //
  //   return this.store.select(state => state.contacts.loaded)
  //     .take(1)
  //     .switchMap(resolveOrAddContactToList);
  // }
}
