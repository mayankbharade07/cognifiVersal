import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCutomerComponent } from './view-cutomer.component';

describe('ViewCutomerComponent', () => {
  let component: ViewCutomerComponent;
  let fixture: ComponentFixture<ViewCutomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCutomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCutomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
