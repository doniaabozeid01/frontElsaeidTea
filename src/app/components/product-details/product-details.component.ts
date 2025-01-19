import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {



  /**
   *
   */
  constructor(private _router:Router) {
    
  }




  selectedSize: string = '250g';  // الحجم الافتراضي
  selectedRating: number = 5;  // التقييم الافتراضي
  stars = [1, 2, 3, 4, 5];  // مصفوفة النجوم
  userComment: string = '';  // تعليق المستخدم

  // دالة لتحديد التقييم عند النقر على النجمة
  setRating(rating: number): void {
    this.selectedRating = rating;
  }
  
  // دالة لإضافة المنتج إلى السلة
  addToCart(): void {
    console.log(`تم إضافة المنتج بحجم ${this.selectedSize} إلى السلة!`);
    console.log(`التقييم: ${this.selectedRating} نجوم`);
    console.log(`التعليق: ${this.userComment}`);
    this._router.navigate(['/cart']);
  }
}
