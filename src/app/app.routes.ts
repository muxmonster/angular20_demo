import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'load-image',
        loadComponent: () =>
            import('./demo-examples/load-image-example/load-image-example').then(
                (m) => m.LoadImageExample
            ),
    }
];
