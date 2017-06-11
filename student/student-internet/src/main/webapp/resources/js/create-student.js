// #############################
// VARIABLES
// #############################
var saveUrl = "student/create";
var readUrl = "student/findAll";

var clearBtn = $("#clear");
var addBtn = $("#add");


//#############################
//INITIALIZATION
//#############################

document.title = "Student Form";

function initTable() {
    table = $('#student-table').bootstrapTable({
        method: 'get',
        url: '',
        cache: false,
        height: 300,
        search: true,
        striped: true,
        pagination: true,
        showColumns: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        minimumCountColumns: 2,
        clickToSelect: true,
        columns: [{
                field: 'studentId',
                title: 'Student Id',
                align: 'left',
                valign: 'bottom',
                sortable: true
            }, {
                field: 'fullName',
                title: 'Student Name',
                class: "wordbreak",
                align: 'left',
                valign: 'bottom',
                sortable: true
            }, {
                field: 'action',
                title: 'Edit',
                align: 'left',
                valign: 'bottom',
                sortable: true,
                formatter: operateFormatter

            }]
    });
}

//#############################
//LOADINGS
//#############################
$(document).ready(function () {
    //intilizing table
    initTable();
    loadData();
});


function loadData() {
    //Loads from database
    data = ajaxDataAll(readUrl, "GET");
    console.log(data);
    //Loading database data to bootstrap table
    table.bootstrapTable('load', data);

}

//#############################
//GETTER & SETTER
//#############################
function getData() {
    allData = [{
            colomn: "admission",
            value: $("#admission").val()
        }, {
            colomn: "stu-no",
            value: $("#stu-no").val()
        }, {
            colomn: "gender",
            value: $("#gender").val()
        }, {
            colomn: "is-enrolled",
            value: $('#is-enrolled').val()
        }, {
            colomn: "first-name",
            value: $('#first-name').val()
        }, {
            colomn: "middle-name",
            value: $('#middle-name').val()
        }, {
            colomn: "last-name",
            value: $('#last-name').val()
        }, {
            colomn: "dob",
            value: $('#dob').val()
        }, {
            colomn: "personal-add",
            value: $("#personal-add1").val()
        }, {
            colomn: "contact",
            value: $("#contact-1").val()
        }, {
            colomn: "description",
            value: $("#description").val()
        }];
    return allData;

}

//#############################
//EVENTS
//#############################
addBtn.click(function () {
  
    var gatheredData = getData();
    serializedData = manualSerialize(gatheredData);
    saveData(saveUrl, "POST", serializedData);

});

clearBtn.click(function () {


});

//#############################
//AJAX
//#############################
function saveData(url, type, data) {
    $.ajax({
        type: type,
        url: url,
        async: false,
        headers: {
        },
        data: data,
        success: function (data) {
            if (data.success === "true") {
                showSaveMsg(data.result);
            } else {
                showErrorMsg("Error", data.errorMessage);
            }

        },
        error: function () {
            alert("Failed to load ");
        }
    });
}


function ajaxDataAll(url, type) {
    var returnData = null;
    $.ajax({
        type: type,
        url: url,
        async: false,
        headers: {
        
        },
        success: function (data) {
            returnData = data;
        },
        error: function () {
            alert("Failed to load ");
        }
    });

    return	returnData;
}


//#############################
//Other Events
//#############################
function operateFormatter(value, row, index) {
    return [
        '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
        '<i class="glyphicon glyphicon-pencil"></i>',
        '</a>',
        '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-trash"></i>',
        '</a>'
    ].join('');
}

$('#admission').datepicker({
    autoclose: true,
    startView: 3,
    fomat: 'MM/dd/yyyy',
    forceParse: true
});

$('#dob').datepicker({
    autoclose: true,
    startView: 3,
    fomat: 'MM/dd/yyyy',
    forceParse: true
});

//##########manual serialize #####################
function manualSerialize(data) {
    var objectItem = {};
    for (var i in data) {
        objectItem[data[i].colomn] = data[i].value;
    }
    return objectItem;
}