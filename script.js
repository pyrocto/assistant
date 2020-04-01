// p=document.createElement('p');p.id='transcript';document.body.appendChild(p);
var transcript = document.getElementById("transcript");
var speech = new webkitSpeechRecognition();
var i = 0;
var recognizing = true;
commands = (speechToText) => {
  let orders = speechToText.split(" ");
  let command = orders[0];
  if (command === "search") {
    let searchTerms = orders.join("+")
    window.location.replace("https://www.google.com/search?q=" + searchTerms);
  }

  if (command === "scriptures") {
    let searchTerms = orders.join("+")
    let bookConstruct = [];
    let chapterConstruct = [];
    let category = "";
    let work = "";
    let book = "";
    let chapter = "";
    for (i = 0; i <= 3; i++) {
      if (book === "") {
        if (searchTerms.includes("1st")) {
          searchTerms.replace("1st", "");
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
        }
        if (searchTerms.includes("mosiah")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "mosiah";
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
        else if (searchTerms.includes("mormon")) {
          category = "scriptures"
          work = "bofm/"
          bookConstruct[1] = "morm";
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
      }
      if (book !== "";) {
        let chapterContruct = [];
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
