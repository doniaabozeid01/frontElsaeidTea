import { Component } from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent {
  product = {
    name: 'شاي الصعيد الفاخر',
    description: 'استمتع بنكهة أصيلة مع شاي الصعيد الذي يمنحك راحة واسترخاء في كل كوب. هذا الشاي مصنوع من أجود الأوراق الطبيعية.',
    price: 150,
    image: '../../../assets/abouttea.jpg',  // Update this path with the correct image URL
  };

  constructor() { }

  ngOnInit(): void {
  }

  buyProduct(): void {
    console.log('Product added to cart');
  }

  count: number = 1;

  add() {
    ++this.count;
  }
  minus() {
    if (this.count >= 2)
      --this.count;
  }


}
