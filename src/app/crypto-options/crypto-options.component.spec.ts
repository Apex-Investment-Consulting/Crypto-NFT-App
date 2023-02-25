import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoOptionsComponent } from './crypto-options.component';

describe('CryptoOptionsComponent', () => {
  let component: CryptoOptionsComponent;
  let fixture: ComponentFixture<CryptoOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
