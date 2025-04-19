// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./demo/pages/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent)
  },
  {
    path: '',
    component: AdminComponent,
    children: [
  
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent),
        canActivate: [AuthGuard] 
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/others/sample-page/sample-page.component').then((c) => c.SamplePageComponent),
        canActivate: [AuthGuard] 
      },
      {
        path: 'allPartners',
        loadComponent: () => import('./components/all-partners/all-partners.component').then((c) => c.AllPartnersComponent),
        canActivate: [AuthGuard] 
      }
    ]
  }
  // {
  //   path: '',
  //   component: GuestLayoutComponent,
  //   children: [
  //     {
  //       path: 'login',
  //       loadComponent: () => import('./demo/pages/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent)
  //     },
  //     {
  //       path: 'register',
  //       loadComponent: () =>
  //         import('./demo/pages/authentication/auth-register/auth-register.component').then((c) => c.AuthRegisterComponent)
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
