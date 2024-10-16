import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { Student } from './models';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource: Student[] = [];

  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService,
  ) {}

  isLoading = false;

  onDelete(id: string) {
    this.isLoading = true;
    this.usersService.removeUserById(id).subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.usersService.getUseres().subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openModal(editingUser?: Student): void {
    this.matDialog
      .open(UserDialogComponent, {
        data: { editingUser },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingUser) {
              this.handleUpdate(editingUser.id, result);
            } else {
              this.dataSource = [...this.dataSource, result];
            }
          }
        },
      });
  }

  handleUpdate(id: string, update: Student): void {
    this.isLoading = true;
    this.usersService.updateUserById(id, update).subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
