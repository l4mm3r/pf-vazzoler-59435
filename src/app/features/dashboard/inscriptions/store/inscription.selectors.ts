import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectInscriptionState =
    createFeatureSelector<fromInscription.State>(
        fromInscription.inscriptionFeatureKey,
    );
//lista de inscripciones ya cargadas
export const selectInscriptions = createSelector(
    selectInscriptionState,
    (state) => state.inscriptions,
);

export const selectCourseOptions = createSelector(
    selectInscriptionState,
    (state) => state.courseOptions,
);

export const selectStudentOptions = createSelector(
    selectInscriptionState,
    (state) => state.studentOptions,
);

export const selectClassOptions = createSelector(
    selectInscriptionState,
    (state) => state.classOptions,
);

export const selectLoadInscriptionError = createSelector(
    selectInscriptionState,
    (state) => state.loadInscriptionsError,
);
