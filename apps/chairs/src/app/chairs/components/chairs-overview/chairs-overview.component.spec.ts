import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairsOverviewComponent } from './chairs-overview.component';

describe('ChairsOverviewComponent', () => {
  let component: ChairsOverviewComponent;
  let fixture: ComponentFixture<ChairsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChairsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
