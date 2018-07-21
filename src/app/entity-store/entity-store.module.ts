import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityMetadataMap, NgrxDataModule } from 'ngrx-data';

export const entityMetadata: EntityMetadataMap = {
  Hero: {
    entityName: 'Hero'
  }
};

export const pluralNames = { Hero: 'Heroes' };

@NgModule({
  imports: [
    CommonModule,
    NgrxDataModule.forRoot({ entityMetadata, pluralNames })
  ],
  declarations: []
})
export class EntityStoreModule {}
