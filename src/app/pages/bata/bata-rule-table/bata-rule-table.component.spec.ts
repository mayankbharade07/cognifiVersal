import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BataRuleTableComponent } from './bata-rule-table.component';

describe('BataRuleTableComponent', () => {
  let component: BataRuleTableComponent;
  let fixture: ComponentFixture<BataRuleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BataRuleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BataRuleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
