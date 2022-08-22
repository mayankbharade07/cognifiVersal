import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteReportComponent } from './route-report.component';

describe('RouteReportComponent', () => {
  let component: RouteReportComponent;
  let fixture: ComponentFixture<RouteReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
