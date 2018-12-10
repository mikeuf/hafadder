function ValidateForm()
{

  var ValidateName = document.forms["form1"]["Name"].value;
  if (!ValidateNotBlank(FirstName, "name" ))  return false;

  var Email = document.forms["form1"]["Email"].value;
  if (!ValidateNotBlank(Email, "email address" ))  return false;
 
 var Message = document.forms["form1"]["Message"].value;
  if (!ValidateNotBlank(Message,"message")) return false;

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


