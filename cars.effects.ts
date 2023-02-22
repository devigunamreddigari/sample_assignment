import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, switchMap,withLatestFrom } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { CarsService } from '../cars.service';
import { CarsFetchAPISuccess, deleteCarAPISuccess, invokeCarsAPI, invokeDeleteCarAPI, invokeSaveCarAPI, saveCarAPISuccess } from './cars.action';
import { selectCars } from './cars.selector';

@Injectable({
  providedIn: 'root'
})
export class CarsEffects {

  constructor(private actions$:Actions,private carsService:CarsService,
    private appStore:Store<Appstate>,private store:Store) { }
  loadAllCars$ = createEffect(()=>
  this.actions$.pipe(
      ofType(invokeCarsAPI),
      withLatestFrom(this.store.pipe(select(selectCars))),
      switchMap(([,carsFromStore])=>{
        if(carsFromStore.length>0){
          return EMPTY;
        }
          return this.carsService.get()
.pipe(map((data)=>CarsFetchAPISuccess({allCars:data})));

      })
  )
  );
saveNewCar$=createEffect(()=>
this.actions$.pipe(
  ofType(invokeSaveCarAPI),
  switchMap((action)=>{
    this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
      return this.carsService.create(action.payload)
.pipe(map((data)=>{
  this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
  return saveCarAPISuccess({response:data});
}));
})
));
deleteCar$=createEffect(()=>
this.actions$.pipe(
  ofType(invokeDeleteCarAPI),
  switchMap((action)=>{
    this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
      return this.carsService.delete(action.id)
.pipe(map((data)=>{
  this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
  return deleteCarAPISuccess({id:action.id});
}));
})
));
}