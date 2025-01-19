import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems = [
    {
      name: 'شاي الصعيد',
      price: 3.000,
      weight: 250,
      quantity: 1,
      image: '../../../assets/1-01.png'
    },{
      name: 'شاي الصعيد',
      price: 3.000,
      weight: 250,
      quantity: 1,
      image: '../../../assets/1-01.png'
    },{
      name: 'شاي الصعيد',
      price: 3.000,
      weight: 250,
      quantity: 1,
      image: '../../../assets/1-01.png'
    },{
      name: 'شاي الصعيد',
      price: 3.000,
      weight: 250,
      quantity: 1,
      image: '../../../assets/1-01.png'
    }
  ];
  
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  removeItem(itemToRemove: any): void {
    this.cartItems = this.cartItems.filter(item => item !== itemToRemove);
  }
  
}
