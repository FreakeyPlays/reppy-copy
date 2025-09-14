import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseWorkout } from './choose-workout';

describe('ChooseWorkout', () => {
  let component: ChooseWorkout;
  let fixture: ComponentFixture<ChooseWorkout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseWorkout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseWorkout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
