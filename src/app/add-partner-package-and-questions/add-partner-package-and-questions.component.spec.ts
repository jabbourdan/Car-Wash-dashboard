import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartnerPackageAndQuestionsComponent } from './add-partner-package-and-questions.component';

describe('AddPartnerPackageAndQuestionsComponent', () => {
  let component: AddPartnerPackageAndQuestionsComponent;
  let fixture: ComponentFixture<AddPartnerPackageAndQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPartnerPackageAndQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartnerPackageAndQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
