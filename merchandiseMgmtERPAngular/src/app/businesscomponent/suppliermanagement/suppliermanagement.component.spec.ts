import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliermanagementComponent } from './suppliermanagement.component';

describe('SuppliermanagementComponent', () => {
  let component: SuppliermanagementComponent;
  let fixture: ComponentFixture<SuppliermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliermanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
