import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CallApisService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://elsaeedtea.somee.com/api/";
  // API لإضافة المنتج
  // addProduct(productData: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}Tea/AddTeaProduct`, productData);
  // }

  // // API لإضافة تفاصيل المنتج
  // addProductDetails(detailsData: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}ProductDetails/AddTeaDetailsProduct`, detailsData);
  //   // http://elsaeedtea.somee.com/api/ProductDetails/AddTeaDetailsProduct

  // }



  GetProductById(id: number): Observable<any> {
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




  Login(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Account/login`, loginData)
  }

  SignUp(signupData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Account/userRegister`, signupData)
  }

  AddToCart(cartData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Cart/AddCart`, cartData)
  }

  // getUserIdFromToken(token: any): Observable<any> {
  //   return this.http.get(`${this.baseUrl}Account/getUserId`, {
  //     headers: token
  //   }); // استدعاء API لرجوع الـ userId
  // }


  getAllComments(): Observable<any> {
    return this.http.get(`${this.baseUrl}Reviews/GetAllReviews`);
  }

  getCartItemsByUserId(Id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}Cart/GetCartByUserId/${Id}`);
  }


  getTeaById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}Tea/GetTeaById/${id}`);
  }



  UpdateCart(id: number, items: any): Observable<any> {
    return this.http.put(`${this.baseUrl}Cart/UpdateCart/${id}`, items);
  }



  createOrder(paymentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Payment/CreateOrder`, paymentData);
  }


  getAllOrdersByUserId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}Payment/GetOrdersByUserId/${id}`)
  }

  getOrderDetails(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}Payment/GetOrderItemsByOrderRequestId/${id}`)
  }

  AddComment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Reviews/AddReview`, data);
  }

  removeFromCart(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}Cart/DeleteCart/${id}`, { responseType: 'text' });
  }

  getUserIdFromToken(): Observable<any> {
    // استرجاع التوكن من الـ localStorage
    // const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    console.log("token : ",token);
    
    if (!token) {
      throw new Error('Token not found');
    }

    // إعداد الهيدر مع التوكن
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("headers : ", headers);
    
    // استدعاء الـ API مع تمرير الهيدر
    return this.http.get<any>(`${this.baseUrl}Account/getUserId`, {
      headers: headers
    });
  }




  getFullNameFromToken(): Observable<any> {
    // استرجاع التوكن من الـ localStorage
    // const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    console.log("token : ",token);
    
    if (!token) {
      throw new Error('Token not found');
    }

    // إعداد الهيدر مع التوكن
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("headers : ", headers);
    
    // استدعاء الـ API مع تمرير الهيدر
    return this.http.get<any>(`${this.baseUrl}Account/getFullName`, {
      headers: headers
    });
  }

}
