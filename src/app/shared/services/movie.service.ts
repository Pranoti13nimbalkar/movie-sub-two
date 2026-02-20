import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAnimals, IAnimalsRes } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
BASE_URL: string= environment.BASE_URL;
MOVIE_URL:string=`${this.BASE_URL}/movie-two.json`;


  constructor(private _http:HttpClient) { }
private newanimalSub$: Subject<IAnimals>=  new Subject<IAnimals>();
private editanimalSub$: Subject<IAnimals>=  new Subject<IAnimals>();
private UpdateanimalSub$: Subject<IAnimals>=  new Subject<IAnimals>();
private removeanimalSub$: Subject<string>=  new Subject<string>();


 newanimalSubObs$: Observable<IAnimals>=  this.newanimalSub$.asObservable()
 editanimalSubObs$: Observable<IAnimals>=  this.editanimalSub$.asObservable()
 updateanimalSubObs$: Observable<IAnimals>=  this.UpdateanimalSub$.asObservable()
 removeanimalSubObs$: Observable<string>=  this.removeanimalSub$.asObservable()

 setNewANimal(obj:IAnimals){
  this.newanimalSub$.next(obj)
 }

 setEdit(animal:IAnimals){
  this.editanimalSub$.next(animal)
 }

 setUpdateSub(animal:IAnimals){
this.UpdateanimalSub$.next(animal)
 }


 setRemoveSub(id:string){
  this.removeanimalSub$.next(id)
 }
  fetchAllMovie():Observable<any[]>{
   return  this._http.get<any>(this.MOVIE_URL).pipe(
    map(img=>{
      let animalsArr: IAnimals[]=[]
      for (const key in img) {
         animalsArr.unshift({...img[key], id:key})
      }
      console.log(animalsArr);
      return animalsArr
    })
   )
  }

  createAnimals(obj:IAnimals):Observable<IAnimalsRes>{
  return  this._http.post<any>(`${this.BASE_URL}/movie-two.json`,obj)
  }

  updateAnimals(animal:IAnimals):Observable<IAnimals>{
    return this._http.patch<IAnimals>(`${this.BASE_URL}/movie-two/${animal.id}.json`,animal)
  }
  removeAnimal(id:string):Observable<any>{
    return this._http.delete<any>(`${this.BASE_URL}/movie-two/${id}.json`)
  }
}
