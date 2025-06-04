import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseviewComponent } from './warehouseview.component';

describe('WarehouseviewComponent', () => {
  let component: WarehouseviewComponent;
  let fixture: ComponentFixture<WarehouseviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehouseviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
