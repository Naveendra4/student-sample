// check idle time

// Set timeout variables in seconds.
var timoutWarning =340; // Display warning in 5 min 40 seconds.
//var timoutWarning = 10; 
var timoutNow = 360; // Timeout in 6min.
//var timoutNow = 100; // Timeout in 6min.
var logoutUrl = getContextPath()+'/j_spring_security_logout'; // URL for login page
var sessionLogoutUrl = getContextPath()+'/j_spring_security_logout'; // URL for session time out
var isSessionTimeOutStart = 0;	// this is to identify if session time out occur remove window.onbeforeunload()																		// to
																			// logout
function getContextPath() {
    return window.location.pathname.substring(0, window.location.pathname
            .indexOf("/", 2));
}																			// page.

var warningTimer;
var timeoutTimer;

// Start timers.
function StartTimers() {
	warningTimer = setTimeout("IdleWarning()", timoutWarning * 1000);
	timeoutTimer = setTimeout("IdleTimeout()", timoutNow * 1000);
}

// Reset timers.
function ResetTimers() {
	if (!$("#timeout-dialog").length) {
		clearTimeout(warningTimer);
		clearTimeout(timeoutTimer);
		StartTimers();
	}
}


// Show idle timeout warning dialog.
function IdleWarning() {


	var settings = {
		countdown : timoutNow-timoutWarning,
		title : 'Your session is about to expire!',
		message : 'You will be logged out in {0} seconds.',
		question : 'Do you want to stay signed in?',
		keep_alive_button_text : 'Yes, Keep me signed in',
		sign_out_button_text : 'No, Sign me out',
		dialog_width : 360
	}

	var TimeoutDialog = {
		init : function() {
			this.setupDialogTimer();
		},
		setupDialogTimer : function() {

			var self = this;
			self.setupDialog();
		},
		setupDialog: function() {
	        var self = this;
	        self.destroyDialog();
			

	        $('<div id="timeout-dialog">' +
	        		 '<p id="timeout-message">' + settings.message.format('<span id="timeout-countdown">' + settings.countdown + '</span>') + '</p>' + 
	  	           
	            '<p id="timeout-question">' + settings.question + '</p>' +
	          '</div>')
	        .appendTo('body').dialog({
	          modal: true,
	          width: settings.dialog_width,
	          minHeight: 'auto',
	          zIndex: 10000,
	          closeOnEscape: false,
                  closeText: "hide",
	          draggable: false,
	          resizable: false,
	          dialogClass: 'timeout-dialog',
	          title: settings.title,
	          buttons : {
	            'keep-alive-button' : { 
	              text: settings.keep_alive_button_text,
	              id: "timeout-keep-signin-btn",
	              click: function() {
	                self.keepAlive();
	                self.destroyDialog();
	              }
	            },
	            'sign-out-button' : {
	              text: settings.sign_out_button_text,
	              id: "timeout-sign-out-button",
	              click: function() {
	            	  self.signOut();
	              }
	            }
	          }
	        });

	        self.startCountdown();
	      },
		destroyDialog : function() {

			if ($("#timeout-dialog").length) {
				$('#timeout-dialog').remove();
			}
		},
		 startCountdown: function() {
			isSessionTimeOutStart = 1;
		        var self = this,
		            counter = settings.countdown;

		        this.countdown = window.setInterval(function() {
		          counter -= 1;
		          $("#timeout-countdown").html(counter);

		          if (counter <= 0) {
		            window.clearInterval(self.countdown);
		            self.sessionSignOut();
		          }

		        }, 1000);
		      },
		 keepAlive: function() {
			
						isSessionTimeOutStart = 0; // session time out reset
			 			window.clearInterval(this.countdown);
		    			clearTimeout(warningTimer);
		    			clearTimeout(timeoutTimer);
		    			StartTimers();
		    	},
		 signOut:function(){
		
			 isSessionTimeOutStart = 1;
			 window.location = logoutUrl;
		 },
		 sessionSignOut:function(){
				
			 isSessionTimeOutStart = 1;
			 window.location = sessionLogoutUrl;
		 }

	};
	TimeoutDialog.init()
}

function getIsSessionTimeOutStart(){
	return isSessionTimeOutStart;
}
// Logout the user.
function IdleTimeout() {
	
	window.location = sessionLogoutUrl;
}

String.prototype.format = function() {
  var s = this,
      i = arguments.length;

  while (i--) {
    s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
  }
  return s;
};