import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {LoadContactsSuccessAction} from '../state/contacts/contacts.actions';
import {ApplicationState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {ContactsQuery} from '../state/contacts/contacts.reducers';
import getContacts = ContactsQuery.getContacts;

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  constructor(private contactsService: ContactsService, private store: Store<ApplicationState>) {
  }

  ngOnInit() {

    this.contacts$ = this.store.select(ContactsQuery.getContacts); // select the disired slice of state


    this.contactsService
      .getContacts()
      .subscribe(contacts => {
        this.store.dispatch(
          new LoadContactsSuccessAction(contacts)
        );
      });

  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
