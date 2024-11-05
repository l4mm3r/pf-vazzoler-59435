import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureName } from '../reducers/auth.reducer';

export const selectAuthState =
    createFeatureSelector<AuthState>(authFeatureName);

export const selectAuthenticatedStudent = createSelector(
    selectAuthState,
    (state: AuthState) => state.authenticatedStudent,
);
