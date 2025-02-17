interface Ring extends BaseAuditModel {
  id?: number; // Optional because it might be auto-generated
  name: string; // Required, min 5, max 255 characters
  studentCount?: number; // Optional
  period: Period; // Enum type
  teacherId: number; // Required
}
