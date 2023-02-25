import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NFTCardsComponent } from './nft-cards.component';

describe('NFTCardsComponent', () => {
  let component: NFTCardsComponent;
  let fixture: ComponentFixture<NFTCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NFTCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NFTCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
