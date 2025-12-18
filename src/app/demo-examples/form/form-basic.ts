import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, required, Field, submit } from '@angular/forms/signals';

// #1 create ineterface
interface OptOutRequest {
  name: string;
  optOut: boolean;
  rating: number;
  email: string;
}

@Component({
  selector: 'app-form-basic',
  imports: [Field],
  templateUrl: './form-basic.html',
  styleUrl: './form-basic.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBasic {
  request = signal<OptOutRequest>({
    name: '',
    optOut: false,
    rating: 0,
    email: '',
  });

  f = form(this.request, (schemaPath) => {
   // required(schemaPath.email, { message: 'Email is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.f, async () => {
      console.log('Submitting form...');
      console.log('Form Submitted', this.request());
    });
  }
}
