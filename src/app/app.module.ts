import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CryptoOptionsComponent } from './crypto-options/crypto-options.component';
import { NFTCardsComponent } from './nft-cards/nft-cards.component';
import { StoreService } from './store.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CryptoOptionsComponent,
    NFTCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
