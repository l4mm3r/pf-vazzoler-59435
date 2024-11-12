import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { Inscription } from '../models';
import { Student } from '../../students/models';
import { Class } from '../../classes/models';
import { Course } from '../../courses/models';

export const inscriptionFeatureKey = 'inscription';

export interface State {
    isLoadingInscriptions: boolean;
    loadInscriptionsError: Error | null;
    inscriptions: Inscription[];
    courseOptions: Course[];
    studentOptions: Student[];
    classOptions: Class[];
}

export const initialState: State = {
    isLoadingInscriptions: false,
    loadInscriptionsError: null,
    inscriptions: [],
    courseOptions: [],
    studentOptions: [],
    classOptions: [],
};

export const reducer = createReducer(
    initialState,

    on(InscriptionActions.loadInscriptions, (state) => {
        return { ...state, isLoadingInscriptions: true };
    }),

    on(InscriptionActions.loadInscriptionSuccess, (state, action) => {
        return {
            ...state,
            inscriptions: action.data,
            loadInscriptionsError: null,
            isLoadingInscriptions: false,
        };
    }),
    on(InscriptionActions.loadInscriptionFailure, (state, action) => {
        return {
            ...state,
            ...initialState,
            loadInscriptionsError: action.error,
        };
    }),

    on(InscriptionActions.loadOptions, (state) => {
        return {
            ...state,
            isLoadingInscriptions: true,
        };
    }),
    on(InscriptionActions.loadOptionsSuccess, (state, action) => {
        return {
            ...state,
            classOptions: action.classes,
            courseOptions: action.courses,
            studentOptions: action.students,
            loadInscriptionsError: null,
            isLoadingInscriptions: false,
        };
    }),
    on(InscriptionActions.loadOptionsFailure, (state, action) => {
        return {
            ...state,
            isLoadingInscriptions: false,
            loadInscriptionsError: action.error,
        };
    }),
);

export const inscriptionFeature = createFeature({
    name: inscriptionFeatureKey,
    reducer,
});
