import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallApisService } from 'src/app/services/call-apis.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(private router: Router, private callApi: CallApisService) { }

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
  // GetProductName(id: number): string {
  //   this.callApi.GetProductById(id).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       return response.name;
  //     },
  //     error: (err) => {
  //       return '';
  //     }
  //   })
  //   return '';

  // }

}
