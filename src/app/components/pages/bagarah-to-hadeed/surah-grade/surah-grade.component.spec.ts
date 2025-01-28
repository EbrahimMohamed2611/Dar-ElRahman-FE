import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurahGradeComponent } from './surah-grade.component';

describe('SurahGradeComponent', () => {
  let component: SurahGradeComponent;
  let fixture: ComponentFixture<SurahGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurahGradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurahGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
