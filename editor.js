// nastavení vzhledu
var viewMode = 1;

function Init()
{
  iView.document.designMode = 'On';
}

function selOn(ctrl)
{
  ctrl.style.borderColor = '#000000';
  ctrl.style.backgroundColor = '#B5BED6';
  ctrl.style.cursor = 'hand';
}

function selOff(ctrl)
{
  ctrl.style.borderColor = '#D6D3CE';
  ctrl.style.backgroundColor = '#D6D3CE';
}

function selDown(ctrl)
{
  ctrl.style.backgroundColor = '#8492B5';
}

function selUp(ctrl)
{
    ctrl.style.backgroundColor = '#B5BED6';
}

// obecné funkce

function edit(objekt)
{
  iView.document.execCommand(objekt, false, null);
}

function insert(objekt)
{
    iView.document.execCommand(objekt, true, null);
}

function format()
{
    edit('SelectAll');
    iView.document.execCommand('RemoveFormat');
}

// tabulky

function table()
{
  var rtNumRows = null;
  var rtNumCols = null;
  var rtTblAlign = null;
  var rtTblWidth = null;

  var rtTblSpacing = null;
  var rtTblPadding =  null;
  var rtTblColor = null;
  var rtTblBorder = null;
  var rtTblBorderColor = null;

  showModalDialog("win_tab.htm",window,"status:0; scroll: 0; dialogWidth: 485px; dialogHeight: 275px; help: 0");
}

function createTable()
{
  var cursor = iView.document.selection.createRange();

  if (rtNumRows == "" || rtNumRows == "0")
  {
    rtNumRows = "1";
  }
  if (rtNumCols == "" || rtNumCols == "0")
  {
    rtNumCols = "1";
  }
  var rttrnum=1
  var rttdnum=1
  var rtNewTable = "<table  bordercolor='"+rtTblBorderColor+"' border='"+rtTblBorder+"' bgcolor='"+rtTblColor+"' cellpadding='"+rtTblPadding+"' cellspacing='"+rtTblSpacing+"' align='" + rtTblAlign + "' width='" + rtTblWidth + "' >"

  while (rttrnum <= rtNumRows)
  {
    rttrnum=rttrnum+1
    rtNewTable = rtNewTable + "<tr>"
  while (rttdnum <= rtNumCols)
  {
    rtNewTable = rtNewTable + "<td>&nbsp;</td>"
    rttdnum=rttdnum+1
  }
    rttdnum=1
    rtNewTable = rtNewTable + "</tr>"
  }
    rtNewTable = rtNewTable + "</table>"
    cursor.pasteHTML(rtNewTable);
}

// preview

function preview()
{
  ff = window.open("","","");
  ff.document.write("<html><head><title>Preview</title></head><body>"+iView.document.body.innerHTML+"</body></html>");
}


// barvy

function color(objekt)
{
  var fCol = showModalDialog("win_col.htm","","dialogHeight: 125px; scroll: 0; dialogWidth: 180px; dialogTop: 200px; dialogLeft: 150px; center: 1; help: 0; resizable: 0; status: 0;");

  if (fCol != null)
  {
    iView.document.execCommand(objekt, false, fCol);
  }
}

// symboly

function symbol()
{
  var symbol = null;
  showModalDialog("win_sym.htm",window,"dialogHeight: 225px; dialogWidth: 184px; scroll: 0; dialogTop: 200px; dialogLeft: 150px; center: 1; help: 0; resizable: 0; status: 0;");
}

function createSymbol()
{
  var cursor = iView.document.selection.createRange();
  var rtNewTable = ""+symbol+""
  cursor.pasteHTML(rtNewTable);
}

// obrázky

function image()
{
var imageAlt = null;
var imageSrc = null;
var imageAlign = null;
var units = null;
var border = null;
showModalDialog("win_obr.htm",window,"status:0; dialogWidth: 335px; scroll: 0; dialogHeight: 240px; help: 0");
}

function addImageToPage()
{
var cursor = iView.document.selection.createRange();

var rtNewTxt = "<img src=\""+imageSrc+"\" alt='" + imageAlt + "' align='" + imageAlign + "'  border='"+border+"'>"

cursor.pasteHTML(rtNewTxt);
iView.focus();
}

// text

function font(fName)
{
  if(fName != '') iView.document.execCommand('fontname', false, fName);
}

function textsize(fSize)
{
  if(fSize != '') iView.document.execCommand('fontsize', false, fSize);
}

function nadpis(hType)
{
  if(hType != '')
  {
    iView.document.execCommand('formatblock', false, hType);
    font(selFont.options[selFont.selectedIndex].value);
  }
}

// pøepínání módù

function reset()
{
  if(viewMode == 1)
  {
    iHTML = iView.document.body.innerHTML;
    iView.document.body.innerText = iHTML;

    tblCtrls.style.display = 'none';
    selFont.style.display = 'none';
    selSize.style.display = 'none';
    selHeading.style.display = 'none';
    iView.focus();

    viewMode = 2;
  }
  else
  {
    iText = iView.document.body.innerText;
    iView.document.body.innerHTML = iText;

    tblCtrls.style.display = 'inline';
    selFont.style.display = 'inline';
    selSize.style.display = 'inline';
    selHeading.style.display = 'inline';
    iView.focus();

    viewMode = 1;
  }
}