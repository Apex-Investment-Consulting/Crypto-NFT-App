import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, map, catchError } from 'rxjs';

export interface CryptoCurrency {
  name: string,
  image: string
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public static readonly cryptoCurrencyData: CryptoCurrency[] = [
    {
      "name": "Bitcoin",
      "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
    },
    {
      "name": "Ethereum",
      "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
    },
    {
      "name": "Tether",
      "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663"
    },
    {
      "name": "BNB",
      "image": "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850"
    },
    {
      "name": "USD Coin",
      "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389"
    },
    {
      "name": "XRP",
      "image": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731"
    },
    {
      "name": "Cardano",
      "image": "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860"
    }
  ];
  public currencies: CryptoCurrency[] = [];

  constructor(private http: HttpClient) { }

  getCurrencyLogoUrl(currencyName: string): string {
    const matchedCurrency: CryptoCurrency = StoreService.cryptoCurrencyData.filter((currency: CryptoCurrency) => {
      return currency['name'].toLowerCase().indexOf(currencyName) !== -1;
    })[0] || StoreService.cryptoCurrencyData[0];

    return matchedCurrency['image'];
  }

  getCryptoCurrencies(): Observable<CryptoCurrency[]> {
    const queryParams = {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 12,
      page: 1,
      sparkline: false
    };
    const options = { params: new HttpParams().appendAll(queryParams) };
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets', options)
      .pipe(
        map((data: object) => {
          return Object.keys(data).map(key => {
            return {
              name: data[key as keyof typeof data]['name'],
              image: data[key as keyof typeof data]['image']
            }
          });
        }),
        catchError((err: any) => {
          return throwError(err);
        }));
  }
}
