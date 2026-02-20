import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const matArr = [MatButtonModule,MatCardModule,MatDialogModule,MatDividerModule,MatIconModule,MatProgressSpinnerModule,MatSnackBarModule]

@NgModule({
  declarations: [],
  imports: [...matArr],
  exports:[...matArr]
})


export class MaterialModule { }
