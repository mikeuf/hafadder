function contactFormSubmit() { 

  if (ValidateForm()) {
     if (grecaptcha.getResponse() == ""){ 
       alert("Complete the reCAPTCHA verification before submitting."); 
     } else { 
    document.getElementById('form-status').innerHTML = '<p style="text-align:center">Submitting your message...<br /><br /><i class="fa fa-circle-o-notch fa-spin" style="font-size:72px;color:#ffffff"></i></p>';


    var formName = document.getElementById("form-name").value; 
    var formEmail = document.getElementById("form-email").value; 
    var formMessage = document.getElementById("form-message").value; 
    var formMailingListCheckbox;

    /*
   if(document.getElementById("mailing-list-checkbox").checked) {
    formMailingListCheckbox = "Yes"; 
   } else {
    formMailingListCheckbox = "No"; 
   }
   */
    formMailingListCheckbox = "No"; 





    var data = JSON.stringify({ 'name' : formName, 'email' : formEmail, 'message' : formMessage, 'mailingListCheckbox' : formMailingListCheckbox }); 
    var xhr = new XMLHttpRequest(); 

    if (xhr.readyState == 4 || xhr.readyState == 0) 
    { 
//1. xhr.open
//      xhr.open("POST", "https://www.mikepblack.com:8080/submit-contact-form", true); 
      xhr.open("POST", "/submit-contact-form", true); 

// 2. xhr.setRequestHeader
      xhr.setRequestHeader("Content-Type", "application/json"); 
    }
    else 
    {
      document.getElementById('form-status').innerHTML = "<p><br />Sorry. The form was unable to establish contact with the server. Try again later.<br /> XHR readystate: " + this.readyState + "<br />HTTP status: " + this.status + "<br /><b>Note:</b> The process that handles the form occasionally terminates, causing this error. You can also contact me via email at mike@mikepblack.com.</p>";
    } 

// 3. xhr.onReadStateChange
    xhr.onreadystatechange = function() 
    { 
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) 
      { 
	document.getElementById('contact-form').innerHTML = this.responseText; 
	document.getElementById('form-status').innerHTML = ''; 
  parent.scrollTo(0, 0);
  // window.open("/contact-form-submitted.html","_self")
      }
      else {
	document.getElementById('form-status').innerHTML = "<p><br />Sorry. There was a problem sending your message. Try again later.<br /> XHR readystate: " + this.readyState + "<br />HTTP status: " + this.status + "<br />If this error continues, you can also contact me via email at mike@mikepblack.com.</p>";
      } 
    }; 
// 4. xhr.send
    xhr.send(data); 

  }  
  }
  }

function ValidateForm()
{

  var ValidateName = document.forms["form1"]["form-name"].value;
  if (!ValidateNotBlank(ValidateName, "name" ))  return false;

  var ValidateEmail = document.forms["form1"]["form-email"].value;
  if (!ValidateNotBlank(ValidateEmail, "email address" ))  return false;

  var ValidateMessage = document.forms["form1"]["form-message"].value;
  if (!ValidateNotBlank(ValidateMessage,"message")) return false;

  return true;
}


function ValidateNotBlank(val, message)
{
  if (val == null || val == "") 
  {
    alert("Enter your " + message + ".");
    return false;
  }
  return true;
}


