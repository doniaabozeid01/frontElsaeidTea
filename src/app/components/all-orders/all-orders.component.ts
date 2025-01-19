import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent  {
  
  constructor(private router: Router) {}

  userName = 'أحمد علي'; // اسم المستخدم
  selectedOrder: any = null; // الطلب المحدد للتفاصيل

  orders: {
    orderId: string;
    orderDate: Date;
    totalAmount: number;
    status: string;
    items: { name: string; quantity: number; price: number }[];
  }[] = [
    {
      orderId: '001',
      orderDate: new Date(),
      totalAmount: 250,
      status: 'مؤكد',
      items: [
        { name: 'شاي الصعيد - 1 كجم', quantity: 1, price: 250 }
      ]
    },
    {
      orderId: '002',
      orderDate: new Date(),
      totalAmount: 150,
      status: 'تحت المعالجة',
      items: [
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
        { name: 'شاي الصعيد - 500 جرام', quantity: 1, price: 150 },
      ]
    }
  ];

  // دالة لاسترجاع حالة الطلب 
  getOrderStatusClass(status: string): string {
    switch (status) {
      case 'مؤكد':
        return 'confirmed';
      case 'تحت المعالجة':
        return 'processing';
      case 'تم الشحن':
        return 'shipped';
      default:
        return '';
    }
  }

  // دالة لعرض التفاصيل
  viewDetails(order: any): void {
    this.selectedOrder = order; // تعيين الطلب المحدد
    console.log(this.selectedOrder); // تحقق من أن البيانات تصل بشكل صحيح
  }

  // دالة لإغلاق التفاصيل
  closeDetails(): void {
    this.selectedOrder = null; // إلغاء تعيين الطلب المحدد
  }

  // دالة للانتقال إلى الصفحة الرئيسية
  goToHome(): void {
    this.router.navigate(['/']);
  }
}
