export class Employee {
  code: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  birthday?: Date;
  salary?: number;
  createDate: Date;
  position?: 'NHAN_VIEN' | 'QUAN_LY';
  workingTime?: number;

  constructor() {
    this.code = '';
    this.name = '';
    this.address = '';
    this.phoneNumber = '';
    this.email = '';
    this.createDate = new Date;
  }
}
