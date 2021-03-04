import {Pipe, PipeTransform} from '@angular/core';

/*
 * Capitalize the first letter of the string
 * Takes a string as a value.
 * Usage:
 *  value | capitalizeFirst
 * Example:
 *  // value.name = tommy
 *  {{ value.name | capitalizeFirst  }}
*/
@Pipe({
    name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {
    transform(value: string): string {
        if (value === null || value === undefined) {
            return 'Not assigned';
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}
