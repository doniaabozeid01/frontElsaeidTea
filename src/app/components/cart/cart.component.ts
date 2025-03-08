import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CallApisService } from 'src/app/services/call-apis.service';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(private router: Router, private callApi: CallApisService, private toastr: ToastrService, private jwtDecoderService: JwtDecoderService) { }

  cartItems: any;
  userId!: string;
  token: any;




  getTotalPrice(): number {
    if (!this.cartItems || this.cartItems.length === 0) {
      return 0;
    }

    return this.cartItems.reduce((total: number, item: any) => {
      const itemTotal = item.productDetails.price * item.quantity;
      return total + itemTotal;
    }, 0);
  }


  removeItem(id: number): void {
    this.callApi.removeFromCart(id).subscribe({
      next: (response) => {
        console.log("response of deletion : ", response);

        // تحديث قائمة العناصر في السلة بعد الحذف
        this.cartItems = this.cartItems.filter((item: any) => item.id !== id);
      },
      error: (err) => {
        console.log("err : ", err);
      }
    });
  }


  ngOnInit(): void {
    // جلب التوكن من التخزين المحلي
    // this.token = localStorage.getItem('token');
    this.token = sessionStorage.getItem('token');
    console.log(this.token);
    this.checkExpiredToken();
    // جلب userId من التوكن
    this.callApi.getUserIdFromToken().subscribe({
      next: (response) => {
        console.log("response : ", response);

        // تعيين الـ userId
        this.userId = response.userId;
        console.log("cart userId : ", this.userId);

        // جلب العناصر الموجودة في السلة بناءً على userId
        this.callApi.getCartItemsByUserId(this.userId).subscribe({
          next: (response) => {
            console.log("cart response : ", response);
            this.cartItems = response;
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching userId:', error);
      }
    });
  }




  UpdateCart(id: number, item: any): void {
    console.log("id : ", id, "item : ", item);
    var objItem = {
      "userId": item.userId,
      "productDetailsId": item.productDetailsId,
      "quantity": item.quantity
    }
    console.log("id : ", id, "item : ", objItem);


    this.callApi.UpdateCart(id, objItem).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);

      }
    })

  }



  goToPayment(): void {
    const tokenPayload = this.checkExpiredToken(); // استدعاء الدالة التي تفك التوكين
    const expTime = tokenPayload.exp * 1000; // تحويل `exp` إلى ميلي ثانية
    console.log("date.now : ", Date.now());
    console.log("expTime : ", expTime);


    const nowUtc = new Date(Date.now()); // توقيت UTC
    const nowLocal = new Date(); // توقيت الجهاز المحلي

    console.log("🕰 UTC Time: ", nowUtc.toISOString()); // تنسيق UTC الكامل
    console.log("📍 Local Time: ", nowLocal.toLocaleString()); // تنسيق التوقيت المحلي


    if (Date.now() > expTime) {
      this.toastr.warning('برجاء تسجيل الدخول','انتهت الجلسه')
      this.router.navigate(['/login']);
    }

    // tokenPayload.exp * 1000; // تحويل `exp` إلى ميلي ثانية

    // return Date.now() > expTime; // مقارنة الوقت الحالي مع انتهاء الصلاحية

    if (this.getTotalPrice() <= 0) {
      this.toastr.warning('لا يوجد شئ في السله او ربما اختيارك للكميه خاطئ', 'تحذير')
      this.router.navigate(['/cart']);
    }
    else {
      this.router.navigate(['/payment']);
    }
  }

  decoderToken: any;
  checkExpiredToken(): any {
    this.decoderToken = this.jwtDecoderService.decodeToken(this.token);
    console.log("this.decoderToken : ", this.decoderToken);
    return this.decoderToken;
  }
}
