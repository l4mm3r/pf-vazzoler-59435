import { Component } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from './models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
})
export class CoursesComponent {
    courses: Course[] = [];

    isLoading = false;

    constructor(private coursesService: CoursesService) {}
}
