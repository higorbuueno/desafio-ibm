import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "customers",
        loadChildren: () => import("./customer/customer.module").then(m => m.CustomerModule),
    },
];
