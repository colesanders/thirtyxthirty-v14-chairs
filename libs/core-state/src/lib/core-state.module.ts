import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromChairs from './chairs/chairs.reducer';
import { ChairsEffects } from './chairs/chairs.effects';
import { ChairsFacade } from './chairs/chairs.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromChairs.LESSONS_FEATURE_KEY,
      fromChairs.chairsReducer
    ),
    EffectsModule.forFeature([ChairsEffects]),
  ],
  providers: [ChairsFacade],
})
export class CoreStateModule {}
