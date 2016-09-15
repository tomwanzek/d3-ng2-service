# D3 Service for Angular 2

[![Build Status](https://travis-ci.org/tomwanzek/d3-ng2-service.svg?branch=master)](https://travis-ci.org/tomwanzek/d3-ng2-service)

## Content

* [Introduction](#introduction)
* [Scope of D3 Functionality](#scope-of-d3-functionality)
* [Intended Use](#intended-use)
* [Installation](#installation)
* [Usage](#usage)
* [Demo Project](#demo-project)

## Introduction

[**D3**](https://github.com/d3/d3), [Mike Bostock](https://github.com/mbostock)’s famed data visualization tool, has recently undergone a major overhaul. Similarly, [**Angular 2**](https://github.com/angular/angular) is a material departure from its predecessor.

The newly released **D3 version 4** has been completely modularized and seen enhancements, which make it all the more powerful, yet easy to use.

Amongst the many changes coming with **Angular 2**, the native support for developing at scale in TypeScript and the overhauled componentized structure are but two.

Combining the power of **D3 version 4** and **Angular 2** can be challenging at first. The intent of this package is to provide a simple way to access **D3** as an **Angular 2 service** for use by components requiring the kind of sophisticated visualization support D3 excels at.
The package includes TypeScript 2 definitions to improve development experience and code maintainability.

## Scope of D3 Functionality

As this package is designed for use with **Angular 2**, it does not strictly mirror the functionality scope included in the [_D3 Standard Bundle_](https://github.com/d3/d3).

The [_d3-request_](https://github.com/d3/d3-request) module has been **omitted** as a design choice given the feature set of **Angular 2**.

The functionality enhancements provided by the now separate [_d3-selection-multi_](https://github.com/d3/d3-selection-multi) module have been included for added convenience.

## Intended Use

This package was designed to quickly add **D3 version 4** support to an **Angular 2** application, such as those created with **angular-cli**.

As is clear from the D3 scope described above, there may be circumstances, where a smaller or larger D3 feature set may be better suited.
In such cases reviewing the TypeScript source code in the [package's Github repo](https://github.com/tomwanzek/d3-ng2-service) may serve as a starting point for a more tailored solution.

## Installation

To include the package into your **Angular 2** project, simply use the standard npm package installation command:

```
npm install d3-ng2-service --save
```

Please note that, the package has a _peer dependency_ on **@angular/core**.

## Usage

Once the module `d3-ng2-service` has been added to a project as described above, it provides the following importable exports:

* `D3Service`: The Angular 2 D3 Service injectable,
* `D3`: A TypeScript type alias for the `d3` variable which can be obtained from the `D3Service`, and
* the various TypeScript interfaces and type aliases which are related to the D3 modules constituting `d3` as provided by this service (e.g. `Selection`, `Transition`, `Axis`). 

To obtain the `d3` object from an injected D3 service `d3Service: D3Service`, it offers a method `d3Service.getD3()` with return type `D3`. 

The below code snippets assume the use of TypeScript.

### Step 1 - Registering the Service with an Angular 2 Module

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

### Step 2 - Using the Service with an Angular 2 Component

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
