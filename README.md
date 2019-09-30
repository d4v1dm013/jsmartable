# JSmartable

> Jquery free plugin to provide dynamic collapsable responsive table

## Getting Started

### Quick start
JSmartable is a Jquery free plugin to provide dynamic collapsable responsive table. You can choose a specific breakpoint 
for each column you want to hide sor the specified breakpoint. It's very simple to use, and requires only jQuery v1.9.1+, 
Bootstrap CSS and Fontawesome v4 or v5.

Several quick start options are availables:

* Clone the repo: **git clone https://github.com/d4v1dm013/jsmartable**
* Install with npm: **npm install jsmartable**
* Install with yarn: **yarn add jsmartable**

### Demo
Demo : https://jsmartable.zestededev.com/

## Usage

You have to create a table with a **thead** and **tbody** section. For the plugin to work you must specify the for each **th** contained in the **thead** section the **data-breakpoint** you want to apply.

Below the list of possible breakpoint (you can mix different breakpoint in your **thead**) :

* **xs**: <= 480px
* **sm**: <= 576px
* **md**: <= 992px
* **lg**: <= 1200px
* **xlg**: <= 1400px

```html
<table class="table jsmartable">
    <thead>
        <tr>
            <th data-breakpoint="lg">ID</th>
            <th data-breakpoint="lg">1 Column</th>
            <th>2 Column</th>
            <th data-breakpoint="md">3 Column</th>
            <th data-breakpoint="md">4 Column</th>
            <th data-breakpoint="md">Lastname</th>
            <th data-breakpoint="xs">Firstname</th>
            <th data-breakpoint="xs">Title</th>
            <th data-breakpoint="lg">Description</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ...
    </tbody>
</table>
```

#### Via jsmartable class

Add the **jsmartable** class to your table to auto-initialize Jsmartable and configure each colunm to the specified breakpoint

```html
<table class="table jsmartable">
    <thead>
        <tr>
            ...
        </tr>
    </thead>
    <tbody>
        ...
    </tbody>
</table>
```

#### Via JavaScript

```javascript
// To style only selects with the my-custom-table class
 $('.my-custom-table').jsmartable();
```

or

```javascript
// To style all table
 $('table').jsmartable();
```

## Options

You can customize some options if you want, below list of the possible options :


**allExpended** : Boolean `true` or `false`
*allow to open all lines by default*

**breakpoint** : `array` breakpoint: {  
	xs: `int` 480 by default,  
	sm: `int` 576 by default,  
	md: `int` 992 by default,  
	lg: `int` 1200 by default,  
	xlg: `int` 1400 by default,  
}
*allow to change the breakpoint options*

**iconPlus**: Code HTML, for exemple `<i class="fas fa-plus text-info"></i>`
*allow to change the plus icon*

**iconMinus** : Code HTML, for exemple `<i class="fas fa-minus text-info"></i>`
*allow to change the minus icon*

```javascript
// To style only selects with the my-custom-table class
$('.my-custom-table').jsmartable(
    breakpoint: {
        xs: 480,
        sm: 576,
        md: 992,
        lg: 1200,
        xlg: 1400,
    },
    iconPlus: '<i class="fas fa-plus text-info"></i>',
    iconMinus: '<i class="fas fa-minus text-info"></i>',
    allExpended: false
);
```

You can also open only some rows by default, for example the first row

```html
    <thead>
        <tr>
            ...
        </tr>
    </thead>
    <tbody>
        <tr data-opened="true">
            ...
        </tr>
            ...
    </tbody>
</table>
```