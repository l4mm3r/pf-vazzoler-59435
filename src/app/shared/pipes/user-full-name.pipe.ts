import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../features/dashboard/users/models/';

@Pipe({
  name: 'userFullName'
})
export class UserFullNamePipe implements PipeTransform {
  transform(value: User, args?: any): string {
    const result = value.firstName + ' ' + value.lastName;
    return result;
  }
}
