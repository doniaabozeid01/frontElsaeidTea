import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CallApisService } from 'src/app/services/call-apis.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  token: string | null = null;
  email: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private callApi: CallApisService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatch });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');  // الحصول على التوكن كما هو
      this.email = params.get('email');  // الحصول على البريد كما هو
  
      console.log("Raw Token:", this.token); // طباعة التوكن الأصلي
      console.log("Raw Email:", this.email); // طباعة الإيميل الأصلي
    });
  }
  
  

  passwordsMatch(group: FormGroup) {
    const password = group.get('password')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;
    
    return password && confirmPassword && password === confirmPassword 
      ? null 
      : { notMatching: true };
  }
  

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token && this.email) {
      this.errorMessage = null;
      this.successMessage = null;

      const data = {
        email: this.email, // أخذ البريد الإلكتروني من الـ URL
        token: this.token, // أخذ التوكن من الـ URL
        newPassword: this.resetPasswordForm.value.password
      };

      this.callApi.ResetPassword(data).subscribe({
        next: () => {
          this.successMessage = 'تم إعادة تعيين كلمة المرور بنجاح! يمكنك تسجيل الدخول الآن.';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = 'حدث خطأ أثناء إعادة تعيين كلمة المرور.';
        }
      });
    }
  }
}
