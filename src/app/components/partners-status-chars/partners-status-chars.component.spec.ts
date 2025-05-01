import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersStatusCharsComponent } from './partners-status-chars.component';

describe('PartnersStatusCharsComponent', () => {
  let component: PartnersStatusCharsComponent;
  let fixture: ComponentFixture<PartnersStatusCharsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersStatusCharsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnersStatusCharsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
