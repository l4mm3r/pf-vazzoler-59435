import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../features/dashboard/users/models/';

@Pipe({
  name: 'userFullName',
})
export class UserFullNamePipe implements PipeTransform {
  transform(value: Student, args?: any): string {
    const result = value.firstName + ' ' + value.lastName;
    return result;
  }
}
