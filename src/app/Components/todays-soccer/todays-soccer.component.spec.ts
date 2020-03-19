import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysSoccerComponent } from './todays-soccer.component';

describe('TodaysSoccerComponent', () => {
  let component: TodaysSoccerComponent;
  let fixture: ComponentFixture<TodaysSoccerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysSoccerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysSoccerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
