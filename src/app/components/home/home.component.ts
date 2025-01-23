import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Splide from '@splidejs/splide';
import { CallApisService } from 'src/app/services/call-apis.service';
// import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {


  constructor(private _Router: Router, private callApi: CallApisService) {

  }

  scrollToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }




  signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // إزالة الـ userId إذا كنت قد خزنتها
  }

  signIn(): void {
    this._Router.navigate(['/login']);
  }





  product = {
    name: 'شاي الصعيد الفاخر',
    description: 'استمتع بنكهة أصيلة مع شاي الصعيد الذي يمنحك راحة واسترخاء في كل كوب. هذا الشاي مصنوع من أجود الأوراق الطبيعية.',
    price: 150,
    image: '../../../assets/abouttea.jpg',  // Update this path with the correct image URL
  };

  buyProduct(): void {
    console.log('Product added to cart');
  }

  // count: number = 1;

  // add() {
  //   ++this.count;
  // }
  // minus() {
  //   if (this.count >= 2)
  //     --this.count;
  // }












  comments: any;

  currentIndex = 0;

  nextComment() {
    if (this.currentIndex < this.comments.length - 1) {
      this.currentIndex++;
    }
  }

  prevComment() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  stars: string = '';


  getstars(num: number): void {
    for (var i = 0; i < num; i++) {
      this.stars += '⭐';
    }
  }






  ngAfterViewInit(): void {
    const splide = new Splide('#image-carousel', {
      type: 'loop',
      perPage: 1,
      autoplay: true,
      interval: 3000,
      arrows: false,
      pagination: true,
      speed: 1000,
    });

    splide.mount();

    // تأكد من تحديث Splide بعد تحميل الصور
    splide.refresh();
  }



  ngOnInit(): void {
    new Splide('#image-carousel', {
      type: 'slide',
      perPage: 1,
      autoplay: true,
      interval: 3000,
      arrows: false,
      pagination: true,
      speed: 1000,
      heightRatio: 0.5,  // لضبط الارتفاع بناءً على العرض
    }).mount();


    this.callApi.getAllComments().subscribe({
      next: (response) => {
        console.log(response);
        this.comments = response;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


































}
