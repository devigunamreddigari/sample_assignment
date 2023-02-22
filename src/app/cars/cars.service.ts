import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Car } from './store/car';
@Injectable({
  providedIn: 'root'
})
export class CarsService {
  //  baseUrl = 'http://localhost:3002/cars'
  constructor(private http:HttpClient) { }
  get(){
    return this.http.get<Car[]>("http://localhost:3000/cars");
    // return this.http.get<Car[]>(this.baseUrl+'/cars')
    // return this.http.get<Car[]>(this.baseUrl) 
  }
  create(payload:Car){
    return this.http.post<Car>("http://localhost:3000/cars", payload); 
  }
  delete(id:number){
    return this.http.delete('http://localhost:3000/cars/${id}')
  }
}
