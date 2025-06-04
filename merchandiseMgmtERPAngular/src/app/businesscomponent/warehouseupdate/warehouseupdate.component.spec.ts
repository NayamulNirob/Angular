import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseupdateComponent } from './warehouseupdate.component';

describe('WarehouseupdateComponent', () => {
  let component: WarehouseupdateComponent;
  let fixture: ComponentFixture<WarehouseupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehouseupdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
