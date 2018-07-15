import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  {'path': 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {'path': 'login', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
