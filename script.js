// p=document.createElement('p');p.id='transcript';document.body.appendChild(p);
var transcript = document.getElementById("transcript");
var response = document.getElementById("response");
var debug = document.getElementById("debug");
var speech = new webkitSpeechRecognition();
var i = 0;
var recognizing = true;
commands = (speechToText) => {
  let commandList = speechToText.split(" ");
  if (commandList.includes("what") || commandList.includes("how") || commandList.includes("who")) {
    let searchTerms = commandList.join("+")
    window.location.href="https://www.google.com/search?q=" + searchTerms;
  }
  /*if(commandList.includes("maps" || "directions")){
    //search google maps for speechToText;
  }
  if(commandList.includes("pictures")){
    //search google images for speechToText;
  }*/

  /*
  if(commandList.includes("call")){
    //let name = second element of array
    //search contacts for name
    //confirm call, listen
    //let confirmation = speechToText.split(" ")
    //if(confirmation.includes("yes")){
    //call name}
  }
  if(commandList.includes("text")){
    //let name = second element of array
    //search contacts for name
    //confirm text person, listen
    //read text out loud ask for confirmation, listen
    //let confirmation = speechToText.split(" ")
    //if(confirmation.includes("yes")){
    //write in textbox speech to text
    // send text}
  }
  if(commandList.includes("read")){
    //search church ofjesuschrist.org and listen

  }
  if(commandList.includes("record")){
  //open voice recorder and listen

  }
  if(commandList.includes("exercise")){
  //open exercise app and listen

  }
  */
};

speech.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
  
  var x = [...event.results].map(x => [...x]);
  debug.innerText = JSON.stringify(x);
  
  transcript.innerText = speechToText;
  setTimeout(() => {
    if (transcript.innerText === speechToText && recognizing) {
      speech.stop();
      recognizing = false;
      // process the text
      response.innerText = `${speechToText} -- orders recieved --`;
      commands(speechToText);
    }
  }, 1500);
};
speech.continuous = true;
speech.interimResults = true;
speech.maxAlternatives = 1;
speech.start();
