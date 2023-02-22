import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { carReducer } from './store/cars.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CarsEffects } from './store/cars.effects';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
1
@NgModule({
  declarations: [
    HomeComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    FormsModule,
    StoreModule.forFeature("myCars",carReducer),
    EffectsModule.forFeature([CarsEffects])
  ]
})
export class CarsModule { }
