function updateUserView(){
    document.getElementById("app").innerHTML=`  
      <h3>User Page</h3>
<br/>
<button 
onclick="model.app.page='admin'; updateView()"
>Admin Page</button>

    `;
}