const categoryHelper = {
  assignSpecialities(categories) {
    const assigned = [];
    categories.forEach(category => {
      //Parent Categories
      if (!category.parentCategoryId) assigned.push({...category, specialities: []});
    });
    categories.forEach(category => {
      if (category.parentCategoryId) {
        //Sub Categories
        assigned.forEach((v, i) => {
          if(v.id === category.parentCategoryId) {
            v.specialities.push(category)
          }
        })
        // assigned.find(v => v.id === category.parentCategoryId).specialities.push(category);
      }
    });
    return assigned;

  },
  assignCategories(options, selected) {
    
    const assigned = [];
    selected.forEach(v => {
      if (v.parentCategoryId) {
        let category = options.find(o => o.id === v.parentCategoryId)
        
        if(category) {
          assigned.push({
            category: options.find(o => o.id === v.parentCategoryId),
            speciality: v
          });
        }

      } else {
        assigned.push({category: v});
      }
    });

    return assigned;
  },
  extractCategories(categories) {
    return categories.map(v => (
      v.speciality && v.speciality.parentCategoryId ? v.speciality : v.category
    ));
  },
  findSpeciality(medicalCategories, id) {
    let speciality;
    medicalCategories.forEach(c => {
      if (Number(c.id) === Number(id)) speciality = c;
      c.specialities.forEach(s => {
        if (Number(s.id) === Number(id)) {
          speciality = {
            ...s,
            parentCategoryName: c.name
          };
        }
      });
    });
    return speciality;
  }
};

export default categoryHelper;
