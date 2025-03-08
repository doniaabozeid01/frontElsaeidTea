import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingServiceService } from './services/loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'elsaeed-tea';


  isLoading: boolean = true;

  constructor(
    private loadingService: LoadingServiceService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // بدء شاشة التحميل عند بداية تحميل التطبيق
    this.loadingService.showLoading();
    
    // التأكد من أن العرض الأول يتم بدون التأخير
    setTimeout(() => {
      this.isLoading = true;
      this.cdRef.detectChanges();  // تحديث العرض لإظهار شاشة التحميل
    });

    // عند تحميل الصفحة بالكامل
    setTimeout(() => {
      this.isLoading = false;  // إخفاء شاشة التحميل
      this.loadingService.hideLoading();
      this.cdRef.detectChanges();  // تحديث العرض بعد التغيير
    }, 3000);  // يمكنك تعديل الوقت هنا بناءً على وقت تحميل الصفحة الفعلي
  }



}
