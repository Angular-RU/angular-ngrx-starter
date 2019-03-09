import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeroSearchComponent } from './hero-search.component';
import * as fromStore from '@appStore/index';
import { mock, instance, verify, anything, spy, capture } from 'ts-mockito';

describe('HeroSearchComponent', () => {
  let comp: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let storeMock: Store<fromStore.State>;

  beforeEach(() => {
    storeMock = mock(Store);

    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Store, useFactory: () => instance(storeMock) }]
    });
    fixture = TestBed.createComponent(HeroSearchComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      comp.ngOnInit();

      verify(storeMock.pipe(anything())).twice();
    });
  });

  describe('ngOnDestroy', () => {
    it('makes expected calls', () => {
      const resetSpy = spy(fixture.debugElement.injector.get(Store));

      comp.ngOnDestroy();

      verify(storeMock.dispatch(anything())).once();
      expect(capture(resetSpy.dispatch).last()).toMatchSnapshot();
    });
  });

  describe('search', () => {
    it('makes expected calls', () => {
      const resetSpy = spy(fixture.debugElement.injector.get(Store));

      comp.search('test search');

      verify(storeMock.dispatch(anything())).once();
      expect(capture(resetSpy.dispatch).last()).toMatchSnapshot();
    });
  });
});
