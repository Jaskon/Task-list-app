import { Pipe, PipeTransform } from '@angular/core';

// Filter that check if there is no another values with this key
// in this collection
@Pipe({
    name: 'isUnique'
})
export class isUniquePipe implements PipeTransform {
    transform(collection: any[], key: any, value: any): boolean {
        var count = 0;

        collection.forEach(function(item) {
            if (item[key] === value) {
                count++;
            }
        });

        // 1 - itself
        return count > 1 ? false : true;
    }
}