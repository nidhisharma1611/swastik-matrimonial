/**
 * Receives all three website forms and writes each one to a dedicated tab in
 * the same spreadsheet. Deploy this as a single Google Apps Script web app.
 */
var SPREADSHEET_ID = '1OJu6mTbY4QNGAP9U5ZDEALFXDm-XzZXd1T64P9h0yCg';

var DESTINATIONS = {
  registration: {
    sheetId: 0,
    secretProperty: 'REGISTRATION_SECRET'
  },
  grievance: {
    sheetId: 913404837,
    secretProperty: 'GRIEVANCE_SECRET'
  },
  onboarding: {
    sheetId: 1595689244,
    secretProperty: 'ONBOARDING_SECRET'
  }
};

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'invalid_request' });
    }

    var payload = JSON.parse(e.postData.contents);
    var destination = DESTINATIONS[payload.kind];
    if (!destination) {
      return json_({ ok: false, error: 'invalid_kind' });
    }

    var properties = PropertiesService.getScriptProperties();
    var expectedSecret = properties.getProperty(destination.secretProperty);
    if (!expectedSecret || payload.secret !== expectedSecret) {
      return json_({ ok: false, error: 'unauthorized' });
    }

    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = getSheetById_(spreadsheet, destination.sheetId);
    if (!sheet) {
      throw new Error('Destination sheet not found for kind: ' + payload.kind);
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var data = payload.data || {};
      var keys = Object.keys(data).filter(function (key) {
        return key !== 'website' && key !== 'startedAt';
      }).sort();
      var headers = ['referenceId', 'submittedAt', 'kind'].concat(keys);

      if (sheet.getLastRow() === 0) {
        sheet.appendRow(headers);
      } else {
        var existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        if (existingHeaders.join('|') !== headers.join('|')) {
          throw new Error('Sheet headers do not match the ' + payload.kind + ' form schema. Clear this tab before the first submission or restore its original headers.');
        }
      }

      var row = [payload.referenceId, payload.submittedAt, payload.kind].concat(keys.map(function (key) {
        return safeCell_(data[key]);
      }));
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    return json_({ ok: true, referenceId: payload.referenceId });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: 'submission_failed' });
  }
}

function getSheetById_(spreadsheet, sheetId) {
  var sheets = spreadsheet.getSheets();
  for (var index = 0; index < sheets.length; index += 1) {
    if (sheets[index].getSheetId() === sheetId) return sheets[index];
  }
  return null;
}

function safeCell_(value) {
  var text = String(value == null ? '' : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
