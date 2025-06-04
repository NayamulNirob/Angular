import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAndAnalyticsComponent } from './reports-and-analytics.component';

describe('ReportsAndAnalyticsComponent', () => {
  let component: ReportsAndAnalyticsComponent;
  let fixture: ComponentFixture<ReportsAndAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsAndAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsAndAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
