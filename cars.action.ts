import { createAction, props } from "@ngrx/store";
import { Car } from "./car";

export const invokeCarsAPI = createAction(
    "[Cars API] invoke cars Fetch API"
)
export const CarsFetchAPISuccess = createAction(
    "[Cars API] cars fetch api success",
    props<{allCars:Car[]}>()
)
export const invokeSaveCarAPI = createAction(
    "[Cars API] invoke save cars API",
    props<{payload:Car}>()
)
export const saveCarAPISuccess = createAction(
    "[Cars API] save car API success",
    props<{response:Car}>()
)
export const invokeDeleteCarAPI = createAction(
    "[Cars API] invoke Delete cars API",
    props<{id:number}>()
)
export const deleteCarAPISuccess = createAction(
    "[Cars API] delete car API success",
    props<{id:number}>()
)