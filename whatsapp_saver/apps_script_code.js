function doPost(e) {
  try {
    // Get the active sheet
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the data sent from the Chrome Extension
    var data = JSON.parse(e.postData.contents);
    
    // Append a new row with the data
    // Columns: Date, Page URL, Phone Number, WhatsApp Link, Address, Price
    var formattedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "d/M/yyyy H:mm");
    sheet.appendRow([
      formattedDate, 
      data.url, 
      data.phone, 
      data.whatsappUrl,
      data.address,
      data.price
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
