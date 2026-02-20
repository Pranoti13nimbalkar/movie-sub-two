import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAnimals } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
animalsForm!: FormGroup
isinEditMode: boolean=false
editId!:string
  constructor(private _animalServ:MovieService) { }

  ngOnInit(): void {
    this.createForm()
    this.patchData()
  }

  createForm(){
    this.animalsForm= new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
      isWild: new FormControl(null, [Validators.required]),
    })
  }



  patchData(){
    this._animalServ.editanimalSubObs$.subscribe(res=>{
      this.isinEditMode= true;
      this.editId= res.id;
      this.animalsForm.patchValue(res)
    })
  }

  onUpdate(){
    if(this.animalsForm.valid){
      let updatedObj= {...this.animalsForm.value, id:this.editId}
      this._animalServ.updateAnimals(updatedObj).subscribe({
        next: res=>{
          this._animalServ.setUpdateSub(updatedObj)
          this.isinEditMode= false;
          this.animalsForm.reset()
        },
        error:err=>{
          console.log(err);
        }
      })
    }
  }

  onAdd(){
    if(this.animalsForm.valid){
      let animalObj = this.animalsForm.value;
      this._animalServ.createAnimals(animalObj).subscribe({
        next: res=>{
          this._animalServ.setNewANimal({...animalObj, id:res.name})
        },
        error: err=>{
          console.log(err);
          
        }
      })
    }
  }
}
