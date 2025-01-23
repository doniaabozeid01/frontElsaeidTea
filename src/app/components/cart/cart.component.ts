import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallApisService } from 'src/app/services/call-apis.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(private router: Router, private callApi: CallApisService) { }

  cartItems: any;

  getTotalPrice(): number {
    return 2;
    // return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeItem(itemToRemove: any): void {

    // this.cartItems = this.cartItems.filter(item => item !== itemToRemove);
  }

  ngOnInit(): void {
    this.callApi.getAllCartItems().subscribe({
      next: (response) => {
        console.log(response);
        this.cartItems = response;
      }
    })
  }


  // GetProductName(id: number): string {
  //   this.callApi.GetProductById(id).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       return response.name;
  //     },
  //     error: (err) => {
  //       return '';
  //     }
  //   })
  //   return '';

  // }

}
