import { Component } from '@angular/core';
import { StoreService, CryptoCurrency } from '../store.service';
import { Observable, throwError, fromEvent } from 'rxjs';

@Component({
  selector: 'app-crypto-options',
  templateUrl: './crypto-options.component.html',
  styleUrls: ['./crypto-options.component.scss']
})
export class CryptoOptionsComponent {
  public currencies: CryptoCurrency[] = [];
  public firstRowCurrencies: CryptoCurrency[] = [];
  public secondRowCurrencies: CryptoCurrency[] = [];

  constructor(private store: StoreService) {}

  async ngOnInit() {
    this.store.getCryptoCurrencies()
      .subscribe(currencies => {
        this.currencies = currencies;

        this.firstRowCurrencies = currencies.splice(0, Math.floor(this.currencies.length / 2));
        this.secondRowCurrencies = currencies;

      },
      error => {
        console.error(error);
      });
  }
}
