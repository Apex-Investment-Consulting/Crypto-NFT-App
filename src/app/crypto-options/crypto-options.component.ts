import { Component } from '@angular/core';
import { StoreService, CryptoCurrency } from '../store.service';

@Component({
  selector: 'app-crypto-options',
  templateUrl: './crypto-options.component.html',
  styleUrls: ['./crypto-options.component.scss']
})
export class CryptoOptionsComponent {
  public currencies: CryptoCurrency[] = [];

  constructor(private store: StoreService) {}

  async ngOnInit() {
    this.store.getCryptoCurrencies()
      .subscribe(currencies => {
        this.currencies = currencies;
      },
      error => {
        console.error(error);
      });
  }
}
