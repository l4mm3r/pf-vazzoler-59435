import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionActions } from './store/inscription.actions';
import { Inscription } from './models';
import { Observable } from 'rxjs';
import {
    selectClassOptions,
    selectCourseOptions,
    selectInscriptions,
    selectLoadInscriptionError,
    selectStudentOptions,
} from './store/inscription.selectors';
import { Course } from '../courses/models';
import { Student } from '../students/models';
import { Class } from '../classes/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-inscriptions',
    templateUrl: './inscriptions.component.html',
    styleUrl: './inscriptions.component.scss',
})
export class InscriptionsComponent implements OnInit {
    inscriptions$: Observable<Inscription[]>;
    courseOptions$: Observable<Course[]>;
    studentOptions$: Observable<Student[]>;
    classOptions$: Observable<Class[]>;
    loadInscriptionsError$: Observable<Error | null>;
    inscriptionForm: FormGroup;

    constructor(
        private store: Store,
        private formBuilder: FormBuilder,
    ) {
        this.inscriptionForm = this.formBuilder.group({
            courseId: [null, [Validators.required]],
            classId: [null, [Validators.required]],
            studentId: [null, [Validators.required]],
        });
        this.loadInscriptionsError$ = this.store.select(
            selectLoadInscriptionError,
        );
        this.inscriptions$ = this.store.select(selectInscriptions);
        this.courseOptions$ = this.store.select(selectCourseOptions);
        this.classOptions$ = this.store.select(selectClassOptions);
        this.studentOptions$ = this.store.select(selectStudentOptions);
    }

    ngOnInit(): void {
        this.store.dispatch(InscriptionActions.loadInscriptions());
        this.store.dispatch(InscriptionActions.loadOptions());
    }

    onSubmit(): void {
        if (this.inscriptionForm.invalid) {
            this.inscriptionForm.markAllAsTouched();
        } else {
            this.store.dispatch(
                InscriptionActions.createInscription(
                    this.inscriptionForm.value,
                ),
            );
            this.inscriptionForm.reset();
        }
    }
}
