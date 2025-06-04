import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLocationSupportComponent } from './multi-location-support.component';

describe('MultiLocationSupportComponent', () => {
  let component: MultiLocationSupportComponent;
  let fixture: ComponentFixture<MultiLocationSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiLocationSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiLocationSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
