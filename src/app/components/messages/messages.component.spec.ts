import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MessageService } from '@appServices/message.service';
import { MessagesComponent } from './messages.component';
import { EntityServices } from 'ngrx-data';
import { of, BehaviorSubject } from 'rxjs';

describe('MessagesComponent', () => {
  let comp: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let entityServices: EntityServices;
  let reducedActions$: BehaviorSubject<any>;

  beforeEach(() => {
    reducedActions$ = new BehaviorSubject(null);

    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MessageService, useValue: { add: jest.fn() } },
        {
          provide: EntityServices,
          useValue: { reducedActions$: reducedActions$ }
        }
      ]
    });

    entityServices = TestBed.get(EntityServices);

    fixture = TestBed.createComponent(MessagesComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('message service add makes expected calls', () => {
    comp.ngOnInit();
    reducedActions$.next({ type: 'test' });

    expect(comp.messageService.add).toHaveBeenCalledTimes(1);
    expect(comp.messageService.add).toHaveBeenCalledWith('test');
  });
});
