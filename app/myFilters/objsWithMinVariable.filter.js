angular.module('myFilters.objsWithMinVariable', []).
filter('objsWithMinVariable', function() {
	return function(collection, key) {
		if (collection[0] == undefined)
			return collection;

		var min = collection[0][key];

		for (let i = 1; i < collection.length; i++) {
			if (collection[i][key] < min) {
				min = collection[i][key];
			}
		}

		var objs = [];
		for (let i = 0; i < collection.length; i++) {
			if (collection[i][key] === min) {
				objs.push(collection[i]);
			}
		}

		return objs;
	};
});