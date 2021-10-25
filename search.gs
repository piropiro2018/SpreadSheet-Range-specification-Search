
/*!
 * SpreadSheet Range specification Search v1.0.0
 *
 * Copyright 2021 Hironori Yoshida
 * Released under the MIT license
 */
function onOpen() {
    SpreadsheetApp
      .getActiveSpreadsheet()
      .addMenu('検索', [
        {name: '範囲指定検索', functionName: 'showDialog'}
    ]);
  }
  
  //サイドバーに表示する場合
  function showSidebar() {
    var htmlOutput = HtmlService.createTemplateFromFile('index').evaluate().setWidth(270).setHeight(200);
    SpreadsheetApp.getUi().showSidebar(htmlOutput);
  }
  
  function showDialog(){
    var htmlOutput = HtmlService.createTemplateFromFile('index').evaluate().setWidth(280).setHeight(40);
    SpreadsheetApp.getUi().showModelessDialog(htmlOutput, "範囲指定検索");
  }
   
  function onClickSearch(kw) {
  
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var wsData = spreadsheet.getActiveSheet();
  
    var wsRange = SpreadsheetApp.getActiveRange().getA1Notation();
   
    //シート末尾のデータにアクセスする場合
    //const lastRow = wsData.getLastRow();
    //wsData.getRange(lastRow,30).activate();
  
    var textFinder = wsData.getRange(wsRange).createTextFinder(kw);
  
    var t_ranges = textFinder.findNext();
  
    if (!t_ranges) {
      return {
        len: 0,
        cur_cell: "",
        cell: [],
      };
    } else {
  
      wsData.getRange(t_ranges.getA1Notation()).activate();
    
      var ranges = textFinder.findAll();
  
      var cellman = ranges.map((cell) => {
        return cell.getA1Notation();
      });
  
    //ステータスを検索結果を表示
      return {
        len: ranges.length,
        cur_cell: t_ranges.getA1Notation(),
        cell: cellman,
      };
    }
  
  }
  
  function onFocusAdress(adr){
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var wsData = spreadsheet.getActiveSheet();
  
    wsData.getRange(adr).activate();
  
  }
  
  function logTest(data){
    return '★' + data;
  }