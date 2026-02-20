import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { InterceptorService } from './shared/services/interceptor.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  
 constructor(private _auth: InterceptorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._auth.setLodder(true)

   const modifiedRq = request.clone({
    setHeaders :{
      "Auth": "Token from LS"
    }
   })

    return next.handle(modifiedRq).pipe(
      delay(500),
      finalize(()=>{
    this._auth.setLodder(false)
      })
    )
  }
}
