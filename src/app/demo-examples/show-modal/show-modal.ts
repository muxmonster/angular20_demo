import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
export interface WorkItem {
  id: number;
  formName: string;
  step: number;
  status: 'รอทำงาน' | 'กำลังดำเนินการ' | 'เสร็จสิ้น';
}

export const WORK_ITEMS: WorkItem[] = [
  { id: 1, formName: 'แบบฟอร์ม Admit ผู้ป่วย', step: 1, status: 'รอทำงาน' },
  { id: 2, formName: 'แบบฟอร์มเตรียมผ่าตัด', step: 2, status: 'กำลังดำเนินการ' },
  { id: 3, formName: 'แบบฟอร์ม OR Nurse Note', step: 3, status: 'เสร็จสิ้น' },
  { id: 4, formName: 'Consent ผ่าตัด', step: 1, status: 'รอทำงาน' },
  { id: 5, formName: 'ใบสั่งยา', step: 4, status: 'เสร็จสิ้น' },
  { id: 6, formName: 'แบบฟอร์มส่งต่อผู้ป่วย', step: 5, status: 'รอทำงาน' },
  { id: 7, formName: 'Lab Order', step: 2, status: 'กำลังดำเนินการ' },
  { id: 8, formName: 'X-ray Request', step: 1, status: 'รอทำงาน' },
  { id: 9, formName: 'บันทึกเยี่ยมผู้ป่วย', step: 3, status: 'เสร็จสิ้น' },
  { id: 10, formName: 'บันทึกจำหน่ายผู้ป่วย', step: 4, status: 'รอทำงาน' },
];

@Component({
  selector: 'app-show-modal',
  imports: [NgClass],
  templateUrl: './show-modal.html',
  styleUrl: './show-modal.scss',
})
export class ShowModal {
  items = signal<WorkItem[]>(WORK_ITEMS);

  showModal = signal(false);
  animateModal = signal(false);
  selectedItem = signal<WorkItem | null>(null);

  openModal(item: WorkItem) {
    this.selectedItem.set(item);
    this.showModal.set(true);

    // Delay เพื่อให้เกิด animation fade + zoom
    setTimeout(() => this.animateModal.set(true), 20);
  }

  closeModal() {
    this.animateModal.set(false);

    setTimeout(() => {
      this.showModal.set(false);
      this.selectedItem.set(null);
    }, 150); // ให้ animation จบก่อนค่อยปิด
  }

  // ✅ ปิดด้วยปุ่ม ESC
  // @HostListener('document:keydown.escape')
  // onEscKey(): void {
  //   if (this.showModal()) this.closeModal();
  // }

  getStatusColor(status: string): string {
    switch (status) {
      case 'รอทำงาน':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'กำลังดำเนินการ':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'เสร็จสิ้น':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  }
}
