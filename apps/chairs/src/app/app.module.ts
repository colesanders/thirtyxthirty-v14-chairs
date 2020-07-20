import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreStateModule } from '@thirty/core-state';
import { CoreDataModule } from '@thirty/core-data';
import { MaterialModule } from '@thirty/material';
import * as fromChairs from '@thirty/core-state';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { ChairsComponent } from './chairs/chairs.component';
import { ChairsOverviewComponent } from './chairs/components/chairs-overview/chairs-overview.component';
import { ChairsDetailComponent } from './chairs/components/chairs-detail/chairs-detail.component';
import { ChairsListComponent } from './chairs/components/chairs-list/chairs-list.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';



@NgModule({
  declarations: [
    AppComponent,
    ChairsComponent,
    ChairsOverviewComponent,
    ChairsDetailComponent,
    ChairsListComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    CoreStateModule,
    CoreDataModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromChairs.chairsReducer, {}),
    EffectsModule.forRoot([fromChairs.ChairsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


