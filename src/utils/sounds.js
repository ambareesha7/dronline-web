const audios = {
  'queue-incoming': new Audio('/static/audios/queue-incoming.ogg'),
  'phone-calling': new Audio('/static/audios/phone-calling.mp3'),
  screenshot: new Audio('/static/audios/screenshot.ogg'),
  'call-initializing': new Audio('/static/audios/call-waiting.mp3')
};


export const playOnce = name => {
  const audio = audios[name];
  if (!audio) return;
  audio.play();
};

export const playLoop = name => {
  const audio = audios[name];
  if (!audio) return;
  audio.addEventListener('ended', () => audio.play());
  audio.play();
};

export const stopPlaying = name => {
  const audio = audios[name];
  if (!audio) return;
  if (audio.duration > 0 && !audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }
};
