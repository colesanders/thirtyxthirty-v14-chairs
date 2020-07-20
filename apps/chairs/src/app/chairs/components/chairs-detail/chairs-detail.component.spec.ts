import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairsDetailComponent } from './chairs-detail.component';

describe('ChairsDetailComponent', () => {
  let component: ChairsDetailComponent;
  let fixture: ComponentFixture<ChairsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChairsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
