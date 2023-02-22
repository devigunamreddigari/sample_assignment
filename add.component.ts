import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Car } from '../store/car';
import { invokeSaveCarAPI } from '../store/cars.action';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
carForm:Car={
  id:0,
  name:''
}
constructor(private store:Store,private appStore:Store<Appstate>,private router:Router){

}
save(){
this.store.dispatch(invokeSaveCarAPI({payload:{...this.carForm}}));
let appStatus$ = this.appStore.pipe(select(selectAppState));
appStatus$.subscribe((data)=>{
  if(data.apiStatus === 'success'){
    this.appStore.dispatch(
      setAPIStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}}));
this.router.navigate(['/']);
  }
})
}
}
