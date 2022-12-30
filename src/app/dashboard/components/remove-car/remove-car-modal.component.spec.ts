import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveCarModalComponent } from './remove-car-modal.component';


describe('ModalRemoveCarComponent', () => {
  let component: RemoveCarModalComponent;
  let fixture: ComponentFixture<RemoveCarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveCarModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveCarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
