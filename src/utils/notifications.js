export const ntfy = {
  init() {
    window.onload = () => {
      // check if the browser supports notifications
      if (!('Notification' in window)) {
        console.log('This browser does not support desktop notification');
      } else {
        Notification.requestPermission();
      }
    };
  },

  show(p) {
    if (!p) return;

    const params = typeof p === 'string' ? { body: p, i18n: true } : p;
    const options = {};

    options.icon = params.icon || '/static/favicon.png';
    options.body = (params.i18n ? decodeURIComponent(window.i18n.t(params.body)) : decodeURIComponent(params.body)) || '';
    params.title = params.title ? decodeURIComponent(params.title) : 'DrOnline';

    const notification = new Notification(params.title, options);
    setTimeout(notification.close.bind(notification), 5000);

    notification.onclick = event => {
      event.preventDefault(); // prevent the browser from focusing the Notification's tab

      try {
        window.focus();
        window.open(params.url || window.location.origin, '_blank');
        notification.close();
      } catch (ex) {
        window.open(params.url || window.location.origin, '_blank').close();
        window.focus();
      }
    };

    notification.onclose = () => {};

    notification.onshow = () => {};
  },

  send(params) {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      this.show(params);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          this.show(params);
        }
      });
    }
  }
};
