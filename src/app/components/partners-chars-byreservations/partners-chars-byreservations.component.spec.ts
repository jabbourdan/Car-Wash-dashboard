import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersCharsByreservationsComponent } from './partners-chars-byreservations.component';

describe('PartnersCharsByreservationsComponent', () => {
  let component: PartnersCharsByreservationsComponent;
  let fixture: ComponentFixture<PartnersCharsByreservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersCharsByreservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnersCharsByreservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
