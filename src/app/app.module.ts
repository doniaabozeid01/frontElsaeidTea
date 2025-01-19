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
    AllOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
