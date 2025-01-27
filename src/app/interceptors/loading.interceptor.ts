// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { finalize } from 'rxjs/operators';
// import { LoadingServiceService } from '../services/loading-service.service'; // المسار هنا

// @Injectable()
// export class LoadingInterceptor implements HttpInterceptor {

//   constructor(private loadingService: LoadingServiceService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     this.loadingService.show();
//     return next.handle(request).pipe(
//       finalize(() => {
//         this.loadingService.hide();
//       })
//     );
//   }
// }




import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingServiceService } from '../services/loading-service.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // إذا كان الـ URL يحتوي على "GetOrderItemsByOrderRequestId"، لا نعرض الـ loading
    if (request.url.includes('Payment/GetOrderItemsByOrderRequestId')) { 
      return next.handle(request);  // لا نعرض الـ loading
    }

    // إظهار الـ spinner لجميع الـ APIs الأخرى
    this.loadingService.show();

    return next.handle(request).pipe(
      finalize(() => {
        // إخفاء الـ spinner بعد انتهاء أي طلب
        this.loadingService.hide();
      })
    );
  }
}
