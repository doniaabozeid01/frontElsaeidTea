import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallApisService } from 'src/app/services/call-apis.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {


  fullName: any;
  token: any;
  constructor(private _Router: Router, private callApi: CallApisService) {


  }
  signOut(): void {
    if (this.token != null) {
      sessionStorage.removeItem('token');
      this.fullName = ''
    }
  }

  signIn(): void {
    this._Router.navigate(['/login']);
  }

  ngOnInit() {

    this.token = sessionStorage.getItem('token');

    if (this.token != null) {
      this.callApi.getFullNameFromToken().subscribe({
        next: (response) => {
          console.log(response);
          this.fullName = response.fullName;
          if(this.fullName.split(' ').length > 2){
            this.fullName = this.fullName.split(' ')[0] + ' ' + this.fullName.split(' ')[1]
          }

        },
        error: (err) => {
          console.log(err);

        }
      })
    }

  }

}
