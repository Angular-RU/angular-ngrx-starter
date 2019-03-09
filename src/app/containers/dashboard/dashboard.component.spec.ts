import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardComponent } from './dashboard.component';
import * as fromReducer from '@appStore/reducers';
import { mock, verify, instance, anything } from 'ts-mockito';

describe('DashboardComponent', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let storeMock: Store<fromReducer.hero.State>;

  beforeEach(() => {
    storeMock = mock(Store);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Store, useFactory: () => instance(storeMock) }]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      comp.ngOnInit();
      verify(storeMock.pipe(anything())).once();
    });
  });
});
