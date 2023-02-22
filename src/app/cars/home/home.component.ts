import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { CarsService } from '../cars.service';
import { Car } from '../store/car';
import { invokeCarsAPI, invokeDeleteCarAPI } from '../store/cars.action';
import { selectCars } from '../store/cars.selector';
declare var window:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
//  cars$:Observable<Car[]>; 
constructor(private store:Store,private carsService:CarsService,
  private appStore:Store<Appstate>,){ }
   cars$ = this.store.pipe(select(selectCars))
   deleteModal:any;
   idToDelete:number=0;
  ngOnInit():void{
   this.deleteModal = new window.bootstrap.Modal(
    document.getElementById("deleteModal")
   );
    this.store.dispatch(invokeCarsAPI());
  }
 openDeleteModal(id:number){
this.idToDelete = id;
this.deleteModal.show();
 }  
 confirmDelete(){
  this.store.dispatch(invokeDeleteCarAPI({id:this.idToDelete}));
  let appStatus$ = this.appStore.pipe(select(selectAppState));
appStatus$.subscribe((data)=>{
  if(data.apiStatus === 'success'){
    this.appStore.dispatch(
      setAPIStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}}));
this.deleteModal.hide();
  }
})
 }
}

 // this.carsService.get().subscribe(res=>{
    //   console.log('res',res)
    // })