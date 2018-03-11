import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterActionTypes {
  go = '[Router] Go',
  back = '[Router] Back',
  forward = '[Router] Forward'
}

export class Go implements Action {
  readonly type = RouterActionTypes.go;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = RouterActionTypes.back;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.forward;
}

export type Actions = Go | Back | Forward;
