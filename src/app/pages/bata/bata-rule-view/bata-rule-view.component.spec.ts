import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BataRuleViewComponent } from './bata-rule-view.component';

describe('BataRuleViewComponent', () => {
  let component: BataRuleViewComponent;
  let fixture: ComponentFixture<BataRuleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BataRuleViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BataRuleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
