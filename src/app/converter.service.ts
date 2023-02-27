import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  constructor(private httpclient: HttpClient) { }

  getCurrencies(): Observable<any> {
    return this.httpclient.get(environment.api_get_currencies);
  }

  getCurrencyValue(currency1: string | null, currency2: string | null, value: string | null): Observable<any> {
      return this.httpclient.get(`${environment.api_url_converter}?have=${currency1}&want=${currency2}&amount=${value}`);
  }
}
