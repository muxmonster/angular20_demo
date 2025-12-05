import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { SearchSelect } from "./demo-examples/search-select/search-select";
import { FormBuilder, FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchSelect, FormsModule, ReactiveFormsModule, JsonPipe, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('demo');
  readonly fb  = inject(FormBuilder);

  form = this.fb.group({
  city: [null],  // จะได้ object {id, name}
});

options = [
  { id: 1, name: 'กรุงเทพ' },
  { id: 2, name: 'ลพบุรี' },
  { id: 3, name: 'สระบุรี' },
  { id: 4, name: 'นครราชสีมา' },
  { id: 5, name: 'ขอนแก่น' },
  { id: 6, name: 'อุดรธานี' },
  { id: 7, name: 'เชียงใหม่' },
  { id: 8, name: 'เชียงราย' },
  { id: 9, name: 'ภูเก็ต' },
  { id: 10, name: 'สงขลา' },
];

}
