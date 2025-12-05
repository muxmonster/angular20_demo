import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface ImageData {
  id: number;
  mime: string;
  base64: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoadImage {
  private http = inject(HttpClient);
  private api = '/assets/api/image.json';

  getImage() {
    return this.http.get<ImageData[]>(`${this.api}`);
  }
}
