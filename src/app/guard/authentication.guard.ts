import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');  // التحقق من وجود الـ token في localStorage
  if (token) {
    return true;  // إذا كان الـ token موجودًا، يسمح بالانتقال إلى المسار
  } else {
    // إذا لم يكن الـ token موجودًا، قم بتوجيه المستخدم إلى صفحة تسجيل الدخول
    const router = inject(Router);  // استخدام inject بدلاً من constructor للحصول على الـ router
    router.navigate(['/login']);
    return false;  // لا يسمح بالانتقال إلى المسار
  }};
