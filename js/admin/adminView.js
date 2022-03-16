/*

<p class="formLabel">Happening-Anonsering dato og klokkaslett</p>
<div class="eventDateTime">
${
  
}

${createHappeningDate()}

<br>
${createAnnouncementDate()}
</div>

*/
function updateAdminView(){

    document.getElementById("app").innerHTML=`
    <div class="container" >
    <div  class="alert-message">
    ${model.inputs.adminPage.isSubmitted && !checkAllRequiredFields(model.inputs.adminPage.happening)  ? createAlertMessage("error","Du bør sjekke inn på noen av disse feltene nedenfor.") : ""}
    ${model.inputs.adminPage.isSubmitted && checkAllRequiredFields(model.inputs.adminPage.happening) ? createAlertMessage("success","Innsendingproesess er vellykket") : ""}
    </div>
    <div class="header">
    <h3>Welcome to Admin Page</h3>
    <button 
    class="btnUserPage"
    onclick="model.app.page='user'; updateView()"
    >Tilbake til Bruker Side</button>
    </div>

    <div
    class="form-content">
  <form id = "admin-form" class="admin-form"
  onsubmit="handleSubmit(event)"
  name="admin-form">


${createHappeningTitleHtml()}
  
${createHappeningDescHtml()}

 ${createHappeningImageHtml()}

${createMainCategoryHtml()}

${createPaymentCategoryHtml()}

${createHappeningDate()}

${createAnnouncementDate()}

${createWebUrlHtml()}
<div class="submitBtn">
<button
${model.inputs.adminPage.isSubmitted ? "disabled" : ""}
type="submit"  class="btn btn-primary ">Publiser happening</button>
</div>


 </form>
</div>
</div>
`;
  
}


function createHappeningTitleHtml(){
  let happeningTitle=``;
  happeningTitle+=`
  <div class="happeningformRow happeningTitle">
     <label for="title" class="formLabel titleLabel"><span class="requiredStar">*</span><span class="titleText">Tittel på happening</span></label>
     <input
     autofocus
  
       class="form-element input-top-mrgn
        title  ${model.inputs.adminPage.isOnChange.title ? showValidationStyle(model.inputs.adminPage.happening.title.isValidate,"errorStyle","successStyle"): "" }  " type="text"
        onblur="validate(this)"
        onchange="validate(this)"
        name="title"
        id = "eventTitle"
        placeholder="Enter a happening title"
        oninput="model.inputs.adminPage.happening.title.name=this.value; onInputValidate(this) "
        value="${model.inputs.adminPage.happening.title.name || ""}" />
        ${model.inputs.adminPage.isOnChange.title ? showValidationMessage(model.inputs.adminPage.happening.title.isValidate,"Tittel på happening påkrevd") : ""}
     
   </div>
  `;
 console.log("onchange true mi false mu buna da bakalim_ ",model.inputs.adminPage.isOnChange.title);
  console.log("Bunu cek edelim ne gelecekkkk: ",showValidationStyle(model.inputs.adminPage.happening.title.isValidate,"errorStyle","successStyle"))
  return happeningTitle;
}


/*
Bunlarda input attributu idi
 onblur="validate(this)"
        onchange="validate(this)"
        onInputValidate(this)

*/
//BIR PROBLEMIMIZ BIZ KULLANICI ALANI BOS BIRAKIP CI
function onInputValidate(titleInput){
  console.log("onInput calisti....")
  console.log("titleInput.valuezzzzz: ", titleInput.value.length);
  if(!titleInput.value){
    model.inputs.adminPage.happening.title.isValidate=false;
    console.log("isValidate oninputun icinde son durumu..",  model.inputs.adminPage.happening.title.isValidate)
    console.log("burasi data silinmis ise calismasini bekliyoruz....")
    model.inputs.adminPage.isOnChange.title=true;
    updateView();
  }else if(titleInput.value.length==1){
    console.log("value 1.karakter oldugunda oninput tetiklenecek burasi calisacak....")
 console.log("onchange oninput calisirken true mi false mu buna da bakalim_ ",model.inputs.adminPage.isOnChange.title);
 model.inputs.adminPage.happening.title.isValidate=true;
    updateView();
    console.log("input u alalim--------------------------------------------------",document.getElementById("eventTitle").focus())
    document.getElementById("eventTitle").setSelectionRange(1, 1);
  }
 

}

//onChange uzerinden mesajimizi verddgiimz icin onChange calistiginda biz onChange state durumunu true yapyrz ama onun disindaki calisan diger eventlerde hep onChange false olmalidir
//Burdaki tehlike onChange durumu true kalir ise ve biz basks fonksiyonda updateView calistirir isek biz onchange yapmadigimiz halde onchange true kaldigi icin 
function validate(titleInput){
  console.log("onchange calisti")
  console.log("Title Value: ",titleInput.value);
  model.inputs.adminPage.isOnChange.title=true;
  if(titleInput.value){
    console.log("input icin de value var ise burasi calisir ve isValidate true olur")
    model.inputs.adminPage.happening.title.isValidate=true;
    
  }else{
    console.log("input icin de value yok ise burasi calisir ve isValidate false olur")
    
    model.inputs.adminPage.happening.title.isValidate=false;
  }
  updateView();
}


 
function createHappeningDescHtml(){
  
  let happeningDesc=``;
  happeningDesc+=`
  <div class="happeningformRow happeningDescription">
  <label for="title" class="formLabel DescriptionLabel">Beskrivelse av happening</label>   
  <textarea class="form-element description "
  name="description"
   id = "description" 
   placeholder="Describe your happening here..."
   value="${model.inputs.adminPage.happening.description.name}"
   oninput="model.inputs.adminPage.happening.description.name=this.value; "
  >${model.inputs.adminPage.happening.description.name}</textarea>
</div>
  `;

  return happeningDesc;
}    





function createHappeningImageHtml(){
  let happeningImageFile=``;
  happeningImageFile+=`
  <div class="happeningformRow happeningImage">
    <label for="image" class="formLabel ImageLabel">Legg til bilde</label>
     <input id="image" name="image" class="form-element image"   type="file"
     onchange="readFile(event)"
     value="${model.inputs.adminPage.happening.imageSrc.name}"
     >
  </div>
  `;

  return happeningImageFile;
}

function readFile(event){
  let imageUrl=URL.createObjectURL(event.target.files[0]);
  console.log("imageUrl: ",typeof imageUrl); 
  model.inputs.adminPage.happening.imageSrc.name=imageUrl;
  //imageFile a atadgiimz url i herhangi bir image in src sine atayarak onu gosterebiliriz...
}

function createMainCategoryHtml(){
  const {categories}=model.data;
  let happeningMainCategory=``;
  happeningMainCategory+=`
  <div class="happeningformRow happeningMainCategory">
  <label for="mainCategory" class="formLabel mainCategoryLabel"><span class="requiredStar">*</span><span class="tittelText">Velg kategori</span></label>
  <select    class="form-element mainCategory  input-top-mrgn
  ${model.inputs.adminPage.isSubmitted ? showValidationStyle(model.inputs.adminPage.happening.categoryId.isValidate,"errorStyle","successStyle"): "" }
  " name="mainCategory" id="mainCategory"
  onchange="model.inputs.adminPage.happening.categoryId.name=this.value"
  >

 
  `;

  for(let i=0; i<categories.length; i++){
    const category=categories[i];
      happeningMainCategory+=`
      <option value="${category.id}">${category.title}</option>
      `;

  }
    happeningMainCategory+=`
    </select>
    ${model.inputs.adminPage.isSubmitted ? showValidationMessage(model.inputs.adminPage.happening.categoryId.isValidate,"Kategorifelt er påkrevd") : ""}
    </div>`;
 

  return happeningMainCategory;
}

//Submit butonu tiklanmis ise ve radio buttonlar dan tiklanan yani isSelected true olan var ise o zaman sucess style ve icon mesaji ver....
createPaymentCategoryHtml()
function createPaymentCategoryHtml(){
  const { paymentTypes}=model.data;
  let paymentCategory=``;
  paymentCategory+=`
  <div class="happeningformRow 

  ">
  <label for="paymentCategory" class="formLabel paymentCategoryLabel"><span class="requiredStar">*</span><span class="tittelText">Velg payment type</span></label>
  <div class="paymentCategory  input-top-mrgn 

  ">
  <div class="paymentTypeContainer   
  
  
  ${model.inputs.adminPage.isSubmitted ? showValidationStyle(model.inputs.adminPage.happening.paymentTypeId.isValidate,"errorStyle","successStyle"): "" }
  
  
  ">
  `;

for(let i=0; i<paymentTypes.length; i++){
  let paymentType=paymentTypes[i];
  paymentCategory+=`
  <div class="paymentType">
 
  <input 
  ${getChecked(paymentType.isChecked)}
  class="payTypeInput 
  
  
  " type="radio" id="${paymentType.id}" name="${paymentType.name}" 
  onchange="choosePaymentType(${paymentType.id})" 
  >
  </div>
  <div>
  <span class="spantext paymentCategoryText" for="${paymentType.title}">${paymentType.title}</span>
  </div>
  `;
}
    paymentCategory+=` </div>  </div> 
    ${model.inputs.adminPage.isSubmitted ? showValidationMessage(model.inputs.adminPage.happening.paymentTypeId.isValidate,"Paymenttypefelt er påkrevd") : ""}  
    </div>
    `;
  
  return paymentCategory;
}


function createHappeningDate(){
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//console.log("now; ", now);
  // console.log("localDateTime; ", now.toLocaleDateString("nb-no"))
  // console.log("localTime; ", now.toLocaleTimeString("nb-no").slice(0,5))
  let happeningDate=``;
  happeningDate+=`
  <label  class="formLabel paymentCategoryLabel"><span class="requiredStar">*</span><span class="tittelText">Happening start-end dato og klokkaslett</span></label>
  <div class="happeningformRow  happeningDateRow input-top-mrgn">

  <div class="happeningDate">
  <input 
  min="${now.toISOString().slice(0, 16)}"
  class="form-date happeningDateInput
  
  ${model.inputs.adminPage.isSubmitted ? showValidationStyle(model.inputs.adminPage.happening.happeningStartDate.isValidate,"errorStyle","successStyle"): "" }"
   id="happeningStart"  type="datetime-local"

  value="${this.value= now.toISOString().slice(0, 16)}"
  onchange="getHappeningStartDate(this);"
  
  />
  ${model.inputs.adminPage.isSubmitted ? showValidationMessage(model.inputs.adminPage.happening.happeningStartDate.isValidate,"happeningStartDate er påkrevd") : ""}
  </div>
  
  <span class="spantextDate">to</span> 
  
  <div class="happeningDate">
  <input
  min="${now.toISOString().slice(0, 16)}"
  class="form-date happeningDateInput
  ${model.inputs.adminPage.isSubmitted ? showValidationStyle(model.inputs.adminPage.happening.happeningEndDate.isValidate,"errorStyle","successStyle"): "" }
  " id="happeningEnd"  type="datetime-local"
  
  value="${this.value= now.toISOString().slice(0, 16)}"
  onchange="getHappeningEndDate(this)"
  />   
  ${model.inputs.adminPage.isSubmitted ? showValidationMessage(model.inputs.adminPage.happening.happeningEndDate.isValidate,"happeningEndDate er påkrevd") : ""}
  </div> 
</div>
  
  `;
  
  return happeningDate;
}


//model.inputs.adminPage.happening.happeningStartDate
function createAnnouncementDate(){
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  let announcementDate=``;
  announcementDate+=`
  <label  class="formLabel paymentCategoryLabel"><span class="tittelText">Annonsering start-end dato og klokkaslett</span></label>
  <div class="happeningformRow  happeningDateRow">

  <div class="happeningDate">
  
  <input
  min="${now.toISOString().slice(0, 16)}"
  class="form-date happeningDateInput
  
  "  id="announcementStart" type="datetime-local" 
  value="${this.value= now.toISOString().slice(0, 16)}"
  onchange="getAnnouncementStartDate(this)"
  /></div>
  <span class="spantextDate">to</span> 
  <div class="happeningDate">
  <input
  min="${now.toISOString().slice(0, 16)}"
  class="form-date happeningDateInput"  id="announcementEnd" type="datetime-local"
  value="${this.value= now.toISOString().slice(0, 16)}"
  onchange="getAnnouncementEndDate(this)"
  /></div>
</div>
  `;
  return announcementDate;
}



    function createWebUrlHtml(){
      let webUrlAdress=``;
      webUrlAdress+=`
      <div class="happeningformRow happeningTitle">
         <label for="title" class="formLabel titleLabel"><span class="tittelText">Webside-url adress</span></label>
         <input
           class="form-element  " type="text"
            name="title"
            id = "happeningUrl"
            placeholder="Happening webside-url adress"
            oninput="model.inputs.adminPage.happening.webSiteUrl.name=this.value"
            />
       </div>
      `;
     
      return webUrlAdress;
    }
     


  
    function createAlertMessage(result,message,){
      let alertMessage=``;
      alertMessage=`
      <div class="alert ${result}-alert">
      <h3>${message}</h3>
      <a onclick="alertHandle()" class="close">&times;</a>
    </div>
      `;
      return alertMessage;
    }














 //Javascriptin parametreye 3 deger verip 2 sini kullaninca problem yapmamasini burda kullanacagiz...
//  function checkInputValidation(inputValu){//model den alacagimz data gelecek
//    const {name, isValidate}=model.inputs.adminPage.happening.title;
//    value=name.trim();//sag ve soldaki bosluklari kaldir..
//    if(inputValue===''){     isValidate=false;
//      //Burda bir eksigimz var mesaj i nasil verecegiz onu dusunelim...input tan sonra display nonde veya visible hidden ile saklayagagimiz bir span inline elementi koyabiliriz once inputlardan sonra ve de submit olunca ona yeni bir class atayp display i none dan block veya inline-blocka cevirebilirz....
//      //Ya da farkli bir cozum olarak da eger submit tiklanmis ve de input un icindeki data dolu ise o zaman bir fonksiyon yazariz errorMessage bu da span etiketi olan ve icinde error mesaji olan bir elemnt olur ve bu fonksiyon hemen  inputun altinda calistirilabilir....

//      setErrorFor(errorClass)//form-control-error bir class tir ve error durumunda,
//    }else {
//      isValidate=true;//isValidate ler eger submit sonucu basarili olur ve aktivite eklenirse eklendikten sonra submit icinde en son tekrar default degerine dondurulerek sonlanmalidir ki zaten submit sonunda ekleme isleminden sonra form elementleri temizlenmesi gerekiyor da ayni islem sayilir aslinda...
//      setSuccessFor(successClass);
//    }

//    //Sonunda eger tum zorunlu inputlar dogru bir sekilde girilmis ise o zaman data eklenmeye hazirdir return olarak da true donsun, ama 1 tane bile input eksik ise zorunlu inputlardan o zaman bunun sonucu false donsun.....burda zorunlu alanlardan olusan bir dizi olusturabiliriz...model de ve onu kontrol edebiliriz...dizi yi de parametreye spring ile ekleriz ve otomatik birsekilde yarin oburgun yeni bir zorunlu alan eklenirse hic sorun yasanmamiz olur...
//  }

//  function setErrorFor(errorClass) {
//   return errorClass;
// }

// function setSuccessFor(successClass) {
// return successClass;
// }

    /*

${createEventStartDateAndTime()}
${createEventEndDateAndTime()}
      function createEventStartDateAndTime(){
      let eventStartDateAndTime=``;
      eventStartDateAndTime+=`
      <div class="eventStartDate eventDateRow">
      <label  class="heppeningDateTitles paymentCategoryLabel">End happening dato og klokkaslett</label>
          <div id="picker">
              </div>
          <input   class="form-date announcementDateStart" type="hidden" id="result"
          value="" />
     
      </div>
      
      `;
      return eventStartDateAndTime;
    }

    function createEventEndDateAndTime(){
      let eventEndDateAndTime=``;
      eventEndDateAndTime+=`
      <div class="eventEndDate eventDateRow">
  <label  class="heppeningDateTitles paymentCategoryLabel">End happening dato og klokkaslett</label>
      <div id="picker2">
          </div>
      <input   class="form-date announcementDateStart" type="hidden" id="result2"
      value="" />
 
  </div>
      
      `;
      return eventEndDateAndTime;
    }




${createHappeningDate()}
${createAnnouncementDate()}



function createHappeningDate(){
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//console.log("now; ", now);
  // console.log("localDateTime; ", now.toLocaleDateString("nb-no"))
  // console.log("localTime; ", now.toLocaleTimeString("nb-no").slice(0,5))
  let happeningDate=``;
  happeningDate+=`
  <div class="happeningformRow happeningDateRow">
  <label  class="formLabel paymentCategoryLabel">Select happening period</label>
  <input class="form-date happeningDateStart" id="happeningStart"  type="datetime-local"

  value="${this.value= now.toISOString().slice(0, 16)}"
  onchange="getHappeningStartDate(this)"
  
  />
  <span class="spantext">to</span>
  <input class="form-date happeningDateStart" id="happeningEnd"  type="datetime-local"
  
  value="${this.value= now.toISOString().slice(0, 16)}"
  onchange="getHappeningEndDate(this)"
  />
</div>
  
  `;
  return happeningDate;
}
//Bir de parametreye model gondersek o zaman tek fonksiyonda sanki hallebebiliriz gibi...
function getHappeningStartDate(selectedDate){
let startDateTime=selectedDate.value;
let getDate=startDateTime.slice(0,10);
let getTime=startDateTime.slice(11,16);
model.inputs.adminPage.happening.happeningStartDate.date=getDate;
model.inputs.adminPage.happening.happeningStartDate.time=getTime;

}

function getHappeningEndDate(selectedDate){
  let startDateTime=selectedDate.value;
  let getDate=startDateTime.slice(0,10);
  let getTime=startDateTime.slice(11,16);
  model.inputs.adminPage.happening.happeningEndDate.date=getDate;
  model.inputs.adminPage.happening.happeningEndDate.time=getTime;
  
  }

//model.inputs.adminPage.happening.happeningStartDate
function createAnnouncementDate(){
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  let announcementDate=``;
  announcementDate+=`
  <div class="happeningformRow announcementDateRow">
  <label  class="formLabel paymentCategoryLabel">Select announcement date</label>
  <input
  class="form-date announcementDateStart"  id="announcementStart" type="datetime-local" 
  value="${this.value= now.toISOString().slice(0, 16)}"
  onchange="getAnnouncementStartDate(this)"
  />
  <span class="spantext">to</span>
  <input class="form-date announcementDateStart"  id="announcementEnd" type="datetime-local"
  value="${this.value= now.toISOString().slice(0, 16)}"
  onchange="getAnnouncementEndDate(this)"
  />
</div>
  `;
  return announcementDate;
}

function getAnnouncementStartDate(selectedDate){
  let startDateTime=selectedDate.value;
  let getDate=startDateTime.slice(0,10);
  let getTime=startDateTime.slice(11,16);
  model.inputs.adminPage.happening.announcementStartDate.date=getDate;
  model.inputs.adminPage.happening.announcementStartDate.time=getTime;
  
  }

  function getAnnouncementEndDate(selectedDate){
    let startDateTime=selectedDate.value;
    let getDate=startDateTime.slice(0,10);
    let getTime=startDateTime.slice(11,16);
    model.inputs.adminPage.happening.announcementEndDate.date=getDate;
    model.inputs.adminPage.happening.announcementEndDate.time=getTime;
    
    }

    */