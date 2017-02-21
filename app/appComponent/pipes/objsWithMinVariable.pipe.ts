import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'objsWithMinVariable',
    pure: false
})
export class objsWithMinVariablePipe implements PipeTransform {
    transform(collection: any[], key: any): any[] {
        if (collection[0] == undefined)
            return collection;

        var min = collection[0][key];
        var i;

        for (i = 1; i < collection.length; i++) {
            if (collection[i][key] < min) {
                min = collection[i][key];
            }
        }

        var objs = [];
        for (i = 0; i < collection.length; i++) {
            if (collection[i][key] === min) {
                objs.push(collection[i]);
            }
        }

        return objs;
    }
}