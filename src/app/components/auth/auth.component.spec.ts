import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';

import { AuthComponent } from './auth.component';
import { AuthService } from '../../services/auth/auth.service';
import { HttpCallsService } from '../../services/http-calls/http-calls.service';

import { routes } from '../../app-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AuthComponent,
        DashboardComponent
      ],
      providers: [
        AuthService,
        HttpCallsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
