import { Component, inject, signal } from '@angular/core';
import { ReportPdf01Service, ReportItem } from '../services/report-pdf01.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-report-pdf01',
  imports: [],
  templateUrl: './report-pdf01.html',
  styleUrl: './report-pdf01.scss',
})
export class ReportPdf01 {
  private reportService = inject(ReportPdf01Service);
  private sanitizer = inject(DomSanitizer);

  pdfUrl = signal<SafeResourceUrl | null>(null);
  loading = signal<boolean>(false);
  
  private mockItems: ReportItem[] = [
    { no: 1, name: 'ถุงมือผ่าตัด ขนาด 7.0', quantity: 10, price: 25 },
    { no: 2, name: 'ผ้าปิดแผล 4x4 นิ้ว', quantity: 50, price: 3 },
    { no: 3, name: 'เครื่องมือผ่าตัด Set A', quantity: 2, price: 1500 },
    { no: 4, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 5, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 6, name: 'ถุงมือผ่าตัด ขนาด 8.0', quantity: 10, price: 25 },
    { no: 7, name: 'ผ้าปิดแผล 5x5 นิ้ว', quantity: 50, price: 3 },
    { no: 8, name: 'เครื่องมือผ่าตัด Set B', quantity: 2, price: 1500 },
    { no: 9, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 10, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 11, name: 'ถุงมือผ่าตัด ขนาด 9.0', quantity: 10, price: 25 },
    { no: 12, name: 'ผ้าปิดแผล 6x6 นิ้ว', quantity: 50, price: 3 },
    { no: 13, name: 'เครื่องมือผ่าตัด Set C', quantity: 2, price: 1500 },
    { no: 14, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 15, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 16, name: 'ถุงมือผ่าตัด ขนาด 10.0', quantity: 10, price: 25 },
    { no: 17, name: 'ผ้าปิดแผล 7x7 นิ้ว', quantity: 50, price: 3 },
    { no: 18, name: 'เครื่องมือผ่าตัด Set D', quantity: 2, price: 1500 },
    { no: 19, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 20, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 21, name: 'ถุงมือผ่าตัด ขนาด 11.0', quantity: 10, price: 25 },
    { no: 22, name: 'ผ้าปิดแผล 8x8 นิ้ว', quantity: 50, price: 3 },
    { no: 23, name: 'เครื่องมือผ่าตัด Set E', quantity: 2, price: 1500 },
    { no: 24, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 25, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 26, name: 'ถุงมือผ่าตัด ขนาด 12.0', quantity: 10, price: 25 },
    { no: 27, name: 'ผ้าปิดแผล 9x9 นิ้ว', quantity: 50, price: 3 },
    { no: 28, name: 'เครื่องมือผ่าตัด Set F', quantity: 2, price: 1500 },
    { no: 29, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 30, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 31, name: 'ถุงมือผ่าตัด ขนาด 13.0', quantity: 10, price: 25 },
    { no: 32, name: 'ผ้าปิดแผล 10x10 นิ้ว', quantity: 50, price: 3 },
    { no: 33, name: 'เครื่องมือผ่าตัด Set G', quantity: 2, price: 1500 },
    { no: 34, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 35, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 36, name: 'ถุงมือผ่าตัด ขนาด 14.0', quantity: 10, price: 25 },
    { no: 37, name: 'ผ้าปิดแผล 11x11 นิ้ว', quantity: 50, price: 3 },
    { no: 38, name: 'เครื่องมือผ่าตัด Set H', quantity: 2, price: 1500 },
    { no: 39, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 40, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 41, name: 'ถุงมือผ่าตัด ขนาด 15.0', quantity: 10, price: 25 },
    { no: 42, name: 'ผ้าปิดแผล 12x12 นิ้ว', quantity: 50, price: 3 },
    { no: 43, name: 'เครื่องมือผ่าตัด Set I', quantity: 2, price: 1500 },
    { no: 44, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 45, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 46, name: 'ถุงมือผ่าตัด ขนาด 16.0', quantity: 10, price: 25 },
    { no: 47, name: 'ผ้าปิดแผล 13x13 นิ้ว', quantity: 50, price: 3 },
    { no: 48, name: 'เครื่องมือผ่าตัด Set J', quantity: 2, price: 1500 },
    { no: 49, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 50, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 51, name: 'ถุงมือผ่าตัด ขนาด 17.0', quantity: 10, price: 25 },
    { no: 52, name: 'ผ้าปิดแผล 14x14 นิ้ว', quantity: 50, price: 3 },
    { no: 53, name: 'เครื่องมือผ่าตัด Set K', quantity: 2, price: 1500 },
    { no: 54, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 55, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 56, name: 'ถุงมือผ่าตัด ขนาด 18.0', quantity: 10, price: 25 },
    { no: 57, name: 'ผ้าปิดแผล 15x15 นิ้ว', quantity: 50, price: 3 },
    { no: 58, name: 'เครื่องมือผ่าตัด Set L', quantity: 2, price: 1500 },
    { no: 59, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 60, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
    { no: 61, name: 'ถุงมือผ่าตัด ขนาด 19.0', quantity: 10, price: 25 },
    { no: 23, name: 'เครื่องมือผ่าตัด Set E', quantity: 2, price: 1500 },
    { no: 24, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
    { no: 25, name: 'ผ้าก๊อซ 10x10 นิ้ว', quantity: 20, price: 45 },
  ];

  onGenerate() {
    this.reportService.generateSampleReport(this.mockItems);
  }

  onPreview() {
    this.loading.set(true);     // เริ่มโหลด
    this.pdfUrl.set(null);      // reset iframe

    this.reportService.previewSampleReport(this.mockItems).then((pdfBlob: any) => {
      const url = URL.createObjectURL(pdfBlob);
      this.pdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
      setTimeout(() => { this.loading.set(false); }, 1000);
    });
  }
}
