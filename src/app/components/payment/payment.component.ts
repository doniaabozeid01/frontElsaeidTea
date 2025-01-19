import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{


  orderForm!: FormGroup;
  phoneMismatch: boolean = false;

  constructor(private fb: FormBuilder, private _router: Router) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      confirmPhone: ['', [Validators.required]],
    }, { validators: this.phoneMatchValidator }); // إضافة الـ Validator هنا للتحقق من تطابق الهاتفين

    // الاشتراك في تغييرات قيمة confirmPhone للتحقق من التطابق
    this.orderForm.get('confirmPhone')?.valueChanges.subscribe(() => {
      this.checkPhoneMatch();
    });
  }

  checkPhoneMatch(): void {
    const phone = this.orderForm.get('phone')?.value;
    const confirmPhone = this.orderForm.get('confirmPhone')?.value;
    this.phoneMismatch = phone && confirmPhone && phone !== confirmPhone;
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      // معالجة الطلب هنا
      console.log('Order submitted', this.orderForm.value);
      this._router.navigate(['/allorders']);
    }
  }




  phoneMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phone = control.get('phone')?.value;
    const confirmPhone = control.get('confirmPhone')?.value;
    if (phone && confirmPhone && phone !== confirmPhone) {
      return { 'phoneMismatch': true }; // إرجاع خطأ إذا لم يتطابق الرقمين
    }
    return null;
  }



}
