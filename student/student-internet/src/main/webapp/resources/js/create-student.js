// #############################
// VARIABLES
// #############################
var saveUrl = "student/create";
var readUrl = "student/findAll";
var deleteUrl = "student/delete";
var updateUrl = "student/update";
var clearBtn = $("#clear");
var addBtn = $("#add");
var token = "";
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
                formatter: operateFormatter,
                events: operateEvents
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

    if (isValidStudent()) {
        var gatheredData = getData();
        msg = $("#add").html();
        checkStatus(gatheredData, msg);
    } else {
        focusInvalid();
    }

});
clearBtn.click(function () {

    validator.resetForm();

    $("#stu-no").prop("readonly", false);
    $("#add").html("Save");

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
            'X-CSRF-TOKEN': token
        },
        data: data,
        success: function (data) {
            if (data.success === "true") {
                showSaveMsg(data.result, "Entry saved!, student Id is");
            } else {
                showErrorMsg("Error", data.result);
            }

        },
        error: function () {
            alert("Failed to load ");
        }
    });
}

function ajaxData(url, type, data) {
    $.ajax({
        type: type,
        url: url,
        async: false,
        headers: {
            'X-CSRF-TOKEN': token
        },
        data: data,
        success: function (data) {
            if (data.success === "true") {
                showSaveMsg(data.result, "Entry deleted!");
            } else {
                showErrorMsg("Error", data.result);
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
            'X-CSRF-TOKEN': token
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


window.operateEvents = {
    'click .edit': function (e, value, row, index) {

        console.log(row);
        //set data for update  
        $("#admission").val(row.admissionDate);
        $("#stu-no").val(row.studentId);
        $("#stu-no").prop("readonly", true);
        $("#gender").val(row.gender);
        $('#is-enrolled').val(row.enrolledStatus);
        $('#first-name').val(row.firstName);
        $('#middle-name').val(row.middleName);
        $('#last-name').val(row.lastName);
        $('#dob').val(row.dob);
        $("#personal-add1").val(row.address);
        $("#contact-1").val(row.contact);
        $("#description").val(row.description);
        $("#add").html("Update");
    },
    'click .remove': function (e, value, row, index) {
        BootstrapDialog.show({
            title: 'Delete Message',
            type: BootstrapDialog.TYPE_SUCCESS,
            message: "Are you sure you want to delete the data?",
            buttons: [{
                    label: 'Yes',
                    cssClass: 'btn-success',
                    action: function (dialog) {
                        console.log(row);
                        var data = manualSerialize(getDeleteData(row));
                        ajaxData(deleteUrl, "POST", data, token);
                        $('#student-table').bootstrapTable('load', ajaxDataAll(readUrl, "GET", token));
                        dialog.close();
                    }
                }, {
                    label: 'Cancel',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
        });
    }
};


function checkStatus(gatheredData, msg) {

    if (msg === "Update") {

        serializedData = manualSerialize(gatheredData);
        saveData(updateUrl, "POST", serializedData);
        loadData();
    }
    else if (msg === "Save") {

        serializedData = manualSerialize(gatheredData);
        saveData(saveUrl, "POST", serializedData);
        loadData();
    }

}

$('#admission').datepicker({
    autoclose: true,
    startView: 3,
    fomat: 'MM/dd/yyyy',
    forceParse: true
});
$("#admission").change(function () {
    var validator = $("#form-student-details").validate();
    validator.element("#admission");
});
$('#dob').datepicker({
    autoclose: true,
    startView: 3,
    fomat: 'MM/dd/yyyy',
    forceParse: true
});
$("#dob").change(function () {
    var validator = $("#form-student-details").validate();
    validator.element("#dob");
});
//##########manual serialize #####################
function manualSerialize(data) {
    var objectItem = {};
    for (var i in data) {
        objectItem[data[i].colomn] = data[i].value;
    }
    return objectItem;
}

function getDeleteData(row) {
    var data = [{
            colomn: "studentId",
            value: row.studentId
        }];
    return data;
}

function showSaveMsg(Id, msg) {
    dialogInstance = new BootstrapDialog();
    dialogInstance.setTitle('Save Message');
    dialogInstance.setMessage(msg + " " + Id);
    dialogInstance.setType(BootstrapDialog.TYPE_SUCCESS);
    dialogInstance.open();
    setTimeout(function () {
        //load Data
        loadData();
        //trigger #clear button
        clearBtn.click();
        $('#add').html('Save');
        dialogInstance.close();
    }, 3000);
}

function showErrorMsg(title, message) {
    BootstrapDialog.show({
        title: title,
        message: message,
        type: BootstrapDialog.TYPE_DANGER,
        buttons: [{
                label: 'OK',
                action: function (dialog) {
                    dialog.close();
                }
            }]
    });
}