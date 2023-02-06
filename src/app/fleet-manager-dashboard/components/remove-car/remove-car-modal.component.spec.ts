import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveCarModalComponent } from './remove-car-modal.component';
import { Component, Input } from '@angular/core';

@Component({ selector: 'app-modal', template: '' })
class ModalStub {
  @Input() modalId!: string;
}

describe('ModalRemoveCarComponent', () => {
  let component: RemoveCarModalComponent;
  let fixture: ComponentFixture<RemoveCarModalComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    const hcSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);

    await TestBed.configureTestingModule({
      declarations: [RemoveCarModalComponent, ModalStub],
      providers: [{ provide: HttpClient, useValue: hcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveCarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
