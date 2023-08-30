var checkBoxes = document.querySelectorAll(".check");
var inputNumbers = document.querySelectorAll('input[type="number"]');
var filter = document.querySelector("#filter");
var rows = document.querySelectorAll("tbody tr");
var total = document.querySelector("#total");

for (var i = 0; i < checkBoxes.length; i++) {
  checkBoxes[i].addEventListener("change", function () {
    for (var j = 0; j < inputNumbers.length; j++) {
      inputNumbers[j].disabled = !checkBoxes[j].checked;
      if (!checkBoxes[j].checked) {
        inputNumbers[j].value = 0;
        updateRowTotal(rows[j]);
      }
    }
  });
}

filter.addEventListener("change", function () {
  rows.forEach(function (row) {
    var cell = parseInt(row.children[2].innerHTML);

    if (filter.value == 0) {
      row.style.display = cell ? "table-row" : "none";
    } else if (filter.value == 1) {
      row.style.display = cell < 100 ? "table-row" : "none";
    } else if (filter.value == 2) {
      row.style.display = cell >= 100 && cell <= 500 ? "table-row" : "none";
    } else {
      row.style.display = cell > 500 ? "table-row" : "none";
    }
  });
});

rows.forEach(function (row) {
  var quantityInput = row.querySelector('input[type="number"]');
  var price = parseInt(row.children[2].innerHTML);
  var showMoney = row.lastElementChild;

  quantityInput.addEventListener("input", function (e) {
    var quantity = parseInt(e.target.value);
    if (quantity < 0) {
      e.target.value = 0;
      quantity = 0;
    }

    showMoney.innerHTML = price * quantity;

    var sum = 0;
    rows.forEach(function (row) {
      var showTotal = parseInt(row.lastElementChild.innerHTML);
      sum += showTotal;
    });
    total.innerHTML = sum;
  });
});

function updateRowTotal(row) {
  var quantityInput = row.querySelector('input[type="number"]');
  var price = parseInt(row.children[2].innerHTML);
  var showMoney = row.lastElementChild;
  var quantity = parseInt(quantityInput.value);

  if (quantity < 0) {
    quantityInput.value = 0;
    quantity = 0;
  }

  showMoney.innerHTML = price * quantity;

  var sum = 0;
  rows.forEach(function (row) {
    var showTotal = parseInt(row.lastElementChild.innerHTML);
    sum += showTotal;
  });
  total.innerHTML = sum;
}
