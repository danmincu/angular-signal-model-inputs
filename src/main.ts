import {
  Component,
  Directive,
  model,
  signal,
  input,
  VERSION,
  effect,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  standalone: true,
  selector: 'custom-checkbox',
  template:
    '<div (click)="toggle()"> {{checked()}} </div><button (click)="toggle()">{{checked()}}</button>',
})
export class CustomCheckbox {
  checked = model(false);
  disabled = input(false);
  toggle() {
    // While standard inputs are read-only, you can write directly to model inputs.
    this.checked.set(!this.checked());
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CustomCheckbox],
  // `checked` is a model input.
  // The parenthesis-inside-square-brackets syntax (aka "banana-in-a-box") creates a two-way binding
  template:
    '<custom-checkbox [(checked)]="isAdmin"  (checkedChange)="handler($event)"/><custom-checkbox [(checked)]="isAdmin" />',
})
export class UserProfile {
  protected isAdmin = signal(true);
  constructor() {
  
    console.log("effect > " + this.isAdmin());
    effect(() => {
      console.log("effect > " + this.isAdmin());
    });    
  }

  handler($event:any) {
      console.log('automeatically created change event>' + $event);
  }
}

bootstrapApplication(UserProfile);
