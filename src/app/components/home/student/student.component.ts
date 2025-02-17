import { CommonModule, NgClass } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { StudentService } from 'src/app/services/student/student.service';
import { RingService } from 'src/app/services/ring/ring.service';
import * as bootstrap from 'bootstrap'; // Import Bootstrap
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-student',
  standalone: true,
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  imports: [NgClass, FormsModule, CommonModule],
})
export class StudentComponent implements OnInit {
  @ViewChild('studentModal', { static: false }) studentModal!: ElementRef;
  private modalInstance: Modal | null = null;
  buttonName = 'إضافة';
  data: any[] = [];
  student = {
    id: '',
    fullName: '',
    nationalId: '',
    motherName: '',
    address: '',
    motherPhoneNumber: '',
    maritalStatus: 'غير معروف',
    periodName: '',
    ringId: 1,
    joiningDate: '',
    birthDate: '',
    fatherPhoneNumber: '',
    fatherEmailAddress: '',
    status: '',
  };
  error: any;
  periods: any[] = [
    { name: 'First', nameAR: 'الأولى' },
    { name: 'Second', nameAR: 'الثانية' },
    { name: 'Extended', nameAR: 'ممتدة' },
    { name: 'NOT_DEFINED', nameAR: 'غير معروف' },
  ];
  teachers: any[] = [];
  rings: any[] = [];

  rowSelected: any;
  ngAfterViewInit() {
    // Initialize the modal instance
    this.modalInstance = new Modal(this.studentModal.nativeElement);
  }
  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
      // Manually remove the backdrop
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    } else {
      console.error('Modal instance is not initialized.');
    }
  }
  constructor(
    private teacherService: TeacherService,
    private ringService: RingService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getAllStudents();
    this.gatAllRings();
    this.getAllTeachers();
  }

  private getAllStudents() {
    this.studentService.getAllStudent().subscribe(
      (response: any) => {
        this.data = response.data;
        this.rowSelected = this.data[0];
      },
      (error) => {
        console.error('Student failed', error);
      }
    );
  }

  selectRow(row: any) {
    this.rowSelected = row;
  }

  private getAllTeachers() {
    this.teacherService.getAllTeachers().subscribe(
      (response) => {
        this.teachers = response.data;
      },
      (error) => {
        console.error('Teachers failed', error);
      }
    );
  }

  private gatAllRings() {
    this.ringService.getAllRings().subscribe(
      (response) => {
        this.rings = response.data;
      },
      (error) => {
        console.error('Rings failed', error);
      }
    );
  }

  onSubmit() {
    if (this.buttonName === 'إضافة') {
      this.studentService.addStudent(this.student).subscribe(
        (response) => {
          this.getAllStudents();
          this.closeModal();
        },
        (error) => {
          this.error = error;
        }
      );
    } else {
      this.studentService.updateStudent(this.student).subscribe(
        (response) => {
          this.getAllStudents();
          this.closeModal();
        },
        (error) => {
          this.error = error;
        }
      );
    }
  }

  reset() {
    this.student = {
      id: '',
      fullName: '',
      nationalId: '',
      motherName: '',
      address: '',
      motherPhoneNumber: '',
      maritalStatus: 'أعزب',
      periodName: '',
      ringId: 1,
      joiningDate: '',
      birthDate: '',
      fatherPhoneNumber: '',
      fatherEmailAddress: '',
      status: '',
    };
  }

  handleEditClick(student: any) {
    this.student = this.cloneStudent(student);
    console.log('Filter', student.ring.period);

    this.student.periodName = this.periods
      .filter((p) => p.nameAR === student.ring.period)
      .map((p) => p.name)[0];

    if (this.student.maritalStatus === 'يتيم')
      this.student.maritalStatus = 'ORPHAN';
    else if (this.student.maritalStatus === 'مُطلق')
      this.student.maritalStatus = 'DIVORCED';
    else this.student.maritalStatus = 'NOT_DEFINED';

    this.buttonName = 'تعديل';
  }

  deleteStudent(student: any) {
    this.studentService.deleteStudent(student.id).subscribe(
      (data) => {
        this.data = this.data.filter((studnt) => studnt.id !== student.id);
      },
      (error) => console.log(error)
    );
  }

  cloneStudent(student: any): any {
    return {
      id: student.id,
      fullName: student.fullName,
      nationalId: student.nationalId,
      motherName: student.motherName,
      address: student.address,
      motherPhoneNumber: student.motherPhoneNumber,
      maritalStatus: student.maritalStatus,
      periodName: student.ring.period,
      ringId: student.ringId,
      joiningDate: student.joiningDate,
      birthDate: student.birthDate,
      fatherPhoneNumber: student.fatherPhoneNumber,
      fatherEmailAddress: student.fatherEmailAddress,
      status: student.status,
    };
  }
}