import { Component, OnInit } from '@angular/core';
import { MessageService } from '@appServices/message.service';
import { EntityServices } from 'ngrx-data';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private entityServices: EntityServices
  ) {}

  ngOnInit() {
    this.entityServices.reducedActions$.subscribe(res => {
      if (res && res.type) {
        this.messageService.add(res.type);
      }
    });
  }
}
