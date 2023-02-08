const url="http://localhost:3000/todos/"
const resetBtn=document.getElementById("resetBtn")
const submitBtn=document.getElementById("submitBtn")
const CompletedInput=document.getElementById("CompletedInput")
const TodoInput=document.getElementById("TodoInput")
const UserInput=document.getElementById("UserInput")

fetch(url).then(response=>response.json())
            .then(data=>{
                data.forEach(element => {
                    addTodoToTable(element)
                });
            })
            .catch(err=>alert("error on loading"))


submitBtn.addEventListener("click",()=>{
    let userId=UserInput.value
    let title=TodoInput.value
    let completed=CompletedInput.value

    if(!userId || !title )
        return alert ("all fields are required")
    let dataToSend={
        userId:userId,
        title:title,
        completed:completed=="true"
    }
    fetch(url,{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response=>response.json())
    .then(data=>{
       addTodoToTable(data)
       reset()
    })
    .catch(err=>alert("error on inserting"))

})
resetBtn.addEventListener("click",()=>{
    reset()
})
const reset=()=>{
    TodoInput.value=""
    UserInput.value=""
}
const addTodoToTable=(todo)=>{

    const tr=document.createElement("tr")
    const td1=document.createElement("td")
    const td2=document.createElement("td")
    const td3=document.createElement("td")
    const td4=document.createElement("td")
    const td5=document.createElement("td")
    const button=document.createElement("button")

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    td5.appendChild(button)

    td1.innerText=todo.id;
    td2.innerText=todo.userId;
    td3.innerText=todo.title;
    td4.innerText=todo.completed;
    button.innerText="delete";

    button.addEventListener('click',()=>{
        // call of fetch to delete
        fetch(url+todo.id,{
            method:"DELETE"
        }).then(response=>{
            if(response.ok)
            {
                tr.remove();
            }
            else
                throw "error"
        })
        .catch(err=>alert("error on deleting"))
        //suppression de l element(table)
    })

    document.getElementById("data").appendChild(tr)
}