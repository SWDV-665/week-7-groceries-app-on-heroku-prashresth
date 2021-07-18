import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as uuid from 'uuid';
import {catchError, map} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  baseUrl;
  items: any = [];
  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;

  constructor(public http: HttpClient) {
    this.baseUrl = 'https://groceriesswdv655.herokuapp.com/api/grocery';
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getAllItems(): Observable<object[]> {
    return this.http.get(this.baseUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteItem(item) {
    return this.http.delete(`${this.baseUrl}/${item._id}`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      ).toPromise();
  }

  private extractData(res: Response) {
    return res || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg)
    return Observable.throw(errMsg);
  }

  addItem(item) {
    return this.http.post(this.baseUrl, item, {headers:{'Content-Type': 'application/json'}})
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      ).toPromise().then((data) => {
        this.dataChangeSubject.next(true);
        return data;
      });
  }

  editItem(id, item) {
    return this.http.put(`${this.baseUrl}/${id}`, item, {headers:{'Content-Type': 'application/json'}})
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      ).toPromise().then((data) => {
        console.log(data)
        this.dataChangeSubject.next(true);
        return data;
      });
  }

}
