//dataset
$(document).ready(function () {
    $("#tabel-data").DataTable({
      'ajax' : '../json/dataset.json',
      'columns' : [
        {'data' : 'Row ID'},
        {'data' : 'Order ID'},
        {'data' : 'Order Date'},
        {'data' : 'Ship Date'},
        {'data' : 'Ship Mode'},
        {'data' : 'Customer ID'},
        {'data' : 'Customer Name'},
        {'data' : 'Segment'},
        {'data' : 'Country'},
        {'data' : 'City'},
        {'data' : 'State'},
        {'data' : 'Postal Code'},
        {'data' : 'Region'},
        {'data' : 'Product ID'},
        {'data' : 'Category'},
        {'data' : 'Sub-Category'},
        {'data' : 'Product Name'},
        {'data' : 'Sales'},
        {'data' : 'Quantity'},
        {'data' : 'Discount'},
        {'data' : 'Profit'}
      ]
    });
  });
