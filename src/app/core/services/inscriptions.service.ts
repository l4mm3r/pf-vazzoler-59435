import { Injectable } from '@angular/core';
import { Inscription } from '../../features/dashboard/inscriptions/models';
import { concatMap, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InscriptionsService {
    constructor(private httpClient: HttpClient) {}

    private baseURL = environment.baseURL;

    getById(id: string): Observable<Inscription | undefined> {
        return this.httpClient.get<Inscription>(
            `${this.baseURL}/inscriptions/${id}?_embed=student&_embed=course&_embed=class`,
        );
    }
    getInscriptions(): Observable<Inscription[]> {
        return this.httpClient.get<Inscription[]>(
            `${this.baseURL}/inscriptions?_embed=student&_embed=course&_embed=class`,
        );
    }

    removeUserById(id: string): Observable<Inscription[]> {
        return this.httpClient
            .delete<Inscription[]>(`${this.baseURL}/inscriptions/${id}`)
            .pipe(concatMap(() => this.getInscriptions()));
    }

    createInscription(
        payload: Omit<Inscription, 'id' | 'student' | 'classCourse'>,
    ): Observable<Inscription> {
        return this.httpClient.post<Inscription>(
            `${this.baseURL}/inscriptions`,
            payload,
        );
    }
    updateInscriptionById(id: string, update: Partial<Inscription>) {
        return this.httpClient
            .patch<Inscription>(`${this.baseURL}/inscriptions/${id}`, update)
            .pipe(concatMap(() => this.getInscriptions()));
    }
}
