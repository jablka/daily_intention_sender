/**
 * create_trigger() should be executed only once.
 * It creates a Trigger that will then run automatically everyday based on its settings.
 */
function create_trigger() {
  ScriptApp.newTrigger('getValueBasedOnDate').timeBased().everyDays(1).atHour(12).create();
}

function posli_umysel(um) {
  console.log('posielam:', um);
  var recipient = "RECIPIENT@EXAMPLE.COM"; // <- adjust email address
  var subject = "Hello from Google Apps Script";
  var body = "This is a test email sent using Google Apps Script.";
  
  MailApp.sendEmail(recipient, subject, body+'\n'+um);
}

/**
 * getValueBasedOnDate() 
 * searches the current date within range A6:A30 of a particular google sheet,
 * gets the corresponding text from C6:C30 range,
 * and calls function posli_umysel(um).
 */
function getValueBasedOnDate() {

  var najdeny_umysel = ''

  // Get the active spreadsheet and the first sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get the current date
  var today = new Date();
  
  // Format the current date to match the format in the sheet
  var today_zeroed = today.setHours(0,0,0,0); // Set time to 00:00:00 to match date-only cells
  console.log(today_zeroed)
  
  // Get the data range in columns A and C
  var dateRange = sheet.getRange("A6:A30");
  var dateValues = dateRange.getValues();
  var valueRange = sheet.getRange("C6:C30");
  var valueValues = valueRange.getValues();

  console.log(dateValues.length, 'umyslov');
  console.log('posledný:', dateValues[dateValues.length-1], valueValues[dateValues.length-1]);

//  Loop through the date values to find today's date
  for (var i = 0; i < dateValues.length; i++) {
    var cell = dateValues[i][0];
    // console.log(dateValues[i][0]);
    console.log(cell);
    if (cell instanceof Date) {
      var cellDate_zeroed = cell.setHours(0,0,0,0); // Set time to 00:00:00 to match date-only cells
      
      // Check if the date matches today's date
      if (cellDate_zeroed === today_zeroed) {
        // Return the corresponding value from column C
        najdeny_umysel = valueValues[i][0];
        if (najdeny_umysel==='') {
          najdeny_umysel = "blank: prázdna bunka"    
        }
        console.log('našiel som:', najdeny_umysel);
        posli_umysel(najdeny_umysel);
        return najdeny_umysel;
      }
    }
  }
  
  // If today's date is not found, return a message
  var nie_je = "Dnešný dátum nie je v tabuľke."
  console.log(nie_je);
  posli_umysel(nie_je);
  return nie_je;
}

