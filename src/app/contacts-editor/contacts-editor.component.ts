import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import {Observable} from 'rxjs/Observable';
import {ApplicationState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {SelectContactAction} from '../state/contacts/contacts.actions';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  // we need to initialize since we can't use ?. operator with ngModel
  // contact: Contact = <Contact>{ address: {}};
  contact$: Observable<Contact>;

  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<ApplicationState>) {}

  ngOnInit() {
    // this.contactsService.getContact(this.route.snapshot.paramMap.get('id'))
    //                     .subscribe(contact => this.contact = contact);
    // this.store.select.pipe(map(contact => ({...contact}))

    const contactId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+contactId));

    this.contact$ = this.store.select(state => {
      const id = state.contacts.selectedContactId;
      const contact = state.contacts.list.find(contact =>
        contact.id == id);
      return Object.assign({}, contact);
    });
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
   this.contactsService.updateContact(contact)
                       .subscribe(() => this.goToDetails(contact));
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id ]);
  }
}

