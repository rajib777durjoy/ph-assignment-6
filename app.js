 // gobal variable//
 let sortBtn=document.getElementById("sortBtn");

  let spinner =()=>{
    let spinners=document.getElementById("spinner")
    spinners.style.display='none';
    cardAll()
  }
  //---------------------------------------------------------------------------------//
  let loaderfun=()=>{
    let spinners=document.getElementById("spinner");
    spinners.style.display="block";
    setTimeout(()=>{
     spinner()
    },2000);
  }
  window.addEventListener("DOMContentLoaded",loaderfun)
  
  //------------------------------------------------------------------------------------//

  let animalBtn=async()=>{
    let rep=await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    let data=await rep.json();
    btn_category(data.categories)
  }
    /// Cat, Dog , Rabbit , Bird dynamicaly btnClick ///
  let btn_category=(id)=>{
    let animalBtns=document.getElementById("animalBtn");
   for(let single of id){
    const {category,category_icon}=single;
    let newBtn=document.createElement("div");
    newBtn.innerHTML=`
    <button id="${category}" onclick="categoryBtn('${category}')" class="btn category-btn flex h-[70px] w-[150px]">
     <img src="${category_icon}" class="h-[50%]">${category}
    </button>
    `
    animalBtns.appendChild(newBtn)
   }
  }
  animalBtn();
  //-------------------removeActive function here-------------------------------//
  let removeActive=()=>{
    let removeClass=document.getElementsByClassName("category-btn");
    for(let item of removeClass){
      item.classList.remove("active");
    }
  }

 let categoryBtn=(id)=>{
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
  .then(res=>res.json())
  .then(data=>{
  animal_lists(data.data)
  })
  sortBtn.addEventListener("click",function(){
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
   .then(res=> res.json())
   .then(data=>{
    let valus=data.data.sort((x,y)=>y.price-x.price)
    animal_lists(valus);
   })
  })
 
   function activeClass(){
    removeActive();
    document.getElementById(`${id}`).classList.add("active");
   };
   activeClass();

  let spinners=document.getElementById("spinner");
  spinners.style.display="block";
  cardSpinner();
 };
// ----------------------CardSpinner function here-------------------------------//
 let cardSpinner=()=>{
  setTimeout(()=>{
    let spinners=document.getElementById("spinner");
    spinners.style.display="none";
   },2000);
 };

//-------------------------------------------------------------------------------------//

let cardAll=async()=>{
    let res=await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    let data=await res.json();
    animal_lists(data.pets);
  }

// --------------------------animal_lists function here-----------------------------//
 
let animal_lists=(data)=>{
  // console.log(data)
   if(data.length == 0){
    let animal_cards=document.getElementById("animal-cards")
     animal_cards.classList.remove("grid")
     animal_cards.innerHTML=""
    let newDiv=document.createElement("div");
     newDiv.classList=("card h-[100%] w-[100%] border-2 flex justify-center item-center")
    newDiv.innerHTML=`
    <img class="mx-auto" src=${'./B10A6-Assess-Your-Asynchronous-JS-and-ES6-skills/images/error.webp'}>
    <h2 class="text-center text-black text-2xl font-bold my-4">No Information Available</h2>
    <p class="w-[70%] text-center mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
    its layout. The point of using Lorem Ipsum is that it has a.</p>
    `
    animal_cards.appendChild(newDiv)
    return;
   }
   else{
    let animal_cards=document.getElementById("animal-cards")
     animal_cards.classList.add("grid")
   }

    let animal_cards=document.getElementById("animal-cards");
      animal_cards.innerHTML="";
    data.forEach(value=>{
      // console.log(value)
       let dynamic_card=document.createElement("div")
       dynamic_card.classList=("card card-compact bg-base-100 w-[100%] shadow-xl");
       dynamic_card.innerHTML=`
            <figure>
            <img
              src="${value.image}"
              alt="" class="w-[90%] my-1 h-[150px] object-cover rounded-md"/>
          </figure>
          <div class="mx-1 my-2">
            <h2 class="text-2xl">${value.pet_name}</h2>
            <h2 class="flex items-center"><img src=${'./B10A6-Assess-Your-Asynchronous-JS-and-ES6-skills/images/menu.png'} class="w-[15px] h-[15px] me-1" >breed:${value?.breed||"Not avilable"}</h2>
            <p><i class="fa-regular fa-calendar me-1"></i>Birth:${value?.date_of_birth||"Not avilable"}</p>
            <p><i class="fa-solid fa-venus me-1"></i>Gender:${value?.gender||"Not avilable"}</p>
            <p><i class="fa-solid fa-dollar-sign me-1"></i>Price:${value.price?value.price:'Not avilable'}</p>
            
            <div class="flex gap-2 justify-between w-[100%]">
              <button  onclick="likeFun('${value.image}')" class="btn "><i class="fa-regular fa-thumbs-up text-2xl"></i></button>
              <button  onclick='adoptFun(this)'class="btn">Adopt</button>
              <button  onclick="details('${value.image}', ${value.petId})" class="btn ">Details</button>
            </div>
          </div>
       `
       animal_cards.append(dynamic_card);
    });
  }

  let likeFun=(event)=>{
   let sidebar=document.getElementById("sidebar");
   let newElement=document.createElement("div");
   newElement.innerHTML=`
   <img src="${event}" class="w-[90%] h-[100px] object-cover">
   `
   sidebar.append(newElement);
  } 
  
  let adoptFun=(event)=>{
    let modal=document.getElementById("my_modal_2");
    let counter=document.getElementById("counter");
    counter.innerHTML=""
    let count=4;
    let id=setInterval(timer,1000);
    my_modal_2.showModal()
    function timer(){
      count--;
     if(count==0){
      clearInterval(id)
       modal.close();
       event.disabled=true;
     }
     else{
       counter.innerText=count;
       
     }
    }
  
   
}
let details=(id,petId)=>{
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
  .then(res=>res.json())
  .then(data=>detailsfun(data.petData))
  .catch(error=>error)
  my_modal_5.showModal()
 let detailsfun=(datas)=>{
  
  let modalImage=document.getElementById("modalImage");
  modalImage.innerHTML=`
   <img src="${id}" class="w-[90%] mx-auto h-[200px]">
   <div class="w-[90%] h-[50px] mx-auto grid grid-cols-2 my-6">
   <h1>${datas.pet_name}</h1>
   <p>Breed:${datas.breed}</p>
   <p>Birth:${datas.date_of_birth}</p>
   <p>Gender:${datas.gender}</p>
   <p>Gender:${datas.price}</p>
   <p>Gender:${datas.vaccinated_status}</p>
   </div>
   <hr>
   <div class="w-[90%] h-[150px]  mx-auto my-4>
     <p class="text-xl text-blue-700">${datas.pet_details}</p>
   </div>
    <button onclick="closeFun()" class="btn w-[100%] border-2">Close</button>
   `

 }

}
let closeFun=()=>{
  let modalColse=document.getElementById("my_modal_5").close()
}
//------------sort click button function here----------------------//

sortBtn.addEventListener("click",function(){
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
  .then(res=>res.json())
  .then(data=>{
    console.log(data.pets)
   let sortData= data.pets.sort((a,b)=>b.price-a.price)
  animal_lists(sortData);
  })
})


