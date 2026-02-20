import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }
  
  private AuthSub$: BehaviorSubject<boolean>= new BehaviorSubject(false)
  authSubObs$: Observable<boolean> = this.AuthSub$.asObservable()

  setLodder(status:boolean){
    this.AuthSub$.next(status)
  }
}
