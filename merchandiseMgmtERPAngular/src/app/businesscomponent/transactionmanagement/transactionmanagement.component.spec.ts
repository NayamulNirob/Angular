import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionmanagementComponent } from './transactionmanagement.component';

describe('TransactionmanagementComponent', () => {
  let component: TransactionmanagementComponent;
  let fixture: ComponentFixture<TransactionmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
