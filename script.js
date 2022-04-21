fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v2/all');
    const myJson = await response.json(); 
    console.log(myJson);
    let datax = [...myJson];
    localStorage['jsonData'] = JSON.stringify(myJson);

    const pagination= document.getElementById("pagination");
    let current_page = 1;
    let coloumn = 9;

    // To Display required items in a page
   function Display_elements(myJson, listbox, coloumn, page){
    listbox.innerHTML="";
    page--;
    let start = page * coloumn;
    let end = start + coloumn;
    
    
    for(let i= start;i<end;i++){
        console.log("my",myJson[i]);
        const div1 = document.createElement('div');
        div1.classList.add('country-item');
        div1.style.backgroundColor="#a3c2c2";
        div1.style.width="250px";
        div1.style.height="400px";  
        

        const img = document.createElement('img');
        img.classList.add('flag');
        img.setAttribute('src', myJson[i].flag);
        img.setAttribute('alt', "flag-img");
        img.style.width="230px";
        img.style.height="140px";
        img.style.paddingLeft="10px";
        img.style.paddingTop="px";
        div1.innerHTML='<hr id="hr1"> '
       

        

        const h3 = document.createElement('h3');
        h3.textContent = myJson[i].name;

        var li_list = [ "Capital","Region","Population","Time Zone" ];
        
        var li_values = [myJson[i].capital,myJson[i].region,myJson[i].population,myJson[i].timezones[0]];
        
        const ul = document.createElement('ul');

        for (var j = 0; j < li_list.length; j++) 
        
        
        {
            const li = document.createElement('li');
            li.textContent = li_list[j] + ": " + li_values[j];
            ul.appendChild(li);
        }



        div1.appendChild(h3);
        
        div1.appendChild(img);
        
        div1.appendChild(ul);
        

        div1.addEventListener('click', function (e) {
            displayCountryDetails(e, myJson);
        })

        var c_box = document.getElementById('list');
        c_box.appendChild(div1);
    }
   
    
    
    console.log(c_box);
    
    }

    
    function SetupPagination(myJson, paginationbox, coloumn){
        let pageCount = Math.ceil(myJson.length/coloumn                                                                                                                                         );
        console.log(pageCount)
        for(let i=1;i<pageCount+1;i++){
        let btn = PaginationButton(i, myJson);
        paginationbox.append(btn);
        btn.style.height="30px"
        btn.style.width="30px"
        }
        
        }

        function PaginationButton(page, myJson ){
            let button = document.createElement("button");
            button.innerText = page;
            
            
            
            button.addEventListener("click", function(){
            current_page = page;
            Display_elements(datax, list, coloumn, current_page);
            
            
            
            })
            return button;
            }

            Display_elements(datax, list, coloumn, current_page)
            SetupPagination(datax,pagination,coloumn)

}

fetchCountries();

const search = document.forms['input-form'].querySelector('input');
search.addEventListener('keyup', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const countries = document.getElementsByTagName('h3');

    document.getElementById('regions').selectedIndex = 0;

    Array.from(countries).forEach(function (country) {
        if (country.innerText.toLowerCase().indexOf(searchTerm) != -1) {
            country.parentElement.style.display = "block";
        } else {
            country.parentElement.style.display = "none";
        }
    })
})