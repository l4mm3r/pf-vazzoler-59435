import { Component, OnInit } from '@angular/core';
import { Class } from '../models';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from '../../../../core/services/classes.service';

@Component({
    selector: 'app-class-detail',
    templateUrl: './class-detail.component.html',
    styleUrl: './class-detail.component.scss',
})
export class ClassDetailComponent implements OnInit {
    idClass?: string;
    isLoading = false;

    class?: Class;

    constructor(
        private activatedRoute: ActivatedRoute,
        private classesService: ClassesService,
    ) {
        this.idClass = activatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.classesService
            .getById(this.activatedRoute.snapshot.params['id'])
            .subscribe({
                next: (class_) => {
                    this.isLoading = false;
                    this.class = class_;
                },
            });
    }
}
