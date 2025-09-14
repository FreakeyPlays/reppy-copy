import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseListItem } from './exercise-list-item';

describe('ExerciseListItem', () => {
  let component: ExerciseListItem;
  let fixture: ComponentFixture<ExerciseListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
