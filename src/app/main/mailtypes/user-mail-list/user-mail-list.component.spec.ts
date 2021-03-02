import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMailListComponent } from './user-mail-list.component';

describe('UserMailListComponent', () => {
  let component: UserMailListComponent;
  let fixture: ComponentFixture<UserMailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
