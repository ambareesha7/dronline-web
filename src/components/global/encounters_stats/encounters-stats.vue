<template>
  <div :class="`EncountersStats EncountersStats--${size}`">
    <div class="EncountersStats__item">
      <div class="EncountersStats__item__value">{{ stats.scheduled }}</div>
      <div class="EncountersStats__item__label EncountersStats__item__label--scheduled">
        {{ isSmall ?
          $t('encounters_stats.scheduled') :
          $t('encounters_stats.scheduled_encounters')
        }}
      </div>
    </div>
    <div class="EncountersStats__item">
      <div class="EncountersStats__item__value">{{ stats.completed }}</div>
      <div class="EncountersStats__item__label EncountersStats__item__label--completed">
        {{ isSmall ?
          $t('encounters_stats.completed') :
          $t('encounters_stats.completed_encounters')
        }}
      </div>
    </div>
    <div class="EncountersStats__item">
      <div class="EncountersStats__item__value">{{ stats.canceled }}</div>
      <div class="EncountersStats__item__label EncountersStats__item__label--canceled">
        {{ isSmall ?
          $t('encounters_stats.canceled') :
          $t('encounters_stats.canceled_encounters')
        }}
      </div>
    </div>
    <div class="EncountersStats__item">
      <div class="EncountersStats__item__value">{{ stats.pending }}</div>
      <div class="EncountersStats__item__label EncountersStats__item__label--pending">
        {{ isSmall ?
          $t('encounters_stats.pending') :
          $t('encounters_stats.pending_encounters')
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EncountersStats',
  props: {
    stats: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: 'large'
    }
  },
  computed: {
    isSmall() {
      return this.size === 'small';
    }
  }
};
</script>

<style lang="scss">
.EncountersStats {
  display: flex;

  &__item {
    display: flex;
    flex-direction: column;

    &__value {
      display: block;
    }
    &__label {
      &--completed {
        color: rgb(29, 198, 127);
      }
      &--pending {
        color: rgb(68, 150, 233);
      }
      &--scheduled {
        color: rgb(255, 178, 68);
      }
      &--canceled {
        color: rgb(253, 108, 108);
      }
    }
  }
}
.EncountersStats {
  &--large {
      .EncountersStats__item {
        width: 215px;
        &__label {
          order: 2;
        }
        &__value {
          order: 1;
          margin: 5px 0;
          font-size: 24px;
          line-height: 32px;
          color: #292929;
        }
      }
  }
  &--small {
    .EncountersStats__item {
      margin-left: 31px;
      &__label {
        order: 1;
        font-size: 13px;
        font-weight: 500;
      }
      &__value {
        order: 2;
        font-size: 15px;
        line-height: 22px;
        color: #292929;;
      }
    }
  }
}
</style>
