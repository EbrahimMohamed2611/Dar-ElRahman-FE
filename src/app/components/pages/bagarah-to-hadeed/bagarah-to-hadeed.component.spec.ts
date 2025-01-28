import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagarahToHadeedComponent } from './bagarah-to-hadeed.component';

describe('BagarahToHadeedComponent', () => {
  let component: BagarahToHadeedComponent;
  let fixture: ComponentFixture<BagarahToHadeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagarahToHadeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagarahToHadeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
