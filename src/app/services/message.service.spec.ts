import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;

  beforeEach(() => {
    messageService = new MessageService();
  });

  it('should add message', () => {
    messageService.add('test message');

    expect(messageService.messages).toMatchSnapshot();
  });

  it('should clear messages', () => {
    messageService.add('test message');
    messageService.clear();
    
    expect(messageService.messages).toMatchSnapshot();
  });
});
