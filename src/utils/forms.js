import Vue from 'vue';

export const parseFields = (fields = []) =>
  fields.map(field => {
    let result;
    switch (field.value) {
      case 'select':
        result = {
          label: field.label,
          value: (field.select.choice || {}).label,
          subform: parseFields((field.select.choice || {}).subform)
        };
        break;
      case 'multiselect':
        result = {
          label: field.label,
          value: (field.multiselect.choices || []).map(({ label }) => label).join('; ')
        };
        break;
      case 'string':
      case 'integer':
        result = {
          label: field.label,
          value: field[field.value].value
        };
        break;
      case 'month':
        result = {
          label: field.label,
          value: Vue.moment(field.month.value).format('MM-YYYY')
        };
        break;
      case 'form_fields_group':
        result = {
          label: field.label,
          value: parseFields(field.formFieldsGroup.form_fields)
        };
        break;
      default:
        break;
    }
    return result;
  });
