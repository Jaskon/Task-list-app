import { Pipe, PipeTransform } from '@angular/core';

// Filter that check if there is no another values with this key
// in this collection
@Pipe({
    name: 'objsVariableEqualsTo',
    pure: false
})
export class objsVariableEqualsToPipe implements PipeTransform {
    transform(collection: any[], key: any, value: any): any[] {

        var resColl: any[] = [];

        collection.forEach(function(item) {
            if (item[key] === value) {
                resColl.push(item);
            }
        });

        return resColl;
    }
}