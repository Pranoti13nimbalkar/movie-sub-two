import { Component, Input, OnInit } from '@angular/core';
import { IAnimals } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
@Input()animalObj!:IAnimals
  constructor(private _animalServ:MovieService,
    private _dailog: MatDialog
  ) { }

  ngOnInit(): void {
    
  }


  onEdit(){
   this._animalServ.setEdit(this.animalObj)
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  }
  

  removeAnimal(){
   let matConfig= new MatDialogConfig()
   matConfig.data=`Are you sure, you want to remove animal with id ${this.animalObj.id}`,
   matConfig.width= '400px',
   matConfig.disableClose= true
   this._dailog.open(GetConfirmComponent).afterClosed().pipe(
    filter(res=> res===true),
    switchMap(()=>{  
      return this._animalServ.removeAnimal(this.animalObj.id)
    
    })
   ).subscribe({
    next:res=>{
    this._animalServ.setRemoveSub(this.animalObj.id)

    },
    error: err=>{
      console.log(err);
      
    }
   })
  }
}