// p=document.createElement('p');p.id='transcript';document.body.appendChild(p);
var transcript = document.getElementById("transcript");
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
  const speechToText = [...event.results]
    .map(r => r[0].transcript).join('');
  transcript.innerText = speechToText;
  setTimeout(() => {
    if (transcript.innerText === speechToText && recognizing) {
      speech.stop();
      recognizing = false;
      // process the text
      print(`${speechToText} -- orders recieved --`);
      commands(speechToText);
    }
  }, 1500);
};
speech.continuous = true;
speech.start();
