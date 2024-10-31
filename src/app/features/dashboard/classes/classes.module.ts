import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { SharedModule } from '../../../shared/shared.module';
import { ClassDialogComponent } from './class-dialog/class-dialog.component';

@NgModule({
    declarations: [ClassesComponent, ClassDialogComponent],
    imports: [SharedModule, CommonModule, ClassesRoutingModule],
})
export class ClassesModule {}
