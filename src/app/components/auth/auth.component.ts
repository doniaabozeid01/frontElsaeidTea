import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApisService } from 'src/app/services/call-apis.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  
  loginForm: FormGroup;
  apiErrorMessage: string | null = null; // لتخزين رسالة الخطأ من الـ API
  isAddingToCart:boolean = false; // إيقاف التحميل عند النجاح



  constructor(private fb: FormBuilder, private callApi: CallApisService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.isAddingToCart = true; // إيقاف التحميل عند النجاح
    if (this.loginForm.valid) {
      this.apiErrorMessage = null; // إعادة تعيين رسالة الخطأ
      console.log('Login Attempt:', this.loginForm.value);
      this.callApi.Login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isAddingToCart = false; // إيقاف التحميل عند النجاح
          console.log(response);
          const { token } = response;
          // تخزين البيانات في localStorage
          // localStorage.setItem('token', token);
          sessionStorage.setItem('token', token);
          // localStorage.setItem('userId', userId);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isAddingToCart = false; // إيقاف التحميل عند النجاح
          console.log(err);
          // عرض رسالة عامة عند الخطأ
          this.apiErrorMessage = 'Invalid email or password.';
        }
      });
    } else {
      console.log('Form is invalid!');
    }
  }
  







}
