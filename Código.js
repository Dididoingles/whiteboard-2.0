const SPREADSHEET_ID = '1UOyjQRV7rCuxA6V6N49E6WpZQACLjgBuBHn5NQ4GJEo';

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
      .setTitle('English Lab - @dicarvalho.prof')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getFrases() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Frases_Prontas');
  return sheet.getDataRange().getValues().slice(1).map(row => row[0]).filter(txt => txt !== "");
}

function getEmojis() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Emojis');
  if (!sheet) return ["😊", "⭐", "💡", "👍"];
  return sheet.getDataRange().getValues().flat().filter(e => e !== "" && e !== "Emoji");
}

function addEmojiDB(emoji) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Emojis') || ss.insertSheet('Emojis');
  sheet.appendRow([emoji]);
  return "Inserido!";
}

// Funções de Gerenciamento (Configs)
function addFrase(f) { SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Frases_Prontas').appendRow([f]); return getFrases(); }
function removeFrase(f) { 
  const s = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Frases_Prontas');
  const d = s.getDataRange().getValues();
  for (let i=1; i<d.length; i++) { if(d[i][0]===f) { s.deleteRow(i+1); break; } }
  return getFrases();
}
