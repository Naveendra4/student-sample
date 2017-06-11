<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<style>



    #calendar {
        max-width: 900px;
        margin: 0 auto;
    }

</style>
<html lang="en" moznomarginboxes mozdisallowselectionprint>

    <head>
        <meta charset="utf-8">
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="${pageContext.servletContext.contextPath}/resources/images/faviconfc.jpg" type="image/x-icon">
        <link rel="icon" href="${pageContext.servletContext.contextPath}/resources/images/faviconfc.jpg" type="image/x-icon">


        <link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/libs/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/libs/jquery/jquery-ui.css" type="image/x-icon">
        <link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/libs/font-awesome/css/font-awesome.css">
        <link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-dialog/css/bootstrap-dialog.min.css">
        <link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-table/css/bootstrap-table.css">
        <!--<link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-table/css/bootstrap-table.min.css">-->
        <link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/libs/jPushMenu/css/jPushMenu.css">
        <link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
        <link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-input/css/fileinput.min.css">
        <link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-combobox/css/bootstrap-combobox.css">
        <link rel="stylesheet" type="text/css" href="${pageContext.servletContext.contextPath}/resources/libs/dragula/css/dragula.css">
        <link rel="stylesheet" href="${pageContext.servletContext.contextPath}/resources/css/main.css">
        <link rel="stylesheet" href="${pageContext.servletContext.contextPath}/resources/css/theme.css">

        <!--<script src="${pageContext.servletContext.contextPath}/resources/libs/jquery/jquery-1.10.2.js"></script>-->
        <script src="${pageContext.servletContext.contextPath}/resources/libs/jquery/jquery-1.10.2-min.js"></script>
        <script src="${pageContext.servletContext.contextPath}/resources/libs/bootstrap/js/bootstrap.min.js"></script>
        <script src="${pageContext.servletContext.contextPath}/resources/libs/jquery/jquery-ui.min.js"></script>
        <script src="${pageContext.servletContext.contextPath}/resources/libs/jquery/jquery.ui.widget.js"></script>
        <script src="${pageContext.servletContext.contextPath}/resources/libs/jquery/jquery.maskedinput.min.js"></script>
        <script src="${pageContext.servletContext.contextPath}/resources/libs/jquery/jquery.fileupload.js"></script>

        <script src="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-table/js/bootstrap-table.js"></script>
        <!--<script src="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-table/js/bootstrap-table.min.js"></script>-->
        <script src="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-dialog/js/bootstrap-dialog.min.js"></script>
        <script src="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>        
        <script src="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-input/js/fileinput.min.js"></script>
        <script src="${pageContext.servletContext.contextPath}/resources/libs/jPushMenu/js/jPushMenu.js"></script>
        <script src="${pageContext.servletContext.contextPath}/resources/libs/jquery-validation/js/jquery.validate.min.js"></script>
        <script src="${pageContext.servletContext.contextPath}/resources/libs/bootstrap-combobox/js/bootstrap-combobox.js"></script>
        <!--<script src="${pageContext.servletContext.contextPath}/resources/libs/dragula/js/dragula.js"></script>-->
        <script src="${pageContext.servletContext.contextPath}/resources/libs/dragula/js/dragula-min.js"></script>
                <script src="${pageContext.servletContext.contextPath}/resources/libs/jquery-validation/js/additional-methods.min.js"></script>

    </head>


            <!-- ############# /HEADER ############# -->