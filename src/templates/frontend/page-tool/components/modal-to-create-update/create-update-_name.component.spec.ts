import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdate_NamePageComponent } from './create-update-_name.component';

describe('CreateUpdate_NamePageComponent', () => {
  let component: CreateUpdate_NamePageComponent;
  let fixture: ComponentFixture<CreateUpdate_NamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdate_NamePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdate_NamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
