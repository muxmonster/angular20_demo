import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadImage {
  private http = inject(HttpClient);
  private api = '/assets/api/image.json';

  getImage() {
    return this.http.get<{ mime: string; base64: string }[]>(`${this.api}`);
  }
}
