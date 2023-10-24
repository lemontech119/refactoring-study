import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalSystemComponent } from './hospital-system.component';

describe('HospitalSystemComponent', () => {
  let component: HospitalSystemComponent;
  let fixture: ComponentFixture<HospitalSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
