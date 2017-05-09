# D3 Service for Angular 2+

[![Build Status](https://travis-ci.org/tomwanzek/d3-ng2-service.svg?branch=master)](https://travis-ci.org/tomwanzek/d3-ng2-service)

## Content

* [Introduction](#introduction)
* [Intended Use](#intended-use)
* [Scope of D3 Functionality](#scope-of-d3-functionality)
* [Installation](#installation)
* [Usage](#usage)
* [Demo Project](#demo-project)

## Introduction

[**D3**](https://github.com/d3/d3), [Mike Bostock](https://github.com/mbostock)’s famed data visualization tool, underwent a major overhaul with version 4. Similarly, [**Angular 2**](https://github.com/angular/angular) was a material departure from its predecessor.

With the release of version 4, **D3** has been completely modularized and seen enhancements, which make it all the more powerful, yet easy to use.

Amongst the many changes since the release of **Angular 2**, the native support for developing at scale in TypeScript and the overhauled componentized structure are but two.

Combining the power of **D3** and **Angular** can be challenging at first. The intent of this package is to provide a simple way to access **D3** as an **Angular service** for use by components requiring the kind of sophisticated visualization support D3 excels at.
The package includes TypeScript 2 definitions to improve development experience and code maintainability.

## Intended Use

This package was designed to quickly add **D3** support to an **Angular** application, such as those created with the **angular-cli**.

As is clear from the D3 scope described below, there may be circumstances, where a smaller or larger D3 feature set may be better suited for a given project.
In such cases reviewing the TypeScript source code in the [package's Github repo](https://github.com/tomwanzek/d3-ng2-service) may serve as a starting point for a more tailored solution.

A suggested approach may also involve starting out with the **d3-ng2-service** for rapid prototyping. Then, once there is more stability regarding the specific, required **D3** feature set,
the D3 service pattern can be preserved by implementing the minimally viable D3 service directly in the project. This amounts to manually "treeshaking" D3 in order to preserve the
convenience of accessing **D3** functions through a `d3` object.

For those interested in using the treeshaking performed "automatically" by third party build/bundling tools, it may be better to import the minimally required **D3** functionality directly at component level. Following this strategy, may require added care to mind **D3** cross-module prototype extensions (i.e. ordering of imports) and ensuring a live-binding to `d3.event` is in place, if any functionality based on `d3.event` is used.

## Scope of D3 Functionality

As this package is designed for use with **Angular 2+**, it does not strictly mirror the functionality scope included in the [_D3 Standard Bundle_](https://github.com/d3/d3).

The [_d3-request_](https://github.com/d3/d3-request) module has been **omitted** as a design choice given the feature set of **Angular**. By implication, it is recommended to utilize e.g. the **Angular** `http` service for client/server communication. The `d3-ng2-service` package does, however, expose **D3** data parsing functionality such as `csvParse(...)`.

The functionality enhancements provided by the now separate [_d3-selection-multi_](https://github.com/d3/d3-selection-multi) module have been included for added convenience.

For a complete  list of **D3 modules** included, please refer to the `package.json` dependencies  [here](https://github.com/tomwanzek/d3-ng2-service/blob/master/package.json).
At present, included modules are provided in their entirety.

## Installation

To include the package into your **Angular** project, simply use the standard npm package installation command:

```
npm install d3-ng2-service --save
```

Please note that, the package has a _peer dependency_ on **@angular/core**.

## Usage

Once the module `d3-ng2-service` has been added to a project as described above, it provides the following importable exports:

* `D3Service`: The Angular D3 Service injectable,
* `D3`: A TypeScript type alias for the `d3` variable which can be obtained from the `D3Service`, and
* the various TypeScript interfaces and type aliases which are related to the D3 modules constituting `d3` as provided by this service (e.g. `Selection`, `Transition`, `Axis`). 

To obtain the `d3` object from an injected D3 service `d3Service: D3Service`, it offers a method `d3Service.getD3()` with return type `D3`. 

The below code snippets assume the use of TypeScript.

### Step 1 - Registering the Service with an Angular Module

Import the **Angular service** and register it as a **provider with an Angular module**.

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
    TestD3Component // <-- declaration of the D3 Test component used below
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

### Step 2 - Using the Service with an Angular Component

_Important:_ The component is declared in the same module as the `D3Service` provider has been registered.
Import the **D3 service** and then pass the service into the _component constructor_ together with `ElementRef`. Obtain `d3` from the **D3 service** and use it to perform the required tasks.

```
import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service'; // <-- import the D3 Service, the type alias for the d3 variable and the Selection interface

@Component({
  selector: 'app-test-d3',
  templateUrl: 'test-d3.component.html',
  styleUrls: ['test-d33.component.css']
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

## Demo Project

For a more complete worked example of how this module can be used in an angular-cli created D3 Demo App, please see: 
* Github repo: [tomwanzek/d3-ng2-demo](https://github.com/tomwanzek/d3-ng2-demo) and the related [_live_ Github page](https://tomwanzek.github.io/d3-ng2-demo/).
