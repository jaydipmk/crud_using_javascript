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
  var table_body = document.getElementById('employeeListBody');
  var newRow = table_body.insertRow(table_body.length);

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
  var searchInput = document.getElementById('searchInput');
  searchInput.value = "";
  var event = document.createEvent('KeyboardEvent'); // create a key event
  event.initKeyEvent("keydown", // typeArg,
                      true,             // canBubbleArg,
                      true,             // cancelableArg,
                      null,             // viewArg,  Specifies UIEvent.view. This value may be null.
                      false,            // ctrlKeyArg,
                      false,            // altKeyArg,
                      false,            // shiftKeyArg,
                      false,            // metaKeyArg,
                      13,               // keyCodeArg,
                      0);               // charCodeArg);

  searchInput.dispatchEvent(event);

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
    document.getElementById('employeeList').deleteRow(row.rowIndex);
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

function sortingTable(event){
  var table_body = document.getElementById('employeeListBody');
  var items = table_body.childNodes;
  var check_column = ['sortByFullName', 'sortByEmpCode', 'sortBySalary', 'sortByCity'];
  var itemsArr = [];
  for (var i in items) {
    if (items[i].nodeType == 1) {
      itemsArr.push(items[i]);
    }
  }

  itemsArr.sort(function (a, b) {
    var find_index = check_column.indexOf(event.target.id)
    var a_childNode = a.childNodes[find_index].innerHTML.toLowerCase();
    var b_childNode = b.childNodes[find_index].innerHTML.toLowerCase();
    if (find_index == 1 || find_index == 2){
      return parseInt(a_childNode) == parseInt(b_childNode)
        ? 0
        : (parseInt(a_childNode) > parseInt(b_childNode) ? 1 : -1);
    }else{
      return a_childNode == b_childNode
        ? 0
        : (a_childNode > b_childNode ? 1 : -1);
    }
  });

  for (i = 0; i < itemsArr.length; ++i) {
    table_body.appendChild(itemsArr[i]);
  }
}

function searchFromTable(event) {
  if(event.keyCode == 13){
    var table_body = document.getElementById('employeeListBody');
    var value = event.target.value.toLowerCase();
    var tr = table_body.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toLowerCase().indexOf(value) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}


// For sorting

// function sortTable(n) {
//   var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
//   table = document.getElementById("employeeListBody");
//   switching = true;
//   dir = "asc";
//   while (switching) {
//     switching = false;
//     rows = table.rows;
//     for (i = 0; i < (rows.length - 1); i++) {
//       shouldSwitch = false;
//       x = rows[i].getElementsByTagName("TD")[n];
//       y = rows[i + 1].getElementsByTagName("TD")[n];
//       if (dir == "asc") {
//         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//           shouldSwitch = true;
//           break;
//         }
//       } else if (dir == "desc") {
//         if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//           shouldSwitch = true;
//           break;
//         }
//       }
//     }
//     if (shouldSwitch) {
//       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//       switching = true;
//       switchcount++;
//     } else {
//       if (switchcount == 0 && dir == "asc") {
//         dir = "desc";
//         switching = true;
//       }
//     }
//   }
// }