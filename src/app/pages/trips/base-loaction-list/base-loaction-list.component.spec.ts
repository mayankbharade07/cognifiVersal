import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLoactionListComponent } from './base-loaction-list.component';

describe('BaseLoactionListComponent', () => {
  let component: BaseLoactionListComponent;
  let fixture: ComponentFixture<BaseLoactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseLoactionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLoactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
