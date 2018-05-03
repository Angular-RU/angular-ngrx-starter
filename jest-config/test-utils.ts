import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { Actions } from '@ngrx/effects';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}
