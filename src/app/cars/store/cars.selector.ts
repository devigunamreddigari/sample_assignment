// export interface CarsSelector {

import { createFeatureSelector } from "@ngrx/store";
import { Car } from "./car";

// }
export const selectCars = createFeatureSelector<Car[]>("myCars")