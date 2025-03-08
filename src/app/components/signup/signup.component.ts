import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApisService } from 'src/app/services/call-apis.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  apiErrorMessage: string | null = null; // لتخزين رسالة الخطأ من الـ API
  isAddingToCart:boolean = false; // إيقاف التحميل عند النجاح
  showPassword: boolean = false; // يتحكم في عرض/إخفاء كلمة المرور


  constructor(private fb: FormBuilder, private _Router: Router, private callApi: CallApisService) {
    this.signupForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.gmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]]
    });
  }

  // Validator for Gmail emails
  gmailValidator(control: any): { [key: string]: any } | null {
    const email: string = control.value;
    if (email && !email.endsWith('@gmail.com')) {
      return { invalidGmail: true };
    }
    return null;
  }

  // Validator for password
  passwordValidator(control: any): { [key: string]: any } | null {
    const password: string = control.value;
    const regex = /^(?=.*[a-z])(?=.*\d).{6,}$/; // يحتوي على حرف صغير ورقم
    if (password && !regex.test(password)) {
      return { invalidPassword: true };
    }
    return null;
  }

  onSubmit(): void {
    this.isAddingToCart = true; // إيقاف التحميل عند النجاح

    if (this.signupForm.valid) {
      this.apiErrorMessage = null; // إعادة تعيين رسالة الخطأ


      this.callApi.SignUp(this.signupForm.value).subscribe({
        next: (response) => {
          this.isAddingToCart = false; // إيقاف التحميل عند النجاح
          console.log(response);
          const { token} = response;

          // localStorage.setItem('token', token);
          sessionStorage.setItem('token', token);
          // localStorage.setItem('userId', userId);
          this._Router.navigate(['/home']);
        },
        error:(err)=>{
          this.isAddingToCart = false; // إيقاف التحميل عند النجاح
          console.log(err.error);
          if(err.error != null){
            this.apiErrorMessage = err.error;
            if(err.error == 'This email is already exist.'){
            this.apiErrorMessage = "هذا البريد الالكتروني مسجل من قبل";

            }
          }
          else{
            this.apiErrorMessage = 'تعذر تسجيل الاشتراك برجاء المحاوله مره اخري';
          }
        }
      })

    }
    else {
      console.log('Form is invalid!');
    }
  }

}
