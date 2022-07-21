const dummyCategories =  [
  { id: 2, name: 'Women', parentId: null, children: []},
    { id: 6, name: 'Jeans', parentId: 2, children: []},
      { id: 16, name: 'skirt', parentId: 6, children: []},
      { id: 17, name: 'pants', parentId: 6, children: []},
        { id: 19, name: 'skinny', parentId: 17, children: []},
        { id: 20, name: 'Mom', parentId: 17, children: []},
        { id: 21, name: 'boyfriend', parentId: 17, children: []},
          { id: 22, name: 'boyfriend', parentId: 21, children: []},
          { id: 23, name: 'boyfriend', parentId: 21, children: []},
    { id: 7, name: 'Collections', parentId: 2, children: []},
    { id: 8, name: 'Accessories', parentId: 2, children: []},
    { id: 9, name: 'Clothes', parentId: 2, children: []},
  { id: 3, name: 'Men', parentId: null, children: []},
    { id: 10, name: 'Jeans', parentId: 3, children: []},
      { id: 18, name: 'pants', parentId: 10, children: []}, 
    { id: 11, name: 'Collections', parentId: 3, children: []},
    { id: 12, name: 'Accessories', parentId: 3, children: []},
  { id: 4, name: 'Children', parentId: null, children: []},
    { id: 13, name: 'Clothes', parentId: 4, children: []},
    { id: 14, name: 'Collections', parentId: 4, children: []},  
    { id: 15, name: 'Clothes', parentId: 4, children: []},
]
for (let i = 0; i < dummyCategories.length; i++) {
  for (let j = 0; j < dummyCategories.length; j++) {
    if (dummyCategories[i].id === dummyCategories[j].parentId)
      dummyCategories[i].children.push(j);
  }
}

export default dummyCategories