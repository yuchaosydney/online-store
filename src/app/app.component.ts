import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';

import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './services/auth/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Phonecase Store';

  ngOnInit(): void {

  }

}

export const routes: Routes = [
  {'path': 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {'path': 'login', component: AuthComponent}
];
