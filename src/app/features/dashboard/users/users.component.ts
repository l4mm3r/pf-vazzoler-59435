import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { Student } from './models';
import { UsersService } from '../../../core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  isLoading = false;

  confirmDelete(id: string): void {
    const confirmed = window.confirm('Esta seguro de Eliminar este registro?');

    if (confirmed) {
      this.onDelete(id);
    }
  }

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
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  //transforma la url de absoluta a relativa
  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], {
      relativeTo: this.activatedRoute,
    });
  }

  openModal(editingUser?: Student): void {
    this.matDialog
      .open(UserDialogComponent, { data: { editingUser } })
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
