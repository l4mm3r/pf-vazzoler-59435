import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription } from '../models';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';
import { Class } from '../../classes/models';

export const InscriptionActions = createActionGroup({
    source: 'Inscription',
    events: {
        'Load Inscription Success': props<{ data: Inscription[] }>(),
        'Load Inscription Failure': props<{ error: Error }>(),
        'Load Inscriptions': emptyProps(),
        // 'Load Course Options': emptyProps(),
        // 'Load Student Options': emptyProps(),
        // 'Load Class Options': emptyProps(),

        'Load Options': emptyProps(),
        'Load Options Success': props<{
            students: Student[];
            courses: Course[];
            classes: Class[];
        }>(),
        'Load Options Failure': props<{ error: Error }>(),

        'Create Inscription': props<{
            courseId: string;
            classId: string;
            studentId: string;
        }>(),
        'Create Inscription Success': props<{ data: Inscription }>(),
        'Create Inscription Failure': props<{ error: Error }>(),
    },
});
