import { Component, inject, OnInit } from '@angular/core';
import { InterceptorService } from './shared/services/interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'movie-sub-two';
  isLodder:boolean=false

  private _auth = inject(InterceptorService)

ngOnInit(): void {
  this._auth.authSubObs$.subscribe(status=>{
    this.isLodder =status
  })
}
}
