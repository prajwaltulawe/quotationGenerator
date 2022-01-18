function options(){
    var buttonVisibility = document.getElementById("buttonVisibility");
    var ulOfOptions = document.getElementById("ulOfOptions");
    
    if ( ulOfOptions.style.display == "none"  ) {
        buttonVisibility.classList.add("visible"); 
        ulOfOptions.style.display = "block"; 
    } else {
        buttonVisibility.classList.remove("visible");
        ulOfOptions.style.display = "none"; 
    }  
}

var currentItem = 1;
function addItem(){
    var list = document.getElementById("list");
    var newList = document.createElement("table");
    var hrElement = document.createElement("hr");
    currentItem = currentItem+1;
    newList.innerHTML = `<tr><td>Item No : #${currentItem} </td></tr>
<tr><td colspan="2">Item Name : <input type="text" id="iname${currentItem}" name="iname${currentItem}" ></td></tr>
<tr><td colspan="2">HSN : <input type="number" id="ihsn${currentItem}" name="ihsn${currentItem}" style="width: 77%;"></td></tr>
<tr><td>Unit Price : <input type="number" id="iunitprice${currentItem}" name="iunitprice${currentItem}" style="width: 50%;" onblur="generateTotal(this.value, this.parentElement.nextElementSibling.childNodes[1].value, 'itemTotal${currentItem}')"></td>
    <td>Qty :<input type="number" id="iqty${currentItem}" name="iqty${currentItem}" style="width: 55%;" onblur="generateTotal(this.parentElement.previousElementSibling.childNodes[1].value, this.value,'itemTotal${currentItem}')"></td></tr>
<tr><td>Total : <span id="itemTotal${currentItem}" name="itemTotal"> 0 /- Rs </span> </td></tr>`;
    list.appendChild(newList);
    list.appendChild(hrElement);
}

function generateTotal( uP, qt, tD){
    var unitPrice = uP;
    var qty = qt;
    var totalDisplayElement = tD;
    document.getElementById(totalDisplayElement).innerText = unitPrice*qty  +" /- Rs";

    var totalItemElements = document.getElementsByName("itemTotal");
    var subTotal = 0;
    totalItemElements.forEach(
        function (value, index, array) {
            subTotal += parseInt(value.innerText);
        }
    );
    document.getElementById("subTotal").innerText = subTotal +" /- Rs";
    var gstPer = document.getElementById("gst").value;
    var gstTotal = (subTotal/100)*gstPer;
    document.getElementById("gstTotal").innerText = gstTotal.toFixed(2) +" /- Rs";
    var finalTotal = subTotal+gstTotal;
    document.getElementById("finalTotal").innerText = finalTotal.toFixed() +" /- Rs";
}

function generateFinalTotal(){
    var totalItemElements = document.getElementsByName("itemTotal");
    var subTotal = 0;
    totalItemElements.forEach(
        function (value, index, array) {
            subTotal += parseInt(value.innerText);
        }
    );
    document.getElementById("subTotal").innerText = subTotal +" /- Rs";
    var gstPer = document.getElementById("gst").value;
    var gstTotal = (subTotal/100)*gstPer;
    document.getElementById("gstTotal").innerText = gstTotal.toFixed(2) +" /- Rs";
    var finalTotal = subTotal+gstTotal;
    document.getElementById("finalTotal").innerText = finalTotal.toFixed() +" /- Rs";
}

function generatePdf(){

    // DATE FORMATING
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date( document.getElementById("date").value );
    var displayDate = date.getDay() + " " + months[date.getMonth()].substring(0, 3) + " " + date.getFullYear();

    // RECEIVERS DETAILS
    var to = document.getElementById("to").value;
    var cname = document.getElementById("cname").value;
    var caddress = document.getElementById("caddress").value;

    // PDF HEADER
    var pdfContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="partials/css/pdfstyle.css">
    <title>Quotation</title>
</head>
<body>
    <div class="page" size="A4">

        <div class="header">

            <div class="header-top">
                <div class="header-title">
                    <span class="title-top"> PRICE </span>
                    <span class="title-below"> QUTATION </span>
                </div>
                <div class=date>Date : ${displayDate} </div>
            </div>
            <div class="gstno">
                GST NO : 27AOYPT5834R1ZG
            </div>
            <div class="from-to">
                <div class="from">
                    <span id="from-title"> AVITYA ENTERPRISES</span>
                    <span id="from-address"> Shop No. C1, Plot No k/R6, Phase II, Chakan MIDC, Near Hundai Company, A/p Khalumbre, Tal. Khed,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dist. Pune-410501 </span>
                    <span id="phone"> Ph: 7030303902</span>
                    <span id="mail"> Mail : <a href="mailto:avitya.enterprises@gmail.com"> avitya.enterprises@gmail.com</a></span>
                </div>
                <div class="to">
                    <span id="to-title">To: <span id="toname"> ${to} </span></span> 
                    <span id="company-name"> ${cname}</span>
                    <span id="to-address">${caddress}</span>
                </div>
            </div>
        </div>

        <div class="main-content">

            <div class="item-list">
                <table>
                    <tr>
                        <th>    Item    </th>
                        <th>    HSN    </th>
                        <th>    UNIT PRICE    </th>
                        <th>    QTY.    </th>
                        <th>    TOTAL    </th>
                    </tr>
`;
    
    // ITEM LIST
    var pdfItemList = ``;
    var itemsList = document.getElementsByTagName("table");
    for (let i = 1; i < itemsList.length-2; i++){

        var itemName =  document.getElementById(`iname${i}`).value;
        var itemHsn =  document.getElementById(`ihsn${i}`).value;
        var itemUnitPrice =  document.getElementById(`iunitprice${i}`).value;
        var itemQty =  document.getElementById(`iqty${i}`).value;
        var itemTotal =  parseInt(document.getElementById(`itemTotal${i}`).innerText);
        
        if ( itemName || itemHsn || itemUnitPrice || itemQty || itemTotal ) {   
            pdfItemList += `<tr>
            <td>    ${itemName}    </td>
            <td>    ${itemHsn}    </td>
            <td>    ${itemUnitPrice} </td>
            <td>    ${itemQty} </td>
            <td>    ${itemTotal}    </td>
            </tr>`;
        }
    }
    pdfContent += pdfItemList;

    // PDF FOOTER
    var subTotal = parseInt(document.getElementById("subTotal").innerText);
    var gstPer = document.getElementById("gst").value;
    var gstTotal = parseInt(document.getElementById("gstTotal").innerText);
    var finalTotal = parseInt(document.getElementById("finalTotal").innerText);


    var pdfFooter = `</table>
    </div>
    <div class="total-table">
        <table>
            <tr>
                <td>    &nbsp;Sub Total    </td>
                <td>    &nbsp;${subTotal}    </td>
            </tr>
            <tr>
                <td>   &nbsp;Tax <span id="gstPercent"> ${gstPer}%</span> </td>
                <td>   &nbsp;${gstTotal} </td>
            </tr>
            <tr>
                <th>    &nbsp;Total</th>
                <th>    &nbsp;${finalTotal} </th>
            </tr>
        </table>
    </div>
</div>
<div class="footer">
    <div class="bottom-info">
        <span>Quotation Prepared By: Vinit Tulave</span>
        <p> TERMS AND CONDITIONS:</p>
        <p> 1. Customer will be billed after indicaticating acceptance of this quote. </p>
        <p> 2. Payment will be due prior to delivery of service and goods. </p>
        <span> <b> To accept this quotation, sign here and return: </b></span>
    </div>
    <p>THANK YOU FOR YOUR BUSINESS</p>
</div>        
</div>
</body>
    </html>`;
    
    // FINAL PDF CONTENT
    pdfContent += pdfFooter;
    console.log(pdfContent);

    var myWindow = window.open("", "MsgWindow");
    myWindow.document.write(pdfContent);
}