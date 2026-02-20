import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss']
})
export class GetConfirmComponent implements OnInit {
msg!:string
  constructor(private _matDailogRef: MatDialogRef<GetConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data : string
  ) {console.log(this.msg=data);
  }

  ngOnInit(): void {
  }
 
onClose(flag:boolean){
  this._matDailogRef.close(flag)
}

}
