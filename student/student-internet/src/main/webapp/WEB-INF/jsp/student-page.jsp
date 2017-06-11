<!--########################## Main Header ###########################-->
<%@include file="template/main/header.jsp"%>

<!-- ############# PAGE TITLE ############# -->
<style>
    .form-horizontal .radio {
        margin-top: 7px;
        margin-left: -10px;
    }
    .form-custom label.control-label.radio {
        padding-left: 20px;
    }
    #checkboxDiv .checkbox label {
        padding-left: 0;
    }
    .level-names{
        padding-top: 8px;
    }
</style>
<script>
    document.title = "MISY Myanmar International School - Subject Form";
</script>


<!-- ############# CONTENT ############# -->
<div class="row">
    <div class="col-sm-12">
        <h2 class="form-heading">Student Details</h2>
    </div>
</div>

<form class="form-horizontal form-custom" id="form-module-details" role="form">
    <div class="row">
        <div class="col-sm-6">
            <div class="form-section">
                <h3 class="form-subheading">Personal Details</h3>

                <div class="form-group">
                    <label class="control-label col-sm-2 col-md-3 is-required"
                           for="admission">Admission Date</label>
                    <div class="col-sm-10 col-md-9">
                        <div class="input-group date">
                            <input type="text" class="form-control dob-datepicker other" 
                                   id="admission" name="admission" data-date-format="mm/dd/yyyy"  /> <span
                                   class="input-group-addon"> <span
                                    class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>


                <div class="form-group">
                    <label class="control-label col-sm-2 col-md-3"
                           for="ref-no">Student Number</label>
                    <div class="col-sm-10 col-md-9">
                        <input type="text" class="form-control stringNumberValClass other" maxlength="30"
                               id="stu-no" name="stu-no"
                               placeholder="Student Number">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2 col-md-3 is-required"
                           for="gender">gender</label>
                    <div class="col-sm-10 col-md-9">
                        <select class="form-control other" id="gender" name="gender">
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2 col-md-3 is-required"
                           for="is-enrolled">Enrolment Status</label>
                    <div class="col-sm-10 col-md-9">
                        <select class="form-control other" id="is-enrolled" name="is-enrolled"
                                placeholder="Is Enrolled">
                            <option>Is Enrolled</option>
                            <option>Withdrawn</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2 col-md-3 is-required "
                           for="first-name">First Name</label>
                    <div class="col-sm-10 col-md-9">
                        <input type="text" class="form-control  other"
                               id="first-name" name="first-name" placeholder="First Name"
                               maxlength="30">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2 col-md-3" for="middle-name">Middle
                        Name</label>
                    <div class="col-sm-10 col-md-9">
                        <input type="text" class="form-control  other"
                               id="middle-name" placeholder="Middle Name" maxlength="30">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2 col-md-3 is-required"
                           for="last-name">Last Name</label>
                    <div class="col-sm-10 col-md-9">
                        <input type="text" class="form-control lastNameVal other"
                               id="last-name" name="last-name" placeholder="Last Name"
                               maxlength="30">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2 col-md-3 is-required"
                           for="dob">DOB</label>
                    <div class="col-sm-10 col-md-9">
                        <div class="input-group date">
                            <input type="text" class="form-control dob-datepicker other"
                                   id="dob" name="dob" data-date-format="mm/dd/yyyy" /> <span
                                   class="input-group-addon"> <span
                                    class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-3 is-required" for="add1">Street
                        Address 1</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control other" id="personal-add1"
                               name="personal-add1" placeholder="Street Address 1" maxlength="250">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-3 is-required"
                           for="phone-number">Mobile Number 1</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control  tpnumberValClass other" id="contact-1"
                               name="contact-1" placeholder="Mobile Number 1" maxlength="15">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-3 " for="results">Description</label>
                    <div class="col-sm-9">
                        <textarea class="form-control" rows="8" id="description" maxlength="1000" placeholder="Description" style="resize:none"></textarea>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9 text-right">
                    <button id="clear" type="reset" class="btn-custom btn-cancel">Clear</button>
                    <button id="add" type="button" class="btn-custom btn-primary">Save</button>
                </div>
            </div>
        </div>


        <div class="col-sm-6">
            <div class="form-section">
                <h3 class="form-subheading">Students</h3>
                <div class="form-group">
                    <div class="col-sm-12">
                        <div class="wr-bootstrap-table student-table">
                            <table id="student-table" class="form-table"></table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</form>


</div>
<!-- ############# /CONTENT ############# -->
<%@include file="template/main/footer.jsp"%>
<script src="${pageContext.servletContext.contextPath}/resources/js/create-student.js"></script>


