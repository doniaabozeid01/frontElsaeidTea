// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CallApisService } from 'src/app/services/call-apis.service';

// @Component({
//   selector: 'app-all-orders',
//   templateUrl: './all-orders.component.html',
//   styleUrls: ['./all-orders.component.scss']
// })

// export class AllOrdersComponent implements OnInit {
//   selectedOrder: any = null; // الطلب المحدد للتفاصيل
//   userId!: string;
//   status: string = '';
//   token: any;
//   orders: any;
//   isUserLoggedIn: boolean = false; // متغير للتحقق من حالة تسجيل الدخول
//   fullName: any;
//   constructor(private router: Router, private callApi: CallApisService) { }


//   // دالة لاسترجاع حالة الطلب 
//   getOrderStatusClass(status: number): string {
//     switch (status) {
//       case 0:
//         return 'processing';
//       case 1:
//         return 'confirmed';
//       case 2:
//         return 'shipped';
//       case 3:
//         return 'Delivered';
//       case 4:
//         return 'Cancelled';
//       default:
//         return '';
//     }
//   }

//   getOrderStatus(status: number): string {
//     switch (status) {
//       case 0:
//         return 'تحت المعالجه';
//       case 1:
//         return 'مؤكد';
//       case 2:
//         return 'تم الشحن';
//       case 3:
//         return 'تم التسليم';
//       case 4:
//         return 'تم الالغاء';
//       default:
//         return '';
//     }
//   }

//   // دالة لعرض التفاصيل
//   viewDetails(order: any): void {
//     console.log(order);
//     this.callApi.getOrderDetails(order.id).subscribe({
//       next: (response) => {
//         console.log(response);
//         order.items = response || []; // إذا كانت response تحتوي على items
//       }
//     });

//     this.selectedOrder = order; // تعيين الطلب المحدد
//     console.log(this.selectedOrder); // تحقق من أن البيانات تصل بشكل صحيح
//   }

//   getProductName(id: number): string {
//     this.callApi.GetProductById(id).subscribe({
//       next: (response) => {
//         return response.name;
//       }
//     });
//     return 'شاي الصعيد';
//   }

//   // دالة لإغلاق التفاصيل
//   closeDetails(): void {
//     this.selectedOrder = null; // إلغاء تعيين الطلب المحدد
//   }

//   // دالة للانتقال إلى الصفحة الرئيسية
//   goToHome(): void {
//     this.router.navigate(['/']);
//   }

//   // دالة للانتقال إلى صفحة تسجيل الدخول
//   goToLogin(): void {
//     this.router.navigate(['/login']); // أو المسار الصحيح لصفحة تسجيل الدخول
//   }

//   ngOnInit(): void {
//     // this.token = localStorage.getItem('token');
//     this.token = sessionStorage.getItem('token');
//     console.log(this.token);



//     this.callApi.getFullNameFromToken().subscribe({
//       next:(response)=>{
//         console.log(response);
//         this.fullName = response.fullName;
        
//       },
//       error:(err)=>{
//         console.log(err);
        
//       }
//     })





    
//     this.callApi.getUserIdFromToken().subscribe({
//       next: (response) => {
//         console.log("response : ", response);
//         this.userId = response.userId; // تعيين الـ userId في المتغير
//         this.isUserLoggedIn = true; // إذا تم استرجاع userId، يعتبر المستخدم مسجل دخول

//         this.callApi.getAllOrdersByUserId(this.userId).subscribe({
//           next: (response) => {
//             this.orders = response.sort((a: any, b: any) => {
//               // التأكد من أن التاريخ يتم تحويله إلى Date للتعامل معه بشكل صحيح
//               const dateA = new Date(a.createdAt); // تأكد من أن التاريخ في الحقل هو "createdAt"
//               const dateB = new Date(b.createdAt);
//               return dateB.getTime() - dateA.getTime(); // ترتيب تنازلي
//             });

//             console.log(this.orders); // طباعة النتائج بعد الترتيب
//           },
//           error: (err) => {
//             console.error('Error occurred:', err); // عرض الخطأ كاملاً في الكونسول

//             // التحقق إذا كان الخطأ يحتوي على تفاصيل التحقق
//             if (err.error && err.error.errors) {
//               for (const field in err.error.errors) {
//                 console.error(`${field}: ${err.error.errors[field].join(', ')}`);
//               }
//             } else if (err.error && err.error.title) {
//               console.error('Error title:', err.error.title);
//             } else {
//               console.error('Unexpected error:', err);
//             }
//           }
//         });
//       },
//       error: (error) => {
//         console.error('Error fetching userId:', error);
//       }
//     });




    
//   }
// }













































import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CallApisService } from 'src/app/services/call-apis.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})

export class AllOrdersComponent implements OnInit, AfterViewInit {
  selectedOrder: any = null; // الطلب المحدد للتفاصيل
  userId!: string;
  status: string = '';
  token: any;
  orders: any;
  isUserLoggedIn: boolean = false; // متغير للتحقق من حالة تسجيل الدخول
  fullName: any;

  constructor(private router: Router, private callApi: CallApisService, private cdRef: ChangeDetectorRef) { }

  // دالة لاسترجاع حالة الطلب 
  getOrderStatusClass(status: number): string {
    switch (status) {
      case 0:
        return 'processing';
      case 1:
        return 'confirmed';
      case 2:
        return 'shipped';
      case 3:
        return 'Delivered';
      case 4:
        return 'Cancelled';
      default:
        return '';
    }
  }

  getOrderStatus(status: number): string {
    switch (status) {
      case 0:
        return 'تحت المعالجه';
      case 1:
        return 'مؤكد';
      case 2:
        return 'تم الشحن';
      case 3:
        return 'تم التسليم';
      case 4:
        return 'تم الالغاء';
      default:
        return '';
    }
  }

  // دالة لعرض التفاصيل
  viewDetails(order: any): void {
    console.log(order);
    this.callApi.getOrderDetails(order.id).subscribe({
      next: (response) => {
        console.log(response);
        order.items = response || []; // إذا كانت response تحتوي على items
      }
    });

    this.selectedOrder = order; // تعيين الطلب المحدد
    console.log(this.selectedOrder); // تحقق من أن البيانات تصل بشكل صحيح
  }

  getProductName(id: number): string {
    this.callApi.GetProductById(id).subscribe({
      next: (response) => {
        return response.name;
      }
    });
    return 'شاي الصعيد';
  }

  // دالة لإغلاق التفاصيل
  closeDetails(): void {
    this.selectedOrder = null; // إلغاء تعيين الطلب المحدد
  }

  // دالة للانتقال إلى الصفحة الرئيسية
  goToHome(): void {
    this.router.navigate(['/']);
  }

  // دالة للانتقال إلى صفحة تسجيل الدخول
  goToLogin(): void {
    this.router.navigate(['/login']); // أو المسار الصحيح لصفحة تسجيل الدخول
  }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    console.log(this.token);

    this.callApi.getFullNameFromToken().subscribe({
      next:(response) => {
        console.log(response);
        this.fullName = response.fullName;

        // تأجيل التحديث
        setTimeout(() => {
          this.cdRef.detectChanges(); // تأجيل التغيير
        }, 0);
      },
      error:(err) => {
        console.log(err);
      }
    });

    this.callApi.getUserIdFromToken().subscribe({
      next: (response) => {
        console.log("response : ", response);
        this.userId = response.userId;
        this.isUserLoggedIn = true;

        // تأجيل التحديث
        setTimeout(() => {
          this.cdRef.detectChanges(); // تأجيل التغيير
        }, 0);
        
        this.callApi.getAllOrdersByUserId(this.userId).subscribe({
          next: (response) => {
            this.orders = response.sort((a: any, b: any) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateB.getTime() - dateA.getTime();
            });

            console.log(this.orders); // طباعة النتائج بعد الترتيب
          },
          error: (err) => {
            console.error('Error occurred:', err);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching userId:', error);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.cdRef.detectChanges(); // تأجيل التغيير بعد تحميل الـ view
    }, 0);
  }
}
