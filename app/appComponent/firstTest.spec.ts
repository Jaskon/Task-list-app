import { 
  BrowserDynamicTestingModule, 
  platformBrowserDynamicTesting 
} from '@angular/platform-browser-dynamic/testing';

import {} from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
/*import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';*/

import 'core-js'; // ES6 + reflect-metadata
// zone.js
/*import 'zone.js';
import 'zone.js/dist/zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/async-test';
import 'zone.js/dist/jasmine-patch';*/

import { appComponent } from './app.component';

// Init platform
TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());


describe('Test unit test', function() {
    let fixture;
    let comp: appComponent;

    beforeEach((() => {
        TestBed.configureTestingModule({
            declarations: [ appComponent ]
        })
        
        fixture = TestBed.createComponent(appComponent);
        comp = fixture.componentInstance;
    }));

    it('should always return true', () => {
        expect(true).toBe(true);
    });

    it('lenght if menuList should be equals to 2', () => {
        expect(comp.menuList.length).toBe(false);
    });
});