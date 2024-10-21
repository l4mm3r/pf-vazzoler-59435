import { Component, Input } from '@angular/core';
import { Course } from './models';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss',
})
export class CoursesTableComponent {
  @Input()
  courses: Course[] = [];

  displayedColumns = ['id', 'name', 'professor', 'actions'];
}
