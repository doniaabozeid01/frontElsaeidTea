import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ShopComponent } from './components/shop/shop.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { AboutComponent } from './components/about/about.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { authenticationGuard } from './guard/authentication.guard';

const routes: Routes = [

  // {path:'' , redirectTo:'/home' , pathMatch:'full'},
  // {path:'home' , component : HomeComponent},
  // {path:'viewProduct' , component : ViewProductComponent},
  // {path:'Shop' , component : ShopComponent},
  {path:'home' , component : HomeComponent},
  {path:'about' , component : AboutComponent},
  {path:'login' , component : AuthComponent},
  {path:'signup' , component : SignupComponent},
  {path:'cart' , component : CartComponent , canActivate: [authenticationGuard]},
  {path:'product-details' , component : ProductDetailsComponent},
  {path:'payment' , component : PaymentComponent, canActivate: [authenticationGuard]},
  {path:'allorders' , component : AllOrdersComponent},
  { path: '', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
