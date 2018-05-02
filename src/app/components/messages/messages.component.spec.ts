import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MessageService } from '@appServices/message.service';
import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let comp: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(() => {
    const messageServiceStub = {};
    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: MessageService, useValue: messageServiceStub }]
    });
    fixture = TestBed.createComponent(MessagesComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });
});
