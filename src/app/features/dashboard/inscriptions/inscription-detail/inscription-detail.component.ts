import { Component, OnInit } from '@angular/core';
import { Inscription } from '../models';
import { ActivatedRoute } from '@angular/router';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';

@Component({
    selector: 'app-inscription-detail',
    templateUrl: './inscription-detail.component.html',
    styleUrl: './inscription-detail.component.scss',
})
export class InscriptionDetailComponent implements OnInit {
    idInscription?: string;
    isLoading = false;

    inscription?: Inscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private inscriptionsService: InscriptionsService,
    ) {
        this.idInscription = activatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.inscriptionsService
            .getById(this.activatedRoute.snapshot.params['id'])
            .subscribe({
                next: (inscription) => {
                    this.isLoading = false;
                    this.inscription = inscription;
                },
            });
    }
}
