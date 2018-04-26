import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../contacts.service';
import {Contact} from '../models/contact';
import {ApplicationState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {SelectContactAction} from '../state/contacts/contacts.actions';
import {Observable} from 'rxjs/Observable';
import {ContactsQuery} from '../state/contacts/contacts.reducers';
import getSelectedContact = ContactsQuery.getSelectedContact;

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  // contact: Contact;
  contact$: Observable<Contact>;

  constructor(private contactsService: ContactsService,
              private route: ActivatedRoute,
              private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    // can skip selection
    // const contactId = this.route.snapshot.paramMap.get('id');
    // this.store.dispatch(new SelectContactAction(+contactId));

    const query = getSelectedContact;
    this.contact$ = this.store.select(query);

    // this.contactsService.getContact(this.route.snapshot.paramMap.get('id'))
    //   .subscribe(contact => this.contact = contact);
  }
}
