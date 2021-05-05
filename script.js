var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
tableBody = document.getElementsByTagName('tbody');

var InfoObject = [];
var InfoObjectkeys = [];
let selectedUserId;
var detailsNamePart = [];
var detailsAddressPart = [];
var detailsSecInfo = [];
var data = [];

var http = new XMLHttpRequest();
http.open("GET", url, true);
http.onreadystatechange = function() {
     console.log(this.readyState);
    if(this.readyState === 4) {
       try{
        userInfo = JSON.parse(this.responseText);
       
        
        for(i=0;i<userInfo.length;i++)
        {
           InfoObject[i] = { 'id':userInfo[i].id,
                        'fname': userInfo[i].firstName,
                          'lname': userInfo[i].lastName,                          
                           'email': userInfo[i].email,
                           'phone': userInfo[i].phone};  
            InfoObjectkeys[i] = Object.values(InfoObject[i]); 
        }
        for(i=0;i<userInfo.length;i++)
        {
            userInfoRender(userInfo[i].id,userInfo[i].firstName,userInfo[i].lastName,userInfo[i].phone,userInfo[i].email);
            
        }
        for(i=0;i<userInfo.length;i++)
     {
        detailsSecInfo[i] = {
            Name : userInfo[i].firstName + " " + userInfo[i].lastName,
            Desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quia nihil. Est, illum minima libero rerum, nihil distinctio placeat sint nam quae repellendus obcaecati delectus totam non odio. Sint, reprehenderit?",
            Address : Object.values(userInfo[i].address)[0],
            City : Object.values(userInfo[i].address)[1],
            State : Object.values(userInfo[i].address)[2],
            Zip : Object.values(userInfo[i].address)[3]
        }
        
     }

        classChange();
        detailsSectionRender();
  
    }
       catch(e){
           console.log(e);
       }
        
    }
}
http.send();

function userInfoRender() {
   
        tableRow = document.createElement('tr');
        tableRow.className = "data-row"; 
        
        for(j=1;j<6;j++)
        {
            tableData = document.createElement('td');
            tableData.className = "column" + j;
            tableData.innerHTML = (InfoObjectkeys[i][j-1]);   
            tableRow.appendChild(tableData); 
        }
        tableBody[0].appendChild(tableRow);  
    }

    
    function classChange() {
        
        $("#table-data tr").click(function(){
            console.clear();
            console.log('working till here');
            $(this).addClass('active');
            $(this).siblings().removeClass('active'); 
            selectedUserId = $(this).find('td:first').html();
            detailsSectionRender(selectedUserId);
            $('#info-content').show();
              
    });

    }     

    detailsSecInfo


    function detailsSectionRender(selectedId) {
        console.log(selectedUserId);
        console.log(userInfo);
        for(i=0;i<userInfo.length;i++)
                {
                    if(Number(selectedId) === userInfo[i].id)
                    {
                        var pos = i;    
                    }
                }
        console.log(pos);

        detailsInfo = $("#info-content div");
        
        for(i=0;i<6;i++)
        {
            try{
                detailsInfo[i].childNodes[1].nodeValue = Object.values(detailsSecInfo
                    [pos])[i];
            }
            catch{
                console.log
                (error);
            }
        }
        
    }




    searchBox = document.getElementById('search-box');
    try{
            
           searchBox.onkeyup = function() {
            
                searchVal = searchBox.value.toUpperCase();
                console.log(searchVal); 
                tableInfo = document.getElementById('table-data');
                tr = tableInfo.getElementsByTagName('tr');
                for(i=0;i<tr.length;i++) {
                   
                    data = tr[i].getElementsByTagName('td')[1];
                    if(data) {
                        userFname = data.textContent;
                        if(userFname.toUpperCase().indexOf(searchVal) > -1) {
                            tr[i].style.display = 'flex';
                        }
                        else{
                            tr[i].style.display = 'none';
                        }
                    }
                   
                }        
            }
        }
        catch(e){
                console.log(e);
        }

  