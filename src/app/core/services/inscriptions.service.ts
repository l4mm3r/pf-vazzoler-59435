import { Injectable } from '@angular/core';
import { Inscription } from '../../features/dashboard/inscriptions/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InscriptionsService {
    constructor(private httpClient: HttpClient) {}

    private baseURL = environment.baseURL;

    getInscriptions(): Observable<Inscription[]> {
        return this.httpClient.get<Inscription[]>(
            `${this.baseURL}/inscriptions?_embed=student&_embed=course&_embed=class`,
        );
    }

    createInscription(
        payload: Omit<Inscription, 'id' | 'student' | 'classCourse'>,
    ): Observable<Inscription> {
        return this.httpClient.post<Inscription>(
            `${this.baseURL}/inscriptions`,
            payload,
        );
    }
}
