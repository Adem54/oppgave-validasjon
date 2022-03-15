
function choosePaymentType(id){
    model.data.paymentTypes=model.data.paymentTypes.map((payment,index)=> parseInt(payment.id)==id ? { id:payment.id, title:payment.title  ,isChecked:true } : { id:payment.id, title:payment.title  ,isChecked:false });
    model.inputs.adminPage.happening.paymentTypeId.name=id;
  }
  
  
  //Bu toggle durumu olursa checkbox larda input attributu icinde calisacak-  ${getChecked(paymentType.isChecked)}
  function getChecked(ischecked){
    return ischecked ? "checked" : "";
  }


  //Bir de parametreye model gondersek o zaman tek fonksiyonda sanki hallebebiliriz gibi...
function getHappeningStartDate(selectedDate){
  console.log("happening startDate")
    let startDateTime=selectedDate.value;
    let getDate=startDateTime.slice(0,10);
    let getTime=startDateTime.slice(11,16);
    model.inputs.adminPage.happening.happeningStartDate.name=getDate;
    model.inputs.adminPage.happening.happeningStartTime.name=getTime;
    //console.log("happpening:", model.inputs.adminPage.happening);
    }
    
    function getHappeningEndDate(selectedDate){
      let startDateTime=selectedDate.value;
      let getDate=startDateTime.slice(0,10);
      let getTime=startDateTime.slice(11,16);
      model.inputs.adminPage.happening.happeningEndDate.name=getDate;
      model.inputs.adminPage.happening.happeningEndTime.name=getTime;
    //console.log("happpening:", model.inputs.adminPage.happening);
      }

      
function getAnnouncementStartDate(selectedDate){
    let startDateTime=selectedDate.value;
    let getDate=startDateTime.slice(0,10);
    let getTime=startDateTime.slice(11,16);
    model.inputs.adminPage.happening.announcementStartDate.name=getDate;
    model.inputs.adminPage.happening.announcementStartTime.name=getTime;
   console.log("happpening:", model.inputs.adminPage.happening);
    }
  
    function getAnnouncementEndDate(selectedDate){
      let startDateTime=selectedDate.value;
      let getDate=startDateTime.slice(0,10);
      let getTime=startDateTime.slice(11,16);
      model.inputs.adminPage.happening.announcementEndDate.name=getDate;
      model.inputs.adminPage.happening.announcementEndTime.name=getTime;
  //console.log("happpening:", model.inputs.adminPage.happening);
      }


       //VALIDATION FUNCTIONS
 
 function handleSubmit(event){
    event.preventDefault();
       model.inputs.adminPage.isSubmitted=true;//Submit butonuna tiklandi demektir, coook onemli birsey var submit isleminin en son bolumus mesaj verme veya admin sayfasina gelen tum butonlarda biz hep model imiz defaul degerlerle gelmesi icin isSubmitted i tekrardan false yapmamiz gerekecek..
     
   if (!checkAllRequiredFields(model.inputs.adminPage.happening)){
      // showErrorMessage("");//Bunu ekranda gosterecegiz input alanlarinda eksikleriniz oldugu icin ekleme islemi gerceklestirilemiyor
      updateView();
    return;
   }else {
   addNewHappening(model.inputs.adminPage.happening);
   //input alanlarini sifirlayalim burda
  
//console.log("happeningsLast:", model.data.happenings);
    //push islemi yapacak
    //burda da mesaji verecek....
   }
   updateView();
 
  }


function cleanInputFields(){
  console.log("cleanInputFields calisiyor")
  let {happening}=model.inputs.adminPage;
  //Daha pratik temizleyebilir miyiz
happening.title={name:"",isFieldRequired:true,isValidate:false}
happening.description={name:"",isFieldRequired:false}
happening.imageSrc={name:"",isFieldRequired:false};
happening.categoryId={name:null, isFieldRequired:true,isValidate:false}
happening.paymentTypeId={name:null,isFieldRequired:true,isValidate:false};//gratis,betalt,ekstrabetalt
happening.happeningStartDate={name:"",isFieldRequired:true,isValidate:false}
happening.happeningStartTime={name:"",isFieldRequired:true,isValidate:false}
happening.happeningEndDate={name:"",isFieldRequired:true,isValidate:false}
happening.happeningEndTime={name:"",isFieldRequired:true,isValidate:false}
happening.announcementStartDate={name:"",isFieldRequired:false}
happening.announcementStartTime={name:"",isFieldRequired:false}
happening.announcementEndDate={name:"",isFieldRequired:false}
happening.announcementEndTime={name:"",isFieldRequired:false}
happening.webSiteUrl={name:"",isFieldRequired:false}

}



function addNewHappening(){
   let id=findLastId(model.data.happenings)+1;
let newHappening={
    id,...getHappeningValues()
}
console.log("newHappening: ", newHappening);
model.data.happenings.push(newHappening);
}

function getHappeningValues(){
  let {happening}=model.inputs.adminPage;
  let eventKeys=Object.keys(happening);
  let eventValues=Object.values(happening);
  eventValues=eventValues.map(item=>item.name);
  let newEvent=Object.assign.apply({},eventKeys.map((value,index)=>({[value]:eventValues[index]})));
  console.log("newEvent: ", newEvent);
return newEvent;
}


function findLastId(happenings){
let lastId=happenings.reduce((acc,happening)=>acc>happening.id ? acc : happening.id,0);
console.log("lastId: ", lastId);
return lastId;
}

// console.log("model.data.happenings: ",model.data.happenings);
// model.data.happenings.reduce((acc,item)=>acc>item.id ? acc : item.id,0);




  //Tum inputlarin ayri ayri check edecek fonksiyonlari burda invoke eden yerdir burasi her birisi de sonucudnda true veya false donecekler....Hepsi true olursa sonuc true donsun 1 i bile false olursa sonuc false donsun ve git checkRequiredFields fonksyonuu handleSubmit icinde kullan...
//Paramtreye bir dizi gonder isRequired i true olanlardan olusan bir dizi gonder ve bu diziyi checkRequiredFields icinde dondur ve her donmede donen degeri check et...
function checkAllRequiredFields(happening){
    // console.log("checkRequiredFields fonskiyona girdik!")
     let happeningKeys=Object.keys(happening);
     let happeningValues=Object.values(happening);
     //Tek tek tum happening objesi icndeki zorunlu alanlari kontrol ettik ve isValidate kisminda bir fonksiyon calistirarak o fonksiyojn sonucunu verdik her bir validate ama biz bu islmei su anda 
     happeningValues=happeningValues.map(item=>item.isFieldRequired ? {...item,isValidate:checkInputValue(item.name,item.isValidate)}: item);
     happeningValuesRequiredFields=happeningValues.filter(item=>item.isFieldRequired);
   //Simdi iceriigni degistirdigimiz model happening i guncelleyelim
   model.inputs.adminPage.happening =  Object.assign.apply({}, happeningKeys.map( (v, i) => ( {[v]: happeningValues[i]} ) ) );
 
     //Burayi return edecegiz...
     let allinputsCheckResult=happeningValuesRequiredFields.every((item)=>item.isFieldRequired && item.isValidate);
     return allinputsCheckResult;
    //En sonum, check edilen alanlarin neticleriini true false diye dizi icine yazariz ve en son diziyi kontrol ederiz hepsi true ise gec deriz true don deriz 1 i bile false gelrise false d
   }
   
   //Biz model den her bir title gibi objeyi dondurecegimz iicn onlar zaten hem inputValue hem de isValidate i barindiriyor...
   function checkInputValue(inputValue,isValidate){

     if(inputValue=="" || inputValue==null){
       isValidate=false;
   }else {
     isValidate=true;
   }
   
  
   return isValidate;
   }
   
   
   function showValidationStyle(isValidate,errorClass,successClass){

     if(!isValidate){
   //  console.log("errorClass verecek: ",errorClass);
       return errorClass;
     }else{
     //console.log("successClass verecek: ",successClass);
       return successClass;
     }
   }

 
   
   //Burda ortak mesaj da yazip sadece input ismini dinamiklestirebiliriz...
   //Alternatif span lari dogrudan input altina koyup class larina style da display none yapip sonra da ornegin isValid false ise o class i degil baska bir class goster diyebiliriz ve bu sekilde bu mesaji gostermis oluruz....
   function showValidationMessage(isValidate,errorMessage){

     if(!isValidate){
     //  console.log("Error mesaj yazisi gelmesini bekliyoruz...")
       return  `<span class="errorValidationMessage">  ${errorMessage} </span>`;
     }else {
       
       return `<span class="icon-checkmark"></span>`;
     }
     // return ``;//Burasi onemli...Biz eger isValidate false ise bunu don diyoruz false olmadigi zaman da return birsey donmedigi icin undefined donuyor..cunku donen returnu kullanmaya calisiyourz..
   }
   

   function alertHandle(){
    console.log("error melding running");
    model.inputs.adminPage.isSubmitted=false;
    cleanInputFields();
    updateView();
   
  }
  
 