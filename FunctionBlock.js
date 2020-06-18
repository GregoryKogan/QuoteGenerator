function GenerateRussianQuote(){
  let Quote = [];
  let CurrentPiece = random(BeginningsRU);
  for (let i = 0; i < CurrentPiece.length; ++i)
    Quote.push(CurrentPiece[i]);
  for (let i = 0; NotEnd(Quote) && i < 100; ++i){
    if (!PiecesRU[CurrentPiece])
      break;
    let NextPiece = random(PiecesRU[CurrentPiece]);
    Quote.push(NextPiece);
    CurrentPiece.splice(0, 1);
    CurrentPiece.push(NextPiece);
  }

  Quote = MakeString(Quote);
  console.log(GetText(Quote));
  ReadQuote(GetText(Quote));
  CurrentQuote = Quote;
}

function GenerateEnglishQuote(){
  let Quote = [];
  let CurrentPiece = random(BeginningsEN);
  for (let i = 0; i < CurrentPiece.length; ++i)
    Quote.push(CurrentPiece[i]);
  for (let i = 0; NotEnd(Quote) && i < 100; ++i){
    if (!PiecesEN[CurrentPiece])
      break;
    let NextPiece = random(PiecesEN[CurrentPiece]);
    Quote.push(NextPiece);
    CurrentPiece.splice(0, 1);
    CurrentPiece.push(NextPiece);
  }

  Quote = MakeString(Quote);
  console.log(GetText(Quote));
  ReadQuote(GetText(Quote));
  CurrentQuote = Quote;
}

function NotEnd(List){
  let LastWord = List[List.length - 1];
  if (LastWord == '!' || LastWord == '.' || LastWord == '…')
    return false;
  else
    return true;
}

function MakeString(List){
  let Result = "";
  for (let i = 0; i < List.length - 1; ++i){
    Result += List[i];
    if (i == 0)
      Result = CapitalFirst(Result);
    if (IsLetter(List[i + 1][0]) || List[i + 1][0] == '-' || List[i + 1][0] == '—' || List[i + 1][0] == '–')
      Result += " ";
  }
  Result += List[List.length - 1];
  Result = Result.split(" ", 1000);
  return Result;
}

function GetText(List){
  let Result = "";
  for (let i = 0; i < List.length - 1; ++i){
    Result += List[i] + " ";
  }
  Result += List[List.length - 1];
  return Result;
}

function CapitalFirst(Word){
  let FirstLetter = Word[0];
  FirstLetter = FirstLetter.toUpperCase();
  let NewWord = "";
  NewWord += FirstLetter;
  for (let i = 1; i < Word.length; ++i)
    NewWord += Word[i];
  return NewWord;
}

function NormalizeData(Data){
  let Result = [];
  for (let i = 0; i < Data.length; ++i){
    let String = NormalizeString(Data[i]);
    if (String)
      Result.push(String);
  }
  return Result;
}

function NormalizeString(String){
  String = String.toLowerCase();
  if (String[0] == '-')
    return;
  let Result = [];
  let Piece = "";
  for (let i = 0; i < String.length; ++i){
    if (String[i] == " " || i == String.length - 1){
      if (Piece != ""){
        Result.push(Piece);
        Piece = "";
      }
    }
    else{
      if (IsLetter(String[i]))
        Piece += String[i];
      else{
        if (Piece != "")
          Result.push(Piece);
        Result.push(String[i]);
        Piece = "";
      }
    }
  }
  return Result;
}

function LoadAlphabet(){
  Alphabet = ['а', 'б', 'в', 'г', 'д', 'е',
              'ё', 'ж', 'з', 'и', 'й', 'к',
              'л', 'м', 'н', 'о', 'п', 'р',
              'с', 'т', 'у', 'ф', 'х', 'ц',
              'ч', 'ш', 'щ', 'ъ', 'ы', 'ь',
              'э', 'ю', 'я', 'a', 'b', 'c',
              'd', 'e', 'f', 'g', 'h', 'i',
              'j', 'k', 'l', 'm', 'n', 'o',
              'p', 'q', 'r', 's', 't', 'u',
              'v', 'w', 'x', 'y', 'z'];
}

function IsLetter(Symbol){
  for (let i = 0; i < Alphabet.length; ++i){
    if (Symbol == Alphabet[i]){
      return true;
    }
  }
  return false;
}

function ReadQuote(Quote){
  Reader.cancel();

  if (Language == "EN"){
    Reader.setVoice("Google US English");
  }
  else{
    Reader.setVoice("Google русский");
  }

  Reader.setVolume(1.0);
  Reader.speak(Quote);
}
