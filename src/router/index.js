import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import constPaths from '@/constants/constant-paths';

const featureFlagsPanelPath = `${constPaths.API_URL}/feature-flags`;

Vue.use(Router);

function load(component) {
  /* eslint-disable no-undef */
  return () => System.import(`@/${component}.vue`);
}

function scrollBehavior(to, from, savedPosition) {
  if (to.hash && document.querySelector(to.hash)) {
    return { selector: to.hash };
  }
  if (savedPosition) {
    return savedPosition;
  }
  return { x: 0, y: 0 };
}

const router = new Router({
  root: '/',
  mode: 'history',
  routes: [
    {
      path: '/call-invitation/:invitation_id',
      name: 'familyMemberCall',
      component: load('components/views/family-member-call'),
      children: []
    },
    {
      path: '/password_recovery/:password_recovery_token?',
      name: 'password-recovery',
      component: load('components/views/password-recovery'),
      meta: {
        scope: 'anonymous',
        title: 'Password recovery',
        appearance: 'fade',
        disable_navbar: true
      }
    },
    {
      path: '/registration-complete',
      name: 'registration-complete',
      component: load('components/views/registration-complete'),
      meta: {
        scope: 'authorized',
        title: 'Registration',
        appearance: 'slide-top-to-bottom'
      }
    },
    {
      path: '/',
      component: load('components/views/main'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: load('components/views/dashboard'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'dispatch/:id',
          name: 'dispatch-details',
          component: load('components/views/dispatch-details'),
          meta: {
            scope: 'authorized',
            title: 'Dispatch',
            appearance: 'slide-right-to-left',
            related: 'dashboard',
            roles: ['gp']
          }
        },
        {
          path: 'ended_dispatches',
          name: 'ended-dispatches',
          component: load('components/views/ended-dispatches'),
          meta: {
            scope: 'authorized',
            title: 'Ended Dispatches',
            appearance: 'slide-right-to-left',
            related: 'dashboard',
            roles: ['gp']
          }
        },
        {
          path: 'sign_in',
          name: 'sign-in',
          component: load('components/views/sign-in'),
          meta: {
            scope: 'anonymous',
            title: 'Sign In',
            appearance: 'fade',
            disable_navbar: true
          }
        },
        {
          path: 'sign_up_type',
          name: 'sign-up-type',
          component: load('components/views/sign-up-type-selection'),
          meta: {
            scope: 'anonymous',
            title: 'Sign Up',
            appearance: 'fade',
            disable_navbar: true
          }
        },
        {
          path: 'sign_up',
          name: 'sign-up',
          component: load('components/views/sign-up'),
          meta: {
            scope: 'anonymous',
            title: 'Sign Up',
            appearance: 'fade',
            disable_navbar: true
          }
        },
        {
          path: 'registration',
          name: 'registration',
          component: load('components/views/registration'),
          meta: {
            scope: 'authorized',
            title: 'Registration',
            appearance: 'slide-top-to-bottom'
          }
        },
        {
          path: 'verify/:specialist_type/:verification_token',
          name: 'sign-up-verification',
          component: load('components/views/sign-up-verification'),
          meta: {
            scope: 'anonymous',
            title: 'Verify',
            appearance: 'slide-top-to-bottom'
          }
        },
        {
          path: 'privacy_policy',
          name: 'privacy-policy',
          component: load('components/views/privacy-policy'),
          meta: {
            title: 'Privacy Policy',
            appearance: 'slide-top-to-bottom'
          }
        },
        {
          path: 'terms_and_conditions',
          name: 'terms-and-conditions',
          component: load('components/views/terms-and-conditions'),
          meta: {
            title: 'Terms & Conditions',
            appearance: 'slide-top-to-bottom'
          }
        },
        {
          path: 'availability',
          name: 'availability',
          component: load('components/views/availability'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left',
            roles: ['external']
          }
        },
        {
          path: 'specialists',
          name: 'specialists',
          component: load('components/views/specialists'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left',
            roles: ['gp']
          }
        },
        {
          path: 'nurses',
          name: 'nurses',
          component: load('components/views/nurses'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left',
            roles: ['gp']
          }
        },
        {
          path: 'visits',
          name: 'visits',
          component: load('components/views/visits'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left',
            roles: ['gp', 'external']
          }
        },
        {
          path: 'emr',
          name: 'emr',
          component: load('components/views/emr'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'team',
          name: 'team',
          component: load('components/views/team-panel'),
          meta: {
            title: 'Your team',
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'team-invitations',
          name: 'team-invitations',
          component: load('components/views/team-invitations'),
          meta: {
            title: 'Team invitations',
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'us-board-second-opinion',
          name: 'us-board-second-opinion',
          component: load('components/views/us-board-second-opinion'),
          meta: {
            title: 'U.S Board Second Opinion',
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'create-team',
          name: 'create-team',
          component: load('components/views/create-team-panel'),
          meta: {
            title: 'Create a new team',
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'medications',
          name: 'medications',
          component: load('components/views/medications')
        },
        {
          path: 'procedures',
          name: 'procedures',
          component: load('components/views/procedures')
        },
        {
          path: 'tests',
          name: 'tests',
          component: load('components/views/tests')
        },
        {
          path: 'patients/add',
          name: 'patient-add',
          component: load('components/views/patient-add'),
          meta: {
            related: 'emr',
            scope: 'authorized',
            appearance: 'slide-right-to-left',
            disable_sidebar: true,
            disable_navbar: true,
            disable_footer: true
          }
        },
        {
          path: 'patients/:id',
          name: 'patient',
          component: load('components/views/patient'),
          meta: {
            related: 'emr',
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'patients/:id/onboarding',
          name: 'patient-onboarding',
          component: load('components/views/patient-onboarding'),
          meta: {
            related: 'emr',
            scope: 'authorized',
            appearance: 'slide-right-to-left',
            disable_sidebar: true,
            disable_navbar: true,
            disable_footer: true
          }
        },
        {
          path: 'patients/:patientId/records/:id',
          name: 'patient-record',
          component: load('components/views/patient-record'),
          meta: {
            related: 'emr',
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'profile',
          name: 'profile',
          component: load('components/views/profile'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'profile/edit',
          name: 'profile-edit',
          component: load('components/views/profile-edit'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'change_password/:confirmation_token?',
          name: 'change-password',
          component: load('components/views/change-password'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'change_password_confirmation',
          name: 'change-password-confirmation',
          component: load('components/views/change-password-confirmation'),
          meta: {
            scope: 'anonymous',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'membership',
          name: 'membership',
          component: load('components/views/membership'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left',
            roles: ['external']
          }
        },
        {
          path: 'membership/verify/:orderId',
          name: 'membership-verify',
          redirect: to => {
            const name = localStorage.getItem('payment_requester') || 'membership';
            localStorage.removeItem('payment_requester');
            return { name, query: { orderId: to.params.orderId } };
          }
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: load('components/views/notifications'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        },
        {
          path: 'demo-payments',
          name: 'demo-payments',
          component: load('components/views/demo-payments'),
          meta: {
            title: 'Demo Payments',
            appearance: 'slide-right-to-left',
            disable_sidebar: true,
            disable_navbar: true,
            disable_footer: true
          }
        },
        {
          path: 'payouts',
          name: 'payouts',
          component: load('components/views/payouts'),
          meta: {
            scope: 'authorized',
            appearance: 'slide-right-to-left'
          }
        }
      ]
    },
    {
      path: '/webview',
      component: load('components/views/abstract'),
      children: [
        {
          path: 'guide/:guide_name?',
          name: 'webview-guide',
          component: load('components/views/guide')
        },
        {
          path: 'privacy_policy',
          name: 'webview-privacy-policy',
          component: load('components/views/privacy-policy')
        },
        {
          path: 'terms_and_conditions',
          name: 'webview-terms-and-conditions',
          component: load('components/views/terms-and-conditions')
        }
      ]
    },
    {path: '*', redirect: '/'}
  ],
  scrollBehavior
});

router.beforeEach((to, from, next) => {
  if (from.name) {
    Vue.prototype.$Progress.finish();
    Vue.prototype.$Progress.start();
  }
  // Check route require authorize
  const isLogged = store.getters['oauth/authorized'];
  const role = store.getters['profile/role'];
  const allowedViews = store.getters['profile/allowedViews'];
  const teamAdmin = store.getters['team/isAdmin'];
  const scope = to.meta.scope;
  const log_style = 'background: #222; padding: 3px;';
  const log_style1 = `${log_style} color: #bada55;`;
  const log_style2 = `${log_style} color: #fada5e;`;
  console.log(
    `%cTransition from:%c ${from.name}%c to:%c ${to.name}`,
    log_style1,
    log_style2,
    log_style1,
    log_style2
  );

  switch (true) {
    case (from.name === 'familyMemberCall'):
      next();
      break;
    case (role && to.meta.roles && !to.meta.roles.includes(role) && !teamAdmin):
      next({ name: 'dashboard' });
      break;
    case (scope === 'authorized' && !isLogged):
      next({ name: 'sign-in' });
      break;
    case (scope === 'anonymous' && isLogged):
      next({ name: 'dashboard' });
      break;
    case (
      allowedViews &&
      allowedViews.length &&
      !allowedViews.find(({ state }) => state.name === to.name)
    ):
      next({ ...allowedViews[0].state });
      Vue.prototype.$toastr.w(allowedViews[0].message);
      break;
    default:
      next();
      break;
  }
});
router.afterEach((to, from) => {
  Vue.prototype.$Progress.finish();
  document.title = to.meta.title ? `${to.meta.title} | DrOnline` : 'DrOnline';
});

export default router;
