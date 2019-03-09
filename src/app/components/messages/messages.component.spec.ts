import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MessageService } from '@appServices/message.service';
import { MessagesComponent } from './messages.component';
import { mock, instance } from 'ts-mockito';

describe('MessagesComponent', () => {
  let comp: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let messageServiceMock: MessageService;

  beforeEach(() => {
    messageServiceMock = mock(MessageService);

    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MessageService,
          useFactory: () => instance(messageServiceMock)
        }
      ]
    });
    fixture = TestBed.createComponent(MessagesComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('should show messages', () => {
    const service = fixture.debugElement.injector.get(MessageService);
    service.messages = ['test message', 'test message 2'];
    fixture.detectChanges();

    const html = fixture.debugElement.nativeElement;

    expect(html).toMatchSnapshot();
  });
});
