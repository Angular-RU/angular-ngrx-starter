import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardComponent } from './dashboard.component';
import { EntityServices } from 'ngrx-data';

describe('DashboardComponent', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let entityServices: EntityServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: EntityServices, useValue: {} }]
    });
    entityServices = TestBed.get(EntityServices);
    entityServices.getEntityCollectionService = jest.fn().mockReturnValue({});

    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });
});
