// p=document.createElement('p');p.id='transcript';document.body.appendChild(p);
var transcript = document.getElementById("transcript");
var response = document.getElementById("response");
var debug = document.getElementById("debug");
var speech = new webkitSpeechRecognition();
var i = 0;
var recognizing = true;
commands = (speechToText) => {
  let orders = speechToText.toLowerCase().split(" ");
  let command = orders[0];
  let rest = orders.slice(1);
  if (command === "search") {
    let searchTerms = orders.join("+")
    window.location.replace("https://www.google.com/search?q=" + searchTerms);
  }
  
  if (command === "scriptures") {
    let searchTerms = rest;
    let chapter = 0;
    let book = "";
    let category = "";
    let work = "";
    // Check last element of rest to see if it's a number  last = +rest[rest.length - 1]
    //   If !Number.isNaN(last), set chapter to last and set searchTerms to searchTerms.slice(0, len-1)     
    // Set bookName to searchTerms.join(" ")
    // switch (bookName) {
    //   case "1st Nephi": book = "1-ne/"; category = "scriptures/"; work = "bofm/"; break;
    //   case "2nd Nephi": Book = "2-ne/"; category = "scriptures/"; work = "bofm/"; break;
    //   ...  
    // }
    // If chapter > 0, build a URL to the chpater
    // Otherwise, build a URL to the book
    // set location.href to the link

    /* for (i = 0; i <= 3; i++) {
      if (book === "") {
        if ((index = searchTerms.find("1st")) > -1) {
          searchTerms[index] = "";
          category = "scriptures"
          bookConstruct[0] = "1";
        }
        if (searchTerms.includes("2nd")) {
          searchTerms.replace("2nd", "");
          category = "scriptures"
          bookConstruct[0] = "2";
        }
        if (searchTerms.includes("3rd")) {
          searchTerms.replace("3rd", "");
          category = "scriptures"
          bookConstruct[0] = "1";
        }
        if (searchTerms.includes("4th")) {
          searchTerms.replace("4th", "");
          category = "scriptures"
          bookConstruct[0] = "4";
        }
        if (searchTerms.includes("nephi")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "-ne/";
        }
        if (searchTerms.includes("jacob")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "jacob/";
        }
        if (searchTerms.includes("enos")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "enos/";
        }
        if (searchTerms.includes("jarom")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "jarom";
        }
        if (searchTerms.includes("omni")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "omni/";
        }
        if (searchTerms.includes("words")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "w-of-m/";
        } else if (searchTerms.includes("mormon")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "morm/";
        }
        if (searchTerms.includes("mosiah")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "mosiah/";
        }
        if (searchTerms.includes("alma")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "alma/";
        }
        if (searchTerms.includes("helaman")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "hel/";
        }
        if (searchTerms.includes("ether")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "ether/";
        }
        if (searchTerms.includes("moroni")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "moroni/";
        }
        book = bookConstruct.join();
      } else {
        for (i = 1; i <= 10; i++) {
          a = i.toString;
          if (searchTerms.includes(a)) {
            searchTerms.replace(a, "");
            chapterConstruct.push[a];
          }
        }
        chapter = chapterConstruct.join();
      }

      window.location.href = ("gospellibrary://content/" + category + work + book + chapter);
    }
    */
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
  console.log(event);
  const speechToText = event.results[event.resultIndex][0].transcript;
  
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
