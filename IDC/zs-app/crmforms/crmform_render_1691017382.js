var CrmForms=function(){"use strict";function e(e){var c=this.responseText,d=e.node,o=e.data.loaded;d.innerHTML=c;var l=$D.get("[error_code]",d);if(l){l&&l.getAttribute("error_code")&&$D.addClass(d.parentElement,"zp-pointer-events-no")}else{var m=t(f=d.getElementsByTagName("form")[0]),u=r(f),s=function(e){return i("visitor_tracking")<4&&e&&e.querySelectorAll("[id=visitor_tracking]")}(f);if("live"==window.zs_rendering_mode){if(""!=c){if(e.isBiginForm||Array.prototype.slice.call(d.parentElement.children).filter(function(e){return!$D.hasClass(e,"app-container")&&"SCRIPT"!=e.tagName}).forEach(function(e){f.appendChild(e)}),s&&s.length>1){var p=document.createElement("script");i("zsiqscript")<1&&(p.text+=s[0].innerHTML),p.text+=s[1].innerHTML,document.head.appendChild(p)}if(Array.prototype.slice.call(f.children).filter(function(e){return"SCRIPT"==e.tagName}).forEach(function(e){var t=document.createElement("script");t.innerHTML=e.innerHTML,document.head.appendChild(t)}),null!=u&&(f.querySelector("[type=submit]").disabled=!0,null==document.querySelector("[data-id=gApi]"))){var g=document.createElement("script");g.src="https://www.google.com/recaptcha/api.js",g.async=!0,g.defer=!0,g.setAttribute("data-id","gApi"),document.head.appendChild(g),window.recaptchaVerfication=function(e){for(var t,a,i=document.getElementsByTagName("form"),c=0;c<i.length;c++)(t=(a=i[c]).getElementsByClassName("g-recaptcha-response"))[0]&&null!=r(a)&&(e||""==t[0].value?e&&(r(a).setAttribute("captcha-verified","false"),a.querySelector("[type=submit]").disabled=!0):(r(a).setAttribute("captcha-verified","true"),void 0==n(a)?a.querySelector("[type=submit]").disabled=!1:n(a).checked&&(a.querySelector("[type=submit]").disabled=!1)))},window.recaptchacallback=function(){recaptchaVerfication(!1)},window.recaptchaExpiredCallback=function(){recaptchaVerfication(!0)}}!function(e){for(var n=e.querySelectorAll("[data-element-id=datetime]"),i=0;i<n.length;i++)a(n[i],"datetime");for(var c=e.querySelectorAll("[data-element-id=date]"),i=0;i<c.length;i++)a(c[i],"date");var d=t(e);d&&d.addEventListener("click",function(e){!function(e){var t=e.parentNode.getElementsByTagName("img")[0];t&&(-1!==t.src.indexOf("&d")?t.src=t.src.substring(0,t.src.indexOf("&d"))+"&d"+(new Date).getTime():t.src=t.src+"&d"+(new Date).getTime())}(d)});var o=r(e),l=e.querySelector("[data-element-id=privacy]");l&&(e.querySelector("[type=submit]").disabled=!0,l.addEventListener("change",function(t){var r;r=!t.target.checked||null!=o&&(null==o||"true"!=o.getAttribute("captcha-verified")),e.querySelector("[type=submit]").disabled=r}));e.querySelector("[type=reset]").addEventListener("click",function(t){t.preventDefault(),e.reset(),e.querySelector("[data-element-id=privacy]")&&(e.querySelector("[type=submit]").disabled=!0)})}(f)}}else{null!=u&&(u.innerHTML=parent.cms_i18n("ui.crm.webform.recaptcha"));var f;(f=d.getElementsByTagName("form")[0]).addEventListener("submit",function(e){e.preventDefault()})}m?zsUtils.onImageLoad(m.parentNode,o):o()}}function t(e){return e.querySelector("[data-element-id$=captcha]")}function r(e){return e&&e.querySelector("[data-element-id=recaptcha]")}function n(e){return e&&e.querySelector("[data-element-id=privacy]")}function a(e,t){"date"==t?e.addEventListener("click",function(e){datepickerJS.init(e.currentTarget,"date")}):e.addEventListener("click",function(e){datepickerJS.init(e.currentTarget,"datetime")})}function i(e){return Array.prototype.slice.apply(document.getElementsByTagName("script")).filter(function(t){return t.id===e}).length}return{init:function(t,r){(t=$D.getByClass("app-container",t)[0]).innerHTML="<h4 align='center'>"+i18n.get("forms.common.loading")+"</h4>";var n="crm_form"!=t.parentElement.dataset.appType;r.next&&r.next();var a={};a.type=t.parentElement.getAttribute("data-formtype"),a.crmFormId=t.parentElement.getAttribute("data-formid"),a.isBiginForm=n,a.encrypted_zgid=t.parentElement.getAttribute("data-encrypted_zgid");var i=t.parentElement.getAttribute("data-orgid");if(i&&(a.orgId=i),a.operation="render",a.type&&a.crmFormId){if(("canvas"==window.zs_rendering_mode||"preview"==window.zs_rendering_mode)&&!i){t.innerText="";var c=document.createElement("h4");return c.setAttribute("align","center"),c.innerText=i18n.get("forms.multiorg.migration"),void t.appendChild(c)}var d={"X-Site-Resource-Id":window.zs_site_resource_id};$X.get({url:"/siteapps/crm",params:a,headers:d,handler:e,args:{node:t,data:r,isBiginForm:n}})}else t.innerHTML="live"==window.zs_rendering_mode?"":parent.cms_i18n("ui.crm.add.errormessage","<h4 align='center'>","</h4>")},submitCrmForm:function(e){var t=$D.getById(e);return!!function(e){for(var t=0;t<e.elements.length;t++){var r=e.elements[t],n=document.getElementById(r.name+"-error");n&&n.parentNode.removeChild(n);var a=new RegExp("([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])").exec(r.value);if(r.getAttribute("format")&&null!==a){var i,c=parseInt(a[1]);i=c>11?"pm":"am",c=0===(c=c>11?c-12:c)?12:c,document.getElementsByName(r.name)[0].value=r.value.replace(a[0],""),document.getElementsByName(r.name+"minute")[0].value=a[2],document.getElementsByName(r.name+"hour")[0].value=""+c,document.getElementsByName(r.name+"ampm")[0].value=i}if("true"==r.getAttribute("data-required")){var d="",o=null!=r.getAttribute("data-field-label")&&""!=r.getAttribute("data-field-label")?r.getAttribute("data-field-label"):r.name;if(""==r.value?d="file"==r.type?i18n.get("crm.error.attachfile"):i18n.get("crm.error.textempty",o):"checkbox"==r.type&&0==r.checked?d=i18n.get("crm.error.checkboxempty",o):"SELECT"!=r.nodeName||"-None-"!=r.options[r.selectedIndex].text&&"-Select-"!=r.options[r.selectedIndex].text||(d=i18n.get("crm.error.checkboxempty",o)),""!=d)return n=document.createElement("div"),n.id=r.name+"-error",n.setAttribute("tag","eleErr"),n.className+=" zpform-errormsg",n.innerHTML=d,r.parentNode.appendChild(n),!1}}return!0}(t)&&void("function"==typeof trackVisitor&&trackVisitor(t))}}}();