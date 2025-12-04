import { FormsModule } from '@angular/forms';
import { LoadImage } from '../services/load-image.service';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-load-image-example',
  imports: [FormsModule],
  templateUrl: './load-image-example.html',
  styleUrl: './load-image-example.scss',
})
export class LoadImageExample {
  readonly imageService = inject(LoadImage);
  imageId = 1;
  imageBase64 = signal<string | null>(null);
  loading = signal(false);

  loadImage() {
    this.loading.set(true);
    this.imageService.getImage().subscribe((data) => {
      console.log('Image data received:', data);
     
      // setTimeout(() => {
      //   this.imageBase64.set(`data:${data.mime};base64,${data.base64}`);
      //   this.loading.set(false);
      // }, 1000);
    });
  }
}
