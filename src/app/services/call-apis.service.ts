import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CallApisService {

  constructor(private http: HttpClient) { }

  baseUrl:string = "http://elsaeedtea.somee.com/api/";
  // API لإضافة المنتج
  // addProduct(productData: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}Tea/AddTeaProduct`, productData);
  // }

  // // API لإضافة تفاصيل المنتج
  // addProductDetails(detailsData: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}ProductDetails/AddTeaDetailsProduct`, detailsData);
  //   // http://elsaeedtea.somee.com/api/ProductDetails/AddTeaDetailsProduct

  // }



  GetProductById(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}Tea/GetDetailsByProductId/${id}`);
    // http://elsaeedtea.somee.com/api/ProductDetails/AddTeaDetailsProduct
  }

  // updateProductDetails(id:number ,detailsData: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}ProductDetails/UpdateTeaDetailsProduct/${id}`, detailsData);
  //   // http://elsaeedtea.somee.com/api/ProductDetails/AddTeaDetailsProduct

  // }



  // deleteProduct(id:number):Observable<any>{
  //   return this.http.delete(`${this.baseUrl}Tea/DeleteTeaProduct/${id}`);
  // }


  // deleteProductDetails(id:number):Observable<any>{
  //   return this.http.delete(`${this.baseUrl}ProductDetails/DeleteTeaDetailsProduct/${id}`);
  // }




  Login(loginData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}Account/login`,loginData)
  }

  SignUp(signupData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}Account/userRegister`,signupData)
  }

  AddToCart(cartData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}Cart/AddCart`,cartData)
  }

  getUserIdFromToken(token:any): Observable<any> {
      return this.http.get(`${this.baseUrl}Account/getUserId`, {
        headers:token
      }); // استدعاء API لرجوع الـ userId
  }


  getAllComments(): Observable<any> {
    return this.http.get(`${this.baseUrl}Reviews/GetAllReviews`);
  }

  getAllCartItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}Cart/GetAllCarts`);
  }


  getTeaById(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}Tea/GetTeaById/${id}`);
  }
  



}
