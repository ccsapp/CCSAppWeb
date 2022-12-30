import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCarModalComponent } from './add-car-modal.component';


describe('ModalAddCarComponent', () => {
  let component: AddCarModalComponent;
  let fixture: ComponentFixture<AddCarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCarModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
