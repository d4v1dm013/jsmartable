$.fn.jsmartable = function(options){

    var settings = $.extend({
        breakpoint: {
            xs: 480,
            sm: 576,
            md: 992,
            lg: 1200,
            xlg: 1400,
        },
        iconPlus: '<i class="fa fa-plus text-info"></i>',
        iconMinus: '<i class="fa fa-minus text-danger"></i>',
        allExpended: false
    }, options);

    var tableSelector = this;

    $(window).resize(function() { 
        responsiveTable();
    }); 

    responsiveTable();

    function responsiveTable() {
        
        var screenSize = $(window).width();

        tableSelector.each(function(){

            var table = $(this);

            //all expanded
            var allExpanded = table.data('all-expanded');

            //If not defined in data we get settings from options
            if((typeof allExpanded == "undefined")) {
                allExpanded = settings.allExpended;
            }

            //Count nb cols has defined with data-breakpoint
            var th = table.find("thead tr:first th[data-breakpoint]");
            var totalColumns = th.length;

            //Return false if no column found
            if(totalColumns <= 0)
                return false

            //Get all rows contain in tbody
            var rows = table.find("> tbody > tr").not( ".jsmartable-row" );

            //loop all row to add a row responsive
            rows.each(function(index) {

                var row = $(this);
                var td = row.find("td");

                var formated = row.data('formated');

                //allow to expend automatically a row
                var expanded = row.data('expanded');

                var html = `<table class="jsmartable-subtable table table-bordered">
                                <tbody>`;

                var totalElement = 0;
                for(i=0;i<th.length;i++) {

                    //get current th information
                    var currentTh = th.eq(i);
                    var columnPosition = currentTh.prop("cellIndex")+1;
                    var breakpoint = currentTh.data('breakpoint');

                    //get current td information
                    var currentTd = row.find("td:nth-child("+(columnPosition)+")");
                    

                    //Allow to use a custom title instead of th
                    var title = currentTd.data('title');
                    if(typeof title == "undefined" || title == "") {
                        title = currentTh.html();
                    }

                    //Check if tf column exist at specified position
                    if(currentTd <= 0) {
                        console.log('TD Column ' + columnPosition + ' not found');
                        return false;
                    }

                    if(settings.breakpoint[breakpoint] != "undefined" && settings.breakpoint[breakpoint] >= screenSize) {
        
                        html += `<tr class="jsmartable-subrow">
                            <td class="jsmartable-subcol" style="width:30%; background:#eee;">${title}</td>
                            <td class="jsmartable-subcol">${currentTd.html()}</td>
                        </tr>`;

                        //Hide column selected
                        currentTh.hide();
                        currentTd.hide();
                        
                        totalElement++;
                    }
                    else {

                        //show column selected
                        currentTh.show();
                        currentTd.show();
                    }
                }

                html += `
                    </tbody>
                </table>`;

                if(typeof formated == "undefined" && totalElement > 0) { //Create jsmartable

                    row.data('formated', true);

                    row.after(`<tr id="jsmartable-row-${index}" class="jsmartable-row">
                        <td colspan='100%' class="jsmartable-col">
                            ${html}
                        </td>
                    </tr>`);

                    var buttonIcon = settings.iconMinus;
                    if((typeof expanded == "undefined" || expanded == false) && (typeof allExpanded == "undefined" || allExpanded == false)) {
                        $("#jsmartable-row-"+index).hide();
                        buttonIcon = settings.iconPlus;
                    }
                    
                    //Add button collapse
                    $("#jsmartable-row-"+index).prev().find('td:visible').first().prepend(`<a href='javascript:void(0);' class="mr-2 jsmartable-collapse" data-opened="true">${buttonIcon}</a>`);
                }
                else if(formated && totalElement > 0) { //update jsmartable

                    $('#jsmartable-row-'+index+' > td').html(html);
                }
                else if(totalElement <= 0) { //Remove jsmartable

                    row.removeData('formated');

                    $("#jsmartable-row-"+index).remove();

                    //remove button collapse
                    $(".jsmartable-collapse").remove();
                }
            });
        });
    }

    //Event collapse on click to open or close jsmartable
    $('body').on('click', '.jsmartable-collapse', function() {

        var $this = $(this);
        var jsmartableRow = $this.closest("td").closest("tr").next();

        //if Row is visible
        if (jsmartableRow.is(':visible')) {

            //hide row
            jsmartableRow.fadeOut("fast");
            
            //change the icon to plus
            $this.html(settings.iconPlus);
        } else {

            //show row
            jsmartableRow.fadeIn();

            //change the icon to minus
            $this.html(settings.iconMinus);
        }
    });
};

$(".jsmartable").jsmartable();