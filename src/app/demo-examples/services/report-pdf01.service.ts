import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs as thaiVfs } from '../report-pdf01/pdf-fonts';

type TDocumentDefinitions = any;
type TFontDictionary = any;

(pdfMake as any).vfs = thaiVfs;
const fonts: TFontDictionary = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew.ttf',
    bolditalics: 'THSarabunNew-Bold.ttf',
  },
};

(pdfMake as any).fonts = fonts;

export interface ReportItem {
  no: number;
  name: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReportPdf01Service {
  generateSampleReport(items: ReportItem[]) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const docDefinition: TDocumentDefinitions = {
      info: {
        title: 'ตัวอย่างรายงานสรุปสินค้า',
        author: 'BMH System',
        subject: 'รายงานสรุปสินค้า',
      },
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      defaultStyle: {
        font: 'THSarabunNew',
        fontSize: 14,
      },
      header: {
        margin: [40, 20, 40, 0],
        columns: [
          { text: 'โรงพยาบาลบ้านหมี่ (BMH)', style: 'headerTitle' },
          {
            text: `วันที่พิมพ์: ${new Date().toLocaleString('th-TH')}`,
            style: 'headerRight',
          },
        ],
      },
      footer: (currentPage: number, pageCount: number) => {
        return {
          margin: [40, 0, 40, 20],
          columns: [
            {
              text: `หน้าที่ ${currentPage} / ${pageCount}`,
              alignment: 'right',
              fontSize: 10,
            },
          ],
        };
      },
      content: [
        { text: 'รายงานสรุปรายการสินค้า', style: 'title', margin: [0, 0, 0, 10] },

        {
          text: 'ข้อมูลทั่วไป',
          style: 'sectionHeader',
          margin: [0, 0, 0, 6],
        },
        {
          columns: [
            { text: 'แผนก: คลังพัสดุ', width: '50%' },
            { text: `ผู้จัดทำ: คุณ M`, width: '50%' },
          ],
          columnGap: 10,
          margin: [0, 0, 0, 10],
        },

        {
          text: 'ตารางรายการสินค้า',
          style: 'sectionHeader',
          margin: [0, 0, 0, 6],
        },

        {
          table: {
            widths: ['auto', '*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: '#', style: 'tableHeader' },
                { text: 'รายการสินค้า', style: 'tableHeader' },
                { text: 'จำนวน', style: 'tableHeader' },
                { text: 'ราคา/หน่วย', style: 'tableHeader' },
                { text: 'รวม', style: 'tableHeader' },
              ],
              ...items.map((item) => [
                { text: item.no.toString(), alignment: 'center' },
                { text: item.name },
                { text: item.quantity.toString(), alignment: 'right' },
                {
                  text: item.price.toLocaleString('th-TH', {
                    minimumFractionDigits: 2,
                  }),
                  alignment: 'right',
                },
                {
                  text: (item.price * item.quantity).toLocaleString('th-TH', {
                    minimumFractionDigits: 2,
                  }),
                  alignment: 'right',
                },
              ]),
              [
                { text: 'รวมทั้งสิ้น', colSpan: 4, alignment: 'right', bold: true },
                {},
                {},
                {},
                {
                  text: total.toLocaleString('th-TH', {
                    minimumFractionDigits: 2,
                  }),
                  alignment: 'right',
                  bold: true,
                },
              ],
            ],
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 10],
        },

        {
          text: 'ลงชื่อผู้จัดทำรายงาน',
          margin: [0, 20, 0, 4],
        },
        {
          columns: [
            {
              width: 200,
              stack: [
                { text: '........................................', margin: [0, 10, 0, 2] },
                { text: '(                                  )', margin: [0, 0, 0, 2] },
                { text: 'ตำแหน่ง: ', margin: [0, 0, 0, 2] },
                { text: 'วันที่: ', margin: [0, 0, 0, 2] },
              ],
            },
          ],
        },
      ],
      styles: {
        headerTitle: {
          fontSize: 14,
          bold: true,
        },
        headerRight: {
          fontSize: 10,
          alignment: 'right',
        },
        title: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          decoration: 'underline',
        },
        tableHeader: {
          bold: true,
          fillColor: '#eeeeee',
          alignment: 'center',
        },
      },
      // ตัวอย่างใส่ลายน้ำ
      watermark: {
        text: 'BMH INTERNAL',
        color: 'gray',
        opacity: 0.1,
        bold: true,
        italics: false,
      },
    };

    // เปิด PDF ในแท็บใหม่
    pdfMake.createPdf(docDefinition).open();

    // ถ้าต้องการดาวน์โหลด ให้ใช้:
    // pdfMake.createPdf(docDefinition).download('report.pdf');
  }
  previewSampleReport(items: ReportItem[]) {
    return new Promise((resolve) => {
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const docDefinition: TDocumentDefinitions = {
        info: {
          title: 'ตัวอย่างรายงานสรุปสินค้า',
          author: 'BMH System',
          subject: 'รายงานสรุปสินค้า',
        },
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        defaultStyle: {
          font: 'THSarabunNew',
          fontSize: 14,
        },
        header: {
          margin: [40, 20, 40, 0],
          columns: [
            { text: 'โรงพยาบาลบ้านหมี่ (BMH)', style: 'headerTitle' },
            {
              text: `วันที่พิมพ์: ${new Date().toLocaleString('th-TH')}`,
              style: 'headerRight',
            },
          ],
        },
        footer: (currentPage: number, pageCount: number) => {
          return {
            margin: [40, 0, 40, 20],
            columns: [
              {
                text: `หน้าที่ ${currentPage} / ${pageCount}`,
                alignment: 'right',
                fontSize: 10,
              },
            ],
          };
        },
        content: [
          { text: 'รายงานสรุปรายการสินค้า', style: 'title', margin: [0, 0, 0, 10] },

          {
            text: 'ข้อมูลทั่วไป',
            style: 'sectionHeader',
            margin: [0, 0, 0, 6],
          },
          {
            columns: [
              { text: 'แผนก: คลังพัสดุ', width: '50%' },
              { text: `ผู้จัดทำ: คุณ M`, width: '50%' },
            ],
            columnGap: 10,
            margin: [0, 0, 0, 10],
          },

          {
            text: 'ตารางรายการสินค้า',
            style: 'sectionHeader',
            margin: [0, 0, 0, 6],
          },

          {
            table: {
              widths: ['auto', '*', 'auto', 'auto', 'auto'],
              body: [
                [
                  { text: '#', style: 'tableHeader' },
                  { text: 'รายการสินค้า', style: 'tableHeader' },
                  { text: 'จำนวน', style: 'tableHeader' },
                  { text: 'ราคา/หน่วย', style: 'tableHeader' },
                  { text: 'รวม', style: 'tableHeader' },
                ],
                ...items.map((item) => [
                  { text: item.no.toString(), alignment: 'center' },
                  { text: item.name },
                  { text: item.quantity.toString(), alignment: 'right' },
                  {
                    text: item.price.toLocaleString('th-TH', {
                      minimumFractionDigits: 2,
                    }),
                    alignment: 'right',
                  },
                  {
                    text: (item.price * item.quantity).toLocaleString('th-TH', {
                      minimumFractionDigits: 2,
                    }),
                    alignment: 'right',
                  },
                ]),
                [
                  { text: 'รวมทั้งสิ้น', colSpan: 4, alignment: 'right', bold: true },
                  {},
                  {},
                  {},
                  {
                    text: total.toLocaleString('th-TH', {
                      minimumFractionDigits: 2,
                    }),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
            layout: 'lightHorizontalLines',
            margin: [0, 0, 0, 10],
          },

          {
            text: 'ลงชื่อผู้จัดทำรายงาน',
            margin: [0, 20, 0, 4],
          },
          {
            columns: [
              {
                width: 200,
                stack: [
                  { text: '........................................', margin: [0, 10, 0, 2] },
                  { text: '(                                  )', margin: [0, 0, 0, 2] },
                  { text: 'ตำแหน่ง: ', margin: [0, 0, 0, 2] },
                  { text: 'วันที่: ', margin: [0, 0, 0, 2] },
                ],
              },
            ],
          },
        ],
        styles: {
          headerTitle: {
            fontSize: 14,
            bold: true,
          },
          headerRight: {
            fontSize: 10,
            alignment: 'right',
          },
          title: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
          },
          sectionHeader: {
            fontSize: 16,
            bold: true,
            decoration: 'underline',
          },
          tableHeader: {
            bold: true,
            fillColor: '#eeeeee',
            alignment: 'center',
          },
        },
        // ตัวอย่างใส่ลายน้ำ
        watermark: {
          text: 'BMH INTERNAL',
          color: 'gray',
          opacity: 0.1,
          bold: true,
          italics: false,
        },
      };

      // เปิด PDF ในแท็บใหม่
      const pdfDoc = pdfMake.createPdf(docDefinition);
      pdfDoc.getBlob((blob: Blob) => {
        resolve(blob);
      });
    });
  }
}
