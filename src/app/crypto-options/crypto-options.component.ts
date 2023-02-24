import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';      
import { Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-crypto-options',
  templateUrl: './crypto-options.component.html',
  styleUrls: ['./crypto-options.component.scss']
})
export class CryptoOptionsComponent {
  public currencies:any[] = [];

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    const queryParams = {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 7,
      page: 1,
      sparkline: false
    };
    const options = { params: new HttpParams().appendAll(queryParams) };
    this.http.get('https://api.coingecko.com/api/v3/coins/markets', options)
      .subscribe(
        (data: object) => {
          this.currencies = Object.keys(data).map(key => {
            return {
              name: data[key as keyof typeof data]['name'],
              image: data[key as keyof typeof data]['image']
            }
          });
          console.log(this.currencies);
        },
        error => {
          console.log(error);
        });
  }
}
