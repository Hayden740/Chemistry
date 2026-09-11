/* Equation bank for the Balancing lab.
   answer = lowest whole number coefficients, reactants then products.
   Every entry is checked by the tally code, so students can find any valid answer. */
window.EQUATIONS = {
  1: [
    { name: 'Making water', words: 'hydrogen + oxygen &rarr; water', reactants: ['H2', 'O2'], products: ['H2O'], answer: [2, 1, 2] },
    { name: 'Making table salt', words: 'sodium + chlorine &rarr; sodium chloride', reactants: ['Na', 'Cl2'], products: ['NaCl'], answer: [2, 1, 2] },
    { name: 'Burning magnesium', words: 'magnesium + oxygen &rarr; magnesium oxide', reactants: ['Mg', 'O2'], products: ['MgO'], answer: [2, 1, 2] },
    { name: 'Making ammonia', words: 'nitrogen + hydrogen &rarr; ammonia', reactants: ['N2', 'H2'], products: ['NH3'], answer: [1, 3, 2] },
    { name: 'Hydrogen meets chlorine', words: 'hydrogen + chlorine &rarr; hydrogen chloride', reactants: ['H2', 'Cl2'], products: ['HCl'], answer: [1, 1, 2] },
    { name: 'Potassium and bromine', words: 'potassium + bromine &rarr; potassium bromide', reactants: ['K', 'Br2'], products: ['KBr'], answer: [2, 1, 2] },
    { name: 'Burning calcium', words: 'calcium + oxygen &rarr; calcium oxide', reactants: ['Ca', 'O2'], products: ['CaO'], answer: [2, 1, 2] },
    { name: 'Peroxide breaking down', words: 'hydrogen peroxide &rarr; water + oxygen', reactants: ['H2O2'], products: ['H2O', 'O2'], answer: [2, 2, 1] },
    { name: 'Heating copper', words: 'copper + oxygen &rarr; copper oxide', reactants: ['Cu', 'O2'], products: ['CuO'], answer: [2, 1, 2] },
    { name: 'Zinc in acid', words: 'zinc + hydrochloric acid &rarr; zinc chloride + hydrogen', reactants: ['Zn', 'HCl'], products: ['ZnCl2', 'H2'], answer: [1, 2, 1, 1] },
    { name: 'Magnesium in acid', words: 'magnesium + hydrochloric acid &rarr; magnesium chloride + hydrogen', reactants: ['Mg', 'HCl'], products: ['MgCl2', 'H2'], answer: [1, 2, 1, 1] },
    { name: 'Check before you change', words: 'magnesium + sulfuric acid &rarr; magnesium sulfate + hydrogen', reactants: ['Mg', 'H2SO4'], products: ['MgSO4', 'H2'], answer: [1, 1, 1, 1] }
  ],
  2: [
    { name: 'Lithium in air', words: 'lithium + oxygen &rarr; lithium oxide', reactants: ['Li', 'O2'], products: ['Li2O'], answer: [4, 1, 2] },
    { name: 'Rusting', words: 'iron + oxygen &rarr; iron(III) oxide', reactants: ['Fe', 'O2'], products: ['Fe2O3'], answer: [4, 3, 2] },
    { name: 'Aluminium in air', words: 'aluminium + oxygen &rarr; aluminium oxide', reactants: ['Al', 'O2'], products: ['Al2O3'], answer: [4, 3, 2] },
    { name: 'Burning natural gas', words: 'methane + oxygen &rarr; carbon dioxide + water', reactants: ['CH4', 'O2'], products: ['CO2', 'H2O'], answer: [1, 2, 1, 2] },
    { name: 'Sodium in water', words: 'sodium + water &rarr; sodium hydroxide + hydrogen', reactants: ['Na', 'H2O'], products: ['NaOH', 'H2'], answer: [2, 2, 2, 1] },
    { name: 'Heating potassium chlorate', words: 'potassium chlorate &rarr; potassium chloride + oxygen', reactants: ['KClO3'], products: ['KCl', 'O2'], answer: [2, 2, 3] },
    { name: 'Marble in acid', words: 'calcium carbonate + hydrochloric acid &rarr; calcium chloride + water + carbon dioxide', reactants: ['CaCO3', 'HCl'], products: ['CaCl2', 'H2O', 'CO2'], answer: [1, 2, 1, 1, 1] },
    { name: 'Neutralising sulfuric acid', words: 'sodium hydroxide + sulfuric acid &rarr; sodium sulfate + water', reactants: ['NaOH', 'H2SO4'], products: ['Na2SO4', 'H2O'], answer: [2, 1, 1, 2] },
    { name: 'Aluminium and chlorine', words: 'aluminium + chlorine &rarr; aluminium chloride', reactants: ['Al', 'Cl2'], products: ['AlCl3'], answer: [2, 3, 2] },
    { name: 'Iron and chlorine', words: 'iron + chlorine &rarr; iron(III) chloride', reactants: ['Fe', 'Cl2'], products: ['FeCl3'], answer: [2, 3, 2] },
    { name: 'Limewater and acid', words: 'calcium hydroxide + hydrochloric acid &rarr; calcium chloride + water', reactants: ['Ca(OH)2', 'HCl'], products: ['CaCl2', 'H2O'], answer: [1, 2, 1, 2] },
    { name: 'Making carbon monoxide', words: 'carbon + oxygen &rarr; carbon monoxide', reactants: ['C', 'O2'], products: ['CO'], answer: [2, 1, 2] }
  ],
  3: [
    { name: 'Barbecue gas', words: 'propane + oxygen &rarr; carbon dioxide + water', reactants: ['C3H8', 'O2'], products: ['CO2', 'H2O'], answer: [1, 5, 3, 4] },
    { name: 'Burning ethane', words: 'ethane + oxygen &rarr; carbon dioxide + water', reactants: ['C2H6', 'O2'], products: ['CO2', 'H2O'], answer: [2, 7, 4, 6] },
    { name: 'Aluminium in acid', words: 'aluminium + hydrochloric acid &rarr; aluminium chloride + hydrogen', reactants: ['Al', 'HCl'], products: ['AlCl3', 'H2'], answer: [2, 6, 2, 3] },
    { name: 'Blast furnace', words: 'iron(III) oxide + carbon monoxide &rarr; iron + carbon dioxide', reactants: ['Fe2O3', 'CO'], products: ['Fe', 'CO2'], answer: [1, 3, 2, 3] },
    { name: 'Two sets of brackets', words: 'aluminium hydroxide + sulfuric acid &rarr; aluminium sulfate + water', reactants: ['Al(OH)3', 'H2SO4'], products: ['Al2(SO4)3', 'H2O'], answer: [2, 3, 1, 6] },
    { name: 'Respiration', words: 'glucose + oxygen &rarr; carbon dioxide + water', reactants: ['C6H12O6', 'O2'], products: ['CO2', 'H2O'], answer: [1, 6, 6, 6] },
    { name: 'Photosynthesis', words: 'carbon dioxide + water &rarr; glucose + oxygen', reactants: ['CO2', 'H2O'], products: ['C6H12O6', 'O2'], answer: [6, 6, 1, 6] },
    { name: 'Golden rain', words: 'lead nitrate + potassium iodide &rarr; lead iodide + potassium nitrate', reactants: ['Pb(NO3)2', 'KI'], products: ['PbI2', 'KNO3'], answer: [1, 2, 1, 2] },
    { name: 'Making nitric acid, step 1', words: 'ammonia + oxygen &rarr; nitrogen monoxide + water', reactants: ['NH3', 'O2'], products: ['NO', 'H2O'], answer: [4, 5, 4, 6] },
    { name: 'Lighter fuel', words: 'butane + oxygen &rarr; carbon dioxide + water', reactants: ['C4H10', 'O2'], products: ['CO2', 'H2O'], answer: [2, 13, 8, 10] },
    { name: 'Iron and steam', words: 'iron + water &rarr; iron oxide + hydrogen', reactants: ['Fe', 'H2O'], products: ['Fe3O4', 'H2'], answer: [3, 4, 1, 4] },
    { name: 'Burning ethanol', words: 'ethanol + oxygen &rarr; carbon dioxide + water', reactants: ['C2H5OH', 'O2'], products: ['CO2', 'H2O'], answer: [1, 3, 2, 3] }
  ]
};
