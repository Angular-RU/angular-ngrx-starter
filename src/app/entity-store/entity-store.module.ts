import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityMetadataMap, NgrxDataModule } from 'ngrx-data';
import { HeroEntity } from './hero.entity';

export const entityMetadata: EntityMetadataMap = {
  Hero: HeroEntity
};

export const pluralNames = { Hero: 'hero' };

@NgModule({
  imports: [
    CommonModule,
    NgrxDataModule.forRoot({ entityMetadata, pluralNames })
  ],
  declarations: []
})
export class EntityStoreModule {}
