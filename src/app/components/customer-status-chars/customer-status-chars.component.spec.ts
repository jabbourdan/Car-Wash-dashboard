import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStatusCharsComponent } from './customer-status-chars.component';

describe('CustomerStatusCharsComponent', () => {
  let component: CustomerStatusCharsComponent;
  let fixture: ComponentFixture<CustomerStatusCharsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerStatusCharsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerStatusCharsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
