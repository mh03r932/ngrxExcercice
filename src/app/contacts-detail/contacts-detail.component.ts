import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../contacts.service';
import {Contact} from '../models/contact';
import {ApplicationState} from '../state/app.state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  contact: Contact;

  constructor(private contactsService: ContactsService,
              private route: ActivatedRoute,
              private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.contactsService.getContact(this.route.snapshot.paramMap.get('id'))
      .subscribe(contact => this.contact = contact);
  }
}
