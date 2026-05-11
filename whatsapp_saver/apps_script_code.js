function doPost(e) {
  try {
    // Get the active sheet
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the data sent from the Chrome Extension
    var data = JSON.parse(e.postData.contents);
    
    // Append a new row with the data
    // Columns: Date, Address, Price, Page URL, Phone Number, WhatsApp Link
    var formattedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "d/M/yyyy H:mm");
    sheet.appendRow([
      formattedDate, 
      data.address,
      data.price,
      data.url, 
      data.phone, 
      data.whatsappUrl
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
