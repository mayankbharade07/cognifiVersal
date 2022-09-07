import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BataRuleVariableComponent } from './bata-rule-variable.component';

describe('BataRuleVariableComponent', () => {
  let component: BataRuleVariableComponent;
  let fixture: ComponentFixture<BataRuleVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BataRuleVariableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BataRuleVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
