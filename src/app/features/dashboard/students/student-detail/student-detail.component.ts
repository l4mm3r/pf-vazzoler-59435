import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../core/services/students.service';
import { Student } from '../models';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent implements OnInit {
  idStudent?: string;
  isLoading = false;

  student?: Student;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentsService,
  ) {
    this.idStudent = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.studentService
      .getById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (student) => {
          this.isLoading = false;
          this.student = student;
        },
      });
  }
}
