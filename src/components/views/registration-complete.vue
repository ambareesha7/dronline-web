<template>
    <div>
        <transition appear name="slide-right-to-left" mode="out-in">
            <registration-step-8/>
        </transition>
    </div>
  </template>
  
  <script>
  import RegistrationStep8 from '@/components/authorisation/registration/registration_step_8/registration-step-8';
  
  export default {
    name: 'Registration-complete',
  
    components: {
      RegistrationStep8
    }
  };
  </script>
  