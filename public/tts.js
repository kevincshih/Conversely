function readme(txt, p) {
    var u = new SpeechSynthesisUtterance(txt);
    //var voices = window.speechSynthesis.getVoices();
    //u.voice = voices[v];
    u.pitch = p;
    speechSynthesis.speak(u);
    //play_sound("http://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURIComponent(txt) + "&tl=en&total=1&idx=0prev=input");
}