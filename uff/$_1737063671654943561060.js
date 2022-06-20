(function(){{
    var docs = {};
    // construction functions
    docs.bignumber = __webpack_require__(192);
    docs['boolean'] = __webpack_require__(193);
    docs.complex = __webpack_require__(194);
    docs.createUnit = __webpack_require__(195);
    docs.fraction = __webpack_require__(196);
    docs.index = __webpack_require__(197);
    docs.matrix = __webpack_require__(198);
    docs.number = __webpack_require__(199);
    docs.sparse = __webpack_require__(200);
    docs.splitUnit = __webpack_require__(201);
    docs.string = __webpack_require__(202);
    docs.unit = __webpack_require__(203);
    // constants
    docs.e = __webpack_require__(100);
    docs.E = __webpack_require__(100);
    docs['false'] = __webpack_require__(204);
    docs.i = __webpack_require__(205);
    docs['Infinity'] = __webpack_require__(206);
    docs.LN2 = __webpack_require__(207);
    docs.LN10 = __webpack_require__(208);
    docs.LOG2E = __webpack_require__(209);
    docs.LOG10E = __webpack_require__(210);
    docs.NaN = __webpack_require__(211);
    docs['null'] = __webpack_require__(212);
    docs.pi = __webpack_require__(101);
    docs.PI = __webpack_require__(101);
    docs.phi = __webpack_require__(213);
    docs.SQRT1_2 = __webpack_require__(214);
    docs.SQRT2 = __webpack_require__(215);
    docs.tau = __webpack_require__(216);
    docs['true'] = __webpack_require__(217);
    docs.version = __webpack_require__(218);
    // physical constants
    // TODO: more detailed docs for physical constants
    docs.speedOfLight = {
        description: 'Speed of light in vacuum',
        examples: ['speedOfLight']
    };
    docs.gravitationConstant = {
        description: 'Newtonian constant of gravitation',
        examples: ['gravitationConstant']
    };
    docs.planckConstant = {
        description: 'Planck constant',
        examples: ['planckConstant']
    };
    docs.reducedPlanckConstant = {
        description: 'Reduced Planck constant',
        examples: ['reducedPlanckConstant']
    };
    docs.magneticConstant = {
        description: 'Magnetic constant (vacuum permeability)',
        examples: ['magneticConstant']
    };
    docs.electricConstant = {
        description: 'Electric constant (vacuum permeability)',
        examples: ['electricConstant']
    };
    docs.vacuumImpedance = {
        description: 'Characteristic impedance of vacuum',
        examples: ['vacuumImpedance']
    };
    docs.coulomb = {
        description: 'Coulomb\'s constant',
        examples: ['coulomb']
    };
    docs.elementaryCharge = {
        description: 'Elementary charge',
        examples: ['elementaryCharge']
    };
    docs.bohrMagneton = {
        description: 'Borh magneton',
        examples: ['bohrMagneton']
    };
    docs.conductanceQuantum = {
        description: 'Conductance quantum',
        examples: ['conductanceQuantum']
    };
    docs.inverseConductanceQuantum = {
        description: 'Inverse conductance quantum',
        examples: ['inverseConductanceQuantum']
    };
    //docs.josephson = {description: 'Josephson constant', examples: ['josephson']};
    docs.magneticFluxQuantum = {
        description: 'Magnetic flux quantum',
        examples: ['magneticFluxQuantum']
    };
    docs.nuclearMagneton = {
        description: 'Nuclear magneton',
        examples: ['nuclearMagneton']
    };
    docs.klitzing = {
        description: 'Von Klitzing constant',
        examples: ['klitzing']
    };
    docs.bohrRadius = {
        description: 'Borh radius',
        examples: ['bohrRadius']
    };
    docs.classicalElectronRadius = {
        description: 'Classical electron radius',
        examples: ['classicalElectronRadius']
    };
    docs.electronMass = {
        description: 'Electron mass',
        examples: ['electronMass']
    };
    docs.fermiCoupling = {
        description: 'Fermi coupling constant',
        examples: ['fermiCoupling']
    };
    docs.fineStructure = {
        description: 'Fine-structure constant',
        examples: ['fineStructure']
    };
    docs.hartreeEnergy = {
        description: 'Hartree energy',
        examples: ['hartreeEnergy']
    };
    docs.protonMass = {
        description: 'Proton mass',
        examples: ['protonMass']
    };
    docs.deuteronMass = {
        description: 'Deuteron Mass',
        examples: ['deuteronMass']
    };
    docs.neutronMass = {
        description: 'Neutron mass',
        examples: ['neutronMass']
    };
    docs.quantumOfCirculation = {
        description: 'Quantum of circulation',
        examples: ['quantumOfCirculation']
    };
    docs.rydberg = {
        description: 'Rydberg constant',
        examples: ['rydberg']
    };
    docs.thomsonCrossSection = {
        description: 'Thomson cross section',
        examples: ['thomsonCrossSection']
    };
    docs.weakMixingAngle = {
        description: 'Weak mixing angle',
        examples: ['weakMixingAngle']
    };
    docs.efimovFactor = {
        description: 'Efimov factor',
        examples: ['efimovFactor']
    };
    docs.atomicMass = {
        description: 'Atomic mass constant',
        examples: ['atomicMass']
    };
    docs.avogadro = {
        description: 'Avogadro\'s number',
        examples: ['avogadro']
    };
    docs.boltzmann = {
        description: 'Boltzmann constant',
        examples: ['boltzmann']
    };
    docs.faraday = {
        description: 'Faraday constant',
        examples: ['faraday']
    };
    docs.firstRadiation = {
        description: 'First radiation constant',
        examples: ['firstRadiation']
    };
    docs.loschmidt = {
        description: 'Loschmidt constant at T=273.15 K and p=101.325 kPa',
        examples: ['loschmidt']
    };
    docs.gasConstant = {
        description: 'Gas constant',
        examples: ['gasConstant']
    };
    docs.molarPlanckConstant = {
        description: 'Molar Planck constant',
        examples: ['molarPlanckConstant']
    };
    docs.molarVolume = {
        description: 'Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa',
        examples: ['molarVolume']
    };
    docs.sackurTetrode = {
        description: 'Sackur-Tetrode constant at T=1 K and p=101.325 kPa',
        examples: ['sackurTetrode']
    };
    docs.secondRadiation = {
        description: 'Second radiation constant',
        examples: ['secondRadiation']
    };
    docs.stefanBoltzmann = {
        description: 'Stefan-Boltzmann constant',
        examples: ['stefanBoltzmann']
    };
    docs.wienDisplacement = {
        description: 'Wien displacement law constant',
        examples: ['wienDisplacement']
    };
    //docs.spectralRadiance = {description: 'First radiation constant for spectral radiance', examples: ['spectralRadiance']};
    docs.molarMass = {
        description: 'Molar mass constant',
        examples: ['molarMass']
    };
    docs.molarMassC12 = {
        description: 'Molar mass constant of carbon-12',
        examples: ['molarMassC12']
    };
    docs.gravity = {
        description: 'Standard acceleration of gravity (standard acceleration of free-fall on Earth)',
        examples: ['gravity']
    };
    docs.planckLength = {
        description: 'Planck length',
        examples: ['planckLength']
    };
    docs.planckMass = {
        description: 'Planck mass',
        examples: ['planckMass']
    };
    docs.planckTime = {
        description: 'Planck time',
        examples: ['planckTime']
    };
    docs.planckCharge = {
        description: 'Planck charge',
        examples: ['planckCharge']
    };
    docs.planckTemperature = {
        description: 'Planck temperature',
        examples: ['planckTemperature']
    };
    // functions - algebra
    docs.derivative = __webpack_require__(219);
    docs.lsolve = __webpack_require__(220);
    docs.lup = __webpack_require__(221);
    docs.lusolve = __webpack_require__(222);
    docs.simplify = __webpack_require__(223);
    docs.slu = __webpack_require__(224);
    docs.usolve = __webpack_require__(225);
    docs.qr = __webpack_require__(226);
    // functions - arithmetic
    docs.abs = __webpack_require__(227);
    docs.add = __webpack_require__(228);
    docs.cbrt = __webpack_require__(229);
    docs.ceil = __webpack_require__(230);
    docs.cube = __webpack_require__(231);
    docs.divide = __webpack_require__(232);
    docs.dotDivide = __webpack_require__(233);
    docs.dotMultiply = __webpack_require__(234);
    docs.dotPow = __webpack_require__(235);
    docs.exp = __webpack_require__(236);
    docs.fix = __webpack_require__(237);
    docs.floor = __webpack_require__(238);
    docs.gcd = __webpack_require__(239);
    docs.hypot = __webpack_require__(240);
    docs.lcm = __webpack_require__(241);
    docs.log = __webpack_require__(242);
    docs.log10 = __webpack_require__(243);
    docs.mod = __webpack_require__(244);
    docs.multiply = __webpack_require__(245);
    docs.norm = __webpack_require__(246);
    docs.nthRoot = __webpack_require__(247);
    docs.pow = __webpack_require__(248);
    docs.round = __webpack_require__(249);
    docs.sign = __webpack_require__(250);
    docs.sqrt = __webpack_require__(251);
    docs.square = __webpack_require__(252);
    docs.subtract = __webpack_require__(253);
    docs.unaryMinus = __webpack_require__(254);
    docs.unaryPlus = __webpack_require__(255);
    docs.xgcd = __webpack_require__(256);
    // functions - bitwise
    docs.bitAnd = __webpack_require__(257);
    docs.bitNot = __webpack_require__(258);
    docs.bitOr = __webpack_require__(259);
    docs.bitXor = __webpack_require__(260);
    docs.leftShift = __webpack_require__(261);
    docs.rightArithShift = __webpack_require__(262);
    docs.rightLogShift = __webpack_require__(263);
    // functions - combinatorics
    docs.bellNumbers = __webpack_require__(264);
    docs.catalan = __webpack_require__(265);
    docs.composition = __webpack_require__(266);
    docs.stirlingS2 = __webpack_require__(267);
    // functions - core
    docs['config'] = __webpack_require__(268);
    docs['import'] = __webpack_require__(269);
    docs['typed'] = __webpack_require__(270);
    // functions - complex
    docs.arg = __webpack_require__(271);
    docs.conj = __webpack_require__(272);
    docs.re = __webpack_require__(273);
    docs.im = __webpack_require__(274);
    // functions - expression
    docs['eval'] = __webpack_require__(275);
    docs.help = __webpack_require__(276);
    // functions - geometry
    docs.distance = __webpack_require__(277);
    docs.intersect = __webpack_require__(278);
    // functions - logical
    docs['and'] = __webpack_require__(279);
    docs['not'] = __webpack_require__(280);
    docs['or'] = __webpack_require__(281);
    docs['xor'] = __webpack_require__(282);
    // functions - matrix
    docs['concat'] = __webpack_require__(283);
    docs.cross = __webpack_require__(284);
    docs.det = __webpack_require__(285);
    docs.diag = __webpack_require__(286);
    docs.dot = __webpack_require__(287);
    docs.eye = __webpack_require__(288);
    docs.filter = __webpack_require__(289);
    docs.flatten = __webpack_require__(290);
    docs.forEach = __webpack_require__(291);
    docs.inv = __webpack_require__(292);
    docs.kron = __webpack_require__(293);
    docs.map = __webpack_require__(294);
    docs.ones = __webpack_require__(295);
    docs.partitionSelect = __webpack_require__(296);
    docs.range = __webpack_require__(297);
    docs.resize = __webpack_require__(298);
    docs.reshape = __webpack_require__(299);
    docs.size = __webpack_require__(300);
    docs.sort = __webpack_require__(301);
    docs.squeeze = __webpack_require__(302);
    docs.subset = __webpack_require__(303);
    docs.trace = __webpack_require__(304);
    docs.transpose = __webpack_require__(305);
    docs.zeros = __webpack_require__(306);
    // functions - probability
    docs.combinations = __webpack_require__(307);
    //docs.distribution = require('./function/probability/distribution');
    docs.factorial = __webpack_require__(308);
    docs.gamma = __webpack_require__(309);
    docs.kldivergence = __webpack_require__(310);
    docs.multinomial = __webpack_require__(311);
    docs.permutations = __webpack_require__(312);
    docs.pickRandom = __webpack_require__(313);
    docs.random = __webpack_require__(314);
    docs.randomInt = __webpack_require__(315);
    // functions - relational
    docs.compare = __webpack_require__(316);
    docs.compareNatural = __webpack_require__(317);
    docs.deepEqual = __webpack_require__(318);
    docs['equal'] = __webpack_require__(319);
    docs.larger = __webpack_require__(320);
    docs.largerEq = __webpack_require__(321);
    docs.smaller = __webpack_require__(322);
    docs.smallerEq = __webpack_require__(323);
    docs.unequal = __webpack_require__(324);
    // functions - set
    docs.setCartesian = __webpack_require__(325);
    docs.setDifference = __webpack_require__(326);
    docs.setDistinct = __webpack_require__(327);
    docs.setIntersect = __webpack_require__(328);
    docs.setIsSubset = __webpack_require__(329);
    docs.setMultiplicity = __webpack_require__(330);
    docs.setPowerset = __webpack_require__(331);
    docs.setSize = __webpack_require__(332);
    docs.setSymDifference = __webpack_require__(333);
    docs.setUnion = __webpack_require__(334);
    // functions - special
    docs.erf = __webpack_require__(335);
    // functions - statistics
    docs.mad = __webpack_require__(336);
    docs.max = __webpack_require__(337);
    docs.mean = __webpack_require__(338);
    docs.median = __webpack_require__(339);
    docs.min = __webpack_require__(340);
    docs.mode = __webpack_require__(341);
    docs.prod = __webpack_require__(342);
    docs.quantileSeq = __webpack_require__(343);
    docs.std = __webpack_require__(344);
    docs.sum = __webpack_require__(345);
    docs['var'] = __webpack_require__(346);
    // functions - trigonometry
    docs.acos = __webpack_require__(347);
    docs.acosh = __webpack_require__(348);
    docs.acot = __webpack_require__(349);
    docs.acoth = __webpack_require__(350);
    docs.acsc = __webpack_require__(351);
    docs.acsch = __webpack_require__(352);
    docs.asec = __webpack_require__(353);
    docs.asech = __webpack_require__(354);
    docs.asin = __webpack_require__(355);
    docs.asinh = __webpack_require__(356);
    docs.atan = __webpack_require__(357);
    docs.atanh = __webpack_require__(358);
    docs.atan2 = __webpack_require__(359);
    docs.cos = __webpack_require__(360);
    docs.cosh = __webpack_require__(361);
    docs.cot = __webpack_require__(362);
    docs.coth = __webpack_require__(363);
    docs.csc = __webpack_require__(364);
    docs.csch = __webpack_require__(365);
    docs.sec = __webpack_require__(366);
    docs.sech = __webpack_require__(367);
    docs.sin = __webpack_require__(368);
    docs.sinh = __webpack_require__(369);
    docs.tan = __webpack_require__(370);
    docs.tanh = __webpack_require__(371);
    // functions - units
    docs.to = __webpack_require__(372);
    // functions - utils
    docs.clone = __webpack_require__(373);
    docs.format = __webpack_require__(374);
    docs.isNaN = __webpack_require__(375);
    docs.isInteger = __webpack_require__(376);
    docs.isNegative = __webpack_require__(377);
    docs.isNumeric = __webpack_require__(378);
    docs.isPositive = __webpack_require__(379);
    docs.isPrime = __webpack_require__(380);
    docs.isZero = __webpack_require__(381);
    // docs.print = require('./function/utils/print'); // TODO: add documentation for print as soon as the parser supports objects.
    docs['typeof'] = __webpack_require__(382);
    return docs;
}})();