import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerInfoDialogComponent } from './partner-info-dialog.component';

describe('PartnerInfoDialogComponent', () => {
  let component: PartnerInfoDialogComponent;
  let fixture: ComponentFixture<PartnerInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerInfoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
