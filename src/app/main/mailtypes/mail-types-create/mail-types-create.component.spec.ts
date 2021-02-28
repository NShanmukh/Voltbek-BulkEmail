import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailTypesCreateComponent } from './mail-types-create.component';

describe('MailTypesCreateComponent', () => {
  let component: MailTypesCreateComponent;
  let fixture: ComponentFixture<MailTypesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailTypesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailTypesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
