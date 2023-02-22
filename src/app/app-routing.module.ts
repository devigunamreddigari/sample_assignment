import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
``
const routes: Routes = [{
  path:'',
  loadChildren: () => import('./cars/cars.module').then(b => b.CarsModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
