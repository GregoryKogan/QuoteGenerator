# QuoteGenerator

This program generates unlimited stupid random quotes.
It uses Markov chains, it is quite basic algorithm, you can read wekipedia article about it, but basically,
it learns wich words come more often after each other word. It learns that probabilities from database and
than it can produce new text, made from pieces of original material, using learned statistical data.
In my case it learns wich word most often comes after each pair of words, it makes algorithm produce less
absurd nonsense.
It also can read generated quotes with a commonly used TTS system.
Algorithm itself is very useful, but this exact project does not has any serious value in it. It's just fun to
read stupid random generated quotes (At least for me)

Database for Russian language was manually created by me, and I'm pretty happy with the result, but English database is not
so great. I would love to recieve any pull requests our any other type of message with better database for English language.

You can try this out here: https://gregorykogan.github.io/QuoteGenerator/
