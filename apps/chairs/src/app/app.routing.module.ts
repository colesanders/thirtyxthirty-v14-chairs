import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChairsComponent } from './chairs/chairs.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { LoginUiModule } from '@thirty/login-ui';
import { LoginComponent } from '@thirty/login-ui';

const routes: Routes = [
    { path: 'chairs', component: ChairsComponent},
    { path: 'login', component: LoginComponent},
    { path: '404', component: FourOhFourComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '**', component: FourOhFourComponent }
  ];

@NgModule({
    imports: [
      LoginUiModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}