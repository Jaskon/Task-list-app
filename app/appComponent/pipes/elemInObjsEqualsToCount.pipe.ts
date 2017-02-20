import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'elemInObjsEqualsToCount',
    pure: false
})
export class elemInObjsEqualsToCountPipe implements PipeTransform {
    transform(collection: any[], key: any, value: any): number {
        var count = 0;

        collection.forEach(function(item) {
            if (item[key] === value) {
                count++;
            }
        });

        return count;
    }
}