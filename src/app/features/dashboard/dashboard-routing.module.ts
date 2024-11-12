import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'students',
        loadChildren: () =>
            import('./students/students.module').then((m) => m.StudentsModule),
        canActivate: [RoleGuard],
    },
    {
        path: 'courses',
        loadChildren: () =>
            import('./courses/courses.module').then((m) => m.CoursesModule),
    },
    {
        path: 'classes',
        loadChildren: () =>
            import('./classes/classes.module').then((m) => m.ClassesModule),
    },
    {
        path: 'inscriptions',
        loadChildren: () =>
            import('./inscriptions/inscriptions.module').then(
                (m) => m.InscriptionsModule,
            ),
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
