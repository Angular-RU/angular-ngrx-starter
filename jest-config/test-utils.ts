import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';

export class TestActions extends Actions {
  constructor() {
    super();
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}
