// $Id$
/***
 *	Clean zcOptin using TypeScript compiled to ES3 js
 *
 */
var ZC_RedirUrl = ZC_RedirUrl || "maillist-manage.com"; //No I18N
var exp_date = new Date();
exp_date.setTime(exp_date.getTime()+(365*24*60*60*1000));
//PolyFills for IE8
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {//No I18N
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';//No I18N
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');//No I18N
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
if (typeof document.querySelectorAll != 'function') {
    document.querySelectorAll = function (selectors) {
      var style = document.createElement('style'), elements = [], element;
      document.documentElement.firstChild.appendChild(style);
      document._qsa = [];
  
      style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
      window.scrollBy(0, 0);
      style.parentNode.removeChild(style);
  
      while (document._qsa.length) {
        element = document._qsa.shift();
        element.style.removeAttribute('x-qsa');
        elements.push(element);
      }
      document._qsa = null;
      return elements;
    };
  }
  
  if (typeof document.querySelector != 'function') {
    document.querySelector = function (selectors) {
      var elements = document.querySelectorAll(selectors);
      return (elements.length) ? elements[0] : null;
    };
  }

var new_optin_response_in = 0;
var duplicate_optin_response_in = 0;
var signedup = false;
var ZCWA = ZCWA || {};
var loadreCaptcha = function (theme,parent) {
	if(typeof theme == "undefined")
	{
		theme = 'light';//No I18N
	}
	if(typeof parent=="undefined"&&window.theme)
	{
		theme = window.theme;
	}
	if(typeof parent == "undefined")
	{
		parent = "";
	}
    var recapDiv = document.querySelector(parent+"#recapDiv"); //No I18N
    try
    {
        var widgetId1 = grecaptcha.render(recapDiv, { 'sitekey': '6LdNeDUUAAAAABpwRBYbCMJvQoxLi4d31Oho0EBw','theme': theme  });//No I18N
        var catpchaFn = parent.trim().replace("#sf","").replace(/(\[.*signupform)|(\"\])/g,"");
        window[catpchaFn+"_recaptcha"] = widgetId1;
    }
    catch(exception)
    {
        return;
    }
   
};
var _setOptin = function (callbackMode, customEventTrigger, parent,isPreview,recapTheme) {
    if (parent === void 0) { parent = ""; }
    if (isPreview === void 0) { isPreview = false; }
    var formType = getElementVal(document.querySelector(parent + "#formType")); //No I18N
    var zc_Url = getElementVal(document.querySelector(parent+"#zc_Url")); //No I18N
    if (formType !== "QuickForm") { //No I18N
        var relTableTd = document.querySelector(parent+"table#listRelTable"); //No I18N
        if (typeof relTableTd != "undefined" && relTableTd) { //No I18N
            var listCheckboxes = relTableTd.querySelectorAll('input[type="checkbox"][name="listCheckBox"]'); //No I18N
            if(listCheckboxes)
            {            
                for(var i=0;i<listCheckboxes.length;i++)
                {
                    var listCheckbox = listCheckboxes[i];
                    listCheckbox.removeEventListener('click', getcheckedListIds); //No I18N
                    listCheckbox.addEventListener('click', getcheckedListIds); //No I18N
                }
            }
        }
        //datepicker
        var dateFields = document.querySelectorAll(parent+'.dateClass');//No I18N
    	if(dateFields&&dateFields.length>0) 
    	{
    		if(typeof flatpickr == "undefined")
    		{
    			var script = document.createElement('script');
    			var css = document.createElement('link');
    			var urlCss = "https://" + zc_Url + "/css/flatpickr.min.css"; //No I18N
    			var urlJs = "https://" + zc_Url + "/js/flatpickr.min.js"; //No I18N
				script.src = urlJs;
				css.href = urlCss;
				css.rel="stylesheet";//No I18N
				var callbackName = "loadDatePicker_"+parent.trim().replace("#sf","");//No I18N
				window[callbackName] = function()
				{
					flatpickr(parent+'.dateClass',{//No I18N
	    				dateFormat:'m/d/Y'//No I18N
	    			});	
					delete window[callbackName];
				}
				script.onload = window[callbackName];
				document.head.appendChild(script);
				document.head.appendChild(css);
    		}
    		else
    		{
    			flatpickr(parent+'.dateClass',{//No I18N
    				dateFormat:'m/d/Y'//No I18N
    			});
	    		/*dateFields.forEach(function(element){
	    			flatpickr(element,{
	    				dateFormat:'m/d/Y'//No I18N
	    			});
	    		})*/
    		}
    	}
    	 if(recapTheme)
	     {
			if(typeof grecaptcha == 'undefined' || typeof grecaptcha.render == 'undefined')
		    {
				var script = document.createElement('script');
				var catpchaFn = parent.trim().replace("#sf","").replace(/(\[.*signupform)|(\"\])/g,"");
				script.src = "https://www.google.com/recaptcha/api.js?onload=loadCaptcha_"+catpchaFn;//No I18N
				window["loadCaptcha_"+catpchaFn] = function()//No I18N
				{
					loadreCaptcha(recapTheme,parent);	
					delete window["loadCaptcha_"+catpchaFn];//No I18N
				}
				document.head.appendChild(script);
		    }
			else
			{
				loadreCaptcha(recapTheme,parent);	
			}
	     }  
    }
    var zcWebOptin2 = document.querySelector(parent + "[id='zcWebOptin2']"); //No I18N
    var zcWebOptin = document.querySelector(parent + "[id='zcWebOptin']"); //No I18N
    if (zcWebOptin2 && zcWebOptin2.getAttribute("type") != "button" ) //Not needed //No I18N
     {
    	if(!isPreview)
    	{
	        zcWebOptin2.addEventListener("click", function (event) {
	        	saveOptin(document.querySelector(parent + "#contactcreateform"), callbackMode, customEventTrigger, parent, event); //No I18N
	            event.stopPropagation();
	            event.preventDefault();
	            return false;
	        });
    	}
    	else
    	{
    		 zcWebOptin2.addEventListener("click", function (event) {
 	            event.stopPropagation();
 	            event.preventDefault();
 	            return false;
 	        });
    	}
    }
    if (zcWebOptin && zcWebOptin.getAttribute("type") !== "button") { //No I18N
    	if(!isPreview)
    	{
    		zcWebOptin.setAttribute("onclick", "saveOptin(this," + callbackMode + "," + customEventTrigger + ",'" + parent + "',event);"); //No I18N
    	}
    	else
    	{
    		zcWebOptin.setAttribute("onclick", "return false;"); //No I18N
    		zcWebOptin.addEventListener("click", function(event){
    			event.stopPropagation();
    			event.preventDefault();
    			return false;    			
    		}); 
    	}
    }
    else if(zcWebOptin){
    	zcWebOptin.addEventListener("click",function(event){
    		saveOptin(zcWebOptin,callbackMode,customEventTrigger,parent,event);
    	})
    }
    var zcOptinForm = document.querySelector(parent + "[id='zcampaignOptinForm']"); //No I18N
    if (zcOptinForm) {
    	if(!isPreview)
    	{
	        zcOptinForm.addEventListener("keypress", function (event) {
	            if (event.keyCode == 13) {
	            	saveOptin(zcWebOptin, callbackMode, customEventTrigger, parent, event);
	                return false;
	            }
	        });
    	}
    	else
    	{
    		zcOptinForm.addEventListener("keypress", function (event) {
	            if (event.keyCode == 13) {
	            	event.stopPropagation();
	    			event.preventDefault();
	                return false;
	            }
	        });
    	}
    }
    try {
        var newSub = zcOptinForm.querySelector("#new_optin_response_in"); //No I18N
        var existingSub = zcOptinForm.querySelector("#duplicate_optin_response_in"); //No I18N
        if (!newSub || !existingSub) {
            var zcUrl = getElementVal(zcOptinForm.querySelector("#zc_Url")); //No I18N
            var zc_formIx = getElementVal(zcOptinForm.querySelector("#zc_formIx")); //No I18N
            if(zc_formIx!==undefined){
            	var url = "https://" + zcUrl + "/ua/Optin?r=t&zc_formIx=" + zc_formIx; //No I18N
            	sendAjaxReq(url, zc_formIx, "GET", true, function (msg) {//No I18N
            		if (msg) {
            			try {
            				var data = JSON.parse(msg);
            				if (typeof data.new_optin_response_in != "undefined") { //No I18N
            					zcOptinForm.appendChild(document.createElement("<input type='hidden' value='" + data.new_optin_response_in + "' id='new_optin_response_in' />")); //No I18N
            				}
            				if (typeof data.duplicate_optin_response_in != "undefined") {
            					zcOptinForm.appendChild(document.createElement("<input type='hidden' value='" + data.duplicate_optin_response_in + "' id='duplicate_optin_response_in' />")); //No I18N
            				}
            			}
            			catch (err) {
            				zcOptinForm.appendChild(document.createElement("<input type='hidden' value='" + err + "' id='zcOptinError' />")); //No I18N
            			}
            		}
            	});
            }
        }
    }
    catch (err) {
    	if(zcOptinForm)
    	{
    		zcOptinForm.appendChild(document.createElement("<input type='hidden' value='" + err + "' id='zcOptinError' />")); //No I18N
    	}
        
    }
    if (zcWebOptin2) {
        zcWebOptin2.removeEventListener("click", webOptinSuccessMessageEvent);
        zcWebOptin2.addEventListener("click", webOptinSuccessMessageEvent);
    }
    if (zcWebOptin) {
        zcWebOptin.removeEventListener("click", webOptinSuccessMessageEvent);
        zcWebOptin.addEventListener('click', webOptinSuccessMessageEvent);
    }
    var optinOverlay = document.querySelector("#zcOptinOverLay");//No I18N
    var closeSuccess = document.querySelector("#closeSuccess");//No I18N
    document.body.addEventListener('keyup',function(event){//No I18N
			if(event.keyCode === 27 || event.keyCode === "27")//No I18N
			{
				closeSuccessPopup();
			}
	});
    if(optinOverlay)
    {
	    optinOverlay.addEventListener("click",function(){ //No I18N 
			closeSuccessPopup();
		}); 
    }
    if(closeSuccess)
    {    
    	closeSuccess.addEventListener("click",function(){//No I18N
			closeSuccessPopup();
		});
    }
	 var firstField = zcOptinForm.querySelector("[changeitem='SIGNUP_FORM_FIELD']"); //No I18N
    var borderStyle = firstField.style.borderStyle;
    var isNoBorder = borderStyle === "none"; //No I18N
    var brClr = getElementVal(zcOptinForm.querySelector("#fieldBorder")); //No I18N
    var inputs = zcOptinForm.querySelectorAll("input[name]"); //No I18N
    var textArea = zcOptinForm.querySelectorAll("textarea"); //No I18N
    if (inputs && inputs.length > 0) {
        var _loop_1 = function (i) {
            var element = inputs[i];
            if (!element.name) {
                return "continue";//No I18N
            }
            else if (element.style.display == "none") //No I18N
             {
                return "continue";//No I18N
            }
            if (!isNoBorder) {
                element.addEventListener("keyup", function (event) {
                    if (testIfValidChar(event)) {
                        element.style.borderColor = brClr;
                    }
                });
            }
            else {
                element.addEventListener("keyup", function (event) {
                    if (testIfValidChar(event)) {
                        element.style.borderStyle = "none"; //No I18N
                    }
                });
            }
        };
        for (var i = 0; i < inputs.length; i++) {
            _loop_1(i);
        }
    }
    if (textArea && textArea.length > 0) {
        var _loop_2 = function (i) {
            var element = textArea[i];
            if (!element.name) {
                return "continue";//No I18N
            }
            else if (element.style.display == "none") //No I18N
             {
                return "continue";//No I18N
            }
            if (!isNoBorder) {
                element.addEventListener("keyup", function (event) {
                    if (testIfValidChar(event)) {
                        element.style.borderColor = brClr;
                    }
                });
            }
            else {
                element.addEventListener("keyup", function (event) {
                    if (testIfValidChar(event)) {
                        element.style.borderStyle = "none"; //No I18N
                    }
                });
            }
        };
        for (var i = 0; i < textArea.length; i++) {
            _loop_2(i);
        }
    }
};
//Setup signupform js
var setupSF = function (signupformId, trackingText,isPreview,theme) {
    if (trackingText === void 0) { trackingText = void 0; }
    if (isPreview === void 0) { isPreview = false; }
    var blankFunc = function () {return;};
    var processForms = function(){
        var signupforms = document.querySelectorAll("#"+signupformId);
        var forms = [];
        if(signupforms&&signupforms.length>0)
        {
            for(var i=0;i<signupforms.length;i++)
            {
                var sf = signupforms[i];
                var dataType = sf.getAttribute("data-type");
                if(dataType.indexOf("signupform_")==-1)
                {
                    sf.setAttribute("data-type","signupform_"+i);
                    var parent = "#" + signupformId + "[data-type=\"signupform_"+i+"\"] ";
                    var act = document.querySelector(parent+"#zcampaignOptinForm").getAttribute("action"); //No I18N
                    if(act != null)
                    {
	                    var st = act.indexOf("maillist-manage");
	                    var end = act.indexOf("/weboptin");
	                    if(st!= -1 )
	                    {	
	                    	ZC_RedirUrl = act.substring(st,end);
	                    }
                    }
                    var signupBody = document.querySelector(parent+"#customForm div"); //NO I18N
                    if(!isPreview && signupBody != null)
                    {
                    	if(signupBody.getAttribute("name") == null)
                        {
                    		document.querySelector(parent+"#customForm [name=SIGNUP_BODY]")?document.querySelector(parent+"#customForm [name=SIGNUP_BODY]").addEventListener('click',zcSFImpressions,true):document.querySelector(parent+"#customForm [id=SIGNUP_BODY]").addEventListener('click',zcSFImpressions,true); //No I18N  
                        }
                        else if(signupBody.getAttribute("name") == "SIGNUP_PAGE")
                        {
                        	signupBody.querySelector("form").addEventListener('click',zcSFImpressions,true); //No I18N    
                        }
                        else if(signupBody.getAttribute("name") == "SIGNUP_BODY")
                        {
                        	signupBody.addEventListener('click',zcSFImpressions,true); //No I18N    
                        }  
                    }
                    var zcTrackCodeInput = document.querySelector(parent + "#zc_trackCode"); //No I18N
                    if (zcTrackCodeInput && trackingText) {
                        zcTrackCodeInput.setAttribute("value", trackingText);
                    }
                    var fieldBorderInput = document.querySelector(parent + "#fieldBorder"); //No I18N
                    var signupformField = document.querySelector(parent + "[changeItem='SIGNUP_FORM_FIELD']"); //No I18N
                    if (fieldBorderInput && signupformField) {
                        var fieldStyle = signupformField.style.borderColor;
                        fieldBorderInput.setAttribute("value", fieldStyle); //No I18N
                    }
                    var runOnFormLoadFnName = "runOnFormSubmit_"+signupformId;//No I18N
                    if (typeof window[runOnFormLoadFnName] == "undefined") { //No I18N
                        window[runOnFormLoadFnName] = blankFunc;
                    }
                    var form = document.querySelector(parent + "form");//No I18N
                    if(form)
                    {
                        forms.push(form);
                    }
                    _setOptin(false, window[runOnFormLoadFnName], parent,isPreview,theme);
                    if(!isPreview&&i==0)
                    {
                        trackSignupEvent(trackingText, "view", parent); //No I18N
                    }
                }
            }
        }
        if(forms && forms.length > 0)
        {
            var antifraudFunc = function(){
                for(var i=0;i<forms.length;i++)
                {
                    sap(forms[i]);
                }
            }
            if(typeof sap != "function")
            {
                var firstForm = forms[0];
                var action = firstForm.getAttribute("action");//No I18N
                var scriptUrl = "";
                try
                {
                    var url = new URL(action);
                    scriptUrl = url.origin + "/js/dig.js";//No I18N
                }
                catch(e)
                {
                     //point to maillist manage url
                    scriptUrl = "htt" + "ps://maillist-manage.com/js/dig.js";//No I18N
                }
                var script = document.createElement("script");//No I18N
                script.onload = antifraudFunc;
                script.type = "application/javascript"; //No I18N
                script.src = scriptUrl;
                document.head.appendChild(script);
            }
            else
            {
                antifraudFunc();
            }
        }
    }
    if(document.readyState != "complete")
    {
      document.addEventListener("DOMContentLoaded", function (event) { //this break breaks dynamic loading of signupforms
          processForms();
      });
    }
    else
    {
      processForms();
    }
};

var zcSFImpressions = function (event) {
    this.removeEventListener('click',zcSFImpressions,true);     
    
	var jsonObj = {};
	jsonObj.category = "updImpression"; //No I18N
	jsonObj.signupFormIx = this.querySelector("#zc_formIx").value; //NO I18N
	jsonObj.trackingCode = this.querySelector("#zc_trackCode").value; //No I18N
	jsonObj.action = "impression"; //No I18N
	jsonObj.orgId = document.querySelector("#zcOrgIx").value; //No I18N
	jsonObj.actId = document.querySelector("#zcActIx").value;  //No I18N
	jsonObj.custId = document.querySelector("#zcCustIx").value;  //No I18N
	jsonObj.zx = document.querySelector("#cmpZuid").value; //No I18N
	jsonObj.visitorType = 0;
	
	var campUrl = ZC_RedirUrl;
	var protocol = window.location.protocol; 
	protocol = "https:"; //No I18N
    var url = protocol+"//" + campUrl+"/ua/TrailEvent";//No I18N  
    var ajaxUrl = url+"?callback=processData&"+serializeJson(jsonObj); //No I18N
    makeAjaxReq(ajaxUrl); 
}
var saveOptin = function (thi, callbackMode, customEventTrigger, parent, event) {
    if (parent === void 0) { parent = ""; }
    if (event === void 0) { event = void 0; }
    if (validateSignupForm('saveoptin', thi, parent)) { //No I18N
        var _form_1;
        if (parent != "") {
            _form_1 = document.querySelector(parent+"form"); //No I18N
        }
        else {
            _form_1 = closest(thi, "form"); //No I18N
        }
        if (_form_1) {
            if (customEventTrigger) {
                //Before submit user event called.
                if (!callbackMode) {
                    //Users event triggered after submit
                    customEventTrigger();
                }
            }
            var target = _form_1.getAttribute("target"); //No I18N
            if (target == "_zcSignup") //POPUPBLOCK BYPASS //No I18N
             {
                var popUpWindow_1 = null;
                var newTabLoadingHtml = '<style>*{padding:0;margin:0;}.spinner {margin: 10% auto; width: 70px; text-align: center; }' //No I18N
                    + '.spinner > div { width: 18px; height: 18px; background-color: #3aba79; border-radius: 100%; display: inline-block; -webkit-animation: bouncedelay 1.4s infinite ease-in-out; animation: bouncedelay 1.4s infinite ease-in-out; -webkit-animation-fill-mode: both; animation-fill-mode: both; }' //No I18N
                    + '.spinner .bounce1 { -webkit-animation-delay: -0.32s; animation-delay: -0.32s; }' //No I18N
                    + '.spinner .bounce2 { -webkit-animation-delay: -0.16s; animation-delay: -0.16s; }' //No I18N
                    + '@keyframes bouncedelay { 0%, 80%, 100% { transform: scale(0.0); -webkit-transform: scale(0.0); } 40% { transform: scale(1.0); -webkit-transform: scale(1.0); } }' //No I18N
                    + '</style><div class="spinner">  <div class="bounce1"></div>  <div class="bounce2"></div>  <div class="bounce3"></div></div>'; //No I18N
                var newSub = _form_1.querySelector("#new_optin_response_in"); //No I18N
                var existingSub = _form_1.querySelector("#duplicate_optin_response_in"); //No I18N
                if (newSub && existingSub) {
                    if (newSub.getAttribute("value") == "0" || existingSub.getAttribute("value") == "0") { //No I18N
                        popUpWindow_1 = window.open("");
                        popUpWindow_1.document.body.innerHTML = newTabLoadingHtml;
                        popUpWindow_1.focus();
                    }
                }
                else if (typeof new_optin_response_in != "undefined" && typeof duplicate_optin_response_in != "undefined") //No I18N
                 {
                    if (new_optin_response_in == 0 || duplicate_optin_response_in == 0) {
                        popUpWindow_1 = window.open("");
                        popUpWindow_1.document.body.innerHTML = newTabLoadingHtml;
                        popUpWindow_1.focus();
                    }
                }
                var successMessage = _form_1.querySelector("#Zc_SignupSuccess"); //No I18N
                if (successMessage) {
                    successMessage.style.display = "none"; //No I18N
                }
                var emailField = _form_1.querySelector("[name='CONTACT_EMAIL']"); //No I18N
                if (emailField) {
                    var email = emailField.value;
                    if (email && email != "") {
                        email = email.trim();
                        emailField.value = email;
                        if (email.length > 99) {
                            var errorMessageDiv = _form_1.querySelector("#errorMsgDiv"); //No I18N
                            if (errorMessageDiv) {
                                errorMessageDiv.style.display = ""; //No I18N
                            }
                            emailField.classList.add('zcerrortxt'); //No I18N
                            var signup_body = _form_1.querySelector("#SIGNUP_BODY"); //No I18N
                            if (signup_body) {
                                var backgroundColor = signup_body.style.backgroundColor;
                                if (backgroundColor && backgroundColor != "" && backgroundColor.indexOf("rgb") > -1 && backgroundColor.split(",")[0].split("(")[1] > 200) {
                                    emailField.style.background = "rgba(255,255,0,1)"; //No I18N
                                }
                            }
                            return false;
                        }
                        var params = serializeFormData(_form_1);
                        params += "&responseMode=inline"; //No I18N
                        var zc_stind = params.indexOf("zc_formIx")+10;
                        var zc_formix = params.substring(zc_stind,params.indexOf("&",zc_stind));                             
                        if(params.indexOf("zc_formIx") > -1 && document.querySelector("#zc"+zc_formix) != null)
                        {                            
                            //var zcSrc = window.location.href.indexOf("zoho.com/academy-subscriber.html") > -1 ? window.parent.location.href : window.location.href;
                            var zcSrc;
                            try
                            {
                                zcSrc = window.top.location.href;
                            }
                            catch(ex)
                            {
                                zcSrc = window.location.href;
                            }
                            params += "&sourceURL="+encodeURIComponent(zcSrc); //No I18N                                                    
                            params += "&tpIx="+document.querySelector("#zc"+zc_formix).value; //No I18N
                            if(document.querySelector("#zcCustIx") != null)
                            {
                            	params += "&custIx="+document.querySelector("#zcCustIx").value; //No I18N  
                            }
                            if(document.querySelector("#zcCntr"+zc_formix) != null)
                            {
                                params += "&cntrIx="+document.querySelector("#zcCntr"+zc_formix).value; //No I18N 
                            }
                        }
                        var p_from = _form_1.querySelector("#popupType");//No I18N
                        if(p_from&&ZCWA.from == "WA")
                        {
                            params +="&popupInfoMap_Id="+ZCWA.CurrUser+"_"+ZCWA.popupInfoMap_Id+"&FROM_POPUP=true"; //No I18N
                        }
                        var formAction = _form_1.getAttribute("action"); //No I18N
                        if (formAction && formAction.indexOf("https") != 0) { //No I18N
                            var protocol = "ht" + "tps" + ":"; //No I18N
                            if (formAction.indexOf("//") != 0) { //replacing startsWith() which didn't work in IE //No I18N
                                protocol += "//"; //No I18N
                            }
                            formAction = protocol + formAction;
                        }
                        sendAjaxReq(formAction, params, "GET", true, function (data) {//No I18N
                            dataParsing(data, callbackMode, customEventTrigger, _form_1, popUpWindow_1);
                            resetSignupForm(_form_1,parent);
                            _form_1.reset();
                            if(typeof grecaptcha != "undefined")
                            {
                                try
                                {
                                    if(parent)
                                    {
                                        var catpchaFn = parent.trim().replace("#sf","").replace(/(\[.*signupform)|(\"\])/g,"");
                                        var widgetId1 = window[catpchaFn+"_recaptcha"];
                                        if(widgetId1)
                                        {
                                            grecaptcha.reset(widgetId1);
                                        }
                                        else
                                        {
                                            grecaptcha.reset();
                                        }
                                    }
                                    else
                                    {
                                        grecaptcha.reset();
                                    }
                                }
                                catch(e)
                                {
                                    //dummy
                                }
                            }
                        });
                        var trackingCodeInput = _form_1.querySelector("#zc_trackCode"); //No I18N
                        var trackingCode = getElementVal(trackingCodeInput);
                        if (trackingCode == null || trackingCode == "") {
                            trackingCode = "ZCFORMVIEW"; //No I18N
                        }
                        if (signedup == true) {
                            trackSignupEvent(trackingCode);
                        }
                        else {
                            signedup = true;
                        }
                    }
                }
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                if (callbackMode && customEventTrigger) {
                    if (callbackMode) {
                        //Users event triggered after submit
                        customEventTrigger();
                    }
                }
            }
        }
    }
    else {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }
};
var referenceSetter = function (imgRefAttr) {
    imgRef = imgRefAttr;
};
var trackSignupEvent = function (trackCode, action, parent) {
    if (trackCode === void 0) { trackCode = ""; }
    if (action === void 0) { action = "view"; }
    if (parent === void 0) { parent = ""; }
    var signupformIx = document.querySelector(parent + "#zc_formIx"); //No I18N
    var zx = document.querySelector(parent + "#cmpZuid"); //No I18N
    var viewFrom = document.querySelector(parent + "#viewFrom"); //No I18N
    var zcvers = document.querySelector(parent + "[name=zcvers]"); //No I18N
    var viewFromVal;
    if (viewFrom == undefined) {
        viewFromVal = "URL_ACTION"; //No I18N
    }
    else {
        viewFromVal = viewFrom.getAttribute("value"); //No I18N
        if (viewFromVal === null || viewFromVal === undefined || viewFromVal === "") {
            viewFromVal = "URL_ACTION"; //No I18N
        }
    }
    var jsonObj;
    jsonObj = {};
    if (trackCode == "") {
        var trackCodeInput = document.querySelector(parent + "#zc_trackCode"); //No I18N
        if (trackCodeInput) {
            trackCode = trackCodeInput.getAttribute("value"); //No I18N
        }
    }
    jsonObj.category = "update"; //No I18N
    jsonObj.action = action;
    jsonObj.trackingCode = trackCode;
    jsonObj.viewFrom = viewFromVal;
    jsonObj.zx = getElementVal(zx);
    jsonObj.signupFormIx = getElementVal(signupformIx);
    jsonObj.zcvers = getElementVal(zcvers);    
    //var zcSrc = window.location.href.indexOf("zoho.com/academy-subscriber.html") > -1 ? window.parent.location.href : window.location.href;
    var zcSrc;
    try
    {
        zcSrc = window.top.location.href;
    }
    catch(ex)
    {
        zcSrc = window.location.href;
    }
    jsonObj.source = encodeURIComponent(zcSrc);
    var ref = document.referrer;
    if(ref != undefined && ref != "")
    {
    	jsonObj.ref = encodeURIComponent(ref);
    } 
    
    var touchpoint_jsonObj = {};
    touchpoint_jsonObj.zx = getElementVal(zx);
    touchpoint_jsonObj.signupFormIx = getElementVal(signupformIx);
    touchpoint_jsonObj.refurl = encodeURIComponent(document.referrer);
    touchpoint_jsonObj.url = encodeURIComponent(window.location.href);
    var campaignsUrlEle = document.querySelector(parent + "#zc_Url"); //No I18N
    var campaignsUrl = getElementVal(campaignsUrlEle);
    if (campaignsUrl != undefined && campaignsUrl.indexOf("http") < 0) {
        var protocol = window.location.protocol;
        if (protocol.indexOf("http") < 0) { //No I18N
            protocol = "http" + ":"; //No I18N
        }
        protocol = "https:"; //No I18N
        campaignsUrl = protocol + "//" + campaignsUrl;
    }
    
    var action_url = campaignsUrl + "/ua/TrailEvent"; //No I18N
    var touchpoint_url = campaignsUrl+"/ua/waformrep";//WEBASSISANT ADD CODE //No I18N
    ajaxUrl = action_url+"?"+serializeJson(jsonObj); //No I18N
    makeAjaxReq(ajaxUrl);
    //sendAjaxReq(action_url, jsonObj, "POST");//No I18N    
    /*sendAjaxReq(touchpoint_url, touchpoint_jsonObj, "POST", true, function (data) {//No I18N
    	if(data)
    		{
	    		var resultData = JSON.parse(data);
	            var actionData = resultData.actionData;
	            var parentUrl=window.location.href;
	            var arrParams = parentUrl.split("?");
	            var url=arrParams[0];
	            actionData = actionData+"&url="+encodeURIComponent(url);//No I18N
	            actionData = actionData+"&parentUrl="+encodeURIComponent(parentUrl);//No I18N
	            var action="viewed"; //No I18N
	            actionData=actionData+"&action="+encodeURIComponent(action); //No I18N
	            var custId = getZCookie("zcc"); //No I18N
	            //first party cookie
	            var fpCookie = getZCookie("zc_cu");//No I18N
	            if(fpCookie != null)
	            {
	                actionData = actionData+"&zc_cu="+fpCookie;//No I18N
	            }
	            var zc_cu_exp = getZCookie("zc_cu_exp");//No I18N
	        	if(zc_cu_exp != null)
	        	{
	        		actionData = actionData+"&zc_cu_exp="+zc_cu_exp;//No I18N
	        	}	
	        	var baseUrl = campaignsUrl+"/ua/ActionLogger?"+actionData; //No I18N
	        	var script = document.createElement("script");
	        	script.type = "text/javascript";
	        	script.src = baseUrl;
	            script.setAttribute("onload", "this.parentNode.removeChild(this);");//No I18N
	            document.body.appendChild(script);
    		}
    });*/
};
function zc_form_data(data)
{
	var resultData = data;
	if(resultData.signupFormIx)
	{
		var targetForms = document.querySelectorAll("#zc_formIx[value='"+resultData.signupFormIx+"']"); //No I18N
		if(targetForms)
		{
			for (var i = 0; i< targetForms.length; i++) {
				var ele = targetForms[i];
				if(ele)
				{
					var form = ele.form;
					//var zcTP = $(form).find("[name='zcTP']");//No I18N
					var zcTP = form.querySelector("[name='zcTP']"); //No I18N
					if(!zcTP)
					{
						var newInput = document.createElement("input");
						newInput.type="hidden";
						newInput.value = JSON.stringify(data);
						newInput.name = "zcTP";//No I18N
						form.appendChild(newInput);
					}
					else
					{
						zcTP.value = JSON.stringify(data);
					}
				}
			}
		}
	}
}
function zcVisitorExpCallback()
{
}
var getElementVal = function (element) {
    if (element) {
        return element.value;
    }
    else
    {
        return void 0;
    }
};
var sendAjaxReq = function (url, params, method, async, callback) {
    if (method === void 0) { method = "GET"; }
    if (async === void 0) { async = true; }
    if (callback === void 0) { callback = function (data) { }; }
    var xhr;
    try {
        xhr = new XMLHttpRequest();
    }
    catch (ex) {
        xhr = new window.ActiveXObject("Microsoft.XMLHTTP"); //support for IE8 //No I18N
    }
    var stringParams;
    if (typeof params == "object") { //No I18N
        stringParams = serializeJson(params);
    }
    else {
        stringParams = params;
    }
    if (method == "GET") { //No I18N
        url += "?" + stringParams;
        stringParams = null;
    }
    xhr.open(method, url, async);
    if (async) {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (callback) {
                    callback(xhr.responseText);
                }
            }
        };
    }
    try {
        if (method == "POST") { //No I18N
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //No I18N
        }
        xhr.send(stringParams);
        if (!async) {
            if (callback) {
                return callback(xhr.responseText);
            }
            else {
                return xhr.responseText;
            }
        }
    }
    catch (e) {
        //    console.error(e)
    }
};
var serializeJson = function (json) {
    if (json === void 0) { json = {}; }
    var keys = Object.keys(json);
    var serializedJson = "";
    for (var i = 0; i < keys.length; i++) {
        serializedJson += keys[i] + "=" + json[keys[i]];
        serializedJson += "&";
    }
    return serializedJson.substring(0, serializedJson.length - 1);
};
function getcheckedListIds(event) {
    var listIds = [];
    var _form = this.form ? this.form : void 0; 
    if (_form) {
        var checkBoxes = _form.querySelectorAll("[name='listCheckBox']"); //No I18N
        if (checkBoxes && checkBoxes.length > 0) {
            for (var i = 0; i < checkBoxes.length; i++) {
                var checkBox = checkBoxes[i];
                if (checkBox.checked) {
                    listIds.push(checkBox.getAttribute("value")); //No I18N
                }
            }
        }
        var allCheckedList = _form.querySelector("#allCheckedListIds"); //No I18N
        if (allCheckedList) {
            allCheckedList.setAttribute("value", listIds.join(",").toString()); //No I18N
        }
    }
}
function closeSuccessPopup(parent) {
    if (parent === void 0) { parent = ""; }
    var successPopup = document.querySelector(parent + "#zcOptinSuccessPopup"); //.fadeOut();//No I18N
    var overlay = document.querySelector(parent + "#zcOptinOverLay"); //No I18N
    if (successPopup) {
        fade(successPopup);
    }
    if (overlay) {
        overlay.style.display = "none"; //No I18N
    }
}
function fade(element, interval, callback) {
    if (interval === void 0) { interval = 50; }
    if (callback === void 0) { callback = void 0; }
    var op = 1; // initial opacity
    var original_opacity = element.style.opacity; 
    if(original_opacity === void 0 || original_opacity == "")
    {
    	original_opacity = 1;
    }
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none'; //No I18N
            element.style.opacity = original_opacity;
            element.style.filter = 'alpha(opacity=' + original_opacity * 100 + ")"; //No I18N
            if (callback) {
                callback();
            }
            return;
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")"; //No I18N
        op -= op * 0.1;
    }, interval);
}
function closest(el, selector) {
    var matchesFn;
    // find vendor prefix
    ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {//No I18N
        if (typeof document.body[fn] == 'function') { //No I18N
            matchesFn = fn;
            return true;
        }
        return false;
    });
    var parent;
    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }
    return null;
}
var webOptinSuccessMessageEvent = function (event) {
    var target = event.target;
    var parent = closest(target, "[zc-signupform]"); //No I18N
    var overlay = document.querySelector(parent + "#zcOptinOverLay"); //No I18N
    if (overlay) {
        overlay.addEventListener('click', function () {
            closeSuccessPopup(parent);
        });
    }
    var closeBtn = document.querySelector(parent + "#closeSuccess"); //No I18N
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            closeSuccessPopup(parent);
        });
    }
    document.body.addEventListener("keyup", function (event) {
        if (event.keyCode == 27) {
            closeSuccessPopup(parent);
        }
    });
};
function getZCValidationString(fieldname){//TEMPORARY have to move to JSON after giving option to change from client
	switch(fieldname){
		case "CONTACT_EMAIL":{//No I18N
			return "1,true,6,Subscriber Email,2";//No I18N
		}
		case "LASTNAME": {//No I18N
			return "1,false,1,Last Name,2";//No I18N
		}
	}
}
var validateSignupForm = function (formMode, thi, parent) {
    if (parent === void 0) { parent = ""; }
    var _form;
    var result = false;
    if (parent) {
        _form = document.querySelector(parent + "form"); //No I18N
    }
    else {
        _form = closest(thi, "form"); //No I18N
    }
    if (_form) {
        var cn = _form.querySelectorAll("*"); //No I18N
        var brClr = getElementVal(_form.querySelector("#fieldBorder")); //No I18N
        var privacyCheck = _form.querySelector('[name="privacyPolicy"]'); //No I18N
        var txtArea = _form.getElementsByTagName("textarea"); //No I18N
        var errorMsgDiv = _form.querySelector("#errorMsgDiv"); //No I18N
        var fieldCheckArray = new Array("<", ">"); //No I18N
        var firstField = _form.querySelector("[changeitem='SIGNUP_FORM_FIELD']"); //No I18N
        var borderStyle = "none";//No I18N
		if(firstField!=null){
			borderStyle = firstField.style.borderStyle;
        }
        var isNoBorder = borderStyle === "none"; //No I18N
        var temp = "true"; //No I18N
        if (errorMsgDiv) {
            errorMsgDiv.style.display = "none"; //No I18N
        }
        if (privacyCheck) {
            var privBox = privacyCheck.querySelector("input[type='checkbox']"); //No I18N
            if (privBox) {
                if (!privBox.checked) {
                    privacyCheck.focus();
                    privacyCheck.style.border = "1px red solid"; //No I18N
                    temp = "false"; //No I18N
                }
                else
                {
                    privacyCheck.style.border = "none";//No I18N
                }
            }
        }
        var bs = void 0;
        var markAsError = function (bs) {
            bs.style.borderColor = "#f2644d"; //No I18N
            bs.style.borderStyle = "solid"; //No I18N
            bs.style.borderWidth = "1px"; //No I18N
        };
        if (cn && cn.length > 0) {
            for (var i = 0; i < cn.length; i++) {
                var element = cn[i];
                if (!element.name) {
                    continue;
                }
                var fieldname = element.name;
                var span_ele = _form.querySelector("#dt_" + fieldname); //No I18N
                var span_val= "";
                if(span_ele==null || span_ele==undefined){
                        if(fieldname!=undefined){
                            span_val = getZCValidationString(fieldname);
                        }
                }
                if(span_ele || (span_val!="" && span_val != undefined)){
                //if (span_val) {
                    span_val = span_ele != null ? span_ele.innerText : span_val;                    
                    var ele = span_val.split(',');
                    var dataType = parseInt(ele[0]);
                    var is_man = ele[1];
                    var uitype = parseInt(ele[2]);
                    var displayLabel = ele[3];
                    var defaultPlaceHolder = ele[5];
                    var fieldValue = element.value;
                    if (fieldValue) {
                        fieldValue = fieldValue.trim();
                    }
                    var fieldErrorDiv = _form.querySelector("#error_" + fieldname); //No I18N
                    if (fieldErrorDiv) {
                        fieldErrorDiv.innerHTML = "";
                    }
                    bs = element;
                    if (isNoBorder) {
                        bs = closest(bs, 'div'); //No I18N
                    }
                    if(uitype == 4 || uitype == 12)
                    {
                        var target = element.parentNode;
                        if(target)
                        {
                            target = target.parentNode;                    
                        }
                        if(target)
                        {
                            target = target.parentNode;                    
                        }
                        if(target)
                        {
                            target = target.parentNode;                    
                        }
                        if(target)
                        {
                            bs = target;
                        }
                    }
                    if (formMode && formMode.toLowerCase() == "saveoptin" && bs) { //No I18N
                        bs.style.borderColor = brClr;
                        if(uitype == 4 || uitype == 12)
                        {
                            bs.style.border = "none";//No I18N
                        }
                    }
                    if (defaultPlaceHolder == fieldValue) {
                        if (bs) {
                            bs.value = "";
                        }
                    }
                    if ((is_man == "true" && (uitype == 4 || uitype == 12) && !(element.checked))) { //No I18N
                        markAsError(bs);
                        temp = "false"; //No I18N
                    }
                    if ((is_man == "true") && (uitype == 10)) { //No I18N
                    	var isSel=false;
                    	var ary = _form.querySelectorAll('[name="'+fieldname+'"]');//No I18N

                    	for(var j = 0; j < ary.length; j++)
                    	{
                    		isSel = ary[j].checked;
                    		if(isSel){
                    			break;
                    		}
                    	}
                    	if(!isSel){
                    		markAsError(bs);
                            temp = "false"; //No I18N
                    	}
                    }
                    else if((is_man == "true" && ( fieldValue == "" || fieldValue == "dummy" )) && uitype == 3)
                    {
                        markAsError(bs);
                        temp = "false"; //No I18N
                    }
                    else if(is_man == "true" && uitype == 13)
                    {
                        var tempValue = "";
                        var options = element.querySelectorAll("option");//No I18N
                        if(options&&options.length>0)
                        {
                            for(var j=0;j<options.length;j++)
                            {
                                var ele = options[j];
                                if (ele.selected) {
                                    tempValue += ele.value + ",";
                                }
                            }
                            if(tempValue!="" && tempValue.indexOf(",")>0)
                            {
                                tempValue = tempValue.substring(0, tempValue.lastIndexOf(","));
                            }
                        }
                        if(tempValue=="")
                        {
                            markAsError(bs);
                            temp = "false"; //No I18N
                        }
                    }
                    else if((is_man == "true" && fieldValue == "")&&!(uitype == 10 || uitype == 4 || uitype == 12))
                    {
                        markAsError(bs);
                        temp = "false"; //No I18N
                    }
                   
                    if (!splCharValidationForSignupForm(fieldValue, fieldCheckArray, bs.getAttribute("id"), _form)) //special char check //No I18N
                     {
                        markAsError(bs);
                        temp = "false"; //No I18N
                    }
                    if (dataType == 2 || dataType == 5) //number field
                     {
                        var fieldIntVal = parseInt(fieldValue);
                        if ((is_man=="true"&&(fieldIntVal == NaN || isNaN(fieldIntVal)))||(is_man!="true"&& fieldValue!="" &&(fieldIntVal == NaN || isNaN(fieldIntVal)))) {
                            markAsError(bs);
                            temp = "false"; //No I18N
                        }
                    }
                    else if (uitype == 9) //URL Field
                     {
                        var urlRegex = /(|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                        if (fieldValue && fieldValue != "" && !urlRegex.test(fieldValue)) {
                            markAsError(bs);
                            temp = "false"; //No I18N
                        }
                    }
                    else if (is_man == "true" && dataType == 1 && uitype == 6) { //No I18N
                        if (fieldValue) {
                            if (!emailPatternCheck(fieldValue)) {
                                markAsError(bs);
                                temp = "false"; //No I18N
                            }
                        }
                        else {
                            markAsError(bs);
                            temp = "false";
                        }
                    }
                    else if (dataType == 1 && uitype == 6) {
                        if (fieldValue) {
                            if (!emailPatternCheck(fieldValue)) {
                                markAsError(bs);
                                temp = "false";
                            }
                        }
                    }
                }
            };
            if (txtArea) {
                for (var i = 0; i < txtArea.length; i++) {
                    var element = txtArea[i];
                    var fieldname = element.name;
                    var span_ele = _form.querySelector("dt_" + fieldname); //No I18N
                    if (span_ele) {
                        var span_val = span_ele.innerText;
                        var ele = span_val.split(','); //No I18N
                        var dataType = parseInt(ele[0]);
                        var is_man = ele[1];
                        var uitype = parseInt(ele[2]);
                        var displayLabel = ele[3];
                        var defaultPlaceHolder = ele[5];
                        var fieldValue = element.value;
                        if (fieldValue) {
                            fieldValue = fieldValue.trim();
                        }
                        var fieldErrorDiv = _form.querySelector("#error_" + fieldname); //No I18N
                        if (fieldErrorDiv) {
                            fieldErrorDiv.innerHTML = "";
                        }
                        bs = element;
                        if (isNoBorder) {
                            bs = closest(bs, 'div'); //No I18N
                        }
                        if (formMode == "saveOptin" && bs) { //No I18N
                            bs.style.borderColor = brClr;
                        }
                        if (defaultPlaceHolder == fieldValue) {
                            if (bs) {
                                bs.value = "";
                            }
                        }
                        if ((is_man == "true" && (uitype == 10 || uitype == 4 || uitype == 12))) //No I18N
                         {
                            markAsError(bs);
                            temp = "false"; //No I18N
                        }
                        if (!splCharValidationForSignupForm(fieldValue, fieldCheckArray, bs.getAttribute("id"), _form)) //special char check
                         {
                            markAsError(bs);
                            temp = "false"; //No I18N
                        }
                        if (dataType == 1 && uitype == 6) {
                            if (fieldValue && fieldValue != "") {
                                if (!emailPatternCheck(fieldValue)) {
                                    markAsError(bs);
                                    temp = "false"; //No I18N
                                }
                            }
                        }
                    }
                }
            }
        }
        var captchaText = _form.querySelector("#captchaText"); //No I18N
        var recaptchaParent = _form.querySelector("#captcha"); //No I18N
        var recaptchaDiv = _form.querySelector("#recapDiv"); //No I18N
        if (captchaText && captchaText.style.display != "none" && _form.querySelector("#captchaOld") && _form.querySelector("#captchaOld").style.display != "none") //No I18N
         {
            var digest = "";
            var captchaDiv = _form.querySelector("#captchaDiv"); //No I18N
            var captchaImg = captchaDiv.querySelector("img"); //No I18N
            var capUrl = captchaImg.getAttribute("src"); //No I18N
            var index = capUrl.indexOf("digest=") + 7; //No I18N
            digest = capUrl.substring(index, capUrl.length);
            var capText = getElementVal(captchaText);
            var captchaCheck = captchaCheckForOptin(digest, capText, _form);
            if (!captchaCheck) {
                markAsError(captchaText);
                temp = "false";
                loadCaptcha("", captchaDiv, _form);
            }
        }
        else if ((recaptchaParent && recaptchaParent.style.display != "none") && (recaptchaDiv && recaptchaDiv.style.display != "none")||(!recaptchaParent&&(recaptchaDiv && recaptchaDiv.style.display != "none"))) //No I18N
         {
            var grecap =  _form.querySelector("[name='g-recaptcha-response']");//No I18N
            var grcapVal = getElementVal(grecap);
            var captchaCheck = !!grcapVal;
            var newSub = _form.querySelector("#new_optin_response_in"); //No I18N
            var existingSub = _form.querySelector("#duplicate_optin_response_in"); //No I18N
            if (newSub && existingSub) {
                if (newSub.getAttribute("value") == "0" || existingSub.getAttribute("value") == "0") { //No I18N
                    captchaCheck = checkReCaptcha(_form);
                }
            }
            else if (typeof new_optin_response_in != "undefined" && typeof duplicate_optin_response_in != "undefined") //No I18N
             {
                if (new_optin_response_in == 0 || duplicate_optin_response_in == 0) {
                    captchaCheck = checkReCaptcha(_form);
                }
             }
            if (!captchaCheck) {
                markAsError(recaptchaDiv);
                temp = "false"; //No I18N
            }
            else {
                recaptchaDiv.style.borderColor = "";
                recaptchaDiv.style.borderStyle = "";
                recaptchaDiv.style.borderWidth = "";
            }
        }
        if (temp == "false") {
            unfade(errorMsgDiv);
            if (recaptchaDiv && recaptchaDiv.style.display != "none") //No I18N
            {
                if(typeof grecaptcha != "undefined")
                {
                    try
                    {
                        if(parent)
                        {
                            var catpchaFn = parent.trim().replace("#sf","").replace(/(\[.*signupform)|(\"\])/g,"");
                            var widgetId1 = window[catpchaFn+"_recaptcha"];
                            if(widgetId1)
                            {
                                grecaptcha.reset(widgetId1);
                            }
                            else
                            {
                                grecaptcha.reset();
                            }
                        }
                        else
                        {
                            grecaptcha.reset();
                        }
                    }
                    catch(e)
                    {
                        //dummy
                    }
                }
            }
            //  $ZC('html, body').animate({scrollTop: _form.closest("#customForm").find("#errorMsgDiv").offset().top}, 500);//No I18N
            var workInfoDetails = _form.querySelector("#workInfoDetails"); //No I18N
            if (workInfoDetails) {
                workInfoDetails.style.display = ""; //No I18N
            }
            result = false;
        }
        else {
            result = true;
        }
    }
    return result;
};
var serializeFormData = function (_form) {
    var inputs = _form.querySelectorAll("input[name],select[name],textarea[name]"); //No I18N
    var serializeStr = "";
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.name && input.name != "") {
            var tagName = input.tagName;
            var value = input.value;
            if (tagName == "SELECT" && input.getAttribute("multiple") == "multiple") {//No I18N
                value = "";
                var options = input.querySelectorAll("option");//No I18N
                if(options&&options.length>0)
                {
                    for(var j=0;j<options.length;j++)
                    {
                        var ele = options[j];
                        if (ele.selected) {
                            value += ele.value + ",";
                        }
                    }
                    value = value.substring(0, value.lastIndexOf(","))
                }
            }
            else if(tagName == "SELECT")//No I18N
            {
                var options = input.options;
                if(options)
                {
                    value = options[input.selectedIndex].value;
                }
            }
            else if(input.type&&input.type=="radio")
            {
				if(input.checked)
                {
					value = input.getAttribute("identity");
				}
			}
            else if(input.type&&input.type=="checkbox")
            {
                if(!value||value=="")
                {
                    value = input.checked;
                }
            }
            if(value&&value!="")
            {
                serializeStr += input.name + "=" + encodeURIComponent(value);
                serializeStr += "&";
            }
        }
    }
    if (serializeStr != "") {
        serializeStr = serializeStr.substring(0, serializeStr.length - 1);
    }
    return serializeStr;
};
var resetSignupForm = function (_form,parent) {
    var inputs = _form.querySelectorAll("input");//No I18N
    if(inputs)
    {
        for(var i = 0;i<inputs.length;i++)
        {
            var element = inputs[i];
            if (element.style.display == "none") { //No I18N
                return false;
            }
            var type = element.type;
            var tag = element.tagName.toLowerCase();
            if (type == 'text' || tag == 'textarea' || type == 'file') { //No I18N
                element.value = "";
            }
            else if (type == 'checkbox' || type == 'radio') { //No I18N
                element.checked = false;
            }
            else if (type == 'checkbox' || type == 'radio') { //No I18N
                element.checked = false;
            }
        }
    }
    var drpdwnmnusel = _form.querySelectorAll(".drpdwnmnusel");//No I18N
    if(drpdwnmnusel)
    {
        for(var i=0;i<drpdwnmnusel.length;i++)
        {
            var element = drpdwnmnusel[i];
            element.querySelector("p").innerText("--Select--"); //NO I18N
        }
    }
    var zcrdoslct = _form.querySelectorAll(".zcrdoslct");//No I18N
    if(zcrdoslct)
    {
        for(var i=0;i<zcrdoslct.length;i++)
        {
            var element = zcrdoslct[i];
            element.classList.add("zcrdounslct"); //No I18N
            element.classList.remove("zcrdoslct"); //No I18N
        }
    }
    var markedCheckbox = _form.querySelectorAll(".zcicon-checkbox-marked");//No I18N
    if(markedCheckbox)
    {
        for(var i=0;i<markedCheckbox.length;i++)
        {
            var element = markedCheckbox[i];
            element.classList.add("zcicon-checkbox-blank-outline"); //No I18N
            element.classList.remove("zcicon-checkbox-marked"); //No I18N
        }
    }
    var mlslct = _form.querySelectorAll(".mlslct");//No I18N
    if(mlslct)
    {
        for(var i=0;i<mlslct.length;i++)
        {
            var element = mlslct[i];
            element.querySelector("i").click(); //No I18N
        }
    }
    var captchaContainer = _form.querySelector("[name='captchaContainer']"); //No I18N
    var recapParent = _form.querySelector("#captcha"); //No I18N
    if (captchaContainer && captchaContainer.style.display != 'none') { //No I18N
        loadCaptcha("", _form.querySelector("#captchaDiv"), _form); //No I18N
    }
    else if (recapParent && recapParent.style.display != "none") { //No I18N
        var recapDiv = _form.querySelector("#recapDiv"); //No I18N
        if (recapDiv && recapDiv.style.display != "none") { //No I18N
            if(typeof grecaptcha != "undefined")
            {
                try
                {
                    if(parent)
                    {
                        var catpchaFn = parent.trim().replace("#sf","").replace(/(\[.*signupform)|(\"\])/g,"");
                        var widgetId1 = window[catpchaFn+"_recaptcha"];
                        if(widgetId1)
                        {
                            grecaptcha.reset(widgetId1);
                        }
                        else
                        {
                            grecaptcha.reset();
                        }
                    }
                    else
                    {
                        grecaptcha.reset();
                    }
                }
                catch(e)
                {
                    //dummy
                }
            }
        }
        recapParent.style.borderColor = "";
        recapParent.style.borderStyle = "";
        recapParent.style.borderWidth = "";
    }
};
var dataParsing = function (data, callbackMode, customEventTrigger, _form, popUpWindow) {
    var jsonObj;
    jsonObj = {};
    var isSmart = false;
    var hostnameFirstParty = location.hostname;
    jsonObj.hostnameFirstParty = hostnameFirstParty;
    var zcTP =  _form.querySelector("[name='zcTP']"); //No I18N
    var responseData = zcTP?zcTP.value:null;
    var cookie = document.cookie;
    var srvc_Type = 2; 
    var c_start = cookie.indexOf("zc_cu" + "="); //No I18N
    if (c_start == -1) {
        cookie = null;
    }
    else {
        c_start = cookie.indexOf("=", c_start) + 1; //No I18N
        var c_end = cookie.indexOf(";", c_start); //No I18N
        if (c_end == -1) {
            c_end = cookie.length;
        }
        cookie = unescape(cookie.substring(c_start, c_end));
    }
    if(responseData)
    {
    	responseData = JSON.parse(responseData);
    	cookie = responseData.zc_ck;
    	jsonObj.zc_tp = responseData.zc_tp;
    	isFromWebsite = "false"; //No I18N
    }
    jsonObj.cookie = cookie;
    jsonObj.isFromWebsite = "true"; //No I18N
    jsonObj.url=window.location.href;
    jsonObj.srvc_Type = srvc_Type;
    var p_from = document.querySelector("#p_from");//No I18N
    var popup_SF_ = document.querySelector("#popup_SF_"+ZCWA.SFLen);//No I18N
    var popup_WA_ = document.querySelector("#popup_WA_"+ZCWA.WALen);//No I18N
    if(((typeof(data)==="string"&&data.indexOf("ZCERRORJSON") <= -1)||(typeof(data)==="object"&&data.responseType!="ZCERRORJSON")) && p_from && (popup_SF_|| popup_WA_))
    {
    	var waUrl = window.location.href;
    	var waArrParams = waUrl.split("?");
    	jsonObj.url = waArrParams[0];
        if(popup_WA_)
        {
            popup_WA_.style.display = "block";
        }
        if(popup_SF_)
        {
            popup_SF_.style.display = "block";
        }
        jsonObj.popupInfoMap_Id = ZCWA.popupInfoMap_Id;
        if(ZCWA.from == "SF")
		{
			addPopupHistory("response"); //No I18N
        }
        else
		{
            var ck=jsonObj.cookie;
			var ustart=ck.indexOf("-");
	    	var currUser=ck.substring(ustart+1,ustart+2);
			if(currUser == 'v')
			{
				addPopupHistory("response"); //No I18N
			}
			else
			{
				isSmart = true;
				var json = "{}";
				json = JSON.parse(json);
				var zc_tp = getZCookie("zc_tp");//No I18N
		        if(zc_tp != null)
		        {
		            json.zc_tp = zc_tp;
		        }
                var cdata=data;
                if((typeof(cdata)==="string"&&cdata.indexOf("ZC_TYPEJSON") > -1)||(typeof(cdata)==="object"&&cdata.responseType=="ZC_TYPEJSON"))
				{
					if(typeof(cdata)==="string")
					{
						parsedJson = JSON.parse(cdata);
					}
					json.emailId = parsedJson.emailid;
					json.isNewContact = parsedJson.isNewContact;
					json.listKey = parsedJson.listId;
				}
				else if((typeof(cdata)==="string"&&cdata.indexOf("ZC_TYPE_2_JSON") > -1)||(typeof(cdata)==="object"&&cdata.responseType=="ZC_TYPE_2_JSON"))
				{
					var n = cdata.indexOf("##ZCJSON##</div>");
					var startIndex = cdata.indexOf("##ZCJSONSTART##")+15;
					var details = cdata.substring(startIndex,n);
					cdata = cdata.substring(n+10);
					parsedJson = JSON.parse(details);
					if(parsedJson.ZC_NEWOPTINRESPONSE!==undefined && parsedJson.ZC_NEWOPTINRESPONSE===0)
					{
						json.emailId = parsedJson.emailid;
						json.isNewContact = parsedJson.isNewContact;
						json.listKey = parsedJson.listId;
					}
                }
                json.customerID=ck.substring(ck.indexOf("-")+2);
				json.action="contactCheck";
				var protocol = window.location.protocol;
				if(protocol.indexOf("http") < 0)
				{
					protocol = "http"+":";//No I18N
                }
                var mgPopupUrl = protocol+"//"+ZC_RedirUrl+"/wa/PopupAction";//No I18N
                sendAjaxReq(mgPopupUrl,json,"POST",true,function(msg){//No I18N
                    if(msg.indexOf("###DIFF_") > -1 )
					{
						var customerRelId=msg.substring(msg.indexOf("_")+1);
						addPopupHistory("response"); //No I18N
						setTimeout(function(){
							addPopupHistory("view","response",customerRelId); //No I18N
							isSmart = false;
						},250);
						
					}
					else
					{
						addPopupHistory("response","signup"); //No I18N
						isSmart = false;
					}
                });
            }
        }
        setAchievedCookie();
    }
    if (callbackMode && customEventTrigger) {
        if (callbackMode) {
            //Users event triggered after submit
            customEventTrigger();
        }
    }
    var SmartTimer = setInterval(function () {
    	if(!isSmart){
    		clearInterval(SmartTimer);
		    var parsedJson;
		    if ((typeof (data) === "string" && data.indexOf("ZC_TYPEJSON") > -1) || (typeof (data) === "object" && data.responseType == "ZC_TYPEJSON")) { //No I18N //redirect url(newOptinResponse=1) & inlineMessage(newOptinResponse=2).
		        if (typeof (data) === "string") { //No I18N
		            parsedJson = JSON.parse(data);
		        }
		        else if (typeof (data) != "object") { //No I18N
		            try {
		                parsedJson = JSON.parse(data);
		            }
		            catch (e) {
		            	var errorInput = document.createElement("input");
		            	errorInput.type="hidden";
		            	errorInput.value =e;
		            	errorInput.id = "zcError";
		            	_form.appendChild(errorInput);
		            }
		        }
		        else {
		            parsedJson = data;
		        }
		        jsonObj.emailid = parsedJson.emailid;
		        jsonObj.zsoid = parsedJson.zsoid;
				jsonObj.isNewContact = parsedJson.isNewContact;
				jsonObj.listKey = parsedJson.listId;
				var spmSubmit = parsedJson.spmSubmit != undefined ? parsedJson.spmSubmit : false;
		        var isMANewui = parsedJson.isMANewui;
                var cntrIx = parsedJson.cntrIx != undefined ? parsedJson.cntrIx : null;
                var encryptSFId = parsedJson.encryptSFId != undefined ? parsedJson.encryptSFId : null;
				var zc_tp = getZCookie("zc_tp");//No I18N
		        if(zc_tp != null)
		        {
		            jsonObj.zc_tp = zc_tp;
		        }
                if(cntrIx != null)
                {
                    if(document.querySelector('[id="zcCntr'+encryptSFId+'"]') == null)
                    {
                        var docBodyEle = document.getElementsByTagName("body")[0];
                        var hidEle = document.createElement("input");
                        setZcAttributes(hidEle,{"type":"hidden","id":"zcCntr"+encryptSFId,"value":cntrIx}); //No I18N
                        docBodyEle.appendChild(hidEle);
                    }
                    else
                    {
                        document.querySelector('[id="zcCntr'+encryptSFId+'"]').value = cntrIx; //No I18N
                    }
                }
		        var protocol = window.location.protocol;
		        if (parsedJson.newOptinResponse !== undefined && parsedJson.newOptinResponse === 2) {  //response is inline custom msg -> newOptinResponse == 2
		            if (popUpWindow) {
		                popUpWindow.close();
		            }
		            if(!spmSubmit)
		            {
		            	if(isMANewui && window._zps) //hook for PageSense LeadConversion API
		                {
		                	window._zps.api('setMHIdentifierInfo', [jsonObj.emailid]);
		                }
		                else if (cookie && cookie != null && cookie != "") {
			                var newScript = document.createElement("script"); //No I18N
			                newScript.type = "application/javascript"; //No I18N
			                var anonParams = zc_serializeJson(jsonObj);
			                newScript.src = protocol + "//"+ZC_RedirUrl+"/wa/addmappingforanonymousandcontacts"+anonParams; //No I18N
			                newScript.setAttribute("onload", "this.parentNode.removeChild(this);"); //No I18N
			                document.body.appendChild(newScript);
		                }
		            }
		            //inline message outside form, copy and paste the div with data inside the form
		            var newSfSuccessDiv_1 =  _form.querySelector("#Zc_SignupSuccess");//No I18N
		            if(!newSfSuccessDiv_1)
		            {
		                var sfSuccessDiv = document.querySelector("#Zc_SignupSuccess"); //No I18N
                        sfSuccessDiv.style.zIndex = "99999";
		                if (sfSuccessDiv) {
		                    var sfSuccessDivParent = sfSuccessDiv.parentElement.cloneNode(true);
		                    var firstField = _form.querySelector("input[name]");
		                    if(firstField)
		                    {
		                        var firstFieldParent = firstField.parentElement;
		                        if(firstFieldParent)
		                        {
		                            firstFieldParent.insertBefore(sfSuccessDivParent,firstField);
		                        }
		                        else
		                        {
		                            _form.insertBefore(sfSuccessDivParent,_form.children[0]);
		                        }
		                    }
		                    else
		                    {
		                        _form.insertBefore(sfSuccessDivParent,_form.children[0]);
		                    }
		                    
		                    newSfSuccessDiv_1 = _form.querySelector("#Zc_SignupSuccess"); //No I18N
		                }
		              
		            }
		            //Inline message inside the form
		           if(newSfSuccessDiv_1)
		           {
		                var successMessage = newSfSuccessDiv_1.querySelector("#signupSuccessMsg"); //No I18N
		                if (successMessage) {
		                    successMessage.innerText = parsedJson.inlineMessage;
		                }
		                unfade(newSfSuccessDiv_1, 10, function () {
		                    setTimeout(function () {
		                        fade(newSfSuccessDiv_1);
		                        if(ZCWA.SFLen != undefined)
		                        {
		                            if(popup_SF_)
		                            {
		                                var popupOverlay =  document.querySelector("#PopupOverLay_SF_"+ZCWA.SFLen);//No I18N
		                                if(popupOverlay)
		                                {
		                                    popupOverlay.style.display = "none";//No I18N
		                                }
		                                popup_SF_.style.display = "none";//No I18N
		                            }
		                        }
		                        else if(ZCWA.WALen != undefined)
		                        {
		                            if(popup_WA_)
		                            {
		                                var popupOverlay =  document.querySelector("#PopupOverLay_WA_"+ZCWA.WALen);//No I18N
		                                if(popupOverlay)
		                                {
		                                    popupOverlay.style.display = "none";//No I18N
		                                }
		                                popup_WA_.style.display = "none";//No I18N
		                            }
		                        }
		                    }, 3000);
		                });
		           }
		        }
		        else if (parsedJson.newOptinResponse !== undefined && parsedJson.newOptinResponse === 1) { //redirect url(newOptinResponse=1)
		        	var targetUrl = parsedJson.targetUrl;
		            if(ZCWA.SFLen != undefined)
		            {
		                if(popup_SF_)
		                {
		                    var popupOverlay =  document.querySelector("#PopupOverLay_SF_"+ZCWA.SFLen);//No I18N
		                    if(popupOverlay)
		                    {
		                        popupOverlay.style.display = "none";//No I18N
		                    }
		                    popup_SF_.style.display = "none";//No I18N
		                }
		            }
		            else if(ZCWA.WALen != undefined)
		            {
		                if(popup_WA_)
		                {
		                    var popupOverlay =  document.querySelector("#PopupOverLay_WA_"+ZCWA.WALen);//No I18N
		                    if(popupOverlay)
		                    {
		                        popupOverlay.style.display = "none";//No I18N
		                    }
		                    popup_WA_.style.display = "none";//No I18N
		                }
		            }
		            
		            if(!spmSubmit)
		            {
		            	if(isMANewui && window._zps) //hook for PageSense LeadConversion API
		                {
		                	window._zps.api('setMHIdentifierInfo', [jsonObj.emailid]);
		                }
		            	else if (cookie && cookie != null && cookie != "") {
			                var newScript = document.createElement("script"); //No I18N
			                newScript.type = "application/javascript"; //No I18N
			                var anonParams = zc_serializeJson(jsonObj);
			                  newScript.src = protocol + "//"+ZC_RedirUrl+"/wa/addmappingforanonymousandcontacts"+anonParams; //No I18N
			                newScript.setAttribute("onload", "this.parentNode.removeChild(this);"); //No I18N
			                document.body.appendChild(newScript);
			            }
		            }		            
		            if (parsedJson.targetWindow !== undefined && parsedJson.targetWindow === "_self") { //No I18N
		                if (popUpWindow) {
		                    popUpWindow.close();
		                }
		                window.location.href = targetUrl;
		            }
		            else {
		                if (popUpWindow) {
		                    popUpWindow.window.location.href = targetUrl;
		                }
		                else {
		                    window.open(targetUrl);
		                }
		            }
		            
		            /*if (cookie && cookie != null && cookie != "") 
                    {
                        var protocol = window.location.protocol;
                        var url = ZC_RedirUrl;
                        url = protocol+"//" + url;//No I18N
                        url = url + "/wa/addmappingforanonymousandcontacts";//No I18N                                   
                        setTimeout(function(){//Make ASYC
                            zcmpsendAjaxReq(url,jsonObj,"GET",true,function(data){//No I18N                     
                                if (parsedJson.targetWindow !== undefined && parsedJson.targetWindow === "_self") { //No I18N
                                    if (popUpWindow) {
                                        popUpWindow.close();
                                    }
                                    window.location.href = targetUrl;
                                }
                                else {
                                    if (popUpWindow) {
                                        popUpWindow.window.location.href = targetUrl;
                                    }
                                    else {
                                        window.open(targetUrl);
                                    }
                                }
                            })
                        },1);
                    }
                    else
                    {
                        if (parsedJson.targetWindow !== undefined && parsedJson.targetWindow === "_self") { //No I18N
                            if (popUpWindow) {
                                popUpWindow.close();
                            }
                            window.location.href = targetUrl;
                        }
                        else {
                            if (popUpWindow) {
                                popUpWindow.window.location.href = targetUrl;
                            }
                            else {
                                window.open(targetUrl);
                            }
                        }
                    }*/
		        }
		    }
		    else if (data.indexOf("ZC_TYPE_2_JSON") > -1) { //No I18N //thankyou page will be shown(newOptinResponse=0)
		        var n = data.indexOf("##ZCJSON##</div>"); //No I18N
		        var startIndex = data.indexOf("##ZCJSONSTART##") + 15; //No I18N
		        var details = data.substring(startIndex, n);
		        data = data.substring(n + 10);
                
                var divEle = document.createElement("div");
                divEle.setAttribute("id","zcJSONDiv");        
                divEle.innerHTML = details;
                var jsHead = document.getElementsByTagName("head")[0]; 
                jsHead.appendChild(divEle);
                parsedJson = JSON.parse(document.querySelector("#zcJSONDiv").innerText); //No I18N
		        //parsedJson = JSON.parse(details);
		        if (parsedJson.ZC_NEWOPTINRESPONSE !== undefined && parsedJson.ZC_NEWOPTINRESPONSE === 0) {
		            jsonObj.emailid = parsedJson.emailid;
		            jsonObj.zsoid = parsedJson.zsoid;
		            jsonObj.isNewContact = parsedJson.isNewContact;
					jsonObj.listKey = parsedJson.listId;
					var spmSubmit = parsedJson.spmSubmit != undefined ? parsedJson.spmSubmit : false;					
		            var isMANewui = parsedJson.isMANewui;
                    var cntrIx = parsedJson.cntrIx != undefined ? parsedJson.cntrIx : null;
                    var encryptSFId = parsedJson.encryptSFId != undefined ? parsedJson.encryptSFId : null;
					var zc_tp = getZCookie("zc_tp");//No I18N
			        if(zc_tp != null)
			        {
			            jsonObj.zc_tp = zc_tp;
			        }
		            var protocol = window.location.protocol;
                    if(parsedJson.ZC_TARGETWINDOW !== undefined && (parsedJson.ZC_TARGETWINDOW === "_self" ||  parsedJson.ZC_TARGETWINDOW === "_blank"))
                    {
                        hideMAPopup()                        
                    }
                    
                    if(!spmSubmit)
                    {
                    	if(isMANewui && window._zps) //hook for PageSense LeadConversion API
                        {
                        	window._zps.api('setMHIdentifierInfo', [jsonObj.emailid]);
                        }
                        else if ( cookie && cookie != null && cookie != "") {
    		                var newScript = document.createElement("script"); //No I18N
    		                newScript.type = "application/javascript"; //No I18N
    		                var anonParams = zc_serializeJson(jsonObj);
    		                  newScript.src = protocol + "//"+ZC_RedirUrl+"/wa/addmappingforanonymousandcontacts"+anonParams; //No I18N
    		                newScript.setAttribute("onload", "this.parentNode.removeChild(this);"); //No I18N
    		                document.body.appendChild(newScript);
    		            }
                    }
                    if(cntrIx != null)
                    {
                        if(document.querySelector('[id="zcCntr'+encryptSFId+'"]') == null)
                        {
                            var docBodyEle = document.getElementsByTagName("body")[0];
                            var hidEle = document.createElement("input");
                            setZcAttributes(hidEle,{"type":"hidden","id":"zcCntr"+encryptSFId,"value":cntrIx}); //No I18N
                            docBodyEle.appendChild(hidEle);
                        }
                        else
                        {
                            document.querySelector('[id="zcCntr'+encryptSFId+'"]').value = cntrIx; //No I18N
                        }
                        
                    }	            
		            if (parsedJson.ZC_TARGETWINDOW !== undefined && parsedJson.ZC_TARGETWINDOW === "_self") { //No I18N
		                if (popUpWindow) {
		                    popUpWindow.close();
		                }
		                var signUpFormInline = closest(_form, "#signUpFormInline"); //No I18N
		                if (signUpFormInline && signUpFormInline.style.display != "none") { //No I18N
		                    document.querySelector("head").remove(); //No I18N
		                    var closeIconHtml = document.querySelector("#zc_close").cloneNode(true); //No I18N
		                    signUpFormInline.innerHTML = "";
		                    signUpFormInline.appendChild(document.createElement(data));
		                    signUpFormInline.prependChild(closeIconHtml);
		                    signUpFormInline.querySelector("#zc_close").style.zIndex = "2"; //No I18N
		                    signUpFormInline.style.height = "240px"; //No I18N
		                    signUpFormInline.style.width = "700px"; //No I18N
		                }
		                else {
		                    document.body.innerHTML = data;
		                    zc_runResponseJS(data);
		                    window.parent.postMessage(data, "*"); //No I18N
		                }
		            }
		            else if (parsedJson.ZC_TARGETWINDOW !== undefined && parsedJson.ZC_TARGETWINDOW === "_blank") { //No I18N
		                var myWindow = null;
		                if (popUpWindow) {
		                    myWindow = popUpWindow;
		                }
		                else {
		                    myWindow = window.open("");
		                }
		                var title = document.title;
		                myWindow.document.write('<!DOCTYPE HTML><html><head><title>' + title + '</title></head>'); //No I18N
		                myWindow.document.write("<body>" + data + "</body>"); //No I18N
		                myWindow.document.write('</html>'); //No I18N
		                myWindow.window.history.pushState({ "html": "", "pageTitle": "" }, "", window.location.href); //No I18N
		                myWindow.document.close(); //Close write stream
		            }
		            else //InlinePopup Case
		             {
		                if (popUpWindow) {
		                    popUpWindow.close();
		                }
		                var fbPage = getElementVal(document.querySelector('#zc_trackCode')); //No I18N
		                if (window.self !== window.top && fbPage != "fbSignUp") { //No I18N
		                    var zcOptinSuccessPanel = document.querySelector("#zcOptinSuccessPanel"); //No I18N
		                    zcOptinSuccessPanel.innerHTML = data;
		                    zc_runResponseJS(data);
		                    window.parent.postMessage(document.body.innerHTML, "*");
		                }
		                else {
                            var entity; var entityLen;
                            if(ZCWA.SFLen != undefined)
                            {
                                entity = "popup_SF_"; //No I18N
                                entityLen = ZCWA.SFLen;
                            }
                            else if(ZCWA.WALen != undefined)
                            {
                                entity = "popup_WA_"; //No I18N
                                entityLen = ZCWA.WALen;
                            }
                            var zcOverlay;
                            var zcOptinSuccessPanel_1;
                            var zcOptinSuccessPopup;
                            var popupEntity =  document.querySelector("#"+entity+entityLen);
                            if(popupEntity != null)
                            {
                                zcOverlay = popupEntity.querySelector("#zcOptinOverLay"); //No I18N
                                zcOptinSuccessPanel_1 = popupEntity.querySelector("#zcOptinSuccessPanel"); //No I18N
                                zcOptinSuccessPopup = popupEntity.querySelector("#zcOptinSuccessPopup"); //No I18N
                                popupEntity.querySelector("#zcOptinSuccessPopup").querySelector("span").addEventListener("click",hideMAPopup); //No I18N
                            }
                            else
                            {
                                zcOverlay = document.querySelector("#zcOptinOverLay"); //No I18N
                                zcOptinSuccessPanel_1 = document.querySelector("#zcOptinSuccessPanel"); //No I18N
                                zcOptinSuccessPopup = document.querySelector("#zcOptinSuccessPopup"); //No I18N
                            }
		                    if (zcOverlay) {
		                        zcOverlay.style.height = "100%"; //No I18N
                                zcOverlay.style.width = "100%"; //No I18N
                                unfade(zcOverlay, 10, function () {
                                    zcOptinSuccessPanel_1.innerHTML = data;
                                    zc_runResponseJS(data);
                                    unfade(zcOptinSuccessPopup); //No I18N                                   
                                });
		                    }
		                }
		            }
		        }
		    }
		    else if (data.lastIndexOf("##ZCJSON##") > -1) { //No I18N
		        if(ZCWA.SFLen != undefined)
		        {
		            if(popup_SF_)
		            {
		                var popupOverlay =  document.querySelector("#PopupOverLay_SF_"+ZCWA.SFLen);//No I18N
		                if(popupOverlay)
		                {
		                    popupOverlay.style.display = "none";//No I18N
		                }
		                popup_SF_.style.display = "none";//No I18N
		            }
		        }
		        else if(ZCWA.WALen != undefined)
		        {
		            if(popup_WA_)
		            {
		                var popupOverlay =  document.querySelector("#PopupOverLay_WA_"+ZCWA.WALen);//No I18N
		                if(popupOverlay)
		                {
		                    popupOverlay.style.display = "none";//No I18N
		                }
		                popup_WA_.style.display = "none";//No I18N
		            }
		        }
		        if (popUpWindow) {
		            popUpWindow.close();
		        }
		        var n = data.lastIndexOf("##ZCJSON##"); //No I18N
		        var startIndex = data.indexOf("##ZCJSONSTART##") + 15; //No I18N
		        data = data.substring(n + 10);
		        unfade(document.querySelector("#zcOptinSuccessPopup")); //No I18N
		        var body = document.body, html = document.documentElement;
		        var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
		        var zcOverlay = document.querySelector("#zcOptinOverLay"); //No I18N
		        zcOverlay.style.height = height.toString();
		        zcOverlay.style.display = ""; //No I18N
		        var zcOptinSuccessPanel = document.querySelector("#zcOptinSuccessPanel"); //No I18N
		        zcOptinSuccessPanel.innerHTML = data;
		        zc_runResponseJS(data);
		        if (data.indexOf("###ZCJSON#") != -1) { //No I18N
		            themeParse(signupTheme);
		            themeParse(thanksPageTheme);
		        }
		    }
    else if(data.indexOf("isResubscription")>-1)
    {
        //Resubscribe case
        var newSub = _form.querySelector("#new_optin_response_in"); //No I18N
        var newWindow = false;
        if (newSub) {
            if (newSub.getAttribute("value") == "0" || newSub.getAttribute("value") == "2" ) //No I18N
            { 
                newWindow = true;
            }
        }
        else if (typeof new_optin_response_in != "undefined" ) //No I18N
        {
            if (new_optin_response_in == 0 || new_optin_response_in == 2) 
            {
                newWindow = true;
            }
        }
       
        if(newWindow)
        {
            var windowOpen = null;
            if (popUpWindow) 
            {
                windowOpen = popUpWindow;
            }
            else
            {
                windowOpen = window.open("");
            }
            windowOpen.document.write(data);
            windowOpen.window.history.pushState({ "html": "", "pageTitle": "" }, "", ""); //No I18N
            windowOpen.document.close(); //Close write stream
        }
        else//Same window
        {
            if(popUpWindow)
            {
                popUpWindow.close();
            }
            var links = document.querySelectorAll("style,link");//No I18N
            if(links)
            {
                for(var i = 0; i<links.length;i++)
                {
                    links[i].remove();
                }
            }
            document.body.innerHTML = data;
            zc_runResponseJS(data);
            window.parent.postMessage(data, "*"); //No I18N
        }
    }
		    else {
		        var windowOpen = null;
		        if (popUpWindow) {
		            windowOpen = popUpWindow;
		        }
		        else {
		            windowOpen = window.open("");
		        }
		        windowOpen.document.write(data);
		        windowOpen.window.history.pushState({ "html": "", "pageTitle": "" }, "", ""); //No I18N
		        windowOpen.document.close(); //Close write stream
		    }
    	}
    },250);
};
function hideMAPopup()
{
    if(ZCWA.SFLen != undefined)
    {
        popup_SF_ = document.querySelector("#popup_SF_"+ZCWA.SFLen); //No I18N
        if(popup_SF_)
        {
            var popupOverlay =  document.querySelector("#PopupOverLay_SF_"+ZCWA.SFLen);//No I18N
            if(popupOverlay)
            {
                popupOverlay.style.display = "none";//No I18N
            }
            popup_SF_.style.display = "none";//No I18N
        }
    }
    else if(ZCWA.WALen != undefined)
    {
        popup_WA_ = document.querySelector("#popup_WA_"+ZCWA.WALen); //No I18N
        if(popup_WA_)
        {
            var popupOverlay =  document.querySelector("#PopupOverLay_WA_"+ZCWA.WALen);//No I18N
            if(popupOverlay)
            {
                popupOverlay.style.display = "none";//No I18N
            }
            popup_WA_.style.display = "none";//No I18N
        }
    }
}
var loadCaptcha = function (url, captchaDiv, _form) {
    if (_form === void 0) { _form = void 0; }
    var captchaUrl;
    if (url !== undefined && url !== "") {
        captchaUrl = url;
    }
    else if (url === "" || !url || url === "undefined" || url === "null") //No I18N
     {
        captchaUrl = getElementVal(_form.querySelector("#zc_Url")) + "/ua/CaptchaVerify?mode=generate"; //No I18N
    }
    if (captchaUrl.indexOf("http") < 0) {
        var protocol = "ht" + "tps" + ":"; //No I18N
        captchaUrl = protocol + "//" + captchaUrl;
    }
    else {
        captchaUrl.replace("ht" + "tp:", "ht" + "tps:"); //No I18N
    }
    sendAjaxReq(captchaUrl, {}, "GET", true, function (msg) {//No I18N
        if(captchaDiv)
        {
            captchaDiv.innerHTML = msg;
            var captchaImg = captchaDiv.querySelector('img'); //No I18N
            captchaImg.style.maxWidth = "200px"; //No I18N
            captchaImg.style.width = "100%"; //No I18N
        }
    });
};
function unfade(element, interval, callback) {
    if (interval === void 0) { interval = 10; }
    if (callback === void 0) { callback = void 0; }
    var op = 0.1; // initial opacity
    var original_opacity = element.style.opacity; 
    if(original_opacity === void 0 || original_opacity == "")
    {
    	original_opacity = 1;
    }
    element.style.display = ''; //No I18N
    var timer = setInterval(function () {
        if (op == original_opacity) {
	    	  element.style.opacity = op;
	          element.style.filter = 'alpha(opacity=' + op * 100 + ")"; //No I18N
            clearInterval(timer);
            if (callback) {
                callback();
            }
            return;
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")"; //No I18N
        op += op * 0.1;
        if(op>original_opacity)
        {
        	op = original_opacity;
        }
    }, interval);
}
var themeParse = function (json, elm) {
    if (elm === void 0) { elm = void 0; }
    var jsonStr = JSON.stringify(json);
    var isOpenSans = false;
    if (!elm && jsonStr.indexOf("THANKSPAGE") == -1) //No I18N
     {
        var signupformPage = document.querySelector("[name='SIGNUP_PAGE']"); //No I18N
        if (signupformPage) {
            elm = signupformPage.parentNode;
        }
    }
    var custDivRef;
    if (elm == "tm_subscribe_thanks" || elm == "tm_subscribe_thanks_duplicate" || elm == "tm_doptin_thanks" || elm == "tm_doptin_thanks_exist") //No I18N
     {
        var element = document.querySelector("#" + elm);
        custDivRef = closest(element, "#customForm"); //No I18N
    }
    else {
    	custDivRef = closest(elm, "#customForm"); //No I18N
    	elm = custDivRef;
    }
    var keys = Object.keys(json);
    for (var i = 0; i < keys.length; i++) 
    {
        var key = keys[i];
        var data = json[key];
        if (key == "DUPLICATE_THANKS_PAGE_BODY") //No I18N
         {
            key = "THANKS_PAGE_BODY"; //NO I18N
        }
        else if (key == "DUPLICATE_THANKSPAGE") //No I18N
         {
            key = "THANKSPAGE"; //NO I18N
        }
        else if (key == "DUPLICATE_THANKS_HEADER") //No I18N
         {
            key = "THANKS_HEADER"; //NO I18N
        }
		if(!isOpenSans&&data)
        {
			var dataStr = data;
			if(typeof data == "object")
            {
				dataStr = JSON.stringify(data);
            }
			dataStr = dataStr.toLowerCase();
			isOpenSans = dataStr.indexOf('open sans')>-1;
		}
        if (elm) {
        	var e = elm.querySelectorAll("#" + key);
        	if(e&&e.length>0)
        	{
        		zc_ApplyStyles(e,data);
        	}
            e = elm.querySelectorAll("[name=" + key + "]");//No I18N
            if(e&&e.length>0)
        	{
        		zc_ApplyStyles(e,data);
        	}
            
        }
        else {
            if (custDivRef) {
            	var e = custDivRef.querySelectorAll("#" + key);
            	if(e&&e.length>0)
            	{
            		zc_ApplyStyles(e,data);
            	}
                e = custDivRef.querySelectorAll("[name=" + key + "]");//No I18N
                if(e&&e.length>0)
            	{
            		zc_ApplyStyles(e,data);
            	}
                
            }
            else {
            	custDivRef = document;
            	var e = custDivRef.querySelectorAll("#" + key);
            	if(e&&e.length>0)
            	{
            		zc_ApplyStyles(e,data);
            	}
                e = custDivRef.querySelectorAll("[name=" + key + "]");//No I18N
                if(e&&e.length>0)
            	{
            		zc_ApplyStyles(e,data);
            	}
            }
        }
        var changeItems = custDivRef.querySelectorAll("[changeItem=" + key + "]");//No I18N
        if (changeItems&&changeItems.length>0) {
        	zc_ApplyStyles(changeItems,data);
        }
        if (key == "SIGNUP_FORM_FIELD" && data.height) { //No I18N
            var itemHeight = data.height;
            if (itemHeight && itemHeight != "") {
                itemHeight = itemHeight.replace("px", ""); //No I18N
                if (!isNaN(parseInt(itemHeight))) {
                    itemHeight = (3 * parseInt(itemHeight)) < 90 ? 3 * parseInt(itemHeight) : 90;
                    var textArea = custDivRef.querySelectorAll("select[multiple='multiple'],textarea"); //No I18N
                    if (textArea&&textArea.length>0) { //No I18N
                    	zc_ApplyStyles(textArea,{"height":itemHeight+"px"});//No I18N
                    }
                }
            }
        }
    }
    if (isOpenSans) {
        var openSansString = "";
        openSansString = '@font-face {font-family: "Open Sans";font-style: normal;font-weight: 400; src: url("https://webfonts.zohostatic.com/opensans/font.woff") format("woff");}'; //No I18N
        openSansString += '\n@font-face {font-family: "Open Sans";font-style: normal;font-weight: 600; src: url("https://webfonts.zohostatic.com/opensanssemibold/font.woff") format("woff");}'; //No I18N
        openSansString += '\n@font-face {font-family: "Open Sans";font-style: normal;font-weight: 300; src: url("https://webfonts.zohostatic.com/opensanslight/font.woff") format("woff");}'; //No I18N
        openSansString += '\n@font-face {font-family: "Open Sans";font-style: normal;font-weight: 700; src: url("https://webfonts.zohostatic.com/opensansbold/font.woff") format("woff");}\n'; //No I18N
        var targetStyleTag = void 0;
        if (custDivRef) {
            targetStyleTag = custDivRef.querySelector("style"); //No I18N
        }
        if(!targetStyleTag)
        {
            targetStyleTag = document.querySelector("style");//No I18N
        }
        if (targetStyleTag && targetStyleTag.innerHTML.indexOf("@font-face") == -1) { //No I18N
            targetStyleTag.innerHTML += openSansString;
        }
    }
    if(typeof isReady!= "undefined")
	{
		isReady = true;
		var signupPage = document.querySelector("[name='SIGNUP_PAGE']");//No I18N
        var signupBody = document.querySelector("[name='SIGNUP_BODY']");//No I18N
        if(custDivRef)
        {
            signupPage = custDivRef.querySelector("[name='SIGNUP_PAGE']");//No I18N
            signupBody = custDivRef.querySelector("[name='SIGNUP_BODY']");//No I18N
        }
		if(signupPage)
		{
			unfade(signupPage);
		}
		if(signupBody)
		{
			unfade(signupBody);
		}
	}
};
function splCharValidationForSignupForm(fieldValue, splCharArray, id, _form) {
    for (var i = 0; i < splCharArray.length; i++) {
        if (fieldValue.indexOf(splCharArray[i]) >= 0) {
        	if(id)
        	{
        		_form.querySelector("#" + id).focus();
        	}
            return false;
        }
    }
    return true;
}
function emailPatternCheck(email) {
    //let re=new RegExp(/^[a-zA-Z0-9\_\-\.\+]+\@[a-zA-Z0-9\-\_]+(\.[a-zA-Z0-9\-\_]{2,5})(\.[a-zA-Z0-9\-\_]{2,5})?$/);
    //let re=new RegExp(/^[a-zA-Z0-9\_\-\'\.\+]+\@[a-zA-Z0-9\-\_]+(?:\.[a-zA-Z0-9\-\_]+){0,3}\.(?:[a-zA-Z0-9\-\_]{2,6})$/);
    //let re=new RegExp(/^[a-zA-Z0-9\_\-\'\.\+]+\@[a-zA-Z0-9\-\_]+(?:\.[a-zA-Z0-9\-\_]+){0,3}\.(?:[a-zA-Z0-9\-\_]{2,15})$/);
    var re = new RegExp("^[_a-zA-Z0-9](?:[\\w-.+&\\'\&]*)@(?:(?:[a-zA-Z0-9]+\\.)|(?:[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\\.))+(?:[a-zA-Z]{2,25})$"); 
    if (!re.test(email)) {
        return false;
    }
    return true;
}
function captchaCheckForOptin(digest, capText, _form) {
    var result = false;
    var campaignsUrl = getElementVal(_form.querySelector("#zc_Url")); //No I18N
    if (campaignsUrl != undefined && campaignsUrl.indexOf("http") < 0) //No I18N
     {
        var protocol = "ht" + "tps" + ":"; //No I18N
        campaignsUrl = protocol + "//" + campaignsUrl;
    }
    var action_url = campaignsUrl + "/ua/CaptchaVerify"; //No I18N
    var jsonObj={};
    jsonObj.digest = digest;
    jsonObj.capText = capText;
    jsonObj.mode = "verify"; //No I18N
    result = sendAjaxReq(action_url, jsonObj, "GET", false, function (msg) {//No I18N
        var res = msg;
        if (res.indexOf("failure") > -1) //No I18N
         {
            return false;
        }
        else {
            return true;
        }
    });
    return result;
}
function checkReCaptcha(_form) {
    var result = false;
    var greEle = _form.querySelector("[name='g-recaptcha-response']"); //No I18N
    var gresponse = getElementVal(greEle); 
    var secretid = getElementVal(_form.querySelector("#secretid")); //NO I18N
    //let action_url ="https://www.google.com/recaptcha/api/siteverify";//NO I18N
    var campaignsUrl = getElementVal(_form.querySelector("#zc_Url")); //No I18N
    if (campaignsUrl != undefined && campaignsUrl.indexOf("http") < 0) //No I18N
     {
        var protocol = "ht" + "tps" + ":"; //No I18N
        campaignsUrl = protocol + "//" + campaignsUrl;
    }
    var action_url = campaignsUrl + "/ua/ReCaptchaVerify"; //No I18N
    var jsonObj = {};
    jsonObj.secret = secretid;
    jsonObj.response = gresponse;
    result = sendAjaxReq(action_url, jsonObj, "POST", false, function (msg) {//No I18N
        var res = msg;
        if (res.indexOf("failure") > -1) //No I18N
         {
            return false;
        }
        else if (res.indexOf("success") > -1) //No I18N
         {
            return true;
        }
    });
    return result;
}
var testIfValidChar = function (event) {
    var charRegx = /[a-zA-Z0-9-_ ]/; 
    if (charRegx.test(event.keyCode)) {
        return true;
    }
    else {
        return false;
    }
};
function getZCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "="); //No I18N
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "="); //No I18N
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1; //No I18N
        var c_end = c_value.indexOf(";", c_start); //No I18N
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}
function zcCallback(data) {
    var resultData = JSON.parse(JSON.stringify(data));
    var visitorCookie = resultData.zc_cu;
    document.cookie = "zc_cu=" + visitorCookie + ";expires="+exp_date.toGMTString()+"; path=/;samesite=none;secure"; //No I18N
}

function checkBoxSelected(checkElm,fieldName){
	var check = checkElm.getAttribute("check");
	var mulitValue = checkElm.value?checkElm.value:"";
	var form = checkElm.form;
	if(!form)
	{
		return;
	}
	var hiddenFieldNameId = "#checkBoxValue_"+fieldName;//No I18N
	var fieldnameDiv = form.querySelector(hiddenFieldNameId);
	
	if(check == "notChecked"){
		checkElm.setAttribute("check","checked"); 
		checkElm.setAttribute("checked","checked");
	}
	else{
		checkElm.removeAttribute("checked"); //No I18N
		checkElm.setAttribute("check","notChecked");
	}
	if(check !="checked"){
		if(fieldnameDiv&&fieldnameDiv.value== ""){
			fieldnameDiv.value += mulitValue
		}
		else if(fieldnameDiv){
			fieldnameDiv.value +=","+mulitValue
		}
	}
	else{		
		var multiHiddenVal = fieldnameDiv.value;
		var splitArr = multiHiddenVal.split(",");
		var removeVal= mulitValue;
		splitArr.splice(splitArr.indexOf(removeVal),1);
		fieldnameDiv.value = splitArr.join(",");
	}	
}
function zc_ApplyStyles(nodeArr,styles)
{
	for(var i=0;i<nodeArr.length;i++)
	{
		Object.assign(nodeArr[i].style, styles);
	}
}
function zc_runResponseJS(data)
{
	var dummy = document.createElement('div');
	dummy.innerHTML = data;
    var scripts = dummy.getElementsByTagName("script");//No I18N
    var count = scripts.length;
    var jquery = null;
    var scriptsSrc = [];
    var noSrc= [];
    for(var index=0;index<count;index++)
    {
        var script = scripts[index];
        if(script.src)
        {
            if(script.src.indexOf("jquery")>-1 && script.src.indexOf("migrate")==-1)
            {
                jquery = script;
            }
            else
            {
                scriptsSrc.push(script);
            }
        }
        else
        {
            noSrc.push(script);
        }
    }
    var callOtherJsAfterJQ = function()
    {
        window.zcmhJSCount =  scriptsSrc.length;
        if(scriptsSrc.length==0)
        {
            runJS();
        }
        else
        {
            for(var index = 0; index < scriptsSrc.length;index++)
            {
                var script = scriptsSrc[index];
                var scriptDummy = document.createElement('script');
                scriptDummy.onload = runJS;
                scriptDummy.onerror = runJS;
                scriptDummy.type = "text/javascript";
                scriptDummy.innerHTML = script.innerHTML;
                scriptDummy.src = script.src;
                try
                {
                    document.body.appendChild(scriptDummy);
                }
                catch(e)
                {
                    runJS();
                }
            }
        }
    }
    var runJS = function()
    {
        if(window.zcmhJSCount&&window.zcmhJSCount<=1||!window.zcmhJSCount)
        {
            for(var index = 0; index < noSrc.length;index++)
            {
                var script = noSrc[index];
                var scriptDummy = document.createElement('script');
                scriptDummy.type = "text/javascript";
                scriptDummy.innerHTML = script.innerHTML;
                try
                {
                    document.body.appendChild(scriptDummy);
                }
                catch(e)
                {
                    //catch does nothing
                }
            }
        }
        else
        {
            window.zcmhJSCount--;
        }
    }
    if(jquery)
    {
        var dummyJq = document.createElement("script");
        dummyJq.onload = callOtherJsAfterJQ;
        dummyJq.onerror = callOtherJsAfterJQ;
        dummyJq.src = jquery.src;
        dummyJq.type = "text/javascript";
        dummyJq.innerHTML = jquery.innerHTML;
        try
        {
            document.body.appendChild(dummyJq);
        }
        catch(e)
        {
            callOtherJsAfterJQ();  
        }
    }
    else
    {
        callOtherJsAfterJQ();
    }
}
function zc_serializeJson(jsonObj)
{
    var params = "";
    if(jsonObj)
    {
        var keys = Object.keys(jsonObj);
        if(keys.length>-1)
        {
            params = "?";
            for(var i=0;i<keys.length;i++)
            {
                var key = keys[i];
                params += key+"="+jsonObj[key];
                if(i<keys.length-1)
                {
                    params = params + "&";
                }
            }
        }
    }
    return params;
}
function setAchievedCookie()
{
	zc_expiry = new Date();
	var nextPopupInterval;
	if(getZCookie("zc_cu") != null )
	{
		var CurrCookie=getZCookie("zc_cu"); //No I18N
		var ustart=CurrCookie.indexOf("-");
		var user=CurrCookie.substring(ustart+1,ustart+2);
		nextPopupInterval = getNextPopupInterval();
	}
	else if(getZCookie("zcc") != null )
	{
		nextPopupInterval = getNextPopupInterval();
	}
	else // popup viewed not from Web Assistant configuration.
	{
		nextPopupInterval = getNextPopupInterval();
	}
	//var d = new Date().getTime()+(nextPopupInterval*24*60*60*1000);  //for now Signupform only nextPopupInterval value will not be taken and by default set as 50 years.
	var d = new Date().getTime()+(50*365*24*60*60*1000);
	var fId = ZCWA.formId.indexOf("_") > -1 ? encodeURIComponent(ZCWA.formId.substring(0,ZCWA.formId.indexOf("_"))) : encodeURIComponent(ZCWA.formId);
	var triggerTime = getZCookie("zc_"+ZCWA.CurrUser+"ach"); //No I18N
	var tTimejson;
	if(triggerTime != null)
	{
		tTimejson = JSON.parse(triggerTime);
		tTimejson[fId] = d;
	}
	else
	{
		tTimejson = {};
		tTimejson[fId] = d; 
	}
	document.cookie =  "zc_"+ZCWA.CurrUser+"ach="+JSON.stringify(tTimejson)+";expires="+exp_date.toGMTString()+"; path=/";
}
function zcSessionCallback(data)
{
    //Invalid Call
}

var zcmpsendAjaxReq = function (url, params, method, async, callback) {
    if (method === void 0) { method = "GET"; }
    if (async === void 0) { async = true; }
    if (callback === void 0) { callback = function (data) { }; }
    var xhr;
    try {
        xhr = new XMLHttpRequest();
    }
    catch (ex) {
        xhr = new window.ActiveXObject("Microsoft.XMLHTTP"); //support for IE8 //No I18N
    }
    var stringParams;
    if (typeof params == "object") { //No I18N
        stringParams = zcmhSerializeJson(params);
    }
    else {
        stringParams = params;
    }
    if (method == "GET") { //No I18N
        url += "?" + stringParams;
        stringParams = null;
    }
    xhr.open(method, url, async);
    if (async) {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (callback) {
                    callback(xhr.responseText);
                }
            }
        };
    }
    try {
        if (method == "POST") { //No I18N
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //No I18N
        }
        xhr.withCredentials = true;
        xhr.send(stringParams);
        if (!async) {
            if (callback) {
                return callback(xhr.responseText);
            }
            else {
                return xhr.responseText;
            }
        }
    }
    catch (e) {
    	callback();
    }
};
var zcmhSerializeJson = function (json) {
    if (json === void 0) { json = {}; }
    var keys = Object.keys(json);
    var serializedJson = "";
    for (var i = 0; i < keys.length; i++) {
    	var value = json[keys[i]];
    	if(typeof value == "object")
		{
    		value = JSON.stringify(value);
		}
    	value = encodeURIComponent(value);
        serializedJson += keys[i] + "=" + value;
        serializedJson += "&";
    }
    return serializedJson.substring(0, serializedJson.length - 1);
};

function makeAjaxReq(ajaxUrl)
{
    var scriptElement = document.createElement("script");
    scriptElement.setAttribute("src", ajaxUrl); 
    scriptElement.setAttribute("id", "jsonp"); 
    scriptElement.setAttribute("async",false);   
    scriptElement.type = "application/javascript"; //No I18N 
    //scriptElement.setAttribute("Content-Type","application/javascript");
    var oldScriptElement= document.getElementById("jsonp"); 
    var head = document.getElementsByTagName("head")[0]; 
    if(oldScriptElement == null) {          
        head.appendChild(scriptElement); 
    } 
    else { 
        head.replaceChild(scriptElement, oldScriptElement);  
    }  
}

function setZcAttributes(ele, attrs) 
{
    for(var key in attrs) 
    {
    	ele.setAttribute(key, attrs[key]);
    }
}

function zcParamsCallback(data)
{	
	var resultData = JSON.parse(JSON.stringify(data));
	var orgIx = resultData.orgIx;
	var actIx = resultData.actIx;
	var custIx = resultData.custIx;
	if(orgIx != null && document.querySelector('[id="zcOrgIx"]') == null)	
	{
		var docBodyEle = document.getElementsByTagName("body")[0];
		var hidEle = document.createElement("input");
		setZcAttributes(hidEle,{"type":"hidden","id":"zcOrgIx","value":orgIx}); //No I18N
		docBodyEle.appendChild(hidEle);
		hidEle = document.createElement("input");
		setZcAttributes(hidEle,{"type":"hidden","id":"zcActIx","value":actIx}); //No I18N
		docBodyEle.appendChild(hidEle);
		hidEle = document.createElement("input");
		setZcAttributes(hidEle,{"type":"hidden","id":"zcCustIx","value":custIx}); //No I18N
		docBodyEle.appendChild(hidEle);
	}
	else if(custIx != null && custIx !="")
	{
		document.querySelector("#zcCustIx").value = custIx; //No I18N	
	}
}

function zcSFReferrerCallback(data)
{
    var resultData = JSON.parse(JSON.stringify(data));
    var vtp = resultData.zc_ref;
    var encryptSFId = resultData.encryptSFId;  
    var cntrIx = resultData.cntrIx;
    
    if(document.querySelector('[id="zc'+encryptSFId+'"]') == null)
    {
    	var docBodyEle = document.getElementsByTagName("body")[0];
    	var hidEle = document.createElement("input");
    	setZcAttributes(hidEle,{"type":"hidden","id":"zc"+encryptSFId,"value":vtp}); //No I18N
    	docBodyEle.appendChild(hidEle);
    }
    else
    {
    	document.querySelector('[id="zc'+encryptSFId+'"]').value = vtp; //No I18N
    }

    if(document.querySelector('[id="zcCntr'+encryptSFId+'"]') == null)
    {
        var docBodyEle = document.getElementsByTagName("body")[0];
        var hidEle = document.createElement("input");
        setZcAttributes(hidEle,{"type":"hidden","id":"zcCntr"+encryptSFId,"value":cntrIx}); //No I18N
        docBodyEle.appendChild(hidEle);
    }
    /*else
    {
        document.querySelector('[id="zcCntr'+encryptSFId+'"]').value = cntrIx; //No I18N
    }*/
}