import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecogniationService {

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecognition = false;
  public convertedText = '';
  tempWord!: string;

  constructor() { }

  init() {
    this.recognition.interimResult = true;
    this.recognition.lang = 'en-us';

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript).join('');
      this.tempWord = transcript;
      this.convertedText =  this.tempWord;
    })
  }

  start() {
    this.convertedText = '';
    this.isStoppedSpeechRecognition = false;
    this.recognition.start();
  }

  stop() {
    this.isStoppedSpeechRecognition = true;
    this.convertedText = '';
    this.recognition.stop();

  }
}
