import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EntityMetadataMap,
  NgrxDataModule,
  DefaultDataServiceConfig
} from 'ngrx-data';
import { HeroEntity } from './hero.entity';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'api'
};

export const entityMetadata: EntityMetadataMap = {
  Hero: HeroEntity
};

export const pluralNames = { Hero: 'hero' };

@NgModule({
  imports: [
    CommonModule,
    NgrxDataModule.forRoot({ entityMetadata, pluralNames })
  ],
  declarations: [],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ]
})
export class EntityStoreModule {}
