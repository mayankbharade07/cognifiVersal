import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaseLocationComponent } from './add-base-location.component';

describe('AddBaseLocationComponent', () => {
  let component: AddBaseLocationComponent;
  let fixture: ComponentFixture<AddBaseLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBaseLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBaseLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
