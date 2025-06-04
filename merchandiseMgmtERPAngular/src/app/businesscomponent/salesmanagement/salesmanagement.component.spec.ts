import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanagementComponent } from './salesmanagement.component';

describe('SalesmanagementComponent', () => {
  let component: SalesmanagementComponent;
  let fixture: ComponentFixture<SalesmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
