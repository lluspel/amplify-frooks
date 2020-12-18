import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrooksComponent } from './frooks.component';

describe('FrooksComponent', () => {
  let component: FrooksComponent;
  let fixture: ComponentFixture<FrooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
