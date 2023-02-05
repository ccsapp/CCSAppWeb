import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor() {}

  // This sets the title displayed centrally in the navbar
  private title = new BehaviorSubject('');
  // This sets the path to the icon displayed to the left of the title (can be null -> no icon will be displayed)
  private titleIconPath = new BehaviorSubject<string | null>(null);
  // If this path is set, a back button will be displayed instead of the logo linking to the specified path
  private backButtonPath = new BehaviorSubject<string | null>(null);

  get title$() {
    return this.title.asObservable();
  }

  get backButtonPath$() {
    return this.backButtonPath.asObservable();
  }

  get titleIcon$() {
    return this.titleIconPath.asObservable();
  }

  // usually called in the ngOnInit of the page component
  setTitle(title: string) {
    this.title.next(title);
  }

  // usually called in the ngOnInit of the page component (can be null -> no icon will be displayed)

  setTitleIconPath(iconPath: string | null) {
    this.titleIconPath.next(iconPath);
  }

  // usually called in the ngOnInit of the page component
  setBackButtonPath(path: string | null) {
    this.backButtonPath.next(path);
  }
}
