import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpmeComponent } from './hpme.component';

describe('HpmeComponent', () => {
  let component: HpmeComponent;
  let fixture: ComponentFixture<HpmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
