import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducmanagementComponent } from './producmanagement.component';

describe('ProducmanagementComponent', () => {
  let component: ProducmanagementComponent;
  let fixture: ComponentFixture<ProducmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProducmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
