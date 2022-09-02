let ary = [];
let str ="";
const list = document.querySelector(".list");
const filterBtn = document.querySelector(".filterBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const selector = document.querySelector(".selector");
const textEmpno = document.querySelector(".textEmpno");
const textEmpname = document.querySelector(".textEmpname");
const textBirthday = document.querySelector(".textBirthday");
const textSex = document.querySelector(".textSex");
const textStatus = document.querySelector(".textStatus");
const newDataBtn = document.querySelector(".newDataBtn");

// get API資料
fetch('http://49.159.20.233/demoapi/api/users')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    ary = myJson.data;
    renderData();
  });
//
//https://hyc1991.github.io/Server/

// 非同步資料取得後進行渲染
function renderData() {
  console.log(ary); //確認目前物件內容
  ary.forEach(function(item,index){
    if (item.Sex===1){
      item.Sex="男生";
      if (item.Status===true){
        item.Status="true";
      }else{
        item.Status="false";
      }
    }else{
      item.Sex="女生";
      if (item.Status===true){
        item.Status="true";
      }else{
        item.Status="false";
      }
    }
    let content = `<li title="員工資料">員工編號:${item.EMPNO}、員工姓名:${item.EMPNAME}、員工生日:${item.Birthday}、員工性別:${item.Sex}、員工狀態:${item.Status}<input type="button" value="刪除" class="deleteBtn" title="刪除此筆資料" data-num="${index}"></li><br>`
    str+=content;
  })
  list.innerHTML = str;
};

// 設置篩選
filterBtn.addEventListener("click",function(e){
    console.log(selector.value);
  if (e.target.value===undefined){
    console.log("您點擊到空的地方")
    return;
  }
  let str="";
  ary.forEach(function(item,index){
    if (selector.value==="全部資料"){
      str+=`<li title="員工資料">員工編號:${item.EMPNO}、員工姓名:${item.EMPNAME}、員工生日:${item.Birthday}、員工性別:${item.Sex}、員工狀態:${item.Status}<input type="button" value="刪除" class="deleteBtn" title="刪除此筆資料" data-num="${index}"></li><br>`;
    }else if (selector.value===item.Sex){
      str+=`<li title="員工資料">員工編號:${item.EMPNO}、員工姓名:${item.EMPNAME}、員工生日:${item.Birthday}、員工性別:${item.Sex}、員工狀態:${item.Status}<input type="button" value="刪除" class="deleteBtn" title="刪除此筆資料" data-num="${index}"></li><br>`;
    }else if (selector.value===item.Status){
      str+=`<li title="員工資料">員工編號:${item.EMPNO}、員工姓名:${item.EMPNAME}、員工生日:${item.Birthday}、員工性別:${item.Sex}、員工狀態:${item.Status}<input type="button" value="刪除" class="deleteBtn" title="刪除此筆資料" data-num="${index}"></li><br>`;
    }
  })
  list.innerHTML=str;
});

//編輯資料後重新渲染
function reRenderData(){
  let str="";
  ary.forEach(function(item,index){
    str+=`<li title="員工資料">員工編號:${item.EMPNO}、員工姓名:${item.EMPNAME}、員工生日:${item.Birthday}、員工性別:${item.Sex}、員工狀態:${item.Status}<input type="button" value="刪除" class="deleteBtn" title="刪除此筆資料" data-num="${index}"></li><br>`;
  })
  list.innerHTML = str;
};

// 新增資料監聽器
newDataBtn.addEventListener("click",function(e){
  if(textEmpno.value.length===0||textEmpname.value.length===0||textBirthday.value.length===0){
    alert("員工資料輸入不完整");
    return;
  }
  let obj = {};
  obj.EMPNO=textEmpno.value;
  obj.EMPNAME= textEmpname.value;
  obj.Birthday=textBirthday.value;
  obj.Sex=textSex.value;
  obj.Status=textStatus.value;
  ary.push(obj);
  reRenderData();
  textEmpno.value="";
  textEmpname.value="";
  textBirthday.value="";
});

//刪除資料監聽器
list.addEventListener("click",function(e){
  console.log(e);
  if (e.target.nodeName!=="INPUT"){
    console.log("您沒有點擊到按鈕");
    return;
  };
  let num = e.target.attributes[4].value;
  ary.splice(num,1);
  reRenderData();
});