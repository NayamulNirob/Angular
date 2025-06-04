import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateproductmanagementComponent } from './updateproductmanagement.component';

describe('UpdateproductmanagementComponent', () => {
  let component: UpdateproductmanagementComponent;
  let fixture: ComponentFixture<UpdateproductmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateproductmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateproductmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
