import { Component } from '@angular/core';
import { LoadingServiceService } from './services/loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'elsaeed-tea';

  isLoading = false;

  constructor(private loadingService: LoadingServiceService) {}

  ngOnInit() {
    // الاشتراك في خدمة الـ loading لتحديث isLoading بناءً على الحالة
    this.loadingService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
