import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NavbarState {
  title: string;
  titleIconPath?: string;
  backButtonPath?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor() {}

  /**
   * The subject that is used to store the current navbar state.
   * The title is always required, the other properties are optional and
   * only displayed if they are set. The single object ensures that the
   * navbar always has the proper state.
   */
  private subject = new BehaviorSubject<NavbarState>({ title: '' });

  get navbarState$() {
    return this.subject.asObservable();
  }

  setNavbarState(state: NavbarState) {
    this.subject.next(state);
  }
}
