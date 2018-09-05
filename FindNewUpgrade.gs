function findrefresh() {
  var today = new Date();
  Logger.log(today)
  var lastweek = new Date();
  lastweek.setDate(lastweek.getDate() - 7);
  Logger.log(lastweek) 
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var data = sheet.getSheetByName("New Entries").getDataRange().getValues();
  Logger.log(data.length)
  var requests = [];
  var fields = ["Ticket", "DateEntry", "User", "Username", "Eligible", "Laptop", "Office", "Shipping", "SN", "Department", "Language", "Type"] 
  for (var row = 1; row < data.length;row++){
  //Logger.log(data[row][1])
    var searchdate = new Date(data[row][1]);
  //Logger.log(searchdate)
    if(searchdate >= lastweek && searchdate <= today){
      Logger.log(searchdate)
      var request = {}
      for(var column = 0; column < fields.length; column++) { 
        request[fields[column]] = data[row][column];
      }
      Logger.log("This is request" + request)
      requests.push(request);
    }
  }
  Logger.log("This is requests"+ requests)
  
  var nextweek = new Date();
  nextweek.setDate(nextweek.getDate() +7);
  Logger.log(nextweek)
  
  if(sheet.getSheetByName(nextweek) != null) { throw "Batch sheet already exists" }
  var newSheet = sheet.insertSheet(0); 
  newSheet.setName(nextweek);
  var rows = [];
  newSheet.appendRow(fields);
  Logger.log(newSheet);
  
   for(x = 0; x < requests.length;x++) { 
   var request = requests[x]
   newSheet.appendRow([request.Ticket, request.DateEntry, request.User, request.Username, request.Eligible, 
                       request.Laptop, request.Office, request.Shipping, request.SN, 
                       request.Department, request.Language, request.Type]);
   }
}
