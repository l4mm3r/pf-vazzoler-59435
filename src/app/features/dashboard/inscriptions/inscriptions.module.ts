import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import { inscriptionFeature } from './store/inscription.reducer';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../../shared/shared.module';
import { InscriptionDetailComponent } from './inscription-detail/inscription-detail.component';

@NgModule({
    declarations: [InscriptionsComponent, InscriptionDetailComponent],
    imports: [
        SharedModule,
        CommonModule,
        StoreModule.forFeature(inscriptionFeature),
        InscriptionsRoutingModule,
        EffectsModule.forFeature([InscriptionEffects]),
    ],
})
export class InscriptionsModule {}
