

import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Car } from "./car";
import { CarsFetchAPISuccess, deleteCarAPISuccess, saveCarAPISuccess } from "./cars.action";


export const initialState:ReadonlyArray<Car> = [
    {
        "id": 189976,
        "name": "BMW Car"
      }
];
export const carReducer = createReducer(
    initialState,
    on(CarsFetchAPISuccess,(state,{allCars})=>{
        return allCars;
    }),
    on(saveCarAPISuccess,(state,{response})=>{
        let newState=[...state];
        newState.unshift(response);
        return newState;
    }),
    on(deleteCarAPISuccess,(state,{id})=>{
        let newState=state.filter(_=>_.id !== id);
        return newState;
    })
);