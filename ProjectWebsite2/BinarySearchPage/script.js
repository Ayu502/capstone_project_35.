
let globalArray = [];


function generateArray(){
    let n= 8+ Math.random()*20;
    let st = new Set();
    while(st.size<n){
        st.add(parseInt(Math.random()*100));
    }
    let arr = [];
    arr.push(...st);
    arr.sort(function(a,b){
        return a-b;
    });

    return arr;
}




let index = document.querySelector(".index");
let arrow = document.querySelector(".arrow");
let array = document.querySelector(".array");



//=========================================Styling==============================================================>

function styleArrow(tag){
    tag.style.height = "100%";
    let wdth = tag.style.height;
    tag.style.width = "8vh";
    tag.style.display= "flex";
    tag.style.alignItems= "bottom";
    tag.style.justifyContent = "center";
    tag.style.margin = "0 0.7px";
    
}




function styleIndex(idx,i){
    idx.style.height = "100%";
    idx.style.width = "8vh";
    idx.style.display= "flex";
    idx.style.alignItems= "top";
    idx.style.justifyContent = "center";
    idx.style.margin = "0 0.7px";
    idx.innerText = i;
    idx.style.fontSize = "1.4rem";
    
}





function styleArr(tag,a){
    tag.style.height = "100%";
    tag.style.width = "8vh";
    tag.style.display= "flex";
    tag.style.alignItems= "center";
    tag.style.justifyContent = "center";
    tag.style.border = "2px solid black";
    tag.style.borderRadius= "8px"
    tag.style.margin = "0 0.7px";
    tag.innerText = a;
    tag.style.fontSize = "1.5rem";
    tag.style.fontWeight="600";
    // tag.style.
    
}


//===========================================start============================================================>

let started = 0;
let animi =-1;


function start(){
    started = 1;
    globalArray = generateArray();
    let arr = globalArray;
    array.innerHTML="";
    index.innerHTML="";
    arrow.innerHTML="";
    for(let i=0;i<arr.length;i++){
        let arrowEle = document.createElement("div");
        styleArrow(arrowEle);
        arrow.appendChild(arrowEle);


        let indexEle = document.createElement("div");
        styleIndex(indexEle,i);
        index.appendChild(indexEle);

        let arrayEle = document.createElement("div");
        styleArr(arrayEle,arr[i]);
        array.appendChild(arrayEle);
    }

}

let ans = document.querySelector(".ans");
let com = document.querySelector(".com");
let si1 = document.querySelector(".si-score");
let ei1 = document.querySelector(".ei-score");
let mid1 = document.querySelector(".mid-score");

function binarySearch(arr,key , si,ei){
    if(si>ei){
        com.style.backgoundColor = "gray";
        com.innerText = "N.F";
        ans.innerText = -1;
        return;
    }
    let mid = parseInt((si+ei)/2);
    si1.innerText=si;
    ei1.innerText=ei;
    mid1.innerText = mid;
    array.children[mid].style.backgroundColor= "yellow";
    if(arr[mid]===key){
        setTimeout(() => {
            animi=key;
            com.style.backgroundColor = "green";
            array.children[mid].style.backgroundColor= "green";
            array.children[mid].style.animation ="blink 1s infinite";

            array.children[si].style.backgroundColor= "white";
            array.children[ei].style.backgroundColor= "white";
    
            com.innerText = `${key}=${key}`;
            ans.innerText = mid;
            return;
        }, 4000);
    }
    else if(arr[mid]>key){
        setTimeout(() => {
                
            array.children[ei].style.backgroundColor= "white";
            ei=mid-1;
            array.children[ei].style.backgroundColor= "red";
            com.style.backgroundColor = "blue";
            com.innerText = `${key}<${arr[mid]}`;
            ans.innerText = mid;
            setTimeout(() => {
                array.children[mid].style.backgroundColor= "white";
                binarySearch(arr,key ,si,ei);   
            }, 3000);
        }, 3000);
    }
    else{
        setTimeout(() => {
            array.children[si].style.backgroundColor= "white";
            si = mid+1;
            array.children[si].style.backgroundColor= "blue";
            array.children[mid].style.backgroundColor= "white";
            com.style.backgroundColor = "red";
            com.innerText = `${key}>${arr[mid]}`;
            ans.innerText = mid;
            setTimeout(() => {
                // array.children[si].style.backgroundColor= "white";
                array.children[mid].style.backgroundColor= "white";
    
                binarySearch(arr,key,si,ei);  
            }, 8000);
            
        }, 8000);

    }

}


function startSearch(){
    ans.innerHTML="";
    com.innerHTML="";
    si1.innerHTML="";
    ei1.innerHTML="";
    mid1.innerHTML="";
    if(started===0) return;
    let key = Number(document.querySelector("input").value);
    let n= globalArray.length-1;
    if(animi!=-1){
        array.children[i].style.animation="";
        animi=-1;
    }
    for(let i=0;i<=n;i++){
        array.children[i].style.backgroundColor="white";
    }
    array.children[0].style.backgroundColor= "blue";
    array.children[n].style.backgroundColor = "red";
    setTimeout(() => {
        binarySearch(globalArray,key,0,n);
    }, 5000);
}