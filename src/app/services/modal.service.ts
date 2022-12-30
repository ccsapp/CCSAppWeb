import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * This service was inspired by this tutorial:
 * https://betterprogramming.pub/create-a-modal-for-your-angular-app-without-libs-671bd7280867
 */
@Injectable({
  providedIn: 'root',
})

/**
 * The modal component goes together with this service as it registers the modal ids and also handles
 * the unwatching of the ids. The modal component handles the visably of the modal (opening and closing).
 * Therefore all modals should use the modal component as a wrapper or implement the same functionality.
 */
export class ModalService {
  /**
   * Modals maps a modal id to a BehaviorSubject that is used to notify the
   * modal component about whether the modal is open or not.
   */
  private modals = new Map<string, BehaviorSubject<boolean>>();
  private readonly errMessage$ = new BehaviorSubject<string | null>(null);

  get errorMessage() {
    return this.errMessage$;
  }

  /**
   * This function creates a new observable for the modal with the given id or returns the existing one.
   * Should be called in the setup of the modal component
   */
  watch(id: string): Observable<boolean> {
    const modal = this.modals.get(id);
    if (modal) {
      return modal.asObservable();
    }
    this.modals.set(id, new BehaviorSubject<boolean>(false));
    return this.modals.get(id)!.asObservable();
  }

  /**
   * Must not be called in setup functions, because the modal might not be initialized yet.
   * See watch function.
   */
  open(id: string) {
    this.modals.get(id)!.next(true);
  }

  close(id: string) {
    this.modals.get(id)!.next(false);
  }

  /**
   * Unregisters modal id, should be called when modal component is destroyed in order to prevent memory leaks
   */
  unwatch(id: string) {
    this.modals.delete(id);
  }

  /**
   * There should be only one error message at a time for the entire application
   * This also implies that the error message can be set from any component and should be displayed
   * on top of all other components
   * @param newMessage should be set to null if the user has acknowledged the error message
   */
  updateErrorMessage(newMessage: string | null) {
    this.errMessage$.next(newMessage);
  }
}
