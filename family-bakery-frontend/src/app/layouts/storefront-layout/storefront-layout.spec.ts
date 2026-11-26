import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { StorefrontLayout } from './storefront-layout';

describe('StorefrontLayout', () => {
  let component: StorefrontLayout;
  let fixture: ComponentFixture<StorefrontLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorefrontLayout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StorefrontLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
