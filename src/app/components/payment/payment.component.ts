import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CallApisService } from 'src/app/services/call-apis.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{


  orderForm!: FormGroup;
  phoneMismatch: boolean = false;
  userId!:string;
  token:any;
  isAddingToCart: boolean = false;

  constructor(private fb: FormBuilder, private _router: Router,private callApi:CallApisService, private toastr: ToastrService) {}

  ngOnInit(): void {
    // this.token = localStorage.getItem('token');
    this.token = sessionStorage.getItem('token');
    console.log(this.token);

    this.callApi.getUserIdFromToken().subscribe({
      next: (response) => {
        console.log("response : ", response);

        this.userId = response.userId; // تعيين الـ userId في المتغير
      },
      error: (error) => {
        console.error('Error fetching userId:', error);
      }
    });
    
    this.orderForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      confirmPhone: ['', [Validators.required]],
      paymentMethod: ['cash', Validators.required], // الحقل الجديد للدفع مع القيمة الافتراضية
    }, { validators: this.phoneMatchValidator }); // إضافة الـ Validator هنا للتحقق من تطابق الهاتفين

    // الاشتراك في تغييرات قيمة confirmPhone للتحقق من التطابق
    this.orderForm.get('confirmPhone')?.valueChanges.subscribe(() => {
      this.checkPhoneMatch();
    });
  }

  checkPhoneMatch(): void {
    const phone = this.orderForm.get('phoneNumber')?.value;
    const confirmPhone = this.orderForm.get('confirmPhone')?.value;
    this.phoneMismatch = phone && confirmPhone && phone !== confirmPhone;
  }

  errorMessage: string = '';

  onSubmit(): void {
    this.isAddingToCart = true; // تشغيل التحميل
    if (this.orderForm.valid) {
      const { confirmPhone, ...formData } = this.orderForm.value;
      const requestData = { ...formData, userId: this.userId };
      console.log(requestData);
      
  
      this.callApi.createOrder(requestData).subscribe({
        next: (response) => {
          console.log('Order created successfully:', response);
          this.isAddingToCart = false; // إيقاف التحميل عند النجاح
          this.toastr.success('تم تأكيد الطلب بنجاح!', 'نجاح');

          this._router.navigate(['/allorders']);
        },
        error: (err) => {
          this.toastr.error('حدث خطأ أثناء تأكيد الطلب!', 'خطأ');
          this.isAddingToCart = false; // إيقاف التحميل عند النجاح
          if (err.error && err.error.errors) {
            this.errorMessage = Object.keys(err.error.errors)
              .map((key) => ` ${err.error.errors[key].join(', ')}`)
              .join(' | ');
              
          } else if (err.error && err.error.title) {
            console.error('Error title:', err.error.title);
            this.errorMessage = err.error.title;
          } else {
            console.error('Unexpected error:', err);
            this.errorMessage = 'An unexpected error occurred.';
          }
        },
      });
    }
  }
  




  phoneMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phone = control.get('phoneNumber')?.value;
    const confirmPhone = control.get('confirmPhone')?.value;
    if (phone && confirmPhone && phone !== confirmPhone) {
      return { 'phoneMismatch': true }; // إرجاع خطأ إذا لم يتطابق الرقمين
    }
    return null;
  }

}
