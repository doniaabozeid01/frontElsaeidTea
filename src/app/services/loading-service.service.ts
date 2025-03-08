import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();

  hideLoading() {
    this.isLoadingSubject.next(false);
  }

  showLoading() {
    this.isLoadingSubject.next(true);
  }
}
