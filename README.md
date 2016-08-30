# D3 Service for Angular 2

## Background

**D3**, Mike Bostock’s famed data visualization tool, has recently undergone a major overhaul. Similarly, **Angular 2** is a material departure from its predecessor.

The newly released **D3 version 4** has been completely modularized and seen enhancements, which make it all the more powerful, yet easy to use.

Amongst the many changes coming with **Angular 2**, the native support for developing at scale in TypeScript and the overhauled componentized structure are but two.

Combining the power of **D3 version 4** and **Angular 2** can be challenging at first. The intent of this package is to provide a simple way to access **D3** as an **Angular 2 service** for use by components requiring the kind of sophisticated visualization support D3 excels at.
The package includes TypeScript 2 definitions to improve development experience and code maintainability.

## Scope of D3 Functionality

As this package is designed for use with **Angular 2**, it does not strictly mirror the functionality scope included in the _D3 Standard bundle_.

Rather it comprises the functionality obtained when combining the modules included in the _D3 Standard bundle_ **with the exception of**:
* _d3-request_, and
* _d3-dsv_.

In addition, however, this package supports the functionality provided by the now separate _d3-selection-multi_ module.

_d3-request_ has been omitted as a design choice given the feature set of **Angular 2**.

_d3-dsv_ is _currently_ not included due to an external dependency on the in progress migration of new TypeScript definitions for _d3-dsv_ into **DefinitelyTyped** and by implication the **npm @types** organization. 

## Inteded Use

This package was designed to quickly add **D3 version 4** support to an **Angular 2** application, such as those created with **angular-cli**. 

As is clear from the D3 scope described above, there may be circumstances, where a smaller or larger D3 feature set may be better suited.
In such cases reviewing the TypeScript source code in the package's Github repo may serve as a starting point for a more tailored solution.

## Installation

To include the package into your **Angular 2** project, simply use the standard npm package installation command:

```
npm install d3-ng2-service --save
```

Please note, that the package has _peer dependencies_ on **@angular/core** and its respective peer dependencies. The versioning of the peer dependencies is geared to match those of latest **angular-cli** version.

## Usage

Once the module `d3-ng2-service` has been added to a project as described above, it provides the following importable exports:
The below code snippets assume the use of TypeScript.
* `D3Service`: The Angular 2 D3 Service injectable,
* `D3`: A TypeScript type alias for the `d3` variable which can be obtained from the `D3Service`, and
* the various TypeScript interfaces and type aliases which support work the use of `d3` (e.g. `Selection`, `Transition`, `Axis`). 

To obtain the `d3` object from an injected D3 service `d3Service: D3Service`, it offers a method `d3Service.getD3()` with return type `D3`. 



### Example 1 - Registering the Service with an Angular 2 Module

Import the **Angular 2 service** and register it as a **provider with an Angular 2 module**.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { D3Service } from 'd3-ng2-service'; // <-- import statement


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [D3Service], // <-- provider registration
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
```

### Example 2 - Registering and Using the Service with an Angular 2 Component

Import the **Angular 2 service** and register it as a **provider with an Angular 2 component**.
Then pass the service into the _component constructor_ together with `ElementRef`. Obtain `d3` from the **D3 service** and use it to perform the required tasks.

```
import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service'; // <-- import the D3 Service, the type alias for the d3 variable and the Selection interface

@Component({
  selector: 'app-test-d3',
  templateUrl: 'test-d3.component.html',
  styleUrls: ['test-d33.component.css'],
  providers: [D3Service] // <-- Register the provider
})
export class TestD3Component implements OnInit {

  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private parentNativeElement: any;

  constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    let d3 = this.d3; // <-- for convenience use a block scope variable
    let d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)

// ...

    if (this.parentNativeElement !== null) {

      d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method 

      // Do more D3 things 

    }
  }

}
```

## Related Example

For a more complete worked example of how this module can be used in an angular-cli created D3 Demo App, please see: 
* [tomwanzek/d3v4-ng2-demo](https://github.com/tomwanzek/d3v4-ng2-demo)
