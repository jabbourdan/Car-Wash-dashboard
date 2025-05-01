import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerResevationsCharsComponent } from './customer-resevations-chars.component';

describe('CustomerResevationsCharsComponent', () => {
  let component: CustomerResevationsCharsComponent;
  let fixture: ComponentFixture<CustomerResevationsCharsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerResevationsCharsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerResevationsCharsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
