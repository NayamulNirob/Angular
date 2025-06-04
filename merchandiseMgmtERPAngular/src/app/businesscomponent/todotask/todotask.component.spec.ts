import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodotaskComponent } from './todotask.component';

describe('TodotaskComponent', () => {
  let component: TodotaskComponent;
  let fixture: ComponentFixture<TodotaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodotaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodotaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
