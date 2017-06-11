var studentDetailsForm = $("#form-student-details");

var validator = studentDetailsForm.validate({
    ignore: ".ignore",
    // Specify the validation rules
    rules: {
        // Personal Details
        "admission": {
            required: true
        },
        "stu-no": {
            required: true
        },
        "first-name": {
            required: true
        },
        "last-name": {
            required: true
        },
        "dob": {
            required: true
        }

    },
    // Specify the validation error messages
    messages: {
        // Personal Details
        "admission": {
            required: "Please select admission date"
        },
        "stu-no": {
            required: "Please enter student number"
        },
        "first-name": {
            required: "Please enter first name"
        },
        "last-name": {
            required: "Please enter last name"
        },
        "dob": {
            required: "Please select date of birth"
        }


    }
});

function isValidStudent() {
    return studentDetailsForm.valid();
}

function focusInvalid() {
    validator.focusInvalid();
}


function cancelValidation() {
    validator.resetForm();
}


