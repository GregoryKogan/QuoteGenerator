let DataBase_RU;
let DataBase_EN;
let PiecesRU = {};
let PiecesEN = {};
let BeginningsRU = [];
let BeginningsEN = [];
let Alphabet;
let ContextLength = 2;

function preload(){
  DataBase_RU = loadStrings("QuoteDataBase(RU).txt");
  DataBase_EN = loadStrings("QuoteDataBase(EN).txt");
  ThiccFont = loadFont('Fonts/Roboto-Black.ttf');
  ThinFont = loadFont('Fonts/Roboto-Thin.ttf');
  RegularFont = loadFont('Fonts/Roboto-Regular.ttf');
  loadFont('Fonts/Roboto-Black.ttf');
  loadFont('Fonts/Roboto-Thin.ttf');
  loadFont('Fonts/Roboto-Regular.ttf');
}

function setup(){
  SetUpUI();
  if (Device == "Laptop")
    createCanvas(windowWidth - 5, windowHeight - 5);
  else
    createCanvas(windowWidth + 1, windowHeight + 1);
  LoadAlphabet();
  DataBase_RU = NormalizeData(DataBase_RU);
  DataBase_EN = NormalizeData(DataBase_EN);
  for (let i = 0; i < DataBase_RU.length; ++i){
    for (let j = 0; j < DataBase_RU[i].length - ContextLength; ++j){
      let ThisContext = [];
      for (let k = 0; k < ContextLength; ++k){
        ThisContext.push(DataBase_RU[i][j + k])
      }
      if (j == 0)
        BeginningsRU.push(ThisContext);

      if (!PiecesRU[ThisContext])
        PiecesRU[ThisContext] = [];
      PiecesRU[ThisContext].push(DataBase_RU[i][j + ContextLength]);
    }
  }
  for (let i = 0; i < DataBase_EN.length; ++i){
    for (let j = 0; j < DataBase_EN[i].length - ContextLength; ++j){
      let ThisContext = [];
      for (let k = 0; k < ContextLength; ++k){
        ThisContext.push(DataBase_EN[i][j + k])
      }
      if (j == 0)
        BeginningsEN.push(ThisContext);

      if (!PiecesEN[ThisContext])
        PiecesEN[ThisContext] = [];
      PiecesEN[ThisContext].push(DataBase_EN[i][j + ContextLength]);
    }
  }
}

function draw(){
  background(18);
  UpdateUI();
  DisplayQuote();
}
