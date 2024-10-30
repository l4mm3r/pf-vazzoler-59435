import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CoursesService } from '../../../../core/services/courses.service';


@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss',
})
export class CoursesTableComponent implements OnInit{
  @Input()
  courses: Course[] = [];
  displayedColumns = ['id', 'name', 'professor', 'actions'];

  constructor(
    private matDialog: MatDialog,
    private coursesService: CoursesService,
  ) {}

  isLoading = false;

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
  openModal(editingCourse?: Course): void {
    this.matDialog
      .open(CourseDialogComponent, { data: { editingCourse } })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingCourse) {
              this.handleUpdate(editingCourse.id, result);
            } else {
              this.coursesService.createCourse(result).subscribe({
                next: () => this.loadCourses(),
              })
            }
          }
        },
      });
  }
  handleUpdate(id: string, update: Course): void {
    this.isLoading = true;
    this.coursesService.updateCourseById(id, update).subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onDelete(id: string): void {
    this.isLoading = true;
    this.coursesService.removeCourseById(id).subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  confirmDelete(id: string): void {
    const confirmed = window.confirm('¿Esta seguro de eliminar este registro?');

    if(confirmed) {
      this.onDelete(id);
    }
  }
}
