import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalId!: string;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.closeModal();
  }

  display$!: Observable<boolean>;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.display$ = this.modalService.watch(this.modalId);
  }

  /**
   * The modal container handles unwatching the modal ids (prevent memory leaks)
   * This also reliefes the components that use the modal from having to implement it
   */
  ngOnDestroy(): void {
    this.modalService.unwatch(this.modalId);
  }

  closeModal(): void {
    this.modalService.close(this.modalId);
  }
}
