(function () {
  let text = document.getElementById("dappView2");
  let firstUserInput = document.getElementById("dapp2Input1")
  let secondUserInput = document.getElementById("dapp2Input2")

  let testButton = document.getElementById("testButton2")

  if(testButton)
    testButton.addEventListener("click",()=>{
      text.innerText = +firstUserInput.value * +secondUserInput.value;
    }) 
}())