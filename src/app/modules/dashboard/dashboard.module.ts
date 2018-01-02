import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { SummaryCardComponent } from './summary-card/summary-card.component';
import { StoreService } from './store.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DashboardComponent,
    SummaryCardComponent,
    ProductCardComponent
  ],
  providers: [StoreService],
  exports: [DashboardComponent]
})
export class DashboardModule { }
