import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  standalone: true,
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  imports: [
    NgClass
  ]
})
export class StudentComponent implements OnInit {
  data = [
    {
      serial: 255,
      name: 'إبراهيم محمد الوفي',
      nationalId: '2960126300711',
      status: 'متصل',
      period: 'الفترة الأولى',
      class: 'حمادة عبد ربه',
    },
    {
      serial: 255,
      name: 'محمد حمزة أحمد عبد المنعم',
      nationalId: '2960126300712',
      status: 'منقطع',
      period: 'الفترة الثانية',
      class: 'محمد أحمد عبد المنعم',
    },
    {
      serial: 255,
      name: 'إبراهيم محمد الوفي',
      nationalId: '2960126300711',
      status: 'متصل',
      period: 'الفترة الأولى',
      class: 'حمادة عبد ربه',
    },
    {
      serial: 255,
      name: 'محسن محمد إبراهيم',
      nationalId: '2960126300713',
      status: 'متصل',
      period: 'الفترة الأولى',
      class: 'حمادة عبد ربه',
    },
    {
      serial: 255,
      name: 'إبراهيم محمد الوفي',
      nationalId: '2960126300711',
      status: 'متصل',
      period: 'الفترة الأولى',
      class: 'حمادة عبد ربه',
    },
    {
      serial: 255,
      name: 'إبراهيم محمد الوفي',
      nationalId: '2960126300711',
      status: 'متصل',
      period: 'الفترة الأولى',
      class: 'حمادة عبد ربه',
    },
    {
      serial: 255,
      name: 'محمد حمزة أحمد عبد المنعم',
      nationalId: '2960126300712',
      status: 'منقطع',
      period: 'الفترة الثانية',
      class: 'محمد أحمد عبد المنعم',
    },
    {
      serial: 255,
      name: 'إبراهيم محمد الوفي',
      nationalId: '2960126300711',
      status: 'متصل',
      period: 'الفترة الأولى',
      class: 'حمادة عبد ربه',
    },
    {
      serial: 255,
      name: 'محسن محمد إبراهيم',
      nationalId: '2960126300713',
      status: 'متصل',
      period: 'الفترة الأولى',
      class: 'حمادة عبد ربه',
    },
    {
      serial: 255,
      name: 'إبراهيم محمد الوفي',
      nationalId: '2960126300711',
      status: 'متصل',
      period: 'الفترة الأولى',
      class: 'حمادة عبد ربه',
    },
  ];

  ngOnInit(): void {
    this.rowSelected = this.data[0];
  }
  rowSelected: any;

  selectRow(row: any) {
    this.rowSelected = row;
  }
}
