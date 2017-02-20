import '@angular/common';
import '@angular/compiler';
import '@angular/core';
import '@angular/forms';
import '@angular/http';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/router';
import '@angular/upgrade';
import 'angular-in-memory-web-api';
//import 'systemjs';
import 'core-js';
import 'rxjs/Rx';
import 'zone.js';

/*browserify -r @angular/common -r @angular/compiler -r @angular/core
 -r @angular/forms -r @angular/http -r @angular/platform-browser
 -r @angular/platform-browser-dynamic -r @angular/router -r @angular/upgrade
 -r angular-in-memory-web-api -r core-js -r rxjs/Rx -r zone.js
 app/vendors.ts -p [tsify] > bundle_vendors.js*/