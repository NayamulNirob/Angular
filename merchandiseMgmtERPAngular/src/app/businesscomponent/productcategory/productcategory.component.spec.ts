import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategoryComponent } from './productcategory.component';

describe('ProductcategoryComponent', () => {
  let component: ProductcategoryComponent;
  let fixture: ComponentFixture<ProductcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductcategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
