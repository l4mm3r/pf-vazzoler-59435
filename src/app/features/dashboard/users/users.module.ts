import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../../shared/shared.module';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';

@NgModule({
  declarations: [UsersComponent, UserDialogComponent, StudentDetailComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
  exports: [UsersComponent],
})
export class UsersModule {}
