import { Component, signal } from '@angular/core';
import ExcelJS from 'exceljs';

//**ติดตั้ง npm i exceljs ก่อนใช้งาน */

@Component({
  selector: 'app-open-excel',
  imports: [],
  templateUrl: './open-excel.html',
  styleUrl: './open-excel.scss',
})
export class OpenExcel {
  columns = signal<string[]>([]);
  rows = signal<any[]>([]);

  async onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();

    await workbook.xlsx.load(buffer);

    const sheet = workbook.getWorksheet(1); // sheet แรก

    const headerRow = sheet?.getRow(1).values as string[];
    this.columns.set(headerRow.slice(1)); // ลบ index 0

    const body: any[] = [];

    sheet!.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const rawValues = Array.isArray(row.values) ? row.values : [];

      const rowData = rawValues.slice(1).map((cell: any) => this.getCellValue(cell));

      body.push(rowData);
    });

    this.rows.set(body);
  }

  getCellValue(cell: any): any {
    if (cell == null) return '0';

    // 1) Formula ปกติ
    if (typeof cell === 'object' && cell.formula !== undefined) {
      return cell.result ?? '0';
    }

    // 2) Shared formula (มักพบใน row2+)
    if (typeof cell === 'object' && cell.sharedFormula !== undefined) {
      return cell.result ?? '0';
    }

    // 3) Rich Text
    if (typeof cell === 'object' && (cell.text || cell.richText)) {
      return cell.text ?? '0';
    }

    // 4) วันที่
    if (cell instanceof Date) {
      return cell.toISOString().slice(0, 10);
    }

    // 5) ค่าอื่นๆ เช่น number/string
    return cell;
  }

  saveToDB() {
    console.clear();
    console.log('🟦 STEP 1: กดปุ่มบันทึกแล้ว เริ่มประมวลผล...');

    console.log('🟩 STEP 2: ตรวจสอบ columns:', this.columns());
    console.log('🟩 STEP 2: ตรวจสอบ rows:', this.rows());

    if (this.rows().length === 0) {
      console.warn('⚠ ไม่มีข้อมูลให้บันทึก');
      return;
    }

    // STEP 3: เตรียม Payload
    console.log('🟧 STEP 3: กำลังสร้าง Payload สำหรับส่งไป API...');
    const payload = {
      columns: this.columns(),
      rows: this.rows(),
    };

    console.log('🟧 Payload ที่จะส่ง:', payload);
  }
}
