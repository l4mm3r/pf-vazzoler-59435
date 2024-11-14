import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionDetailComponent } from './inscription-detail/inscription-detail.component';

const routes: Routes = [
    {
        path: '',
        component: InscriptionsComponent,
    },
    {
        path: 'detail/:id',
        component: InscriptionDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InscriptionsRoutingModule {}
