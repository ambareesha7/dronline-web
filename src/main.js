import Vue from 'vue';
import cookie from 'vue-cookie';
import * as VueGoogleMaps from 'vue2-google-maps';
import VeeValidate from 'vee-validate';
import PhoneNumber from 'awesome-phonenumber';
import VueMoment from 'vue-moment';
import InfiniteLoading from 'vue-infinite-loading';
import { directive as onClickOutside } from 'vue-on-click-outside';
import vmodal from 'vue-js-modal';
import VueProgressBar from 'vue-progressbar';
import Multiselect from 'vue-multiselect';
import Toastr from 'vue-toastr';
import VueScrollStop from 'vue-scroll-stop';
import VueI18n from 'vue-i18n';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import Tooltip from 'vue-directive-tooltip';
import VueVideoPlayer from 'vue-video-player';
import Sticky from 'vue-sticky-directive';
import App from './App';
import Spinner from './components/global/spinner/spinner';
import Btn from './components/global/btn/btn';
import focus from './directives/focus.directive';
import forceCapitailize from './directives/force-capitalize.directive';
import router from './router';
import store from './store';
import setupInterceptors from './utils/interceptors';
import { ntfy } from './utils/notifications';
import { phoneNumber, minAge } from './utils/validation-rules';

VeeValidate.Validator.extend('phoneNumber', phoneNumber(PhoneNumber));
VeeValidate.Validator.extend('minAge', minAge());

Vue.config.devtools = false;
Vue.config.productionTip = false;
Vue.use(cookie);
Vue.use(VueGoogleMaps, {
  load: {
    libraries: 'places',
    key: 'AIzaSyCMukeys0-Pyvv5bf5VDTQuYTUzPCC93CU',
    language: 'en'
  }
});
Vue.use(VeeValidate);
Vue.use(VueMoment);
Vue.use(VueProgressBar, {
  color: '#57A9F9',
  failedColor: '#dd475a',
  thickness: '3px',
  transition: {
    speed: '2.2s',
    opacity: '0.2s',
    termination: 2200
  },
  autoRevert: true,
  location: 'top',
  inverse: false
});
Vue.use(Toastr);
Vue.use(VueScrollStop);
Vue.use(vmodal, { dynamic: true });
Vue.use(VueI18n);
Vue.use(Tooltip);
Vue.use(VueVideoPlayer);
Vue.use(Sticky);
Vue.component('multiselect', Multiselect);
Vue.component('infinite-loading', InfiniteLoading);
Vue.component('spinner', Spinner);
Vue.component('btn', Btn);
Vue.directive('on-click-outside', onClickOutside);
Vue.directive('focus', focus);
Vue.directive('force-capitailize', forceCapitailize);
setupInterceptors();
ntfy.init();

const locale = localStorage.getItem('lang') || 'en';
const messages = {};
messages[locale] = require(`./lang/${locale}.json`);
window.i18n = new VueI18n({
  locale,
  messages
});

if(window.location.hostname != 'localhost') {
  Raven.config('https://80828bada8f14dd89da0eb9aaae6f403@sentry.appunite.com/44').addPlugin(RavenVue, Vue).install();
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n: window.i18n,
  store,
  components: { App },
  template: '<App/>'
});
