import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { StoreSummary } from './store-summary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Store Reporter';
  newCustomersCount: StoreSummary;
  activeUsersCount: StoreSummary;
  salesSum; StoreSummary;

  constructor(private storeService: StoreService) {}

  getNewCustomersCount(): void {
    this.storeService.getNewCustomersCount().then(
      newCustomersCount => this.newCustomersCount = newCustomersCount
    );
  }

  getActiveUsersCount(): void {
    this.storeService.getActiveUsersCount().then( activeUsersCount =>
      this.activeUsersCount = activeUsersCount
    );
  }

  getSalesSum(): void {
    this.storeService.getSalesSum().then( salesSum =>
      this.salesSum = salesSum
    );
  }

  ngOnInit(): void {
    this.getNewCustomersCount();
    this.getActiveUsersCount();
    this.getSalesSum();
  }

}
