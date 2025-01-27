import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CallApisService } from 'src/app/services/call-apis.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {


  product: any;
  selectedSize!: number; // سنستخدم ID لتحديد الحجم
  selectedPrice!: number; // السعر الحالي
  selectedRating: number = 5; // التقييم الافتراضي
  detailsId!: number;
  stars = [1, 2, 3, 4, 5]; // مصفوفة النجوم
  userComment: string = ''; // تعليق المستخدم
  userId: string = '';
  productId: number = 21;
  token!: any;
  isAddingToCart: boolean = false;

  constructor(private _router: Router, private callApi: CallApisService, private toastr: ToastrService) {
    // this.token = localStorage.getItem('token');
    this.token = sessionStorage.getItem('token');
    console.log(this.token);

    if(this.token != null){

      this.callApi.getUserIdFromToken().subscribe({
        next: (response) => {
          console.log("response : ", response);
          
          this.userId = response.userId; // تعيين الـ userId في المتغير
        },
        error: (error) => {
          console.error('Error fetching userId:', error);
        }
      });
    }

    this.callApi.GetProductById(this.productId).subscribe({
      next: (response) => {
        console.log(response);
        this.product = response[0];
        // تعيين أول حجم كافتراضي
        this.selectedSize = this.product.details[0].id;
        this.selectedPrice = this.product.details[0].price;
        this.detailsId = this.product.details[0].id;
      }
    });
   }



  ngOnInit(): void {

    // this.token = localStorage.getItem('token');
    this.token = sessionStorage.getItem('token');
    console.log(this.token);

    if(this.token != null){

      this.callApi.getUserIdFromToken().subscribe({
        next: (response) => {
          console.log("response : ", response);
          
          this.userId = response.userId; // تعيين الـ userId في المتغير
        },
        error: (error) => {
          console.error('Error fetching userId:', error);
        }
      });
    }

    this.callApi.GetProductById(this.productId).subscribe({
      next: (response) => {
        console.log(response);
        this.product = response[0];
        // تعيين أول حجم كافتراضي
        this.selectedSize = this.product.details[0].id;
        this.selectedPrice = this.product.details[0].price;
        this.detailsId = this.product.details[0].id;
      }
    });

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


  addToCart(): void {
    this.isAddingToCart = true; // تشغيل التحميل
    if (this.token == null) {
      this.isAddingToCart = false; // إيقاف التحميل عند النجاح
      this._router.navigate(['/login']);
    } else {
      const cartData = {
        userId: this.userId, // تعيين الـ userId من المتغير
        productDetailsId: this.detailsId,
        quantity: 1
      };
      console.log("cartData : ", cartData);

      // إذا كان الكومنت غير فارغ، أضفه مع الـ cartData
      if (this.userComment != '') {
        const commentData = {
          rating: this.selectedRating, // استخدام التقييم المختار
          comment: this.userComment, // إضافة الكومنت
          userId: this.userId, // استخدام الـ userId من المتغير
          productId: this.product.id // ID المنتج من البيانات المحملة
        };

        console.log("this.userComment : ", this.userComment);

        // إرسال الكومنت مع الـ API
        this.callApi.AddComment(commentData).subscribe({
          next: (response) => {
            console.log("response : ", response);
          },
          error: (err) => {
            console.log('Error adding comment', err);
          }
        });
      }

      // إضافة المنتج إلى السلة
      this.callApi.AddToCart(cartData).subscribe({
        next: (response) => {
          console.log("response : ", response);
          this.isAddingToCart = false; // إيقاف التحميل عند النجاح
          this.toastr.success('تم إضافة المنتج إلى السلة بنجاح!', 'نجاح');

          this._router.navigate(['/cart']);
        },
        error: (err) => {
          this.isAddingToCart = false; // إيقاف التحميل عند النجاح
          this.toastr.error('فشل في إضافة المنتج إلى السلة!', 'خطأ');
          console.log('Error adding to cart', err);
        }
      });
    }
  }



}
