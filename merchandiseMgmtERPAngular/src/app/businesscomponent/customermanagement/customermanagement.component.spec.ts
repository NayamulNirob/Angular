import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomermanagementComponent } from './customermanagement.component';

describe('CustomermanagementComponent', () => {
  let component: CustomermanagementComponent;
  let fixture: ComponentFixture<CustomermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomermanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
