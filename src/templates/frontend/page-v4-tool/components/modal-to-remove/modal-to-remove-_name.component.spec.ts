import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalToRemove_NameComponent } from './modal-to-remove-_name.component';

describe('ModalToRemove_NameComponent', () => {
  let component: ModalToRemove_NameComponent;
  let fixture: ComponentFixture<ModalToRemove_NameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalToRemove_NameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalToRemove_NameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
