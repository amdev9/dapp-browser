(function () {
  let text = document.getElementById("dappView1");
  let firstUserInput = document.getElementById("dapp1Input1")
  let secondUserInput = document.getElementById("dapp1Input2")

  let testButton = document.getElementById("testButton")

  if(testButton)
    testButton.addEventListener("click",()=>{
      text.innerText = +firstUserInput.value + +secondUserInput.value;
  }) 
}())