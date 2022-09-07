import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BataComponent } from './bata.component';

describe('BataComponent', () => {
  let component: BataComponent;
  let fixture: ComponentFixture<BataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
