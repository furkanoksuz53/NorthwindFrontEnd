import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rentalpipe'
})
export class RentalpipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
