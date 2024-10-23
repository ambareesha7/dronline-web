export const getIndexByParam = (arr, attr, value) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][attr] === value) {
      return i;
    }
  }
  return -1;
};

export const scrollDown = (el, duration) => {
  const diff = el.scrollHeight - el.scrollTop;
  const scrollStep = duration ? (diff / (duration / 15)) : diff;
  const scrollInterval = setInterval(() => {
    if (
      el.scrollHeight !== el.clientHeight &&
      (el.scrollHeight - el.clientHeight) > el.scrollTop
    ) {
      el.scrollTop += scrollStep;
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
};

export function throttle(callback, limit) {
  let wait = false;
  return function wrapper() {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

export function checkUserMedia() {
  return new Promise(resolve => navigator
    .mediaDevices
    .getUserMedia({ audio: false, video: true })
    .then(stream => {
      stream.getVideoTracks()[0].stop();
      stream.removeTrack(stream.getVideoTracks()[0]);
      resolve(true);
    })
    .catch(error => {
      console.log(
        `%c${error.name}: ${error.message} (Get user media)`,
        'color: #ed2939; background: #222; padding: 3px;'
      );
      resolve(false);
    })
  );
}

export function getBrowserVersion() {
  let ua = navigator.userAgent;
  let v;

  let x = ua.indexOf('MSIE');
  let y = 4;
  if (x === -1) {
    x = ua.indexOf('Firefox');
    y = 7;
    if (x === -1) {
      if (x === -1) {
        x = ua.indexOf('Chrome');
        y = 6;
        if (x === -1) {
          x = ua.indexOf('Opera');
          y = 5;
          if (x === -1) {
            x = ua.indexOf('Safari');
            if (x !== -1) {
              x = ua.indexOf('Version');
              y = 7;
            }
          }
        }
      }
    }
  }

  if (x !== -1) {
    y++;
    ua = ua.substring(x + y);
    x = ua.indexOf(' ');
    let x2 = ua.indexOf('(');
    if (x2 > 0 && x2 < x) x = x2;
    x2 = ua.indexOf(';');
    if (x2 > 0 && x2 < x) x = x2;
    v = ua.substring(0, x);
  }

  return Number(v);
}

export const extractCountryFromPhoneNumber = value => {
  const countries = [
    { iso2_code: 'ae', dial_code: '971' },
    { iso2_code: 'us', dial_code: '1' },
    { iso2_code: 'pl', dial_code: '48' },
    { iso2_code: 'ua', dial_code: '38' }
  ];

  if (!value || value === '') return countries[0];
  let result;
  countries.forEach(country => {
    const p = new RegExp(`^[+]${country.dial_code}`);
    if (p.test(value)) result = country;
  });
  return result;
};

export const delayedCalls = async (method, delays) => {
  const delayed = t => new Promise(resolve => {
    setTimeout(() => {
      method.call();
      resolve();
    }, t);
  });
  if (!delays || !delays.length) {
    method.call();
  } else {
    delays.reduce(async (promise, delay, index) => {
      await promise;
      await delayed(delay);
    }, Promise.resolve());
  }
};

export const generateUuid = (number = Math.random()) => {
  const _p8 = s => {
    const p = `${number.toString(16)}000000000`.substr(2, 8);
    return s ? `-${p.substr(0, 4)}-${p.substr(4, 4)}` : p;
  };
  return _p8() + _p8(true) + _p8(true) + _p8();
};

export const getMouseDirection = (el, mouseX, mouseY) => {
  const rect = el ? el.getBoundingClientRect() : null;
  const [width, height] = rect ? [rect.width, rect.height] : [0, 0];
  const x = rect ? rect.x + (width / 2) : 0;
  const y = rect ? rect.y + (height / 2) : 0;
  const a = (Math.atan2(y - mouseY, x - mouseX) * (180 / Math.PI)) + 180;
  const A = 180 - (2 * ((Math.atan(width / height) / Math.PI) * 180));
  const B = 180 - (2 * ((Math.atan(height / width) / Math.PI) * 180));
  let direction;
  switch (true) {
    case (a >= (360 - (A / 2))) || (a < (A / 2)):
      direction = 'right';
      break;
    case (a >= (A / 2)) && (a < ((A / 2) + B)):
      direction = 'bottom';
      break;
    case (a >= ((A / 2) + B)) && (a < ((A + B) + (A / 2))):
      direction = 'left';
      break;
    default:
      direction = 'top';
      break;
  }
  return direction;
};
