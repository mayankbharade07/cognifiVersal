import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BataRuleComponent } from './bata-rule.component';

describe('BataRuleComponent', () => {
  let component: BataRuleComponent;
  let fixture: ComponentFixture<BataRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BataRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BataRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
