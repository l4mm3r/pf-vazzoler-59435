import { Component, OnInit } from '@angular/core';
import { Course } from '../models';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
    selector: 'app-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnInit {
    idCourse?: string;
    isLoading = false;

    course?: Course;

    constructor(
        private activatedRoute: ActivatedRoute,
        private coursesService: CoursesService,
    ) {
        this.idCourse = activatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.coursesService
            .getById(this.activatedRoute.snapshot.params['id'])
            .subscribe({
                next: (course) => {
                    this.isLoading = false;
                    this.course = course;
                },
            });
    }
}
