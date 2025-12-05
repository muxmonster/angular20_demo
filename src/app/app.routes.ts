import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'load-image',
        loadComponent: () =>
            import('./demo-examples/load-image-example/load-image-example').then(
                (m) => m.LoadImageExample
            ),
    },
    {
        path: 'show-modal',
        loadComponent: () =>
            import('./demo-examples/show-modal/show-modal').then(
                (m) => m.ShowModal
            ),
    },
    {
        path: 'excel',
        loadComponent: () =>
            import('./demo-examples/open-excel/open-excel').then(
                (m) => m.OpenExcel
            ),
    },
    {
        path: 'rpt-pdf01',
        loadComponent: () =>
            import('./demo-examples/report-pdf01/report-pdf01').then(
                (m) => m.ReportPdf01
            ),
    }
];
