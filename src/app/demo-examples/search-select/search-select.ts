import {
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface SelectOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-search-select',
  imports: [],
  templateUrl: './search-select.html',
  styleUrl: './search-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() =>  SearchSelect),
      multi: true,
    },
  ],
})
export class SearchSelect {
  // -------------------------
  // Inputs
  // -------------------------
  options = input<any[]>([]);
  optionLabel = input<string>('name');
  optionValue = input<string>('id');

  // -------------------------
  // Signals
  // -------------------------
  searchText = signal('');
  isOpen = signal(false);
  openUpward = signal(false); // 👈 dropdown เปิดขึ้นด้านบน
  value = signal<any>(null);

  // -------------------------
  // filter options
  // -------------------------
  filteredOptions = computed(() => {
    const q = this.searchText().toLowerCase();
    return this.options().filter((o) =>
      o[this.optionLabel()].toLowerCase().includes(q)
    );
  });

  constructor(private el: ElementRef) {}

  // -------------------------
  // ControlValueAccessor
  // -------------------------
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(val: any): void {
    this.value.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // -------------------------
  // Logic
  // -------------------------
  toggleDropdown() {
    this.isOpen.set(!this.isOpen());

    if (this.isOpen()) {
      const rect = this.el.nativeElement.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;

      this.openUpward.set(spaceBelow < 200); // ถ้าพื้นที่น้อย → เปิดขึ้นบน
    }
  }

  selectOption(opt: any) {
    this.value.set(opt[this.optionValue()]);
    this.searchText.set(opt[this.optionLabel()]);
    this.isOpen.set(false);

    this.onChange(opt[this.optionValue()]);
    this.onTouched();
  }

  clearSelected() {
    this.value.set(null);
    this.searchText.set('');
    this.isOpen.set(true);
    this.onChange(null);
  }

  // ปิดเมื่อคลิกนอก
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
