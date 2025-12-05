# ติดตั้ง pdfMake
---
1. ติดตั้ง pdfMake ก่อน
```
npm i pdfMake
```
2. กำหนด type โดยสร้างไฟล์ src/types/pdfmake.d.ts
3. เพิ่ม  "include": ["./node_modules/@types","src/types"] ในไฟล์ tsconfig.json
4. สร้างไฟล์สำหรับเก็บ fonts -> pdf-fonts.ts โดยมีข้อมูลดังนี้ [Links](https://base64.guru/converter/encode/file)
```
export const vfs = {
  'THSarabunNew.ttf': "...BASE64...",
  'THSarabunNew-Bold.ttf': "...BASE64...",  
   "THSarabunNew-Italic.ttf": "...BASE64..."
  "THSarabunNew-BoldItalic.ttf": "...BASE64..."
}
```
5. สร้าง service สำหรับเรียกใช้งาน
```
ng g s report-pdf01.service --skip-tests
```
6. ในไฟล์ service ให้ import pdfMake และประกาศ type เข้าใช้งาน
```
...
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs as thaiVfs } from '../report-pdf01/pdf-fonts';


type TDocumentDefinitions = any;
type TFontDictionary = any;

(pdfMake as any).vfs = thaiVfs;
const fonts: TFontDictionary = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf',
  },
};

(pdfMake as any).fonts = fonts;
...
```
7. ในไฟล์ template html ให้สร้างแค่หน้าจอแสดงปุ่มกด print pdf ขึ้นมา
```
<div class="p-4 space-y-4">
  <h2 class="text-xl font-semibold mb-2">ตัวอย่างสร้างรายงาน PDF ด้วย pdfMake</h2>
  <button
    type="button"
    class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
    (click)="onGenerate()"
  >
    สร้างรายงาน PDF
  </button>
</div>

```
8. ในไฟล์ .ts สำหรับ logic รายงาน ให้เรียกใช้งาน service และส่ง data เข้าไปใช้งานใน service
```
...
import { ReportPdf01Service, ReportItem } from '../services/report-pdf01.service';
...
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
```
9. ถ้าพบ Error “Trying to access beyond buffer length” น่าจะเกิดจาก font ที่ถูกทำเป็น Base64 ไม่ถูกต้อง หรือหาไฟล์ pdf-fonts.ts สำหรับเก็บ font Base64 ไม่เจอ หรือไฟล์เสีย