import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, map, concat } from 'rxjs';
import { StoreService, CryptoCurrency } from '../store.service';

@Component({
  selector: 'app-nft-cards',
  templateUrl: './nft-cards.component.html',
  styleUrls: ['./nft-cards.component.scss']
})
export class NFTCardsComponent {
  public NFTs:any[] = [];

  constructor(private http: HttpClient, private store: StoreService) {}

  async ngOnInit() {
    const NFTlistData: object | undefined = await this.getNFTids().toPromise();
    const NFTcount = Object.keys(NFTlistData || {}).length;
    for(let i = 0; i < NFTcount; i++) {
      const key: string = Object.keys(NFTlistData || {})[i];
      const id: string = NFTlistData ? NFTlistData[key as keyof typeof NFTlistData]['id'] : '';
      if(id) {
        const NFT: object = await this.getNFTMetatdataForCard(id).toPromise() || {};
        console.log(NFT);
        let imageUrl: string = NFT['image'  as keyof typeof NFT]['small'];
        imageUrl = imageUrl.replace('/small/', '/large/');
        const name: string = NFT['name' as keyof typeof NFT];
        const assetPlatformId: string = NFT['asset_platform_id' as keyof typeof NFT];
        let platformCurrencyImage: string = this.store.getCurrencyLogoUrl(assetPlatformId);
        this.NFTs.push({
          name,
          asset_platform_id: assetPlatformId,
          image: imageUrl,
          priceInPlatformCurrency: NFT['floor_price' as keyof typeof NFT]['native_currency'],
          platformCurrencyImage
        });
      }
    }
    console.log(`final NFTs`);
    console.log(this.NFTs);
  }

  private getNFTMetatdataForCard(NFTid: string): Observable<object> {
    return this.http.get('https://api.coingecko.com/api/v3/nfts/' + NFTid, {});
  }

  private getNFTids(): Observable<object> {
    const queryParams = {
      order: 'market_cap_usd_desc',
      per_page: 10,
      page: 1
    };
    const options = { params: new HttpParams().appendAll(queryParams) };
    return this.http.get('https://api.coingecko.com/api/v3/nfts/list', options);
  }
}
