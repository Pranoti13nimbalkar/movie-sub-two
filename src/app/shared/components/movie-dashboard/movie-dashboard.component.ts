import { Component, OnInit } from '@angular/core';
import { IAnimals } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit {
animalsArr:IAnimals[]=[]
  constructor(private _movieServ: MovieService) { }

  ngOnInit(): void {
    this.getAnimalObj()
    this.createAnimalObj()
    this.updated_OBj()
    this.removeObj()
  }

getAnimalObj(){
  this._movieServ.fetchAllMovie().subscribe(res=>{
    this.animalsArr = res
    console.log(res);
    
  })
}

createAnimalObj(){
  this._movieServ.newanimalSubObs$.subscribe(data=>{
    this.animalsArr.unshift(data)
  })
}

updated_OBj(){
  this._movieServ.updateanimalSubObs$.subscribe(updatedObj=>{
    let getIndex = this.animalsArr.findIndex(animal=>animal.id===updatedObj.id)
    this.animalsArr[getIndex]=updatedObj
  })
}

removeObj(){
  this._movieServ.removeanimalSubObs$.subscribe(removeId=>{
    let getIndex = this.animalsArr.findIndex(an=>an.id = removeId)
    this.animalsArr.splice(getIndex,1)
  })
}

TrackById(index:number, animals:IAnimals){
  return animals.id
}
}
