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
