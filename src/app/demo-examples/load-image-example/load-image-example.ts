import { FormsModule } from '@angular/forms';
import { LoadImage, ImageData } from '../services/load-image.service';
import { afterNextRender, Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-load-image-example',
  imports: [FormsModule],
  templateUrl: './load-image-example.html',
  styleUrl: './load-image-example.scss',
})
export class LoadImageExample {
  private imageService = inject(LoadImage);
  imageId = 1;
  imageBase64 = signal<ImageData[] | null>(null);
  loading = signal(false);

  constructor() {
    afterNextRender(() => {
      this.imageService.getImage().subscribe((data: any) => {
        this.imageBase64.set(data);
      });
    });
  }

  loadImage(img: ImageData) {
    return `data:${img.mime};base64,${img.base64}`;
  }
}
