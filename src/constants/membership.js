export const MEMBERSHIP_PLANS = [
  {
    currency: '&dollar;',
    price: 0,
    name: 'membership.basic',
    features: [
      {
        label: 'membership.basic_feature_1',
        info: 'membership.basic_feature_1_info'
      },
      {
        label: 'membership.basic_feature_2'
      },
      {
        label: 'membership.basic_feature_3'
      },
      {
        label: 'membership.basic_feature_4',
        info: 'membership.basic_feature_4_info'
      }
    ]
  },
  {
    currency: '&dollar;',
    price: 200,
    name: 'membership.silver',
    features: [
      {
        label: 'membership.silver_feature_1',
        inherits: true
      },
      {
        label: 'membership.silver_feature_2'
      },
      {
        label: 'membership.silver_feature_3'
      }
    ]
  },
  {
    currency: '&dollar;',
    price: 400,
    name: 'membership.gold',
    features: [
      {
        label: 'membership.gold_feature_1',
        inherits: true
      },
      {
        label: 'membership.gold_feature_2'
      },
      {
        label: 'membership.gold_feature_3',
        info: 'membership.gold_feature_3_info'
      }
    ]
  },
  {
    currency: '&dollar;',
    price: 800,
    name: 'membership.platinum',
    features: [
      {
        label: 'membership.platinum_feature_1',
        inherits: true
      },
      {
        label: 'membership.platinum_feature_2'
      },
      {
        label: 'membership.platinum_feature_3',
        info: 'membership.platinum_feature_3_info'
      }
    ]
  }
];
