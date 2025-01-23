import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallApisService } from 'src/app/services/call-apis.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  constructor(private _router: Router, private callApi: CallApisService) {}

  product: any;
  selectedSize!: number; // سنستخدم ID لتحديد الحجم
  selectedPrice!: number; // السعر الحالي
  selectedRating: number = 5; // التقييم الافتراضي
  detailsId!:number;
  stars = [1, 2, 3, 4, 5]; // مصفوفة النجوم
  userComment: string = ''; // تعليق المستخدم
  userId:string='';

  ngOnInit(): void {
    this.callApi.GetProductById(21).subscribe({
      next: (response) => {
        console.log(response);
        this.product = response[0];
        // تعيين أول حجم كافتراضي
        this.selectedSize = this.product.details[0].id;
        this.selectedPrice = this.product.details[0].price;
        this.detailsId = this.product.details[0].id;
      }
    });
var token = localStorage.getItem('token')
    this.callApi.getUserIdFromToken(token).subscribe({
      next:(response)=>{
        console.log("userId : ",response.userId);
        
        this.userId = response.userId
      }
    })
  }

  // تحديث السعر بناءً على الحجم المختار
  updatePrice(): void {
    const selectedDetail = this.product.details.find(
      (detail: any) => detail.id === +this.selectedSize
    );
    if (selectedDetail) {
      this.selectedPrice = selectedDetail.price;
      this.detailsId = selectedDetail.id;
    }
  }

  // دالة لتحديد التقييم عند النقر على النجمة
  setRating(rating: number): void {
    this.selectedRating = rating;
  }

  // دالة لإضافة المنتج إلى السلة
  addToCart(): void {
    var token = localStorage.getItem('token');
    if(token == null){
      this._router.navigate(['/login']);
    }
    else{
      // if(this.userComment !=''){
      // }

      var cartData = {
        
          userId: "811e45b8-5cd6-4fb7-b70a-0373ed18e38d",
          productDetailsId: this.detailsId,
          quantity: 1
        
      }

      this.callApi.AddToCart(cartData).subscribe({
        next:(response)=>{
          console.log(response);
          this._router.navigate(['/cart']);
        }
      })

    }
  }
}
