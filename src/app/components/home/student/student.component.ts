import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { StudentService } from 'src/app/services/student/student.service';
import { RingService } from 'src/app/services/ring/ring.service';
import * as bootstrap from 'bootstrap'; // Import Bootstrap
import { Modal } from 'bootstrap';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [NgClass, FormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  @ViewChild('studentModal', { static: false }) studentModal!: ElementRef;
  private modalInstance: Modal | null = null;
  buttonName = 'إضافة';
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
  data = signal<any[] | undefined>(undefined);
  teachers = signal<any[] | undefined>(undefined);
  rings = signal<any[] | undefined>(undefined);

  rowSelected: any;

  constructor(
    private teacherService: TeacherService,
    private ringService: RingService,
    private studentService: StudentService,
    protected loadingService: LoadingService
  ) {
    effect(() => {
      if (this.data() && this.teachers() && this.rings())
        this.loadingService.stopLoading();
    });
  }

  ngOnInit(): void {
    this.loadingService.startLoading();
    this.getAllStudents();
    this.gatAllRings();
    this.getAllTeachers();
  }

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

  private getAllStudents() {
    this.studentService.getAllStudent().subscribe(
      (response: any) => {
        this.data.set(response.data);
        this.rowSelected = this.data()?.[0];
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
        this.teachers.set(response.data);
      },
      (error) => {
        console.error('Teachers failed', error);
      }
    );
  }

  private gatAllRings() {
    this.ringService.getAllRings().subscribe(
      (response) => {
        this.rings.set(response.data);
      },
      (error) => {
        console.error('Rings failed', error);
      }
    );
  }

  onSubmit() {
    this.loadingService.startLoading();
    if (this.buttonName === 'إضافة') {
      this.studentService.addStudent(this.student).subscribe(
        (response) => {
          this.getAllStudents();
          this.closeModal();
        },
        (error) => {
          this.error = error;
          this.loadingService.stopLoading();
        }
      );
    } else {
      this.studentService.updateStudent(this.student).subscribe(
        (response) => {
          this.getAllStudents();
          this.closeModal();
        },
        (error) => {
          this.error = error.error.apiValidationErrorSet.map(
            (err: { field: string; message: string }) =>
              err.field + ': ' + err.message
          );
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
    this.loadingService.startLoading();
    this.studentService.deleteStudent(student.id).subscribe(
      (data) => {
        let filteredData = this.data()?.filter(
          (studnt) => studnt.id !== student.id
        );
        this.data.set(filteredData);
        this.loadingService.stopLoading();
      },
      (error) => {
        console.log(error);
        this.loadingService.stopLoading();
      }
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
