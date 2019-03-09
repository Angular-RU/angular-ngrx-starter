import { HeroDetailComponent } from './hero-detail.component';
import * as fromReducer from '@appStore/reducers';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  instance,
  mock,
  verify,
  anything,
  when,
  spy,
  capture
} from 'ts-mockito';
import { of } from 'rxjs';

describe('HeroDetailComponent', () => {
  let comp: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let storeMock: Store<fromReducer.hero.State>;

  beforeEach(() => {
    storeMock = mock(Store);

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Store, useFactory: () => instance(storeMock) }]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
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

  describe('goBack', () => {
    it('makes expected calls', () => {
      const goBackSpy = spy(fixture.debugElement.injector.get(Store));

      comp.goBack();

      verify(storeMock.dispatch(anything())).once();
      expect(capture(goBackSpy.dispatch).last()).toMatchSnapshot();
    });
  });

  describe('save', () => {
    it('makes expected calls', () => {
      const saveSpy = spy(fixture.debugElement.injector.get(Store));

      comp.save({ id: 1, name: 'test name' }, 'new test name');

      verify(storeMock.dispatch(anything())).once();
      expect(capture(saveSpy.dispatch).last()).toMatchSnapshot();
    });
  });

  describe('html', () => {
    it('show hero', () => {
      when(storeMock.pipe(anything())).thenReturn(
        of({ id: 1, name: 'test hero' })
      );

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement).toMatchSnapshot();
    });
  });
});
