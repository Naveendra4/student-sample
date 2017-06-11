/**
 * Created with JetBrains WebStorm.
 * User: J Jeyachanthuru
 * Date: 10/14/13
 * Time: 10:39 AM
 * To change this template use File | Settings | File Templates.
 */

		
$(function () {
	
	// checking session idle time
	$(document).mousemove(function( event ) {
		if (typeof ResetTimers == 'function'){
			ResetTimers();
		}
		});
	
	
	

})


//MODERN CHECK BOX - NOT IN USE NOW
function modernCheckBox(this_, fnct){
        var cb = this_.find("input[type=checkbox]");
        var b = this_.find("b");

        if(fnct=="onload"){
            if(cb.is(':checked')){
                b.addClass("checked")
            } else {
                b.removeClass("checked")
            }
            ftBeneficiaryCtrl(cb)
            return;
        }

        if(!cb.is(':checked')){
            cb.prop("checked", true)
            b.addClass("checked")
        } else {
            cb.prop("checked", false)
            b.removeClass("checked")
        }
}

//FUND TRANSFER BENEFICIAR SELECTOR - NOT IN USE NOW
function ftBeneficiaryCtrl(cb){
    if(cb.is(':checked')){
        $("#beneficiaryName, #beneficiaryBankName, #branchName, #beneficiaryaccountno").attr("readonly", "readonly").val("")
        $("#beneficiaryNameSelector").show();
    } else {
        $("#beneficiaryName, #beneficiaryBankName, #branchName, #beneficiaryaccountno").removeAttr("readonly").val("")
        $("#beneficiaryNameSelector").hide()
    }
}

//FUND TRANSFER BENEFICIARY DETAGET
function ftBeneficiaryDetails(id_) {

    $.ajax({
        type : "post",
        data : {'accountNo' : $(id_).val()},
        url : "personal/account/fundtransfer/registered/beneficiary/get",
        cache : false,
        success : function(data) {
        	
            $('#beneficiaryaccountno').val($(id_).val());
            $('#beneficiaryName').val(data.beneficiaryName);
            $('#beneficiaryBankName').val(data.bankName);
            $('#branchNameLbl').val(data.branchName);
            $('#branchName').val(data.branchName);
            $('#beneficiaryNameAccNum').val(data.bfNameAndAccNumber);
            $('#third-party-ceft-type').val(data.ceftAccountType);
            $('#thirdPartFundTransferType').val(data.thirdPartFundTransferType);
           // $('#ceftAccountType').val(data.ceftAccountType);
            
            $('#beneficiaryBankCode').val(data.bankCode);
		     $('#branchCode').val(data.slipBranchCode);
			 
        },
        error : function(e) {
        	console.log('Error while request.. form.js.. ftBeneficiaryDetails function');
        }
    });

}

//set currency
function setCurrency(id_){
	
	var selectedValue = $("#currency").val();
	$("#currency-value").val(selectedValue);
	
}


//UTILITY PAYMENT
function upPaymentAccountNo(accNo_, accNoList_,_async){
    var accNo_ = $(accNo_).val();
    $.ajax({
        type : "post",
        data : {
            'providerCode' : accNo_
        },
        url : "personal/payment/util/paybill/add/paymentAccountNumber",
        cache : false,
		async : _async,
        dataType : "json",
		
        success : function(response) {
            var jsonList = response;
            var listItems = "";
            for ( var i = 0; i < jsonList.length; i++) {
                listItems += "<option value='"
                    + jsonList[i].paymentAccountNumber + "'>"
                    + jsonList[i].paymentAccountNumber + "</option>";
                $(accNoList_).html(listItems);

                reBindData(accNoList_)

            }
        },
        error : function() {
        	console.log('Error while request.. form.js.. upPaymentAccountNo function');
        }
    });
}

//STANDING ORDER
function soUntillFutherNotice(cb){
    var dateRang_ = $("#endDate")
        if($(cb).prop('checked')){
            dateRang_.attr("disabled","disabled").val("")
            $(cb).val("TRUE");
        } else {
            dateRang_.removeAttr("disabled")
            $(cb).val("FALSE");
        }
}


//SECTION OF SELECT COMBO BOX
	/*
		selectControl
			- ul.dropdown-menu -> role = uneditableDropdown
			- set value to select box & dummy text box.
		selectBox
			- ul.dropdown-menu -> role = selectDropdown
			- set value to select box & dropDownSelector.
	*/



//GET SELECT BOX OPTIONS
function getSelectOptions(selector_){
	var template="";
	$(selector_).children("option").each(function(){
        template += "<li><a href='#' data-value='"+$(this).val()+"'>"+$(this).text()+"</a></li>";
        if($(this).prop("selected")){
            applySelectedValue($(this).parent().parent().find("ul[role!='']"), $(this).text())
        }
	});
	return template;
}

//APPLY SELECTED VALUE
function applySelectedValue(selector_, selectedText_){
    var role_ = selector_.attr("role")
    if(role_=="selectCtrl") {
       selector_.parent().find('input[type=text]').val(selectedText_)
    } else if(role_=="selectBox"){
        selector_.parent().find('a[data-toggle=dropdown]').text(selectedText_);
    } else {
        //alert("Selector error");
    }
}

//REBIND DATA
function reBindData(selectTagId_){
    var list_ = $(selectTagId_).parent().find("[role=selectCtrl], [role=selectBox]")
    list_.html(getSelectOptions(selectTagId_))
}

//CLICK OPTION TO SELECT
function clickOptiontoSelect(){

}

//CHECK BALANCE AND ACCOUNT STATUS ON CHANGE
function checkBalanceAndAccountStatus(this_){

	var accountID = $(this_).val();
	if(accountID!==""){
	
        $.ajax({ 
            type: "post",
            data: {'accountNumber':accountID},
            url: "personal/account/utilaccount",
            cache: false,
            success:function(response){
			
				var balance = response["currencyCode"] +" "+ parseFloat(response["availableBalance"], 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
                $(this_+"-result").html("<em>Available "+ balance);
				
                //CHECK ACCOUNT STATUS ON CHANGE
                 if((response["black_listed"] == true)){
				
				   $("#accountBlackList").removeClass("hide");
				   $("#fund-transfer-submit").hide();
                }else{
				   $("#accountBlackList").addClass("hide");
				   $("#fund-transfer-submit").show();
                }
				$("#currency").val(response["currencyCode"]);
              //  alert("This is value : ");
            }, error: function(){
                //alert('Error while request..');
            }
        });
    } else { $(this_+"-result").html("<em>...</em>"); }
}

//CHECK BALANCE AND ACCOUNT STATUS ON CHANGE
/*This is changed one because this will be used to check account type 
and set it to hidden field*/
function checkBalanceAccTypeAccountStatus(this_){
    var accountID = $(this_).val();

    if(accountID!==""){
    
        $.ajax({ 
            type: "post",
            data: {'accountNumber':accountID},
            url: "personal/account/utilaccount",
            cache: false,
            success:function(response){
            
                var balance = response["currencyCode"] +" "+ parseFloat(response["availableBalance"], 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
                $(this_+"-result").html("<em>Available "+ balance);
                $(this_+"-hiddenCurrency").val(response["currencyCode"]);
                
                //CHECK ACCOUNT STATUS ON CHANGE
                 if((response["black_listed"] == true)){
                
                   $("#accountBlackList").removeClass("hide");
                   $("#fund-transfer-submit").hide();
                }else{
                   $("#accountBlackList").addClass("hide");
                   $("#fund-transfer-submit").show();
                }
               //  alert('before'+ $("#currency").val());
                 var cur = response["currencyCode"];
                $("#currency").val(response["currencyCode"]);
              
                 var valtoprint = $("#currency").val();
                
                var valtoprint2 = $("#userAccountNumber2-hiddenCurrency").val();
             //   $("#currency").prop("disabled", false);
                $("#currency-value").val(response["currencyCode"]);
                
             //   if(valtoprint == 'LKR'){
                   $("#currency").prop("readonly", true);
            //    }

            }, error: function(){
                //alert('Error while request..');
            }
        });
    } else { $(this_+"-result").html("<em>...</em>"); }
}

//CHECK BALANCE AND ACCOUNT STATUS ON CHANGE
/*This is changed one because this will be used to check account type 
and set it to hidden field*/
function checkAvailBalanceCreditCards(this_){
    var accountID = $(this_).val();

    if(accountID!==""){
    
        $.ajax({ 
            type: "post",
            data: {'accountNumber':accountID},
            url: "personal/creditcardaccount/utilaccount",
            async : true,
            cache: false,
            success:function(response){
            
                var balance = response["currencyCode"] +" "+ parseFloat(response["availableBalanceString"], 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
                $(this_+"-result").html("<em>Available "+ balance);
                $(this_+"-hiddenCurrency").val(response["currencyCode"]);
                
                //CHECK ACCOUNT STATUS ON CHANGE
                 if((response["black_listed"] == true)){
                
                   $("#accountBlackList").removeClass("hide");
                   $("#fund-transfer-submit").hide();
                }else{
                   $("#accountBlackList").addClass("hide");
                   $("#fund-transfer-submit").show();
                }
                $("#currency").val(response["currencyCode"]);
                var valtoprint = $("#currency").val();
                var valtoprint2 = $("#userAccountNumber2-hiddenCurrency").val();
                $("#currency").prop("disabled", false);
                $("#currency-value").val(response["currencyCode"]);
                
                if(valtoprint == 'LKR'){
                   $("#currency").prop("disabled", true);
                }

            }, error: function(){
                //alert('Error while request..');
            }
        });
    } else { $(this_+"-result").html("<em>...</em>"); }
}
//CHECK BALANCE AND ACCOUNT STATUS ON CHANGE
/*This is changed one because this will be used to check account type 
and dont want to change currency in destination account selection*/
function checkBalanceNotChangeCurrency(this_){
    var accountID = $(this_).val();

    if(accountID!==""){
    
        $.ajax({ 
            type: "post",
            data: {'accountNumber':accountID},
            url: "personal/account/utilaccount",
            cache: false,
            success:function(response){
            
                var balance = response["currencyCode"] +" "+ parseFloat(response["availableBalance"], 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
                $(this_+"-result").html("<em>Available "+ balance);
                $(this_+"-hiddenCurrency").val(response["currencyCode"]);
                
                //CHECK ACCOUNT STATUS ON CHANGE
                 if((response["black_listed"] == true)){
                
                   $("#accountBlackList").removeClass("hide");
                   $("#fund-transfer-submit").hide();
                }else{
                   $("#accountBlackList").addClass("hide");
                   $("#fund-transfer-submit").show();
                }
                

            }, error: function(){
                //alert('Error while request..');
            }
        });
    } else { $(this_+"-result").html("<em>...</em>"); }
}

//CHECK BALANCE ON ONCHANGE 
function checkBalance(this_){
    var accountID = $(this_).val().split('-')[0];
    
    if(accountID!==""){
        $.ajax({ 
            type: "post",
            data: {'accountNumber':accountID},
            url: "personal/account/utilaccount",
            cache: false,
            success:function(response){
			var balance = response["currencyCode"] +" "+ parseFloat(response["availableBalance"], 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
                $(this_+"-result").html("<em>Available "+ balance);
                //CHECK ACCOUNT STATUS ON CHANGE
                 if((response["black_listed"] == true)){
				   $("#accountBlackList").removeClass("hide");
				   $("#fund-transfer-submit").hide();
                }else{
				   $("#accountBlackList").addClass("hide");
				   $("#fund-transfer-submit").show();
                }
					$("#currency").val(response["currencyCode"]);
            }, error: function(){
                //alert('Error while request..');
            }
        });
    } else { $(this_+"-result").html("<em>...</em>"); }
}

/*This change is due to LOLC changes on 23 01 2015
* @author Chinthaka Dinadasa
* Changes added more validations between two account transactions with checking currency codes.
* This is for Source Account 
* 
 * @param  {[type]} this_   [description]
 * @param  {[type]} command [This is for check what is the page that call the function because for 
 * @Registered Fund Transfer Page Have Different Configuration in checking currency for selected type,
 * If user select FRC - FRC then currency need to be LKR only.]
*/
function checkBalanceWithCurrency(this_ , command){
    var accountID = $(this_).val();

    if(accountID!==""){
    
        $.ajax({ 
            type: "post",
            data: {'accountNumber':accountID},
            url: "personal/account/utilaccount",
            async : true,
            cache: false,
            success:function(response){
            
                var balance = response["currencyCode"] +" "+ parseFloat(response["availableBalance"], 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
                $(this_+"-result").html("<em>Available "+ balance);
                $(this_+"-hiddenCurrency").val(response["currencyCode"]);
                
                //CHECK ACCOUNT STATUS ON CHANGE
                 if((response["black_listed"] == true)){                
                   $("#accountBlackList").removeClass("hide");
                   $("#fund-transfer-submit").hide();
                }else{
                   $("#accountBlackList").addClass("hide");
                   $("#fund-transfer-submit").show();
                }
                
                var currency_code = response["currencyCode"];                
                $("#currency-value").val(currency_code);
                $("#currency-source-value").val(currency_code);

               // if(currency_code == 'LKR'){
                    $("#currency").find('option').remove();                    
                    $("#currency").append('<option value="'+currency_code+'"> '+currency_code+' </option>');
                    $("#currency").prop("disabled", true);
                    $("#currency").val(currency_code);
                    /*   }else{
                    $("#currency").prop("disabled", false); 
                    $("#currency").find('option').remove();                    
                    $("#currency").append('<option value="LKR"> LKR </option>');
                    $("#currency").append('<option value="'+currency_code+'"> '+currency_code+' </option>');
                    $("#currency").val(currency_code);
                    var number2Currency = $("#currency2-value").val();
                    if(number2Currency != ''){
                        if(number2Currency != 'LKR'){
                            $("#currency").find('option').remove();
                            if(currency_code == number2Currency){
                                $("#currency").append('<option value="'+currency_code+'"> '+currency_code+' </option>');
                            }else{    
                                $("#currency").append('<option value="'+currency_code+'"> '+currency_code+' </option>');
                                $("#currency").append('<option value="'+number2Currency+'"> '+number2Currency+' </option>');
                            }
                        }
                    }
                }*/

                /**
                 * [Here it checks the requesting page whether it is Registerd or Unregistered]
                 * @param  {[type]} command [description]
                 * @return {[type]}         [description]
                 */
                if(command == '2'){
                    var accNumber = $("#AccNumberList").val();
                        if(accNumber != ''){
                            var arr = accNumber.split(' | ');
                            var accNumber_ = arr[0];
                            var selectedAccountType = arr[1];
                        if(selectedAccountType == '0'){
                            /*This is for set only LKR for other bank account*/
                            $("#currency").find('option').remove();
                            $("#currency").append('<option value="LKR">LKR</option>');
                            $("#currency-value").val("LKR");
                        }
                }
                }
                /*Check both accounts allow to transact between*/
                checkTransactionIsAllowed("#currency-source-value","#currency2-value","#transaction-not-allow");

            }, error: function(){
                //alert('Error while request..');
            }
        });
    } else { $(this_+"-result").html("<em>...</em>"); }

    //checkTransactionIsAllowed("#currency-value","#currency2-value","#transaction-not-allow");
}

//CHECK REMAINING DAILY LIMIT ON CHANGE

//set currency


//COMMON FUNCTIONS
function hasText(_text){
	
	return (_text != 'undefined' && $.trim(_text) != '' && $.trim(_text).length >0);
}

//CREATE PAGINATION
function pagination(tp_, cp_, sp_){

	if(tp_<1){ return ; } // disable pagination

    var pagination = $("#pagination");
    var nxt_btn, prv_btn, tmp="";

    //PREV BUTTON
    if((cp_-sp_) <= 1) {
        prv_btn = '<li class="disabled"><span>&laquo;</span></li>';
    } else {
        prv_btn = '<li><a href="'+(cp_-sp_-1)+'">&laquo;</a></li>';
    }

    //NEXT BUTTON
    if(cp_ >= (tp_-sp_)){
        nxt_btn = '<li class="disabled"><span>&raquo;</span></li>';
    } else {
        nxt_btn = '<li><a href="'+(cp_+sp_+1)+'">&raquo;</a></li>';
    }

    //TEMPLATING
    for (var i = (cp_-sp_); i <= (cp_+sp_); i++) {
        if(cp_==i){
            tmp += '<li class="active"><span>'+cp_+' <span class="sr-only">'+cp_+'</span></span></li>' ;
        } else if ( i > 0 && i < (tp_+1)) {
            tmp += '<li><a href="'+i+'">'+i+'</a></li>' ;
        }
    };
    
    pagination.append('<ul class="pagination">' + prv_btn + tmp + nxt_btn + '</ul>');

    $("#pagination .pagination li a").on("click", function(e){
        e.preventDefault();
        $("#pageNumber").val($(this).attr("href"));
		console.log($(this).attr("href"));
        $(".hasPagination").submit();
    })
    
   
    
}

//Beneficiary Account Register 
function fetBeneficiaryDetails(id_) {

    $.ajax({
        type : "post",
        data : {'bnk_nam' : $(id_).val()},
        url : "personal/account/fundtransfer/register/getThirdPartyBank",
        cache : false,
        success : function(data) {
            $('#bankName').val($(id_).val());
            $('#bankCode').val(data.bankCode);
            
        },
        error : function(e) {
        	console.log('Error while request.. form.js.. ftBeneficiaryDetails function');
        }
    });

}

/**
 * @author ChinthakaD@FG
 * 
 */
		

//CHECK REMAINING DAILY LIMIT ON CHANGE
function checkRemainingDailyLimit(this_,_textGroup,_beneficiaryType,_beneficiaryName){
	var fundTransferType = "OWN";
	var _thirdPartyFDType = "INTERNAL";
	var beneficiary_acc_no = $(_beneficiaryName).val();
	var _url = "personal/account/fundtransfer/own/getFundTransferDailyLimit";
	if(_beneficiaryType == "U"){
		_url = "personal/account/fundtransfer/unregistered/getFundTransferDailyLimit";
		if(_beneficiaryName == "INTERNAL"){
			fundTransferType = "OWN";			
		}else if(_beneficiaryName == "CEFT"){
			fundTransferType = "THIRD_PARTY";
			_thirdPartyFDType = "CEFT";
		}else {
			fundTransferType = "THIRD_PARTY";
			_thirdPartyFDType = "SLIP";
		}
	}else if(_beneficiaryType == "R"){
		_url = "personal/account/fundtransfer/registered/getFundTransferDailyLimit";		
	}
	
	
	var accountID = $(this_).val();
	$(_textGroup).empty();
	if(accountID!==""){	
      $.ajax({ 
          type: "post",
          data: {
					'accountNumber':accountID,
					'fundTransferType':fundTransferType,
					'thirdPartyFDType' : _thirdPartyFDType,
					'beneficiaryAccountNo' : beneficiary_acc_no
					},
          url: _url,
          cache: false,
          success:function(response){
        	  $(_textGroup).empty();
        	  var theme_new = '<br>Daily Limit : <b>'+response.dailyLimitString+'</b>'
        	  	+'<br>'
				+'Remaining Daily Limit : <b>'+response.remainingLimitString+'</b>'
				+'<br>'
				+'Transaction Limit : <b>'+response.transactionLimitString+'</b>';
									
			$(_textGroup).append(theme_new);
          }, error: function(){
              //alert('Error while request..');
          }
      });
  } else { $(this_+"-result").html("<em>...</em>"); }
}

//Beneficiary Account Register 
function loadDestinationAccount(_source) {
	$('#userAccountNumber2').empty();
    $.ajax({
        type : "post",
        data : {'accountNumber' : $(_source).val()},
        url : "personal/account/fundtransfer/own/getDestinationAccount",
        cache : false,
        success : function(response) {
			
            $.each(response, function (i, item) {
                                $('#userAccountNumber2')
                                        .append(
                                                '<option  value="' + item.userAccountNumber +'" >'
                                                + item.userAccountNumber +"-"+ item.accountType
                                                + '</option>');
            });      
        },
        error : function(e) {
        	console.log('Error while request.. form.js.. ftBeneficiaryDetails function');
        }
    });

  
}

//CHECK BALANCE AND ACCOUNT STATUS ON CHANGE
function checkBalanceAndAccountStatusOwn(this_){

	var accountID = $(this_).val();
	if(accountID!==""){
	
        $.ajax({ 
            type: "post",
            data: {'accountNumber':accountID},
            url: "personal/account/utilaccount",
            cache: false,
            success:function(response){
			
                $(this_+"-result").html("<em>Available "+ response["currencyCode"] +"</em> "+ response["availableBalance"].toFixed(2));
				
                //CHECK ACCOUNT STATUS ON CHANGE
                 if((response["black_listed"] == true)){
				
				   $("#accountBlackList").removeClass("hide");
				   $("#fund-transfer-submit").hide();
                }else{
				   $("#accountBlackList").addClass("hide");
				   $("#fund-transfer-submit").show();
                }
				$("#currency").val(response["currencyCode"]);
				
            }, error: function(){
                //alert('Error while request..');
            }
        });
    } else { $(this_+"-result").html("<em>...</em>"); }
}

//Notify user regading sesstion time out
function timeOut(path){
	if (confirm("Your session is going to expire. Do you want to continue?") == true) {
		$.ajax({
			type : "POST",
			url : path + "/refreshSession",
			async : false,
			data : {
			},
			success : function(resp) {
			}
		});
  } else {
  	window.location.replace(path + "/logout");
  }		
}
// epf file uploder check account balance
function checkAccountBalance(this_){
	 var accountID = $(this_).val();
	    if(accountID!==""){
	    
	        $.ajax({ 
	            type: "post",
	            data: {'accountNumber':accountID},
	            url: "personal/account/utilaccount",
	            cache: false,
	            success:function(response){
	            
	                var balance = response["currencyCode"] +" "+ parseFloat(response["availableBalance"], 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
	                $(this_+"-result").html("<em>Available "+ balance);
	          
	            }, error: function(){
	                //alert('Error while request..');
	            }
	        });
	    } else { $(this_+"-result").html("<em>...</em>"); }
}
