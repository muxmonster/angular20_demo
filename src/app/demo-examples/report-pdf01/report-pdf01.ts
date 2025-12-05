import { Component, inject } from '@angular/core';
import { ReportPdf01Service, ReportItem } from '../services/report-pdf01.service';

@Component({
  selector: 'app-report-pdf01',
  imports: [],
  templateUrl: './report-pdf01.html',
  styleUrl: './report-pdf01.scss',
})
export class ReportPdf01 {
  readonly reportService = inject(ReportPdf01Service);

  private mockItems: ReportItem[] = [
    { no: 1, name: 'ถุงมือผ่าตัด ขนาด 7.0', quantity: 10, price: 25 },
    { no: 2, name: 'ผ้าปิดแผล 4x4 นิ้ว', quantity: 50, price: 3 },
    { no: 3, name: 'เครื่องมือผ่าตัด Set A', quantity: 2, price: 1500 },
    { no: 4, name: 'ไหมเย็บแผล Vicryl 2-0', quantity: 20, price: 45 },
  ];

  onGenerate() {
    this.reportService.generateSampleReport(this.mockItems);
  }
}
