let Device = "Laptop";
let Os = "Win";

let GenerateButtonRU;
let GenerateButtonEN;
let LanguageSelector;
let FullScreenButton;

let Language = "RU";

let CurrentQuote = "";

function SetUpUI(){
  DetectDevice();

  ButtonColor = color(18);

  GenerateButtonRU = createButton("Сгенерировать цитату");
  GenerateButtonRU.mousePressed(GenerateRussianQuote);
  GenerateButtonEN = createButton("Generate quote");
  GenerateButtonEN.mousePressed(GenerateEnglishQuote);
  LanguageSelector = createButton("EN");
  LanguageSelector.mousePressed(ChangeLanguage);

  GenerateButtonRU.style('font-size', '20px');
  GenerateButtonRU.style('background-color', ButtonColor);
  GenerateButtonRU.style('color', 'white');
  GenerateButtonRU.style('font-family', 'Roboto-Thin');

  GenerateButtonEN.style('font-size', '20px');
  GenerateButtonEN.style('background-color', ButtonColor);
  GenerateButtonEN.style('color', 'white');
  GenerateButtonEN.style('font-family', 'Roboto-Thin');

  LanguageSelector.style('font-size', '15px');
  LanguageSelector.style('background-color', ButtonColor);
  LanguageSelector.style('color', 'white');
  LanguageSelector.style('font-family', 'Roboto-Black');

  GenerateButtonRU.size(max(230, windowWidth / 3), 30);
  GenerateButtonEN.size(max(230, windowWidth / 3), 30);
  GenerateButtonRU.position(windowWidth / 2 - max(230, windowWidth / 3) / 2, 30);
  GenerateButtonEN.position(windowWidth / 2 - max(230, windowWidth / 3) / 2, 30);
  LanguageSelector.size(40, 40);
  LanguageSelector.position(10, windowHeight - 40);

  if (Os != "IOS"){
    FullScreenButton = createButton("<>");
    FullScreenButton.style('font-size', '20px');
    FullScreenButton.style('background-color', ButtonColor);
    FullScreenButton.style('color', 'white');
    FullScreenButton.style('font-family', 'Roboto-Regular');
    FullScreenButton.mousePressed(FSManagement);
  }

  GenerateButtonEN.hide();
}

function UpdateUI(){
  GenerateButtonRU.size(max(230, windowWidth / 3), 30);
  GenerateButtonEN.size(max(230, windowWidth / 3), 30);
  GenerateButtonRU.position(windowWidth / 2 - max(230, windowWidth / 3) / 2, 30);
  GenerateButtonEN.position(windowWidth / 2 - max(230, windowWidth / 3) / 2, 30);
  LanguageSelector.position(10, windowHeight - 50);
  if (Os != "IOS"){
    if (fullscreen() != undefined)
      FullScreenButton.html("><");
    else
      FullScreenButton.html("<>");
  }

  if (Os != "IOS"){
    FullScreenButton.position(windowWidth - 50, windowHeight - 45);
    FullScreenButton.size(40, 30);
  }
}

function DisplayQuote(){
  const SymbolWidth = 14;
  let LineLen = Math.floor((windowWidth - 100) / SymbolWidth);
  let Rows = [];
  let CurrentRow = 0;
  for (let i = 0; i < CurrentQuote.length; ++i){
    if (!Rows[CurrentRow])
      Rows[CurrentRow] = "";
    if (Rows[CurrentRow].length + CurrentQuote[i].length + 1 > LineLen){
      CurrentRow++;
      --i;
    }
    else{
      Rows[CurrentRow] += (CurrentQuote[i] + " ");
    }
  }
  let StartY = max(windowHeight / 2 - Rows.length / 2 * 40, 100);
  push();
  fill(255);
  textFont(ThinFont);
  textSize(25);
  textAlign(CENTER);
  for (let i = 0; i < Rows.length; ++i){
    if (StartY + i * 40 < windowHeight - 50)
      text(Rows[i], windowWidth / 2, StartY + i * 40);
  }
  pop();
}

function ChangeLanguage(){
  CurrentQuote = "";
  if (LanguageSelector.html() == "EN"){
    LanguageSelector.html("RU");
    GenerateButtonEN.show();
    GenerateButtonRU.hide();
    Language = "EN";
  }
  else{
    LanguageSelector.html("EN");
    GenerateButtonEN.hide();
    GenerateButtonRU.show();
    Language = "RU";
  }
}

function LockScreen(){
  if (Os != "IOS"){
    screen.orientation.lock("portrait")
    .then(function() {
      console.log("Device orientation locked");
    })
    .catch(function(error) {
      console.log("Unable to lock screen on this device");
    });
  }
}

function FSManagement(){
  if (Os != "IOS"){
    if (fullscreen()){
      FullScreenButton.html("<>");
    }
    else{
      FullScreenButton.html("><");
    }
    fullscreen(!fullscreen());
  }
}

function DetectDevice(){
  if (min(displayWidth / 4.29, displayHeight / 4.29) >= 150)
    Device = "Laptop";
  else
    Device = "Phone";
  if (navigator.userAgent.indexOf("like Mac") != -1){
    Os = "IOS";
    Device = "Phone";
  }
}

function windowResized(){
  if (Device == "Laptop")
    resizeCanvas(windowWidth - 5, windowHeight - 5);
  else
    resizeCanvas(windowWidth + 1, windowHeight + 1);
  UpdateUI();
}
