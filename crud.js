// start for control coding
var formDetail = document.querySelector("#details");
var allInput = formDetail.querySelectorAll("INPUT");
var addBtn = document.querySelector("#add-btn");
var model = document.querySelector(".model");
var closeBtn = document.querySelector(".close-icon");
addBtn.onclick = function(){
    model.classList.add("active");
}
closeBtn.onclick = function(){
    model.classList.remove("active");
    var i;
    for(i=0;i<allInput.length; i++){
        allInput[i].value = "";
    }
}
// start all global variable
var userData = [];
var f_NameEl = document.querySelector("#f-name");
var l_NameEl = document.querySelector("#l-name");
var streetEl = document.querySelector("#street");
var addEl = document.querySelector("#add");
var cityEl = document.querySelector("#city");
var stateEl = document.querySelector("#state");
var emailEl = document.querySelector("#email");
var phoneEl = document.querySelector("#phone");
var formDetail = document.querySelector("#details");
var submitBtn = document.querySelector("#submit-btn");
var updateBtn = document.querySelector("#update-btn");

submitBtn.onclick = function(e){
    e.preventDefault();
    submitData();
    getDataFromLocal();
    formDetail.reset('');
    closeBtn.click();
}

if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}


function submitData(){
    userData.push({
        fName : f_NameEl.value,
        lNmae : l_NameEl.value,
        street : streetEl.value,
        adr : addEl.value,
        cityName : cityEl.value,
        stateName : stateEl.value,
        emailId : emailEl.value,
        phoneNo : phoneEl.value,
    });
    var userString = JSON.stringify(userData);
    localStorage.setItem("userData", userString);
    swal("Good job!", "Customer Details Added", "success");
}

// start returning data on page from localstorage
var tableData = document.querySelector("#table-data");
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    userData.forEach((data,index) =>{
        tableData.innerHTML += `
        
        <tr index='${index}'>

                <td>${data.fName}</td>
                <td>${data.lNmae}</td>
                <td>${data.street}</td>
                <td>${data.adr}</td>
                <td>${data.cityName}</td>
                <td>${data.stateName}</td>
                <td>${data.emailId}</td>
                <td>${data.phoneNo}</td>
                <td>
                    <button class="edit-btn"><i class="fa fa-edit"></i></button>
                    <button class="del-btn" style="color: rgb(234, 33, 33);"><i class="fa fa-trash"></i></button>
                </td>
            </tr>

        `;
    })

    // Start delete coding
    var i;
    var allDelBtn = document.querySelectorAll(".del-btn")
    for(i=0; i<allDelBtn.length; i++){
        allDelBtn[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    userData.splice(id,1);
                    localStorage.setItem("userData", JSON.stringify(userData));
                    tr.remove();
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
            }
    }

    // Start update coding
    var allEdit = document.querySelectorAll(".edit-btn");
    for(i=0; i <allEdit.length; i++){
        allEdit[i].onclick = function(){ 
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("td");
            var index = tr.getAttribute("index");
            var f_Name = td[0].innerHTML;
            var l_Name = td[1].innerHTML;
            var street = td[2].innerHTML;
            var add = td[3].innerHTML;
            var city = td[4].innerHTML;
            var state = td[5].innerHTML;
            var email = td[6].innerHTML;
            var phone = td[7].innerHTML;
            addBtn.click();
            submitBtn.disabled = true;
            updateBtn.disabled = false;
            f_NameEl.value = f_Name;
            l_NameEl.value = l_Name;
            streetEl.value = street;
            addEl.value = add;
            cityEl.value = city;
            stateEl.value = state;
            emailEl.value = email;
            phoneEl.value = phone;
            updateBtn.onclick = function(e){
                userData[index] = {
                    fName : f_NameEl.value,
                    lNmae : l_NameEl.value,
                    street : streetEl.value,
                    adr : addEl.value,
                    cityName : cityEl.value,
                    stateName : stateEl.value,
                    emailId : emailEl.value,
                    phoneNo : phoneEl.value,
                }
                localStorage.setItem("userData", JSON.stringify(userData));
            }
        }
    }


}
getDataFromLocal();
