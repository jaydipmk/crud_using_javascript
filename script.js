var selectedRow = null;

function FormSubmit(event) {
  if(validate()){
    var formData = readFormData();
    if (selectedRow == null) {
      insertNewRecord(formData);
    }else{
      updateRecord(formData);
    }
    resetForm();
  }
}

function readFormData(argument) {
  var formData = {};
  formData['fullname'] = document.getElementById('fullname').value
  formData['emp_code'] = document.getElementById('emp_code').value
  formData['salary'] = document.getElementById('salary').value
  formData['city'] = document.getElementById('city').value

  return formData;
}

function insertNewRecord(data) {
  var table = document.getElementById('employee_list').getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);

  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullname;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.emp_code;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.salary;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.city;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                     <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
  document.getElementById('fullname').value = "";
  document.getElementById('emp_code').value = "";
  document.getElementById('salary').value = "";
  document.getElementById('city').value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement
  document.getElementById('fullname').value = selectedRow.cells[0].innerHTML;
  document.getElementById('emp_code').value = selectedRow.cells[1].innerHTML;
  document.getElementById('salary').value = selectedRow.cells[2].innerHTML;
  document.getElementById('city').value = selectedRow.cells[3].innerHTML;
}


function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.fullname;
  selectedRow.cells[1].innerHTML = formData.emp_code;
  selectedRow.cells[2].innerHTML = formData.salary;
  selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
  if(confirm('Are you sure to delete this record ?')){
    row = td.parentElement.parentElement;
    document.getElementById('employee_list').deleteRow(row.rowIndex);
    resetForm();
  }
}


function validate() {
  isValid = true;
  if(document.getElementById('fullname').value == ''){
    isValid = false;
    document.getElementById('fullnameValidation').classList.remove('hide');
  }else{
    isValid = true;
    if(!document.getElementById('fullnameValidation').classList.contains('hide')){
      document.getElementById('fullnameValidation').classList.add('hide');
    }
  }

  return isValid;

}