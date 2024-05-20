
let chatBotSectionDiv = document.createElement("div");
chatBotSectionDiv.className = "chatBot-section";

chatBotSectionDiv.innerHTML = `
    <div class="chatbot-container" id="chatContianer">
        <div class="heading">
            <h2>ChatBot</h2>
            <div style="cursor: pointer;" id="close"><img src="https://cdn.jsdelivr.net/gh/JARVES17/Chatbot@main/download.jpg" alt="" width="20px"></div>
        </div>

        <div class="messages" id="msgBox">
            <div class="align_response" id="response">
            </div>
        </div>
    </div>
    <div id="click" style="cursor: pointer;">
        <img src="https://cdn.jsdelivr.net/gh/JARVES17/Chatbot@main/message.svg" alt="" id="chatImg" width="50px">
    </div>
`;

// Append the new div to the body (or any other container element)
document.body.appendChild(chatBotSectionDiv);


 



let arr = [];
    const fetchData = async (url) => {
            const response = await fetch(url);
            const data = await response.json()
            console.log(data)
            return data;
        }

        async function main() {
            apiData = await fetchData("https://localhost:7043/api/Response/getResponse")
            console.log(apiData, "in block")
           
            response.appendChild(para)
            console.log(apiData, "out of block")
        }
        main()
    let apiData;
    const close=document.querySelector("#close")
    const userSend = document.getElementById("sendMsg")
    const chatContianer = document.getElementById("chatContianer")
    const response = document.getElementById('response')
    const msgBox = document.getElementById("msgBox")
    const chatImg=document.querySelector("#chatImg")

    const closeBtnChatBox = document.getElementById("close")


    
    close.addEventListener('click',()=>{
        chatImg.style.display = "block"
        chatContianer.style.display = "none"
        while (response.firstChild) {
            response.removeChild(response.lastChild);
        }
})
    const btn=document.getElementById('click')
    let para = document.createElement('p')
    btn.addEventListener('click',()=>{
        chatImg.style.display="none"
        chatContianer.style.display="block"
        const{ description , familyID , id, nextFamilyId,seq ,type}=apiData
        
        apiData.filter(({ description, familyID, id, nextFamilyId, seq, type } = val)=> familyID==1
    
    ).map(( { description, familyID, id, nextFamilyId, seq, type } = val)=>{
           
            
            let button= document.createElement('button')
            if(type==="Button"){
                    button.innerHTML= description
                    response.appendChild(button)
                    button.onclick=()=>handelNextDAta(nextFamilyId,description)
            } else if (type === "Text") {
                
                 para.innerText = description
                response.appendChild(para)
            }
           

            

            
         
        })
    })
   const handelNextDAta = (ids,diss) => {
          let userResponse = document.createElement('p')
          userResponse.innerHTML=diss
          userResponse.classList.add("userResponse")
          response.appendChild(userResponse)
        console.log(diss)
        const { description, familyID, id, nextFamilyId, seq, type } = apiData
        let arr = [];

        apiData.sort((a, b) => a.seq - b.seq).filter(({ description, familyID, id, nextFamilyId, seq, type,} = val) => familyID == ids
        ).map(({ description, familyID, id, nextFamilyId, seq, type  } = val) => {

            let para = document.createElement('p')
            let button = document.createElement('button')

            if (type === "Button") {
                button.innerHTML = description
                response.appendChild(button)
                button.onclick = () => handelNextDAta(nextFamilyId, description)
            } else if (type === "ListItems") {
                arr.push({dis: description,next: nextFamilyId })
            } else if (type === "Image") {
                let img=document.createElement("img")
                console.log(id)
                img.src=description
                img.style.width="fit-content"
                response.appendChild(img)
            }  else if (type === "url") {
                console.log(description)
                let link = document.createElement("a")
                link.href=description
                link.innerHTML=description
                link.setAttribute("target","blank")
                response.appendChild(link)

                console.log(link)
        
               
            }  
            else if(type==="Text"){
                para.innerText = description
                response.appendChild(para)
            }
            msgBox.scrollTop = msgBox.scrollHeight;
            

        })

        if (arr.length > 0) {
            console.log(arr)
            let list = document.createElement("select");
            let defaultSelect=document.createElement('option')
            defaultSelect.innerHTML="Select"
            list.appendChild(defaultSelect)
            arr.forEach(element => {
                let opn = document.createElement('option')
                opn.innerHTML = element.dis
                list.appendChild(opn)
            });
            list.addEventListener('change',(e)=>{
               let nextm = arr.find(val => val.dis === e.target.value);
                handelNextDAta(nextm.next,nextm.dis);
            })
            response.appendChild(list);
        }
    }