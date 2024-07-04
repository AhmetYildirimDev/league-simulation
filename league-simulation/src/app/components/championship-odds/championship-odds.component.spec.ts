import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipOddsComponent } from './championship-odds.component';

describe('ChampionshipOddsComponent', () => {
  let component: ChampionshipOddsComponent;
  let fixture: ComponentFixture<ChampionshipOddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionshipOddsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionshipOddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
