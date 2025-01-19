import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  /**
   *
   */
  constructor(private _Router:Router) {
    
    
  }
  signOut(): void {

  }

  signIn(): void {
    this._Router.navigate(['/login']);
  }

}
