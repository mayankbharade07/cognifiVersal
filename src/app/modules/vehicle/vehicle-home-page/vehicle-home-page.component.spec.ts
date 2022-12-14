import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTableComponent } from './vehicle-home-page.component';

describe('VehicleTableComponent', () => {
  let component: VehicleTableComponent;
  let fixture: ComponentFixture<VehicleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
