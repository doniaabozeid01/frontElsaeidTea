import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ShopComponent } from './components/shop/shop.component';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // استيراد HttpClientModule
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewProductComponent,
    ShopComponent,
    AuthComponent,
    SignupComponent,
    CartComponent,
    PaymentComponent,
    AllOrdersComponent,
    AboutComponent,
    NavbarComponent,
    ProductDetailsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  // تأكد من استيراده
    ToastrModule.forRoot({
      timeOut: 3000,   // مدة الرسالة (بالملي ثانية)
      positionClass: 'toast-top-right',  // مكان ظهور الرسالة
      preventDuplicates: true, // لا تظهر رسائل مكررة بنفس المحتوى
      closeButton: true, // إضافة زر إغلاق
    })
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
