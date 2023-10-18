(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("@alfredo-taboada/stress", [], factory);
	else if(typeof exports === 'object')
		exports["@alfredo-taboada/stress"] = factory();
	else
		root["@alfredo-taboada/stress"] = factory();
})((typeof self !== 'undefined' ? self : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/InverseMethod.ts":
/*!******************************!*\
  !*** ./lib/InverseMethod.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InverseMethod": () => (/* binding */ InverseMethod),
/* harmony export */   "cloneMisfitCriteriunSolution": () => (/* binding */ cloneMisfitCriteriunSolution),
/* harmony export */   "createDefaultSolution": () => (/* binding */ createDefaultSolution)
/* harmony export */ });
/* harmony import */ var _types_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/math */ "./lib/types/math.ts");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search */ "./lib/search/index.ts");


/**
 * @category Inversion
 */
function cloneMisfitCriteriunSolution(misfitCriteriunSolution) {
    return {
        // criterion: misfitCriteriunSolution.criterion,
        misfit: misfitCriteriunSolution.misfit,
        rotationMatrixW: (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.cloneMatrix3x3)(misfitCriteriunSolution.rotationMatrixW),
        rotationMatrixD: (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.cloneMatrix3x3)(misfitCriteriunSolution.rotationMatrixD),
        stressRatio: misfitCriteriunSolution.stressRatio,
        stressTensorSolution: misfitCriteriunSolution.stressTensorSolution
    };
}
/**
 * @category Inversion
 */
function createDefaultSolution() {
    return {
        misfit: Number.POSITIVE_INFINITY,
        rotationMatrixW: (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)(),
        rotationMatrixD: (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)(),
        stressRatio: 0,
        stressTensorSolution: (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3Identity)()
    };
}
/**
 * @category Inversion
 */
class InverseMethod {
    constructor() {
        this.misfitCriteriunSolution = {
            misfit: Number.POSITIVE_INFINITY,
            rotationMatrixW: (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3Identity)(),
            rotationMatrixD: (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3Identity)(),
            stressRatio: 0,
            stressTensorSolution: (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3Identity)()
        };
        this.searchMethod = new _search__WEBPACK_IMPORTED_MODULE_1__.MonteCarlo();
        this.data_ = [];
    }
    get data() {
        return this.data_;
    }
    setSearchMethod(search) {
        this.searchMethod = search;
    }
    addData(data) {
        if (Array.isArray(data)) {
            data.forEach(d => this.data_.push(d));
        }
        else {
            this.data_.push(data);
        }
    }
    run(reset = true) {
        if (this.data_.length === 0) {
            throw new Error('No data provided');
        }
        if (reset) {
            this.misfitCriteriunSolution.misfit = Number.POSITIVE_INFINITY;
        }
        return this.searchMethod.run(this.data_, this.misfitCriteriunSolution);
    }
    cost({ displ, strain, stress }) {
        if (this.data_.length === 0) {
            throw new Error('No data provided');
        }
        return this.data_.reduce((cumul, data) => cumul + data.cost({ displ, strain, stress }), 0) / this.data_.length;
    }
}


/***/ }),

/***/ "./lib/analysis/Curve3D.ts":
/*!*********************************!*\
  !*** ./lib/analysis/Curve3D.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Curve3D": () => (/* binding */ Curve3D)
/* harmony export */ });
class Curve3D {
    constructor() {
        this.points = [];
    }
    addPoint(x, y, z = 0) {
        if (typeof x === 'number') {
            this.points.push(x, y, z);
        }
        else {
            this.points.push(x[0], x[1], x[2]);
        }
    }
    clear() {
        this.points = [];
    }
    get buffer() {
        let s = `GOCAD PLine 1.0
        HEADER {
            name: curve3d
        }
        PROPERTIES rake
        `;
        const nbPoints = this.points.length / 3;
        let index = 0;
        for (let i = 0; i < this.points.length; i += 3) {
            const attr = 0;
            s += 'PVRTX ' + index + ' ' + this.points[i] + ' ' + this.points[i + 1] + ' ' + this.points[i + 2] + ' ' + attr + '\n';
            index++;
        }
        for (let i = 0; i < nbPoints - 1; ++i) {
            s += 'SEG ' + i + ' ' + (i + 1) + '\n';
        }
        s += 'END';
        return s;
    }
}


/***/ }),

/***/ "./lib/analysis/Domain.ts":
/*!********************************!*\
  !*** ./lib/analysis/Domain.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasOwn": () => (/* binding */ hasOwn)
/* harmony export */ });
/**
 * @category Utils
 */
function hasOwn(instance, variable) {
    const myVar = variable;
    return myVar !== undefined;
}


/***/ }),

/***/ "./lib/analysis/Domain2D.ts":
/*!**********************************!*\
  !*** ./lib/analysis/Domain2D.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Domain2D": () => (/* binding */ Domain2D),
/* harmony export */   "getDomain2D": () => (/* binding */ getDomain2D)
/* harmony export */ });
/* harmony import */ var _Domain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Domain */ "./lib/analysis/Domain.ts");

/**
 * @example
 * ```ts
 * const ps = new FullParameterSpace()
 *
 * const x = {
 *      bounds: [0, 0.5],
 *      name: 'R',
 *      n: 50
 * }
 *
 * const y = {
 *      bounds: [0, 180],
 *      name: 'theta',
 *      n: 50
 * }
 * const d = new Domain2D(ps, x, y)
 * const data = d.run()
 * ```
 * @category Domain
 */
class Domain2D {
    constructor(space, x, y) {
        this.x = undefined;
        this.y = undefined;
        this.space = undefined;
        if ((0,_Domain__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(space, x.name) === false) {
            throw new Error(`Variable x ${x.name} is not part of object ${space}`);
        }
        if ((0,_Domain__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(space, y.name) === false) {
            throw new Error(`Variable y ${y.name} is not part of object ${space}`);
        }
        this.space = space;
        this.x = x;
        this.y = y;
    }
    run() {
        const nx = this.x.n;
        const ny = this.y.n;
        const data = new Array(nx * ny).fill(0);
        let index = 0;
        for (let i = 0; i < nx; ++i) {
            this.space[this.x.name] = this.x.bounds.min + (this.x.bounds.max - this.x.bounds.min) / (nx - 1); // setter
            for (let j = 0; j < ny; ++j) {
                this.space[this.y.name] = this.y.bounds.min + (this.y.bounds.max - this.y.bounds.min) / (ny - 1); // setter
                data[index++] = this.space.cost();
            }
        }
        return data;
    }
}
/**
 * @example
 * ```ts
 * const ps = new FullParameterSpace()
 *
 * const x = {
 *      bounds: [0, 0.5],
 *      name: 'R',
 *      n: 50
 * }
 *
 * const y = {
 *      bounds: [0, 180],
 *      name: 'theta',
 *      n: 50
 * }
 *
 * const data = getDomain(ps, x, y)
 * ```
 * @category Domain
 */
function getDomain2D(space, x, y) {
    const d = new Domain2D(space, x, y);
    return d.run();
}


/***/ }),

/***/ "./lib/analysis/Domain3D.ts":
/*!**********************************!*\
  !*** ./lib/analysis/Domain3D.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Domain3D": () => (/* binding */ Domain3D),
/* harmony export */   "getDomain3D": () => (/* binding */ getDomain3D)
/* harmony export */ });
/* harmony import */ var _Domain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Domain */ "./lib/analysis/Domain.ts");

/**
 * @category Domain
 */
class Domain3D {
    constructor(space, x, y, z) {
        this.x = undefined;
        this.y = undefined;
        this.z = undefined;
        this.space = undefined;
        if ((0,_Domain__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(space, x.name) === false) {
            throw new Error(`Variable x ${x.name} is not part of object ${space}`);
        }
        if ((0,_Domain__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(space, y.name) === false) {
            throw new Error(`Variable y ${y.name} is not part of object ${space}`);
        }
        if ((0,_Domain__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(space, z.name) === false) {
            throw new Error(`Variable z ${z.name} is not part of object ${space}`);
        }
        this.space = space;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    run() {
        const nx = this.x.n;
        const ny = this.y.n;
        const nz = this.z.n;
        const data = new Array(nx * ny * nz).fill(0);
        let index = 0;
        for (let i = 0; i < nx; ++i) {
            this.space[this.x.name] = this.x.bounds.min + (this.x.bounds.max - this.x.bounds.min) / (nx - 1); // setter
            for (let j = 0; j < ny; ++j) {
                this.space[this.y.name] = this.y.bounds.min + (this.y.bounds.max - this.y.bounds.min) / (ny - 1); // setter
                for (let k = 0; k < nz; ++k) {
                    this.space[this.z.name] = this.z.bounds.min + (this.z.bounds.max - this.z.bounds.min) / (nz - 1); // setter
                    data[index++] = this.space.cost();
                }
            }
        }
        return data;
    }
}
/**
 * @category Domain
 */
function getDomain3D(space, x, y, z) {
    const d = new Domain3D(space, x, y, z);
    return d.run();
}


/***/ }),

/***/ "./lib/analysis/EquipotentialCurve.ts":
/*!********************************************!*\
  !*** ./lib/analysis/EquipotentialCurve.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EquipotentialCurve": () => (/* binding */ EquipotentialCurve)
/* harmony export */ });
/* harmony import */ var _types_mechanics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/mechanics */ "./lib/types/mechanics.ts");
/* harmony import */ var _Curve3D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Curve3D */ "./lib/analysis/Curve3D.ts");


class EquipotentialCurve {
    constructor(lambda, radius = 1) {
        this.lambda = lambda;
        this.r = radius;
        this.exp_sin = (this.lambda[0] - this.lambda[2]) / (this.lambda[1] - this.lambda[0]);
        this.exp_cos = (this.lambda[2] - this.lambda[1]) / (this.lambda[1] - this.lambda[0]);
    }
    generate(theta, phi) {
        const lineBuilder = new _Curve3D__WEBPACK_IMPORTED_MODULE_1__.Curve3D();
        theta = theta * Math.PI / 180;
        phi = phi * Math.PI / 180;
        // NORMAL STRESS EQUIPOTENTIALS 
        // The principal stress values are defined according to the rock mechanics sign convention (positive values for compressive stresses)
        const sigma_1 = -this.lambda[0]; // Principal stress in X direction
        const sigma_2 = -this.lambda[2]; // Principal stress in Z direction
        const sigma_3 = -this.lambda[1]; // Principal stress in Y direction
        // Center and radius of Mohr circle 3 - 1
        const sigma_3_1_mean = (sigma_1 + sigma_3) / 2;
        const rad_3_1 = (sigma_1 - sigma_3) / 2;
        // Center and radius of Mohr circle 3 - 2
        const sigma_3_2_mean = (sigma_2 + sigma_3) / 2;
        const rad_3_2 = (sigma_2 - sigma_3) / 2;
        // Center and radius of Mohr circle 2 - 1
        const sigma_2_1_mean = (sigma_1 + sigma_2) / 2;
        const rad_2_1 = (sigma_1 - sigma_2) / 2;
        // The integral lines derive from a scalar function defined by the normal stress component sigma_n
        // sigma_n is calculated for a specific plane tangent to the sphere whose normal vector is defined by (phi_1, theta_1)
        // sigma_n = (this.lambda[0] * cos(phi)**2 +this.lambda[1] * sin(phi)**2 ) * sin(theta)**2 + this.lambda[2] * ( 1 - sin(theta)**2 )
        let sigma_n = (this.lambda[0] * Math.cos(phi) ** 2 + this.lambda[1] * Math.sin(phi) ** 2) * Math.sin(theta) ** 2 + this.lambda[2] * Math.cos(theta) ** 2;
        sigma_n *= -1;
        // Plot equipotential corresponding to the normal force that passes through the fixed point:
        //      
        // tau_n0 = shear stress for point pO located in the Mohr circle 3-1 at normal stress sigma_n
        const tau_0 = Math.sqrt(rad_3_1 ** 2 - (sigma_n - sigma_3_1_mean) ** 2);
        // alfa_n0 = angle (in radians) between line segment (sigma_3,tau_n0) in circle 3-1 and the horizontal axis (sigma_3, sigma_1) :
        const alfa_0 = Math.atan(tau_0 / (sigma_n - sigma_3));
        /* if ( sigma_2 == sigma_3) {
            // Particular Case 1: revolution stress tensor around sigma_1
            // Equipotential curve is a circle sweeping at an angle alfa_n0 around sigma_1
            arcCircle(r: this.r, 'sigma_1', alfa_0 )
        }
        else if ( sigma_2 == sigma_1) {
            // Particular Case 2: revolution stress tensor around sigma_3
            // Equipotential curve is a circle sweeping at an angle PI/2 - alfa_n0 around sigma_3
            arcCircle(r: this.r, 'sigma_3', Math.PI/2 - alfa_0 )
        } */
        if (sigma_n > sigma_3 && sigma_n < sigma_2) {
            // Case 1: the equipotential line lies between circle 3 - 1 and circle 3 - 2:
            // tau_1 = shear stress for point p1 located in the Mohr circle 3-2 at normal stress sigma_n
            const tau_1 = Math.sqrt(rad_3_2 ** 2 - (sigma_n - sigma_3_2_mean) ** 2);
            // alfa_1 = angle (in radians) between line segment (sigma_3,tau_n0) in circle 3-2 and the horizontal axis (sigma_3, sigma_2) :
            const alfa_1 = Math.atan(tau_1 / (sigma_n - sigma_3));
            // Plot curve corresponding to the line segment between points: (sigma_n, tau_0) and (sigma_n, tau_1)
            const first = {
                circle: '3_1',
                p: [sigma_n, tau_0],
                angle: alfa_0
            };
            const second = {
                circle: '3_2',
                p: [sigma_n, tau_1],
                angle: alfa_1
            };
            return (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_0__.mohrCircleLine)({ r: this.r, first, second, sigma_1, sigma_2, sigma_3 });
        }
        else if (sigma_n > sigma_2 && sigma_n < sigma_1) {
            // Case 2: the equipotential line lies between circle 3 - 1 and circle 2 - 1:
            // tau_1 = shear stress for point pO located in the Mohr circle 3-1 at normal stress sigma_n
            const tau_1 = Math.sqrt(rad_2_1 ** 2 - (sigma_n - sigma_2_1_mean) ** 2);
            // alfa_1 = angle (in radians) between line segment (sigma_2,tau_n0) in circle 2-1 and the horizontal axis (sigma_2, sigma_1) :
            const alfa_1 = Math.atan(tau_1 / (sigma_n - sigma_2));
            // Plot curve corresponding to the line segment between points: (sigma_n, tau_n0) and (sigma_n, tau_1)
            const first = {
                circle: '3_1',
                p: [sigma_n, tau_0],
                angle: alfa_0
            };
            const second = {
                circle: '2_1',
                p: [sigma_n, tau_1],
                angle: alfa_1
            };
            return (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_0__.mohrCircleLine)({ r: this.r, first, second, sigma_1, sigma_2, sigma_3 });
        }
        else if (sigma_n == sigma_2) {
            // Case 3: the equipotential line lies between circle 3 - 1 and sigma_2:
            // tau_1 = shear stress for point pO
            const tau_1 = 0;
            // alfa_1 = angle (in radians) between line segment (sigma_3,tau_n0) in circle 3-2 and the horizontal axis (sigma_3, sigma_2) :
            const alfa_1 = 0;
            // Plot curve corresponding to the line segment between points: (sigma_n, tau_n0) and (sigma_n, tau_1)
            const first = {
                circle: '3_1',
                p: [sigma_n, tau_0],
                angle: alfa_0
            };
            const second = {
                circle: '3_2',
                p: [sigma_n, tau_1],
                angle: alfa_1
            };
            return (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_0__.mohrCircleLine)({ r: this.r, first, second, sigma_1, sigma_2, sigma_3 });
        }
        return '';
    }
}


/***/ }),

/***/ "./lib/analysis/FullParameterSpace.ts":
/*!********************************************!*\
  !*** ./lib/analysis/FullParameterSpace.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FullParameterSpace": () => (/* binding */ FullParameterSpace)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _ParameterSpace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParameterSpace */ "./lib/analysis/ParameterSpace.ts");


/**
 * @category Domain
 */
class FullParameterSpace extends _ParameterSpace__WEBPACK_IMPORTED_MODULE_1__.ParameterSpace {
    constructor() {
        super(...arguments);
        this.psi_ = 0;
        this.theta_ = 0;
        this.phi_ = 0;
        this.R_ = 0;
    }
    set psi(v) { this.psi_ = v; }
    get psi() { return this.psi_; }
    set theta(v) { this.theta_ = v; }
    get theta() { return this.theta_; }
    set phi(v) { this.phi_ = v; }
    get phi() { return this.phi_; }
    set R(v) { this.R_ = v; }
    get R() { return this.R_; }
    cost() {
        // Build the stress tensor according to (psi, theta, phi and R)
        //
        this.engine.setHypotheticalStress(this.wrot(), this.R_);
        return this.data.reduce((previous, current) => {
            return previous + current.cost({ stress: this.engine.stress(current.position) });
        }, 0) / this.data.length;
    }
    wrot() {
        // TODO
        return (0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)();
    }
}


/***/ }),

/***/ "./lib/analysis/IntegralCurve.ts":
/*!***************************************!*\
  !*** ./lib/analysis/IntegralCurve.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IntegralCurve": () => (/* binding */ IntegralCurve)
/* harmony export */ });
/* harmony import */ var _Curve3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Curve3D */ "./lib/analysis/Curve3D.ts");

/**
 * @brief Calculate the integral curves on the sphere surface that are parallel to the shear stress (streamlines in fluid mechanics)
 * @param {r: number, exp_cos: number, exp_sin: number}
 * @example
 * ```ts
 *
 * ```
 */
class IntegralCurve {
    constructor(lambda, radius = 1) {
        this.lambda = lambda;
        this.r = radius;
        this.exp_sin = (this.lambda[0] - this.lambda[2]) / (this.lambda[1] - this.lambda[0]);
        this.exp_cos = (this.lambda[2] - this.lambda[1]) / (this.lambda[1] - this.lambda[0]);
    }
    /**
     * Define a tangent plane by fixing angles phi and theta in spherical coordinates
     * @param theta In degrees
     * @param phi In degrees
     */
    generate(theta, phi) {
        const lineBuilder = new _Curve3D__WEBPACK_IMPORTED_MODULE_0__.Curve3D();
        let phi_1 = Math.PI * phi / 180;
        let theta_1 = Math.PI * theta / 180;
        // Determine integral curve that passes by this point of the sphere surface, by calculating k1
        // k1 is defined as a function of phi and theta for a specific symmetrical tensor
        let k1 = Math.tan(theta_1) / (Math.sin(phi_1) ** this.exp_sin * Math.cos(phi_1) ** this.exp_cos);
        // Plot the integral curve that passes by this specific point
        for (let i = 0; i <= 180; ++i) {
            const phi = Math.PI * i / 360;
            const theta = Math.atan(k1 * Math.sin(phi) ** this.exp_sin * Math.cos(phi) ** this.exp_cos);
            const x = this.r * Math.sin(theta) * Math.cos(phi);
            const y = this.r * Math.sin(theta) * Math.sin(phi);
            const z = this.r * Math.cos(theta);
            lineBuilder.addPoint(x, y, z);
        }
        return lineBuilder.buffer;
    }
}


/***/ }),

/***/ "./lib/analysis/MohrCoulombCurves.ts":
/*!*******************************************!*\
  !*** ./lib/analysis/MohrCoulombCurves.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MohrCoulombCurve": () => (/* binding */ MohrCoulombCurve)
/* harmony export */ });
/* harmony import */ var _types_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/math */ "./lib/types/math.ts");
/* harmony import */ var _types_mechanics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/mechanics */ "./lib/types/mechanics.ts");
/* harmony import */ var _Curve3D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Curve3D */ "./lib/analysis/Curve3D.ts");



class MohrCoulombCurve {
    constructor(lambda, radius = 1) {
        this.lambda = lambda;
        this.r = radius;
    }
    maxFrictionAngle(cohesion) {
        const sigma_1 = -this.lambda[0]; // Principal stress in X direction
        const sigma_3 = -this.lambda[1]; // Principal stress in Y direction
        // Center and radius of Mohr circle 3 - 1
        const sigma_3_1_mean = (sigma_1 + sigma_3) / 2;
        const rad_3_1 = (sigma_1 - sigma_3) / 2;
        // The friction angle phi_a varies in the range [0, phi_3_1], 
        //      where phi_3_1 is the angle of the line tangent to Mohr circle between sigma_3 - sigma_1 that passes by c
        let a_3_1 = sigma_3_1_mean ** 2 + cohesion ** 2;
        let b_3_1 = -2 * rad_3_1 * sigma_3_1_mean;
        let c_3_1 = rad_3_1 ** 2 - cohesion ** 2;
        // Angle max is defined in degrees
        const max = Math.asin((-b_3_1 - Math.sqrt(b_3_1 ** 2 - 4 * a_3_1 * c_3_1)) / (2 * a_3_1)) * 180 / Math.PI;
        return max;
    }
    maxCohesion(frictionAngle) {
        const sigma_1 = -this.lambda[0]; // Principal stress in X direction
        const sigma_3 = -this.lambda[1]; // Principal stress in Y direction
        // Center and radius of Mohr circle 3 - 1
        const sigma_3_1_mean = (sigma_1 + sigma_3) / 2;
        const rad_3_1 = (sigma_1 - sigma_3) / 2;
        // The friction angle phi_a varies in the range [0, phi_3_1], 
        //      where phi_3_1 is the angle of the line tangent to Mohr circle between sigma_3 - sigma_1 that passes by c
        let frictionAngleRad = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(frictionAngle);
        const cohesion = (rad_3_1 - sigma_3_1_mean * Math.sin(frictionAngleRad)) / Math.cos(frictionAngleRad);
        return cohesion;
    }
    /**
     * Define a tangent plane by fixing angles phi and theta in spherical coordinates
     * @param frictionAngle Friction angle in degrees
     * @param cohesion In [0, 0.5]
     */
    generate(frictionAngle, cohesion) {
        const lineBuilder = new _Curve3D__WEBPACK_IMPORTED_MODULE_2__.Curve3D();
        // The principal stress values are defined according to the rock mechanics sign convention (positive values for compressive stresses)
        const sigma_1 = -this.lambda[0]; // Principal stress in X direction
        const sigma_2 = -this.lambda[2]; // Principal stress in Z direction
        const sigma_3 = -this.lambda[1]; // Principal stress in Y direction
        // Center and radius of Mohr circle 3 - 1
        const sigma_3_1_mean = (sigma_1 + sigma_3) / 2;
        const rad_3_1 = (sigma_1 - sigma_3) / 2;
        // Center and radius of Mohr circle 3 - 2
        const sigma_3_2_mean = (sigma_2 + sigma_3) / 2;
        const rad_3_2 = (sigma_2 - sigma_3) / 2;
        // Center and radius of Mohr circle 2 - 1
        const sigma_2_1_mean = (sigma_1 + sigma_2) / 2;
        const rad_2_1 = (sigma_1 - sigma_2) / 2;
        if (cohesion < 0 || cohesion > 0.5) {
            throw new Error('Cohesion must be in [0, 0.5]');
        }
        const c = cohesion;
        const phi_a = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(frictionAngle);
        // MOHR-COULOMB FRICTION
        // The frictional strength law is defined by a Mohr-Coulomb line involving friction and cohesion:
        // These two parameters must be fixed by the user in the menu within a predefined range
        // The cohesion c is defined between [0,0.5] for a normalized stress tensor (sigma_1=1, sigma_2= R, sigma_3=0)
        // The friction angle phi_a varies in the range [0, phi_3_1], 
        //      where phi_3_1 is the angle of the line tangent to Mohr circle between sigma_3 - sigma_1 that passes by c        
        let a_3_1 = sigma_3_1_mean ** 2 + c ** 2;
        let b_3_1 = -2 * rad_3_1 * sigma_3_1_mean;
        let c_3_1 = rad_3_1 ** 2 - c ** 2;
        // Angles are defined in radians
        const phi_3_1 = Math.asin((-b_3_1 - Math.sqrt(b_3_1 ** 2 - 4 * a_3_1 * c_3_1)) / (2 * a_3_1));
        // We calculate two other threshold angles for lines tangent to Mohr circles between sigma_3 - sigma_2, and sigma_2 - sigma_1
        // Angle phi_3_2 for Mohr circle between sigma_2 - sigma_3 is calculated with a similar equation:
        //      phi_3_2 is calculated only for positive values
        let phi_3_2_bool = false; // Before verification, we suppose that the friction line does not intersect Mohr Circle S3-S2
        let phi_3_2 = 0;
        if (c < rad_3_2) {
            phi_3_2_bool = true;
            // phi_3_2 > 0, thus the friction line may intersect Mohr circle between sigma_3 - sigma_2
            // phi_3_2 can be calculated from a trigonometric expression
            let a_3_2 = sigma_3_2_mean ** 2 + c ** 2;
            let b_3_2 = -2 * rad_3_2 * sigma_3_2_mean;
            let c_3_2 = rad_3_2 ** 2 - c ** 2;
            phi_3_2 = Math.asin((-b_3_2 - Math.sqrt(b_3_2 ** 2 - 4 * a_3_2 * c_3_2)) / (2 * a_3_2));
        }
        // Angle phi_2_1 for Mohr circle between sigma_1 - sigma_2 is calculated from the general equation:
        //      tan(pi / 4 + phi_2_1 / 2) = ( - c + sqrt( c^2 + sigma_2 * sigma_1 ) ) / sigma_2
        //      phi_2_1 is calculated only for positive values
        let phi_2_1_bool = false; // Before verification, we suppose that the friction line does not intersect Mohr Circle S2-S1
        let phi_2_1 = 0;
        if (c < rad_2_1) {
            phi_2_1_bool = true;
            // phi_2_1 > 0, thus the friction line may intersect Mohr circle between sigma_3 - sigma_2
            // phi_2_1 can be calculated from a trigonometric expression
            let a_2_1 = sigma_2_1_mean ** 2 + c ** 2;
            let b_2_1 = -2 * rad_2_1 * sigma_2_1_mean;
            let c_2_1 = rad_2_1 ** 2 - c ** 2;
            phi_2_1 = Math.asin((-b_2_1 - Math.sqrt(b_2_1 ** 2 - 4 * a_2_1 * c_2_1)) / (2 * a_2_1));
        }
        // Let (c, phi_a) be the cohesion and friction angle chosen by the user. The friction coefficient mu is the slope of the line
        const mu = Math.tan(phi_a);
        const sigma_3_1 = [0, 0];
        const tau_3_1 = [0, 0];
        const alfa_3_1 = [0, 0];
        const sigma_3_2 = [0, 0];
        const tau_3_2 = [0, 0];
        const alfa_3_2 = [0, 0];
        const sigma_2_1 = [0, 0];
        const tau_2_1 = [0, 0];
        const alfa_2_1 = [0, 0];
        const struct = {
            sigma_3_1,
            tau_3_1,
            alfa_3_1,
            sigma_3_2,
            tau_3_2,
            alfa_3_2,
            sigma_2_1,
            tau_2_1,
            alfa_2_1,
        };
        // The Mohr-Coulomb line intersects the 3D Mohr circle in 1, 2 or 3 different line segments 
        // The line always intersects circle 1 - 3 in two points named: sigma_3_1[0], tau_3_1[0] and sigma_3_1[1], tau_3_1[1]
        //      such that sigma_3_1[0] <= sigma_3_1[1]
        // sigma_3_1 values are given by the roots of a quadratic equation a x^2 + b x + c = 0, with coeffcients a, b, anc c, as follows:
        const a_qe = 1 + mu ** 2;
        const b_qe = 2 * (c * mu - sigma_3_1_mean);
        const c_qe = c ** 2 + sigma_1 * sigma_3;
        //  Calculate the discriminant of the quadratic equation:
        let delta = Math.sqrt(b_qe ** 2 - 4 * a_qe * c_qe);
        //  Calculate intersection points
        sigma_3_1[0] = (-b_qe - delta) / (2 * a_qe);
        tau_3_1[0] = Math.sqrt(rad_3_1 ** 2 - (sigma_3_1[0] - sigma_3_1_mean) ** 2);
        sigma_3_1[1] = (-b_qe + delta) / (2 * a_qe);
        tau_3_1[1] = Math.sqrt(rad_3_1 ** 2 - (sigma_3_1[1] - sigma_3_1_mean) ** 2);
        // Calculate the angle (in radians) between segment (sigma_3,tau_3_1) in circle 3-1 and the horizontal axis (sigma_3, sigma_1) :
        // alfa_3_1 is the azimuthal angle in the reference frame (x,y,z) = (sigma_1,sigma_3, sigma_2) = (East, North, Up)
        alfa_3_1[0] = Math.atan(tau_3_1[0] / (sigma_3_1[0] - sigma_3));
        alfa_3_1[1] = Math.atan(tau_3_1[1] / (sigma_3_1[1] - sigma_3));
        // Define booleans indicating if the friction line intersects the smaller Mohr circles:
        let circle_2_1 = false;
        let circle_3_2 = false;
        if (phi_3_2_bool) {
            // phi_3_2 > 0, thus the friction line may intersect Mohr circle between sigma_3 - sigma_2
            if (phi_a < phi_3_2) {
                circle_3_2 = true;
                // The Mohr-Coulomb line intersects circle 2 - 3 in two points named: sigma_3_2[0], tau_3_2[0] and sigma_3_2[1], tau_3_2[1]
                //      such that sigma_3_2[0] <= sigma_3_2[1]
                // sigma_3_2 values are given by the roots of a quadratic equation a x^2 + b x + c = 0, with coeffcients a, b, anc c, as follows:
                const a_qe = 1 + mu ** 2;
                const b_qe = 2 * (c * mu - sigma_3_2_mean);
                const c_qe = c ** 2 + sigma_2 * sigma_3;
                //  Calculate the discriminant of the quadratic equation:
                let delta = Math.sqrt(b_qe ** 2 - 4 * a_qe * c_qe);
                //  Calculate intersection points
                sigma_3_2[0] = (-b_qe - delta) / (2 * a_qe);
                tau_3_2[0] = Math.sqrt(rad_3_2 ** 2 - (sigma_3_2[0] - sigma_3_2_mean) ** 2);
                sigma_3_2[1] = (-b_qe + delta) / (2 * a_qe);
                tau_3_2[1] = Math.sqrt(rad_3_2 ** 2 - (sigma_3_2[1] - sigma_3_2_mean) ** 2);
                // Calculate the angle (in radians) between segment (sigma_3,tau_3_2) in circle 3-2 and the horizontal axis (sigma_3, sigma_2) :
                // alfa_3_2 is the polar angle in the reference frame (x,y,z) = (sigma_1,sigma_3, sigma_2) = (East, North, Up)
                alfa_3_2[0] = Math.atan(tau_3_2[0] / (sigma_3_2[0] - sigma_3));
                alfa_3_2[1] = Math.atan(tau_3_2[1] / (sigma_3_2[1] - sigma_3));
            }
        }
        if (phi_2_1_bool) {
            // phi_2_1 > 0, thus the friction line may intersect Mohr circle between sigma_3 - sigma_2
            if (phi_a < phi_2_1) {
                circle_2_1 = true;
                // The Mohr-Coulomb line intersects circle 1 - 2 in two points named: sigma_2_1[0], tau_2_1[0] and sigma_2_1[1], tau_2_1[1]
                //      such that sigma_2_1[0] <= sigma_2_1[1]
                // sigma_2_1 values are given by the roots of a quadratic equation a x^2 + b x + c = 0, with coeffcients a, b, anc c, as follows:
                const a_qe = 1 + mu ** 2;
                const b_qe = 2 * (c * mu - sigma_2_1_mean);
                const c_qe = c ** 2 + sigma_1 * sigma_2;
                //  Calculate the discriminant of the quadratic equation:
                let delta = Math.sqrt(b_qe ** 2 - 4 * a_qe * c_qe);
                //  Calculate intersection points
                sigma_2_1[0] = (-b_qe - delta) / (2 * a_qe);
                tau_2_1[0] = Math.sqrt(rad_2_1 ** 2 - (sigma_2_1[0] - sigma_2_1_mean) ** 2);
                sigma_2_1[1] = (-b_qe + delta) / (2 * a_qe);
                tau_2_1[1] = Math.sqrt(rad_2_1 ** 2 - (sigma_2_1[1] - sigma_2_1_mean) ** 2);
                // Calculate the angle (in radians) between segment (sigma_2,tau_2_1) in circle 2-1 and the horizontal axis (sigma_2, sigma_1) :
                // alfa_2_1 is the latitude in the reference frame (x,y,z) = (sigma_1,sigma_3, sigma_2) = (East, North, Up)
                alfa_2_1[0] = Math.atan(tau_2_1[0] / (sigma_2_1[0] - sigma_2));
                alfa_2_1[1] = Math.atan(tau_2_1[1] / (sigma_2_1[1] - sigma_2));
            }
        }
        // We calculate the corresponding curves in the sphere:
        if (!circle_2_1 && !circle_3_2) {
            // Case 1: the Mohr-Coulomb line only intersects circle 3 - 1
            // Plot curve corresponding to the line segment between points: 
            //      sigma_3_1[0], tau_3_1[0] and sigma_3_1[1], tau_3_1[1]
            return (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_1__.mohrCircleLine)({
                r: this.r,
                first: this.getPoint(0, '3_1', struct),
                second: this.getPoint(1, '3_1', struct),
                sigma_1, sigma_2, sigma_3
            });
            // return mohrCircleLine( {r: this.r, first, second, sigma_1, sigma_2, sigma_3} )
        }
        else if (!circle_2_1 && circle_3_2) {
            // Case 2: the Mohr-Coulomb line intersects circle 3 - 1 and circle 3 - 2
            // Plot curves corresponding to the line segment between points: 
            //      sigma_3_1[0], tau_3_1[0] and sigma_3_2[0], tau_3_2[0];
            let buffer = (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_1__.mohrCircleLine)({
                r: this.r,
                first: this.getPoint(0, '3_1', struct),
                second: this.getPoint(0, '3_2', struct),
                sigma_1, sigma_2, sigma_3
            });
            buffer += '\n';
            //      sigma_3_2[1], tau_3_2[1] and sigma_3_1[1], tau_3_1[1];
            buffer += (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_1__.mohrCircleLine)({
                r: this.r,
                first: this.getPoint(1, '3_2', struct),
                second: this.getPoint(1, '3_1', struct),
                sigma_1, sigma_2, sigma_3
            });
            return buffer;
        }
        else if (circle_2_1 && !circle_3_2) {
            // Case 3: the Mohr-Coulomb line intersects circle 3 - 1 and circle 2 - 1
            // Plot curves corresponding to the line segment between points: 
            //      sigma_3_1[0], tau_3_1[0] and sigma_2_1[0], tau_2_1[0];
            let buffer = (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_1__.mohrCircleLine)({
                r: this.r,
                first: this.getPoint(0, '3_1', struct),
                second: this.getPoint(0, '2_1', struct),
                sigma_1, sigma_2, sigma_3
            });
            buffer += '\n';
            //      sigma_2_1[1], tau_2_1[1] and sigma_3_1[1], tau_3_1[1];
            buffer += (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_1__.mohrCircleLine)({
                r: this.r,
                first: this.getPoint(1, '2_1', struct),
                second: this.getPoint(1, '3_1', struct),
                sigma_1, sigma_2, sigma_3
            });
            return buffer;
        }
        else {
            // Case 4: the Mohr-Coulomb line intersects circle 3 - 1, circle 3 - 2, and circle 2 - 1
            // Plot curves corresponding to the line segment between points: 
            //      sigma_3_1[0], tau_3_1[0] and sigma_3_2[0], tau_3_2[0];
            let buffer = (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_1__.mohrCircleLine)({
                r: this.r,
                first: this.getPoint(0, '3_1', struct),
                second: this.getPoint(0, '3_2', struct),
                sigma_1, sigma_2, sigma_3
            });
            buffer += '\n';
            //      sigma_3_2[1], tau_3_2[1] and sigma_2_1[0], tau_2_1[0];
            buffer += (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_1__.mohrCircleLine)({
                r: this.r,
                first: this.getPoint(1, '3_2', struct),
                second: this.getPoint(0, '2_1', struct),
                sigma_1, sigma_2, sigma_3
            });
            buffer += '\n';
            //      sigma_2_1[1], tau_2_1[1] and sigma_3_1[1], tau_3_1[1];
            buffer += (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_1__.mohrCircleLine)({
                r: this.r,
                first: this.getPoint(1, '2_1', struct),
                second: this.getPoint(1, '3_1', struct),
                sigma_1, sigma_2, sigma_3
            });
            return buffer;
        }
    }
    getPoint(index, name, struct) {
        if (name === '3_1') {
            return {
                circle: name,
                p: [struct.sigma_3_1[index], struct.tau_3_1[index]],
                angle: struct.alfa_3_1[index]
            };
        }
        else if (name === '3_2') {
            return {
                circle: name,
                p: [struct.sigma_3_2[index], struct.tau_3_2[index]],
                angle: struct.alfa_3_2[index]
            };
        }
        else if (name === '2_1') {
            return {
                circle: name,
                p: [struct.sigma_2_1[index], struct.tau_2_1[index]],
                angle: struct.alfa_2_1[index]
            };
        }
        else {
            throw new Error(`name ${name} is undefined. Should be 3_1, 3_2 or 2_1`);
        }
    }
}


/***/ }),

/***/ "./lib/analysis/ParameterSpace.ts":
/*!****************************************!*\
  !*** ./lib/analysis/ParameterSpace.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParameterSpace": () => (/* binding */ ParameterSpace)
/* harmony export */ });
class ParameterSpace {
    constructor(data, engine) {
        this.data = data;
        this.engine = engine;
    }
}


/***/ }),

/***/ "./lib/analysis/index.ts":
/*!*******************************!*\
  !*** ./lib/analysis/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Curve3D": () => (/* reexport safe */ _Curve3D__WEBPACK_IMPORTED_MODULE_0__.Curve3D),
/* harmony export */   "Domain2D": () => (/* reexport safe */ _Domain2D__WEBPACK_IMPORTED_MODULE_7__.Domain2D),
/* harmony export */   "Domain3D": () => (/* reexport safe */ _Domain3D__WEBPACK_IMPORTED_MODULE_8__.Domain3D),
/* harmony export */   "EquipotentialCurve": () => (/* reexport safe */ _EquipotentialCurve__WEBPACK_IMPORTED_MODULE_1__.EquipotentialCurve),
/* harmony export */   "FullParameterSpace": () => (/* reexport safe */ _FullParameterSpace__WEBPACK_IMPORTED_MODULE_5__.FullParameterSpace),
/* harmony export */   "IntegralCurve": () => (/* reexport safe */ _IntegralCurve__WEBPACK_IMPORTED_MODULE_2__.IntegralCurve),
/* harmony export */   "MohrCoulombCurve": () => (/* reexport safe */ _MohrCoulombCurves__WEBPACK_IMPORTED_MODULE_3__.MohrCoulombCurve),
/* harmony export */   "ParameterSpace": () => (/* reexport safe */ _ParameterSpace__WEBPACK_IMPORTED_MODULE_4__.ParameterSpace),
/* harmony export */   "getDomain2D": () => (/* reexport safe */ _Domain2D__WEBPACK_IMPORTED_MODULE_7__.getDomain2D),
/* harmony export */   "getDomain3D": () => (/* reexport safe */ _Domain3D__WEBPACK_IMPORTED_MODULE_8__.getDomain3D),
/* harmony export */   "hasOwn": () => (/* reexport safe */ _Domain__WEBPACK_IMPORTED_MODULE_6__.hasOwn)
/* harmony export */ });
/* harmony import */ var _Curve3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Curve3D */ "./lib/analysis/Curve3D.ts");
/* harmony import */ var _EquipotentialCurve__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EquipotentialCurve */ "./lib/analysis/EquipotentialCurve.ts");
/* harmony import */ var _IntegralCurve__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IntegralCurve */ "./lib/analysis/IntegralCurve.ts");
/* harmony import */ var _MohrCoulombCurves__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MohrCoulombCurves */ "./lib/analysis/MohrCoulombCurves.ts");
/* harmony import */ var _ParameterSpace__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ParameterSpace */ "./lib/analysis/ParameterSpace.ts");
/* harmony import */ var _FullParameterSpace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FullParameterSpace */ "./lib/analysis/FullParameterSpace.ts");
/* harmony import */ var _Domain__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Domain */ "./lib/analysis/Domain.ts");
/* harmony import */ var _Domain2D__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Domain2D */ "./lib/analysis/Domain2D.ts");
/* harmony import */ var _Domain3D__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Domain3D */ "./lib/analysis/Domain3D.ts");











/***/ }),

/***/ "./lib/data/CompactionBand.ts":
/*!************************************!*\
  !*** ./lib/data/CompactionBand.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompactionBand": () => (/* binding */ CompactionBand)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./lib/data/types.ts");
/* harmony import */ var _StyloliteInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StyloliteInterface */ "./lib/data/StyloliteInterface.ts");


/**
 *
 * A compaction band is represented by a plane. Its orientation in space is defined by three parameters, as follows:
 *      Strike: clockwise angle measured from the North direction [0, 360)
 *      Dip: vertical angle, measured downward, between the horizontal and the line of greatest slope in an inclined plane [0, 90]
 *      Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
 *
 * The cost method is inherited from StyloliteInterface as a compaction band is considered to be oriented perpendicularly to Sigma 1
 * @category Data
 */
class CompactionBand extends _StyloliteInterface__WEBPACK_IMPORTED_MODULE_1__.StyloliteInterface {
    constructor() {
        super(...arguments);
        this.normal = [0, 0, 0];
        this.strategy = _types__WEBPACK_IMPORTED_MODULE_0__.FractureStrategy.ANGLE;
    }
    check({ displ, strain, stress }) {
        return stress !== undefined;
    }
}


/***/ }),

/***/ "./lib/data/ConjugateCompactionalShearBands.ts":
/*!*****************************************************!*\
  !*** ./lib/data/ConjugateCompactionalShearBands.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConjugateCompactionalShearBands": () => (/* binding */ ConjugateCompactionalShearBands)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./lib/data/types.ts");
/* harmony import */ var _types_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/math */ "./lib/types/math.ts");
/* harmony import */ var _ConjugateFaults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConjugateFaults */ "./lib/data/ConjugateFaults.ts");




/**
 Compactional Shear Bands:
 A pair of compactional shear bands is defined by two planes whose plane of movement is perpendicular to the intersection line between the planes.
 The plane of movement is defined by the two normal vectors to the compactional shear bands.
 In principle, the data type corresponding to compactional shear bands includes the type of mouvement but NOT the striation.
 We make the following hypotheses concerning principal stress orientations:
    The compressional axis Sigma 1 is located in the plane of movement and bisects the acute angle (<= 90°) between planes
    The extensional axis Sigma 3 is located in the plane of movement and bisects the obtuse angle (>= 90°) between planes

 Compactional shear bands are defined in the input file in TWO CONSECUTIVE LINES.
 Each line specifies all the available data for each conjugate compactional shear band.

 Several data sets defining two compactional shear bands are considered:
 1) Case 1: The geometry and kinematics of the compactional shear bands are defined, yet the rake angles are NOT defined.

    The orientation of the principal axes are calculated from the geometry of the compactional shear bands.
        The intermediate axis Sigma 2 is parallel to the intersection line between the compactional shear bands;
        The intermediate axis Sigma 2 is perpendicular to the plane of mouvement;
    a) Each plane is defined by a set of 3 parameters, as follows:
        Fault strike: clockwise angle measured from the North direction [0, 360)
        Fault dip: [0, 90]
        Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
    b) The rake angles defining the slip vectors are NOT defined
    c) The type of mouvement for each conjugate compactional shear band is an OPTIONAL parameter :
       However, it is highly recommended to include the type of mouvment for verification purposes,
            indicating both the dip-slip and strike-slip compoenents, when possible.
          Dip-slip component:
              N = Normal fault,
              I = Inverse fault or thrust
          Strike-slip componenet:
              RL = Right-Lateral fault
              LL = Left-Lateral fault
        Type of mouvement: N, I, RL, LL, N-RL, N-LL, I-RL, I-LL
2) Case 2: The geometry, the striation (i.e., the rake), and the kinematics of one or both compactional shear bands are defined.
        This case is not considered as the striations define redundant information for constraining the stress tensor orientation.
        compactional shear bands with striations can be considered separately as neoformed striated planes for which the friction angle is known
3) Particular case:
    If the striation is known for one of the conjugate faults, then the other plane
    can be defined by one axis that is contained in the plane.
    However, this case would require a special format in the input file, which is inconvenient...

    @category Data
 */
class ConjugateCompactionalShearBands extends _ConjugateFaults__WEBPACK_IMPORTED_MODULE_3__.ConjugateFaults {
    check({ displ, strain, stress }) {
        if (this.problemType === _types__WEBPACK_IMPORTED_MODULE_1__.StriatedPlaneProblemType.DYNAMIC) {
            return stress !== undefined;
        }
        return displ !== undefined;
    }
    cost({ displ, strain, stress }) {
        if (this.problemType === _types__WEBPACK_IMPORTED_MODULE_1__.StriatedPlaneProblemType.DYNAMIC) {
            // The cost function uses the rotation tensor Mrot from reference system S to Sm, calculated in method checkCompactionShearBands
            // The cost function for two conjugate faults is defined as the minimum angular rotation between system Sm and the stress tensor in system Sr or Sw:
            //  S   =  (X, Y, Z ) is the geographic reference frame  oriented in (East, North, Up) directions.
            //  Sr  =  (Xr, Yr, Zr ) is the principal reference frame chosen by the user in the interactive search phase ('r' stands for 'rough' solution)
            //  Sw =  (Xw, Yw, Zw ) is the principal reference frame for a fixed node in the search grid (sigma_1, sigma_3, sigma_2) ('w' stands for 'winning' solution)
            // Rotation tensors Rrot and RTrot between systems S and Sr are such that:
            //  V  = RTrot Vr        (RTrot is tensor Rrot transposed)
            //  Vr = Rrot  V
            // Rotation tensors Wrot and WTrot between systems S and Sw satisfy : WTrot = RTrot DTrot, such that:
            //  V   = WTrot Vw        (WTrot is tensor Wrot transposed)
            //  Vw = Wrot  V
            // The cost method implements a rotation tensor termed Hrot definning the orientation of the hypothetical solution stress system (H stands for hypothetical)
            // Hrot is equivalent to Rrot or Wrot depending on the calling functions:
            //      Hrot = Rrot in the interactive search phase using integral curves
            //      Hrot = Wrot in the inverse method search phase using Montecarlo (for example)
            // The rotation tensor MrotHTrot between systems Sm and Sh (Sr or Sw) is such that: Vm = MrotHTrot . Vh (Vh = Vr or Vh = Vw), 
            // where MrotHTrot = Mrot . HTrot (HTrot = Hrot transposed):
            const MrotHTrot = (0,_types__WEBPACK_IMPORTED_MODULE_0__.multiplyTensors)({ A: this.Mrot, B: (0,_types__WEBPACK_IMPORTED_MODULE_0__.transposeTensor)(stress.Hrot) });
            // The angle of rotation associated to tensor MrotHTrot is defined by the trace tr(MrotHTrot), according to the relation:
            //      tr(MrotHTrot) = 1 + 2 cos(theta)
            // 4 possible right-handed reference systems are considered for MrotHTrot in order to calculate the minimum rotation angle
            return (0,_types_math__WEBPACK_IMPORTED_MODULE_2__.minRotAngleRotationTensor)(MrotHTrot);
        }
    }
    checkConjugatePlanes() {
        // const f = ConjugatedFaults.create({})
        // return f.
        if (this.plane1 && this.plane2) {
            // The first and second conjugate planes are defined (strike1, dip1 and dipDirection1) and (strike2, dip2 and dipDirection2)
            if (Number.isNaN(this.params1.rake) && Number.isNaN(this.params1.striationTrend)) {
                this.striation1 = false;
            }
            if (Number.isNaN(this.params2.rake) && Number.isNaN(this.params2.striationTrend)) {
                this.striation2 = false;
            }
            if (!this.striation1 && !this.striation2) {
                // Case 1: general case
                // The striations are not defined for the conjugate planes 1 and 2
                // In principle we have already checked that the two conjugate planes are different
                // Calculate the unit vector parellel to Sigma 2, which is perpendicular to nPlane1 and nPlane2:
                this.nSigma2_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct)({ U: this.nPlane1, V: this.nPlane2 });
                // Calculate the two normalized stress axes (Sigma 1 and Sigma 3) that bisect the angles between the conjugate planes
                // angle_nPlane1_nPlane2 in interval (0,PI)
                const angle_nPlane1_nPlane2 = Math.acos((0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: this.nPlane1, V: this.nPlane2 }));
                if (Math.abs(angle_nPlane1_nPlane2 - Math.PI / 2) > this.EPS) {
                    // The conjugate planes are not perpendicular to each other
                    if (angle_nPlane1_nPlane2 < Math.PI / 2) {
                        // The angle between the 2 normals < PI/2:
                        // Sigma 1 and Sigma 3 are located in the plane generated by nPlane1 and nPlane2  (normal unit vectors point upward)
                        // In principle Sigma 1 bisects the acute angle (< 90°) between the normal vectors of the conjugate planes 
                        this.calculateSigma1_Sigma3_AcuteAngleNormals_CCSB();
                    }
                    else {
                        // The angle between the 2 normals > PI/2:
                        // In principle Sigma 3 bisects the obtuse angle (> 90°) between the normal vectors of the conjugate planes 
                        this.calculateSigma1_Sigma3_ObtuseAngleNormals_CCSB();
                        // ****** let (coordinates1.phi, coordinates1.theta) and (coordinates2.phi, coordinates2.theta) be the spherical coords
                        // of conjugate plaes 1 and 2 in the geographic reference system: S = (X,Y,Z) = (E,N,Up)
                        // This requires using method faultSphericalCoords in class fault
                        // Check that the sense of mouvement is consistent with the orientation of stress axes***
                        if (this.params1.typeOfMovement !== 'UND') {
                            // The sense of movement is defined for conjugate plane 1 (UND = undefined)
                            // Check consitency of movement 
                            this.cf1.conjugatePlaneCheckMouvement({
                                noPlane: this.params1.noPlane,
                                nPlane: this.nPlane1,
                                coordinates: this.cf1.fault.sphericalCoords,
                                nStriation: this.cf1.fault.striation,
                                typeOfMovement: this.params1.type_of_movement,
                                nSigma3_Sm: this.nSigma3_Sm,
                                nSigma2_Sm: this.nSigma2_Sm
                            });
                        }
                        if (this.params2.typeOfMovement !== 'UND') {
                            // The sense of movement is defined for conjugate plane 2
                            // Check consitency of movement
                            this.cf2.conjugatePlaneCheckMouvement({
                                noPlane: this.params2.noPlane,
                                nPlane: this.nPlane2,
                                coordinates: this.cf2.fault.sphericalCoords,
                                nStriation: this.cf2.fault.striation,
                                typeOfMovement: this.params2.type_of_movement,
                                nSigma3_Sm: this.nSigma3_Sm,
                                nSigma2_Sm: this.nSigma2_Sm
                            });
                        }
                    }
                }
                else {
                    // Special case:
                    // The angle between the 2 normals is approximately equal to PI/2:
                    // In this situation, the orientation of Sigma 1 and Sigma 3 can be permuted.
                    // The sense of mouvement of at least one conjugate compactional shear band must be known in order to define the orientation of the stress axes
                    this.consistencyKinematicsPerpendicularPlanes();
                }
                // We define 2 orthonormal right-handed reference systems:
                //      S =  (X, Y, Z ) is the geographic reference frame oriented in (East, North, Up) directions.
                //      Sm = (Xm,Ym,Zm) is the principal stress reference frame, parallel to the stress axes obtained form the conjugate faults (sigma1_Sm, sigma3_Sm, sigma2_Sm);
                //          The letter 'm' stands for micro/meso structure
                // Calculate transformation matrix Mrot from reference system S to Sm, such that (the letter M stands for micro/meso structure):
                //      Vm = Mrot V
                // where V and Vm are corresponding vectors in reference systems S and Sm
                // Rotation tensor Mrot is defined such that:
                // lines 1, 2, and 3 are defined by unit vectors nSigma1_Sm, nSigma3_Sm, and nSigma2_Sm, in agreement with reference system Sm = (Xm,Ym,Zm)
                this.Mrot = [
                    [this.nSigma1_Sm[0], this.nSigma1_Sm[1], this.nSigma1_Sm[2]],
                    [this.nSigma3_Sm[0], this.nSigma3_Sm[1], this.nSigma3_Sm[2]],
                    [this.nSigma2_Sm[0], this.nSigma2_Sm[1], this.nSigma2_Sm[2]]
                ];
            }
        }
        else if (this.plane1 || this.plane2) {
            // One of the two compactional shear bands is defined while the other is not
            // In principle the second plane can be calculated using the striation of the first plane and a line passing by the second plane
            // However, this case is rather unusual.
        }
        else {
            // The two compactional shear bands are not defined
            throw new Error('conjugate faults ' + this.params1.noPlane + ' and ' + this.params2.noPlane + ' are not defined (strike, dip and dip direction');
        }
    }
    consistencyKinematicsPerpendicularPlanes() {
        // The angle between the 2 normals is approximately equal to PI/2:
        // In this situation, the orientation of Sigma 1 and Sigma 3 can be permuted.
        // The sense of mouvement of at least one conjugate compactional shear band must be known in order to define the orientation of the stress axes
        // typeMovementConsistency: boolean indicating if the current stress axes orientations are consistent or not with type of movement
        let typeMovementConsistency1, typeMovementConsistency2 = true;
        if (this.params1.typeOfMovement !== 'UND' || this.params2.typeOfMovement !== 'UND') {
            // Find orientations of Sigma 1, Sigma 2 and Sigma 3, and check for consistency of mouvement if both movements are known.
            // Suppose that the bisecting line nSigma1_Sm is defined by the sum of normal vectors nPlane1 + nPlane2
            this.calculateSigma1_Sigma3_AcuteAngleNormals_CCSB();
            if (this.params1.typeOfMovement !== 'UND') {
                // The sense of movement is defined for conjugate plane 1 (UND = undefined)
                // Check consitency of movement 
                typeMovementConsistency1 = this.cf1.perpendicularPlanesCheckmovement({
                    noPlane: this.params1.noPlane,
                    nPlane: this.nPlane1,
                    coordinates: this.cf1.fault.sphericalCoords,
                    nStriation: this.cf1.fault.striation,
                    typeOfMovement: this.params1.type_of_movement,
                    nSigma3_Sm: this.nSigma3_Sm,
                    nSigma2_Sm: this.nSigma2_Sm
                });
            }
            if (this.params2.typeOfMovement !== 'UND') {
                // The sense of movement is defined for conjugate plane 2
                // Check consitency of movement
                typeMovementConsistency2 = this.cf2.perpendicularPlanesCheckmovement({
                    noPlane: this.params2.noPlane,
                    nPlane: this.nPlane2,
                    coordinates: this.cf2.fault.sphericalCoords,
                    nStriation: this.cf2.fault.striation,
                    typeOfMovement: this.params2.type_of_movement,
                    nSigma3_Sm: this.nSigma3_Sm,
                    nSigma2_Sm: this.nSigma2_Sm
                });
            }
            if (!typeMovementConsistency1 || !typeMovementConsistency2) {
                // The type of movement is not consistent with the stress axes orientations assumed in:
                //      calculateSigma1_Sigma3_AcuteAngleNormals_CCSB
                // for at least one of the conjugate planes
                // Suppose that the bisecting line nSigma3_Sm is defined by the sum of normal vectors nPlane1 + nPlane2
                this.calculateSigma1_Sigma3_ObtuseAngleNormals_CCSB();
                typeMovementConsistency1 = true;
                typeMovementConsistency2 = true;
                if (this.params1.typeOfMovement !== 'UND') {
                    // The sense of movement is defined for conjugate plane 1 (UND = undefined)
                    // Check consitency of movement 
                    typeMovementConsistency1 = this.cf1.perpendicularPlanesCheckmovement({
                        noPlane: this.params1.noPlane,
                        nPlane: this.nPlane1,
                        coordinates: this.cf1.fault.sphericalCoords,
                        nStriation: this.cf1.fault.striation,
                        typeOfMovement: this.params1.type_of_movement,
                        nSigma3_Sm: this.nSigma3_Sm,
                        nSigma2_Sm: this.nSigma2_Sm
                    });
                }
                if (this.params2.typeOfMovement !== 'UND') {
                    // The sense of movement is defined for conjugate plane 2
                    // Check consitency of movement
                    typeMovementConsistency2 = this.cf2.perpendicularPlanesCheckmovement({
                        noPlane: this.params2.noPlane,
                        nPlane: this.nPlane2,
                        coordinates: this.cf2.fault.sphericalCoords,
                        nStriation: this.cf2.fault.striation,
                        typeOfMovement: this.params2.type_of_movement,
                        nSigma3_Sm: this.nSigma3_Sm,
                        nSigma2_Sm: this.nSigma2_Sm
                    });
                }
                if (!typeMovementConsistency1 || !typeMovementConsistency2) {
                    throw (`Conjugate planes ${this.params2.noPlane} and ${this.params2.noPlane} are perpendicular`);
                    throw new Error(`Sense of movement of at least one of the perpendicular planes is not consistent with fault kinematics`);
                }
            }
            else {
                const msg = 'conjugate planes ' + this.params1.noPlane + ' and ' + this.params2.noPlane + ' are perpendicular. Please indicate type of movement for at least one plane';
                throw new Error(msg);
            }
        }
    }
    calculateSigma1_Sigma3_AcuteAngleNormals_CCSB() {
        // Method used in stress analysis for Conjugate Compresional Shear Bbands
        // The angle between the 2 normals < PI/2:
        // Sigma 1 and Sigma 3 are located in the plane generated by nPlane1 and nPlane2  (normal unit vectors point upward)
        // In principle stress Sigma 1 bisects the acute angle (< 90°) between the conjugate planes
        // The bisecting line nSigma1_Sm is defined by the sum of normal vectors nPlane1 + nPlane2
        this.nSigma1_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.add_Vectors)({ U: this.nPlane1, V: this.nPlane2 });
        this.nSigma1_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizeVector)(this.nSigma1_Sm);
        // nSigma3_Sm = nSigma2_Sm x nSigma1_Sm
        // The right-handed reference system is defined consistently with the convention for stress axes orientations (sigma 1, sigma 3, sigma 2)
        this.nSigma3_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct)({ U: this.nSigma2_Sm, V: this.nSigma1_Sm });
    }
    calculateSigma1_Sigma3_ObtuseAngleNormals_CCSB() {
        // Method used in stress analysis for Conjugate Compresional Shear Bbands
        // The angle between the 2 normals > PI/2:
        // Sigma 1 and Sigma 3 are located in the plane generated by nPlane1 and nPlane2  (normal unit vectors point upward)
        // In principle Sigma 3 bisects the obtuse angle (> 90°) between the normal vectors of the conjugate planes 
        // The bisecting line nSigma3_Sm is defined by the sum of normal vectors nPlane1 + nPlane2
        this.nSigma3_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.add_Vectors)({ U: this.nPlane1, V: this.nPlane2 });
        // note that nSigma3_Sm is always located in the compressional quadrant of the outward hemisphere relative to each of the planes
        // i.e., the scalar product nPlane1 . nSigma3_Sm > 0
        this.nSigma3_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizeVector)(this.nSigma3_Sm);
        // nSigma1_Sm = nSigma3_Sm x nSigma2_Sm
        // The right-handed reference system is defined consistently with the convention for stress axes orientations (sigma 1, sigma 3, sigma 2)
        this.nSigma1_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct)({ U: this.nSigma3_Sm, V: this.nSigma2_Sm });
    }
}


/***/ }),

/***/ "./lib/data/ConjugateDilatantShearBands.ts":
/*!*************************************************!*\
  !*** ./lib/data/ConjugateDilatantShearBands.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConjugateDilatantShearBands": () => (/* binding */ ConjugateDilatantShearBands)
/* harmony export */ });
/* harmony import */ var _ConjugateFaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConjugateFaults */ "./lib/data/ConjugateFaults.ts");

/**
 Conjugate Dilatant Shear Bands:
 
 A pair of conjugate dilatant shear bands is defined by two planes whose plane of movement is perpendicular to the intersection line between the planes.
 The plane of movement is defined by the two normal vectors to the fault planes.
 In principle, the data type corresponding to conjugate dilatant shear bands includes the type of mouvement
    but NOT the shear displacment orientation (i.e., the striation).
 We make the following hypotheses concerning principal stress orientations:
    The compressional axis Sigma 1 is located in the plane of movement and bisects the acute angle (<= 90°) between planes
    The extensional axis Sigma 3 is located in the plane of movement and bisects the obtuse angle (>= 90°) between planes

 Conjugate dilatant shear bands are defined in the input file in TWO CONSECUTIVE LINES.
 Each line specifies all the available data for each conjugate dilatant shear band.

 Several data sets defining two conjugate dilatant shear bands are considered:
 1) Case 1: The geometry and kinematics of the conjugate dilatant shear bands are defined, yet the rake angles are NOT defined.

    The orientation of the principal axes are calculated from the geometry of the conjugate dilatant shear bands.
        The intermediate axis Sigma 2 is parallel to the intersection line between the conjugate dilatant shear bands;
        The intermediate axis Sigma 2 is perpendicular to the plane of mouvement;
    a) Each plane is defined by a set of 3 parameters, as follows:
        Fault strike: clockwise angle measured from the North direction [0, 360)
        Fault dip: [0, 90]
        Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
    b) The rake angles defining the slip vectors are NOT defined
    c) The sense of mouvement is indicated for each conjugate dilatant shear band :
        For verification purposes, it is recommended to indicate both the dip-slip and strike-slip compoenents, when possible.
          Dip-slip component:
              N = Normal fault,
              I = Inverse fault or thrust
          Strike-slip componenet:
              RL = Right-Lateral fault
              LL = Left-Lateral fault
        Sense of mouvement: N, I, RL, LL, N-RL, N-LL, I-RL, I-LL
2) Case 2: The geometry, the striation (i.e., the rake), and the kinematics of one or both conjugate dilatant shear bands are defined.
        This case is not considered as the striations define redundant information for constraining the stress tensor orientation.
        conjugate dilatant shear bands with striations can be considered separately as neoformed striated planes for which the friction angle is known
3) Particular case:
    If the striation is known for one of the conjugate dilatant shear bands, then the other plane
    can be defined by one axis that is contained in the plane.
    However, this case would require a special format in the input file, which is inconvenient...

    @note For stress tensor calculation, conjugate dilatant shear bands are equivalent to conjugate faults:
    They are neoformed structures resulting from inelastic deformation combining dilation and shear (i.e. the frictional/cohesive yield surface)
    They are located in the left (extensional) half of the Mohr-Circle <Sigma 3, Sigma 1>
    The initialize, check and cost methods are inherited from Conjugate Faults

    @category Data
 */
class ConjugateDilatantShearBands extends _ConjugateFaults__WEBPACK_IMPORTED_MODULE_0__.ConjugateFaults {
}


/***/ }),

/***/ "./lib/data/ConjugateFaults.ts":
/*!*************************************!*\
  !*** ./lib/data/ConjugateFaults.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConjugateFaults": () => (/* binding */ ConjugateFaults)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _Data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data */ "./lib/data/Data.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./lib/data/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./lib/utils/index.ts");
/* harmony import */ var _types_math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/math */ "./lib/types/math.ts");
/* harmony import */ var _DataDescription__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataDescription */ "./lib/data/DataDescription.ts");
/* harmony import */ var _Factory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Factory */ "./lib/data/Factory.ts");







/**
 Conjugate Fault Planes:
 A pair of conjugate fault planes is defined by two planes whose plane of movement is perpendicular to the intersection line between the planes.
 The plane of movement is defined by the two normal vectors to the fault planes.
 In principle, the data type corresponding to conjugate fault planes includes the type of mouvement but NOT the striation.
 We make the following hypotheses concerning principal stress orientations:
    The compressional axis Sigma 1 is located in the plane of movement and bisects the acute angle (<= 90°) between planes
    The extensional axis Sigma 3 is located in the plane of movement and bisects the obtuse angle (>= 90°) between planes

 Conjugate fault planes are defined in the input file in TWO CONSECUTIVE LINES; they are numbered one after the other
 Each line specifies all the available data for each conjugate fault plane.

 Several data sets defining two conjugate fault planes are considered:
 1) General Case: The geometry and kinematics of the conjugate fault planes are defined, yet the rake angles are NOT defined.

    The orientation of the principal axes are calculated from the geometry of the conjugate fault planes.
        The intermediate axis Sigma 2 is parallel to the intersection line between the conjugate fault planes;
        The intermediate axis Sigma 2 is perpendicular to the plane of mouvement;
    a) Each plane is defined by a set of 3 parameters, as follows:
        Fault strike: clockwise angle measured from the North direction [0, 360)
        Fault dip: [0, 90]
        Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
    b) The rake angles defining the slip vectors are NOT defined
    c) The type of mouvement for each conjugate fault plane is an OPTIONAL parameter (i.e. it may be undefined - UND)
       However, it is highly recommended to include the type of mouvment for verification purposes,
            indicating both the dip-slip and strike-slip compoenents, when possible.
          Dip-slip component:
              N = Normal fault,
              I = Inverse fault or thrust
          Strike-slip componenet:
              RL = Right-Lateral fault
              LL = Left-Lateral fault
        Type of mouvement: N, I, RL, LL, N-RL, N-LL, I-RL, I-LL; UND
2) Special Case 1: The geometry, the striation (i.e., the rake), and the kinematics of one or both conjugate fault planes are defined.
        This case is NOT considered as the striations define redundant information for constraining the stress tensor orientation.
        Conjugate fault planes with striations can be considered separately as Neoformed Striated Planes for which the friction angle is known
3) Special Case 2:
    If the striation is known for one of the conjugate faults, then the other plane
    can be defined by one axis that is contained in the plane.
    However, this case is NOT considered since it would require a special format in the input file, which is inconvenient.

    @category Data
 */
class ConjugateFaults extends _Data__WEBPACK_IMPORTED_MODULE_1__.Data {
    constructor() {
        super(...arguments);
        this.nPlane1 = undefined;
        this.nPlane2 = undefined;
        this.nStriation1 = undefined;
        this.nStriation2 = undefined;
        this.pos = undefined;
        this.problemType = _types__WEBPACK_IMPORTED_MODULE_2__.StriatedPlaneProblemType.DYNAMIC;
        this.strategy = _types__WEBPACK_IMPORTED_MODULE_2__.FractureStrategy.ANGLE;
        this.oriented = true;
        this.EPS = 1e-7;
        this.plane1 = undefined;
        this.plane2 = undefined;
        // Principal directions of the data
        this.nSigma1_Sm = undefined;
        this.nSigma2_Sm = undefined;
        this.nSigma3_Sm = undefined;
        this.Mrot = undefined;
        this.cf1 = undefined;
        this.cf2 = undefined;
        this.params1 = undefined;
        this.params2 = undefined;
        this.striation1 = false;
        this.striation2 = false;
    }
    nbLinkedData() {
        return 2;
    }
    initialize(args) {
        const result = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_5__.createDataStatus)();
        this.params1 = this.performOneDataLine(args[0], result);
        this.cf1 = _utils__WEBPACK_IMPORTED_MODULE_3__.ConjugatePlanesHelper.create(this.params1);
        // conjugate fault plane 1 is defined: (strike, dip, dipDirection)
        this.plane1 = true;
        // Calculate the unit vector normal to plane 1: nPlane1
        this.nPlane1 = this.cf1.nPlane;
        this.params2 = this.performOneDataLine(args[1], result);
        this.cf2 = _utils__WEBPACK_IMPORTED_MODULE_3__.ConjugatePlanesHelper.create(this.params2);
        // conjugate fault plane 2 is defined: (strike, dip, dipDirection)
        this.plane2 = true;
        // Calculate the unit vector normal to plane 2: nPlane2
        this.nPlane2 = this.cf2.nPlane;
        // this.checkConjugatePlanes()
        return result;
    }
    check({ displ, strain, stress }) {
        if (this.problemType === _types__WEBPACK_IMPORTED_MODULE_2__.StriatedPlaneProblemType.DYNAMIC) {
            return stress !== undefined;
        }
        return displ !== undefined;
    }
    cost({ displ, strain, stress }) {
        if (this.problemType === _types__WEBPACK_IMPORTED_MODULE_2__.StriatedPlaneProblemType.DYNAMIC) {
            // The cost function uses the rotation tensor Mrot from reference system S to Sm, calculated in method checkCompactionShearBands
            // The cost function for two conjugate faults is defined as the minimum angular rotation between system Sm and the stress tensor in system Sr or Sw:
            //  S   =  (X, Y, Z ) is the geographic reference frame  oriented in (East, North, Up) directions.
            //  Sr  =  (Xr, Yr, Zr ) is the principal reference frame chosen by the user in the interactive search phase ('r' stands for 'rough' solution).
            //  Sw =  (Xw, Yw, Zw ) is the principal reference frame for a fixed node in the search grid (sigma_1, sigma_3, sigma_2) ('w' stands for 'winning' solution)
            // Rotation tensors Rrot and RTrot between systems S and Sr are such that:
            //  V  = RTrot Vr        (RTrot is tensor Rrot transposed)
            //  Vr = Rrot  V
            // Rotation tensors Wrot and WTrot between systems S and Sw satisfy : WTrot = RTrot DTrot, such that:
            //  V   = WTrot Vw        (WTrot is tensor Wrot transposed)
            //  Vw = Wrot  V
            // The cost method implements a rotation tensor termed Hrot definning the orientation of the hypothetical solution stress sytem (H stands for hypothetical)
            // Hrot is equivalent to Rrot or Wrot depending on the calling functions:
            //      Hrot = Rrot in the interactive search phase using integral curves
            //      Hrot = Wrot in the inverse method search phase using Montecarlo (for example)
            // The rotation tensor MrotHTrot between systems Sm and Sh (Sr or Sw) is such that: Vm = MrotHTrot . Vh (Vh = Vr or Vh = Vw), 
            // where MrotHTrot = Mrot . HTrot (HTrot = Hrot transposed):
            const MrotHTrot = (0,_types__WEBPACK_IMPORTED_MODULE_0__.multiplyTensors)({ A: this.Mrot, B: (0,_types__WEBPACK_IMPORTED_MODULE_0__.transposeTensor)(stress.Hrot) });
            // The angle of rotation associated to tensor MrotHTrot is defined by the trace tr(MrotHTrot), according to the relation:
            //      tr(MrotHTrot) = 1 + 2 cos(theta)
            // 4 possible right-handed reference systems are considered for MrotHTrot in order to calculate the minimum rotation angle
            return (0,_types_math__WEBPACK_IMPORTED_MODULE_4__.minRotAngleRotationTensor)(MrotHTrot);
        }
    }
    performOneDataLine(toks, result) {
        const arg = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_5__.createDataArgument)();
        const strike = _DataDescription__WEBPACK_IMPORTED_MODULE_5__.DataDescription.getParameter(arg.setIndex(2));
        const dip = _DataDescription__WEBPACK_IMPORTED_MODULE_5__.DataDescription.getParameter(arg.setIndex(3));
        // -----------------------------------
        const dipDirection = _DataDescription__WEBPACK_IMPORTED_MODULE_5__.DataDescription.getParameter(arg.setIndex(4));
        if (dip !== 0 && dip !== 90) {
            // General case: the plane is neither horizontal nor vertical 
            if (dipDirection === 8 /* Direction.UND */) {
                // For non-horizontal and non-vertical planes the dip direction must be defined in terms of a geographic direction: N, S, E, W, NE, SE, SW, NW
                result.status = false;
                result.messages.push(`Data number ${toks[0]}, column 4: parameter for ${_Factory__WEBPACK_IMPORTED_MODULE_6__.DataFactory.name(this)}, please set the dip direction in terms of a geographic direction`);
            }
        }
        else if (dipDirection !== 8 /* Direction.UND */) {
            // For horizontal and vertical planes the dip direction is undefined (UND) 
            result.status = false;
            result.messages.push(`Data number ${toks[0]}, column 4: parameter for ${_Factory__WEBPACK_IMPORTED_MODULE_6__.DataFactory.name(this)}, for a horizontal or vertical plane please set the dip direction as undefined (UND)`);
        }
        // -----------------------------------
        const typeOfMovement = _DataDescription__WEBPACK_IMPORTED_MODULE_5__.DataDescription.getParameter(arg.setIndex(8));
        // -----------------------------------
        return {
            noPlane: (0,_utils__WEBPACK_IMPORTED_MODULE_3__.toInt)(toks[0]),
            strike,
            dipDirection,
            dip,
            typeOfMovement
        };
    }
    consistencyKinematicsPerpendicularPlanes() {
        // The angle between the 2 normals is approximately equal to PI/2:
        // In this situation, the orientation of Sigma 1 and Sigma 3 can be permuted.
        // The sense of mouvement of at least one conjugate fault plane must be known in order to define the orientation of the stress axes
        // typeMovementConsistency: boolean indicating if the current stress axes orientations are consistent or not with type of movement
        let typeMovementConsistency1, typeMovementConsistency2 = true;
        if (this.params1.typeOfMovement !== 'UND' || this.params2.typeOfMovement !== 'UND') {
            // Find orientations of Sigma 1, Sigma 2 and Sigma 3, and check for consistency of mouvement if both movements are known.
            // Suppose that the bisecting line nSigma3_Sm is defined by the sum of normal vectors nPlane1 + nPlane2
            this.calculateSigma1_Sigma3_AcuteAngleNormals_CF_CDSB();
            if (this.params1.typeOfMovement !== 'UND') {
                // The sense of movement is defined for conjugate plane 1 (UND = undefined)
                // Check consitency of movement 
                typeMovementConsistency1 = this.cf1.perpendicularPlanesCheckmovement({
                    noPlane: this.params1.noPlane,
                    nPlane: this.nPlane1,
                    coordinates: this.cf1.fault.sphericalCoords,
                    nStriation: this.cf1.fault.striation,
                    typeOfMovement: this.params1.type_of_movement,
                    nSigma3_Sm: this.nSigma3_Sm,
                    nSigma2_Sm: this.nSigma2_Sm
                });
            }
            if (this.params2.typeOfMovement !== 'UND') {
                // The sense of movement is defined for conjugate plane 2
                // Check consitency of movement
                typeMovementConsistency2 = this.cf2.perpendicularPlanesCheckmovement({
                    noPlane: this.params2.noPlane,
                    nPlane: this.nPlane2,
                    coordinates: this.cf2.fault.sphericalCoords,
                    nStriation: this.cf2.fault.striation,
                    typeOfMovement: this.params2.type_of_movement,
                    nSigma3_Sm: this.nSigma3_Sm,
                    nSigma2_Sm: this.nSigma2_Sm
                });
            }
            if (!typeMovementConsistency1 || !typeMovementConsistency2) {
                // The type of movement is NOT consistent with the stress axes orientations assumed in:
                //      calculateSigma1_Sigma3_AcuteAngleNormals_CF_CDSB
                // for at least one of the conjugate planes
                // Suppose that the bisecting line nSigma1_Sm is defined by the sum of normal vectors nPlane1 + nPlane2
                this.calculateSigma1_Sigma3_ObtuseAngleNormals_CF_CDSB();
                typeMovementConsistency1 = true;
                typeMovementConsistency2 = true;
                if (this.params1.typeOfMovement !== 'UND') {
                    // The sense of movement is defined for conjugate plane 1 (UND = undefined)
                    // Check consitency of movement 
                    typeMovementConsistency1 = this.cf1.perpendicularPlanesCheckmovement({
                        noPlane: this.params1.noPlane,
                        nPlane: this.nPlane1,
                        coordinates: this.cf1.fault.sphericalCoords,
                        nStriation: this.cf1.fault.striation,
                        typeOfMovement: this.params1.type_of_movement,
                        nSigma3_Sm: this.nSigma3_Sm,
                        nSigma2_Sm: this.nSigma2_Sm
                    });
                }
                if (this.params2.typeOfMovement !== 'UND') {
                    // The sense of movement is defined for conjugate plane 2
                    // Check consitency of movement
                    typeMovementConsistency2 = this.cf2.perpendicularPlanesCheckmovement({
                        noPlane: this.params2.noPlane,
                        nPlane: this.nPlane2,
                        coordinates: this.cf2.fault.sphericalCoords,
                        nStriation: this.cf2.fault.striation,
                        typeOfMovement: this.params2.type_of_movement,
                        nSigma3_Sm: this.nSigma3_Sm,
                        nSigma2_Sm: this.nSigma2_Sm
                    });
                }
                if (!typeMovementConsistency1 || !typeMovementConsistency2) {
                    throw (`Conjugate planes ${this.params2.noPlane} and ${this.params2.noPlane} are perpendicular`);
                    throw new Error(`Sense of movement of at least one of the perpendicular planes is not consistent with fault kinematics`);
                }
            }
        }
        else {
            const msg = 'conjugate planes ' + this.params1.noPlane + ' and ' + this.params2.noPlane + ' are perpendicular. Please indicate type of movement for at least one plane';
            throw new Error(msg);
        }
    }
    calculateSigma1_Sigma3_AcuteAngleNormals_CF_CDSB() {
        // Method used in stress analysis for Conjugate Faults and Conjugate Dilatant Shear Bbands
        // The angle between the 2 normals < PI/2:
        // Sigma 1 and Sigma 3 are located in the plane generated by nPlane1 and nPlane2  (normal unit vectors point upward)
        // In principle Sigma 3 bisects the acute angle (< 90°) between the normal vectors of the conjugate planes 
        // The bisecting line nSigma3_Sm is defined by the sum of normal vectors nPlane1 + nPlane2
        this.nSigma3_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.add_Vectors)({ U: this.nPlane1, V: this.nPlane2 });
        // note that nSigma3_Sm is always located in the compressional quadrant of the outward hemisphere relative to each of the planes
        // i.e., the scalar product nPlane1 . nSigma3_Sm > 0
        this.nSigma3_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizeVector)(this.nSigma3_Sm);
        // nSigma1_Sm = nSigma3_Sm x nSigma2_Sm
        // The right-handed reference system is defined consistently with the convention for stress axes orientations (sigma 1, sigma 3, sigma 2)
        this.nSigma1_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct)({ U: this.nSigma3_Sm, V: this.nSigma2_Sm });
    }
    calculateSigma1_Sigma3_ObtuseAngleNormals_CF_CDSB() {
        // Method used in stress analysis for Conjugate Faults and Conjugate Dilatant Shear Bbands
        // The angle between the 2 normals > PI/2:
        // Sigma 1 and Sigma 3 are located in the plane generated by nPlane1 and nPlane2  (normal unit vectors point upward)
        // In principle Sigma 1 bisects the obtuse angle (> 90°) between the normal vectors of the conjugate planes 
        // The bisecting line nSigma1_Sm is defined by the sum of normal vectors nPlane1 + nPlane2
        this.nSigma1_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.add_Vectors)({ U: this.nPlane1, V: this.nPlane2 });
        this.nSigma1_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizeVector)(this.nSigma1_Sm);
        // nSigma3_Sm = nSigma2_Sm x nSigma1_Sm
        // The right-handed reference system is defined consistently with the convention for stress axes orientations (sigma 1, sigma 3, sigma 2)
        this.nSigma3_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct)({ U: this.nSigma2_Sm, V: this.nSigma1_Sm });
    }
}


/***/ }),

/***/ "./lib/data/CrystalFibersInVein.ts":
/*!*****************************************!*\
  !*** ./lib/data/CrystalFibersInVein.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CrystalFibersInVein": () => (/* binding */ CrystalFibersInVein)
/* harmony export */ });
/* harmony import */ var _types_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/math */ "./lib/types/math.ts");
/* harmony import */ var _ExtensionFracture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExtensionFracture */ "./lib/data/ExtensionFracture.ts");
/* harmony import */ var _types_SphericalCoords__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/SphericalCoords */ "./lib/types/SphericalCoords.ts");
/* harmony import */ var _DataDescription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DataDescription */ "./lib/data/DataDescription.ts");




/**
 * Crystal Fibers in a Vein are defined by a set of two parameters as follows:
 *      Crystal Fibers' trend: clockwise angle measured from the North direction [0, 360)
 *      Crystal Fibers' plunge: vertical angle (positive downward) between the horizontal pointing toward the trend and a line parallel to crystal fibers.
 *              In general the plunge points downward an is measured in interval [0,90] (i.e., crystal fibers plunge in the direction of the trend).
 *              Nevertheless, a negative plunge in interval (-90,0) can also be defined.
 *              Such case corresponds to the vertical angle measured upward between the horizontal pointing toward the trend and the crystal fibers.
 *
 * This class inherits not from Data but rather from ExtensionFracture.
 * This means that the check() and cost() methods are already implemented (in the right way).
 * The misfit value is calculated from the angle between vector 'normal' parallel to crystal fibers and the extensional stress axis Sigma 3.
 * 'normal' is computed through the private method CrystalFibersInVeinSphericalCoords.
 *
 * @category Data
 */
class CrystalFibersInVein extends _ExtensionFracture__WEBPACK_IMPORTED_MODULE_1__.ExtensionFracture {
    constructor() {
        super(...arguments);
        this.coordinates = new _types_SphericalCoords__WEBPACK_IMPORTED_MODULE_2__.SphericalCoords();
        this.crystal_fibers_plunge = 0;
        this.crystal_fibers_trend = 0;
    }
    /*
    description(): any {
        return {
            // Mandatory data:
            // 0, 1    = Data number, data type (Crystal Fibers in a Vein)
            // ------------------------------
            // Line orientation :
            // 9, 10 = line trend, line plunge
            mandatory: [2, 9, 10],
            // Optional data:
            // 11, 12 = Deformation phase, relative weight
            optional: [11, 12]
        }
    }
    */
    initialize(args) {
        const result = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_3__.createDataStatus)();
        const arg = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_3__.createDataArgument)();
        this.crystal_fibers_trend = _DataDescription__WEBPACK_IMPORTED_MODULE_3__.DataDescription.getParameter(arg.setIndex(9));
        this.crystal_fibers_plunge = _DataDescription__WEBPACK_IMPORTED_MODULE_3__.DataDescription.getParameter(arg.setIndex(10));
        // Hypothesis: the extensional stress Sigma 3 is parallel to the orientation of the crystal fibers (numerical models **)
        //      Let 'normal' be the unit vector that is parallel to the Crystal Fibers in a Vein
        //      Note that for stress analysis, 'normal' can be considered to be equivalent to the perpendicular vector to an Extension Fracture (which is also paralle to Sigma 3)
        // As for extension fractures, the misfit is a normalized function of the angle between unit vector 'normal' and the hypothetical stress axis Sigma 3 
        this.nPlane = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.trendPlunge2unitAxis)({ trend: this.crystal_fibers_trend, plunge: this.crystal_fibers_plunge });
        return result;
    }
}


/***/ }),

/***/ "./lib/data/Data.ts":
/*!**************************!*\
  !*** ./lib/data/Data.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Data": () => (/* binding */ Data)
/* harmony export */ });
/**
 * @brief A Data represents one and only one measure
 * @category Data
 */
class Data {
    constructor() {
        this.weight_ = 1;
        this.active_ = true;
        this.pos = [0, 0, 0];
    }
    //private userSpace_ : UserSpace = UserSpace.INVERSE
    get position() {
        return this.pos;
    }
    weight() {
        return this.weight_;
    }
    set active(a) {
        this.active = a;
    }
    get active() {
        return this.active_;
    }
    // description(): any {
    //     // return undefined
    //     throw new Error('Method does not exist anymore')
    // }
    setOptions(options) {
        return false;
    }
    nbLinkedData() {
        return 1;
    }
    /**
     * After stress inersion, get the inered data orientation/magnitude/etc for this specific Data
     */
    predict({ displ, strain, stress }) {
        return undefined;
    }
}


/***/ }),

/***/ "./lib/data/DataDescription.ts":
/*!*************************************!*\
  !*** ./lib/data/DataDescription.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataDescription": () => (/* binding */ DataDescription),
/* harmony export */   "createDataArgument": () => (/* binding */ createDataArgument),
/* harmony export */   "createDataStatus": () => (/* binding */ createDataStatus)
/* harmony export */ });
/* harmony import */ var _utils_FaultHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/FaultHelper */ "./lib/utils/FaultHelper.ts");
/* harmony import */ var _Factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Factory */ "./lib/data/Factory.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./lib/utils/index.ts");



function createDataStatus() {
    return {
        status: true,
        messages: []
    };
}
function createDataArgument(args = undefined) {
    const a = {
        toks: [],
        index: -1,
        data: undefined,
        result: { status: true, messages: [] },
        setIndex(i) { this.index = i; return this; }
    };
    if (args !== undefined) {
        a.toks = args;
        a.index = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.toInt)(args[0]);
    }
    return a;
}
function myParseFloat(v, arg) {
    const w = parseFloat(v);
    if (Number.isNaN(v)) {
        arg.result.status = false;
        arg.result.messages.push(`Data number ${arg.toks[0]}, column ${arg.index}: parameter for ${_Factory__WEBPACK_IMPORTED_MODULE_1__.DataFactory.name(arg.data)}, ${DataDescription.names[arg.index]} is not a float number (got ${arg.toks[arg.index]})`);
    }
    return w;
}
function myParseInt(v, arg) {
    const w = parseInt(v);
    if (Number.isNaN(v)) {
        arg.result.status = false;
        arg.result.messages.push(`Data number ${arg.toks[0]}, column ${arg.index}: parameter for ${_Factory__WEBPACK_IMPORTED_MODULE_1__.DataFactory.name(arg.data)}, ${DataDescription.names[arg.index]} is not a integer (got ${arg.toks[arg.index]})`);
    }
    return w;
}
function myParseTypeOfMovement(v, arg) {
    if (!(0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_0__.sensOfMovementExists)(v)) {
        arg.result.status = false;
        arg.result.messages.push(`Data number ${arg.toks[0]}, column ${arg.index}: parameter for ${_Factory__WEBPACK_IMPORTED_MODULE_1__.DataFactory.name(arg.data)}, ${DataDescription.names[arg.index]} is not a valid type of movement (got ${arg.toks[arg.index]}). Should be one of ${_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_0__.mvts}`);
    }
    return (0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_0__.getTypeOfMovementFromString)(v);
}
function myParseDirection(v, arg) {
    if (!(0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_0__.directionExists)(v)) {
        arg.result.status = false;
        arg.result.messages.push(`Data number ${arg.toks[0]}, column ${arg.index}: parameter for ${_Factory__WEBPACK_IMPORTED_MODULE_1__.DataFactory.name(arg.data)}, ${DataDescription.names[arg.index]} is not a valid geographic direction (got ${arg.toks[arg.index]}). Should be one of ${_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_0__.dirs}`);
    }
    return (0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_0__.getDirectionFromString)(v);
}
const DataDescription = {
    names: [
        'dataNumber',
        'dataType',
        'strike',
        'dip',
        'dipDirection',
        'rake',
        'strikeDirection',
        'striationTrend',
        'typeOfMovement',
        'lineTrend',
        'linePlunge',
        'deformationPhase',
        'relatedWeight',
        'minFrictionAngle',
        'maxFrictionAngle',
        'minAngleS1n',
        'maxAngleS1n',
        'beddingPlaneStrike',
        'beddingPlaneDip',
        'beddingPlaneDipDirection',
        'x',
        'y',
        'z', // 22
    ],
    type: [
        (v, arg) => myParseInt(v, arg),
        (v, arg) => v,
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseDirection(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseDirection(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseTypeOfMovement(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseInt(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => v,
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseFloat(v, arg),
        (v, arg) => myParseFloat(v, arg)
    ],
    ranges: [
        '∈ N*',
        '',
        '[0, 360[',
        '[0, 90]',
        '[N, S, E, W, NE, SE, SW, NW, UND]',
        '[0, 90]',
        '[N, S, E, W, NE, SE, SW, NW, UND]',
        '[0, 360[',
        '[N, I, RL, LL, N_RL, N_LL, I_RL, I_LL, UND]',
        '[0, 360[',
        '[0, 90]',
        '∈ N*',
        '∈ R*',
        '[0, 90[',
        '[0, 90[',
        ']0, 90[',
        ']0, 90[',
        '[0, 90]',
        '[0, 360[',
        '[0, 90]',
        '[N, S, E, W, NE, SE, SW, NW, UND]',
        '∈ R',
        '∈ R',
        '∈ R'
    ],
    checkRanges: [
        // 0
        (v) => {
            // data number
            const vv = DataDescription.type[0](v);
            return vv > 0;
        },
        // 1
        (dataType) => _Factory__WEBPACK_IMPORTED_MODULE_1__.DataFactory.exists(dataType),
        // 2
        (v) => {
            // Strike
            const vv = DataDescription.type[2](v);
            return vv >= 0 && vv < 360;
        },
        // 3
        (v) => {
            // Dip
            const vv = DataDescription.type[3](v);
            return vv >= 0 && vv <= 90;
        },
        // 4
        (v) => v !== 9 /* Direction.ERROR */,
        // 5
        (v) => {
            const vv = DataDescription.type[5](v);
            return vv >= 0 && vv <= 90;
        },
        // 6
        (v) => (0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_0__.getDirectionFromString)(v),
        // 7
        (v) => {
            const vv = DataDescription.type[7](v);
            return vv >= 0 && vv < 360;
        },
        // 8
        (v) => v !== 9 /* TypeOfMovement.ERROR */,
        // 9
        (v) => {
            const vv = DataDescription.type[9](v);
            return vv >= 0 && vv < 360;
        },
        // 10
        (v) => {
            const vv = DataDescription.type[10](v);
            return vv >= 0 && vv <= 90;
        },
        // 11
        (v) => {
            const vv = DataDescription.type[11](v);
            return vv > 0;
        },
        // 12
        (v) => {
            const vv = DataDescription.type[12](v);
            return vv >= 0;
        },
        // 13
        (v) => {
            const vv = DataDescription.type[13](v);
            return vv >= 0 && vv < 90;
        },
        // 14
        (v) => {
            const vv = DataDescription.type[14](v);
            return vv >= 0 && vv < 90;
        },
        // 15
        (v) => {
            const vv = DataDescription.type[15](v);
            return vv > 0 && vv < 90;
        },
        // 16
        (v) => {
            const vv = DataDescription.type[16](v);
            return vv > 0 && vv < 90;
        },
        // 17
        (v) => {
            // Strike
            const vv = DataDescription.type[17](v);
            return vv >= 0 && vv < 360;
        },
        // 18
        (v) => {
            // Dip
            const vv = DataDescription.type[18](v);
            return vv >= 0 && vv <= 90;
        },
        // 19
        (v) => (0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_0__.directionExists)(v),
        // 20
        (v) => {
            const vv = DataDescription.type[20](v);
            return true;
        },
        // 21
        (v) => {
            const vv = DataDescription.type[21](v);
            return true;
        },
        // 22
        (v) => {
            const vv = DataDescription.type[22](v);
            return true;
        },
    ],
    putMessage(arg) {
        arg.result.status = false;
        arg.result.messages.push(`Data number ${arg.toks[0]}: mandatory parameter for data ${_Factory__WEBPACK_IMPORTED_MODULE_1__.DataFactory.name(arg.data)}, parameter ${DataDescription.names[arg.index]} is out of range or non valid. Got ${arg.toks[arg.index]} and should be ${DataDescription.ranges[arg.index]} at index ${arg.index}`);
    },
    getParameter(arg) {
        const value = DataDescription.type[arg.index](arg.toks[arg.index], arg.result);
        if (!DataDescription.checkRanges[arg.index](value)) {
            DataDescription.putMessage(arg.toks, arg.index, arg.data, arg.result);
        }
        return value;
    }
};


/***/ }),

/***/ "./lib/data/DataParameters.ts":
/*!************************************!*\
  !*** ./lib/data/DataParameters.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./lib/data/DilationBand.ts":
/*!**********************************!*\
  !*** ./lib/data/DilationBand.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DilationBand": () => (/* binding */ DilationBand)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./lib/data/types.ts");
/* harmony import */ var _ExtensionFracture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExtensionFracture */ "./lib/data/ExtensionFracture.ts");


/**
 * @brief Represent an observed and measured joint
 *
 * A dilation band is represented by a plane. Its orientation in space is defined by three parameters, as follows:
 *      Strike: clockwise angle measured from the North direction [0, 360)
 *      Dip: vertical angle, measured downward, between the horizontal and the line of greatest slope in an inclined plane [0, 90]
 *      Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
 *
 * The cost method is inherited from ExtensionFracture as a dilation band is considered to be oriented perpendicularly to Sigma 3
 *
 * @category Data
 */
class DilationBand extends _ExtensionFracture__WEBPACK_IMPORTED_MODULE_1__.ExtensionFracture {
    constructor() {
        super(...arguments);
        this.normal = [0, 0, 0];
        this.strategy = _types__WEBPACK_IMPORTED_MODULE_0__.FractureStrategy.ANGLE;
        /*
        initialize(params: DataParameters[]): boolean {
            if (Number.isNaN(params[0].strike)) {
                throw new Error('Missing azimuth angle for dilation band')
            }
    
            if (Number.isNaN(params[0].dip)) {
                throw new Error('Missing dip angle for dilation band')
            }
    
            if (params[0].dip < 90 && params[0].dipDirection === undefined) {
                throw new Error('Missing dip direction for dilation band')
            }
    
            // Convert into normal
            this.normal = fromAnglesToNormal({
                strike: params[0].strike,
                dip: params[0].dip,
                dipDirection: getDirectionFromString(params[0].dipDirection)
            })
            
            return true
        }
        */
        /*
        check({displ, strain, stress}:{displ: Vector3, strain: Matrix3x3, stress: Matrix3x3}): boolean {
            return stress !== undefined
        }
        */
    }
}


/***/ }),

/***/ "./lib/data/ExtensionFracture.ts":
/*!***************************************!*\
  !*** ./lib/data/ExtensionFracture.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExtensionFracture": () => (/* binding */ ExtensionFracture)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _utils_fromAnglesToNormal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/fromAnglesToNormal */ "./lib/utils/fromAnglesToNormal.ts");
/* harmony import */ var _Data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Data */ "./lib/data/Data.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./lib/data/types.ts");
/* harmony import */ var _utils_PlaneHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/PlaneHelper */ "./lib/utils/PlaneHelper.ts");





/**
 * @brief Represent an observed and measured joint
 *
 * An extension fracture is represented by a  Its orientation in space is definedby three parameters, as follows:
 *      Strike: clockwise angle measured from the North direction [0, 360)
 *      Dip: vertical angle, measured downward, between the horizontal and the line of greatest slope in an inclined plane [0, 90]
 *      Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
 *
 * @category Data
 */
class ExtensionFracture extends _Data__WEBPACK_IMPORTED_MODULE_2__.Data {
    constructor() {
        super(...arguments);
        this.nPlane = undefined;
        this.strategy = _types__WEBPACK_IMPORTED_MODULE_3__.FractureStrategy.ANGLE;
    }
    /*
    description(): any {
        return {
            // Mandatory data:
            // 0, 1    =  Data number, data type (Extension Fracture and inheriting class: Dilation Band)
            // ------------------------------
            // Plane orientation :
            // 2, 3, 4 = Strike, dip, dip direction
            mandatory: [2, 3, 4],
            // Optional data:
            // 11, 12 = Deformation phase, relative weight
            optional: [11, 12]
        }
    }
    */
    initialize(args) {
        const toks = args[0];
        const plane = (0,_utils_PlaneHelper__WEBPACK_IMPORTED_MODULE_4__.decodePlane)(toks);
        // Calculate the unit vector normal to the Plane
        this.nPlane = (0,_utils_fromAnglesToNormal__WEBPACK_IMPORTED_MODULE_1__.fromAnglesToNormal)({
            strike: plane.strike,
            dip: plane.dip,
            dipDirection: plane.dipDirection
        });
        return plane.result;
    }
    check({ displ, strain, stress }) {
        return stress !== undefined;
    }
    // This version does not consider the case in which the stress shape ratio R is close to zero (i.e., Sigma 2 = Sigma 3).
    //      In this particular situation, any extension fracture containing Sigma 1 is consistent with the hypothetical stress tensor solution.
    //      In other words, the extension fracture normal is in the plane generated by (Sigma 2, Sigma 3)
    cost({ displ, strain, stress }) {
        const dot = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: stress.S3_Y, V: this.nPlane });
        switch (this.strategy) {
            case _types__WEBPACK_IMPORTED_MODULE_3__.FractureStrategy.DOT: return 1 - Math.abs(dot);
            // Sigma 1 can be oriented in two opposite directions, thus to calculate the minimum angle we take the dot product as positive.
            default: return Math.acos(Math.abs(dot)) / Math.PI;
        }
    }
}


/***/ }),

/***/ "./lib/data/Factory.ts":
/*!*****************************!*\
  !*** ./lib/data/Factory.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataFactory": () => (/* binding */ DataFactory)
/* harmony export */ });
/* harmony import */ var _ExtensionFracture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExtensionFracture */ "./lib/data/ExtensionFracture.ts");
/* harmony import */ var _StriatedPlane_Kin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StriatedPlane_Kin */ "./lib/data/StriatedPlane_Kin.ts");
/* harmony import */ var _ConjugateCompactionalShearBands__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConjugateCompactionalShearBands */ "./lib/data/ConjugateCompactionalShearBands.ts");
/* harmony import */ var _ConjugateFaults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConjugateFaults */ "./lib/data/ConjugateFaults.ts");
/* harmony import */ var _ConjugateDilatantShearBands__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConjugateDilatantShearBands */ "./lib/data/ConjugateDilatantShearBands.ts");
/* harmony import */ var _StriatedDilatantShearBand__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./StriatedDilatantShearBand */ "./lib/data/StriatedDilatantShearBand.ts");
/* harmony import */ var _NeoformedStriatedPlane__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NeoformedStriatedPlane */ "./lib/data/NeoformedStriatedPlane.ts");
/* harmony import */ var _StriatedCompactionalShearBand__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./StriatedCompactionalShearBand */ "./lib/data/StriatedCompactionalShearBand.ts");


// import { StriatedPlaneFriction1 } from './StriatedPlane_Friction1'
// import { StriatedPlaneFriction2 } from './StriatedPlane_Friction2'






/* eslint @typescript-eslint/no-explicit-any: off -- need to have any here for the factory */
var DataFactory;
(function (DataFactory) {
    const map_ = new Map();
    DataFactory.bind = (obj, name = '') => {
        name.length === 0 ? map_.set(obj.name, obj) : map_.set(name, obj);
    };
    DataFactory.create = (name, params = undefined) => {
        const M = map_.get(name);
        if (M) {
            return new M(params);
        }
        return undefined;
    };
    DataFactory.exists = (name) => {
        return map_.get(name) !== undefined;
    };
    DataFactory.names = () => {
        return Array.from(map_.keys());
    };
    DataFactory.name = (data) => {
        return data.constructor.name;
    };
})(DataFactory || (DataFactory = {}));
DataFactory.bind(_ExtensionFracture__WEBPACK_IMPORTED_MODULE_0__.ExtensionFracture, 'Extension Fracture');
DataFactory.bind(_NeoformedStriatedPlane__WEBPACK_IMPORTED_MODULE_6__.NeoformedStriatedPlane, 'Neoformed Striated Plane');
DataFactory.bind(_StriatedCompactionalShearBand__WEBPACK_IMPORTED_MODULE_7__.StriatedCompactionalShearBand, 'Striated Compactional Shear Band');
DataFactory.bind(_StriatedDilatantShearBand__WEBPACK_IMPORTED_MODULE_5__.StriatedDilatantShearBand, 'Striated Dilatant Shear Band');
DataFactory.bind(_StriatedPlane_Kin__WEBPACK_IMPORTED_MODULE_1__.StriatedPlaneKin, 'Striated Plane');
// DataFactory.bind(StriatedPlaneFriction1, 'Striated Plane Friction1')
// DataFactory.bind(StriatedPlaneFriction2, 'Striated Plane Friction2')
DataFactory.bind(_ConjugateCompactionalShearBands__WEBPACK_IMPORTED_MODULE_2__.ConjugateCompactionalShearBands, 'Conjugate Compactional Shear Bands 1');
DataFactory.bind(_ConjugateCompactionalShearBands__WEBPACK_IMPORTED_MODULE_2__.ConjugateCompactionalShearBands, 'Conjugate Compactional Shear Bands 2');
DataFactory.bind(_ConjugateDilatantShearBands__WEBPACK_IMPORTED_MODULE_4__.ConjugateDilatantShearBands, 'Conjugate Dilatant Shear Bands 1');
DataFactory.bind(_ConjugateDilatantShearBands__WEBPACK_IMPORTED_MODULE_4__.ConjugateDilatantShearBands, 'Conjugate Dilatant Shear Bands 2');
DataFactory.bind(_ConjugateFaults__WEBPACK_IMPORTED_MODULE_3__.ConjugateFaults, 'Conjugate Faults 1');
DataFactory.bind(_ConjugateFaults__WEBPACK_IMPORTED_MODULE_3__.ConjugateFaults, 'Conjugate Faults 2');
DataFactory.bind(_StriatedDilatantShearBand__WEBPACK_IMPORTED_MODULE_5__.StriatedDilatantShearBand, 'Striated Dilatant Shear Band');


/***/ }),

/***/ "./lib/data/NeoformedStriatedPlane.ts":
/*!********************************************!*\
  !*** ./lib/data/NeoformedStriatedPlane.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NeoformedStriatedPlane": () => (/* binding */ NeoformedStriatedPlane)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _Data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data */ "./lib/data/Data.ts");
/* harmony import */ var _utils_FaultHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/FaultHelper */ "./lib/utils/FaultHelper.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./lib/data/types.ts");
/* harmony import */ var _DataDescription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataDescription */ "./lib/data/DataDescription.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./lib/utils/index.ts");
/* harmony import */ var _Factory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Factory */ "./lib/data/Factory.ts");
/* harmony import */ var _io_DataReader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../io/DataReader */ "./lib/io/DataReader.ts");








/**
 * Neoformed striated plane:
 The plane of movement of a neoformed striated plane is defined by two perpendicular vectors:
    The normal to the plane and the striation.

Neoformed striated planes are defined in the input file as a striated plane.
    Optional parameters concerning the friction angle interval or the <Sigma 1,n> angular interval may be specified.

 We make the following hypotheses concerning principal stress orientations:
    a) The compressional axis Sigma 1 is located in the plane of movement:
        Its direction is inside the extensional quadrant and may be constrained by optional parameters (friction,  <Sigma 1,n>)
    b) The extensional axis Sigma 3 is located in the plane of movement:
        Its direction is inside the compressional quadrant and may be constrained by optional parameters (friction,  <Sigma 1,n>)
    c) The intermediate axis Sigma 2 is located in the fault plane and is perpendicular to the striation.

    Let Sm be the principal reference system for the stress tensor (Sigma 1, Sigma 3, Sigma 2)m obtained from the neoformed striated plane
        i.e., the three stress axes satisfy the previous hypotheses.
 
 Several data sets defining neoformed striated planes are considered:
 1) Case 1: The optional parameters concerning the friction angle interval or the <Sigma 1,n> angular interval are not specified
        In such case, the location of the striated plane in the Mohr Circle is not constrained and includes all the left quadrant of the Circle.
        In other words, angle <Sigma 1,n> is in interval [PI/4,PI/2)

 2) Case 2: The minimum and/or maximum friction angle phi are defined in interval [0, P1/2)
        The angle <Sigma 1,n> can de readily calculated from the friction angle using relation:
            <Sigma 1,n> = PI/4 + phi/2

 3) Case 3: The minimum and/or maximum <Sigma 1,n> angular interval are defined
 
 The geometry and kinematics of the Neoformed striated plane are defined:
    a) Each plane is defined by a set of 3 parameters, as follows:
        Fault strike: clockwise angle measured from the North direction [0, 360)
        Fault dip: [0, 90]
        Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
    b) The striation can be defined in two different ways:
        I   Rake:
            Strike direction:
        II  Striation trend:
    c) The sense of mouvement is indicated for each fault plane:
        For verification purposes, it is recommended to indicate both the dip-slip and strike-slip compoenents, when possible.
          Dip-slip component:
              N = Normal fault,
              I = Inverse fault or thrust
          Strike-slip component:
              RL = Right-Lateral fault
              LL = Left-Lateral fault
          Undefined (the most compatible type of movement is selected **):
            UND
        Sense of mouvement: N, I, RL, LL, N-RL, N-LL, I-RL, I-LL, UND

 * @category Data
 */
class NeoformedStriatedPlane extends _Data__WEBPACK_IMPORTED_MODULE_1__.Data {
    constructor() {
        super(...arguments);
        this.plane = false;
        this.nPlane = undefined;
        this.nStriation = undefined;
        this.pos = undefined;
        this.problemType = _types__WEBPACK_IMPORTED_MODULE_3__.StriatedPlaneProblemType.DYNAMIC;
        this.strategy = _types__WEBPACK_IMPORTED_MODULE_3__.FractureStrategy.ANGLE;
        this.oriented = true;
        this.EPS = 1e-7;
        this.deltaTheta1_Sm = 0;
        this.Mrot = [(0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)(), (0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)(), (0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)()];
        this.noPlane = 0;
        // The friction angle of the neoformed striated plane is defined in interval < frictionAngleMin, frictionAngleMax > in Data file
        this.frictionAngleInterval = undefined;
        this.frictionAngleMin = undefined;
        this.frictionAngleMax = undefined;
        // The angle < nSigma1,nPlane> is defined in interval < nSigma1_nPlane_AngleMin, nSigma1_nPlane_AngleMax > in Data file
        this.nSigma1_nPlane_AngleInterval = undefined;
        this.nSigma1_nPlane_AngleMin = undefined;
        this.nSigma1_nPlane_AngleMax = undefined;
    }
    /*
        // Mandatory data:
        // 0, 1    = Data number, data type (Neoformed Striated Plane)
        // -----------------------------
        // Plane orientation :
        // 2, 3, 4 = Strike, dip, dip direction
        // Striation :
        // 5, 6 = Rake, strike direction
        // 7    = Striation trend (optional **)
        mandatory: [2, 3, 4],
        // Optional data:
        // 8      = Type of movement
        // 11, 12 = Deformation phase, relative weight
        // 13, 14 = Minimum friction angle phi_min, minimum friction angle phi_max (one or both may de defined **)
        // 15, 16 = Minimum angle <Sigma 1, nPlane>, maximum angle <Sigma 1, nPlane> (one or both may de defined **)
        optional: [8, 11, 12, 15, 16]
    */
    initialize(args) {
        const toks = args[0];
        let result = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_4__.createDataStatus)();
        const arg = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_4__.createDataArgument)();
        // -----------------------------------
        // Read parameters definning plane orientation, striation orientation and type of movement
        const plane = (0,_types__WEBPACK_IMPORTED_MODULE_3__.createPlane)();
        const striation = (0,_types__WEBPACK_IMPORTED_MODULE_3__.createStriation)();
        const ruptureFricAngle = (0,_types__WEBPACK_IMPORTED_MODULE_3__.createRuptureFrictionAngles)();
        const sigma1_nPlane = (0,_types__WEBPACK_IMPORTED_MODULE_3__.createSigma1_nPlaneAngle)();
        (0,_io_DataReader__WEBPACK_IMPORTED_MODULE_7__.readStriatedFaultPlane)(arg, plane, striation, result);
        // -----------------------------------
        // Read parameters defining the angular interval for friction of for the angle between Sigma 1 and the plane normal <Sigma 1, nPlane>
        (0,_io_DataReader__WEBPACK_IMPORTED_MODULE_7__.readFrictionAngleInterval)(arg, ruptureFricAngle, result);
        // -----------------------------------
        // Read parameters defining the angular interval for <Sigma 1, nPlane> of the point associated with the fault plane in the Mohr Circle (Sigma_1, Sigma_3)/
        if (!this.frictionAngleInterval) {
            (0,_io_DataReader__WEBPACK_IMPORTED_MODULE_7__.readSigma1nPlaneInterval)(arg, sigma1_nPlane, result);
        }
        else if ((0,_utils__WEBPACK_IMPORTED_MODULE_5__.isDefined)(toks[15]) || (0,_utils__WEBPACK_IMPORTED_MODULE_5__.isDefined)(toks[16])) {
            result.status = false;
            result.messages.push(`Data number ${toks[0]}, columns 13 to 16: parameter for ${_Factory__WEBPACK_IMPORTED_MODULE_6__.DataFactory.name(this)}, define either friction angles (cols 13 and 14) or <Sigma 1, nPlane> angles (cols 15 and 15), but not both`);
        }
        // -----------------------------------
        // Check that nPlane and nStriation are unit vectors
        const f = _utils_FaultHelper__WEBPACK_IMPORTED_MODULE_2__.FaultHelper.create(plane, striation);
        this.nPlane = f.normal;
        this.nStriation = f.striation;
        this.nPerpStriation = f.e_perp_striation;
        this.noPlane = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.toInt)(toks[0]);
        // Check orthogonality
        const sp = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: this.nPlane, V: this.nStriation });
        if (Math.abs(sp) > this.EPS) {
            throw new Error(`striation is not on the fault plane. Dot product with normal vector gives ${sp}`);
        }
        // The data definning the Neoformed Striated Plane are defined correctly
        this.plane = true; // **
        // Calculate:
        // nSigma1_Sm_Mean = unit vector Sigma 1 defined in reference system Sm, whose location in the Mohr Circle is centred around the valid angular interval.
        // deltaTheta1_Sm = angle between nSigma1_Sm_Mean and the stress axis located at the boundaries of the Mohr circle angular interval.
        this.nSigma1_Sm_Mean_deltaTheta1_Sm_MohrCircle();
        // Calculate three rotation tensors from the geographic reference system to the micro/meso structure reference system (i.e., from S to Sm).
        // Reference systems Sm are associated with three significant points in the Mohr-Circle angular interval linked to the micro/meso structure :
        //      Points are located at the minimum, intermediate and maximum angle relative to Sigma_1_Sm
        this.rotationTensors_S2Sm_Mrot();
        return result;
    }
    check({ displ, strain, stress }) {
        if (this.problemType === _types__WEBPACK_IMPORTED_MODULE_3__.StriatedPlaneProblemType.DYNAMIC) {
            return stress !== undefined;
        }
        return displ !== undefined;
    }
    cost({ displ, strain, stress }) {
        if (this.problemType === _types__WEBPACK_IMPORTED_MODULE_3__.StriatedPlaneProblemType.DYNAMIC) {
            // We define 3 orthonormal right-handed reference systems:
            //      S =  (X, Y, Z ) is the geographic reference frame oriented in (East, North, Up) directions.
            //      Sm = (Xm,Ym,Zm) is the principal stress reference frame parallel to the stress axes, 
            //              defined in terms of the micro/meso structure, e.g., the neoformed striated plane (sigma1_Sm, sigma3_Sm, sigma2_Sm);
            //      Sh = (Xh,Yh,Zh) is the principal stress reference frame parallel to the stress axes, 
            //              defined from the hypothetical stress tensor solution, e.g., from grid search or Montecarlo (sigma1_Sh, sigma3_Sh, sigma2_Sh);
            // Sh is defined by Sr or Sw reference systems:
            //      Sr  =  (Xr, Yr, Zr ) is the principal reference frame chosen by the user in the interactive search phase ('r' stands for 'rough' solution).
            //      Sw =  (Xw, Yw, Zw ) is the principal reference frame for a fixed node in the search grid (sigma_1, sigma_3, sigma_2) ('w' stands for 'winning' solution)
            // The cost method implements two rotation tensors termed Mrot[i] and Hrot, defined in terms of reference frames Sm and Sh:
            // Mrot[i] is is the transformation matrix between S and Sm ('M' stands for micro/meso structure), such that:
            //      Vm = Mrot[i]  V      where V and Vm are corresponding vectors in S and Sm
            //      V  = MTrot[i] Vm       (MTrot is tensor Mrot transposed)
            // Mrot[i] is calculated only once, when initializing the neoformed striated plane **
            // Hrot is is the transformation matrix between S and Sh ('H' sand 'h' stand for 'hypothetical' solution), such that:
            //      Vh = Hrot[i]  V      where V and Vh are corresponding vectors in S and Sh
            //      V  = HTrot[i] Vh     (HTrot is tensor Hrot transposed)
            // Hrot is is defined either by Rrot or by Wrot, depending on the calling functions:
            //      Hrot = Rrot in the interactive search phase using integral curves
            //      Hrot = Wrot in the inverse method search phase using Montecarlo (for example)
            // Rotation tensors Rrot and RTrot between systems S and Sr are such that:
            //      Vr = Rrot  V
            //      V  = RTrot Vr        (RTrot is tensor Rrot transposed)
            // Rotation tensors Wrot and WTrot between systems S and Sw satisfy : WTrot = RTrot DTrot, such that:
            //      Vw = Wrot  V
            //      V  = WTrot Vw        (WTrot is tensor Wrot transposed)
            let Omega;
            let nOmega;
            if (this.plane) { // **
                // The neoformed striated plane is defined correctly (c.f. initialize method)
                // nSigma1_Sh, nSigma2_Sh, nSigma3_Sh = Unit vectors parallel to principal stress axes in hypothetical reference system Sh
                const nSigma1_Sh = stress.S1_X;
                const nSigma2_Sh = stress.S2_Z;
                // nSigma2_Sh_X_nSigma2_Sm = rotation axis between the stress axes nSigma2_Sh and nSigma2_Sm defined by the cross product of two unit vectors
                let nSigma2_Sh_X_nSigma2_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.crossProduct)({ U: nSigma2_Sh, V: this.nSigma2_Sm });
                // The magnitude of two unit vectors is sin(Omega), where Omega is the angle between the unit vectors 
                let Mag_nSigma2_Sh_X_nSigma2_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.vectorMagnitude)(nSigma2_Sh_X_nSigma2_Sm);
                let nSigma1_Sh_Rot = undefined;
                if (Mag_nSigma2_Sh_X_nSigma2_Sm > this.EPS) {
                    // unit vectors nSigma2_Sh and nSigma2_Sm are not parallel (i.e., the stress axes are not aligned)
                    // nOmega = unitary rotation axis 
                    nOmega = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizeVector)(nSigma2_Sh_X_nSigma2_Sm, Mag_nSigma2_Sh_X_nSigma2_Sm);
                    // Omega = Positive (anticlockwise) rotation angle between vectors nSigma2_Sh and nSigma2_Sm - in interval (0,PI)
                    // Note that acos(x) gives an angle in interval [0,PI]
                    Omega = Math.acos((0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProduct)({ U: nSigma2_Sh, V: this.nSigma2_Sm }));
                    let Prot = undefined;
                    if (Omega <= Math.PI / 2) {
                        // Omega is the minimum rotation angle such that stress axis nSigma2_Sh is transformed into nSigma2_Sm:
                        // Calculate the proper rotation matrix Prot such that :
                        //      nSigma2_Sm = Prot nSigma2_Sh 
                        Prot = (0,_types__WEBPACK_IMPORTED_MODULE_0__.properRotationTensor)({ nRot: nOmega, angle: Omega });
                    }
                    else {
                        // Omega is in interval (PI / 2, PI). In this situation:
                        //      The minimum rotation is given by the complementary angle : PI - Omega
                        //      The axis of rotation is : - nOmega
                        // Note that, for an arbitrary axis (e.g., nSigma1_Sh), a rotation of Omega around axis nOmega 
                        //      is not equivalent to a rotation (PI - Omega() around axis (- nOmega)
                        // Calculate the proper rotation matrix PR such that :
                        //      Prot nSigma2_Sh = - nSigma2_Sm
                        Prot = (0,_types__WEBPACK_IMPORTED_MODULE_0__.properRotationTensor)({ nRot: (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: nOmega }), angle: Math.PI - Omega });
                    }
                    // nSigma1_Sh_Rot = image of hypothetical stress axis nSigma1_Sh obtained from proper rotation matrix
                    //          nSigma1_Sh_Rot is in the plane of mouvement ot the neoformed striated plane
                    nSigma1_Sh_Rot = (0,_types__WEBPACK_IMPORTED_MODULE_0__.tensor_x_Vector)({ T: Prot, V: nSigma1_Sh });
                }
                else {
                    // unit vectors nSigma2_Sh and nSigma2_Sm are aligned; thus the rotation angle is zero
                    Omega = 0;
                    nSigma1_Sh_Rot = nSigma1_Sh;
                }
                // Calculate if nSigma1_Sh_Rot is located in the valid Mohr-Circle angular interval
                // sigma1_Sm_Mean = Mean orientation of unit vector nSigma1_Sm corresponding to a point centred in the valid Mohr-Circle angular interval.
                //      This value is calculated in method nSigma1_Sm_Mean_deltaTheta1_Sm_MohrCircle
                // sigma1_Sm_Mean . nSigma1_Sh_Rot = cos(alpha) where alpha = minimum angle between the two stress axes
                //      Note that if the scalar product is negative (e.g. PI/2 < alpha <= PI ) then the minimum angle is given by PI - alpha
                //      This situation is considered by taking the absolute value of the scalar product:
                const angle_nSigma1_Sm_Mean_nSigma1_Sh_Rot = Math.acos(Math.abs((0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProduct)({ U: this.nSigma1_Sm_Mean, V: nSigma1_Sh_Rot })));
                if (angle_nSigma1_Sm_Mean_nSigma1_Sh_Rot <= this.deltaTheta1_Sm) {
                    // The stress axis nSigma1_Sh_Rot is located within the Mohr Circle angular interval
                    //      deltaTheta1_Sm = angle between sigma1_Sm_Mean and the stress axis located at the boundaries of the Mohr circle angular interval.
                    // Thus, the minimum rotation angle Omega defines the misfit between the hypothetical stress tensor (sigma1_Sh, sigma3_Sh, sigma2_Sh)
                    //      and a stress tensor (sigma1_Sm, sigma3_Sm, sigma2_Sm) consistent with the micro/meso structure kinematics (e.g., the neoformed striated plane)
                    return Omega;
                }
                else {
                    // The stress axis nSigma1_Sh_Rot is NOT located at an angle within the valid Mohr Circle Angular Interval (MCAI):
                    //       [nSigma1_Sm_Mean - deltaTheta1_Sm, nSigma1_Sm_Mean + deltaTheta1_Sm]
                    // Thus we shall examine 3 points of the Mohr Circle angular interval, in order to determine the minimum rotation 
                    //      between principal stress axes (sigma1_Sh, sigma3_Sh, sigma2_Sh) and (sigma1_Sm, sigma3_Sm, sigma2_Sm)
                    const OmegaMC = [0, 0, 0];
                    const MrotHTrot = [(0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)(), (0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)(), (0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)()];
                    for (let i = 0; i < 3; i++) {
                        // The cost function for a micro/meso structure is defined as the minimum angular rotation between reference systems Sh and Sm(i(), where:
                        //      Sh is defined according to the hypothetical stress tensor solution ('h' stands for hypothetical);
                        //      Sm(i) is defined according to the micro/meso structure stress tensors Mrot[i] ('m' an 'M' stand for micro/meso structure).
                        // The rotation tensor MrotHTrot between systems Sh and Sm is such that: Vm = MrotHTrot Vh (where Vh is defined in Sr or Sw), 
                        //      where MrotHTrot = Mrot . HTrot (HTrot = Hrot transposed):
                        MrotHTrot[i] = (0,_types__WEBPACK_IMPORTED_MODULE_0__.multiplyTensors)({ A: this.Mrot[i], B: (0,_types__WEBPACK_IMPORTED_MODULE_0__.transposeTensor)(stress.Hrot) });
                        // The angle of rotation associated to tensor MrotHTrot is defined by the trace tr(MrotHTrot), according to the relation:
                        //      tr(MrotHTrot) = 1 + 2 cos(theta)
                        // 4 possible right-handed reference systems are considered for MrotHTrot in order to calculate the minimum rotation angle
                        OmegaMC[i] = (0,_types__WEBPACK_IMPORTED_MODULE_0__.minRotAngleRotationTensor)(MrotHTrot[i]);
                    }
                    // Calculate the minimum rotation angle between reference systems Sh and Sm(i) (i = 0,1,2 )
                    const misfit = Math.min(...OmegaMC);
                    if (misfit === OmegaMC[1]) {
                        throw new Error('The minimum rotation angle for neoformed striated plane ' + this.noPlane + ' corresponds to the middle point in the Mohr circle'
                            + ' Thus the rotation angle is not a simple monotonic function!');
                    }
                }
            }
        }
    }
    nSigma1_Sm_Mean_deltaTheta1_Sm_MohrCircle() {
        // This method calculates vector sigma1_Sm_Mean and deltaTheta1_Sm such that:
        //      nSigma1_Sm_Mean = unit vector Sigma 1 defined in reference system Sm, whose location in the Mohr Circle is centred in the valid angular interval.
        //      deltaTheta1_Sm = angle between sigma1_Sm_Mean and the stress axis located at the boundaries of the Mohr circle angular interval.
        if (this.nSigma1_nPlane_AngleInterval) {
            // Case 3: The  <Sigma 1,n> angular interval is defined:
            //  The angle between nSigma1_Sm and the normal to the fault plane is constrained within interval [nSigma1_nPlane_AngleMin, nSigma1_nPlane_AngleMax]
            this.angleMean_nSigma1_Sm_nPlane = (this.nSigma1_nPlane_AngleMin + this.nSigma1_nPlane_AngleMax) / 2;
            this.deltaTheta1_Sm = (this.nSigma1_nPlane_AngleMax - this.nSigma1_nPlane_AngleMin) / 2;
        }
        else if (this.frictionAngleInterval) {
            // A specific friction angle interval is defined for the neoformed striated plane. Thus, 
            // Case 2: The friction angle phi is defined in interval [frictionAngleMin, frictionAngleMax]. Both friction angles belong to interval [0,PI/2)
            //      The angle <Sigma 1,n> can de readily calculated from the friction angle using relation:
            //      <Sigma 1,n> = PI/4 + phi/2
            this.angleMean_nSigma1_Sm_nPlane = (Math.PI + this.frictionAngleMin + this.frictionAngleMax) / 4;
            this.deltaTheta1_Sm = (this.frictionAngleMax - this.frictionAngleMin) / 4;
        }
        else {
            // Case 1: The optional parameters concerning the friction angle interval or the <Sigma 1,n> angular interval are not specified
            // In such case, the location of the striated plane in the Mohr Circle is not constrained and includes all the left quadrant of the Circle.
            // In other words, angle <Sigma 1,n> is in interval [PI/4,PI/2)
            this.angleMean_nSigma1_Sm_nPlane = 3 * Math.PI / 8; // 67.5°
            this.deltaTheta1_Sm = Math.PI / 8; // 22.5°
        }
        // nSigma1_Sm_Mean is in the extensional quadrant of the plane of movement, and is define by:
        //      nSigma1_Sm_Mean = cos(angleMean_nSigma1_Sm_nPlane) nPlane - sin(angleMean_nSigma1_Sm_nPlane) nStriation
        this.nSigma1_Sm_Mean = (0,_types__WEBPACK_IMPORTED_MODULE_0__.add_Vectors)({
            U: (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: Math.cos(this.angleMean_nSigma1_Sm_nPlane), V: this.nPlane }),
            V: (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -Math.sin(this.angleMean_nSigma1_Sm_nPlane), V: this.nStriation })
        });
    }
    rotationTensors_S2Sm_Mrot() {
        // This method calculates the 3 rotation matrixes Mrot[i] between the geographic reference system S = (X, Y, Z)
        // and the reference systems Sm = (Xm, Ym, Zm) associated to the micro/meso structure (e.g., neoformed striated plane, such that:
        //      Vm = Mrot[i] . V        where V and Vm are corresponding vectors in reference systems S and Sm
        // Sm is defined according to index i (1, 2, and 3), which represents a specific point in the Mohr-Circle angular interval.
        // Calculate the unit vector parellel to Sigma2_Sm, which is perpendicular to nPlane and nStriation:
        this.nSigma2_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct)({ U: this.nPlane, V: this.nStriation });
        // Firstly, we calculate the angles defining 3 points of the valid Mohr Circle angular interval (MCAI):
        // angle_nPlane_nSigma1_Sm[i] = angle between the normal to the plane and the stress axis sigma1_Sm for 3 points located in the MCAI:
        let angle_nPlane_nSigma1_Sm = [];
        // Minimum angle in the interval
        angle_nPlane_nSigma1_Sm[0] = this.angleMean_nSigma1_Sm_nPlane - this.deltaTheta1_Sm;
        // Middle point
        angle_nPlane_nSigma1_Sm[1] = this.angleMean_nSigma1_Sm_nPlane;
        // Maximum angle in the interval
        angle_nPlane_nSigma1_Sm[2] = this.angleMean_nSigma1_Sm_nPlane + this.deltaTheta1_Sm;
        for (let i = 0; i < 3; i++) {
            // Loop for calculating the transformation matrixes Mrot[i]
            // sigma1_Sm is defined in the plane of movement (dilatant quadrant) in terms of angle angle_nPlane_nSigma1_Sm[i]
            this.nSigma1_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.add_Vectors)({
                U: (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: Math.cos(angle_nPlane_nSigma1_Sm[i]), V: this.nPlane }),
                V: (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -Math.sin(angle_nPlane_nSigma1_Sm[i]), V: this.nStriation })
            });
            // The micro/meso structure stress tensor  (sigma1_Sm, sigma3_Sm, sigma2_Sm) is right handed: 
            this.nSigma3_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.crossProduct)({ U: this.nSigma2_Sm, V: this.nSigma1_Sm });
            // Mrot[i] = rotation matrixes for the micro/meso structure reference systems (sigma1_Sm, sigma3_Sm, sigma2_Sm) corresponding to the 3 points in the
            //          Mohr-Circle angular interval. The micro/meso structure is defined according to the data type (i.e., the neoformed striated plane):
            //      Vm = Mrot[i] . V
            // where V and Vm are corresponding vectors in reference systems S and Sm
            // Mrot[i] is an array containing 3x3 matrices
            this.Mrot[i] = (0,_types__WEBPACK_IMPORTED_MODULE_0__.rotationTensor_Sa_Sb)({ Xb: this.nSigma1_Sm, Yb: this.nSigma3_Sm, Zb: this.nSigma2_Sm });
        }
    }
}


/***/ }),

/***/ "./lib/data/StriatedCompactionalShearBand.ts":
/*!***************************************************!*\
  !*** ./lib/data/StriatedCompactionalShearBand.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StriatedCompactionalShearBand": () => (/* binding */ StriatedCompactionalShearBand)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _utils_FaultHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/FaultHelper */ "./lib/utils/FaultHelper.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./lib/data/types.ts");
/* harmony import */ var _DataDescription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DataDescription */ "./lib/data/DataDescription.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./lib/utils/index.ts");
/* harmony import */ var _NeoformedStriatedPlane__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NeoformedStriatedPlane */ "./lib/data/NeoformedStriatedPlane.ts");
/* harmony import */ var _io_DataReader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../io/DataReader */ "./lib/io/DataReader.ts");







/**
* Striated Compactional Shear Band

Striated Compactional Shear Bands are neoformed planar structures observed specifically in granular porous rocks such as sandstones.
Their formation is linked with grain-breakage processes in the Cap of the yield strength envelope.

The plane of movement of a Striated Compactional Shear Band is defined by two perpendicular vectors:
The normal to the plane and the striation.

Striated Compactional Shear Bands are defined in the input file as a striated plane.
Optional parameters concerning the friction angle interval or the <Sigma 1,n> angular interval may be specified.

We make the following hypotheses concerning principal stress orientations:
a) The compressional axis Sigma 1 is located in the plane of movement:
    Its direction is inside the extensional quadrant and may be constrained by optional parameters (<Sigma 1,n> minimum and maximum)
b) The extensional axis Sigma 3 is located in the plane of movement:
    Its direction is inside the compressional quadrant and may be constrained by optional parameters (<Sigma 1,n> minimum and maximum)
c) The intermediate axis Sigma 2 is located in the fault plane and is perpendicular to the striation.

Let Sm be the principal reference system for the stress tensor (Sigma 1, Sigma 3, Sigma 2)m obtained from the Striated Compactional Shear Band
    i.e., the three stress axes satisfy the previous hypotheses.

Several data sets defining neoformed striated planes are considered:
1) Case 1: The optional parameters concerning the <Sigma 1,n> angular interval are not specified
    In such case, the location of the striated plane in the Mohr Circle is not constrained and includes all the left quadrant of the Circle.
    In other words, angle <Sigma 1,n> is in interval (0,PI/4]

3) Case 3: The minimum and/or maximum <Sigma 1,n> angular interval are defined in interval (0,PI/4]

The geometry and kinematics of the Striated Compactional Shear Band are defined:
a) Each plane is defined by a set of 3 parameters, as follows:
    Fault strike: clockwise angle measured from the North direction [0, 360)
    Fault dip: [0, 90]
    Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
b) The sense of mouvement is indicated for each fault plane:
    For verification purposes, it is recommended to indicate both the dip-slip and strike-slip compoenents, when possible.
      Dip-slip component:
          N = Normal fault,
          I = Inverse fault or thrust
      Strike-slip component:
          RL = Right-Lateral fault
          LL = Left-Lateral fault
      Undefined (the most compatible type of movement is selected **):
        UND
    Sense of mouvement: N, I, RL, LL, N-RL, N-LL, I-RL, I-LL, UND

* @category Data
*/
class StriatedCompactionalShearBand extends _NeoformedStriatedPlane__WEBPACK_IMPORTED_MODULE_5__.NeoformedStriatedPlane {
    initialize(args) {
        const toks = args[0];
        const result = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_3__.createDataStatus)();
        const arg = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_3__.createDataArgument)();
        // -----------------------------------
        // Read parameters definning plane orientation, striation orientation and type of movement
        const plane = (0,_types__WEBPACK_IMPORTED_MODULE_2__.createPlane)();
        const striation = (0,_types__WEBPACK_IMPORTED_MODULE_2__.createStriation)();
        (0,_io_DataReader__WEBPACK_IMPORTED_MODULE_6__.readStriatedFaultPlane)(arg, plane, striation, result);
        // -----------------------------------
        // 15, 16 = Minimum angle <Sigma 1, nPlane>, maximum angle <Sigma 1, nPlane> (one or both may de defined **)
        //      Default values are set in class NeoformedStriatedPlane: nSigma1_nPlane_AngleMin = 45, nSigma1_nPlane_AngleMax = 90
        // -----------------------------------
        // Read parameters defining the angular interval for <Sigma 1, nPlane> of the point associated with the fault plane in the Mohr Circle (Sigma_1, Sigma_3)/
        const sigma1_nPlane = (0,_types__WEBPACK_IMPORTED_MODULE_2__.createSigma1_nPlaneAngle)();
        (0,_io_DataReader__WEBPACK_IMPORTED_MODULE_6__.readSigma1nPlaneInterval)(arg, sigma1_nPlane, result);
        // -----------------------------------
        // Check that nPlane and nStriation are unit vectors
        const f = _utils_FaultHelper__WEBPACK_IMPORTED_MODULE_1__.FaultHelper.create(plane, striation);
        this.nPlane = f.normal;
        this.nStriation = f.striation;
        this.nPerpStriation = f.e_perp_striation;
        this.noPlane = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.toInt)(toks[0]);
        // Check orthogonality
        const sp = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: this.nPlane, V: this.nStriation });
        if (Math.abs(sp) > this.EPS) {
            throw new Error(`striation is not on the fault plane. Dot product with normal vector gives ${sp}`);
        }
        // Calculate:
        // nSigma1_Sm_Mean = unit vector Sigma 1 defined in reference system Sm, whose location in the Mohr Circle is centred around the valid angular interval.
        // deltaTheta1_Sm = angle between nSigma1_Sm_Mean and the stress axis located at the boundaries of the Mohr circle angular interval.
        this.nSigma1_Sm_Mean_deltaTheta1_Sm_MohrCircle();
        // Calculate three rotation tensors from the geographic reference system to the micro/meso structure reference system (i.e., from S to Sm).
        // Reference systems Sm are associated with three significant points in the Mohr-Circle angular interval linked to the micro/meso structure :
        //      Points are located at the minimum, intermediate and maximum angle relative to Sigma_1_Sm
        this.rotationTensors_S2Sm_Mrot();
        return result;
    }
    getMapDirection(s) {
        if (!(0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_1__.directionExists)(s)) {
            throw new Error(`Direction ${s} is not defined (or incorrectly defined)`);
        }
        return (0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_1__.getDirectionFromString)(s);
    }
    getTypeOfMovement(s) {
        if (!(0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_1__.sensOfMovementExists)(s)) {
            throw new Error(`Sens of movement ${s} is not defined (or incorrectly defined)`);
        }
        return (0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_1__.getTypeOfMovementFromString)(s);
    }
    check({ displ, strain, stress }) {
        if (this.problemType === _types__WEBPACK_IMPORTED_MODULE_2__.StriatedPlaneProblemType.DYNAMIC) {
            return stress !== undefined;
        }
        return displ !== undefined;
    }
    cost({ displ, strain, stress }) {
        if (this.problemType === _types__WEBPACK_IMPORTED_MODULE_2__.StriatedPlaneProblemType.DYNAMIC) {
            // We define 3 orthonormal right-handed reference systems:
            //      S =  (X, Y, Z ) is the geographic reference frame oriented in (East, North, Up) directions.
            //      Sm = (Xm,Ym,Zm) is the principal stress reference frame parallel to the stress axes, 
            //              defined in terms of the micro/meso structure, e.g., the Striated Compactional Shear Band (sigma1_Sm, sigma3_Sm, sigma2_Sm);
            //      Sh = (Xh,Yh,Zh) is the principal stress reference frame parallel to the stress axes, 
            //              defined from the hypothetical stress tensor solution, e.g., from grid search or Montecarlo (sigma1_Sh, sigma3_Sh, sigma2_Sh);
            // Sh is defined by Sr or Sw reference systems:
            //      Sr  =  (Xr, Yr, Zr ) is the principal reference frame chosen by the user in the interactive search phase ('r' stands for 'rough' solution).
            //      Sw =  (Xw, Yw, Zw ) is the principal reference frame for a fixed node in the search grid (sigma_1, sigma_3, sigma_2) ('w' stands for 'winning' solution)
            // The cost method implements two rotation tensors termed Mrot[i] and Hrot, defined in terms of reference frames Sm and Sh:
            // Mrot[i] is is the transformation matrix between S and Sm ('M' stands for micro/meso structure), such that:
            //      Vm = Mrot[i]  V      where V and Vm are corresponding vectors in S and Sm
            //      V  = MTrot[i] Vm       (MTrot is tensor Mrot transposed)
            // Mrot[i] is calculated only once, when initializing the Striated Compactional Shear Band **
            // Hrot is is defined either by Rrot or by Wrot, depending on the calling functions:
            //      Hrot = Rrot in the interactive search phase using integral curves
            //      Hrot = Wrot in the inverse method search phase using Montecarlo (for example)
            // Rotation tensors Rrot and RTrot between systems S and Sr are such that:
            //      Vr = Rrot  V
            //      V  = RTrot Vr        (RTrot is tensor Rrot transposed)
            // Rotation tensors Wrot and WTrot between systems S and Sw satisfy : WTrot = RTrot DTrot, such that:
            //      Vw = Wrot  V
            //      V   = WTrot Vw        (WTrot is tensor Wrot transposed)
            let Omega;
            let nOmega;
            const hStress = stress;
            if (this.plane) {
                // The Striated Compactional Shear Band is defined (strike, dip and dipDirection)
                // nSigma1_Sh, nSigma2_Sh, nSigma3_Sh = Unit vectors parallel to principal stress axes in hypothetical reference system Sh
                const nSigma1_Sh = hStress.S1_X;
                const nSigma2_Sh = hStress.S2_Z;
                // nSigma2_Sh_X_nSigma2_Sm = rotation axis between the stress axes nSigma2_Sh and nSigma2_Sm defined by the cross product of two unit vectors
                let nSigma2_Sh_X_nSigma2_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.crossProduct)({ U: nSigma2_Sh, V: this.nSigma2_Sm });
                // The magnitude of two unit vectors is sin(Omega), where Omega is the angle between the unit vectors 
                let Mag_nSigma2_Sh_X_nSigma2_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.vectorMagnitude)(nSigma2_Sh_X_nSigma2_Sm);
                let nSigma1_Sh_Rot = undefined;
                if (Mag_nSigma2_Sh_X_nSigma2_Sm > this.EPS) {
                    // unit vectors nSigma2_Sh and nSigma2_Sm are not parallel (i.e., the stress axes are not aligned)
                    // nOmega = unitary rotation axis 
                    nOmega = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizeVector)(nSigma2_Sh_X_nSigma2_Sm, Mag_nSigma2_Sh_X_nSigma2_Sm);
                    // Omega = Positive (anticlockwise) rotation angle between vectors nSigma2_Sh and nSigma2_Sm - in interval (0,PI)
                    // Note that acos(x) gives an angle in interval [0,PI]
                    Omega = Math.acos((0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProduct)({ U: nSigma2_Sh, V: this.nSigma2_Sm }));
                    let Prot = undefined;
                    if (Omega <= Math.PI / 2) {
                        // Omega is the minimum rotation angle such that stress axis nSigma2_Sh is transformed into nSigma2_Sm:
                        // Calculate the proper rotation matrix Prot such that :
                        //      nSigma2_Sm = Prot nSigma2_Sh 
                        Prot = (0,_types__WEBPACK_IMPORTED_MODULE_0__.properRotationTensor)({ nRot: nOmega, angle: Omega });
                    }
                    else {
                        // Omega is in interval (PI / 2, PI). In this situation:
                        //      The minimum rotation is given by the complementary angle : PI - Omega
                        //      The axis of rotation is : - nOmega
                        // Note that, for an arbitrary axis (e.g., nSigma1_Sh), a rotation of Omega around axis nOmega 
                        //      is not equivalent to a rotation (PI - Omega() around axis (- nOmega)
                        // Calculate the proper rotation matrix PR such that :
                        //      Prot nSigma2_Sh = - nSigma2_Sm
                        Prot = (0,_types__WEBPACK_IMPORTED_MODULE_0__.properRotationTensor)({ nRot: (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: nOmega }), angle: Math.PI - Omega });
                    }
                    // nSigma1_Sh_Rot = image of hypothetical stress axis nSigma1_Sh obtained from proper rotation matrix
                    //          nSigma1_Sh_Rot is in the plane of mouvement ot the Striated Compactional Shear Band
                    nSigma1_Sh_Rot = (0,_types__WEBPACK_IMPORTED_MODULE_0__.tensor_x_Vector)({ T: Prot, V: nSigma1_Sh });
                }
                else {
                    // unit vectors nSigma2_Sh and nSigma2_Sm are aligned; thus the rotation angle is zero
                    Omega = 0;
                    nSigma1_Sh_Rot = nSigma1_Sh;
                }
                // Calculate if nSigma1_Sh_Rot is located in the valid Mohr-Circle angular interval
                // sigma1_Sm_Mean = Mean orientation of unit vector nSigma1_Sm corresponding to a point centred in the valid Mohr-Circle angular interval.
                //      This value is calculated in method nSigma1_Sm_Mean_deltaTheta1_Sm_MohrCircle
                // sigma1_Sm_Mean . nSigma1_Sh_Rot = cos(alpha) where alpha = minimum angle between the two stress axes
                //      Note that if the scalar product is negative (e.g. PI/2 < alpha <= PI ) then the minimum angle is given by PI - alpha
                //      This situation is considered by taking the absolute value of the scalar product:
                const angle_nSigma1_Sm_Mean_nSigma1_Sh_Rot = Math.acos(Math.abs((0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProduct)({ U: this.nSigma1_Sm_Mean, V: nSigma1_Sh_Rot })));
                if (angle_nSigma1_Sm_Mean_nSigma1_Sh_Rot <= this.deltaTheta1_Sm) {
                    // The stress axis nSigma1_Sh_Rot is located within the Mohr Circle angular interval
                    //      deltaTheta1_Sm = angle between sigma1_Sm_Mean and the stress axis located at the boundaries of the Mohr circle angular interval.
                    // Thus, the minimum rotation angle Omega defines the misfit between the hypothetical stress tensor (sigma1_Sh, sigma3_Sh, sigma2_Sh)
                    //      and a stress tensor (sigma1_Sm, sigma3_Sm, sigma2_Sm) consistent with the micro/meso structure kinematics (e.g., the Striated Compactional Shear Band)
                    return Omega;
                }
                else {
                    // The stress axis nSigma1_Sh_Rot is NOT located at an angle within the valid Mohr Circle Angular Interval (MCAI):
                    //       [nSigma1_Sm_Mean - deltaTheta1_Sm, nSigma1_Sm_Mean + deltaTheta1_Sm]
                    // Thus we shall examine 3 points of the Mohr Circle angular interval, in order to determine the minimum rotation 
                    //      between principal stress axes (sigma1_Sh, sigma3_Sh, sigma2_Sh) and (sigma1_Sm, sigma3_Sm, sigma2_Sm)
                    const OmegaMC = [0, 0, 0];
                    const MrotHTrot = [(0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)(), (0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)(), (0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)()];
                    for (let i = 0; i < 3; i++) {
                        // The cost function for a micro/meso structure is defined as the minimum angular rotation between reference systems Sh and Sm(i(), where:
                        //      Sh is defined according to the hypothetical stress tensor solution ('h' stands for hypothetical);
                        //      Sm(i) is defined according to the micro/meso structure stress tensors Mrot[i] ('m' an 'M' stand for micro/meso structure).
                        // The rotation tensor MrotHTrot between systems Sh and Sm is such that: Vm = MrotHTrot Vh (where Vh is defined in Sr or Sw), 
                        //      where MrotHTrot = Mrot . HTrot (HTrot = Hrot transposed):
                        MrotHTrot[i] = (0,_types__WEBPACK_IMPORTED_MODULE_0__.multiplyTensors)({ A: this.Mrot[i], B: (0,_types__WEBPACK_IMPORTED_MODULE_0__.transposeTensor)(hStress.Hrot) });
                        // The angle of rotation associated to tensor MrotHTrot is defined by the trace tr(MrotHTrot), according to the relation:
                        //      tr(MrotHTrot) = 1 + 2 cos(theta)
                        // 4 possible right-handed reference systems are considered for MrotHTrot in order to calculate the minimum rotation angle
                        OmegaMC[i] = (0,_types__WEBPACK_IMPORTED_MODULE_0__.minRotAngleRotationTensor)(MrotHTrot[i]);
                    }
                    // Calculate the minimum rotation angle between reference systems Sh and Sm(i) (i = 0,1,2 )
                    const misfit = Math.min(...OmegaMC);
                    if (misfit === OmegaMC[1]) {
                        throw new Error('The minimum rotation angle for Striated Compactional Shear Band ' + this.noPlane + ' corresponds to the middle point int he Mohr circle'
                            + ' Thus the rotation angle is not a simple monotonic function!');
                    }
                }
            }
        }
    }
    nSigma1_Sm_Mean_deltaTheta1_Sm_MohrCircle() {
        // This method calculates vector sigma1_Sm_Mean and deltaTheta1_Sm such that:
        //      nSigma1_Sm_Mean = unit vector Sigma 1 defined in reference system Sm, whose location in the Mohr Circle is centred in the valid angular interval.
        //      deltaTheta1_Sm = angle between sigma1_Sm_Mean and the stress axis located at the boundaries of the Mohr circle angular interval.
        if (this.nSigma1_nPlane_AngleInterval) {
            // Case 3: The  <Sigma 1,n> angular interval is defined:
            //  The angle between nSigma1_Sm and the normal to the fault plane is constrained within interval [nSigma1_nPlane_AngleMin, nSigma1_nPlane_AngleMax]
            this.angleMean_nSigma1_Sm_nPlane = (this.nSigma1_nPlane_AngleMin + this.nSigma1_nPlane_AngleMax) / 2;
            this.deltaTheta1_Sm = (this.nSigma1_nPlane_AngleMax - this.nSigma1_nPlane_AngleMin) / 2;
            /*
            } else if (this.frictionAngleInterval) {
                // A specific friction angle interval is defined for the Striated Compactional Shear Band. Thus,
                // Case 2: The friction angle phi is defined in interval [frictionAngleMin, frictionAngleMax]. Both friction angles belong to interval [0,PI/2)
                //      The angle <Sigma 1,n> can de readily calculated from the friction angle using relation:
                //      <Sigma 1,n> = PI/4 + phi/2
                this.angleMean_nSigma1_Sm_nPlane = ( Math.PI + this.frictionAngleMin + this.frictionAngleMax ) / 4
                this.deltaTheta1_Sm = ( this.frictionAngleMax - this.frictionAngleMin ) / 4
            */
        }
        else {
            // Case 1: The optional parameters concerning the friction angle interval or the <Sigma 1,n> angular interval are not specified
            // In such case, the location of the striated plane in the Mohr Circle is not constrained and includes all the left quadrant of the Circle.
            // In other words, angle <Sigma 1,n> is in interval [0,PI/4)
            this.angleMean_nSigma1_Sm_nPlane = Math.PI / 8; // 22.5°
            this.deltaTheta1_Sm = Math.PI / 8; // 22.5°
        }
        // nSigma1_Sm_Mean is in the extensional quadrant of the plane of movement, and is define by:
        //      nSigma1_Sm_Mean = cos(angleMean_nSigma1_Sm_nPlane) nPlane - sin(angleMean_nSigma1_Sm_nPlane) nStriation
        this.nSigma1_Sm_Mean = (0,_types__WEBPACK_IMPORTED_MODULE_0__.add_Vectors)({
            U: (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: Math.cos(this.angleMean_nSigma1_Sm_nPlane), V: this.nPlane }),
            V: (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -Math.sin(this.angleMean_nSigma1_Sm_nPlane), V: this.nStriation })
        });
    }
    rotationTensors_S2Sm_Mrot() {
        // This method calculates the 3 rotation matrixes Mrot[i] between the geographic reference system S = (X, Y, Z)
        // and the references system Sm = (Xm, Ym, Zm) associated to the micro/meso structure (e.g., Striated Compactional Shear Band, such that:
        //      Vm = Mrot[i] . V        where V and Vm are corresponding vectors in reference systems S and Sm
        // Sm is defined according to index i (1, 2, and 3), which represents a specific point in the Mohr-Circle angular interval.
        // Calculate the unit vector parellel to Sigma2_Sm, which is perpendicular to nPlane and nStriation:
        this.nSigma2_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct)({ U: this.nPlane, V: this.nStriation });
        // Firstly, we calculate the angles defining 3 points of the valid Mohr Circle angular interval (MCAI):
        // angle_nPlane_nSigma1_Sm[i] = angle between the normal to the plane and the stress axis sigma1_Sm for 3 points located in the MCAI:
        let angle_nPlane_nSigma1_Sm = [];
        // Minimum angle in the interval
        angle_nPlane_nSigma1_Sm[0] = this.angleMean_nSigma1_Sm_nPlane - this.deltaTheta1_Sm;
        // Middle point
        angle_nPlane_nSigma1_Sm[1] = this.angleMean_nSigma1_Sm_nPlane;
        // Maximum angle in the interval
        angle_nPlane_nSigma1_Sm[2] = this.angleMean_nSigma1_Sm_nPlane + this.deltaTheta1_Sm;
        for (let i = 0; i < 3; i++) {
            // Loop for calculating the transformation matrixes Mrot[i]
            // sigma1_Sm is defined in the plane of movement (dilatant quadrant) in terms of angle angle_nPlane_nSigma1_Sm[i]
            this.nSigma1_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.add_Vectors)({
                U: (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: Math.cos(angle_nPlane_nSigma1_Sm[i]), V: this.nPlane }),
                V: (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -Math.sin(angle_nPlane_nSigma1_Sm[i]), V: this.nStriation })
            });
            // The micro/meso structure stress tensor  (sigma1_Sm, sigma3_Sm, sigma2_Sm) is right handed: 
            this.nSigma3_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.crossProduct)({ U: this.nSigma2_Sm, V: this.nSigma1_Sm });
            // Mrot[i] = rotation matrixes for the micro/meso structure reference systems (sigma1_Sm, sigma3_Sm, sigma2_Sm) corresponding to the 3 points in the
            //          Mohr-Circle angular interval. The micro/meso structure is defined according to the data type (i.e., the Striated Compactional Shear Band):
            //      Vm = Mrot[i] . V
            // where V and Vm are corresponding vectors in reference systems S and Sm
            // Mrot[i] is an array containing 3x3 matrices
            this.Mrot[i] = (0,_types__WEBPACK_IMPORTED_MODULE_0__.rotationTensor_Sa_Sb)({ Xb: this.nSigma1_Sm, Yb: this.nSigma3_Sm, Zb: this.nSigma2_Sm });
        }
    }
}


/***/ }),

/***/ "./lib/data/StriatedDilatantShearBand.ts":
/*!***********************************************!*\
  !*** ./lib/data/StriatedDilatantShearBand.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StriatedDilatantShearBand": () => (/* binding */ StriatedDilatantShearBand)
/* harmony export */ });
/* harmony import */ var _NeoformedStriatedPlane__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NeoformedStriatedPlane */ "./lib/data/NeoformedStriatedPlane.ts");

/**
* Striated Dilatant Shear Band:

For stress analysis, a Striated Dilatant Shear Band is equivalent to a Neoformed Striated Plane.
The only difference relies on the type of material:
Shear bands are observed specifically in granular porous rocks such as sandstones, whereas striated faults are observed in all types of rocks.

The plane of movement of a Striated Dilatant Shear Band is defined by two perpendicular vectors:
The normal to the plane and the striation.

Striated Dilatant Shear Bands are defined in the input file as a striated plane.
Optional parameters concerning the friction angle interval or the <Sigma 1,n> angular interval may be specified.

We make the following hypotheses concerning principal stress orientations:
a) The compressional axis Sigma 1 is located in the plane of movement:
    Its direction is inside the extensional quadrant and may be constrained by optional parameters (friction,  <Sigma 1,n>)
b) The extensional axis Sigma 3 is located in the plane of movement:
    Its direction is inside the compressional quadrant and may be constrained by optional parameters (friction,  <Sigma 1,n>)
c) The intermediate axis Sigma 2 is located in the fault plane and is perpendicular to the striation.

Let Sm be the principal reference system for the stress tensor (Sigma 1, Sigma 3, Sigma 2)m obtained from the Striated Dilatant Shear Band
    i.e., the three stress axes satisfy the previous hypotheses.

Several data sets defining Striated Dilatant Shear Bands are considered:
1) Case 1: The optional parameters concerning the friction angle interval or the <Sigma 1,n> angular interval are not specified
    In such case, the location of the striated plane in the Mohr Circle is not constrained and includes all the left quadrant of the Circle.
    In other words, angle <Sigma 1,n> is in interval [PI/4,PI/2)

2) Case 2: The minimum and/or maximum friction angle phi are defined in interval [0, P1/2)
    The angle <Sigma 1,n> can de readily calculated from the friction angle using relation:
        <Sigma 1,n> = PI/4 + phi/2

3) Case 3: The minimum and/or maximum <Sigma 1,n> angular interval are defined

The geometry and kinematics of the Striated Dilatant Shear Band are defined:
a) Each plane is defined by a set of 3 parameters, as follows:
    Fault strike: clockwise angle measured from the North direction [0, 360)
    Fault dip: [0, 90]
    Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
b) The sense of mouvement is indicated for each fault plane:
    For verification purposes, it is recommended to indicate both the dip-slip and strike-slip compoenents, when possible.
      Dip-slip component:
          N = Normal fault,
          I = Inverse fault or thrust
      Strike-slip component:
          RL = Right-Lateral fault
          LL = Left-Lateral fault
      Undefined (the most compatible type of movement is selected **):
        UND
    Sense of mouvement: N, I, RL, LL, N-RL, N-LL, I-RL, I-LL, UND

* @category Data
*/
class StriatedDilatantShearBand extends _NeoformedStriatedPlane__WEBPACK_IMPORTED_MODULE_0__.NeoformedStriatedPlane {
}


/***/ }),

/***/ "./lib/data/StriatedPlane_Kin.ts":
/*!***************************************!*\
  !*** ./lib/data/StriatedPlane_Kin.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StriatedPlaneKin": () => (/* binding */ StriatedPlaneKin)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _Data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data */ "./lib/data/Data.ts");
/* harmony import */ var _types_mechanics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/mechanics */ "./lib/types/mechanics.ts");
/* harmony import */ var _utils_FaultHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/FaultHelper */ "./lib/utils/FaultHelper.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./lib/data/types.ts");
/* harmony import */ var _DataDescription__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataDescription */ "./lib/data/DataDescription.ts");
/* harmony import */ var _io_DataReader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../io/DataReader */ "./lib/io/DataReader.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ "./lib/utils/index.ts");








/**
 * @category Data
 */
class StriatedPlaneKin extends _Data__WEBPACK_IMPORTED_MODULE_1__.Data {
    constructor() {
        super(...arguments);
        this.nPlane = undefined;
        this.nStriation = undefined;
        this.pos = undefined;
        this.problemType = _types__WEBPACK_IMPORTED_MODULE_4__.StriatedPlaneProblemType.DYNAMIC;
        this.strategy = _types__WEBPACK_IMPORTED_MODULE_4__.FractureStrategy.ANGLE;
        this.oriented = true;
        this.EPS = 1e-7;
        this.noPlane = 0;
    }
    initialize(args) {
        const toks = args[0];
        const result = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_5__.createDataStatus)();
        const arg = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_5__.createDataArgument)();
        arg.toks = toks;
        arg.index = (0,_utils__WEBPACK_IMPORTED_MODULE_7__.toInt)(toks[0]);
        // Read parameters definning plane orientation, striation orientation and type of movement
        const plane = (0,_types__WEBPACK_IMPORTED_MODULE_4__.createPlane)();
        const striation = (0,_types__WEBPACK_IMPORTED_MODULE_4__.createStriation)();
        (0,_io_DataReader__WEBPACK_IMPORTED_MODULE_6__.readStriatedFaultPlane)(arg, plane, striation, result);
        // -----------------------------------
        // If the striation trend is defined (and not the strike direction and rake), then calculate th
        // Check that nPlane and nStriation are unit vectors
        const f = _utils_FaultHelper__WEBPACK_IMPORTED_MODULE_3__.FaultHelper.create(plane, striation);
        this.nPlane = f.normal;
        this.nStriation = f.striation;
        this.nPerpStriation = f.e_perp_striation;
        this.noPlane = (0,_utils__WEBPACK_IMPORTED_MODULE_7__.toInt)(toks[0]);
        // Check orthogonality
        const sp = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: this.nPlane, V: this.nStriation });
        if (Math.abs(sp) > this.EPS) {
            throw new Error(`striation is not on the fault plane. Dot product gives ${sp}`);
        }
        return result;
    }
    check({ displ, strain, stress }) {
        if (this.problemType === _types__WEBPACK_IMPORTED_MODULE_4__.StriatedPlaneProblemType.DYNAMIC) {
            return stress !== undefined;
        }
        return displ !== undefined;
    }
    cost({ displ, strain, stress }) {
        if (this.problemType === _types__WEBPACK_IMPORTED_MODULE_4__.StriatedPlaneProblemType.DYNAMIC) {
            // For the first implementation, use the W&B hyp.
            // let d = tensor_x_Vector({T: stress, V: this.nPlane}) // Cauchy
            // d = normalizeVector(d)
            //==============  Stress analysis using continuum mechanics sign convention : Compressional stresses < 0
            // In principle, principal stresses are negative: (sigma 1, sigma 2, sigma 3) = (-1, -R, 0) 
            // Calculate the magnitude of the shear stress vector in reference system S
            const { shearStress, normalStress, shearStressMag } = (0,_types_mechanics__WEBPACK_IMPORTED_MODULE_2__.faultStressComponents)({ stressTensor: stress.S, normal: this.nPlane });
            let cosAngularDifStriae = 0;
            if (shearStressMag > 0) { // shearStressMag > Epsilon would be more realistic ***
                // nShearStress = unit vector parallel to the shear stress (i.e. representing the calculated striation)
                let nShearStress = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizeVector)(shearStress, shearStressMag);
                // The angular difference is calculated using the scalar product: 
                // nShearStress . nStriation = |nShearStress| |nStriation| cos(angularDifStriae) = 1 . 1 . cos(angularDifStriae)
                // cosAngularDifStriae = cos(angular difference between calculated and measured striae)
                cosAngularDifStriae = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nShearStress, V: this.nStriation });
            }
            else {
                // The calculated shear stress is zero (i.e., the fault plane is parallel to a principal stress)
                // In such situation we may consider that the calculated striation can have any direction.
                // Nevertheless, the plane should not display striations as the shear stress is zero.
                // Thus, in principle the plane is not compatible with the stress tensor, and it should be eliminated from the analysis
                // In suchh case, the angular difference is taken as PI
                cosAngularDifStriae = -1;
            }
            if (this.strategy === _types__WEBPACK_IMPORTED_MODULE_4__.FractureStrategy.ANGLE) {
                // The misfit is defined by the angular difference (in radians) between measured and calculated striae
                if (this.oriented) {
                    // The sense of the striation is known
                    return Math.acos(cosAngularDifStriae);
                }
                else {
                    // The sense of the striation is not known. Thus, we choose the sens that minimizes the angular difference 
                    // and is more compatible with the observed striation.
                    return Math.acos(Math.abs(cosAngularDifStriae));
                }
            }
            else {
                // The misfit is defined by the the cosine of the angular difference between measured and calculated striae
                if (this.oriented) {
                    return 0.5 - cosAngularDifStriae / 2;
                }
                else {
                    return 0.5 - Math.abs(cosAngularDifStriae) / 2;
                }
            }
        }
        throw new Error('Kinematic not yet available');
    }
    getMapDirection(s) {
        if (!(0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_3__.directionExists)(s)) {
            throw new Error(`Direction ${s} is not defined (or incorrectly defined)`);
        }
        return (0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_3__.getDirectionFromString)(s);
    }
    getTypeOfMovement(s) {
        if (!(0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_3__.sensOfMovementExists)(s)) {
            throw new Error(`Type of movement ${s} is not defined (or incorrectly defined)`);
        }
        return (0,_utils_FaultHelper__WEBPACK_IMPORTED_MODULE_3__.getTypeOfMovementFromString)(s);
    }
}
// ----------------------------------------------------
/*
const mapDirection = new Map<string, Direction>()
mapDirection.set("E", Direction.E)
mapDirection.set("N", Direction.N)
mapDirection.set("NE", Direction.NE)
mapDirection.set("NW", Direction.NW)
mapDirection.set("S", Direction.S)
mapDirection.set("SE", Direction.SE)
mapDirection.set("SW", Direction.SW)
mapDirection.set("W", Direction.W)

const mapSensOfMovement = new Map<string, TypeOfMovement>()
mapSensOfMovement.set("Inverse", TypeOfMovement.I)
mapSensOfMovement.set("Inverse - Left Lateral", TypeOfMovement.I_LL)
mapSensOfMovement.set("Inverse - Right Lateral", TypeOfMovement.I_RL)
mapSensOfMovement.set("Left Lateral", TypeOfMovement.LL)
mapSensOfMovement.set("Normal", TypeOfMovement.N)
mapSensOfMovement.set("Normal - Left Lateral", TypeOfMovement.N_LL)
mapSensOfMovement.set("Normal - Right Lateral", TypeOfMovement.N_RL)
mapSensOfMovement.set("Right Lateral", TypeOfMovement.RL)
mapSensOfMovement.set("Undefined", TypeOfMovement.UND)
*/ 


/***/ }),

/***/ "./lib/data/StyloliteInterface.ts":
/*!****************************************!*\
  !*** ./lib/data/StyloliteInterface.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyloliteInterface": () => (/* binding */ StyloliteInterface)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _utils_fromAnglesToNormal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/fromAnglesToNormal */ "./lib/utils/fromAnglesToNormal.ts");
/* harmony import */ var _Data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Data */ "./lib/data/Data.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./lib/data/types.ts");
/* harmony import */ var _DataDescription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataDescription */ "./lib/data/DataDescription.ts");
/* harmony import */ var _Factory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Factory */ "./lib/data/Factory.ts");






/**
 *
 * A styloliye interface is represented by a plane. Its orientation in space is defined by three parameters, as follows:
 *      Strike: clockwise angle measured from the North direction [0, 360)
 *      Dip: vertical angle, measured downward, between the horizontal and the line of greatest slope in an inclined plane [0, 90]
 *      Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
 *
 * The misfit value is calculated from the angle between vector 'normal' parallel to crystal fibers and the extensional stress axis Sigma 1.
 * 'normal' is computed through the private method CrystalFibersInVeinSphericalCoords.
 * @category Data
 */
class StyloliteInterface extends _Data__WEBPACK_IMPORTED_MODULE_2__.Data {
    constructor() {
        super(...arguments);
        this.normal = [0, 0, 0];
        this.strategy = _types__WEBPACK_IMPORTED_MODULE_3__.FractureStrategy.ANGLE;
    }
    // description(): any {
    //     return {
    //         // Mandatory data: 
    //         // 0, 1    = Data number, data type (Stylolite Interface and inheriting class: Compaction Band)
    //         // ------------------------------
    //         // Plane orientation : 
    //         // 2, 3, 4 = Strike, dip, dip direction
    //         mandatory: [2, 3, 4],
    //         // Optional data:
    //         // 11, 12  = Deformation phase, relative weight 
    //         optional: [11, 12]
    //     }
    // }
    initialize(args) {
        const toks = args[0];
        const result = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_4__.createDataStatus)();
        const arg = (0,_DataDescription__WEBPACK_IMPORTED_MODULE_4__.createDataArgument)();
        const strike = _DataDescription__WEBPACK_IMPORTED_MODULE_4__.DataDescription.getParameter(arg.setIndex(2));
        const dip = _DataDescription__WEBPACK_IMPORTED_MODULE_4__.DataDescription.getParameter(arg.setIndex(3));
        const dipDirection = _DataDescription__WEBPACK_IMPORTED_MODULE_4__.DataDescription.getParameter(arg.setIndex(4));
        if (dip !== 0 && dip !== 90) {
            // General case: the plane is neither horizontal nor vertical 
            if (dipDirection === 8 /* Direction.UND */) {
                // For non-horizontal and non-vertical planes the dip direction must be defined in terms of a geographic direction: N, S, E, W, NE, SE, SW, NW
                result.status = false;
                result.messages.push(`Data number ${toks[0]}, column 4: parameter for ${_Factory__WEBPACK_IMPORTED_MODULE_5__.DataFactory.name(this)}, please set the dip direction in terms of a geographic direction`);
            }
        }
        else if (dipDirection !== 8 /* Direction.UND */) {
            // For horizontal and vertical planes the dip direction is undefined (UND) 
            result.status = false;
            result.messages.push(`Data number ${toks[0]}, column 4: parameter for ${_Factory__WEBPACK_IMPORTED_MODULE_5__.DataFactory.name(this)}, for a horizontal or vertical plane please set the dip direction as undefined (UND)`);
        }
        // Convert into normal
        this.normal = (0,_utils_fromAnglesToNormal__WEBPACK_IMPORTED_MODULE_1__.fromAnglesToNormal)({ strike, dip, dipDirection });
        return result;
    }
    check({ displ, strain, stress }) {
        return stress !== undefined;
    }
    // This version does not consider the case in which the stress shape ratio R is close to 1 (i.e., Sigma 2 = Sigma 1) 
    //      In this particular situation, any styloliye interface containing Sigma 3 is consistent with the hypothetical stress tensor solution.
    //      In other words, the styloliye interface normal is in the plane generated by (Sigma 1, Sigma 2)
    cost({ displ, strain, stress }) {
        const dot = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: stress.S1_X, V: this.normal });
        switch (this.strategy) {
            case _types__WEBPACK_IMPORTED_MODULE_3__.FractureStrategy.DOT: return 1 - Math.abs(dot);
            // Sigma 1 can be oriented in two opposite directions, thus to calculate the minimum angle we take the dot product as positive.
            default: return Math.acos(Math.abs(dot)) / Math.PI;
        }
    }
}


/***/ }),

/***/ "./lib/data/StyloliteTeeth.ts":
/*!************************************!*\
  !*** ./lib/data/StyloliteTeeth.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyloliteTeeth": () => (/* binding */ StyloliteTeeth)
/* harmony export */ });
/* harmony import */ var _StyloliteInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StyloliteInterface */ "./lib/data/StyloliteInterface.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _DataDescription__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataDescription */ "./lib/data/DataDescription.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./lib/utils/index.ts");




/**
 * Stylolite teeth are defined by a set of two parameters as follows:
 *      Stylolite teeth trend: clockwise angle measured from the North direction [0, 360)
 *      Stylolite teeth plunge: vertical angle (positive downward) between the horizontal pointing toward the trend and a line parallel to crystal fibers.
 *              In general the plunge points downward an is measured in interval [0,90] (i.e., crystal fibers plunge in the direction of the trend).
 *              Nevertheless, a negative plunge in interval (-90,0) can also be defined.
 *              Such case corresponds to the vertical angle measured upward between the horizontal pointing toward the trend and the crystal fibers.
 *
 * This class inherits not from Data but rather from StyloliteInterface.
 * This means that the check() and cost() methods are already implemented (in the right way).
 * The misfit value is calculated from the angle between vector 'normal' parallel to the stylolite teeth and the compressional stress axis Sigma 1.
 * 'normal' is computed through the private method CrystalFibersInVeinSphericalCoords.
 *
 * @category Data
 */
class StyloliteTeeth extends _StyloliteInterface__WEBPACK_IMPORTED_MODULE_0__.StyloliteInterface {
    // description(): any {
    //     return {
    //         // Mandatory data:
    //         // O, 1    = Data number, data type (Stylolite Teeth)
    //         // ------------------------------
    //         // Line orientation : 
    //         // 9, 10 = line trend, line plunge
    //         mandatory: [9, 10],
    //         // Optional data:
    //         // 11, 12 = Deformation phase, relative weight 
    //         optional: [11, 12]
    //     }
    // }
    initialize(args) {
        const toks = args[0];
        const result = { status: true, messages: [] };
        // -----------------------------------
        const stylolite_teeth_trend = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.toFloat)(toks[9]);
        if (!_DataDescription__WEBPACK_IMPORTED_MODULE_2__.DataDescription.checkRanges(stylolite_teeth_trend)) {
            _DataDescription__WEBPACK_IMPORTED_MODULE_2__.DataDescription.putMessage(toks, 9, this, result);
        }
        // -----------------------------------
        const stylolite_teeth_plunge = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.toFloat)(toks[10]);
        if (!_DataDescription__WEBPACK_IMPORTED_MODULE_2__.DataDescription.checkRanges(stylolite_teeth_plunge)) {
            _DataDescription__WEBPACK_IMPORTED_MODULE_2__.DataDescription.putMessage(toks, 10, this, result);
        }
        // The unit vector 'normal' is parallel to the stylolite teeth:
        //      'normal' can be considered to be equivalent to the perpendicular vector to a stylolite interface
        // The misfit is a normalized function of the angle between the 'normal' and the hypothetical stress axis Sigma 1 
        this.normal = (0,_types__WEBPACK_IMPORTED_MODULE_1__.trendPlunge2unitAxis)({ trend: this.stylolite_teeth_trend, plunge: this.stylolite_teeth_plunge });
        return result;
    }
}


/***/ }),

/***/ "./lib/data/index.ts":
/*!***************************!*\
  !*** ./lib/data/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompactionBand": () => (/* reexport safe */ _CompactionBand__WEBPACK_IMPORTED_MODULE_8__.CompactionBand),
/* harmony export */   "ConjugateCompactionalShearBands": () => (/* reexport safe */ _ConjugateCompactionalShearBands__WEBPACK_IMPORTED_MODULE_5__.ConjugateCompactionalShearBands),
/* harmony export */   "ConjugateDilatantShearBands": () => (/* reexport safe */ _ConjugateDilatantShearBands__WEBPACK_IMPORTED_MODULE_6__.ConjugateDilatantShearBands),
/* harmony export */   "ConjugateFaults": () => (/* reexport safe */ _ConjugateFaults__WEBPACK_IMPORTED_MODULE_7__.ConjugateFaults),
/* harmony export */   "CrystalFibersInVein": () => (/* reexport safe */ _CrystalFibersInVein__WEBPACK_IMPORTED_MODULE_9__.CrystalFibersInVein),
/* harmony export */   "Data": () => (/* reexport safe */ _Data__WEBPACK_IMPORTED_MODULE_0__.Data),
/* harmony export */   "DataDescription": () => (/* reexport safe */ _DataDescription__WEBPACK_IMPORTED_MODULE_1__.DataDescription),
/* harmony export */   "DataFactory": () => (/* reexport safe */ _Factory__WEBPACK_IMPORTED_MODULE_3__.DataFactory),
/* harmony export */   "DilationBand": () => (/* reexport safe */ _DilationBand__WEBPACK_IMPORTED_MODULE_10__.DilationBand),
/* harmony export */   "ExtensionFracture": () => (/* reexport safe */ _ExtensionFracture__WEBPACK_IMPORTED_MODULE_11__.ExtensionFracture),
/* harmony export */   "FractureStrategy": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_4__.FractureStrategy),
/* harmony export */   "NeoformedStriatedPlane": () => (/* reexport safe */ _NeoformedStriatedPlane__WEBPACK_IMPORTED_MODULE_12__.NeoformedStriatedPlane),
/* harmony export */   "StriatedCompactionalShearBand": () => (/* reexport safe */ _StriatedCompactionalShearBand__WEBPACK_IMPORTED_MODULE_13__.StriatedCompactionalShearBand),
/* harmony export */   "StriatedDilatantShearBand": () => (/* reexport safe */ _StriatedDilatantShearBand__WEBPACK_IMPORTED_MODULE_14__.StriatedDilatantShearBand),
/* harmony export */   "StriatedPlaneKin": () => (/* reexport safe */ _StriatedPlane_Kin__WEBPACK_IMPORTED_MODULE_15__.StriatedPlaneKin),
/* harmony export */   "StriatedPlaneProblemType": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_4__.StriatedPlaneProblemType),
/* harmony export */   "StyloliteInterface": () => (/* reexport safe */ _StyloliteInterface__WEBPACK_IMPORTED_MODULE_16__.StyloliteInterface),
/* harmony export */   "StyloliteTeeth": () => (/* reexport safe */ _StyloliteTeeth__WEBPACK_IMPORTED_MODULE_17__.StyloliteTeeth),
/* harmony export */   "createDataArgument": () => (/* reexport safe */ _DataDescription__WEBPACK_IMPORTED_MODULE_1__.createDataArgument),
/* harmony export */   "createDataStatus": () => (/* reexport safe */ _DataDescription__WEBPACK_IMPORTED_MODULE_1__.createDataStatus),
/* harmony export */   "createNodalPlane": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_4__.createNodalPlane),
/* harmony export */   "createPlane": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_4__.createPlane),
/* harmony export */   "createRuptureFrictionAngles": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_4__.createRuptureFrictionAngles),
/* harmony export */   "createSigma1_nPlaneAngle": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_4__.createSigma1_nPlaneAngle),
/* harmony export */   "createStriation": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_4__.createStriation)
/* harmony export */ });
/* harmony import */ var _Data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Data */ "./lib/data/Data.ts");
/* harmony import */ var _DataDescription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataDescription */ "./lib/data/DataDescription.ts");
/* harmony import */ var _DataParameters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataParameters */ "./lib/data/DataParameters.ts");
/* harmony import */ var _Factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Factory */ "./lib/data/Factory.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./lib/data/types.ts");
/* harmony import */ var _ConjugateCompactionalShearBands__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ConjugateCompactionalShearBands */ "./lib/data/ConjugateCompactionalShearBands.ts");
/* harmony import */ var _ConjugateDilatantShearBands__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ConjugateDilatantShearBands */ "./lib/data/ConjugateDilatantShearBands.ts");
/* harmony import */ var _ConjugateFaults__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ConjugateFaults */ "./lib/data/ConjugateFaults.ts");
/* harmony import */ var _CompactionBand__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CompactionBand */ "./lib/data/CompactionBand.ts");
/* harmony import */ var _CrystalFibersInVein__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CrystalFibersInVein */ "./lib/data/CrystalFibersInVein.ts");
/* harmony import */ var _DilationBand__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DilationBand */ "./lib/data/DilationBand.ts");
/* harmony import */ var _ExtensionFracture__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ExtensionFracture */ "./lib/data/ExtensionFracture.ts");
/* harmony import */ var _NeoformedStriatedPlane__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./NeoformedStriatedPlane */ "./lib/data/NeoformedStriatedPlane.ts");
/* harmony import */ var _StriatedCompactionalShearBand__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./StriatedCompactionalShearBand */ "./lib/data/StriatedCompactionalShearBand.ts");
/* harmony import */ var _StriatedDilatantShearBand__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./StriatedDilatantShearBand */ "./lib/data/StriatedDilatantShearBand.ts");
/* harmony import */ var _StriatedPlane_Kin__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./StriatedPlane_Kin */ "./lib/data/StriatedPlane_Kin.ts");
/* harmony import */ var _StyloliteInterface__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./StyloliteInterface */ "./lib/data/StyloliteInterface.ts");
/* harmony import */ var _StyloliteTeeth__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./StyloliteTeeth */ "./lib/data/StyloliteTeeth.ts");















// export * from './StriatedPlane_Friction1'
// export * from './StriatedPlane_Friction2'





/***/ }),

/***/ "./lib/data/types.ts":
/*!***************************!*\
  !*** ./lib/data/types.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FractureStrategy": () => (/* binding */ FractureStrategy),
/* harmony export */   "StriatedPlaneProblemType": () => (/* binding */ StriatedPlaneProblemType),
/* harmony export */   "createNodalPlane": () => (/* binding */ createNodalPlane),
/* harmony export */   "createPlane": () => (/* binding */ createPlane),
/* harmony export */   "createRuptureFrictionAngles": () => (/* binding */ createRuptureFrictionAngles),
/* harmony export */   "createSigma1_nPlaneAngle": () => (/* binding */ createSigma1_nPlaneAngle),
/* harmony export */   "createStriation": () => (/* binding */ createStriation)
/* harmony export */ });
/**
 * @category Data
 */
var FractureStrategy;
(function (FractureStrategy) {
    FractureStrategy[FractureStrategy["ANGLE"] = 0] = "ANGLE";
    // Criteriun similar or equivalent to the one implemented in the Gephart & Forsyth method (1984)
    FractureStrategy[FractureStrategy["MIN_TENSOR_ROT"] = 1] = "MIN_TENSOR_ROT";
    // Criteriun similar to the one implemented in the Etchecopar et al. method (1981)
    FractureStrategy[FractureStrategy["MIN_STRIATION_ANGULAR_DIF"] = 2] = "MIN_STRIATION_ANGULAR_DIF";
    FractureStrategy[FractureStrategy["DOT"] = 3] = "DOT";
})(FractureStrategy || (FractureStrategy = {}));
/**
 * - DYNAMIC is related to forces (or stresses)
 * - KINEMATIC is related to displacement field
 * @category Data
 */
var StriatedPlaneProblemType;
(function (StriatedPlaneProblemType) {
    StriatedPlaneProblemType[StriatedPlaneProblemType["DYNAMIC"] = 0] = "DYNAMIC";
    StriatedPlaneProblemType[StriatedPlaneProblemType["KINEMATIC"] = 1] = "KINEMATIC";
})(StriatedPlaneProblemType || (StriatedPlaneProblemType = {}));
function createPlane() {
    return {
        strike: 0,
        dip: 0,
        dipDirection: 8 /* Direction.UND */
    };
}
function createStriation() {
    return {
        rake: 0,
        strikeDirection: 8 /* Direction.UND */,
        trendIsDefined: true,
        trend: 0,
        typeOfMovement: 8 /* TypeOfMovement.UND */
    };
}
function createRuptureFrictionAngles() {
    return {
        isDefined: false,
        angleMin: 0,
        angleMax: 0
    };
}
function createSigma1_nPlaneAngle() {
    return createRuptureFrictionAngles();
}
function createNodalPlane() {
    return {
        strike: 0,
        dip: 0,
        rake: 0
    };
}


/***/ }),

/***/ "./lib/geomeca/HomogeneousEngine.ts":
/*!******************************************!*\
  !*** ./lib/geomeca/HomogeneousEngine.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomogeneousEngine": () => (/* binding */ HomogeneousEngine)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../search */ "./lib/search/index.ts");


class HomogeneousEngine {
    constructor() {
        this.S_ = undefined;
        this.S1_Xh = undefined;
        this.S3_Yh = undefined;
        this.S2_Zh = undefined;
        this.values = undefined;
        this.Hrot_ = undefined;
        this.stressRatio_ = undefined;
    }
    setHypotheticalStress(Hrot, stressRatio) {
        this.Hrot_ = Hrot;
        this.stressRatio_ = stressRatio;
        // The normalized eigen-vectors of the stress tensor are defined in terms of the lines of transformation matrix Hrot from reference system S to Sh:
        this.S1_Xh = [this.Hrot_[0][0], this.Hrot_[0][1], this.Hrot_[0][2]];
        this.S3_Yh = [this.Hrot_[1][0], this.Hrot_[1][1], this.Hrot_[1][2]];
        this.S2_Zh = [this.Hrot_[2][0], this.Hrot_[2][1], this.Hrot_[2][2]];
        // The corresponding eigenvalues (sigma1_Sh, sigma3_Sh, sigma2_Sh) in system Sh defined in terms of the normalized Mohr-Circle diagram: 
        //      Stress ratio is defined either by the user in the interactive search, or in the search method (e.g. Montecarlo)
        // The principal stress values are NEGATIVE (compressive) since stress calculations are done using the CONTINUUM MECHANICS CONVENTION (e.g., search/utils.ts).
        this.values = [-1, 0, -this.stressRatio_];
        const HrotT = (0,_types__WEBPACK_IMPORTED_MODULE_0__.transposeTensor)(this.Hrot_);
        this.S_ = (0,_search__WEBPACK_IMPORTED_MODULE_1__.stressTensorDelta)(stressRatio, this.Hrot_, HrotT);
        // const sigma = [stress[0][0], stress[0][1], stress[0][2], stress[1][1], stress[1][2], stress[2][2]]
        // Eigen method is used for calculation of eigenvalues and eigenvectors in NON-HOMOGENEOUS case study
        /*
        const {values, vectors} = eigen(sigma)
        this.S1 = [vectors[0], vectors[1], vectors[2]] as Vector3
        this.S2 = [vectors[3], vectors[4], vectors[5]] as Vector3
        this.S3 = [vectors[6], vectors[7], vectors[8]] as Vector3
        this.values = [...values] as Vector3
        */
        // For the inversion of the stress tensor solution in the HOMOGENEOUS case study, we define 2 orthonormal right-handed reference systems:
        //
        //      S =  (X, Y, Z ) is the geographic reference frame oriented in (East, North, Up) directions.
        //      Sh = (Xh,Yh,Zh) is the principal stress reference frame parallel to the stress axes, 
        //              defined from the hypothetical stress tensor solution, e.g., from grid search or Montecarlo (sigma1_Sh, sigma3_Sh, sigma2_Sh);
        //
        // Sh is defined by Sr or Sw reference systems:
        //      Sr  =  (Xr, Yr, Zr ) is the principal reference frame chosen by the user in the interactive search phase ('r' stands for 'rough' solution).
        //      Sw =  (Xw, Yw, Zw ) is the principal reference frame for a fixed node in the search grid (sigma_1, sigma_3, sigma_2) ('w' stands for 'winning' solution)
        // Hrot is is the transformation matrix between S and Sh ('H' sand 'h' stand for 'hypothetical' solution), such that:
        //      Vh = Hrot[i]  V      where V and Vh are corresponding vectors in S and Sh
        //      V  = HTrot[i] Vh     (HTrot is tensor Hrot transposed)
        // Hrot is is defined either by Rrot or by Wrot, depending on the calling functions:
        //      Hrot = Rrot in the interactive search phase using integral curves
        //      Hrot = Wrot in the inverse method search phase using Montecarlo (for example)
        // Rotation tensors Rrot and RTrot between systems S and Sr are such that:
        //      Vr = Rrot  V
        //      V  = RTrot Vr        (RTrot is tensor Rrot transposed)
        // Rotation tensors Wrot and WTrot between systems S and Sw satisfy : WTrot = RTrot DTrot, such that:
        //      Vw = Wrot  V
        //      V  = WTrot Vw        (WTrot is tensor Wrot transposed)
    }
    stress(p) {
        return {
            S: this.S_,
            S1_X: this.S1_Xh,
            S3_Y: this.S3_Yh,
            S2_Z: this.S2_Zh,
            s1_X: this.values[0],
            s3_Y: this.values[1],
            s2_Z: this.values[2],
            Hrot: this.Hrot_
        };
    }
    Hrot() {
        return this.Hrot_;
    }
    stressRatio() {
        return this.stressRatio_;
    }
    S() {
        return this.S_;
    }
}


/***/ }),

/***/ "./lib/geomeca/index.ts":
/*!******************************!*\
  !*** ./lib/geomeca/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomogeneousEngine": () => (/* reexport safe */ _HomogeneousEngine__WEBPACK_IMPORTED_MODULE_0__.HomogeneousEngine)
/* harmony export */ });
/* harmony import */ var _HomogeneousEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomogeneousEngine */ "./lib/geomeca/HomogeneousEngine.ts");



/***/ }),

/***/ "./lib/index.ts":
/*!**********************!*\
  !*** ./lib/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompactionBand": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.CompactionBand),
/* harmony export */   "CompactionShearBandsHelper": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.CompactionShearBandsHelper),
/* harmony export */   "ConjugateCompactionalShearBands": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.ConjugateCompactionalShearBands),
/* harmony export */   "ConjugateDilatantShearBands": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.ConjugateDilatantShearBands),
/* harmony export */   "ConjugateFaults": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.ConjugateFaults),
/* harmony export */   "ConjugatePlanesHelper": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.ConjugatePlanesHelper),
/* harmony export */   "CrystalFibersInVein": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.CrystalFibersInVein),
/* harmony export */   "Curve3D": () => (/* reexport safe */ _analysis__WEBPACK_IMPORTED_MODULE_0__.Curve3D),
/* harmony export */   "Data": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.Data),
/* harmony export */   "DataDescription": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.DataDescription),
/* harmony export */   "DataFactory": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.DataFactory),
/* harmony export */   "DilationBand": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.DilationBand),
/* harmony export */   "Direction": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.Direction),
/* harmony export */   "Domain2D": () => (/* reexport safe */ _analysis__WEBPACK_IMPORTED_MODULE_0__.Domain2D),
/* harmony export */   "Domain3D": () => (/* reexport safe */ _analysis__WEBPACK_IMPORTED_MODULE_0__.Domain3D),
/* harmony export */   "EquipotentialCurve": () => (/* reexport safe */ _analysis__WEBPACK_IMPORTED_MODULE_0__.EquipotentialCurve),
/* harmony export */   "ExtensionFracture": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.ExtensionFracture),
/* harmony export */   "FaultHelper": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.FaultHelper),
/* harmony export */   "FractureStrategy": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.FractureStrategy),
/* harmony export */   "FullParameterSpace": () => (/* reexport safe */ _analysis__WEBPACK_IMPORTED_MODULE_0__.FullParameterSpace),
/* harmony export */   "IntegralCurve": () => (/* reexport safe */ _analysis__WEBPACK_IMPORTED_MODULE_0__.IntegralCurve),
/* harmony export */   "InverseMethod": () => (/* reexport safe */ _InverseMethod__WEBPACK_IMPORTED_MODULE_6__.InverseMethod),
/* harmony export */   "MasterStress": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.MasterStress),
/* harmony export */   "MohrCoulombCurve": () => (/* reexport safe */ _analysis__WEBPACK_IMPORTED_MODULE_0__.MohrCoulombCurve),
/* harmony export */   "MonteCarlo": () => (/* reexport safe */ _search__WEBPACK_IMPORTED_MODULE_4__.MonteCarlo),
/* harmony export */   "NeoformedStriatedPlane": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.NeoformedStriatedPlane),
/* harmony export */   "ParameterSpace": () => (/* reexport safe */ _analysis__WEBPACK_IMPORTED_MODULE_0__.ParameterSpace),
/* harmony export */   "PoleCoords": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.PoleCoords),
/* harmony export */   "SearchMethodFactory": () => (/* reexport safe */ _search__WEBPACK_IMPORTED_MODULE_4__.SearchMethodFactory),
/* harmony export */   "SphericalCoords": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.SphericalCoords),
/* harmony export */   "StressTensor": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.StressTensor),
/* harmony export */   "StriatedCompactionalShearBand": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.StriatedCompactionalShearBand),
/* harmony export */   "StriatedDilatantShearBand": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.StriatedDilatantShearBand),
/* harmony export */   "StriatedPlaneKin": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.StriatedPlaneKin),
/* harmony export */   "StriatedPlaneProblemType": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.StriatedPlaneProblemType),
/* harmony export */   "StyloliteInterface": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.StyloliteInterface),
/* harmony export */   "StyloliteTeeth": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.StyloliteTeeth),
/* harmony export */   "TypeOfMovement": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.TypeOfMovement),
/* harmony export */   "add_Vectors": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.add_Vectors),
/* harmony export */   "angularDifStriations": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.angularDifStriations),
/* harmony export */   "arcCircle": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.arcCircle),
/* harmony export */   "cloneMatrix3x3": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.cloneMatrix3x3),
/* harmony export */   "cloneMisfitCriteriunSolution": () => (/* reexport safe */ _InverseMethod__WEBPACK_IMPORTED_MODULE_6__.cloneMisfitCriteriunSolution),
/* harmony export */   "constant_x_Vector": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.constant_x_Vector),
/* harmony export */   "createDataArgument": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.createDataArgument),
/* harmony export */   "createDataStatus": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.createDataStatus),
/* harmony export */   "createDefaultSolution": () => (/* reexport safe */ _InverseMethod__WEBPACK_IMPORTED_MODULE_6__.createDefaultSolution),
/* harmony export */   "createNodalPlane": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.createNodalPlane),
/* harmony export */   "createPlane": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.createPlane),
/* harmony export */   "createRuptureFrictionAngles": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.createRuptureFrictionAngles),
/* harmony export */   "createSigma1_nPlaneAngle": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.createSigma1_nPlaneAngle),
/* harmony export */   "createStriation": () => (/* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__.createStriation),
/* harmony export */   "crossProduct": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.crossProduct),
/* harmony export */   "decodeCSV": () => (/* reexport safe */ _io__WEBPACK_IMPORTED_MODULE_5__.decodeCSV),
/* harmony export */   "deg2rad": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.deg2rad),
/* harmony export */   "directionExists": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.directionExists),
/* harmony export */   "dirs": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.dirs),
/* harmony export */   "displayMatrix3x3": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.displayMatrix3x3),
/* harmony export */   "faultParams": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.faultParams),
/* harmony export */   "faultStressComponents": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.faultStressComponents),
/* harmony export */   "fromAnglesToNormal": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.fromAnglesToNormal),
/* harmony export */   "fromDipTrendToNormal": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.fromDipTrendToNormal),
/* harmony export */   "getDirectionFromString": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.getDirectionFromString),
/* harmony export */   "getDomain2D": () => (/* reexport safe */ _analysis__WEBPACK_IMPORTED_MODULE_0__.getDomain2D),
/* harmony export */   "getDomain3D": () => (/* reexport safe */ _analysis__WEBPACK_IMPORTED_MODULE_0__.getDomain3D),
/* harmony export */   "getTypeOfMovementFromString": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.getTypeOfMovementFromString),
/* harmony export */   "hasOwn": () => (/* reexport safe */ _analysis__WEBPACK_IMPORTED_MODULE_0__.hasOwn),
/* harmony export */   "isDefined": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.isDefined),
/* harmony export */   "isGeographicDirection": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.isGeographicDirection),
/* harmony export */   "isNumber": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.isNumber),
/* harmony export */   "isTypeOfMovement": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.isTypeOfMovement),
/* harmony export */   "lineSphericalCoords": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.lineSphericalCoords),
/* harmony export */   "minRotAngleRotationTensor": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.minRotAngleRotationTensor),
/* harmony export */   "mohrCircleLine": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.mohrCircleLine),
/* harmony export */   "mohrCirclePoint": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.mohrCirclePoint),
/* harmony export */   "multiplyTensors": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.multiplyTensors),
/* harmony export */   "mvts": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.mvts),
/* harmony export */   "newMatrix3x3": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.newMatrix3x3),
/* harmony export */   "newMatrix3x3Identity": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.newMatrix3x3Identity),
/* harmony export */   "newPoint3D": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.newPoint3D),
/* harmony export */   "newVector3D": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.newVector3D),
/* harmony export */   "normalVector": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.normalVector),
/* harmony export */   "normalizeVector": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.normalizeVector),
/* harmony export */   "normalizedCrossProduct": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.normalizedCrossProduct),
/* harmony export */   "properRotationTensor": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.properRotationTensor),
/* harmony export */   "rad2deg": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.rad2deg),
/* harmony export */   "rotationParamsFromRotTensor": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.rotationParamsFromRotTensor),
/* harmony export */   "rotationTensor_Sa_Sb": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.rotationTensor_Sa_Sb),
/* harmony export */   "scalarProduct": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.scalarProduct),
/* harmony export */   "scalarProductUnitVectors": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.scalarProductUnitVectors),
/* harmony export */   "sensOfMovementExists": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.sensOfMovementExists),
/* harmony export */   "setValueInUnitInterval": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.setValueInUnitInterval),
/* harmony export */   "signedAngularDifStriations": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.signedAngularDifStriations),
/* harmony export */   "spherical2unitVectorCartesian": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.spherical2unitVectorCartesian),
/* harmony export */   "stressTensorDelta": () => (/* reexport safe */ _search__WEBPACK_IMPORTED_MODULE_4__.stressTensorDelta),
/* harmony export */   "stressTensorPrincipalAxes": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.stressTensorPrincipalAxes),
/* harmony export */   "tensor_x_Vector": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.tensor_x_Vector),
/* harmony export */   "toFloat": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.toFloat),
/* harmony export */   "toInt": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.toInt),
/* harmony export */   "transposeTensor": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.transposeTensor),
/* harmony export */   "trend2phi": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.trend2phi),
/* harmony export */   "trendPlunge2unitAxis": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.trendPlunge2unitAxis),
/* harmony export */   "trimAll": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.trimAll),
/* harmony export */   "unitVectorCartesian2Spherical": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.unitVectorCartesian2Spherical),
/* harmony export */   "vectorMagnitude": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.vectorMagnitude)
/* harmony export */ });
/* harmony import */ var _analysis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analysis */ "./lib/analysis/index.ts");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./lib/data/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./lib/types/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./lib/utils/index.ts");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./search */ "./lib/search/index.ts");
/* harmony import */ var _io__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./io */ "./lib/io/index.ts");
/* harmony import */ var _InverseMethod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./InverseMethod */ "./lib/InverseMethod.ts");









/***/ }),

/***/ "./lib/io/DataReader.ts":
/*!******************************!*\
  !*** ./lib/io/DataReader.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readFrictionAngleInterval": () => (/* binding */ readFrictionAngleInterval),
/* harmony export */   "readSigma1nPlaneInterval": () => (/* binding */ readSigma1nPlaneInterval),
/* harmony export */   "readStriatedFaultPlane": () => (/* binding */ readStriatedFaultPlane)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data */ "./lib/data/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./lib/utils/index.ts");



/**
 * Read from data file the parameters definning the plane orientation, the striation orientation and the type of movement.
 * Special cases such as horizontal and vertical planes are considered
 */
function readStriatedFaultPlane(arg, plane, striation, result) {
    plane.strike = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(2));
    plane.dip = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(3));
    // The dip direction is read after the rake
    // ----------------------
    // Check consistency of the rake and strike direction
    // In function createStriation, we suppose by default that the striation trend is defined: striation.trendIsDefined = true
    let strikeDirIsGeographicDir = false;
    let strikeDirIsUND = false;
    let strikeDirIsEmptySet = false;
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNumber)(arg.toks[5]) && !(0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNumber)(arg.toks[7])) {
        // The striation must be defined either by the rake or by the striation trend 
        result.status = false;
        result.messages.push(`Data number ${arg.toks[0]}, striation parameters for ${arg.toks[1]}: please set either the rake (col 5) or the striation trend (col 7)`);
    }
    else if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNumber)(arg.toks[5]) && (0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNumber)(arg.toks[7])) {
        // The striation must be defined either by the rake or by the striation trend 
        result.status = false;
        result.messages.push(`Data number ${arg.toks[0]}, striation parameters for ${arg.toks[1]}: please set either the rake (col 5) or the striation trend (col 7), but not both`);
    }
    else if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNumber)(arg.toks[5])) {
        // The rake is defined 
        striation.trendIsDefined = false;
        striation.rake = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(5));
        if (striation.rake < 0 || striation.rake > 90) {
            // The rake is not in interval [0,90]: in principle, this condition this condition has already been checked in DataDescription, checkRanges
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: please set the rake (col 5) in interval [0,90]`);
        }
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[6])) {
            // The strike direction is defined 
            striation.strikeDirection = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(6));
            if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isGeographicDirection)(striation.strikeDirection) === true) {
                // The strike direction is a valid geographic direction: 'E', 'W', 'N', 'S', 'NE', 'SE', 'SW', 'NW'
                //      i.e., strike direction is an element of set (E, W, N, S, NE, SE, SW, NW)
                strikeDirIsGeographicDir = true;
            }
            else if (striation.strikeDirection === 8 /* Direction.UND */) {
                // The strike direction is undefined (UND) 
                strikeDirIsUND = true;
            }
            else {
                // The strike direction is not a valid string 
                result.status = false;
                result.messages.push(`Data number ${arg.toks[0]}, striation parameters for ${arg.toks[1]}: please set the strike direction (col 6) from set (E, W, N, S, NE, SE, SW, NW, UND)`);
            }
        }
        else {
            // Strike direction is not defined (i.e., empty set)
            strikeDirIsEmptySet = true;
        }
    }
    else {
        // The striation trend is defined
        striation.trendIsDefined = true;
        striation.trend = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(7));
    }
    if (plane.dip > 0 && plane.dip < 90) {
        // General situation: the striated plane is neither horizontal nor vertical
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNumber)(arg.toks[5])) { // The rake is defined
            if (striation.rake > 0 && striation.rake < 90) {
                // The the rake is in interval (0,90); thus, the striation is neither horizontal nor perpendicular to the strike 
                // In this general situation, the strike direction must be a geographic direction, and not undefined ('UND') or not defined (empty set)
                if (strikeDirIsEmptySet) {
                    // The strike direction cannot be the empty set
                    result.status = false;
                    result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: the strike direction (col 6) is not the empty string; please set a geographic direction for the strike direction (col 6)`);
                }
                else if (strikeDirIsUND) {
                    // The strike direction must be defined in terms of a geographic direction (i.e., it cannot be undefined - UND)
                    result.status = false;
                    result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: the strike direction (col 6) is not undefined (UND); please set a geographic direction from set (E, W, N, S, NE, SE, SW, NW)`);
                }
                else if (!strikeDirIsGeographicDir) {
                    // The strike direction must be defined in terms of a geographic direction (E, W, N, S, NE, SE, SW, NW, UND)
                    // In principle this else if is never reached as the geographic direction has already been checked
                    result.status = false;
                    result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: please set a geographic direction for the strike direction (col 6) from set (E, W, N, S, NE, SE, SW, NW)`);
                }
            }
            else if (striation.rake === 0 || striation.rake === 90) {
                // If rake = 0 or rake = 90, then the strike direction can be either of three possibilities:
                // An element from the geographic direction set, the undefined element (UND), or not defined (i.e. empty set)
                // This condition for the strike direction has already been checked 
            }
        }
    }
    else if (plane.dip === 0) {
        // The plane is horizontal and the striation is defined by the striation trend and not the rake and strike direction
        if (!striation.trendIsDefined) {
            // The striation trend is not defined. Thus, the rake is defined, which is incorrect
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: for a horizontal plane, please set the striation trend (col 7) to indicate relative movement of the top block (and not the rake and strike direction, cols 5, 6)`);
        }
    }
    else if (plane.dip === 90) {
        // The plane is vertical and the striation is defined by the rake and (posibly the strike direction), and not the striation trend 
        if (striation.trendIsDefined) {
            // The rake must be defined and not the striation trend
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameters: for a vertical plane, please set the rake and strike direction (cols 5, 6) and not the striation trend (col 7)`);
        }
        else {
            // The rake is defined
            if (striation.rake > 0 && striation.rake < 90) {
                // The striation is not horizontal or vertical, i.e., the rake is in interval (0,90)
                // Thus, the strike direction must be a geographic direction, and not undefined ('UND') or not defined (empty set)
                if (strikeDirIsEmptySet) {
                    // The strike direction cannot be the empty set
                    result.status = false;
                    result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: please set a geographic direction for the strike direction (col 6) from set (E, W, N, S, NE, SE, SW, NW)`);
                }
                else if (strikeDirIsUND) {
                    // The strike direction must be defined in terms of a geographic direction (i.e., it cannot be undefined - UND)
                    result.status = false;
                    result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: the strike direction (col 6) is not undefined (UND); please set a geographic direction from set (E, W, N, S, NE, SE, SW, NW)`);
                }
                else if (!strikeDirIsGeographicDir) {
                    // The strike direction must be defined in terms of a geographic direction (E, W, N, S, NE, SE, SW, NW, UND)
                    // In principle this else if is never reached as the geographic direction has already been checked
                    result.status = false;
                    result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: please set a geographic direction for the strike direction (col 6) from set (E, W, N, S, NE, SE, SW, NW)`);
                }
            }
            else if (striation.rake === 0 || striation.rake === 90) {
                // The striation is horizontal or vertical, i.e., the rake = 0 or 90, and the strike direction can be either of three possibilities:
                // An element from the geographic direction set, the undefined element (UND), or not defined (i.e. empty set)
                // This condition for strike direction has already been checked
            }
        }
    }
    else {
        // The plane dip is not in interval [0,90] (in principle this condition is already checked in ranges)
        result.status = false;
        result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, plane parameter: please set the plane dip in interval [0,90] (col 3)`);
    }
    if (strikeDirIsEmptySet) {
        // Strike direction is not defined (i.e., empty set)
        // This value is equivalent to undefined (UND) in subsequent methods and functions (faultStriationAngle_A)
        striation.strikeDirection = 8 /* Direction.UND */;
    }
    // ----------------------
    // Check consistency of the dip direction
    let dipDirIsGeographicDir = false;
    let dipDirIsUND = false;
    let dipDirIsEmptySet = false;
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[4])) {
        // The dip direction is defined 
        plane.dipDirection = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(4));
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isGeographicDirection)(plane.dipDirection) === true) {
            // The dip direction is a valid geographic direction: 'E', 'W', 'N', 'S', 'NE', 'SE', 'SW', 'NW'
            //      i.e., strike direction is an element of set (E, W, N, S, NE, SE, SW, NW)
            dipDirIsGeographicDir = true;
        }
        else if (plane.dipDirection === 8 /* Direction.UND */) {
            // The dip direction is undefined (UND) 
            dipDirIsUND = true;
        }
        else {
            // The dip direction is not a valid string 
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, plane parameters: please define the dip direction (col 4) from set (E, W, N, S, NE, SE, SW, NW, UND)`);
        }
    }
    else {
        // dip direction is not defined (i.e., empty set)
        dipDirIsEmptySet = true;
    }
    if (plane.dip > 0 && plane.dip < 90) {
        // General situation: the striated plane is neither horizontal nor vertical:
        // The dip direction must be defined in terms of a geographic direction (E, W, N, S, NE, SE, SW, NW)
        if (dipDirIsEmptySet) {
            // The dip direction cannot be the empty set
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, plane parameter: the dip direction (col 4) is not the empty string; please define the dip direction (col 4) from set (E, W, N, S, NE, SE, SW, NW)`);
        }
        else if (dipDirIsUND) {
            // The dip direction must be defined in terms of a geographic direction (i.e., it cannot be undefined - UND)
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, plane parameter: the dip direction (col 4) is not undefined (UND); please define the dip direction (col 4) from set (E, W, N, S, NE, SE, SW, NW)`);
        }
        else if (!dipDirIsGeographicDir) {
            // In principle this else if is never reached as the geographic direction has already been checked for the dip direction parameter
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, plane parameter: please define the dip direction (col 4) from set (E, W, N, S, NE, SE, SW, NW)`);
        }
    }
    else if (plane.dip === 0) {
        // The plane is horizontal
        // In this special situation, the dip direction can be either of three possibilities:
        // An element from the geographic direction set, the undefined element (UND), or not defined (i.e. empty set)
        // This condition for dip direction has already been checked
    }
    else if (plane.dip === 90) {
        // The plane is vertical and the rake (and not the striation trend) is defined in interval [0,90]
        if (striation.rake !== 90) {
            // The striation is not vertical, i.e., the rake is in interval [0,90)
            // In this special situation, the dip direction can be either of three possibilities:
            // An element from the geographic direction set, the undefined element (UND), or not defined (i.e. empty set)
            // This condition for dip direction has already been checked
        }
        else {
            // The plane and striation are vertical
            // In this special situation, THE DIP DIRECTION POINTS TOWARD THE UPLIFTED BLOCK. 
            // Thus, the dip direction is a geographic direction from set (E, W, N, S, NE, SE, SW, NW) and is not undefined (UND) or not defined (the empty set)
            if (!dipDirIsGeographicDir) {
                result.status = false;
                result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, plane parameter: for a vertical plane with vertical striation, THE DIP DIRECTION POINTS TOWARD THE UPLIFTED BLOCK. Please define the dip direction (col 4) from set (E, W, N, S, NE, SE, SW, NW)`);
            }
        }
    }
    if (dipDirIsEmptySet) {
        // Dip direction is not defined (i.e., empty set)
        // This value is equivalent to undefined (UND) in subsequent methods and functions (FaultHelper)
        plane.dipDirection = 8 /* Direction.UND */;
    }
    // ----------------------
    // Check consistency of the type of movement
    let typeOfMoveIsKinematicDir = false;
    let typeOfMoveIsUND = false;
    let typeOfMoveIsEmptySet = false;
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[8])) {
        // The type of movement is defined 
        striation.typeOfMovement = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(8));
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isTypeOfMovement)(striation.typeOfMovement)) {
            // The type of movement is a valid kinematic direction: 'I', 'I_LL', 'I_RL', 'LL', 'N', 'N_LL', 'N_RL', 'RL'
            //      i.e., type of movement is an element of set (I, I_LL, I_RL, LL, N, N_LL, N_RL, RL)
            typeOfMoveIsKinematicDir = true;
        }
        else if (striation.typeOfMovement === 8 /* TypeOfMovement.UND */) {
            // The type of movement is undefined (UND) 
            typeOfMoveIsUND = true;
        }
        else {
            // The type of movement is not a valid string 
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameters: please set the type of movement (col 8) from set (I, I_LL, I_RL, LL, N, N_LL, N_RL, RL, UND)`);
        }
    }
    else {
        // type of movement is not defined (i.e., empty set)
        typeOfMoveIsEmptySet = true;
    }
    if (plane.dip > 0 && plane.dip < 90) {
        // General situation: the striated plane is neither horizontal nor vertical
        // The type of movement must be defined in terms of a valid kinematic direction: 'I', 'I_LL', 'I_RL', 'LL', 'N', 'N_LL', 'N_RL', 'RL'
        if (typeOfMoveIsEmptySet) {
            // The type of movement cannot be the empty set
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: the type of movement (col 8) is not the empty string; please set the type of movement (col 8) from set (I, I_LL, I_RL, LL, N, N_LL, N_RL, RL, UND)`);
        }
        else if (typeOfMoveIsUND) {
            // The type of movement cannot be undefined (UND)
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: the type of movement (col 8) is not undefined (UND); please set the type of movement (col 8) from set (I, I_LL, I_RL, LL, N, N_LL, N_RL, RL, UND)`);
        }
        else if (!typeOfMoveIsKinematicDir) {
            // The type of movement is an element of set (I, I_LL, I_RL, LL, N, N_LL, N_RL, RL)
            // In principle, this condition has already been checked
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: please set a type of movement (col 8) from set (I, I_LL, I_RL, LL, N, N_LL, N_RL, RL)`);
        }
    }
    else if (plane.dip === 0) {
        // The plane is horizontal 
        // In this special situation, the type of movement is either undefined (UND) or not defined (the empty set)
        if (!typeOfMoveIsUND && !typeOfMoveIsEmptySet) {
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: for a horizontal plane, please set the type of movement (col 8) as undefined (UND) or non defined (empty string)`);
        }
    }
    else if (plane.dip === 90) {
        // The plane is vertical
        if (striation.rake < 90) {
            // The striation is oblique and the type of movement is an element of set (I, I_LL, I_RL, LL, N, N_LL, N_RL, RL)
            if (!typeOfMoveIsKinematicDir) {
                result.status = false;
                result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: please set a type of movement (col 8) from set (I, I_LL, I_RL, LL, N, N_LL, N_RL, RL)`);
            }
        }
        else {
            // The plane and striation are vertical
            // In this special situation, the type of movement is either undefined (UND) or not defined (the empty set)
            if (!typeOfMoveIsUND && !typeOfMoveIsEmptySet) {
                result.status = false;
                result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, striation parameter: for a vertical plane with vertical striation, please set the type of movement (col 8) as undefined (UND) or non defined (empty string)`);
            }
        }
    }
    if (typeOfMoveIsEmptySet) {
        // Type of movement is not defined (i.e., empty set)
        // This value is equivalent to undefined (UND) in subsequent methods and functions (FaultHelper)
        striation.typeOfMovement = 8 /* TypeOfMovement.UND */;
    }
}
/**
 * Read from data file the parameters definning the friction angle interval of the point associated with the fault plane in the Mohr Circle (Sigma_1, Sigma_3)/
 *      frictionAngleMin = minimum friction angle
 *      frictionAngleMax = maximum friction angle
 *
 */
function readFrictionAngleInterval(arg, ruptureFricAngle, result) {
    // Minimum and maximum default values for friction angles are defined: frictionAngleMin = 0, frictionAngleMax = PI / 2
    ruptureFricAngle.isDefined = false;
    ruptureFricAngle.angleMin = 0;
    ruptureFricAngle.angleMax = Math.PI / 2; // 90°
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[13]) || (0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[14])) {
        // One or both friction angles are defined: Default values are updated with new values
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[13])) {
            ruptureFricAngle.angleMin = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(13));
            ruptureFricAngle.angleMin = (0,_types__WEBPACK_IMPORTED_MODULE_1__.deg2rad)(ruptureFricAngle.angleMin);
        }
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[14])) {
            ruptureFricAngle.angleMax = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(14));
            ruptureFricAngle.angleMax = (0,_types__WEBPACK_IMPORTED_MODULE_1__.deg2rad)(ruptureFricAngle.angleMax);
        }
        else {
            // Maximum friction angle is not defined and is set to the maximum value **
            ruptureFricAngle.angleMax = Math.PI / 2;
        }
        if (ruptureFricAngle.angleMax < ruptureFricAngle.angleMin) {
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, columns 13 and 14: parameter for ${_data__WEBPACK_IMPORTED_MODULE_0__.DataFactory.name(arg.data)}, ${_data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.names[13]} (got ${ruptureFricAngle.angleMin}) should be less than ${_data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.names[14]} (got ${ruptureFricAngle.angleMax})`);
        }
        ruptureFricAngle.isDefined = true;
    }
}
/**
 * Read from data file the parameters definning the angular interval for <Sigma 1, nPlane> of the point associated with the fault plane in the Mohr Circle (Sigma_1, Sigma_3)/
 *      nSigma1_nPlane_AngleMin = minimum friction angle
 *      nSigma1_nPlane_AngleMax = maximum friction angle
 *
 */
function readSigma1nPlaneInterval(arg, sigma1_nPlane, result) {
    // Minimum and maximum default values for <Sigma 1, nPlane> angles are defined: 
    sigma1_nPlane.isDefined = false;
    if (_data__WEBPACK_IMPORTED_MODULE_0__.DataFactory.name(arg.data) === 'Neoformed Striated Plane' || _data__WEBPACK_IMPORTED_MODULE_0__.DataFactory.name(arg.data) === 'Striated Dilatant Shear Band') {
        sigma1_nPlane.angleMin = Math.PI / 4; // The minimum <Sigma 1, nPlane> angle is set to 45° (PI/4) **
        sigma1_nPlane.angleMax = Math.PI / 2; // The maximum <Sigma 1, nPlane> angle is set to 90° (PI/2) **
    }
    else if (_data__WEBPACK_IMPORTED_MODULE_0__.DataFactory.name(arg.data) === 'Striated Compactional Shear Band') {
        sigma1_nPlane.angleMin = 0; // The minimum <Sigma 1, nPlane> angle is set to 45° (PI/4) **
        sigma1_nPlane.angleMax = Math.PI / 4; // The maximum <Sigma 1, nPlane> angle is set to 90° (PI/2) **
    }
    else {
        throw new Error(`Data number ${arg.toks[0]}, columns 15 and 16 are not defined for ${_data__WEBPACK_IMPORTED_MODULE_0__.DataFactory.name(arg.data)}`);
    }
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[15]) || (0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[16])) {
        // One or both <Sigma 1, nPlane> angles are defined: Default values are updated with new values
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[15])) {
            sigma1_nPlane.angleMin = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(15));
            sigma1_nPlane.angleMin = (0,_types__WEBPACK_IMPORTED_MODULE_1__.deg2rad)(sigma1_nPlane.angleMin);
        }
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[16])) {
            sigma1_nPlane.angleMax = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(16));
            sigma1_nPlane.angleMax = (0,_types__WEBPACK_IMPORTED_MODULE_1__.deg2rad)(sigma1_nPlane.angleMax);
        }
        if (sigma1_nPlane.angleMax < sigma1_nPlane.angleMin) {
            result.status = false;
            result.messages.push(`Data number ${arg.toks[0]}, columns 15 and 16: parameter for ${_data__WEBPACK_IMPORTED_MODULE_0__.DataFactory.name(arg.data)}, ${_data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.names[15]} (got ${sigma1_nPlane.angleMin}) should be less than ${_data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.names[16]} (got ${sigma1_nPlane.angleMax})`);
        }
        sigma1_nPlane.isDefined = true;
    }
}


/***/ }),

/***/ "./lib/io/decodeCSV.ts":
/*!*****************************!*\
  !*** ./lib/io/decodeCSV.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeCSV": () => (/* binding */ decodeCSV)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data */ "./lib/data/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./lib/utils/index.ts");


function decodeCSV(lines) {
    const datas = [];
    let dataType = '';
    for (let i = 0; i < lines.length; ++i) {
        if (i === 1) {
            continue;
        }
        const line = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.trimAll)(lines[i].trim());
        if (line.length === 0) {
            continue;
        }
        const r = line.split(';').filter(v => v.length !== 0).map(s => s.replace(',', '.'));
        if (r.length === 0) {
            continue;
        }
        if (i === 0) {
            dataType = r[0];
            console.log(`Data type is "${dataType}"`);
            continue;
        }
        if (r.length === 6) {
            const n = [parseFloat(r[0]), parseFloat(r[1]), parseFloat(r[2])];
            const s = [parseFloat(r[3]), parseFloat(r[4]), parseFloat(r[5])];
            const data = _data__WEBPACK_IMPORTED_MODULE_0__.DataFactory.create(dataType, { nPlane: n, nStriation: s });
            datas.push(data);
        }
    }
    return datas;
}


/***/ }),

/***/ "./lib/io/index.ts":
/*!*************************!*\
  !*** ./lib/io/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeCSV": () => (/* reexport safe */ _decodeCSV__WEBPACK_IMPORTED_MODULE_0__.decodeCSV)
/* harmony export */ });
/* harmony import */ var _decodeCSV__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decodeCSV */ "./lib/io/decodeCSV.ts");

// export * from './decodeCSV_Angles'


/***/ }),

/***/ "./lib/search/DebugSearch.ts":
/*!***********************************!*\
  !*** ./lib/search/DebugSearch.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DebugSearch": () => (/* binding */ DebugSearch)
/* harmony export */ });
/* harmony import */ var _geomeca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geomeca */ "./lib/geomeca/index.ts");
/* harmony import */ var _InverseMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../InverseMethod */ "./lib/InverseMethod.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");



/**
 * @category Search-Method
 */
class DebugSearch {
    constructor() {
        this.engine = new _geomeca__WEBPACK_IMPORTED_MODULE_0__.HomogeneousEngine();
    }
    setInteractiveSolution({ rot, stressRatio }) {
    }
    setEngine(engine) {
        this.engine = engine;
    }
    run(data, misfitCriteriaSolution) {
        const newSolution = (0,_InverseMethod__WEBPACK_IMPORTED_MODULE_1__.cloneMisfitCriteriunSolution)(misfitCriteriaSolution);
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                const hRot = (0,_types__WEBPACK_IMPORTED_MODULE_2__.newMatrix3x3)();
                const stressRatio = 0.5;
                this.engine.setHypotheticalStress(hRot, stressRatio);
                const misfit = data.reduce((previous, current) => previous + current.cost({ stress: this.engine.stress(current.position) }), 0) / data.length;
                if (misfit < newSolution.misfit) {
                    newSolution.misfit = misfit;
                    newSolution.rotationMatrixD = hRot;
                    newSolution.stressRatio = undefined;
                    newSolution.stressTensorSolution = (0,_types__WEBPACK_IMPORTED_MODULE_2__.newMatrix3x3Identity)();
                }
            }
        }
        return newSolution;
    }
}


/***/ }),

/***/ "./lib/search/Factory.ts":
/*!*******************************!*\
  !*** ./lib/search/Factory.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchMethodFactory": () => (/* binding */ SearchMethodFactory)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _DebugSearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DebugSearch */ "./lib/search/DebugSearch.ts");
/* harmony import */ var _MonteCarlo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MonteCarlo */ "./lib/search/MonteCarlo.ts");


// import { GridSearch } from './GridSearch'

var SearchMethodFactory;
(function (SearchMethodFactory) {
    const map_ = new Map();
    SearchMethodFactory.bind = (obj, name = '') => {
        name.length === 0 ? map_.set(obj.name, obj) : map_.set(name, obj);
    };
    SearchMethodFactory.create = (name, params = undefined) => {
        const M = map_.get(name);
        if (M) {
            const searchMethod = new M(params);
            // to be filled
            if (params !== undefined) {
                const ist = params.interactiveStressTensor;
                const st = new _types__WEBPACK_IMPORTED_MODULE_0__.StressTensor({
                    trendS1: ist.trendS1,
                    trendS3: ist.trendS3,
                    plungeS1: ist.plungeS1,
                    plungeS3: ist.plungeS3,
                    masterStress: ist.masterStress === 'Sigma1' ? _types__WEBPACK_IMPORTED_MODULE_0__.MasterStress.Sigma1 : _types__WEBPACK_IMPORTED_MODULE_0__.MasterStress.Sigma3,
                    stressRatio: ist.stressRatio
                });
                searchMethod.setInteractiveSolution({ rot: st.Rrot, stressRatio: st.stressRatio });
            }
            return searchMethod;
        }
        return undefined;
    };
    SearchMethodFactory.exists = (name) => {
        return map_.get(name) !== undefined;
    };
    SearchMethodFactory.names = () => {
        return Array.from(map_.keys());
    };
})(SearchMethodFactory || (SearchMethodFactory = {}));
// SearchMethodFactory.bind(GridSearch, 'Grid Search')
SearchMethodFactory.bind(_DebugSearch__WEBPACK_IMPORTED_MODULE_1__.DebugSearch, 'Debug Search');
SearchMethodFactory.bind(_MonteCarlo__WEBPACK_IMPORTED_MODULE_2__.MonteCarlo, 'Monte Carlo');


/***/ }),

/***/ "./lib/search/MonteCarlo.ts":
/*!**********************************!*\
  !*** ./lib/search/MonteCarlo.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MonteCarlo": () => (/* binding */ MonteCarlo)
/* harmony export */ });
/* harmony import */ var _geomeca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geomeca */ "./lib/geomeca/index.ts");
/* harmony import */ var _InverseMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../InverseMethod */ "./lib/InverseMethod.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");



/**
 * @category Search-Method
 */
class MonteCarlo {
    constructor({ stressRatio = 0.5, stressRatioHalfInterval = 0.25, rotAngleHalfInterval = 0.1, nbRandomTrials = 1000, Rrot = (0,_types__WEBPACK_IMPORTED_MODULE_2__.newMatrix3x3Identity)() } = {}) {
        this.Rrot = undefined;
        this.RTrot = undefined;
        this.engine = new _geomeca__WEBPACK_IMPORTED_MODULE_0__.HomogeneousEngine();
        this.rotAngleHalfInterval = rotAngleHalfInterval;
        this.nbRandomTrials = nbRandomTrials;
        this.stressRatio0 = stressRatio;
        this.stressRatioHalfInterval = stressRatioHalfInterval;
        this.Rrot = Rrot;
        this.RTrot = (0,_types__WEBPACK_IMPORTED_MODULE_2__.transposeTensor)(this.Rrot);
    }
    setEngine(engine) {
        this.engine = engine;
    }
    setInteractiveSolution({ rot, stressRatio }) {
        this.Rrot = rot;
        this.stressRatio0 = stressRatio;
    }
    run(data, misfitCriteriaSolution) {
        // The optimum stress tensor is calculated by exploring the stress orientations and the stress ratio around the approximate solution Sr (r = rough solution)
        // obtained by the user during the interactive analysis of flow lines on the sphere, Mohr circle diagram, and histogram of signed angular deviations.
        // More precisely, the minimization function is calculated for a set of stress tensors whose orientations are rotated around axes 
        // defined by a Montecarlo algorithm distributed "quasi-homogeneously" on the sphere surface.
        // The magnitude of rotations and the stress ratio are also defined by random variables calculated within specified intervals.
        // Stress ratio variation stressRatioHalfInterval around R = (S2-S3)/(S1-S3), is constrained to interval [0,1]
        let stressRatioMin = Math.max(0, Math.abs(this.stressRatio0) - this.stressRatioHalfInterval);
        let stressRatioMax = Math.min(1, Math.abs(this.stressRatio0) + this.stressRatioHalfInterval);
        let stressRatioEffectiveInterval = stressRatioMax - stressRatioMin;
        // console.log(this.stressRatio0, stressRatioMin, stressRatioMax, stressRatioEffectiveInterval)
        let DTrot = (0,_types__WEBPACK_IMPORTED_MODULE_2__.newMatrix3x3)();
        let Drot = (0,_types__WEBPACK_IMPORTED_MODULE_2__.newMatrix3x3)();
        let WTrot = (0,_types__WEBPACK_IMPORTED_MODULE_2__.newMatrix3x3)();
        let Wrot = (0,_types__WEBPACK_IMPORTED_MODULE_2__.newMatrix3x3)();
        let rotAxisSpheCoords = new _types__WEBPACK_IMPORTED_MODULE_2__.SphericalCoords;
        let inc = 0;
        console.log('Starting the montecarlo search...');
        let changed = false;
        const newSolution = (0,_InverseMethod__WEBPACK_IMPORTED_MODULE_1__.cloneMisfitCriteriunSolution)(misfitCriteriaSolution);
        for (let i = 0; i <= this.nbRandomTrials; i++) {
            // For each trial, a rotation axis in the unit sphere is calculated from a uniform random distribution.
            // phi = random variable representing azimuth [0, 2PI)
            rotAxisSpheCoords.phi = Math.random() * 2 * Math.PI;
            // theta = random variable representing the colatitude [0, PI)
            //      the arcos function ensures a uniform distribution for theta from a random value:
            rotAxisSpheCoords.theta = Math.acos(2 * Math.random() - 1);
            let rotAxis = (0,_types__WEBPACK_IMPORTED_MODULE_2__.spherical2unitVectorCartesian)(rotAxisSpheCoords);
            // We only consider positive rotation angles around each rotation axis, since the whole sphere is covered by angles (phi,theta)
            let rotAngle = Math.random() * this.rotAngleHalfInterval;
            // Calculate rotation tensors Drot and DTrot between systems Sr and Sw such that:
            //  Vr  = DTrot Vw        (DTrot is tensor Drot transposed)
            //  Vw = Drot  Vr
            DTrot = (0,_types__WEBPACK_IMPORTED_MODULE_2__.properRotationTensor)({ nRot: rotAxis, angle: rotAngle });
            Drot = (0,_types__WEBPACK_IMPORTED_MODULE_2__.transposeTensor)(DTrot);
            // Calculate rotation tensors Wrot and WTrot between systems S and Sw: WTrot = RTrot DTrot, such that:
            //  V   = WTrot Vw        (WTrot is tensor Wrot transposed)
            //  Vw = Wrot  V
            //  S   =  (X, Y, Z ) is the geographic reference frame  oriented in (East, North, Up) directions.
            //  Sw =  (Xw, Yw, Zw ) is the principal reference frame for a fixed node in the search grid (sigma_1, sigma_3, sigma_2) ('w' stands for 'winning' solution)
            WTrot = (0,_types__WEBPACK_IMPORTED_MODULE_2__.multiplyTensors)({ A: this.RTrot, B: DTrot });
            //  Wrot = Drot Rrot
            Wrot = (0,_types__WEBPACK_IMPORTED_MODULE_2__.transposeTensor)(WTrot);
            // Stress ratio variation around R = (S2-S3)/(S1-S3)
            let stressRatio = stressRatioMin + Math.random() * stressRatioEffectiveInterval; // The strees ratio is in interval [0,1]
            // Calculate the stress tensor STdelta in reference frame S from the stress tensor in reference frame Sw
            // STdelta is defined according to the continuum mechanics sign convention : compression < 0
            // COMMENTED BELOW
            // let STdelta = stressTensorDelta(stressRatio, Wrot, WTrot)
            // const misfit = data.reduce( (previous, current) => {
            //     return previous + current.cost({stress: STdelta, rot: Wrot}
            // )} , 0) / data.length
            this.engine.setHypotheticalStress(Wrot, stressRatio);
            const misfit = data.reduce((previous, current) => {
                return previous + current.cost({ stress: this.engine.stress(current.position) });
            }, 0) / data.length;
            if (misfit < newSolution.misfit) {
                newSolution.misfit = misfit;
                newSolution.rotationMatrixD = (0,_types__WEBPACK_IMPORTED_MODULE_2__.cloneMatrix3x3)(Drot);
                newSolution.rotationMatrixW = (0,_types__WEBPACK_IMPORTED_MODULE_2__.cloneMatrix3x3)(Wrot);
                newSolution.stressRatio = stressRatio;
                newSolution.stressTensorSolution = this.engine.S(); // was STdelta
            }
            // const misfitSum  = misfitCriteriaSolution.criterion.value(STdelta)
            // if (misfitSum < misfitCriteriaSolution.misfitSum) {
            //     misfitCriteriaSolution.misfitSum      = misfitSum
            //     misfitCriteriaSolution.rotationMatrixD = cloneMatrix3x3(Drot)
            //     misfitCriteriaSolution.rotationMatrixW = cloneMatrix3x3(Wrot)
            //     misfitCriteriaSolution.stressRatio    = stressRatio
            //     changed = true
            // }
            inc++;
        }
        return newSolution;
    }
}
/*
private monteCarloSearch() {
        // The optimum stress tensor is calculated by exploring the stress orientations and the stress ratio around the approximate solution S0
        // obtained by the user during the interactive analysis of flow lines on the sphere, Mohr circle diagram, and histogram of signed angular deviations.
        // More precisely, the minimization function is calculated for a set of stress tensors whose orientations are rotated around axes
        // defined by a Montecarlo algorithm distributed "quasi-homogeneously" on the sphere surface.
        // The magnitude of rotations and the stress ratio are also defined by random variables calculated within specified intervals.

        // Stress ratio variation stressRatioHalfInterval around R = (S2-S3)/(S1-S3), is constrained to interval [0,1]
        let stressRatioMin = Math.max(0, this.stressRatio0 - this.stressRatioHalfInterval )
        let stressRatioMax = Math.min(1, this.stressRatio0 + this.stressRatioHalfInterval )

        let stressRatioEffectiveInterval = stressRatioMax - stressRatioMin
         
        let DTrot: Matrix3x3   = newMatrix3x3()
        let Drot:  Matrix3x3   = newMatrix3x3()
        let WTrot: Matrix3x3   = newMatrix3x3()
        let Wrot:  Matrix3x3   = newMatrix3x3()

        let rotAxisSpheCoords: SphericalCoords

        let inc = 0

        console.log('Starting the grid search...')
        
        for (let i = 0; i <= this.nRandomTrials; i++) {
            // For each trial, a rotation axis in the unit sphere is calculated from a uniform random distribution.

            // phi = random variable representing azimuth [0, 2PI)
            rotAxisSpheCoords.phi = Math.random() * 2 * Math.PI
            // theta = random variable representing the colatitude [0, PI)
            //      the arcos function ensures a uniform distribution for theta from a random value:
            rotAxisSpheCoords.theta = Math.acos( Math.random() * 2 * Math.PI)

            let rotAxis = spherical2unitVectorCartesian(rotAxisSpheCoords)

            // We only consider positive rotation angles around each rotation axis, since the whole sphere is covered by angles (phi,theta)
            let rotAngle = Math.random() * this.rotAngleHalfInterval
                
            // Calculate rotation tensors Drot and DTrot between systems Sr and Sw such that:
            //  Vr  = DTrot Vw        (DTrot is tensor Drot transposed)
            //  Vw = Drot  Vr
            DTrot = properRotationTensor(rotAxis, rotAngle)
            Drot  = transposeTensor(DTrot)
            // Calculate rotation tensors Wrot and WTrot between systems S and Sw: WTrot = RTrot DT, such that:
            //  V   = WTrot Vw        (WTrot is tensor Wrot transposed)
            //  Vw = Wrot  V
            //  S   =  (X, Y, Z ) is the geographic reference frame  oriented in (East, North, Up) directions.
            //  Sw =  (Xw, Yw, Zw ) is the principal reference frame for a fixed node in the search grid (sigma_1, sigma_3, sigma_2) ('w' stands for 'winning' solution)
            WTrot = multiplyTensors({A: this.RTrot, B: DTrot })
            Wrot  = transposeTensor( WTrot )

            // Stress ratio variation around R = (S2-S3)/(S1-S3)
            let stressRatio = stressRatioMin + Math.random() * stressRatioEffectiveInterval // The strees ratio is in interval [0,1]
            // Calculate the stress tensor STdelta in reference frame S from the stress tensor in reference frame Sw
            let STdelta = stressTensorDelta(stressRatio, Wrot, WTrot)

            this.misfitCriteriaSolution.forEach( bestSolution => {
                const misfitSum  = bestSolution.criterion({
                    rotationMatrixDrot: Drot,
                    rotationMatrixWrot: Wrot,
                    stressRatio: stressRatio,
                    faultSet: this.faultSet
                }) // number
                if (misfitSum < bestSolution.misfitSum) {
                    bestSolution.misfitSum      = misfitSum
                    bestSolution.rotationMatrixDrot = cloneMatrix3x3(Drot)
                    bestSolution.rotationMatrixWrot = cloneMatrix3x3(Wrot)
                    bestSolution.stressRatio    = stressRatio
                    console.log('cur solution:', [i,j,k,l])
                }
            })

            // if (inc%100 === 0) {
                // console.log(inc, [i,j,k,l])
                console.log(inc, rotAxisSpheCoords)
            // }

            inc++
        }
        // To analyse the rotation axis for the best solution:
        // The cartesian and spherical coords of a unit vector corresponding to the rotation axis are determined
        // from the components of the tensor definning a proper rotation
        // let {rotAxis, rotAxisSpheCoords, rotMag} = rotationParamsFromRotTensor(DTrot) // **
    }
*/


/***/ }),

/***/ "./lib/search/SearchMethod.ts":
/*!************************************!*\
  !*** ./lib/search/SearchMethod.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./lib/search/index.ts":
/*!*****************************!*\
  !*** ./lib/search/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MonteCarlo": () => (/* reexport safe */ _MonteCarlo__WEBPACK_IMPORTED_MODULE_3__.MonteCarlo),
/* harmony export */   "SearchMethodFactory": () => (/* reexport safe */ _Factory__WEBPACK_IMPORTED_MODULE_1__.SearchMethodFactory),
/* harmony export */   "stressTensorDelta": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.stressTensorDelta)
/* harmony export */ });
/* harmony import */ var _SearchMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchMethod */ "./lib/search/SearchMethod.ts");
/* harmony import */ var _Factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Factory */ "./lib/search/Factory.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./lib/search/utils.ts");
/* harmony import */ var _MonteCarlo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MonteCarlo */ "./lib/search/MonteCarlo.ts");



// export * from './GridSearch'



/***/ }),

/***/ "./lib/search/utils.ts":
/*!*****************************!*\
  !*** ./lib/search/utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stressTensorDelta": () => (/* binding */ stressTensorDelta)
/* harmony export */ });
/* harmony import */ var _types_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/math */ "./lib/types/math.ts");

/**
 * @category Search-Method
 * @param stressRatio
 * @param Wrot
 * @param WTrot
 * @returns
 */
function stressTensorDelta(stressRatio, Wrot, WTrot) {
    // Calculate the stress tensor STdelta in reference frame S from the stress tensor in reference frame Sw:
    //      STdelta = WTrot STPdelta Wrot
    //
    // where
    //
    //      Sw = (Xw,Yw,Zw) is the principal stress reference frame in the search grid node(i,j,k,l), parallel to (sigma_1, sigma_3, sigma_2) 
    //                      ('w' stands for 'winning' solution);
    //      S   = (X, Y, Z ) is the geographic reference frame  oriented in (East, North, Up) directions.
    //      STPdelta = Stress Tensor in the Principal stress reference frame (i.e. diagonal tensor with eigenvalues (1,0,StressRatio).
    //      The principal stress values are NEGATIVE since stress calculations are done using the CONTINUUM MECHNAICS CONVENTION.
    const sigma = [-1, 0, -stressRatio];
    let STPdelta = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.stressTensorPrincipalAxes)(sigma);
    // T1 = WTrot STPdelta; this tensor multiplication can be optimized since STPdelta is diagonal with eigenvalues (-1, 0, -StressRatio).
    let T1 = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)();
    T1 = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.multiplyTensors)({ A: WTrot, B: STPdelta });
    // STdelta = T1 Wrot = WTrot STPdelta Wrot
    let STdelta = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.multiplyTensors)({ A: T1, B: Wrot });
    return STdelta;
    // for (let m = 0; m < numberStressInversions; m++) {
    //     // The user may stipulate 1 or 2 different stress inversion methods for the same fault set
    //     // This option allows to compare inversion solutions using different misfit criteria
    //     switch(MisfitCriteriun[m]){
    //         case 1: {
    //             // Angular deviation (Etchecopar et al. 1981)
    //             // FirstNode allows to initialize the mimimisation function with its value for the fist node in the grid
    //             misfitAngularDeviation( firstNode, m )
    //         }
    //         case 2: { 
    //             //Minimum angle of rotation of the tensor that brings the shear stress parallel to the striation (Gephart & Forsyth 1984)
    //             misfitMinimumAngleTensorRotation( firstNode, m )
    //         }
    //     }                                
    // }
}


/***/ }),

/***/ "./lib/types/GenericCurve.ts":
/*!***********************************!*\
  !*** ./lib/types/GenericCurve.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./lib/types/MohrPoint.ts":
/*!********************************!*\
  !*** ./lib/types/MohrPoint.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./lib/types/PoleCoords.ts":
/*!*********************************!*\
  !*** ./lib/types/PoleCoords.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PoleCoords": () => (/* binding */ PoleCoords)
/* harmony export */ });
class PoleCoords {
    constructor({ trend = 0, plunge = 0 } = {}) {
        this.trend_ = 0;
        this.plunge_ = 0;
        // check bounds of theta and phi if any
        this.trend_ = trend ? trend : 0;
        this.plunge_ = plunge ? plunge : 0;
    }
    get trend() {
        return this.trend_;
    }
    set trend(v) {
        // check bounds of theta
        this.trend_ = v;
    }
    get plunge() {
        return this.plunge_;
    }
    set plunge(v) {
        this.plunge_ = v;
    }
}


/***/ }),

/***/ "./lib/types/SphericalCoords.ts":
/*!**************************************!*\
  !*** ./lib/types/SphericalCoords.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SphericalCoords": () => (/* binding */ SphericalCoords)
/* harmony export */ });
class SphericalCoords {
    constructor({ phi = 0, theta = 0 } = {}) {
        this.theta_ = 0;
        this.phi_ = 0;
        // check bounds of theta and phi if any
        this.theta_ = theta ? theta : 0;
        this.phi_ = phi ? phi : 0;
    }
    /**
     * @see constructor
     */
    static create({ phi = 0, theta = 0 } = {}) {
        return new SphericalCoords({ phi, theta });
    }
    get theta() {
        return this.theta_;
    }
    set theta(v) {
        // check bounds of theta
        this.theta_ = v;
    }
    get phi() {
        return this.phi_;
    }
    set phi(v) {
        this.phi_ = v;
    }
}


/***/ }),

/***/ "./lib/types/StressTensor.ts":
/*!***********************************!*\
  !*** ./lib/types/StressTensor.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MasterStress": () => (/* binding */ MasterStress),
/* harmony export */   "StressTensor": () => (/* binding */ StressTensor)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");

var MasterStress;
(function (MasterStress) {
    MasterStress[MasterStress["Sigma1"] = 0] = "Sigma1";
    MasterStress[MasterStress["Sigma3"] = 1] = "Sigma3";
})(MasterStress || (MasterStress = {}));
class StressTensor {
    constructor({ trendS1, plungeS1, trendS3, plungeS3, masterStress, stressRatio }) {
        // ========================================================
        this.phiS1 = 0;
        this.phiS3 = 0;
        this.thetaS1 = 0;
        this.thetaS3 = 0;
        /**
         * The new stress tensor is defined in a new reference sytem Sr = (Xr,Yr,Zr) = (sigma 1, sigma 3, sigma 2) ('r' stands for 'rough' solution)
         * Sigma 1 and sigma 3 axes can be defined interactively in the sphere (prefered solution) or chosen in a predefined range.
         *
         * The stress axis Sigma_1 is defined by two angles in PoleCoords: trend and plunge.
         *      trend  = azimuth of sigma 1 in interval [0, 360), measured clockwise from the North
         *      plunge = vertical angle between the horizontal plane and the sigma 1 axis (positive downward), in interval [-90,90]
         * @param param0
         */
        this.poleS1 = new _types__WEBPACK_IMPORTED_MODULE_0__.PoleCoords();
        /**
         * The stress axis Sigma_3 is defined by two angles in PoleCoords: trend and plunge.
         *      trend  = azimuth of sigma 3 in interval [0, 360), measured clockwise from the North
         *      plunge = vertical angle between the horizontal plane and the sigma 3 axis (positive downward), in interval [-90,90]
         *
         * @param param0
         */
        this.poleS3 = new _types__WEBPACK_IMPORTED_MODULE_0__.PoleCoords();
        // The user selects a Master Principal Stress (MPS) and a Subordinate/Slave Principal Stress (SPS), Sigma 1 or Sigma 3:
        //      The trend and plunge of the MPS are defined by the user
        //      The trend of the SPS is defined by the user while the plunge is calculated from the 3 selected angles
        //      The SPS is located in the plane perpendicular to the MPS.
        this.masterStress = MasterStress.Sigma1;
        this.sigma = [0, 0, 0];
        this.Rrot_ = (0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)();
        this.STP_ = (0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)();
        this.ST_ = (0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)();
        this.poleS1.plunge = plungeS1;
        this.poleS3.plunge = plungeS3;
        this.poleS1.trend = trendS1;
        this.poleS3.trend = trendS3;
        this.sigma = [-1, -stressRatio, 0];
        this.changeMasterStress(masterStress);
        // Perfom the computations...
        this.masterSlave();
        this.rotationTensor_Rrot(new _types__WEBPACK_IMPORTED_MODULE_0__.SphericalCoords({ phi: this.phiS1, theta: this.thetaS1 }), new _types__WEBPACK_IMPORTED_MODULE_0__.SphericalCoords({ phi: this.phiS3, theta: this.thetaS3 }));
    }
    changeMasterStress(masterStress) {
        this.masterStress = masterStress;
    }
    get ST() {
        return this.ST_;
    }
    get STP() {
        return this.STP_;
    }
    get stressRatio() {
        return this.sigma[1];
    }
    set plungeS1(v) {
        this.poleS1.plunge = v;
        this.masterSlave();
    }
    set trendS1(v) {
        this.poleS1.trend = v;
        this.masterSlave();
    }
    set plungeS3(v) {
        this.poleS3.plunge = v;
        this.masterSlave();
    }
    set trendS3(v) {
        this.poleS3.trend = v;
        this.masterSlave();
    }
    get plunge() {
        if (this.masterStress === MasterStress.Sigma1) {
            return this.poleS3.plunge;
        }
        else {
            return this.poleS1.plunge;
        }
    }
    /**
     * Example:
     * ```ts
     * const s = new StressTensor({trendS1, plungeS1, trendS3, plungeS3, masterStress, sigma})
     * const r = s.Rrot
     * ```
     */
    get Rrot() {
        return this.Rrot_;
    }
    get RTrot() {
        return (0,_types__WEBPACK_IMPORTED_MODULE_0__.transposeTensor)(this.Rrot_);
    }
    masterSlave() {
        // Calculate the plunge of the Slave stress axis
        if (this.masterStress === MasterStress.Sigma1) {
            // The trend and plunge of sigma 1 are set by the user
            const sigma = (0,_types__WEBPACK_IMPORTED_MODULE_0__.lineSphericalCoords)({
                trend: this.poleS1.trend,
                plunge: this.poleS1.plunge
            });
            // The trend of sigma 3 is set by the user while the plunge of sigma 3 has to be calculated
            this.phiS3 = (0,_types__WEBPACK_IMPORTED_MODULE_0__.trend2phi)(this.poleS3.trend);
            this.thetaS3 = this.thetaSlave(sigma.phi, sigma.theta, this.phiS3);
            this.poleS3.plunge = (0,_types__WEBPACK_IMPORTED_MODULE_0__.rad2deg)(this.thetaS3 - Math.PI / 2);
        }
        else {
            // The trend and plunge of sigma 3 are set by the user
            const sigma = (0,_types__WEBPACK_IMPORTED_MODULE_0__.lineSphericalCoords)({
                trend: this.poleS3.trend,
                plunge: this.poleS3.plunge
            });
            // The trend of sigma 1 is set by the user while the plunge of sigma 3 has to be calculated
            this.phiS1 = (0,_types__WEBPACK_IMPORTED_MODULE_0__.trend2phi)(this.poleS1.trend);
            this.thetaS1 = this.thetaSlave(sigma.phi, sigma.theta, this.phiS1);
            this.poleS1.plunge = (0,_types__WEBPACK_IMPORTED_MODULE_0__.rad2deg)(this.thetaS1 - Math.PI / 2);
        }
    }
    thetaSlave(phiMaster, thetaMaster, phiSlave) {
        // thetaSlave: colatitude or polar angle of the slave stress axis measured downward from the zenith (upward direction) [0, PI)
        let thetaSlave = 0;
        if (thetaMaster > 0 && thetaMaster < Math.PI / 2) {
            // The master stress axis is in the upper hemisphere
            // phi_NormalPlane = azimuthal angle of the normal plane in inteerval [0, 2 PI):
            //  The plane is located in the upper hemisphere in the anticlockwise direction realtive to phi_NormalPlane   
            let phi_NormalPlane = phiMaster + Math.PI / 2;
            if (phi_NormalPlane >= 2 * Math.PI) {
                phi_NormalPlane -= 2 * Math.PI;
            }
            // phi_Y_NormalPlane = inclination angle of the normal fault plane (0, PI/2 )()
            let phi_Y_NormalPlane = thetaMaster;
            // phi_NP_Slave = azimuthal angle between phi_NormalPlane and phiSlave
            let phi_NP_Slave = phiSlave - phi_NormalPlane;
            // Analytic equation relating angles in spherical coords 
            thetaSlave = Math.atan(1 / (Math.sin(phi_NP_Slave) * Math.tan(phi_Y_NormalPlane)));
            if (thetaSlave < 0) {
                thetaSlave += Math.PI;
            }
        }
        else if (thetaMaster > Math.PI / 2) {
            // The master stress axis is in the lower hemisphere
            let phi_NormalPlane = phiMaster - Math.PI / 2;
            if (phi_NormalPlane < 0) {
                phi_NormalPlane += 2 * Math.PI;
            }
            // phi_Y_NormalPlane = inclination angle of the normal fault plane (0, PI/2 )()
            let phi_Y_NormalPlane = Math.PI - thetaMaster;
            // phi_NP_Slave = azimuthal angle between phi_NormalPlane and phiSlave
            let phi_NP_Slave = phiSlave - phi_NormalPlane;
            // Analytic equation relating angles in spherical coords 
            thetaSlave = Math.atan(1 / (Math.sin(phi_NP_Slave) * Math.tan(phi_Y_NormalPlane)));
            if (thetaSlave < 0) {
                thetaSlave += Math.PI;
            }
        }
        else if (thetaMaster === 0) {
            // The master stress axis is vertical
        }
        else if (thetaMaster === Math.PI / 2) { // angle in degrees can be more precise for this test
            // The master stress axis is horizontal
        }
        return thetaSlave;
    }
    rotationTensor_Rrot(sigma_1_sphere, sigma_3_sphere) {
        // This method implements the rotation tensor Rrot between the geographic reference frame S 
        //      and the interactive search reference frame  Sr ('r' stands for 'rough' solution):
        //  The interactive search should lead to a 'rough' estimate of the stress tensor solution (the letters 'r' and 'R' stand for 'rough')
        // Calculate the rotation tensors between right handed reference frames S and Sr, where
        // Sr = (Xr,Yr,Zr) is the principal stress reference frame, parallel to (sigma_1_Sr, sigma_3_Sr, sigma_2_Sr);
        // S =  (X, Y, Z ) is the geographic reference frame  oriented in (East, North, Up) directions.
        //
        // Let Rrot be the rotation tensor R between reference systems S and Sr, such that:
        //      Vr = R V,  where V and Vr are the same vector defined in reference frames S and Sr, respectively
        // The lines of matrix R are given by the unit vectors (nSigma_1_Sr,nSigma_3_Sr,nSigma_2_Sr) parallel to (Xr,Yr,Zr) defined in reference system S:
        const Rrot = (0,_types__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)();
        // 1st line of matrix Rrot (Sigma_1_Sr axis): Unit vector nSigma_1_Sr. The scalar product: nSigma_1_Sr.V = Vr(1)
        Rrot[0][0] = Math.sin(sigma_1_sphere.theta) * Math.cos(sigma_1_sphere.phi);
        Rrot[0][1] = Math.sin(sigma_1_sphere.theta) * Math.sin(sigma_1_sphere.phi);
        Rrot[0][2] = Math.cos(sigma_1_sphere.theta);
        // 2nd line of matrix Rrot (Sigma_3_Sr axis): Unit vector nSigma_3_Sr. The scalar product: nSigma_3_Sr.V = Vr(2)
        Rrot[1][0] = Math.sin(sigma_3_sphere.theta) * Math.cos(sigma_3_sphere.phi);
        Rrot[1][1] = Math.sin(sigma_3_sphere.theta) * Math.sin(sigma_3_sphere.phi);
        Rrot[1][2] = Math.cos(sigma_3_sphere.theta);
        // 3rd line of matrix Rrot (Sigma_2_Sr axis): Unit vector nSigma_2_Sr. The scalar product: nSigma_2_Sr.V = Vr(3)
        // nSigma_2_Sr is calculated from the cross product e3_Sr = e1_Sr x e2_Sr :
        Rrot[2][0] = Rrot[0][1] * Rrot[1][2] - Rrot[0][2] * Rrot[1][1];
        Rrot[2][1] = Rrot[0][2] * Rrot[1][0] - Rrot[0][0] * Rrot[1][2];
        Rrot[2][2] = Rrot[0][0] * Rrot[1][1] - Rrot[0][1] * Rrot[1][0];
        // Let RTrot be the rotation tensor R between reference systems Sr and S, such that:
        //      V = RTrot Vr,  where V and Vr are the same vector defined in reference frames S and Sr, respectively
        this.Rrot_ = Rrot;
        this.stressTensor_Sr_S();
    }
    stressTensor_Sr_S() {
        // Calculate the stress tensor STP in reference frame S from the stress tensor in reference frame Sr:
        //      ST = RTrot STP Rrot
        //
        // where
        //
        //      Sr = (Xr,Yr,Zr) is the principal stress reference frame, parallel to (sigma_1, sigma_3, sigma_2) ('r' stands for 'rough' solution);
        //      S =  (X, Y, Z ) is the geographic reference frame  oriented in (East, North, Up) directions.
        //      STP = Stress tensor in the principal stress reference frame.
        this.STP_ = (0,_types__WEBPACK_IMPORTED_MODULE_0__.stressTensorPrincipalAxes)(this.sigma.map(v => -v));
        const T1 = (0,_types__WEBPACK_IMPORTED_MODULE_0__.multiplyTensors)({ A: (0,_types__WEBPACK_IMPORTED_MODULE_0__.transposeTensor)(this.Rrot_), B: this.STP });
        this.ST_ = (0,_types__WEBPACK_IMPORTED_MODULE_0__.multiplyTensors)({ A: T1, B: this.Rrot_ });
    }
}


/***/ }),

/***/ "./lib/types/index.ts":
/*!****************************!*\
  !*** ./lib/types/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MasterStress": () => (/* reexport safe */ _StressTensor__WEBPACK_IMPORTED_MODULE_4__.MasterStress),
/* harmony export */   "PoleCoords": () => (/* reexport safe */ _PoleCoords__WEBPACK_IMPORTED_MODULE_2__.PoleCoords),
/* harmony export */   "SphericalCoords": () => (/* reexport safe */ _SphericalCoords__WEBPACK_IMPORTED_MODULE_3__.SphericalCoords),
/* harmony export */   "StressTensor": () => (/* reexport safe */ _StressTensor__WEBPACK_IMPORTED_MODULE_4__.StressTensor),
/* harmony export */   "add_Vectors": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.add_Vectors),
/* harmony export */   "angularDifStriations": () => (/* reexport safe */ _mechanics__WEBPACK_IMPORTED_MODULE_6__.angularDifStriations),
/* harmony export */   "arcCircle": () => (/* reexport safe */ _mechanics__WEBPACK_IMPORTED_MODULE_6__.arcCircle),
/* harmony export */   "cloneMatrix3x3": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.cloneMatrix3x3),
/* harmony export */   "constant_x_Vector": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.constant_x_Vector),
/* harmony export */   "crossProduct": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.crossProduct),
/* harmony export */   "deg2rad": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.deg2rad),
/* harmony export */   "displayMatrix3x3": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.displayMatrix3x3),
/* harmony export */   "faultStressComponents": () => (/* reexport safe */ _mechanics__WEBPACK_IMPORTED_MODULE_6__.faultStressComponents),
/* harmony export */   "lineSphericalCoords": () => (/* reexport safe */ _mechanics__WEBPACK_IMPORTED_MODULE_6__.lineSphericalCoords),
/* harmony export */   "minRotAngleRotationTensor": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.minRotAngleRotationTensor),
/* harmony export */   "mohrCircleLine": () => (/* reexport safe */ _mechanics__WEBPACK_IMPORTED_MODULE_6__.mohrCircleLine),
/* harmony export */   "mohrCirclePoint": () => (/* reexport safe */ _mechanics__WEBPACK_IMPORTED_MODULE_6__.mohrCirclePoint),
/* harmony export */   "multiplyTensors": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.multiplyTensors),
/* harmony export */   "newMatrix3x3": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.newMatrix3x3),
/* harmony export */   "newMatrix3x3Identity": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.newMatrix3x3Identity),
/* harmony export */   "newPoint3D": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.newPoint3D),
/* harmony export */   "newVector3D": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.newVector3D),
/* harmony export */   "normalVector": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.normalVector),
/* harmony export */   "normalizeVector": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.normalizeVector),
/* harmony export */   "normalizedCrossProduct": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.normalizedCrossProduct),
/* harmony export */   "properRotationTensor": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.properRotationTensor),
/* harmony export */   "rad2deg": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.rad2deg),
/* harmony export */   "rotationParamsFromRotTensor": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.rotationParamsFromRotTensor),
/* harmony export */   "rotationTensor_Sa_Sb": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.rotationTensor_Sa_Sb),
/* harmony export */   "scalarProduct": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.scalarProduct),
/* harmony export */   "scalarProductUnitVectors": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.scalarProductUnitVectors),
/* harmony export */   "setValueInUnitInterval": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.setValueInUnitInterval),
/* harmony export */   "signedAngularDifStriations": () => (/* reexport safe */ _mechanics__WEBPACK_IMPORTED_MODULE_6__.signedAngularDifStriations),
/* harmony export */   "spherical2unitVectorCartesian": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.spherical2unitVectorCartesian),
/* harmony export */   "stressTensorPrincipalAxes": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.stressTensorPrincipalAxes),
/* harmony export */   "tensor_x_Vector": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.tensor_x_Vector),
/* harmony export */   "transposeTensor": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.transposeTensor),
/* harmony export */   "trend2phi": () => (/* reexport safe */ _mechanics__WEBPACK_IMPORTED_MODULE_6__.trend2phi),
/* harmony export */   "trendPlunge2unitAxis": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.trendPlunge2unitAxis),
/* harmony export */   "unitVectorCartesian2Spherical": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.unitVectorCartesian2Spherical),
/* harmony export */   "vectorMagnitude": () => (/* reexport safe */ _math__WEBPACK_IMPORTED_MODULE_5__.vectorMagnitude)
/* harmony export */ });
/* harmony import */ var _GenericCurve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GenericCurve */ "./lib/types/GenericCurve.ts");
/* harmony import */ var _MohrPoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MohrPoint */ "./lib/types/MohrPoint.ts");
/* harmony import */ var _PoleCoords__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PoleCoords */ "./lib/types/PoleCoords.ts");
/* harmony import */ var _SphericalCoords__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SphericalCoords */ "./lib/types/SphericalCoords.ts");
/* harmony import */ var _StressTensor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StressTensor */ "./lib/types/StressTensor.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./math */ "./lib/types/math.ts");
/* harmony import */ var _mechanics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mechanics */ "./lib/types/mechanics.ts");









/***/ }),

/***/ "./lib/types/math.ts":
/*!***************************!*\
  !*** ./lib/types/math.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add_Vectors": () => (/* binding */ add_Vectors),
/* harmony export */   "cloneMatrix3x3": () => (/* binding */ cloneMatrix3x3),
/* harmony export */   "constant_x_Vector": () => (/* binding */ constant_x_Vector),
/* harmony export */   "crossProduct": () => (/* binding */ crossProduct),
/* harmony export */   "deg2rad": () => (/* binding */ deg2rad),
/* harmony export */   "displayMatrix3x3": () => (/* binding */ displayMatrix3x3),
/* harmony export */   "minRotAngleRotationTensor": () => (/* binding */ minRotAngleRotationTensor),
/* harmony export */   "multiplyTensors": () => (/* binding */ multiplyTensors),
/* harmony export */   "newMatrix3x3": () => (/* binding */ newMatrix3x3),
/* harmony export */   "newMatrix3x3Identity": () => (/* binding */ newMatrix3x3Identity),
/* harmony export */   "newPoint3D": () => (/* binding */ newPoint3D),
/* harmony export */   "newVector3D": () => (/* binding */ newVector3D),
/* harmony export */   "normalVector": () => (/* binding */ normalVector),
/* harmony export */   "normalizeVector": () => (/* binding */ normalizeVector),
/* harmony export */   "normalizedCrossProduct": () => (/* binding */ normalizedCrossProduct),
/* harmony export */   "properRotationTensor": () => (/* binding */ properRotationTensor),
/* harmony export */   "rad2deg": () => (/* binding */ rad2deg),
/* harmony export */   "rotationParamsFromRotTensor": () => (/* binding */ rotationParamsFromRotTensor),
/* harmony export */   "rotationTensor_Sa_Sb": () => (/* binding */ rotationTensor_Sa_Sb),
/* harmony export */   "scalarProduct": () => (/* binding */ scalarProduct),
/* harmony export */   "scalarProductUnitVectors": () => (/* binding */ scalarProductUnitVectors),
/* harmony export */   "setValueInUnitInterval": () => (/* binding */ setValueInUnitInterval),
/* harmony export */   "spherical2unitVectorCartesian": () => (/* binding */ spherical2unitVectorCartesian),
/* harmony export */   "stressTensorPrincipalAxes": () => (/* binding */ stressTensorPrincipalAxes),
/* harmony export */   "tensor_x_Vector": () => (/* binding */ tensor_x_Vector),
/* harmony export */   "transposeTensor": () => (/* binding */ transposeTensor),
/* harmony export */   "trendPlunge2unitAxis": () => (/* binding */ trendPlunge2unitAxis),
/* harmony export */   "unitVectorCartesian2Spherical": () => (/* binding */ unitVectorCartesian2Spherical),
/* harmony export */   "vectorMagnitude": () => (/* binding */ vectorMagnitude)
/* harmony export */ });
/* harmony import */ var _SphericalCoords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SphericalCoords */ "./lib/types/SphericalCoords.ts");

function displayMatrix3x3(msg, m) {
    console.log(msg, ":");
    console.log(m[0][0], m[0][1], m[0][2]);
    console.log(m[1][0], m[1][1], m[1][2]);
    console.log(m[2][0], m[2][1], m[2][2]);
}
/**
 * @category Math
 */
function newPoint3D() {
    return [0, 0, 0];
}
/**
 * @category Math
 */
function newVector3D() {
    return [0, 0, 0];
}
/**
 * @category Math
 */
function newMatrix3x3() {
    return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}
/**
 * @category Math
 */
function cloneMatrix3x3(m) {
    return [[...m[0]], [...m[1]], [...m[2]]];
}
/**
 * @category Math
 */
function newMatrix3x3Identity() {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}
/**
 * @category Math
 */
function deg2rad(a) {
    return a * Math.PI / 180;
}
/**
 * @category Math
 */
const rad2deg = (a) => a / Math.PI * 180;
/**
 * @category Math
 */
function vectorMagnitude(vector) {
    // Calculate the magnitude of the vector
    let magVector = Math.sqrt(vector[0] ** 2 + vector[1] ** 2 + vector[2] ** 2);
    return magVector;
}
/**
 * @category Math
 */
function normalizeVector(vector, norm) {
    if (norm !== undefined) {
        if (norm === 0) {
            throw new Error(`norm is zero`);
        }
        return [vector[0] / norm, vector[1] / norm, vector[2] / norm];
    }
    // Calculate the magnitude of the vector
    let magVector = vectorMagnitude(vector);
    if (magVector === 0) {
        throw new Error(`vector is null and cannot be normalized`);
    }
    return [vector[0] / magVector, vector[1] / magVector, vector[2] / magVector];
}
/**
 * @category Math
 */
function stressTensorPrincipalAxes(sigma) {
    // Calculate the stress tensor STP in the principal stress frame 
    const STP = newMatrix3x3();
    // Stress tensor in the principal stress axis is diagonal
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === j) {
                STP[i][j] = sigma[i];
            }
            else {
                STP[i][j] = 0;
            }
        }
    }
    return STP;
}
/**
 * @category Math
 */
function tensor_x_Vector({ T, V }) {
    // Pre-multply tensor T by vector V
    const TV = newVector3D();
    TV[0] = T[0][0] * V[0] + T[0][1] * V[1] + T[0][2] * V[2];
    TV[1] = T[1][0] * V[0] + T[1][1] * V[1] + T[1][2] * V[2];
    TV[2] = T[2][0] * V[0] + T[2][1] * V[1] + T[2][2] * V[2];
    return TV;
}
/**
 * @category Math
 */
function constant_x_Vector({ k, V }) {
    // multiply vector V by constant k
    const TV = newVector3D();
    TV[0] = k * V[0];
    TV[1] = k * V[1];
    TV[2] = k * V[2];
    return TV;
}
/**
 * @category Math
 */
function add_Vectors({ U, V }) {
    // multiply vector V by constant k
    const TV = newVector3D();
    TV[0] = U[0] + V[0];
    TV[1] = U[1] + V[1];
    TV[2] = U[2] + V[2];
    return TV;
}
/**
 * @category Math
 */
function scalarProduct({ U, V }) {
    // Pre-multply tensor T by vector V
    const UdotV = U[0] * V[0] + U[1] * V[1] + U[2] * V[2];
    return UdotV;
}
/**
 * @category Math
 */
function scalarProductUnitVectors({ U, V }) {
    // Pre-multply tensor T by vector V
    let UdotV = U[0] * V[0] + U[1] * V[1] + U[2] * V[2];
    // The scalar product of unit vectors: -1 <= UdotV <= 1
    UdotV = setValueInUnitInterval(UdotV);
    return UdotV;
}
/**
 * @category Math
 * Scalar value is constrained to interval [-1,1]
 */
function setValueInUnitInterval(U) {
    let V = U;
    if (U > 1) {
        V = 1;
    }
    if (U < -1) {
        V = -1;
    }
    return V;
}
/**
 * @brief Calculate the cross product of 2 vectors U and V: U x V
 * @param {U: Vector3, V: Vector3}
 * @example
 * ```ts
 * const Ua: Vector3 = ...
 * const Va: Vector3 = ...
 * const return = crossProduct({U: Ua, V: Va})
 * ```
 * @category Math
 */
function crossProduct({ U, V }) {
    return [U[1] * V[2] - U[2] * V[1],
        U[2] * V[0] - U[0] * V[2],
        U[0] * V[1] - U[1] * V[0]];
}
/**
 * @brief Calculate the cross product of 2 vectors U and V: U x V
 * @param {U: Vector3, V: Vector3}
 * @example
 * ```ts
 * const Ua: Vector3 = ...
 * const Va: Vector3 = ...
 * const return = crossProduct({U: Ua, V: Va})
 * ```
 * @category Math
 */
function normalizedCrossProduct({ U, V }) {
    let W;
    W = crossProduct({ U, V });
    return normalizeVector(W);
}
/**
 * @brief Calculate the multiplication of 2 tensors A and B: Cik = Aij Bjk
 * @param {A: Matrix3x3, B: Matrix3x3}
 * @example
 * ```ts
 * const Ma: Matrix3x3 = ...
 * const Mb: Matrix3x3 = ...
 * const C = multiplyTensors({A: Ma, B: Mb})
 * ```
 * @category Math
 */
function multiplyTensors({ A, B }) {
    const C = newMatrix3x3();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            C[i][j] = 0;
            for (let k = 0; k < 3; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}
/**
 * @category Math
 */
function transposeTensor(A) {
    // Calculate the multiplication of 2 tensors: Cik = Aij Bjk
    const B = newMatrix3x3();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            B[j][i] = A[i][j];
        }
    }
    return B;
}
/**
 * @category Math
 */
function rotationParamsFromRotTensor(rotTensor) {
    // The cartesian and spherical coords of a unit vector corresponding to the rotation axis are determined 
    // from the components of the tensor definning a proper rotation
    let rotVector;
    // The axis of rotation is determined from the components of the matrix of a proper rotation
    rotVector[0] = rotTensor[2][1] - rotTensor[1][2];
    rotVector[1] = rotTensor[0][2] - rotTensor[2][0];
    rotVector[2] = rotTensor[1][0] - rotTensor[0][1];
    let rotVectorMag = vectorMagnitude(rotVector);
    // The magnitude of rotVector computed this way is ||rotVector|| = 2 sin θ, where θ is the angle of rotation.
    let rotMag = Math.asin(rotVectorMag / 2);
    let rotAxis = undefined;
    if (rotMag > 0) {
        rotAxis = normalizeVector(rotVector, rotMag);
    }
    else {
        rotAxis = [1, 0, 0];
    }
    return {
        rotAxis,
        rotMag
    };
}
/**
 * @category Math
 */
function normalVector({ phi, theta }) {
    /**
     * Define unit vector normal to the fault plane in the upper hemisphere (pointing upward) from angles in spherical coordinates.
     * The normal vector is constnat for each fault plane and is defined in the geographic reference system: S = (X,Y,Z)
    */
    let normal = newVector3D(); // ***
    normal[0] = Math.sin(phi) * Math.cos(theta);
    normal[1] = Math.sin(phi) * Math.sin(theta);
    normal[2] = Math.cos(phi);
    return normal;
}
/**
 * @category Math
 */
function spherical2unitVectorCartesian(spheriCoords) {
    // The principal stress axes and microfault data such as stylolites can be represented by lines.
    // A line is defined by its trend and plunge angles in the geographic reference system:
    // trend = azimuth of the line in interval [0, 360), measured clockwise from the North direction
    // plunge =  vertical angle between the horizontal plane and the sigma 1 axis (positive downward), in interval [0,90]
    // (phi,theta) : spherical coordinate angles defining the unit vector in the geographic reference system: S = (X,Y,Z) = (E,N,Up)
    // phi : azimuthal angle in interval [0, 2 PI), measured anticlockwise from the X axis (East direction) in reference system S
    // theta: colatitude or polar angle in interval [0, PI/2], measured downward from the zenith (upward direction)
    let V = newVector3D();
    V[0] = Math.sin(spheriCoords.theta) * Math.cos(spheriCoords.phi);
    V[1] = Math.sin(spheriCoords.theta) * Math.sin(spheriCoords.phi);
    V[2] = Math.cos(spheriCoords.theta);
    return V;
}
/**
 * @category Math
 */
function unitVectorCartesian2Spherical(V, EPS = 1e-7) {
    // This routine inverts the following equations in spherical coordinates:
    // V[0] = Math.sin(spheriCoords.theta) * Math.cos(spheriCoords.phi)
    // V[1] = Math.sin(spheriCoords.theta) * Math.sin(spheriCoords.phi)
    // V[2] = Math.cos(spheriCoords.theta)
    // (phi,theta) : spherical coordinate angles defining the unit vector in the geographic reference system: S = (X,Y,Z) = (E,N,Up)
    // phi : azimuthal angle in interval [0, 2 PI), measured anticlockwise from the X axis (East direction) in reference system S
    // theta: colatitude or polar angle in interval [0, PI/2], measured downward from the zenith (upward direction)
    let spheriCoords = new _SphericalCoords__WEBPACK_IMPORTED_MODULE_0__.SphericalCoords();
    // Unit vector component V[0] is constrained to interval [-1,1]
    V[2] = setValueInUnitInterval(V[2]);
    // theta = polar angle in interval [0,PI]
    spheriCoords.theta = Math.acos(V[2]);
    let stheta = Math.sin(spheriCoords.theta);
    if (Math.abs(stheta) > EPS) { // In principle, stheta >=0
        // cphi = cos(phi)
        let cphi = V[0] / stheta;
        // cphi is constrained to interval [-1,1]
        cphi = setValueInUnitInterval(cphi);
        // phi is in interval [0,PI]
        spheriCoords.phi = Math.acos(cphi);
        if (V[1] < 0) {
            // phi is in interval (PI,2PI). The angle is obtained by reflexion on the x axis:
            spheriCoords.phi = 2 * Math.PI - spheriCoords.phi;
        }
    }
    else {
        // theta is close to 0 or PI, thus the unit vector is close to the vertical axis
        // phi can take any value
        spheriCoords.phi = 0;
    }
    return spheriCoords;
}
/**
 * @category Math
 */
function properRotationTensor({ nRot, angle }) {
    // Calculate the proper rotation tensor psi corresponding to a rotation angle around a unit axis nRot
    // Psi allows to calculate the new coords of a vector undergoing a given rotation
    const PsiRot = newMatrix3x3();
    let cosa = Math.cos(angle);
    let sina = Math.sin(angle);
    PsiRot[0][0] = cosa + nRot[0] ** 2 * (1 - cosa);
    PsiRot[0][1] = nRot[0] * nRot[1] * (1 - cosa) - nRot[2] * sina;
    PsiRot[0][2] = nRot[0] * nRot[2] * (1 - cosa) + nRot[1] * sina;
    PsiRot[1][0] = nRot[1] * nRot[0] * (1 - cosa) + nRot[2] * sina;
    PsiRot[1][1] = cosa + nRot[1] ** 2 * (1 - cosa);
    PsiRot[1][2] = nRot[1] * nRot[2] * (1 - cosa) - nRot[0] * sina;
    PsiRot[2][0] = nRot[2] * nRot[0] * (1 - cosa) - nRot[1] * sina;
    PsiRot[2][1] = nRot[2] * nRot[1] * (1 - cosa) + nRot[0] * sina;
    PsiRot[2][2] = cosa + nRot[2] ** 2 * (1 - cosa);
    return PsiRot;
}
/**
 * @category Math
 */
function minRotAngleRotationTensor(rotTensor, EPS = 1e-7) {
    // let rotTensor be the rotation tensor between two right-handed references systems Sa = (Xa, Ya, Za) and Sb = (Xb, Yb, Zb) such that:
    //      Vb = rotTensor Va
    // where Va and Vb are corresponding vectors defined in reference systems Sa and Sb, respectively
    // Sa may correspond to the reference system of the principal directions of a stress tensor defined by microstructure kinematics:
    //      a pair of conjugate faults or a neoformed striated plane.
    // Sb may be the reference system of the principal directions of a hypothetical stress tensor defined by the interactive search
    //      or an inverse method. 
    // Recall that the principal stress direction (Sigma 1, Sigma 3, Sigma 2) are parallel to (X, Y, Z), respectively
    // This function calculates the minimum rotation angle between Sa and Sb, by considering the four possible right-handed reference systems
    // that are consistent with principal stress directions in system Sb. 
    // The angle of rotation associated to rotTensor is defined by the trace tr(rotTensor), according to the relation:
    //      tr(rotTensor) = 1 + 2 cos(rotAngle)
    // where rotAngle is in interval [0,PI]
    // Note that the inverse rotation tensor defined by the transposed matrix has the same trace. 
    // Thus the rotation angle is the same for tensors rotTensor and rotTensorT (i.e., transposed)
    let traceRotTensor = new Array(4);
    // The trace of the first rotation tensor such that reference system Sb0 = (Xb, Yb, Zb)
    traceRotTensor[0] = rotTensor[0][0] + rotTensor[1][1] + rotTensor[2][2];
    // The trace of the second rotation tensor such that reference system Sb1 = (Xb, -Yb, -Zb)
    // System Sb1 is obtained by rotating Sb0 at an angle of PI around Xb
    // Note that Sb1 is right-handed and its principal axes are parallel to (Sigma 1, Sigma 3, Sigma 2)
    traceRotTensor[1] = rotTensor[0][0] - rotTensor[1][1] - rotTensor[2][2];
    // The trace of the second rotation tensor such that reference system Sb2 = (-Xb, Yb, -Zb)
    // System Sb2 is obtained by rotating Sb0 at an angle of PI around Yb
    // Note that Sb2 is right-handed and its principal axes are parallel to (Sigma 1, Sigma 3, Sigma 2)
    traceRotTensor[2] = -rotTensor[0][0] + rotTensor[1][1] - rotTensor[2][2];
    // The trace of the second rotation tensor such that reference system Sb3 = (Xb, -Yb, -Zb)
    // System Sb3 is obtained by rotating Sb0 at an angle of PI around Zb
    // Note that Sb3 is right-handed and its principal axes are parallel to (Sigma 1, Sigma 3, Sigma 2)
    traceRotTensor[3] = -rotTensor[0][0] - rotTensor[1][1] + rotTensor[2][2];
    const max = traceRotTensor.reduce((cur, v) => Math.max(cur, v), Number.NEGATIVE_INFINITY);
    let cosMinRotAngle = (max - 1) / 2;
    if (Math.abs(cosMinRotAngle) > 1) {
        if (Math.abs(cosMinRotAngle) > 1 + EPS) {
            throw new Error(`The cosine of the minimum rotation angle of the rotation tensor is not in the unit interval`);
        }
        cosMinRotAngle = setValueInUnitInterval(cosMinRotAngle);
    }
    return Math.acos(cosMinRotAngle);
}
/**
 * @category Math
 */
function rotationTensor_Sa_Sb({ Xb, Yb, Zb }) {
    // Calculate the rotation tensor rotTensor between two reference systems Sa and Sb, such that:
    //  Vb = rotTensor  Va
    //  Va = rotTensorT Vb        (rotTensorT is tensor rotTensor transposed)
    //  Sa = (Xa,Ya,Za) is a right-handed reference system defined by 3 unit vectors (Xa,Ya,Za)
    //  Sb = (Xb,Yb,Zb) is a right-handed reference system defined by 3 unit vectors (Xb,Yb,Zb)
    //  We supposse that the coordinates of unit vectors (Xb,Yb,Zb) are defined in reference system Sa    
    //  Under this hypothesis, the lines of rotTensor are given by the unit vectors (Xb,Yb,Zb)
    //  In other words the coordinates of Vb are obtained from the scalar product of unit vectors (Xb,Yb,Zb) . Va
    let rotTensor = newMatrix3x3();
    // First line is defined by unit vector Xb
    // Note that the scalar product Xb . Va = Vb(X) i.e., The coordinate of vector Vb in Xb direction 
    rotTensor[0][0] = Xb[0];
    rotTensor[0][1] = Xb[1];
    rotTensor[0][2] = Xb[2];
    // Second line is defined by unit vector Yb
    // Note that the scalar product Yb . Va = Vb(Y) i.e., The coordinate of vector Vb in Yb direction 
    rotTensor[1][0] = Yb[0];
    rotTensor[1][1] = Yb[1];
    rotTensor[1][2] = Yb[2];
    // Third line is defined by unit vector Zb
    // Note that the scalar product Zb . Va = Vb(Z) i.e., The coordinate of vector Vb in Zb direction 
    rotTensor[2][0] = Zb[0];
    rotTensor[2][1] = Zb[1];
    rotTensor[2][2] = Zb[2];
    return rotTensor;
}
function trendPlunge2unitAxis({ trend, plunge }) {
    // (phi,theta) : spherical coordinate angles defining the unit vector parallel to a micro/meso structure (e.g., Crystal Fibers in Vein or styloilte teeth).
    //               in the geographic reference system: S = (X,Y,Z) = (E,N,Up)
    // phi : azimuthal angle in interval [0, 2 PI), measured anticlockwise from the X axis (East direction) in reference system S
    // theta: colatitude or polar angle in interval [0, PI], measured downward from the zenith (upward direction)
    //        theta points downward for positive plunges, and upward for negative plunges.
    const coordinates = new _SphericalCoords__WEBPACK_IMPORTED_MODULE_0__.SphericalCoords();
    const unitAxis = newVector3D();
    // The polar angle (or colatitude) theta is calculated in radians from the plunge of the Crystal Fibers :
    coordinates.theta = deg2rad(this.plunge) + Math.PI / 2;
    // The azimuthal angle is calculated in radians from the trend of the Crystal Fibers :
    //      trend + phi = PI / 2 
    coordinates.phi = deg2rad(90 - this.trend);
    if (this.crystal_fibers_trend > 90) {
        // phi < 0
        coordinates.phi = coordinates.phi + 2 * Math.PI;
    }
    // The unit vector parallel to the Crystal Fibers is defined by angles (phi, theta) in spherical coordinates.
    // normal: unit vector parallel to the Crystal Fibers in Vein defined in the geographic reference system: S = (X,Y,Z)
    return spherical2unitVectorCartesian(coordinates);
}


/***/ }),

/***/ "./lib/types/mechanics.ts":
/*!********************************!*\
  !*** ./lib/types/mechanics.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "angularDifStriations": () => (/* binding */ angularDifStriations),
/* harmony export */   "arcCircle": () => (/* binding */ arcCircle),
/* harmony export */   "faultStressComponents": () => (/* binding */ faultStressComponents),
/* harmony export */   "lineSphericalCoords": () => (/* binding */ lineSphericalCoords),
/* harmony export */   "mohrCircleLine": () => (/* binding */ mohrCircleLine),
/* harmony export */   "mohrCirclePoint": () => (/* binding */ mohrCirclePoint),
/* harmony export */   "signedAngularDifStriations": () => (/* binding */ signedAngularDifStriations),
/* harmony export */   "trend2phi": () => (/* binding */ trend2phi)
/* harmony export */ });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ "./lib/types/math.ts");
/* harmony import */ var _SphericalCoords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SphericalCoords */ "./lib/types/SphericalCoords.ts");
/* harmony import */ var _analysis_Curve3D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../analysis/Curve3D */ "./lib/analysis/Curve3D.ts");



/**
 * @category Mechanics
 */
function faultStressComponents({ stressTensor, normal }) {
    // Calculate the stress components applied on a fault plane as a result of a stress tensor StressTensor defined in the reference system S
    // normal: unit vector normal to the fault plane (pointing upward) defined in the geographic reference system: S = (X,Y,Z)
    // Calculate total stress vector
    let stress = (0,_math__WEBPACK_IMPORTED_MODULE_0__.tensor_x_Vector)({ T: stressTensor, V: normal });
    // Calculate normal stress (positive = extension, negative = compression). 
    // In principle the normal stress is negative since the principal stresses are <= 0.
    let normalStress = (0,_math__WEBPACK_IMPORTED_MODULE_0__.scalarProduct)({ U: stress, V: normal });
    // Calculate the shear stress vector in reference system S
    // shearStress + normalStress * normal = stress (i.e., total stress)
    let shearStress = [0, 0, 0];
    shearStress[0] = stress[0] - normalStress * normal[0];
    shearStress[1] = stress[1] - normalStress * normal[1];
    shearStress[2] = stress[2] - normalStress * normal[2];
    let shearStressMag = (0,_math__WEBPACK_IMPORTED_MODULE_0__.vectorMagnitude)(shearStress);
    return {
        shearStress,
        normalStress,
        shearStressMag
    };
}
/**
 * @category Mechanics
 */
function angularDifStriations({ e_striation, shearStress, shearStressMag }) {
    // Calculate the angular difference between the measured and calculated striations
    // The angular difference calculated by the scalar product is unsigned (in interval [0,Pi])
    let angularDifStriae = 0;
    if (shearStressMag > 0) {
        // The angular difference is calculated using the scalar product: 
        //      e_striation . shearStress = |e_striation| |shearStress| cos(angularDifStriae) = 1 . shearStressMag . cos(angularDifStriae)
        angularDifStriae = (Math.acos(e_striation[0] * shearStress[0] + e_striation[1] * shearStress[1]
            + e_striation[2] * shearStress[2])) / shearStressMag;
    }
    else {
        // The calculated shear stress is zero (i.e., the fault plane is parallel to a principal stress)
        // In such situation we may consider that the calculated striation can have any direction.
    }
    return angularDifStriae;
}
/**
 * @category Mechanics
 */
function signedAngularDifStriations({ normal, e_striation, shearStress, shearStressMag }) {
    // Calculate the angular difference between the measured and calculated striations
    // The angular difference calculated by the scalar product is unsigned (in interval [0,Pi])
    let angularDifStriae = 0;
    let nAux;
    if (shearStressMag > 0) {
        // The angular difference is calculated using the scalar product in interval [0,PI]: 
        //      e_striation . shearStress = |e_striation| |shearStress| cos(angularDifStriae) = 1 . shearStressMag . cos(angularDifStriae)
        angularDifStriae = (Math.acos(e_striation[0] * shearStress[0] + e_striation[1] * shearStress[1]
            + e_striation[2] * shearStress[2])) / shearStressMag;
        // nAux = auxiliary normal vector pointing outward (i.e., in the same direction as normal vector) if the angle between the measured and calculated striation
        //        is positive - anti-clockwise in interval (0,PI).
        //        Conversely, nAux points in the opposite direction if the angle is clockwise - negative, in interval (-PI,0)           
        let nAux = (0,_math__WEBPACK_IMPORTED_MODULE_0__.crossProduct)({ U: e_striation, V: shearStress });
        let sAux = (0,_math__WEBPACK_IMPORTED_MODULE_0__.scalarProduct)({ U: normal, V: nAux });
        if (sAux < 0) {
            // angularDifStriae is negative (i.e., clokwise, in interval (-PI,0) )
            angularDifStriae = -angularDifStriae;
        }
    }
    else {
        // The calculated shear stress is zero (i.e., the fault plane is parallel to a principal stress)
        // In such situation we may consider that the calculated striation can have any direction.
    }
    return angularDifStriae;
}
/**
 * @category Mechanics
 */
function mohrCircleLine({ r, first, second, sigma_1, sigma_2, sigma_3 }) {
    const lineBuilder = new _analysis_Curve3D__WEBPACK_IMPORTED_MODULE_2__.Curve3D();
    if (sigma_2 == sigma_3) {
        // Particular Case 1: revolution stress tensor around sigma_1
        // In such situation, points pO and p1 have equal coordinates and alfa angles
        // Curve is a circle sweeping at an angle alfa0 around sigma_1
        return arcCircle({ r: r, sigma: 'sigma_1', alpha: first.angle });
    }
    else if (sigma_2 == sigma_1) {
        // Particular Case 2: revolution stress tensor around sigma_3
        // In such situation, points pO and p1 have equal coordinates and alfa angles
        // Curve is a circle sweeping at an angle PI/2 - alfa0 around sigma_3
        return arcCircle({ r: r, sigma: 'sigma_3', alpha: Math.PI / 2 - first.angle });
    }
    else {
        // General Case:
        // Add to the list the initial point of the line segment located in one of the 3 Mohr circles
        lineBuilder.addPoint(mohrCirclePoint({ mohrCirc: first.circle, alfa: first.angle, r }));
        // Add to the list the intermediate points of the line segment located between 2 Mohr circles
        // We calculate the direction cosines of the unit vector normal to the fault whose stress state is given by (X, Y)
        //      Note that (X,Y) are the normal and shear stress of a moving point along the Mohr-Coulomb line segment 
        // Without loss of generality, we suppose a stress tensor in strike-slip regime (fixing sigma_1 Eastward and sigma_3 Northward)
        let sigma_X = sigma_1;
        let sigma_Y = sigma_3;
        let sigma_Z = sigma_2;
        for (let i = 1; i < 180; ++i) {
            let X = first.p[0] + (second.p[0] - first.p[0]) * i / 180;
            let Y = first.p[1] + (second.p[1] - first.p[1]) * i / 180;
            let nx = Math.sqrt(((sigma_Y - X) * (sigma_Z - X) + Y ** 2) / ((sigma_Y - sigma_X) * (sigma_Z - sigma_X)));
            let ny = Math.sqrt(((sigma_Z - X) * (sigma_X - X) + Y ** 2) / ((sigma_Z - sigma_Y) * (sigma_X - sigma_Y)));
            let nz = Math.sqrt(((sigma_X - X) * (sigma_Y - X) + Y ** 2) / ((sigma_X - sigma_Z) * (sigma_Y - sigma_Z)));
            const x = r * nx;
            const y = r * ny;
            const z = r * nz;
            lineBuilder.addPoint(x, y, z);
        }
        // Add to the list the final point of the line segment located in one of the 3 Mohr circles
        lineBuilder.addPoint(mohrCirclePoint({ mohrCirc: second.circle, alfa: second.angle, r }));
        return lineBuilder.buffer;
    }
}
/**
 * @category Mechanics
 */
function mohrCirclePoint({ r, mohrCirc, alfa }) {
    // Add to the list the initial or final point of the line segment located in one of the 3 Mohr circles
    if (mohrCirc == '3_1') {
        // The point is located in Mohr circle between sigma_3 and sigma_1
        // alfa is the azimuthal angle in the reference frame (x,y,z) = (sigma_1,sigma_3, sigma_2) = (East, North, Up)
        const theta = Math.PI / 2;
        const phi = alfa;
        return [
            r * Math.sin(theta) * Math.cos(phi),
            r * Math.sin(theta) * Math.sin(phi),
            r * Math.cos(theta)
        ];
    }
    else if (mohrCirc == '3_2') {
        // The point is located in Mohr circle between sigma_3 and sigma_2
        // alfa is the polar angle in the reference frame (x,y,z) = (sigma_1,sigma_3, sigma_2) = (East, North, Up)
        const theta = alfa;
        const phi = Math.PI / 2;
        return [
            r * Math.sin(theta) * Math.cos(phi),
            r * Math.sin(theta) * Math.sin(phi),
            r * Math.cos(theta)
        ];
    }
    else {
        // MohrCirc == '2_1'
        // The point is located in Mohr circle between sigma_2 and sigma_1
        // alfa is the latitude angle in the reference frame (x,y,z) = (sigma_1,sigma_3, sigma_2) = (East, North, Up)
        const theta = Math.PI / 2 - alfa;
        const phi = 0;
        return [
            r * Math.sin(theta) * Math.cos(phi),
            r * Math.sin(theta) * Math.sin(phi),
            r * Math.cos(theta)
        ];
    }
}
/**
 * Usage:
 * ```ts
 * const arc = arcCircle({alpha: deg2rad(12), sigma: '3_1'})
 * ```
 * @category Mechanics
 */
function arcCircle({ r, sigma, alpha }) {
    const lineBuilder = new _analysis_Curve3D__WEBPACK_IMPORTED_MODULE_2__.Curve3D();
    if (sigma === 'sigma_1') {
        // Particular case 1: sigma_2 = sigma_3 (revolution stress tensor around sigma_1)
        // Generate a circular segment (one quarter of a circle) sweeping an angle alfa around sigma_1
        const x = r * Math.cos(alpha);
        const rad_circle = r * Math.sin(alpha);
        for (let i = 1; i <= 180; ++i) {
            let beta = Math.PI * i / 360;
            const y = rad_circle * Math.cos(beta);
            const z = rad_circle * Math.sin(beta);
            lineBuilder.addPoint(x, y, z);
        }
    }
    else if (sigma === 'sigma_3') {
        // Particular case 2: sigma_2 = sigma_1 (revolution stress tensor around sigma_3)
        // Generate a circular segment (one quarter of a circle) sweeping an angle alfa around sigma_3
        const y = r * Math.cos(alpha);
        const rad_circle = r * Math.sin(alpha);
        for (let i = 1; i <= 180; ++i) {
            let beta = Math.PI * i / 360;
            const x = rad_circle * Math.cos(beta);
            const z = rad_circle * Math.sin(beta);
            lineBuilder.addPoint(x, y, z);
        }
    }
    return lineBuilder.buffer;
}
/**
 * @category Mechanics
 */
function lineSphericalCoords({ trend, plunge }) {
    // The principal stress axes and microfault data such as stylolites can be represented by lines.
    // A line is defined by its trend and plunge angles in the geographic reference system:
    // trend = azimuth of the line in interval [0, 360), measured clockwise from the North direction
    // plunge =  vertical angle between the horizontal plane and the sigma 1 axis (positive downward), in interval [0,90]
    // (phi,theta) : spherical coordinate angles defining the unit vector in the geographic reference system: S = (X,Y,Z) = (E,N,Up)
    // phi : azimuthal angle in interval [0, 2 PI), measured anticlockwise from the X axis (East direction) in reference system S
    // theta: colatitude or polar angle in interval [0, PI/2], measured downward from the zenith (upward direction)
    let phi = trend2phi(trend);
    let theta = (0,_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(plunge) + Math.PI / 2;
    return new _SphericalCoords__WEBPACK_IMPORTED_MODULE_1__.SphericalCoords({ phi, theta });
}
/**
 * @category Mechanics
 */
function trend2phi(trend) {
    // Calculate the value of phi from the trend
    // trend = azimuth of the line in interval [0, 360), measured clockwise from the North direction
    // phi : azimuthal angle in interval [0, 2 PI), measured anticlockwise from the X axis (East direction) in reference system S
    // trend + phi = 5 PI / 2
    let phi = 5 * Math.PI / 2 - (0,_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(trend);
    if (phi >= 2 * Math.PI) {
        phi -= 2 * Math.PI;
    }
    return phi;
}


/***/ }),

/***/ "./lib/utils/CompactionShearBandsHelper.ts":
/*!*************************************************!*\
  !*** ./lib/utils/CompactionShearBandsHelper.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompactionShearBandsHelper": () => (/* binding */ CompactionShearBandsHelper)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _FaultHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FaultHelper */ "./lib/utils/FaultHelper.ts");


class CompactionShearBandsHelper {
    constructor() {
        // (e_phi, e_theta) = unit vectors defining local reference frame tangent to the sphere in spherical coordinates
        this.e_phi = (0,_types__WEBPACK_IMPORTED_MODULE_0__.newVector3D)();
        this.e_theta = (0,_types__WEBPACK_IMPORTED_MODULE_0__.newVector3D)();
        this.normal_ = (0,_types__WEBPACK_IMPORTED_MODULE_0__.newVector3D)();
        this.nStriation = undefined;
        this.EPS = 1e-7;
    }
    static create({ strike, dipDirection, dip, typeOfMovement, rake, strikeDirection, trend, trendIsDefined }) {
        /*
        const f = new FaultHelper({strike, dipDirection, dip})
        f.setStriation({typeOfMovement, rake, strikeDirection})
        return {
            nPlane: f.normal,
            nStriation: f.striation,
            nPerpStriation: f.e_perp_striation,
            fault: f
        }
        */
        const f = _FaultHelper__WEBPACK_IMPORTED_MODULE_1__.FaultHelper.create({ strike, dip, dipDirection }, { rake, strikeDirection, typeOfMovement, trend, trendIsDefined });
        return {
            nPlane: f.normal,
            nStriation: f.striation,
            nPerpStriation: f.e_perp_striation,
            fault: f
        };
    }
    get normal() {
        return this.normal_;
    }
    compactionShearBandCheckMouvement({ noPlane, nPlane, coordinates, typeOfMovement, nSigma3_Sc, nSigma2_Sc }) {
        // Function calculating the striation unit vector in the local reference frame in polar coordinates from the rake
        //      The effect of fault movement on the striation is considered in function faultStriationAngle_B
        // Each fault is defined by a set of parameters as follows:
        //      The fault plane orientation is defined by three parameters:
        //      Fault strike: clockwise angle measured from the North direction [0, 360)
        //      Strike direction (optional): (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
        //      Fault dip: [0, 90]
        //      Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
        // The orientation of the striation in the fault plane can defined in two different ways (which are exclusive):
        // 1-   Rake (or pitch) [0,90], measured from the strike direction, which points in one of the two opposite directions of the fault strike.
        //      Strike direction : (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
        //      Note that the specified strike direction is used to determine the spatial orientation of the striation 
        // 2-   For shallow-dipping planes (i.e., the compass inclinometer is inaccurate):
        //      Striae trend: [0, 360)
        // alphaStria : striation angle measured in the local reference plane (e_phi, e_theta) indicating the motion of the outward block
        //      alphaStria is measured clockwise from e_phi, in interval [0, 2 PI) (this choice is consistent with the definition of the rake, which is measured from the fault strike)
        // (coordinates.phi, coordinates.theta) : spherical coords of compaction-shear band in the geographic reference system: S = (X,Y,Z) = (E,N,Up)
        // Sperical coords are calculated using method faultSphericalCoords in class fault
        // e_phi : unit vector pointing toward the azimuthal direction in the local reference frame in spherical coords
        this.e_phi[0] = -Math.sin(coordinates.phi);
        this.e_phi[1] = Math.cos(coordinates.phi);
        this.e_phi[2] = 0;
        // e_theta : unit vector pointing toward the dip direction in the local reference frame in spherical coords
        this.e_theta[0] = Math.cos(coordinates.theta) * Math.cos(coordinates.phi);
        this.e_theta[1] = Math.cos(coordinates.theta) * Math.sin(coordinates.phi);
        this.e_theta[2] = -Math.sin(coordinates.theta);
        // Check that the sense of mouvement is consistent with the orientation of stress axes
        // This requires the calculation of the striation vector indicating movement of the outward block relative to the inner block
        // The striation vector is in the plane of movement:  nStriation = nPlane x nSigma2_Sc
        let nStriation = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct)({ U: nPlane, V: nSigma2_Sc });
        if ((0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nPlane, V: nSigma3_Sc }) < 0) {
            // nSigma3_Sc points inward (toward the fault plane)
            // Thus, invert the sense of nSigma3_Sc so that it points outward (in the direction of the normal to the plane):
            nSigma3_Sc = (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: nSigma3_Sc });
        }
        if ((0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nStriation, V: nSigma3_Sc }) < 0) {
            // nSigma3_Sc and nStriation should be both located in the compressional quadrant relative to the outward hemisphere of the fault plane
            //      In other words, the angle (nSigma3_Sc, nStriation) < PI/2
            // However, if nStriation . nSigma3_Sc < 0 then this condition is not satisfied (i.e. nStriation is located in the dilatant quadrant)
            // Thus, invert the sense of the striation so that it points toward the compressional quadrant:
            nStriation = (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: nStriation });
        }
        // The strike slip component of movement is defined by the projection of the striation vector along unit vector e_phi
        let strikeSlipComponent = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nStriation, V: this.e_phi });
        // The dip component of movement is defined by the projection of the striation vector along unit vector e_theta
        let dipComponent = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nStriation, V: this.e_theta });
        // Check consistency of strike-lateral component of movement
        if (strikeSlipComponent > this.EPS) {
            // In principle, the conjugated plane has a left-lateral component of movement
            if (typeOfMovement === 2 /* TypeOfMovement.RL */ || typeOfMovement === 4 /* TypeOfMovement.N_RL */ || typeOfMovement === 6 /* TypeOfMovement.I_RL */) {
                // throw new Error('Sense of movement of conjugated fault ' + noPlane + ' includes a right-lateral (RL) which is not consistent with fault kenmatics')
                throw new Error(`Sense of movement of conjugated fault ${noPlane} includes a right-lateral (RL) which is not consistent with fault kenmatics`);
            }
        }
        else if (strikeSlipComponent < -this.EPS) {
            // In principle, the conjugated plane has a right-lateral component of movement
            if (typeOfMovement === 3 /* TypeOfMovement.LL */ || typeOfMovement === 5 /* TypeOfMovement.N_LL */ || typeOfMovement === 7 /* TypeOfMovement.I_LL */) {
                throw new Error(`Sense of movement of conjugated fault ${noPlane} includes a left-lateral (LL), which is not consistent with fault kenmatics`);
            }
        }
        else {
            // In principle, the strike-slip component of movement of the conjugated plane is negligeable
            if (typeOfMovement !== 0 /* TypeOfMovement.N */ && typeOfMovement !== 1 /* TypeOfMovement.I */ && typeOfMovement !== 8 /* TypeOfMovement.UND */) {
                throw new Error(`Sense of movement of conjugated fault ${noPlane} includes a strike-slip component, which is not consistent with fault kenmatics`);
            }
        }
        // Check consistency of dip-slip component of movement
        if (dipComponent > this.EPS) {
            // In principle, the conjugated plane has a normal component of movement
            if (typeOfMovement === 1 /* TypeOfMovement.I */ || typeOfMovement === 6 /* TypeOfMovement.I_RL */ || typeOfMovement === 7 /* TypeOfMovement.I_LL */) {
                throw new Error(`Sense of movement of conjugated fault ${noPlane} includes an inverse (I) component, which is not consistent with fault kenmatics`);
            }
        }
        else if (dipComponent < -this.EPS) {
            // In principle, the conjugated plane has an inverse component of movement
            if (typeOfMovement === 0 /* TypeOfMovement.N */ || typeOfMovement === 4 /* TypeOfMovement.N_RL */ || typeOfMovement === 5 /* TypeOfMovement.N_LL */) {
                throw new Error(`Sense of movement of conjugated fault ${noPlane} includes a normal component, which is not consistent with fault kenmatics`);
            }
        }
        else {
            // In principle, the dip component of movement of the conjugated plane is negligeable
            if (typeOfMovement !== 2 /* TypeOfMovement.RL */ && typeOfMovement !== 3 /* TypeOfMovement.LL */ && typeOfMovement !== 8 /* TypeOfMovement.UND */) {
                throw new Error(`Sense of movement of conjugated fault ${noPlane} includes an dip component (I or N), which is not consistent with fault kenmatics`);
            }
        }
    }
}


/***/ }),

/***/ "./lib/utils/ConjugatePlanesHelper.ts":
/*!********************************************!*\
  !*** ./lib/utils/ConjugatePlanesHelper.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConjugatePlanesHelper": () => (/* binding */ ConjugatePlanesHelper)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
/* harmony import */ var _FaultHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FaultHelper */ "./lib/utils/FaultHelper.ts");


class ConjugatePlanesHelper {
    constructor() {
        // (e_phi, e_theta) = unit vectors defining local reference frame tangent to the sphere in spherical coordinates
        this.e_phi = (0,_types__WEBPACK_IMPORTED_MODULE_0__.newVector3D)();
        this.e_theta = (0,_types__WEBPACK_IMPORTED_MODULE_0__.newVector3D)();
        this.normal_ = (0,_types__WEBPACK_IMPORTED_MODULE_0__.newVector3D)();
        this.nStriation = undefined;
        this.EPS = 1e-7;
    }
    static create({ strike, dipDirection, dip, typeOfMovement, rake, strikeDirection }) {
        // const f = new FaultHelper({strike, dipDirection, dip})
        // f.setStriation({typeOfMovement, rake, strikeDirection})
        // return {
        //     nPlane: f.normal,
        //     nStriation: f.striation,
        //     nPerpStriation: f.e_perp_striation,
        //     fault: f
        // }
        const f = _FaultHelper__WEBPACK_IMPORTED_MODULE_1__.FaultHelper.create({ strike, dip, dipDirection }, { rake, strikeDirection, typeOfMovement, trend: 0, trendIsDefined: false });
        return {
            nPlane: f.normal,
            nStriation: f.striation,
            nPerpStriation: f.e_perp_striation,
            fault: f
        };
    }
    get normal() {
        return this.normal_;
    }
    conjugatePlaneCheckmovement({ noPlane, nPlane, coordinates, typeOfMovement, nSigma3_Sm, nSigma2_Sm }) {
        // The striation vector (or shear sense in the case of shear bands) for conjugate planes is NOT defined in the data file.
        //      The striation is calculated from geometric data by considering that it is located in the plane of movement, 
        //      consistently with the type of movement, i.e. in the compressional quadrants.
        // This method calculates the striation unit vector in the local reference frame in polar coordinates from the calculated rake
        //      The effect of fault movement on the striation is considered in function faultStriationAngle_B
        // Each fault is defined by a set of parameters as follows:
        //      The fault plane orientation is defined by three parameters:
        //      Fault strike: clockwise angle measured from the North direction [0, 360)
        //      Strike direction (optional): (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
        //      Fault dip: [0, 90]
        //      Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
        // The orientation of the striation in the fault plane can defined in two different ways (which are exclusive):
        // 1-   Rake (or pitch) [0,90], measured from the strike direction, which points in one of the two opposite directions of the fault strike.
        //      Strike direction : (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
        //      Note that the specified strike direction is used to determine the spatial orientation of the striation 
        // 2-   For shallow-dipping planes (i.e., the compass inclinometer is inaccurate):
        //      Striae trend: [0, 360)
        // alphaStria : striation angle measured in the local reference plane (e_phi, e_theta) indicating the motion of the outward block
        //      alphaStria is measured clockwise from e_phi, in interval [0, 2 PI) (this choice is consistent with the definition of the rake, which is measured from the fault strike)
        // (coordinates.phi, coordinates.theta) : spherical coords of conjugate faults in the geographic reference system: S = (X,Y,Z) = (E,N,Up)
        // Sperical coords are calculated using method faultSphericalCoords in class fault
        // e_phi : unit vector pointing toward the azimuthal direction in the local reference frame in spherical coords
        this.e_phi[0] = -Math.sin(coordinates.phi);
        this.e_phi[1] = Math.cos(coordinates.phi);
        this.e_phi[2] = 0;
        // e_theta : unit vector pointing toward the dip direction in the local reference frame in spherical coords
        this.e_theta[0] = Math.cos(coordinates.theta) * Math.cos(coordinates.phi);
        this.e_theta[1] = Math.cos(coordinates.theta) * Math.sin(coordinates.phi);
        this.e_theta[2] = -Math.sin(coordinates.theta);
        // Check that the sense of movement is consistent with the orientation of stress axes
        // This requires the calculation of the striation vector indicating movement of the outward block relative to the inner block
        // The striation vector is in the plane of movement:  nStriation = nPlane x nSigma2_Sm
        let nStriation = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct)({ U: nPlane, V: nSigma2_Sm });
        if ((0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nPlane, V: nSigma3_Sm }) < 0) {
            // nSigma3_Sm points inward (toward the fault plane)
            // Thus, invert the sense of nSigma3_Sm so that it points outward (in the direction of the normal to the plane):
            nSigma3_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: nSigma3_Sm });
        }
        if ((0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nStriation, V: nSigma3_Sm }) < 0) {
            // nSigma3_Sm and nStriation should be both located in the compressional quadrant relative to the outward hemisphere of the fault plane
            //      In other words, the angle (nSigma3_Sm, nStriation) < PI/2
            // However, if nStriation . nSigma3_Sm < 0 then this condition is not satisfied (i.e. nStriation is located in the dilatant quadrant)
            // Thus, invert the sense of the striation so that it points toward the compressional quadrant:
            nStriation = (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: nStriation });
        }
        // The strike-slip component of movement is defined by the projection of the striation vector along unit vector e_phi
        let strikeSlipComponent = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nStriation, V: this.e_phi });
        // The dip component of movement is defined by the projection of the striation vector along unit vector e_theta
        let dipComponent = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nStriation, V: this.e_theta });
        // Check consistency of strike-lateral component of movement
        if (strikeSlipComponent > this.EPS) {
            // In principle, the conjugate plane has a left-lateral component of movement
            if (typeOfMovement === 2 /* TypeOfMovement.RL */ || typeOfMovement === 4 /* TypeOfMovement.N_RL */ || typeOfMovement === 6 /* TypeOfMovement.I_RL */) {
                // throw new Error('Sense of movement of conjugate plane ' + noPlane + ' includes a right-lateral (RL) which is not consistent with fault kinematics')
                throw new Error(`Sense of movement of conjugate plane ${noPlane} includes a right-lateral (RL) which is not consistent with fault kinematics`);
            }
        }
        else if (strikeSlipComponent < -this.EPS) {
            // In principle, the conjugate plane has a right-lateral component of movement
            if (typeOfMovement === 3 /* TypeOfMovement.LL */ || typeOfMovement === 5 /* TypeOfMovement.N_LL */ || typeOfMovement === 7 /* TypeOfMovement.I_LL */) {
                throw new Error(`Sense of movement of conjugate plane ${noPlane} includes a left-lateral (LL), which is not consistent with fault kinematics`);
            }
        }
        else {
            // In principle, the strike-slip component of movement of the conjugate plane is negligeable
            if (typeOfMovement !== 0 /* TypeOfMovement.N */ && typeOfMovement !== 1 /* TypeOfMovement.I */ && typeOfMovement !== 8 /* TypeOfMovement.UND */) {
                throw new Error(`Sense of movement of conjugate plane ${noPlane} includes a strike-slip component, which is not consistent with fault kinematics`);
            }
        }
        // Check consistency of dip-slip component of movement
        if (dipComponent > this.EPS) {
            // In principle, the conjugate plane has a normal component of movement
            if (typeOfMovement === 1 /* TypeOfMovement.I */ || typeOfMovement === 6 /* TypeOfMovement.I_RL */ || typeOfMovement === 7 /* TypeOfMovement.I_LL */) {
                throw new Error(`Sense of movement of conjugate plane ${noPlane} includes an inverse (I) component, which is not consistent with fault kinematics`);
            }
        }
        else if (dipComponent < -this.EPS) {
            // In principle, the conjugate plane has an inverse component of movement
            if (typeOfMovement === 0 /* TypeOfMovement.N */ || typeOfMovement === 4 /* TypeOfMovement.N_RL */ || typeOfMovement === 5 /* TypeOfMovement.N_LL */) {
                throw new Error(`Sense of movement of conjugate plane ${noPlane} includes a normal component, which is not consistent with fault kinematics`);
            }
        }
        else {
            // In principle, the dip component of movement of the conjugate plane is negligeable
            if (typeOfMovement !== 2 /* TypeOfMovement.RL */ && typeOfMovement !== 3 /* TypeOfMovement.LL */ && typeOfMovement !== 8 /* TypeOfMovement.UND */) {
                throw new Error(`Sense of movement of conjugate plane ${noPlane} includes an dip component (I or N), which is not consistent with fault kinematics`);
            }
        }
    }
    perpendicularPlanesCheckmovement({ noPlane, nPlane, coordinates, typeOfMovement, nSigma3_Sm, nSigma2_Sm }) {
        // The striation vector (or shear sense in the case of shear bands) for conjugate planes is NOT defined in the data file.
        //      The striation is calculated from geometric data by considering that it is located in the plane of movement, 
        //      consistently with the type of movement, i.e. in the compressional quadrants.
        // This method calculates the striation unit vector in the local reference frame in polar coordinates from the calculated rake
        //      The effect of fault movement on the striation is considered in function faultStriationAngle_B
        // Each fault is defined by a set of parameters as follows:
        //      The fault plane orientation is defined by three parameters:
        //      Fault strike: clockwise angle measured from the North direction [0, 360)
        //      Strike direction (optional): (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
        //      Fault dip: [0, 90]
        //      Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
        // The orientation of the striation in the fault plane can defined in two different ways (which are exclusive):
        // 1-   Rake (or pitch) [0,90], measured from the strike direction, which points in one of the two opposite directions of the fault strike.
        //      Strike direction : (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
        //      Note that the specified strike direction is used to determine the spatial orientation of the striation 
        // 2-   For shallow-dipping planes (i.e., the compass inclinometer is inaccurate):
        //      Striae trend: [0, 360)
        // alphaStria : striation angle measured in the local reference plane (e_phi, e_theta) indicating the motion of the outward block
        //      alphaStria is measured clockwise from e_phi, in interval [0, 2 PI) (this choice is consistent with the definition of the rake, which is measured from the fault strike)
        // (coordinates.phi, coordinates.theta) : spherical coords of conjugate faults in the geographic reference system: S = (X,Y,Z) = (E,N,Up)
        // Spherical coords are calculated using method faultSphericalCoords in class fault
        // This method returns a boolean indicating if the current stress axes orientations are consistent with type of mouveement
        // e_phi : unit vector pointing toward the azimuthal direction in the local reference frame in spherical coords
        this.e_phi[0] = -Math.sin(coordinates.phi);
        this.e_phi[1] = Math.cos(coordinates.phi);
        this.e_phi[2] = 0;
        // e_theta : unit vector pointing toward the dip direction in the local reference frame in spherical coords
        this.e_theta[0] = Math.cos(coordinates.theta) * Math.cos(coordinates.phi);
        this.e_theta[1] = Math.cos(coordinates.theta) * Math.sin(coordinates.phi);
        this.e_theta[2] = -Math.sin(coordinates.theta);
        // Check that the sense of movement is consistent with the orientation of stress axes
        // This requires the calculation of the striation vector indicating movement of the outward block relative to the inner block
        // The striation vector is in the plane of movement:  nStriation = nPlane x nSigma2_Sm
        let nStriation = (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct)({ U: nPlane, V: nSigma2_Sm });
        if ((0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nPlane, V: nSigma3_Sm }) < 0) {
            // nSigma3_Sm points inward (toward the fault plane)
            // Thus, invert the sense of nSigma3_Sm so that it points outward (in the direction of the normal to the plane):
            nSigma3_Sm = (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: nSigma3_Sm });
        }
        if ((0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nStriation, V: nSigma3_Sm }) < 0) {
            // nSigma3_Sm and nStriation should be both located in the compressional quadrant relative to the outward hemisphere of the fault plane
            //      In other words, the angle (nSigma3_Sm, nStriation) < PI/2
            // However, if nStriation . nSigma3_Sm < 0 then this condition is not satisfied (i.e. nStriation is located in the dilatant quadrant)
            // Thus, invert the sense of the striation so that it points toward the compressional quadrant:
            nStriation = (0,_types__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: nStriation });
        }
        // The strike-slip component of movement is defined by the projection of the striation vector along unit vector e_phi
        let strikeSlipComponent = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nStriation, V: this.e_phi });
        // The dip component of movement is defined by the projection of the striation vector along unit vector e_theta
        let dipComponent = (0,_types__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors)({ U: nStriation, V: this.e_theta });
        // Check consistency of strike-lateral component of movement
        if (strikeSlipComponent > this.EPS) {
            // In principle, the conjugate plane has a left-lateral component of movement
            if (typeOfMovement === 2 /* TypeOfMovement.RL */ || typeOfMovement === 4 /* TypeOfMovement.N_RL */ || typeOfMovement === 6 /* TypeOfMovement.I_RL */) {
                // throw new Error('Sense of movement of conjugate plane ' + noPlane + ' includes a right-lateral (RL) which is not consistent with fault kinematics')
                // throw new Error(`Sense of movement of conjugate plane ${noPlane} includes a right-lateral (RL) which is not consistent with fault kinematics`)
                // boolean indicates that the current stress axes orientations are NOT consistent with type of mouveement
                return false;
            }
        }
        else if (strikeSlipComponent < -this.EPS) {
            // In principle, the conjugate plane has a right-lateral component of movement
            if (typeOfMovement === 3 /* TypeOfMovement.LL */ || typeOfMovement === 5 /* TypeOfMovement.N_LL */ || typeOfMovement === 7 /* TypeOfMovement.I_LL */) {
                // throw new Error(`Sense of movement of conjugate plane ${noPlane} includes a left-lateral (LL), which is not consistent with fault kinematics`)
                return false;
            }
        }
        else {
            // In principle, the strike-slip component of movement of the conjugate plane is negligeable
            if (typeOfMovement !== 0 /* TypeOfMovement.N */ && typeOfMovement !== 1 /* TypeOfMovement.I */ && typeOfMovement !== 8 /* TypeOfMovement.UND */) {
                // throw new Error(`Sense of movement of conjugate plane ${noPlane} includes a strike-slip component, which is not consistent with fault kinematics`)
                return false;
            }
        }
        // Check consistency of dip-slip component of movement
        if (dipComponent > this.EPS) {
            // In principle, the conjugate plane has a normal component of movement
            if (typeOfMovement === 1 /* TypeOfMovement.I */ || typeOfMovement === 6 /* TypeOfMovement.I_RL */ || typeOfMovement === 7 /* TypeOfMovement.I_LL */) {
                // throw new Error(`Sense of movement of conjugate plane ${noPlane} includes an inverse (I) component, which is not consistent with fault kinematics`)
                return false;
            }
        }
        else if (dipComponent < -this.EPS) {
            // In principle, the conjugate plane has an inverse component of movement
            if (typeOfMovement === 0 /* TypeOfMovement.N */ || typeOfMovement === 4 /* TypeOfMovement.N_RL */ || typeOfMovement === 5 /* TypeOfMovement.N_LL */) {
                // throw new Error(`Sense of movement of conjugate plane ${noPlane} includes a normal component, which is not consistent with fault kinematics`)
                return false;
            }
        }
        else {
            // In principle, the dip component of movement of the conjugate plane is negligeable
            if (typeOfMovement !== 2 /* TypeOfMovement.RL */ && typeOfMovement !== 3 /* TypeOfMovement.LL */ && typeOfMovement !== 8 /* TypeOfMovement.UND */) {
                // throw new Error(`Sense of movement of conjugate plane ${noPlane} includes an dip component (I or N), which is not consistent with fault kinematics`)
                return false;
            }
        }
        // boolean indicates that the current stress axes orientations ARE consistent with type of mouveement
        return true;
    }
}


/***/ }),

/***/ "./lib/utils/FaultHelper.ts":
/*!**********************************!*\
  !*** ./lib/utils/FaultHelper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Direction": () => (/* binding */ Direction),
/* harmony export */   "FaultHelper": () => (/* binding */ FaultHelper),
/* harmony export */   "TypeOfMovement": () => (/* binding */ TypeOfMovement),
/* harmony export */   "directionExists": () => (/* binding */ directionExists),
/* harmony export */   "dirs": () => (/* binding */ dirs),
/* harmony export */   "faultParams": () => (/* binding */ faultParams),
/* harmony export */   "getDirectionFromString": () => (/* binding */ getDirectionFromString),
/* harmony export */   "getTypeOfMovementFromString": () => (/* binding */ getTypeOfMovementFromString),
/* harmony export */   "isGeographicDirection": () => (/* binding */ isGeographicDirection),
/* harmony export */   "isTypeOfMovement": () => (/* binding */ isTypeOfMovement),
/* harmony export */   "mvts": () => (/* binding */ mvts),
/* harmony export */   "sensOfMovementExists": () => (/* binding */ sensOfMovementExists)
/* harmony export */ });
/* harmony import */ var _types_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/math */ "./lib/types/math.ts");
/* harmony import */ var _types_SphericalCoords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/SphericalCoords */ "./lib/types/SphericalCoords.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");
// Calculate the stress components of fault planes




/**
 * Usage:
 * ```ts
 * const sens = TypeOfMovement.LL
 * ```
 * @category Data
 */
var TypeOfMovement;
(function (TypeOfMovement) {
    TypeOfMovement[TypeOfMovement["N"] = 0] = "N";
    TypeOfMovement[TypeOfMovement["I"] = 1] = "I";
    TypeOfMovement[TypeOfMovement["RL"] = 2] = "RL";
    TypeOfMovement[TypeOfMovement["LL"] = 3] = "LL";
    TypeOfMovement[TypeOfMovement["N_RL"] = 4] = "N_RL";
    TypeOfMovement[TypeOfMovement["N_LL"] = 5] = "N_LL";
    TypeOfMovement[TypeOfMovement["I_RL"] = 6] = "I_RL";
    TypeOfMovement[TypeOfMovement["I_LL"] = 7] = "I_LL";
    TypeOfMovement[TypeOfMovement["UND"] = 8] = "UND";
    TypeOfMovement[TypeOfMovement["ERROR"] = 9] = "ERROR";
})(TypeOfMovement || (TypeOfMovement = {}));
function isTypeOfMovement(d) {
    return d >= 0 && d <= 7;
}
const mvts = ['N', 'I', 'RL', 'LL', 'N_RL', 'N_LL', 'I_RL', 'I_LL', 'UND'];
function sensOfMovementExists(s) {
    if (s.length === 0) {
        return true;
    }
    return mvts.includes(s);
}
function getTypeOfMovementFromString(s) {
    switch (s) {
        case 'N': return 0 /* TypeOfMovement.N */; // 0
        case 'I': return 1 /* TypeOfMovement.I */;
        case 'RL': return 2 /* TypeOfMovement.RL */; // 2
        case 'LL': return 3 /* TypeOfMovement.LL */;
        case 'N_RL': return 4 /* TypeOfMovement.N_RL */; // 4
        case 'N_LL': return 5 /* TypeOfMovement.N_LL */;
        case 'I_RL': return 6 /* TypeOfMovement.I_RL */; // 6
        case 'I_LL': return 7 /* TypeOfMovement.I_LL */;
        case 'UND': return 8 /* TypeOfMovement.UND */; // 8
    }
}
/**
 * @category Data
 */
var Direction;
(function (Direction) {
    Direction[Direction["E"] = 0] = "E";
    Direction[Direction["W"] = 1] = "W";
    Direction[Direction["N"] = 2] = "N";
    Direction[Direction["S"] = 3] = "S";
    Direction[Direction["NE"] = 4] = "NE";
    Direction[Direction["SE"] = 5] = "SE";
    Direction[Direction["SW"] = 6] = "SW";
    Direction[Direction["NW"] = 7] = "NW";
    Direction[Direction["UND"] = 8] = "UND";
    Direction[Direction["ERROR"] = 9] = "ERROR";
})(Direction || (Direction = {}));
function isGeographicDirection(d) {
    return d >= 0 && d <= 7;
}
const dirs = ['E', 'W', 'N', 'S', 'NE', 'SE', 'SW', 'NW'];
function directionExists(s) {
    if (s.length === 0) {
        return true;
    }
    return dirs.includes(s);
}
function getDirectionFromString(s) {
    if (s.length === 0) {
        return 8 /* Direction.UND */;
    }
    switch (s) {
        case 'E': return 0 /* Direction.E */;
        case 'W': return 1 /* Direction.W */;
        case 'N': return 2 /* Direction.N */;
        case 'S': return 3 /* Direction.S */;
        case 'NE': return 4 /* Direction.NE */;
        case 'SE': return 5 /* Direction.SE */;
        case 'SW': return 6 /* Direction.SW */;
        case 'NW': return 7 /* Direction.NW */;
        default: return 9 /* Direction.ERROR */;
    }
}
function faultParams({ strike, dipDirection, dip }) {
}
// Each fault comprises information concerning the geometry, the stress parameters and the kinematic parameters:
/**
 * A fault is represented by a plane, this with a normal and a position.
 *
 * Usage 1:
 * ```ts
 * const f = new Fault({strike: 30, dipDirection: Direction.E, dip: 60})
 * f.setStriationFromRake({rake: 20, strikeDirection: Direction.N, typeMov: 'LL'})
 * ```
 *
 * Usage 2:
 * ```ts
 * const f = FaultHelper.create(
 *     {strike, dip, dipDirection},
 *     {rake, strikeDirection, typeOfMovement, trend: 0, trendIsDefined: false}
 * )
 * ```
 */
class FaultHelper {
    static create(plane, striation) {
        const f = new FaultHelper({
            strike: plane.strike,
            dipDirection: plane.dipDirection,
            dip: plane.dip
        });
        if (!striation.trendIsDefined) { // i.e. tha plane is not horizontal
            // The striation is defined by the rake and strike direction and not by the trend
            if (f.dip !== 90 || striation.rake !== 90) {
                // Complementary cases to vertical plane with vertical striation
                f.setStriationFromRake({
                    typeOfMovement: striation.typeOfMovement,
                    rake: striation.rake,
                    strikeDirection: striation.strikeDirection,
                });
            }
            else {
                // Special case: vertical plane with vertical striation
                f.setStriationForVerticalPlaneAndRake({
                    strike: plane.strike,
                    dipDirection: plane.dipDirection,
                    strikeDirection: striation.strikeDirection,
                    typeOfMovement: striation.typeOfMovement
                });
            }
            // return {
            //     nPlane: f.normal,
            //     nStriation: f.striation,
            //     nPerpStriation: f.e_perp_striation
            // }
            return f;
        }
        else {
            // The striation is defined by the trend: the fault plane is not vertical (it may be horizontal or shallow dipping)
            f.setStriationFromTrend({
                typeOfMovement: striation.typeOfMovement,
                striationTrend: striation.trend,
            });
            // return {
            //     nPlane: f.normal,
            //     nStriation: f.striation,
            //     nPerpStriation: f.e_perp_striation
            // }
            return f;
        }
        // ** In principle this return is not reached (??)
        // return {
        //     nPlane: f.normal
        // }
    }
    get sphericalCoords() {
        return this.coordinates;
    }
    get normal() {
        return this.normal_;
    }
    /**
     * @brief Get the striation vector in reference system S
     */
    get striation() {
        return this.e_striation_;
    }
    /**
     * @brief Get the striation vector in reference system S
     */
    get e_perp_striation() {
        return this.e_perp_striation_;
    }
    /**
     * Set the orientation of the striation in the fault plane, which can defined in two different ways (which are exclusive):
     * 1. Rake (or pitch) [0,90], measured from the strike direction, which points in one of the two opposite directions of the fault strike.
     *   Strike direction : (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
     * 2. For shallow-dipping planes (i.e., the compass inclinometer is inaccurate):
     *   Striae trend: [0, 360)
     */
    constructor({ strike, dipDirection, dip }) {
        this.nStriationTrend = [0, 0, 0];
        this.nStriation = [0, 0, 0];
        // We define 2 orthonormal right-handed reference systems:
        //      S =  (X, Y, Z ) is the geographic reference frame oriented in (East, North, Up) directions.
        //      Sr = (Xr,Yr,Zr) is the principal stress reference frame, parallel to (sigma_1, sigma_3, sigma_2) ('r' stands for 'rough' solution);
        // (phi,theta) : spherical coordinate angles defining the unit vector perpendicular to the fault plane (pointing upward)
        //                 in reference system S
        // phi : azimuth phi in interval [0, 2 PI), measured anticlockwise from the X axis (East direction) in reference system S
        // theta: colatitude or polar angle in interval [0, PI/2], measured downward from the zenith (upward direction)
        this.coordinates = new _types_SphericalCoords__WEBPACK_IMPORTED_MODULE_1__.SphericalCoords();
        // private phi:    number      // constant value for each fault plane
        // private theta:  number      // constant value for each fault plane
        // normal: unit vector normal to the fault plane (pointing upward) defined in the geographic reference system S
        this.normal_ = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newVector3D)(); // constant values for each fault plane
        // (e_phi, e_theta) = unit vectors defining local reference frame tangent to the sphere in spherical coordinates
        this.e_phi = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newVector3D)();
        this.e_theta = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newVector3D)();
        // normalSp: unit vector normal to the fault plane (pointing upward) defined in the stress tensor reference system: Sr = (Xr,Yr,Zr)=(s1,s3,s2)
        this.normalSp = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newVector3D)(); // values should be recalculated for new stress tensors
        // (phiSp,thetaSp) : spherical coordinate angles defining the unit vector perpendicular to the fault plane (pointing upward in system S)
        //                 in the stress tensor reference system: Sr = (Xr,Yr,Zr)
        // private phiSp:    number      // constant values for each fault plane
        // private thetaSp:  number      // values are recalculated for new stress tensors
        this.coordinatesSp = new _types_SphericalCoords__WEBPACK_IMPORTED_MODULE_1__.SphericalCoords();
        this.RTrot = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3)();
        // striation: unit vector pointing toward the measured striation in the geographic reference system: S = (X,Y,Z)
        // private striation:      Vector3 = newVector3D()      // constant value for each fault plane
        // striationSp: unit vector pointing toward the measured striation in the stress tensor reference system: Sr = (Xr,Yr,Zr)
        this.striationSp = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newVector3D)(); // values are recalculated for new stress tensors
        // stress: stress vector in the geographic reference system: S = (X,Y,Z)
        this.stress = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newVector3D)(); // values are recalculated for new stress tensors
        // shearStressSp: shear stress vector in the geographic reference system: S = (X,Y,Z)
        this.shearStress = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newVector3D)();
        this.alphaStriaDeg = 0;
        this.alphaStria = 0;
        // e_striation_: unit vector in reference system S pointing toward the measured striation
        this.e_striation_ = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newVector3D)();
        // e_perp_striation_: unit vector in reference system S located in the fault plane and perpendicular to the measured striation
        this.e_perp_striation_ = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.newVector3D)();
        this.isUpLiftedBlock = false;
        this.EPS = 1e-7;
        this.strike = strike;
        this.dipDirection = dipDirection;
        this.dip = dip;
        this.faultSphericalCoords();
    }
    check({ displ, strain, stress }) {
        return stress !== undefined;
    }
    cost({ displ, strain, stress }) {
        return 1;
    }
    /**
     * General case to set the striation.
     *
     * Set the orientation of the striation in the fault plane, which can defined in two different ways (which are exclusive):
     * 1. Rake (or pitch) [0,90], measured from the strike direction, which points in one of the two opposite directions of the fault strike.
     *   Strike direction : (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
     * 2. For shallow-dipping planes (i.e., the compass inclinometer is inaccurate):
     *   Striae trend: [0, 360)
     */
    setStriationFromRake({ typeOfMovement, rake, strikeDirection }) {
        // check and set
        this.rake = rake;
        this.strikeDirection = strikeDirection;
        this.typeMov = typeOfMovement;
        this.faultStriationAngle_A();
        this.faultStriationAngle_B();
        return this;
    }
    /**
     * Special case for horizontal and shallow angle plane.
     */
    setStriationFromTrend({ typeOfMovement, striationTrend }) {
        this.typeMov = typeOfMovement;
        this.striationTrend = striationTrend;
        // Calculate the striation vector and check that it matches the type of movement
        //  if the type of movement is undefined then the data may be duplicated and considered with two opposite striation directions **
        let phi_striationTrend = 0;
        if (this.dip === 0) {
            // The plane is horizontal: 
            //      by convention, the striation trend points toward the direction of movement of the top block relative to the bottom block
            // phi_striationTrend = angle indicating the direction of the horizontal vector pointing toward the striation trend 
            //      phi_striationTrend is measured anticlockwise from the X axis in reference system S = (X, Y, Z) = (E, N, Up)
            phi_striationTrend = Math.PI / 2 - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.striationTrend);
            if (phi_striationTrend < 0) {
                phi_striationTrend = phi_striationTrend + 2 * Math.PI;
            }
            // nStriation = unit vector representing the striation in reference system S, which points toward the striation trend
            this.nStriation[0] = Math.cos(phi_striationTrend);
            this.nStriation[1] = Math.sin(phi_striationTrend);
            this.nStriation[2] = 0;
        }
        else {
            // The plane has (in principle) a shallow dip (note that the striation trend is not defined for a vertical plane)
            // phi_nStriationTrend = angle indicating the direction of the horizontal vector perpendicular to the striation trend 
            //      phi_nStriationTrend is measured anticlockwise from the X axis in reference system S = (X, Y, Z) = (E, N, Up)
            phi_striationTrend = 2 * Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.striationTrend);
            // nTrend = unit vector normal to the vertical plane that is parallel to the striation trend
            this.nStriationTrend[0] = Math.cos(phi_striationTrend);
            this.nStriationTrend[1] = Math.sin(phi_striationTrend);
            this.nStriationTrend[2] = 0;
            // Calculate in reference system S the unit vector nStriation, which lies in the fault plane and in the vertical plane parallel to the trend.
            // Thus, nStriation is perpendicular to nTrend and to normal (the normal to the fault plane), and can be calculated using the normalized cross product
            this.nStriation = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct)({ U: this.normal, V: this.nStriationTrend });
            // nStriation should be oriented according to the movement of the hanging wall relative to the footwall:
            // To test and invert (if necessary) the striation vector, the fault plane is subdivided in four Quadrants, 
            //      by combinning two strike-slip with two dip-slip movements in the local reference system (e_phi, e_theta)
            // StrikeSlipMov = strike slip movement: Left-Lateral in the direction of e_phi
            //      Left-Lateral (LL): StrikeSlipMov > 0;       Right-Lateral (RL): StrikeSlipMov < 0
            let StrikeSlipMov = (0,_types__WEBPACK_IMPORTED_MODULE_2__.scalarProduct)({ U: this.e_phi, V: this.nStriation });
            // StrikeSlipMov = dip slip  movement: Normal in the direction of e_theta
            //      Normal (N): DipSlipMov > 0;       Inverse (I): DipSlipMov < 0
            let DipSlipMov = (0,_types__WEBPACK_IMPORTED_MODULE_2__.scalarProduct)({ U: this.e_theta, V: this.nStriation });
            if (Math.abs(DipSlipMov) < this.EPS) {
                // The dip-slip component of movement is negligible and the type of movement is pure strike-slip
                if (StrikeSlipMov > 0) {
                    // If the type of movement is Left-Lateral (LL) then the striation vector is correctly oriented;
                    // If type of movement is right-lateral (RL) then the striation vector is inverted
                    if ((this.typeMov !== 3 /* TypeOfMovement.LL */) && (this.typeMov !== 2 /* TypeOfMovement.RL */) && (this.typeMov !== 8 /* TypeOfMovement.UND */)) {
                        // Thus, the type of movement cannot be different from a strike-slip fault (LL, OR RL) - or it is undefined (UND)
                        throw new Error(`Type of movement for data number xx is wrong. Cannot be this.typeMov`);
                    }
                    else if (this.typeMov === 2 /* TypeOfMovement.RL */) {
                        // The direction of the striation vector is inverted to match the type of movement
                        this.nStriation = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: this.nStriation });
                    }
                }
                else if (StrikeSlipMov < 0) {
                    // If the type of movement is Right-Lateral (RL) then the striation vector is correctly oriented;
                    // If type of movement is Left-lateral (LL) then the striation vector is inverted
                    if ((this.typeMov !== 3 /* TypeOfMovement.LL */) && (this.typeMov !== 2 /* TypeOfMovement.RL */) && (this.typeMov !== 8 /* TypeOfMovement.UND */)) {
                        // Thus, the type of movement cannot be different from a strike-slip fault (LL, OR RL) - or it is undefined (UND)
                        throw new Error(`Type of movement for data number xx is wrong. Cannot be this.typeMov`);
                    }
                    else if (this.typeMov === 3 /* TypeOfMovement.LL */) {
                        // The direction of the striation vector is inverted to match the type of movement
                        this.nStriation = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: this.nStriation });
                    }
                }
            }
            else if (Math.abs(StrikeSlipMov) < this.EPS) {
                // The strike-slip component of movement is negligible and the type of movement is pure dip-slip
                if (DipSlipMov > 0) {
                    // If the type of movement is Normal (N) then the striation vector is correctly oriented;
                    // If type of movement is Inverse (I) then the striation vector is inverted
                    if ((this.typeMov !== 0 /* TypeOfMovement.N */) && (this.typeMov !== 1 /* TypeOfMovement.I */) && (this.typeMov !== 8 /* TypeOfMovement.UND */)) {
                        // Thus, the type of movement cannot be different from a dip-slip fault (N, OR I) - or it is undefined (UND)
                        throw new Error(`Type of movement for data number xx is wrong. Cannot be this.typeMov`);
                    }
                    else if (this.typeMov === 1 /* TypeOfMovement.I */) {
                        // The direction of the striation vector is inverted to match the type of movement
                        this.nStriation = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: this.nStriation });
                    }
                }
                else if (DipSlipMov < 0) {
                    // If the type of movement is Inverse (I) then the striation vector is correctly oriented;
                    // If type of movement is Normal (N) then the striation vector is inverted
                    if ((this.typeMov !== 0 /* TypeOfMovement.N */) && (this.typeMov !== 1 /* TypeOfMovement.I */) && (this.typeMov !== 8 /* TypeOfMovement.UND */)) {
                        // Thus, the type of movement cannot be different from a dip-slip fault (N, OR I) - or it is undefined (UND)
                        throw new Error(`Type of movement for data number xx is wrong. Cannot be this.typeMov`);
                    }
                    else if (this.typeMov === 0 /* TypeOfMovement.N */) {
                        // The direction of the striation vector is inverted to match the type of movement
                        this.nStriation = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: this.nStriation });
                    }
                }
            }
            else {
                // The type of movement combines both a dip-slip and a strike-slip component
                // Note that the striation can be oriented in two opposite directions depending on the type of movement
                if ((StrikeSlipMov > 0) && (DipSlipMov > 0)) {
                    // Quadrant 1: Striation combines left-lateral and normal components
                    // If the type of movement combines a Normal and a Left-Lateral component (N, N_LL, or LL) then the striation vector is correctly oriented:
                    //      i.e., nStriation is located in Quadrant 1 consistently with the type of movement;
                    // If the type of movement combines an Inverse and a Right-Lateral component (I, I_RL, or RL) then the striation vector is inverted:
                    //      i.e., nStriation should be located in Quadrant 3 and not in Quadrant 1
                    if (this.typeMov !== 8 /* TypeOfMovement.UND */) {
                        // The type of movement is not undefined
                        if ((this.typeMov === 4 /* TypeOfMovement.N_RL */) || (this.typeMov === 7 /* TypeOfMovement.I_LL */)) {
                            // Note that the type of movement cannot be (N_RL, or I_LL), in which case the striation would be located in Quadrants 2 or 4
                            throw new Error(`Type of movement for data number xx is wrong. Cannot be this.typeMov`);
                        }
                        else if ((this.typeMov === 1 /* TypeOfMovement.I */) || (this.typeMov === 6 /* TypeOfMovement.I_RL */) || (this.typeMov === 2 /* TypeOfMovement.RL */)) {
                            // The direction of the striation vector has to be inverted to match the type of movement
                            this.nStriation = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: this.nStriation });
                        }
                    }
                }
                else if ((StrikeSlipMov < 0) && (DipSlipMov > 0)) {
                    // Quadrant 2: type of movement combines right-lateral and normal movement
                    // If the type of movement combines a Normal and a Right-Lateral component (N, N_RL, or RL) then the striation vector is correctly oriented:
                    //      i.e., nStriation is located in Quadrant 2 consistently with the type of movement;
                    // If the type of movement combines an Inverse and a Left-Lateral component (I, I_LL, or LL) then the striation vector is inverted:
                    //      i.e., nStriation should be located in Quadrant 4 and not in Quadrant 2
                    if (this.typeMov !== 8 /* TypeOfMovement.UND */) {
                        // The type of movement is not undefined
                        if ((this.typeMov === 5 /* TypeOfMovement.N_LL */) || (this.typeMov === 6 /* TypeOfMovement.I_RL */)) {
                            // Thus, the type of movement cannot be (N_LL, or I_RL), in which case the striation would be located in Quadrants 1 or 3
                            throw new Error(`Type of movement for data number xx is wrong. Cannot be this.typeMov`);
                        }
                        else if ((this.typeMov === 1 /* TypeOfMovement.I */) || (this.typeMov === 7 /* TypeOfMovement.I_LL */) || (this.typeMov === 3 /* TypeOfMovement.LL */)) {
                            // The direction of the striation vector has to be inverted to match the type of movement
                            this.nStriation = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: this.nStriation });
                        }
                    }
                }
                else if ((StrikeSlipMov < 0) && (DipSlipMov < 0)) {
                    // Quadrant 3: type of movement combines right-lateral and an inverse movement
                    // If the type of movement combines a Inverse and a Right-Lateral component (I, I_RL, or RL) then the striation vector is correctly oriented:
                    //      i.e., nStriation is located in Quadrant 3 consistently with the type of movement;
                    // If the type of movement combines an Normal and a Left-Lateral component (N, N_LL, or LL) then the striation vector is inverted:
                    //      i.e., nStriation should be located in Quadrant 1 and not in Quadrant 3
                    if (this.typeMov !== 8 /* TypeOfMovement.UND */) {
                        // The type of movement is not undefined
                        if ((this.typeMov === 4 /* TypeOfMovement.N_RL */) || (this.typeMov === 7 /* TypeOfMovement.I_LL */)) {
                            // Thus, the type of movement cannot be (N_RL, or I_LL), in which case the striation would be located in Quadrants 2 or 4
                            throw new Error(`Type of movement for data number xx is wrong. Cannot be this.typeMov`);
                        }
                        else if ((this.typeMov === 0 /* TypeOfMovement.N */) || (this.typeMov === 5 /* TypeOfMovement.N_LL */) || (this.typeMov === 3 /* TypeOfMovement.LL */)) {
                            // The direction of the striation vector has to be inverted to match the type of movement
                            this.nStriation = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: this.nStriation });
                        }
                    }
                }
                else if ((StrikeSlipMov > 0) && (DipSlipMov < 0)) {
                    // Quadrant 4: type of movement combines left-lateral and an inverse movement
                    // If the type of movement combines a Inverse and a Left-Lateral component (I, I_LL, or LL) then the striation vector is correctly oriented:
                    //      i.e., nStriation is located in Quadrant 4 consistently with the type of movement;
                    // If the type of movement combines an Normal and a Right-Lateral component (N, N_RL, or RL) then the striation vector is inverted:
                    //      i.e., nStriation should be located in Quadrant 2 and not in Quadrant 4
                    if (this.typeMov !== 8 /* TypeOfMovement.UND */) {
                        // The type of movement is not undefined
                        if ((this.typeMov === 5 /* TypeOfMovement.N_LL */) || (this.typeMov === 6 /* TypeOfMovement.I_RL */)) {
                            // Thus, the type of movement cannot be (N_LL, or I_RL), in which case the striation would be located in Quadrants 1 or 3
                            throw new Error(`Type of movement for data number xx is wrong. Cannot be this.typeMov`);
                        }
                        else if ((this.typeMov === 0 /* TypeOfMovement.N */) || (this.typeMov === 4 /* TypeOfMovement.N_RL */) || (this.typeMov === 2 /* TypeOfMovement.RL */)) {
                            // The direction of the striation vector has to be inverted to match the type of movement
                            this.nStriation = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector)({ k: -1, V: this.nStriation });
                        }
                    }
                }
            }
        }
        // Calculate in reference system S the unit vector e_perp_striation_ located on the fault plane and perpendicular to the striation.
        // This vector is necessary for calculating the misfit angle for criteria involving friction.
        // The local coord system (e_striation_, e_perp_striation_, normal) is right handed
        this.e_perp_striation_ = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.crossProduct)({ U: this.normal, V: this.e_striation_ });
        return this;
    }
    setStriationForVerticalPlaneAndRake({ typeOfMovement, strike, strikeDirection, dipDirection }) {
        // This method calculates in reference system S the unit vector e_striation pointing toward the measured striation
        // Special case: Vertical plane with vertical striation
        // In such case the dip direction has a different meaning: it points in the direction of the uplifted block
        //      The unit vector e_phi is is parallel to the strike of the fault plane, and is oriented such that e_theta x e_phi = e_r (where x is the cross porduct )
        //      The azimuthal angle phi is chosen in the direction of the fault dip (note that phi is different from the azimuth of the fault plane measured in the field)
        // The unit normal vector nPlane = e_r points in the direction of the "outer block"
        this.strike = strike;
        this.strikeDirection = strikeDirection;
        this.typeMov = typeOfMovement;
        this.dipDirection = dipDirection;
        if (this.strike === 0) {
            // Spherical coords in reference system S (method faultSphericalCoords): (phi, theta) = (PI, PI / 2)
            // The unit normal vector nPlane is defined from spherical coords (phi, theta) in reference system S; 
            // nPlane points West
            if ((this.strikeDirection !== 2 /* Direction.N */) && (this.strikeDirection !== 3 /* Direction.S */) && (this.strikeDirection !== 8 /* Direction.UND */)) {
                throw new Error(`Strike direction this.strikeDirection for measuring the rake is wrong. Should be N, S, or UND`);
            }
            if ((this.dipDirection !== 0 /* Direction.E */) && (this.dipDirection !== 1 /* Direction.W */)) {
                // Vertical plane with vertical striation: the dip direction has a different meaning: it points in the direction of the uplifted block
                throw new Error(`Special case: vertical plane with vertical striation: Dip direction points toward the uplifted bock and should be E or W`);
            }
            // Calculate the striation vector
            if (this.dipDirection === 1 /* Direction.W */) {
                // nPlane and the dip direction point in the same direction (West)
                // Thus, the uplifted block is located in the direction of nPlane (outward block)
                // The striation vector idicates relative movement of the 'outward block' relative to the 'inner block'.
                // Thus e_striation_ points upward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = 1;
            }
            else {
                // nPlane and the dip direction point in opposite directions:: dipDirection = E
                // Thus e_striation_ points downward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = -1;
            }
        }
        else if (this.strike < 90) {
            // phi = PI - strike
            // nPlane points NW, N, or W toward the 'outer block'; thus the 'inner block' is located SE, S, or E
            if ((this.strikeDirection === 5 /* Direction.SE */) || (this.strikeDirection === 7 /* Direction.NW */)) {
                throw new Error(`Strike direction this.strikeDirection for measuring the rake is wrong. It cannot be SE or NW`);
            }
            if ((this.dipDirection === 6 /* Direction.SW */) || (this.dipDirection === 4 /* Direction.NE */) || (this.dipDirection === 8 /* Direction.UND */)) {
                // Vertical plane with vertical striation: the dip direction has a different meaning: it points in the direction of the uplifted block
                throw new Error(`Special case: vertical plane with vertical striation: dip direction this.dipDirection is wrong. It should point toward the uplifted block: please set consistent dip direction`);
            }
            // Calculate the striation vector
            if ((this.dipDirection === 7 /* Direction.NW */) || (this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 1 /* Direction.W */)) {
                // nPlane and the dip direction point in the same direction (NW, N, or W). 
                // Thus, the uplifted block corresponds to the outward block
                // The striation vector idicates relative movement of the 'outward block' relative to the 'inner block', and e_striation_ points upward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = 1;
            }
            else {
                // nPlane and the dip direction point in opposite directions: dipDirection = SE, S, or E
                // Thus, the uplifted block corresponds to the inner block, and e_striation_ points downward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = -1;
            }
        }
        else if (this.strike === 90) {
            // Spherical coords in reference system S (method faultSphericalCoords): (phi, theta) = (PI / 2, PI / 2)
            // The unit normal vector nPlane is defined from spherical coords (phi, theta) in reference system S; 
            // nPlane points North
            if ((this.strikeDirection !== 0 /* Direction.E */) && (this.strikeDirection !== 1 /* Direction.W */) && (this.strikeDirection !== 8 /* Direction.UND */)) {
                throw new Error(`Strike direction this.strikeDirection for measuring the rake is wrong. Should be N, S, or UND`);
            }
            if ((this.dipDirection !== 2 /* Direction.N */) && (this.dipDirection !== 3 /* Direction.S */)) {
                // Vertical plane with vertical striation: the dip direction has a different meaning: it points in the direction of the uplifted block
                throw new Error(`Special case: vertical plane with vertical striation: Dip direction points toward the uplifted bock and should be N or S`);
            }
            // Calculate the striation vector
            if (this.dipDirection === 2 /* Direction.N */) {
                // nPlane and the dip direction point in the same direction (North)
                // Thus, the uplifted block is located in the direction of nPlane (outward block)
                // The striation vector idicates relative movement of the 'outward block' relative to the 'inner block'.
                // Thus e_striation_ points upward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = 1;
            }
            else {
                // nPlane and the dip direction point in opposite directions: dipDirection = S
                // Thus e_striation_ points downward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = -1;
            }
        }
        else if (this.strike < 180) {
            // phi = PI - strike
            // nPlane points NE, N, or E toward the 'outer block'; thus the 'inner block' is located SW, S, or W
            if ((this.strikeDirection === 6 /* Direction.SW */) || (this.strikeDirection === 4 /* Direction.NE */)) {
                throw new Error(`Strike direction this.strikeDirection for measuring the rake is wrong. It cannot be SW or NE`);
            }
            if ((this.dipDirection === 5 /* Direction.SE */) || (this.dipDirection === 7 /* Direction.NW */) || (this.dipDirection === 8 /* Direction.UND */)) {
                // Vertical plane with vertical striation: the dip direction has a different meaning: it points in the direction of the uplifted block
                throw new Error(`Special case: vertical plane with vertical striation: dip direction this.dipDirection is wrong. It should point toward the uplifted block: please set consistent dip direction`);
            }
            // Calculate the striation vector
            if ((this.dipDirection === 4 /* Direction.NE */) || (this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 0 /* Direction.E */)) {
                // nPlane and the dip direction point in the same direction (NE, N, or E). 
                // Thus, the uplifted block corresponds to the outward block
                // The striation vector idicates relative movement of the 'outward block' relative to the 'inner block', and e_striation_ points upward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = 1;
            }
            else {
                // nPlane and the dip direction point in opposite directions: dipDirection = SW, S, or W 
                // Thus, the uplifted block corresponds to the inner block, and e_striation_ points downward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = -1;
            }
        }
        else if (this.strike === 180) {
            // Spherical coords in reference system S (method faultSphericalCoords): (phi, theta) = (PI, PI / 2)
            // The unit normal vector nPlane is defined from spherical coords (phi, theta) in reference system S; 
            // nPlane points East
            if ((this.strikeDirection !== 2 /* Direction.N */) && (this.strikeDirection !== 3 /* Direction.S */) && (this.strikeDirection !== 8 /* Direction.UND */)) {
                throw new Error(`Strike direction this.strikeDirection for measuring the rake is wrong. Should be N, S, or UND`);
            }
            if ((this.dipDirection !== 0 /* Direction.E */) && (this.dipDirection !== 1 /* Direction.W */)) {
                // Vertical plane with vertical striation: the dip direction has a different meaning: it points in the direction of the uplifted block
                throw new Error(`Special case - vertical plane with vertical striation - Dip direction points toward the uplifted bock and should be E or W`);
            }
            // Calculate the striation vector
            if (this.dipDirection === 0 /* Direction.E */) {
                // nPlane and the dip direction point in the same direction (East)
                // Thus, the uplifted block is located in the direction of nPlane (outward block)
                // The striation vector idicates relative movement of the 'outward block' relative to the 'inner block'.
                // Thus e_striation_ points upward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = 1;
            }
            else {
                // nPlane and the dip direction point in opposite directions: dipDirection = W
                // Thus e_striation_ points downward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = -1;
            }
        }
        else if (this.strike < 270) {
            // phi = 3 PI - strike
            // nPlane points SE, S, or E toward the 'outer block'; thus the 'inner block' is located NW, N, or W
            if ((this.strikeDirection === 5 /* Direction.SE */) || (this.strikeDirection === 7 /* Direction.NW */)) {
                throw new Error(`Strike direction this.strikeDirection for measuring the rake is wrong. It cannot be SE nor NW`);
            }
            if ((this.dipDirection === 4 /* Direction.NE */) || (this.dipDirection === 6 /* Direction.SW */) || (this.dipDirection === 8 /* Direction.UND */)) {
                // Vertical plane with vertical striation: the dip direction has a different meaning: it points in the direction of the uplifted block
                //**throw new Error(`Special case - vertical plane with vertical striation: dip direction dipDirection is wrong  It should point toward the uplifted block: please set consistent dip direction`)
            }
            // Calculate the striation vector
            if ((this.dipDirection === 5 /* Direction.SE */) || (this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 0 /* Direction.E */)) {
                // nPlane and the dip direction point in the same direction (SE, S, or E). 
                // Thus, the uplifted block corresponds to the outward block
                // The striation vector idicates relative movement of the 'outward block' relative to the 'inner block', and e_striation_ points upward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = 1;
            }
            else {
                // nPlane and the dip direction point in opposite directions: dipDirection = NW, N, or W
                // Thus, the uplifted block corresponds to the inner block, and e_striation_ points downward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = -1;
            }
        }
        else if (this.strike === 270) {
            // Spherical coords in reference system S (method faultSphericalCoords): (phi, theta) = (3 PI / 2, PI / 2)
            // The unit normal vector nPlane is defined from spherical coords (phi, theta) in reference system S; 
            // nPlane points South
            if ((this.strikeDirection !== 0 /* Direction.E */) && (this.strikeDirection !== 1 /* Direction.W */) && (this.strikeDirection !== 8 /* Direction.UND */)) {
                throw new Error(`Strike direction this.strikeDirection for measuring the rake is wrong. Should be E, W, or UND`);
            }
            if ((this.dipDirection !== 2 /* Direction.N */) && (this.dipDirection !== 3 /* Direction.S */)) {
                // Vertical plane with vertical striation: the dip direction has a different meaning: it points in the direction of the uplifted block
                //**throw new Error(`Special case - vertical plane with vertical striation: Dip direction points toward the uplifted bock and should be N or S`)
            }
            // Calculate the striation vector
            if (this.dipDirection === 3 /* Direction.S */) {
                // nPlane and the dip direction point in the same direction (South)
                // Thus, the uplifted block is located in the direction of nPlane (outward block)
                // The striation vector idicates relative movement of the 'outward block' relative to the 'inner block'.
                // Thus e_striation_ points upward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = 1;
            }
            else {
                // nPlane and the dip direction point in opposite direction: dipDirection = N
                // Thus e_striation_ points downward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = -1;
            }
        }
        else if (this.strike < 360) {
            // phi = 3 PI - strike
            // nPlane points SW, S, or W toward the 'outer block'; thus the 'inner block' is located NE, N, or E
            if ((this.strikeDirection === 6 /* Direction.SW */) || (this.strikeDirection === 4 /* Direction.NE */)) {
                throw new Error(`Strike direction this.strikeDirection for measuring the rake is wrong. It cannot be SW nor NE`);
            }
            if ((this.dipDirection === 5 /* Direction.SE */) || (this.dipDirection === 7 /* Direction.NW */) || (this.dipDirection === 8 /* Direction.UND */)) {
                // Vertical plane with vertical striation: the dip direction has a different meaning: it points in the direction of the uplifted block
                //**throw new Error(`Special case: vertical plane with vertical striation: dip direction this.dipDirection is wrong. It should point toward the uplifted block: please set consistent dip direction`)
            }
            // Calculate the striation vector
            if ((this.dipDirection === 6 /* Direction.SW */) || (this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 1 /* Direction.W */)) {
                // nPlane and the dip direction point in the same direction (SW, S, or W). 
                // Thus, the uplifted block corresponds to the outward block
                // The striation vector idicates relative movement of the 'outward block' relative to the 'inner block', and e_striation_ points upward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = 1;
            }
            else {
                // nPlane and the dip direction point in opposite directions: : dipDirection = NE, N, or E
                // Thus, the uplifted block corresponds to the inner block, and e_striation_ points downward
                this.e_striation_[0] = 0;
                this.e_striation_[1] = 0;
                this.e_striation_[2] = -1;
            }
        }
        else {
            // In principle the range of the strike angle has already been checked
            throw new Error(`Strike this.strike is out of range (0,360)`);
        }
        // Calculate in reference system S the unit vector e_perp_striation_ located on the fault plane and perpendicular to the striation.
        // This vector is necessary for calculating the misfit angle for criteria involving friction.
        // The local coord system (e_striation_, e_perp_striation_, normal) is right handed **
        this.e_perp_striation_ = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.crossProduct)({ U: this.normal, V: this.e_striation_ }); // this.normal or this.normal_
        //return
    }
    // ------------------------------ PRIVATE
    faultSphericalCoords() {
        // Each fault is defined by a set of parameters as follows:
        //      The fault plane orientation is defined by three parameters:
        //      Fault strike: clockwise angle measured from the North direction [0, 360)
        //      Fault dip: [0, 90]
        //      Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
        //          For horizontal planes and vertical planes with oblique rake the dip direction is undefined
        //          For vertical planes with vertical striations the dip Direction has a different meaning: it points toward the uplifted block (particular case)
        // (phi,theta) : spherical coordinate angles defining the unit vector perpendicular to the fault plane (pointing upward)
        //                 in the geographic reference system: S = (X,Y,Z) = (E,N,Up)
        // phi : azimuthal angle in interval [0, 2 PI), measured anticlockwise from the X axis (East direction) in reference system S
        // theta: colatitude or polar angle in interval [0, PI/2], measured downward from the zenith (upward direction)
        //  Write functions relating trend and rake
        // The polar angle (or colatitude) theta is defined by the dip of the fault plane in radians:
        this.coordinates.theta = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.dip);
        // This function calculates the azimuth phi such that the right-handed local coordinate system in polar coordinates is located in the upper hemisphere.
        //      In other words, the radial unit vector is in the upper hemisphere.
        // The right-handed local reference system is specified by three unit vectors defined in the increasing radial, polar, and azimuthal directions (r, theta, and phi):
        //      The azimuthal angle phi is chosen in the direction of the fault dip (note that phi is different from the azimuth of the fault plane measured in the field) 
        //      The unit vector e_theta is parallel to the dip of the fault plane
        //      The unit vector e_phi is is parallel to the strike of the fault plane, and is oriented such that e_theta x e_phi = e_r (where x is the cross porduct )
        //      
        // The following 'if structure' calculates phi from the strike and dip direction of the fault plane:
        if (this.dip === 0) {
            // The fault plane is horizontal - the dip direction is undefined (UND)
            // The radial unit vector points upward and the zimuthal angle can take any value
            this.coordinates.phi = 0;
        }
        else if (this.dip === 90) {
            // The fault plane is vertical 
            if (this.strike <= 180) {
                // phi is in interval [0,PI]
                this.coordinates.phi = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.strike);
            }
            else {
                // fault strike is in interval (PI,2 PI) and phi is in interval (PI,2 PI)
                this.coordinates.phi = 3 * Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.strike);
            }
        }
        else if (this.strike === 0) { // The fault plane is neither horizontal nor vertical and the dip direction is defined
            if (this.dipDirection === 0 /* Direction.E */) {
                this.coordinates.phi = 0;
            }
            else if (this.dipDirection === 1 /* Direction.W */) {
                this.coordinates.phi = Math.PI;
            }
            else {
                throw new Error(`dip direction is wrong. Should be E or W`);
            }
        }
        else if (this.strike < 90) {
            if ((this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 0 /* Direction.E */) || (this.dipDirection === 5 /* Direction.SE */)) {
                // this.strike + this.coordinates.phi = 2 PI
                this.coordinates.phi = 2 * Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.strike);
            }
            else if ((this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 1 /* Direction.W */) || (this.dipDirection === 7 /* Direction.NW */)) {
                // this.strike + this.coordinates.phi = PI
                this.coordinates.phi = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.strike);
            }
            else {
                throw new Error(`dip direction is wrong. Should be N, S, E, W, SE or NW`);
            }
        }
        else if (this.strike === 90) {
            if (this.dipDirection === 3 /* Direction.S */) {
                this.coordinates.phi = 3 * Math.PI / 2;
            }
            else if (this.dipDirection === 2 /* Direction.N */) {
                this.coordinates.phi = Math.PI / 2;
            }
            else {
                throw new Error(`dip direction is wrong. Should be N or S`);
            }
        }
        else if (this.strike < 180) {
            if ((this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 1 /* Direction.W */) || (this.dipDirection === 6 /* Direction.SW */)) {
                // this.strike + this.coordinates.phi = 2Pi
                this.coordinates.phi = 2 * Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.strike);
            }
            else if ((this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 0 /* Direction.E */) || (this.dipDirection === 4 /* Direction.NE */)) {
                // this.strike + this.coordinates.phi = Pi
                this.coordinates.phi = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.strike);
            }
            else {
                throw new Error(`dip direction is wrong. Should be N, S, E, W, SE or NW`);
            }
        }
        else if (this.strike === 180) {
            if (this.dipDirection === 1 /* Direction.W */) {
                this.coordinates.phi = Math.PI;
            }
            else if (this.dipDirection === 0 /* Direction.E */) {
                this.coordinates.phi = 0;
            }
            else {
                throw new Error(`dip direction is wrong. Should be E or W`);
            }
        }
        else if (this.strike < 270) {
            if ((this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 1 /* Direction.W */) || (this.dipDirection === 7 /* Direction.NW */)) {
                // this.strike + this.coordinates.phi = 2Pi
                this.coordinates.phi = 2 * Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.strike);
            }
            else if ((this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 0 /* Direction.E */) || (this.dipDirection === 5 /* Direction.SE */)) {
                // this.strike + this.coordinates.phi = 3Pi
                this.coordinates.phi = 3 * Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.strike);
            }
            else {
                throw new Error(`dip direction is wrong. Should be N, S, E, W, NW or SE`);
            }
        }
        else if (this.strike === 270) {
            if (this.dipDirection === 3 /* Direction.S */) {
                this.coordinates.phi = 3 * Math.PI / 2;
            }
            else if (this.dipDirection === 2 /* Direction.N */) {
                this.coordinates.phi = Math.PI / 2;
            }
            else {
                throw new Error(`dip direction is wrong. Should be N or S`);
            }
        }
        else if (this.strike < 360) {
            if ((this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 0 /* Direction.E */) || (this.dipDirection === 4 /* Direction.NE */)) {
                // this.strike + this.coordinates.phi = 2Pi
                this.coordinates.phi = 2 * Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.strike);
            }
            else if ((this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 1 /* Direction.W */) || (this.dipDirection === 6 /* Direction.SW */)) {
                // this.strike + this.coordinates.phi = 3Pi
                this.coordinates.phi = 3 * Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.strike);
            }
            else {
                throw new Error(`dip direction is wrong. Should be N, S, E, W, NE or SW`);
            }
        }
        else if (this.strike === 360) {
            if (this.dipDirection === 0 /* Direction.E */) {
                this.coordinates.phi = 0;
            }
            else if (this.dipDirection === 1 /* Direction.W */) {
                this.coordinates.phi = Math.PI;
            }
            else {
                throw new Error(`dip direction is wrong. Should be E or W`);
            }
        }
        else {
            throw new Error(`Strike is wrong. Should be in interval [0,360]`);
        }
        // The fault plane is defined by angles (phi, theta) in spherical coordinates.
        // normal: unit vector normal to the fault plane (pointing upward) defined in the geographic reference system: S = (X,Y,Z)
        this.normal_ = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.spherical2unitVectorCartesian)(this.coordinates);
        // e_phi = unit vector parallel to the strike of the fault plane
        this.e_phi[0] = -Math.sin(this.coordinates.phi);
        this.e_phi[1] = Math.cos(this.coordinates.phi);
        this.e_phi[2] = 0;
        // e_theta = unit vector parallel to the dip of the fault plane
        this.e_theta[0] = Math.cos(this.coordinates.theta) * Math.cos(this.coordinates.phi);
        this.e_theta[1] = Math.cos(this.coordinates.theta) * Math.sin(this.coordinates.phi);
        this.e_theta[2] = -Math.sin(this.coordinates.theta);
        // --------------------------------------        
    }
    faultStriationAngle_A() {
        // Function calculating the striation angle in the local reference frame in polar coordinates from the rake
        //      The effect of fault movement on the striation is considered in function faultStriationAngle_B
        // Each fault is defined by a set of parameters as follows:
        //      The fault plane orientation is defined by three parameters:
        //      Fault strike: clockwise angle measured from the North direction [0, 360)
        //      Strike direction (optional): (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
        //      Fault dip: [0, 90]
        //      Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
        // The orientation of the striation in the fault plane can defined in two different ways (which are exclusive):
        // 1-   Rake (or pitch) [0,90], measured from the strike direction, which points in one of the two opposite directions of the fault strike.
        //      Strike direction : (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
        //      Note that the specified strike direction is used to determine the spatial orientation of the striation 
        // 2-   For shallow-dipping planes (i.e., the compass inclinometer is inaccurate):
        //      Striae trend: [0, 360)
        // alphaStria : striation angle measured in the local reference plane (e_phi, e_theta) indicating the motion of the outward block
        //      alphaStria is measured clockwise from e_phi, in interval [0, 2 PI) (this choice is consistent with the definition of the rake, which is measured from the fault strike)
        // V[0] = Math.sin(this.coordinates.theta) * Math.cos( this.coordinates.phi )
        // V[1] = Math.sin(this.coordinates.theta) * Math.sin( this.coordinates.phi )
        // V[2] = Math.cos(this.coordinates.theta)
        // if structure for calculating the striation angle in the local reference frame in polar coordinates from the rake:
        // The special case in which the plane and rake are vertical is treated separately in method setStriationForVerticalPlaneAndRake: the dip direction points toward the uplifted block
        // The following 'if structure' calculates phi from the strike and dip direction (if defined) of the fault plane:
        // Calculate alphaStriaDeg in the general case, i.e;., for planes that are not horizontal and are not vertical with vertical striations (special cases are treated elsewhere)
        if (this.dip > 0 && this.dip < 90) {
            // The plane is not horizontal nor vertical
            if (this.rake > 0 && this.rake < 90) {
                // The strike direction is a geographic direction that must be consistently defined relative to the strike
                // Check the strike direction and calculate the angle alphaStria in the local reference frame
                this.checkStrikeDir_CalcAlphaStria();
            }
            else {
                // The rake = 0 or rake = 90
                if (this.strikeDirection === 8 /* Direction.UND */) {
                    if (this.rake === 0) {
                        // Calculate the angle alphaStria for rake = 0 and rake = 90 in the local reference frame
                        this.calcAlphaStriationRake_0_Sd_UND();
                    }
                    else if (this.rake === 90) {
                        // Calculate the angle alphaStria for rake = 90 and rake = 90 in the local reference frame
                        this.calcAlphaStriationRake_90_Sd_UND();
                    }
                    else {
                        // 0 < rake : this case is studied elsewhere; In principle, the program should not reach this line
                        throw new Error(`Error in faultStriationAngle_A: rake is not in interval [0,90]`);
                    }
                }
                else {
                    // The strike direction is a geographic direction that must be consistently defined relative to the strike
                    // Check the strike direction and calculate the angle alphaStria in the local reference frame
                    this.checkStrikeDir_CalcAlphaStria();
                }
            }
        }
        else if (this.dip === 90) {
            // The plane is vertical
            if (this.rake > 0 && this.rake < 90) {
                // The strike direction is a geographic direction that must be consistently defined relative to the strike
                // Check the strike direction and calculate the angle alphaStria in the local reference frame
                this.checkStrikeDir_CalcAlphaStria_vp();
            }
            else if (this.rake === 0) {
                // The rake = 0 
                if (this.strikeDirection === 8 /* Direction.UND */) {
                    // The strike direction is undefined: calculate the angle alphaStria in the local reference frame
                    this.calcAlphaStriationRake_0_Sd_UND();
                }
                else {
                    // The strike direction is a geographic direction: Check the strike direction and calculate the angle alphaStria in the local reference frame
                    this.checkStrikeDir_CalcAlphaStria_vp();
                }
            }
            else {
                // The plane and striation are vertical (rake = 90): this case is studied elsewhere; In principle, the program should not reach this line
                throw new Error(`Error in faultStriationAngle_A: analysis of striation data for a vertical plane and striation should be done in setStriationForVerticalPlaneAndRake`);
            }
        }
        else {
            // The dip =0 : this case is studied elsewhere; In principle, the program should not reach this line
            throw new Error(`Error in faultStriationAngle_A: analysis of striation data for a horizontal plane should be done in setStriationFromTrend`);
        }
    }
    checkStrikeDir_CalcAlphaStria() {
        // The fault plane and striation are oblique: 0 < dip < 90; 0 < rake < 90
        // Thus, the plane is not vertical (nor horizontal) and the strike direction is a geographic direction that must be consistently defined relative to the strike
        // This function checks the strike direction and calculates the angle alphaStria in the local reference frame
        if (this.strike === 0) {
            if (this.dipDirection === 0 /* Direction.E */) {
                if (this.strikeDirection === 2 /* Direction.N */) {
                    this.alphaStriaDeg = this.rake; // For testing the type of mouvement of faults 
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if (this.strikeDirection === 3 /* Direction.S */) {
                    this.alphaStriaDeg = 180 - this.rake; // For testing the type of mouvement of faults
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`);
                }
            }
            else if (this.dipDirection === 1 /* Direction.W */) {
                if (this.strikeDirection === 2 /* Direction.N */) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if (this.strikeDirection === 3 /* Direction.S */) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`);
                }
            }
            else {
                throw new Error(`dip direction is wrong. Should be E or W`);
            }
        }
        else if (this.strike < 90) {
            if ((this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 0 /* Direction.E */) || (this.dipDirection === 5 /* Direction.SE */)) {
                if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 4 /* Direction.NE */)) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 6 /* Direction.SW */)) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, NE or SW. Got ${this.strikeDirection}`);
                }
            }
            else if ((this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 1 /* Direction.W */) || (this.dipDirection === 7 /* Direction.NW */)) {
                if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 4 /* Direction.NE */)) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 6 /* Direction.SW */)) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be  N, S, E, W, NE or SW`);
                }
            }
            else {
                throw new Error(`dip direction is wrong. Should be N, S, E, W, SE or NW`);
            }
        }
        else if (this.strike === 90) {
            if (this.dipDirection === 3 /* Direction.S */) {
                if (this.strikeDirection === 0 /* Direction.E */) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if (this.strikeDirection === 1 /* Direction.W */) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be E or W`);
                }
            }
            else if (this.dipDirection === 2 /* Direction.N */) {
                if (this.strikeDirection === 0 /* Direction.E */) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if (this.strikeDirection === 1 /* Direction.W */) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be E or W`);
                }
            }
            else {
                throw new Error(`dip direction is wrong. Should be N or S`);
            }
        }
        else if (this.strike < 180) {
            if ((this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 1 /* Direction.W */) || (this.dipDirection === 6 /* Direction.SW */)) {
                if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 5 /* Direction.SE */)) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 7 /* Direction.NW */)) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SE or NW `);
                }
            }
            else if ((this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 0 /* Direction.E */) || (this.dipDirection === 4 /* Direction.NE */)) {
                if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 5 /* Direction.SE */)) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 7 /* Direction.NW */)) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SE or NW `);
                }
            }
            else {
                throw new Error(`dip direction is wrong. Should be N, S, E, W, SW or NE`);
            }
        }
        else if (this.strike === 180) {
            if (this.dipDirection === 1 /* Direction.W */) {
                if (this.strikeDirection === 3 /* Direction.S */) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if (this.strikeDirection === 2 /* Direction.N */) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`);
                }
            }
            else if (this.dipDirection === 0 /* Direction.E */) {
                if (this.strikeDirection === 3 /* Direction.S */) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if (this.strikeDirection === 2 /* Direction.N */) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`);
                }
            }
            else {
                throw new Error(`dip direction is wrong. Should be E or W`);
            }
        }
        else if (this.strike < 270) {
            if ((this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 1 /* Direction.W */) || (this.dipDirection === 7 /* Direction.NW */)) {
                if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 6 /* Direction.SW */)) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 4 /* Direction.NE */)) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SW or NE `);
                }
            }
            else if ((this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 0 /* Direction.E */) || (this.dipDirection === 5 /* Direction.SE */)) {
                if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 6 /* Direction.SW */)) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 4 /* Direction.NE */)) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SW or NE `);
                }
            }
            else {
                throw new Error(`dip direction is wrong. Should be N, S, E, W, SE or NW`);
            }
        }
        else if (this.strike === 270) {
            if (this.dipDirection === 2 /* Direction.N */) {
                if (this.strikeDirection === 1 /* Direction.W */) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if (this.strikeDirection === 0 /* Direction.E */) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be E or W`);
                }
            }
            else if (this.dipDirection === 3 /* Direction.S */) {
                if (this.strikeDirection === 1 /* Direction.W */) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if (this.strikeDirection === 0 /* Direction.E */) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be E or W`);
                }
            }
            else {
                throw new Error(`dip direction is wrong. Should be N or S`);
            }
        }
        else if (this.strike < 360) {
            if ((this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 0 /* Direction.E */) || (this.dipDirection === 4 /* Direction.NE */)) {
                if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 7 /* Direction.NW */)) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 5 /* Direction.SE */)) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, NW or SE `);
                }
            }
            else if ((this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 1 /* Direction.W */) || (this.dipDirection === 6 /* Direction.SW */)) {
                if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 7 /* Direction.NW */)) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 5 /* Direction.SE */)) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, NW or SE `);
                }
            }
            else {
                throw new Error(`dip direction is wrong. Should be N, S, E, W, NE or SW`);
            }
        }
        else if (this.strike === 360) {
            // This case should not occur since in principle strike < 360
            if (this.dipDirection === 0 /* Direction.E */) {
                if (this.strikeDirection === 2 /* Direction.N */) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if (this.strikeDirection === 3 /* Direction.S */) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`);
                }
            }
            else if (this.dipDirection === 1 /* Direction.W */) {
                if (this.strikeDirection === 2 /* Direction.N */) {
                    this.alphaStriaDeg = 180 - this.rake;
                    this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else if (this.strikeDirection === 3 /* Direction.S */) {
                    this.alphaStriaDeg = this.rake;
                    this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
                }
                else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`);
                }
            }
            else {
                throw new Error(`dip direction is wrong. Should be E or W`);
            }
        }
        else {
            throw new Error(`fault strike is out of the expected interval [0,360)`);
        }
    }
    calcAlphaStriationRake_0_Sd_UND() {
        // Consider an oblique or vertical fault plane, such that the striation is horizontal, and the strike direction is undefined: 
        //      0 < dip ; rake = 0; strikeDirection = Direction.UND
        //      If the strike direction is undefined (UND), then there is no need to check the geographic direction
        // This function calculates the angle alphaStria in the local reference frame
        // rake = 0 and strike direction = UND 
        // In this particular case, the orientation of the striation angle is 0 (this value may be modified in method faultStriationAngle_B depending on the type of movement)
        this.alphaStriaDeg = 0;
        this.alphaStria = 0;
    }
    calcAlphaStriationRake_90_Sd_UND() {
        // Consider an oblique or vertical fault plane, such that the striation is perpendicular to the strike, and the strike direction is undefined: 
        //      0 < dip ; rake = 90; strikeDirection = Direction.UND
        //      If the strike direction is undefined (UND), then there is no need to check the geographic direction
        // This function calculates the angle alphaStria in the local reference frame
        // rake = 90 and strike direction = UND 
        // In this particular case, the orientation of the striation angle is PI / 2 (this value may be modified in method faultStriationAngle_B depending on the type of movement)
        this.alphaStriaDeg = 90;
        this.alphaStria = Math.PI / 2;
    }
    checkStrikeDir_CalcAlphaStria_vp() {
        // The fault plane is vertical, the striation is oblique or horizontal and the strike direction is a geographic direction
        //      dip = 90 ; rake < 90; strikeDirection is an element of set (E, W, N, S, NE, SE, SW, NW)
        // Note that the strike direction is a geographic direction that must be consistently defined relative to the strike
        // This method checks the strike direction and calculates the angle alphaStria in the local reference frame
        if (this.strike === 0) {
            // phi = PI
            if (this.strikeDirection === 2 /* Direction.N */) {
                this.alphaStriaDeg = 180 - this.rake;
                this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else if (this.strikeDirection === 3 /* Direction.S */) {
                this.alphaStriaDeg = this.rake;
                this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else {
                // If the rake =/= 90 then the strike direction is N or S
                throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`);
            }
        }
        else if (this.strike < 90) {
            // phi = PI - strike
            if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 4 /* Direction.NE */)) {
                this.alphaStriaDeg = 180 - this.rake;
                this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 6 /* Direction.SW */)) {
                this.alphaStriaDeg = this.rake;
                this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else {
                throw new Error(`Strike direction for measuring the rake is wrong. Should be  N, S, E, W, NE or SW`);
            }
        }
        else if (this.strike === 90) {
            // phi = PI/2
            if (this.strikeDirection === 0 /* Direction.E */) {
                this.alphaStriaDeg = 180 - this.rake;
                this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else if (this.strikeDirection === 1 /* Direction.W */) {
                this.alphaStriaDeg = this.rake;
                this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else {
                throw new Error(`Strike direction for measuring the rake is wrong. Should be E, or W`);
            }
        }
        else if (this.strike < 180) {
            // phi = PI - strike
            if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 5 /* Direction.SE */)) {
                this.alphaStriaDeg = 180 - this.rake;
                this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 7 /* Direction.NW */)) {
                this.alphaStriaDeg = this.rake;
                this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else {
                throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SE or NW `);
            }
        }
        else if (this.strike === 180) {
            // phi = 0
            if (this.strikeDirection === 3 /* Direction.S */) {
                this.alphaStriaDeg = 180 - this.rake;
                this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else if (this.strikeDirection === 2 /* Direction.N */) {
                this.alphaStriaDeg = this.rake;
                this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else {
                throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`);
            }
        }
        else if (this.strike < 270) {
            // phi = 3 PI - strike
            if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 6 /* Direction.SW */)) {
                this.alphaStriaDeg = 180 - this.rake;
                this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 4 /* Direction.NE */)) {
                this.alphaStriaDeg = this.rake;
                this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else {
                throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SW or NE `);
            }
        }
        else if (this.strike === 270) {
            // phi = 3 PI / 2
            if (this.strikeDirection === 1 /* Direction.W */) {
                this.alphaStriaDeg = 180 - this.rake;
                this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else if (this.strikeDirection === 0 /* Direction.E */) {
                this.alphaStriaDeg = this.rake;
                this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else {
                throw new Error(`Strike direction for measuring the rake is wrong. Should be E or W`);
            }
        }
        else if (this.strike < 360) {
            // phi = 3 PI - strike
            if ((this.strikeDirection === 2 /* Direction.N */) || (this.strikeDirection === 1 /* Direction.W */) || (this.strikeDirection === 7 /* Direction.NW */)) {
                this.alphaStriaDeg = 180 - this.rake;
                this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else if ((this.strikeDirection === 3 /* Direction.S */) || (this.strikeDirection === 0 /* Direction.E */) || (this.strikeDirection === 5 /* Direction.SE */)) {
                this.alphaStriaDeg = this.rake;
                this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else {
                throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, NW or SE `);
            }
        }
        else if (this.strike === 360) {
            // This case should not occur since in principle strike < 360
            // phi = PI
            if (this.strikeDirection === 2 /* Direction.N */) {
                this.alphaStriaDeg = 180 - this.rake;
                this.alphaStria = Math.PI - (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else if (this.strikeDirection === 3 /* Direction.S */) {
                this.alphaStriaDeg = this.rake;
                this.alphaStria = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(this.rake);
            }
            else {
                throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`);
            }
        }
        else {
            // This case should not occur since in principle strike < 360
            throw new Error(`fault strike is out of the expected interval [0,360)`);
        }
    }
    /*
    old version
    private faultStriationAngle_A(): void {
        // Function calculating the striation angle in the local reference frame in polar coordinates from the rake
        //      The effect of fault movement on the striation is considered in function faultStriationAngle_B

        // Each fault is defined by a set of parameters as follows:
        //      The fault plane orientation is defined by three parameters:
        //      Fault strike: clockwise angle measured from the North direction [0, 360)
        //      Strike direction (optional): (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
        //      Fault dip: [0, 90]
        //      Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).

        // The orientation of the striation in the fault plane can defined in two different ways (which are exclusive):

        // 1-   Rake (or pitch) [0,90], measured from the strike direction, which points in one of the two opposite directions of the fault strike.
        //      Strike direction : (N, E, S, W) or a combination of two direction (NE, SE, SW, NW).
        //      Note that the specified strike direction is used to determine the spatial orientation of the striation

        // 2-   For shallow-dipping planes (i.e., the compass inclinometer is inaccurate):
        //      Striae trend: [0, 360)

        // alphaStria : striation angle measured in the local reference plane (e_phi, e_theta) indicating the motion of the outward block
        //      alphaStria is measured clockwise from e_phi, in interval [0, 2 PI) (this choice is consistent with the definition of the rake, which is measured from the fault strike)

        // V[0] = Math.sin(this.coordinates.theta) * Math.cos( this.coordinates.phi )
        // V[1] = Math.sin(this.coordinates.theta) * Math.sin( this.coordinates.phi )
        // V[2] = Math.cos(this.coordinates.theta)

        // if structure for calculating the striation angle in the local reference frame in polar coordinates from the rake:

        // The special case in which the plane and rake are vertical is treated separately in method setStriationForVerticalPlaneAndRake: the dip direction points toward the uplifted block

        // The following 'if structure' calculates phi from the strike and dip direction (if defined) of the fault plane:

        if ( this.rake === 90 && this.strikeDirection === Direction.UND ) {
            // This special case corresponds to an oblique plane (0 < dip < 90) with rake = 90 and strike direction = UND (the vertical plane with vertical rake is treated elsewhere)
            // Note that if the rake is 90 then the strike direction can be either a geographic direction or undefined (UND).
            //      If the strike direction is undefined (UND), then there is no need to check the geographic direction
            // In this particular case, the orientation of the striation angle is PI / 2 (this value may be modified in method faultStriationAngle_B depending on the type of movement)
            this.alphaStriaDeg = 90
            this.alphaStria = Math.PI / 2

        } else if ( this.rake === 0 && this.strikeDirection === Direction.UND) {
            // This special case corresponds to a plane with dip > 0, rake = 0 and strike direction = UND
            // If the rake is 0 then the strike direction can be either a geographic direction or undefined (UND).
            //      If the strike direction is undefined (UND), then there is no need to check the geographic direction
            // In this particular case, the orientation of the striation angle is 0 (this value may be modified in method faultStriationAngle_B depending on the type of movement)
            this.alphaStriaDeg = 0
            this.alphaStria = 0

        } else if (this.dip === 90) {
            // The fault plane is vertical, the rake < 90 and the strike direction is a geographic direction

            if (this.strike === 0) {
                // phi = PI
                if (this.strikeDirection === Direction.N) {
                    this.alphaStriaDeg = 180 - this.rake
                    this.alphaStria = Math.PI - deg2rad(this.rake)
                } else if (this.strikeDirection === Direction.S) {
                    this.alphaStriaDeg = this.rake
                    this.alphaStria = deg2rad(this.rake)
                } else {
                    // If the rake =/= 90 then the strike direction is N or S
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`)
                }
            } else if (this.strike < 90) {
                // phi = PI - strike
                if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.NE)) {
                    this.alphaStriaDeg = 180 - this.rake
                    this.alphaStria = Math.PI - deg2rad(this.rake)
                } else if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.SW)) {
                    this.alphaStriaDeg = this.rake
                    this.alphaStria = deg2rad(this.rake)
                } else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be  N, S, E, W, NE or SW`)
                }
            } else if (this.strike === 90) {
                // phi = PI/2
                if (this.strikeDirection === Direction.E) {
                    this.alphaStriaDeg = 180 - this.rake
                    this.alphaStria = Math.PI - deg2rad(this.rake)
                } else if (this.strikeDirection === Direction.W) {
                    this.alphaStriaDeg = this.rake
                    this.alphaStria = deg2rad(this.rake)
                } else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be E, or W`)
                }
            } else if (this.strike < 180) {
                // phi = PI - strike
                if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.SE)) {
                    this.alphaStriaDeg = 180 - this.rake
                    this.alphaStria = Math.PI - deg2rad(this.rake)
                } else if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.NW)) {
                    this.alphaStriaDeg = this.rake
                    this.alphaStria = deg2rad(this.rake)
                } else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SE or NW `)
                }
            } else if (this.strike === 180) {
                // phi = 0
                if (this.strikeDirection === Direction.S) {
                    this.alphaStriaDeg = 180 - this.rake
                    this.alphaStria = Math.PI - deg2rad(this.rake)
                } else if (this.strikeDirection === Direction.N) {
                    this.alphaStriaDeg = this.rake
                    this.alphaStria = deg2rad(this.rake)
                } else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`)
                }
            } else if (this.strike < 270) {
                // phi = 3 PI - strike
                if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.SW)) {
                    this.alphaStriaDeg = 180 - this.rake
                    this.alphaStria = Math.PI - deg2rad(this.rake)
                } else if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.NE)) {
                    this.alphaStriaDeg = this.rake
                    this.alphaStria = deg2rad(this.rake)
                } else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SW or NE `)
                }
            } else if (this.strike === 270) {
                // phi = 3 PI / 2
                if (this.strikeDirection === Direction.W) {
                    this.alphaStriaDeg = 180 - this.rake
                    this.alphaStria = Math.PI - deg2rad(this.rake)
                } else if (this.strikeDirection === Direction.E) {
                    this.alphaStriaDeg = this.rake
                    this.alphaStria = deg2rad(this.rake)
                } else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be E or W`)
                }
            } else if (this.strike < 360) {
                // phi = 3 PI - strike
                if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.NW)) {
                    this.alphaStriaDeg = 180 - this.rake
                    this.alphaStria = Math.PI - deg2rad(this.rake)
                } else if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.SE)) {
                    this.alphaStriaDeg = this.rake
                    this.alphaStria = deg2rad(this.rake)
                } else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, NW or SE `)
                }
            } else if (this.strike === 360) {
                // This case should not occur since in principle strike < 360
                // phi = PI
                if (this.strikeDirection === Direction.N) {
                    this.alphaStriaDeg = 180 - this.rake
                    this.alphaStria = Math.PI - deg2rad(this.rake)
                } else if (this.strikeDirection === Direction.S) {
                    this.alphaStriaDeg = this.rake
                    this.alphaStria = deg2rad(this.rake)
                } else {
                    throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`)
                }
            } else {
                // This case should not occur since in principle strike < 360
                throw new Error(`fault strike is out of the expected interval [0,360)`)
            }

        } else {
            // The fault plane is not vertical (nor horizontal) and the dip direction is a geographic direction or undefined
            // the special case of a horizontal plane is treated in method setStriationFromTrend

            if (this.strike === 0) {
                if (this.dipDirection === Direction.E) {
                    if (this.strikeDirection === Direction.N) {
                        this.alphaStriaDeg = this.rake          // For testing the type of mouvement of faults
                        this.alphaStria = deg2rad(this.rake)
                    } else if (this.strikeDirection === Direction.S) {
                        this.alphaStriaDeg = 180 - this.rake    // For testing the type of mouvement of faults
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`)
                    }
                } else if (this.dipDirection === Direction.W) {
                    if (this.strikeDirection === Direction.N) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else if (this.strikeDirection === Direction.S) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`)
                    }
                } else {
                    throw new Error(`dip direction is wrong. Should be E or W`)
                }
            } else if (this.strike < 90) {

                if ((this.dipDirection === Direction.S) || (this.dipDirection === Direction.E) || (this.dipDirection === Direction.SE)) {
                    if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.NE)) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.SW)) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, NE or SW. Got ${this.strikeDirection}`)
                    }
                } else if ((this.dipDirection === Direction.N) || (this.dipDirection === Direction.W) || (this.dipDirection === Direction.NW)) {
                    if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.NE)) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.SW)) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be  N, S, E, W, NE or SW`)
                    }
                } else {
                    throw new Error(`dip direction is wrong. Should be N, S, E, W, SE or NW`)
                }
            } else if (this.strike === 90) {

                if (this.dipDirection === Direction.S) {
                    if (this.strikeDirection === Direction.E) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else if (this.strikeDirection === Direction.W) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be E or W`)
                    }
                } else if (this.dipDirection === Direction.N) {
                    if (this.strikeDirection === Direction.E) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else if (this.strikeDirection === Direction.W) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be E or W`)
                    }
                } else {
                    throw new Error(`dip direction is wrong. Should be N or S`)
                }
            } else if (this.strike < 180) {

                if ((this.dipDirection === Direction.S) || (this.dipDirection === Direction.W) || (this.dipDirection === Direction.SW)) {
                    if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.SE)) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.NW)) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SE or NW `)
                    }
                } else if ((this.dipDirection === Direction.N) || (this.dipDirection === Direction.E) || (this.dipDirection === Direction.NE)) {
                    if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.SE)) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.NW)) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SE or NW `)
                    }
                } else {
                    throw new Error(`dip direction is wrong. Should be N, S, E, W, SW or NE`)
                }
            } else if (this.strike === 180) {

                if (this.dipDirection === Direction.W) {
                    if (this.strikeDirection === Direction.S) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else if (this.strikeDirection === Direction.N) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`)
                    }
                } else if (this.dipDirection === Direction.E) {
                    if (this.strikeDirection === Direction.S) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else if (this.strikeDirection === Direction.N) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`)
                    }
                } else {
                    throw new Error(`dip direction is wrong. Should be E or W`)
                }
            } else if (this.strike < 270) {

                if ((this.dipDirection === Direction.N) || (this.dipDirection === Direction.W) || (this.dipDirection === Direction.NW)) {
                    if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.SW)) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.NE)) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SW or NE `)
                    }
                } else if ((this.dipDirection === Direction.S) || (this.dipDirection === Direction.E) || (this.dipDirection === Direction.SE)) {
                    if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.SW)) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.NE)) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, SW or NE `)
                    }
                } else {
                    throw new Error(`dip direction is wrong. Should be N, S, E, W, SE or NW`)
                }
            } else if (this.strike === 270) {

                if (this.dipDirection === Direction.N) {
                    if (this.strikeDirection === Direction.W) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else if (this.strikeDirection === Direction.E) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be E or W`)
                    }
                } else if (this.dipDirection === Direction.S) {
                    if (this.strikeDirection === Direction.W) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else if (this.strikeDirection === Direction.E) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be E or W`)
                    }
                } else {
                    throw new Error(`dip direction is wrong. Should be N or S`)
                }
            } else if (this.strike < 360) {

                if ((this.dipDirection === Direction.N) || (this.dipDirection === Direction.E) || (this.dipDirection === Direction.NE)) {
                    if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.NW)) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.SE)) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, NW or SE `)
                    }
                } else if ((this.dipDirection === Direction.S) || (this.dipDirection === Direction.W) || (this.dipDirection === Direction.SW)) {
                    if ((this.strikeDirection === Direction.N) || (this.strikeDirection === Direction.W) || (this.strikeDirection === Direction.NW)) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else if ((this.strikeDirection === Direction.S) || (this.strikeDirection === Direction.E) || (this.strikeDirection === Direction.SE)) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N, S, E, W, NW or SE `)
                    }
                } else {
                    throw new Error(`dip direction is wrong. Should be N, S, E, W, NE or SW`)
                }
            } else if (this.strike === 360) {
                // This case should not occur since in principle strike < 360
                if (this.dipDirection === Direction.E) {
                    if (this.strikeDirection === Direction.N) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else if (this.strikeDirection === Direction.S) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`)
                    }
                } else if (this.dipDirection === Direction.W) {
                    if (this.strikeDirection === Direction.N) {
                        this.alphaStriaDeg = 180 - this.rake
                        this.alphaStria = Math.PI - deg2rad(this.rake)
                    } else if (this.strikeDirection === Direction.S) {
                        this.alphaStriaDeg = this.rake
                        this.alphaStria = deg2rad(this.rake)
                    } else {
                        throw new Error(`Strike direction for measuring the rake is wrong. Should be N or S`)
                    }
                } else {
                    throw new Error(`dip direction is wrong. Should be E or W`)
                }
            } else {
                throw new Error(`fault strike is out of the expected interval [0,360)`)

            }
        }
    }
    */
    faultStriationAngle_B() {
        // Function introducuing the effect of fault movement on the striation angle
        // This function is called after function faultStriationAngle_A
        // We calculate a unit vector e_striation pointing toward the measured striation
        // Type of mouvement: For verification purposes, it is recommended to indicate both the dip-slip and strike-slip compoenents, when possible. 
        //      Dip-slip component:
        //          N = Normal fault, 
        //          I = Inverse fault or thrust
        //      Strike-slip componenet:
        //          RL = Right-Lateral fault
        //          LL = Left-Lateral fault
        // Type of mouvement: N, I, RL, LL, N-RL, N-LL, I-RL, I-LL
        // this.alphaStriaDeg is in interval [0,180] according to function faultStriationAngle_A; 
        // This angle indicates the mouvement of the top (outward) block relative to the bottom (inner) block 
        // 'if structure' that modifies when required the striation angle according to the type of mouvement of faults:
        if (this.dip === 90) {
            // The fault plane is vertical and only the strike-slip component of motion is defined
            // alphaStriaDeg calculated in function faultStriationAngle_B is in interval [0,PI]
            if ((this.alphaStriaDeg >= 0) && (this.alphaStriaDeg < 90)) {
                // alphaStriaDeg has a left-lateral strike-slip component 
                if (this.typeMov === 2 /* TypeOfMovement.RL */) {
                    // Fault movement is oriented opposite to the present value of the striation angle
                    this.alphaStriaDeg += 180;
                    this.alphaStria += Math.PI;
                }
                else if (this.typeMov != 3 /* TypeOfMovement.LL */) {
                    throw new Error(`type of mouvement is not consistent with fault data. Should be RL or LL`);
                }
            }
            else if (this.alphaStriaDeg === 90) { // Pure dip-slip mouvement
                // Note that if alphaStriaDeg = 90 then the fault only has a dip-slip component and the direction of the uplifted block is requested 
                // In principle this code line is never reached since this special case is treated in method setStriationForVerticalPlaneAndRake,
                // which is called in method create()
                this.faultStriationUpliftedBlock();
            }
            else if (this.alphaStriaDeg <= 180) {
                // 90 < alphaStriaDeg <= 180 means that the fault is normal-right-lateral
                if (this.typeMov === 3 /* TypeOfMovement.LL */) {
                    // Fault movement is oriented opposite to the present value of the striation angle
                    this.alphaStriaDeg += 180;
                    this.alphaStria += Math.PI;
                }
                else if (this.typeMov != 2 /* TypeOfMovement.RL */) {
                    throw new Error(`type of mouvement is not consistent with fault data. Should be RL or LL`);
                }
            }
            else {
                throw new Error(`calculated striation alphaStriaDeg should be in interval [0,180]. Check routine faultStriationAngle_A`);
            }
        }
        else { // The fault plane is not vertical and both strike-slip and dip-slip components of motion are defined
            if (this.alphaStriaDeg === 0) { // Pure strike-slip mouvement
                // alphaStriaDeg = 0 means that the fault is left-lateral
                if (this.typeMov === 2 /* TypeOfMovement.RL */) {
                    // Fault movement is oriented opposite to the present value of the striation angle
                    this.alphaStriaDeg = 180; // Striation values are recalculated
                    this.alphaStria = Math.PI;
                }
                else if (this.typeMov != 3 /* TypeOfMovement.LL */) {
                    throw new Error(`type of mouvement is not consistent with fault data. Should be RL or LL`);
                }
            }
            else if (this.alphaStriaDeg < 90) { // Strike-slip and dip slip mouvement
                // 0 < alphaStriaDeg < 90 means that the fault is normal-left-lateral
                if ((this.typeMov === 2 /* TypeOfMovement.RL */) || (this.typeMov === 1 /* TypeOfMovement.I */) || (this.typeMov === 6 /* TypeOfMovement.I_RL */)) {
                    this.alphaStriaDeg += 180;
                    this.alphaStria += Math.PI;
                }
                else if ((this.typeMov !== 3 /* TypeOfMovement.LL */) && (this.typeMov !== 0 /* TypeOfMovement.N */) && (this.typeMov !== 5 /* TypeOfMovement.N_LL */)) {
                    throw new Error(`type of mouvement is not consistent with fault data. Should be LL or N or N-LL or RL or I or I-RL`);
                }
            }
            else if (this.alphaStriaDeg === 90) { // Pure dip-slip mouvement
                // alphaStriaDeg = 90 means that the fault is normal
                if (this.typeMov === 1 /* TypeOfMovement.I */) {
                    // Fault movement is oriented opposite to the present value of the striation angle
                    this.alphaStriaDeg = 270; // Striation values are recalculated
                    this.alphaStria = 3 * Math.PI / 2;
                }
                else if (this.typeMov != 0 /* TypeOfMovement.N */) {
                    throw new Error(`type of mouvement is not consistent with fault data. Should be N or I`);
                }
            }
            else if (this.alphaStriaDeg < 180) { // Strike-slip and dip slip mouvement
                // 90 < alphaStriaDeg < 180 means that the fault is normal-right-lateral
                if ((this.typeMov === 3 /* TypeOfMovement.LL */) || (this.typeMov === 1 /* TypeOfMovement.I */) || (this.typeMov === 7 /* TypeOfMovement.I_LL */)) {
                    this.alphaStriaDeg += 180;
                    this.alphaStria += Math.PI;
                }
                else if ((this.typeMov !== 2 /* TypeOfMovement.RL */) && (this.typeMov !== 0 /* TypeOfMovement.N */) && (this.typeMov === 4 /* TypeOfMovement.N_RL */)) {
                    throw new Error(`type of mouvement is not consistent with fault data. Should be LL or I or I-LL or RL or N or N-RL`);
                }
            }
            else if (this.alphaStriaDeg === 180) { // Pure strike-slip mouvement
                // alphaStriaDeg = 180 means that the fault is right-lateral
                if (this.typeMov === 3 /* TypeOfMovement.LL */) {
                    // Fault movement is oriented opposite to the present value of the striation angle
                    this.alphaStriaDeg = 0; // Striation values are recalculated
                    this.alphaStria = 0;
                }
                else if (this.typeMov != 2 /* TypeOfMovement.RL */) {
                    throw new Error(`type of mouvement is not consistent with fault data. Should be RL or LL`);
                }
            }
            else {
                throw new Error(`calculated striation alphaStriaDeg should be in interval [0,180]. Check routine faultStriationAngle_A`);
            }
        }
        // Calculate in reference system S the unit vector e_striation pointing toward the measured striation BB
        this.e_striation_[0] = Math.cos(this.alphaStria) * this.e_phi[0] + Math.sin(this.alphaStria) * this.e_theta[0];
        this.e_striation_[1] = Math.cos(this.alphaStria) * this.e_phi[1] + Math.sin(this.alphaStria) * this.e_theta[1];
        this.e_striation_[2] = Math.cos(this.alphaStria) * this.e_phi[2] + Math.sin(this.alphaStria) * this.e_theta[2];
        // Calculate in reference system S the unit vector e_perp_striation_ located on the fault plane and perpendicular to the striation.
        // This vector is necessary for calculating the misfit angle for criteria involving friction.
        // The local coord system (e_striation_, e_perp_striation_, normal) is right handed
        this.e_perp_striation_ = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.crossProduct)({ U: this.normal, V: this.e_striation_ }); // .normal or this.normal_
    }
    faultStriationUpliftedBlock() {
        //  Special case: The fault plane is vertical and the rake is 90°: this.dip = 90, this.rake = 90, this.alphaStriaDeg = 90
        // This method is currently replaced by method setStriationForVerticalPlaneAndRake, which is specific to this special case,
        // in which the dip direction has a different meaning: it points toward the uplifted block.
        // Nevertheless, method faultStriationUpliftedBlock, which cas called in faultStriationAngle_B, works properly.
        // To calculate the orientation of the striation the user must specify an additional parameter indicating the direction of the uplifted block:
        // Thus, in this special case the dip direction is interpreted differently and points toward the uplifted block
        //      dipDirection: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW)
        if (this.strike === 0) {
            if (this.dipDirection === 1 /* Direction.W */) {
                this.alphaStriaDeg = 270;
                this.alphaStria = 3 * Math.PI / 2;
            }
            else if (this.dipDirection !== 0 /* Direction.E */) {
                throw new Error(`The orientation of the uplifted block is wrong. Should be E or W`);
            }
        }
        else if (this.strike < 90) {
            if ((this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 1 /* Direction.W */) || (this.dipDirection === 7 /* Direction.NW */)) {
                this.alphaStriaDeg = 270;
                this.alphaStria = 3 * Math.PI / 2;
            }
            else if ((this.dipDirection !== 3 /* Direction.S */) && (this.dipDirection !== 0 /* Direction.E */) && (this.dipDirection !== 5 /* Direction.SE */)) {
                throw new Error(`The orientation of the uplifted block is wrong. Should be N, S, E, W, SE or NW`);
            }
        }
        else if (this.strike === 90) {
            if (this.dipDirection === 2 /* Direction.N */) {
                this.alphaStriaDeg = 270;
                this.alphaStria = 3 * Math.PI / 2;
            }
            else if (this.dipDirection !== 3 /* Direction.S */) {
                throw new Error(`The orientation of the uplifted block is wrong. Should be N or S`);
            }
        }
        else if (this.strike < 180) {
            if ((this.dipDirection === 2 /* Direction.N */) || (this.dipDirection === 0 /* Direction.E */) || (this.dipDirection === 4 /* Direction.NE */)) {
                this.alphaStriaDeg = 270;
                this.alphaStria = 3 * Math.PI / 2;
            }
            else if ((this.dipDirection !== 3 /* Direction.S */) && (this.dipDirection !== 1 /* Direction.W */) && (this.dipDirection !== 6 /* Direction.SW */)) {
                throw new Error(`The orientation of the uplifted block is wrong. Should be N, S, E, W, NE or SW`);
            }
        }
        else if (this.strike === 180) {
            if (this.dipDirection === 0 /* Direction.E */) {
                this.alphaStriaDeg = 270;
                this.alphaStria = 3 * Math.PI / 2;
            }
            else if (this.dipDirection !== 1 /* Direction.W */) {
                throw new Error(`The orientation of the uplifted block is wrong. Should be E or W`);
            }
        }
        else if (this.strike < 270) {
            if ((this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 0 /* Direction.E */) || (this.dipDirection === 5 /* Direction.SE */)) {
                this.alphaStriaDeg = 270;
                this.alphaStria = 3 * Math.PI / 2;
            }
            else if ((this.dipDirection !== 2 /* Direction.N */) && (this.dipDirection !== 1 /* Direction.W */) && (this.dipDirection !== 7 /* Direction.NW */)) {
                throw new Error(`The orientation of the uplifted block is wrong. Should be N, S, E, W, SE or NW`);
            }
        }
        else if (this.strike === 270) {
            if (this.dipDirection === 3 /* Direction.S */) {
                this.alphaStriaDeg = 270;
                this.alphaStria = 3 * Math.PI / 2;
            }
            else if (this.dipDirection !== 2 /* Direction.N */) {
                throw new Error(`The orientation of the uplifted block is wrong. Should be N or S`);
            }
        }
        else if (this.strike < 360) {
            if ((this.dipDirection === 3 /* Direction.S */) || (this.dipDirection === 1 /* Direction.W */) || (this.dipDirection === 6 /* Direction.SW */)) {
                this.alphaStriaDeg = 270;
                this.alphaStria = 3 * Math.PI / 2;
            }
            else if ((this.dipDirection !== 2 /* Direction.N */) && (this.dipDirection !== 0 /* Direction.E */) && (this.dipDirection !== 4 /* Direction.NE */)) {
                throw new Error(`The orientation of the uplifted block is wrong. Should be N, S, E, W, NE or SW`);
            }
        }
        else if (this.strike === 360) {
            if (this.dipDirection === 1 /* Direction.W */) {
                this.alphaStriaDeg = 270;
                this.alphaStria = 3 * Math.PI / 2;
            }
            else if (this.dipDirection !== 0 /* Direction.E */) {
                throw new Error(`The orientation of the uplifted block is wrong. Should be E or W`);
            }
        }
        else {
            throw new Error(`fault strike is out of the expected interval [0,360)`);
        }
    }
    // private createUpLiftedBlock() {
    //     const f = new FaultHelper({strike: 0, dipDirection: Direction.E, dip: 90}) // TODO: params in ctor
    //     f.setStriation({strikeDirection: Direction.N, rake: 90, typeOfMovement: TypeOfMovement.UND})
    //     /**
    //     * There is one particular case in which the sens of mouvement has to be defined with a different parameter:
    //     * A vertical plane with rake = 90.
    //     * In such situation the user must indicate for example the direction of the uplifted block:
    //     *      upLiftedBlock: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
    //     */
    //     return f
    // }
    faultSphericalCoordsSP() {
        // Calculate the spherical coordinates of the unit vector normal to the plane in reference system Sr
        // normalSp: unit vector normal to the fault plane (pointing upward) defined in the stress tensor reference system: 
        //          Sr = (Xr,Yr,Zr)=(sigma 1,sigma 3,sigma 2)
        // values should be recalculated for new stress tensors    
        // Let Rrot be the rotation tensor R between reference systems S and Sr, such that:
        //      Vr = R V,  where V and Vr are the same vector defined in reference frames S and Sr, respectively
        this.normalSp = (0,_types_math__WEBPACK_IMPORTED_MODULE_0__.tensor_x_Vector)({ T: this.RTrot, V: this.normal });
        if (this.normalSp[0] > 0) {
            if (this.normalSp[1] >= 0) {
                // phiSp is in interval [0, Pi/2)
                this.coordinatesSp.phi = Math.atan(this.normalSp[1] / this.normalSp[0]);
            }
            else {
                // phiSp is in interval (3Pi/2, 2Pi)
                // atan is probably defined in interval (-Pi/2, Pi/2)
                this.coordinatesSp.phi = 2 * Math.PI + Math.atan(this.normalSp[1] / this.normalSp[0]);
            }
        }
        else if (this.normalSp[0] < 0) {
            if (this.normalSp[1] >= 0) {
                // phiSp is in interval (Pi/2, Pi]
                this.coordinatesSp.phi = Math.atan(this.normalSp[1] / this.normalSp[0]) + Math.PI;
            }
            else {
                // phiSp is defined in interval [Pi, 3Pi/2)
                this.coordinatesSp.phi = Math.atan(this.normalSp[1] / this.normalSp[0]) + Math.PI;
            }
        }
        else {
            if (this.normalSp[1] > 0) {
                // phiSp = Pi/2
                this.coordinatesSp.phi = Math.PI / 2;
            }
            else {
                // phiSp = 3Pi/2
                this.coordinatesSp.phi = 3 * Math.PI / 2;
            }
        }
    }
    faultNormalVectorSp() {
        /**
         *  (phiSp,thetaSp) : spherical coordinate angles defining the unit vector perpendicular to the fault plane (pointing upward in system S)
         *               in the stress tensor reference system: Sr = (X,Y,Z) ('r' stands for 'rough' solution)
         *  These angles are recalculated from the new stress tensors
         */
    }
    /**
     * Rotate the tensor about an angle...
     * @param rotAx_phi
     */
    vector_rotation(rotAx_phi) {
        // this.x = Math.sin( rotAx_phi);
    }
}
// Stress parameters:
// For a given stress tensor, we calculate the stress components:
// Step 1:
//      nr = R n,  where n and nr are vectors in reference frames S and Sr
/*
this.normalSp[0] = R[0,0] * this.normal[0] + R[0,1] * this.normal[1] + R[0,2] * this.normal[2]
this.normalSp[1] = R[1,0] * this.normal[0] + R[1,1] * this.normal[1] + R[1,2] * this.normal[2]
this.normalSp[2] = R[2,0] * this.normal[0] + R[2,1] * this.normal[1] + R[2,2] * this.normal[2]

// Step 2:
// The principal stress values are defined according to the rock mechanics sign convention (positive values for compressive stresses)
const sigma_1 = - this.lambda[0]    // Principal stress in X direction
const sigma_2 = - this.lambda[2]    // Principal stress in Z direction
const sigma_3 = - this.lambda[1]    // Principal stress in Y direction

// Calculate the normal and shear stress components of the fault plane using coordinates in reference system Sr:
// Sr = (Xr,Yr,Zr) is the principal stress reference frame, parallel to (sigma_1, sigma_3, sigma_2) ('r' stands for 'rough' solution);
// The stress magnitude is obtained from the sum of the squared components
let this.Stress = Math.sqrt( sigma_1**2 * np[0]**2 + sigma_3**2 * np[1]**2 + sigma_2**2 * np[2]**2 )
// The signed normal stress is obtatined form the scalar product of the normal and stress vectors
// The normal stress is positive since (s1,s2,s3) = (1,R,0)
let this.normalStress = sigma_1 * np[0]**2 + sigma_3 * np[1]**2 + sigma_2 * np[2]**2
// The shear stress
let this.shearStress = sigma_1 * np[0]**2 + sigma_3 * np[1]**2 + sigma_2 * np[2]**2
*/


/***/ }),

/***/ "./lib/utils/PlaneHelper.ts":
/*!**********************************!*\
  !*** ./lib/utils/PlaneHelper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodePlane": () => (/* binding */ decodePlane)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data */ "./lib/data/index.ts");
/* harmony import */ var _FaultHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FaultHelper */ "./lib/utils/FaultHelper.ts");
/* harmony import */ var _numberUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./numberUtils */ "./lib/utils/numberUtils.ts");



// export class PlaneHelper {
function decodePlane(args) {
    const arg = (0,_data__WEBPACK_IMPORTED_MODULE_0__.createDataArgument)(args);
    let strike = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(2));
    let dip = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(3));
    let dipDirection = undefined;
    // Check consistency of the dip direction
    let dipDirIsUND = false;
    let dipDirIsEmptySet = false;
    let dipDirIsGeographicDir = false;
    // const result = {
    //     status: true,
    //     messages: []
    // }
    if ((0,_numberUtils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(arg.toks[4])) {
        // The dip direction is defined 
        let dipDirection = _data__WEBPACK_IMPORTED_MODULE_0__.DataDescription.getParameter(arg.setIndex(4));
        if ((0,_FaultHelper__WEBPACK_IMPORTED_MODULE_1__.isGeographicDirection)(dipDirection)) {
            // The dip direction is a valid geographic direction: 'E', 'W', 'N', 'S', 'NE', 'SE', 'SW', 'NW'
            //      i.e., strike direction is an element of set (E, W, N, S, NE, SE, SW, NW)
            dipDirIsGeographicDir = true;
        }
        else if (dipDirection === 8 /* Direction.UND */) {
            // The dip direction is undefined (UND) 
            dipDirIsUND = true;
        }
        else {
            // The dip direction is not a valid string 
            arg.result.status = false;
            arg.result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, plane parameters: please define the dip direction (col 4) from set (E, W, N, S, NE, SE, SW, NW, UND)`);
        }
    }
    else {
        // dip direction is not defined (i.e., empty set)
        dipDirIsEmptySet = true;
    }
    if (dip > 0 && dip < 90) {
        // General case: the plane is neither horizontal nor vertical 
        if (dipDirIsEmptySet) {
            // The dip direction cannot be the empty set
            arg.result.status = false;
            arg.result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, plane parameter: the dip direction (col 4) is not the empty string; please define the dip direction (col 4) from set (E, W, N, S, NE, SE, SW, NW)`);
        }
        else if (dipDirIsUND) {
            // The dip direction must be defined in terms of a geographic direction (i.e., it cannot be undefined - UND)
            arg.result.status = false;
            arg.result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, plane parameter: the dip direction (col 4) is not undefined (UND); please define the dip direction (col 4) from set (E, W, N, S, NE, SE, SW, NW)`);
        }
        else if (!dipDirIsGeographicDir) {
            // In principle this else if is never reached as the geographic direction has already been checked for the dip direction parameter
            arg.result.status = false;
            arg.result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, plane parameter: please define the dip direction (col 4) from set (E, W, N, S, NE, SE, SW, NW)`);
        }
    }
    else {
        if (dipDirection !== 8 /* Direction.UND */) {
            // For horizontal and vertical planes, the dip direction is either undefined (UND) or not defined (the empty set)
            if (!dipDirIsUND && !dipDirIsEmptySet) {
                arg.result.status = false;
                arg.result.messages.push(`Data number ${arg.toks[0]}, ${arg.toks[1]}, plane parameter: for a horizontal plane, please set the dip direction (col 4) as undefined (UND) or non defined (empty string)`);
            }
        }
    }
    if (dipDirIsEmptySet) {
        // Dip direction is not defined (i.e., empty set)
        // This value is equivalent to undefined (UND) in subsequent methods and functions (FaultHelper)
        dipDirection = 8 /* Direction.UND */;
    }
    /*
    const r = {
        result: {
            status,
            messages
        },
        dip,
        strike,
        dipDirection
    }
    r.result.status
    r.dip
    ...
    */
    return {
        result: arg.result,
        dip,
        strike,
        dipDirection
    };
}


/***/ }),

/***/ "./lib/utils/fromAnglesToNormal.ts":
/*!*****************************************!*\
  !*** ./lib/utils/fromAnglesToNormal.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromAnglesToNormal": () => (/* binding */ fromAnglesToNormal)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");

/**
 * @param parameters
 */
function fromAnglesToNormal({ strike, dip, dipDirection }) {
    // Each fault is defined by a set of parameters as follows:
    //      The fault plane orientation is defined by three parameters:
    //      Fault strike: clockwise angle measured from the North direction [0, 360)
    //      Fault dip: [0, 90]
    //      Dip direction: (N, E, S, W) or a combination of two directions (NE, SE, SW, NW).
    // (phi,theta) : spherical coordinate angles defining the unit vector perpendicular to the fault plane (pointing upward)
    //                 in the geographic reference system: S = (X,Y,Z) = (E,N,Up)
    // phi : azimuthal angle in interval [0, 2 PI), measured anticlockwise from the X axis (East direction) in reference system S
    // theta: colatitude or polar angle in interval [0, PI/2], measured downward from the zenith (upward direction)
    //  Write functions relating trend and rake
    // The polar angle (or colatitude) theta is defined by the dip of the fault plane in radians:
    const coordinates = new _types__WEBPACK_IMPORTED_MODULE_0__.SphericalCoords;
    coordinates.theta = (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(dip);
    // This function calculates the azimuth phi such that the right-handed local coordinate system in polar coordinates is located in the upper hemisphere.
    //      In other words, the radial unit vector is in the upper hemisphere.
    // The right-handed local reference system is specified by three unit vectors defined in the increasing radial, polar, and azimuthal directions (r, theta, and phi):
    //      The azimuthal angle phi is chosen in the direction of the fault dip (note that phi is different from the azimuth of the fault plane measured in the field) 
    //      The unit vector e_theta is parallel to the dip of the fault plane
    //      The unit vector e_phi is is parallel to the strike of the fault plane, and is oriented such that e_theta x e_phi = e_r (where x is the cross porduct )
    //      
    // The following 'if structure' calculates phi from the strike and dip direction of the fault plane:
    if (dip === 90) {
        // The fault plane is vertical and the dip direction is not defined
        if (strike <= 180) {
            // phi is in interval [0,PI]
            coordinates.phi = Math.PI - (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(strike);
        }
        else {
            // fault strike is in interval (PI,2 PI) and phi is in interval (PI,2 PI)
            coordinates.phi = 3 * Math.PI - (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(strike);
        }
    }
    else if (strike === 0) { // The fault plane is not vertical and the dip direction is defined
        if (dipDirection === 0 /* Direction.E */) {
            coordinates.phi = 0;
        }
        else if (dipDirection === 1 /* Direction.W */) {
            coordinates.phi = Math.PI;
        }
        else {
            throw new Error(`dip direction is wrong. Should be E or W`);
        }
    }
    else if (strike < 90) {
        if ((dipDirection === 3 /* Direction.S */) || (dipDirection === 0 /* Direction.E */) || (dipDirection === 5 /* Direction.SE */)) {
            // strike + coordinates.phi = 2Pi
            coordinates.phi = 2 * Math.PI - (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(strike);
        }
        else if ((dipDirection === 2 /* Direction.N */) || (dipDirection === 1 /* Direction.W */) || (dipDirection === 7 /* Direction.NW */)) {
            // strike + coordinates.phi = Pi
            coordinates.phi = Math.PI - (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(strike);
        }
        else {
            throw new Error(`dip direction is wrong. Should be N, S, E, W, SE or NW`);
        }
    }
    else if (strike === 90) {
        if (dipDirection === 3 /* Direction.S */) {
            coordinates.phi = 3 * Math.PI / 2;
        }
        else if (dipDirection === 2 /* Direction.N */) {
            coordinates.phi = Math.PI / 2;
        }
        else {
            throw new Error(`dip direction is wrong. Should be N or S`);
        }
    }
    else if (strike < 180) {
        if ((dipDirection === 3 /* Direction.S */) || (dipDirection === 1 /* Direction.W */) || (dipDirection === 6 /* Direction.SW */)) {
            // strike + coordinates.phi = 2Pi
            coordinates.phi = 2 * Math.PI - (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(strike);
        }
        else if ((dipDirection === 2 /* Direction.N */) || (dipDirection === 0 /* Direction.E */) || (dipDirection === 4 /* Direction.NE */)) {
            // strike + coordinates.phi = Pi
            coordinates.phi = Math.PI - (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(strike);
        }
        else {
            throw new Error(`dip direction is wrong. Should be N, S, E, W, SE or NW`);
        }
    }
    else if (strike === 180) {
        if (dipDirection === 1 /* Direction.W */) {
            coordinates.phi = Math.PI;
        }
        else if (dipDirection === 0 /* Direction.E */) {
            coordinates.phi = 0;
        }
        else {
            throw new Error(`dip direction is wrong. Should be E or W`);
        }
    }
    else if (strike < 270) {
        if ((dipDirection === 2 /* Direction.N */) || (dipDirection === 1 /* Direction.W */) || (dipDirection === 7 /* Direction.NW */)) {
            // strike + coordinates.phi = 2Pi
            coordinates.phi = 2 * Math.PI - (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(strike);
        }
        else if ((dipDirection === 3 /* Direction.S */) || (dipDirection === 0 /* Direction.E */) || (dipDirection === 5 /* Direction.SE */)) {
            // strike + coordinates.phi = 3Pi
            coordinates.phi = 3 * Math.PI - (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(strike);
        }
        else {
            throw new Error(`dip direction is wrong. Should be N, S, E, W, NW or SE`);
        }
    }
    else if (strike === 270) {
        if (dipDirection === 3 /* Direction.S */) {
            coordinates.phi = 3 * Math.PI / 2;
        }
        else if (dipDirection === 2 /* Direction.N */) {
            coordinates.phi = Math.PI / 2;
        }
        else {
            throw new Error(`dip direction is wrong. Should be N or S`);
        }
    }
    else if (strike < 360) {
        if ((dipDirection === 2 /* Direction.N */) || (dipDirection === 0 /* Direction.E */) || (dipDirection === 4 /* Direction.NE */)) {
            // strike + coordinates.phi = 2Pi
            coordinates.phi = 2 * Math.PI - (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(strike);
        }
        else if ((dipDirection === 3 /* Direction.S */) || (dipDirection === 1 /* Direction.W */) || (dipDirection === 6 /* Direction.SW */)) {
            // strike + coordinates.phi = 3Pi
            coordinates.phi = 3 * Math.PI - (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(strike);
        }
        else {
            throw new Error(`dip direction is wrong. Should be N, S, E, W, NE or SW`);
        }
    }
    else if (strike === 360) {
        if (dipDirection === 0 /* Direction.E */) {
            coordinates.phi = 0;
        }
        else if (dipDirection === 1 /* Direction.W */) {
            coordinates.phi = Math.PI;
        }
        else {
            throw new Error(`dip direction is wrong. Should be E or W`);
        }
    }
    else {
        throw new Error(`Strike is wrong. Should be in interval [0,360]`);
    }
    // The fault plane is defined by angles (phi, theta) in spherical coordinates.
    // normal: unit vector normal to the fault plane (pointing upward) defined in the geographic reference system: S = (X,Y,Z)
    return (0,_types__WEBPACK_IMPORTED_MODULE_0__.spherical2unitVectorCartesian)(coordinates);
}


/***/ }),

/***/ "./lib/utils/fromDipAzimToNormal.ts":
/*!******************************************!*\
  !*** ./lib/utils/fromDipAzimToNormal.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromDipTrendToNormal": () => (/* binding */ fromDipTrendToNormal)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./lib/types/index.ts");

/**
 * @param parameters
 */
function fromDipTrendToNormal({ dipAngle, dipAzimuth, }) {
    const delta = (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(dipAngle);
    const alpha = (0,_types__WEBPACK_IMPORTED_MODULE_0__.deg2rad)(dipAzimuth);
    return (0,_types__WEBPACK_IMPORTED_MODULE_0__.normalizeVector)([
        Math.sin(delta) * Math.sin(alpha),
        Math.sin(delta) * Math.cos(alpha),
        Math.cos(delta)
    ]);
}


/***/ }),

/***/ "./lib/utils/index.ts":
/*!****************************!*\
  !*** ./lib/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompactionShearBandsHelper": () => (/* reexport safe */ _CompactionShearBandsHelper__WEBPACK_IMPORTED_MODULE_3__.CompactionShearBandsHelper),
/* harmony export */   "ConjugatePlanesHelper": () => (/* reexport safe */ _ConjugatePlanesHelper__WEBPACK_IMPORTED_MODULE_2__.ConjugatePlanesHelper),
/* harmony export */   "Direction": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.Direction),
/* harmony export */   "FaultHelper": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.FaultHelper),
/* harmony export */   "TypeOfMovement": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.TypeOfMovement),
/* harmony export */   "directionExists": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.directionExists),
/* harmony export */   "dirs": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.dirs),
/* harmony export */   "faultParams": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.faultParams),
/* harmony export */   "fromAnglesToNormal": () => (/* reexport safe */ _fromAnglesToNormal__WEBPACK_IMPORTED_MODULE_5__.fromAnglesToNormal),
/* harmony export */   "fromDipTrendToNormal": () => (/* reexport safe */ _fromDipAzimToNormal__WEBPACK_IMPORTED_MODULE_6__.fromDipTrendToNormal),
/* harmony export */   "getDirectionFromString": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.getDirectionFromString),
/* harmony export */   "getTypeOfMovementFromString": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.getTypeOfMovementFromString),
/* harmony export */   "isDefined": () => (/* reexport safe */ _numberUtils__WEBPACK_IMPORTED_MODULE_4__.isDefined),
/* harmony export */   "isGeographicDirection": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.isGeographicDirection),
/* harmony export */   "isNumber": () => (/* reexport safe */ _numberUtils__WEBPACK_IMPORTED_MODULE_4__.isNumber),
/* harmony export */   "isTypeOfMovement": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.isTypeOfMovement),
/* harmony export */   "mvts": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.mvts),
/* harmony export */   "sensOfMovementExists": () => (/* reexport safe */ _FaultHelper__WEBPACK_IMPORTED_MODULE_0__.sensOfMovementExists),
/* harmony export */   "toFloat": () => (/* reexport safe */ _numberUtils__WEBPACK_IMPORTED_MODULE_4__.toFloat),
/* harmony export */   "toInt": () => (/* reexport safe */ _numberUtils__WEBPACK_IMPORTED_MODULE_4__.toInt),
/* harmony export */   "trimAll": () => (/* reexport safe */ _trimAlls__WEBPACK_IMPORTED_MODULE_1__.trimAll)
/* harmony export */ });
/* harmony import */ var _FaultHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FaultHelper */ "./lib/utils/FaultHelper.ts");
/* harmony import */ var _trimAlls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trimAlls */ "./lib/utils/trimAlls.ts");
/* harmony import */ var _ConjugatePlanesHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConjugatePlanesHelper */ "./lib/utils/ConjugatePlanesHelper.ts");
/* harmony import */ var _CompactionShearBandsHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CompactionShearBandsHelper */ "./lib/utils/CompactionShearBandsHelper.ts");
/* harmony import */ var _numberUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./numberUtils */ "./lib/utils/numberUtils.ts");
/* harmony import */ var _fromAnglesToNormal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fromAnglesToNormal */ "./lib/utils/fromAnglesToNormal.ts");
/* harmony import */ var _fromDipAzimToNormal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fromDipAzimToNormal */ "./lib/utils/fromDipAzimToNormal.ts");









/***/ }),

/***/ "./lib/utils/numberUtils.ts":
/*!**********************************!*\
  !*** ./lib/utils/numberUtils.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDefined": () => (/* binding */ isDefined),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "toFloat": () => (/* binding */ toFloat),
/* harmony export */   "toInt": () => (/* binding */ toInt)
/* harmony export */ });
/**
 * @example
 * ```ts
 * const ok1 = isNumber(12.2)
 * const ok2 = isNumber("toto")
 * ```
 */
const isNumber = (a) => {
    const n1 = Number.parseFloat(a);
    const n2 = Number.parseInt(a);
    return !Number.isNaN(n1) || !Number.isNaN(n2);
};
const isDefined = (a) => {
    if (typeof a === 'string' && a.length !== 0) {
        return true;
    }
    return isNumber(a);
};
const toInt = (a) => Number.parseInt(a);
const toFloat = (a) => Number.parseFloat(a);


/***/ }),

/***/ "./lib/utils/trimAlls.ts":
/*!*******************************!*\
  !*** ./lib/utils/trimAlls.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trimAll": () => (/* binding */ trimAll)
/* harmony export */ });
function trimAll(s) {
    return s
        .replace(/\s+/g, ' ')
        .replace(/^\s+|\s+$/, '')
        .replace('\t', ' ')
        .trimEnd();
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompactionBand": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.CompactionBand),
/* harmony export */   "CompactionShearBandsHelper": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.CompactionShearBandsHelper),
/* harmony export */   "ConjugateCompactionalShearBands": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ConjugateCompactionalShearBands),
/* harmony export */   "ConjugateDilatantShearBands": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ConjugateDilatantShearBands),
/* harmony export */   "ConjugateFaults": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ConjugateFaults),
/* harmony export */   "ConjugatePlanesHelper": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ConjugatePlanesHelper),
/* harmony export */   "CrystalFibersInVein": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.CrystalFibersInVein),
/* harmony export */   "Curve3D": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.Curve3D),
/* harmony export */   "Data": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.Data),
/* harmony export */   "DataDescription": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.DataDescription),
/* harmony export */   "DataFactory": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.DataFactory),
/* harmony export */   "DilationBand": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.DilationBand),
/* harmony export */   "Direction": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.Direction),
/* harmony export */   "Domain2D": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.Domain2D),
/* harmony export */   "Domain3D": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.Domain3D),
/* harmony export */   "EquipotentialCurve": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.EquipotentialCurve),
/* harmony export */   "ExtensionFracture": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ExtensionFracture),
/* harmony export */   "FaultHelper": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.FaultHelper),
/* harmony export */   "FractureStrategy": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.FractureStrategy),
/* harmony export */   "FullParameterSpace": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.FullParameterSpace),
/* harmony export */   "IntegralCurve": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.IntegralCurve),
/* harmony export */   "InverseMethod": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.InverseMethod),
/* harmony export */   "MasterStress": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.MasterStress),
/* harmony export */   "MohrCoulombCurve": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.MohrCoulombCurve),
/* harmony export */   "MonteCarlo": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.MonteCarlo),
/* harmony export */   "NeoformedStriatedPlane": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.NeoformedStriatedPlane),
/* harmony export */   "ParameterSpace": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.ParameterSpace),
/* harmony export */   "PoleCoords": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.PoleCoords),
/* harmony export */   "SearchMethodFactory": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.SearchMethodFactory),
/* harmony export */   "SphericalCoords": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.SphericalCoords),
/* harmony export */   "StressTensor": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.StressTensor),
/* harmony export */   "StriatedCompactionalShearBand": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.StriatedCompactionalShearBand),
/* harmony export */   "StriatedDilatantShearBand": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.StriatedDilatantShearBand),
/* harmony export */   "StriatedPlaneKin": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.StriatedPlaneKin),
/* harmony export */   "StriatedPlaneProblemType": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.StriatedPlaneProblemType),
/* harmony export */   "StyloliteInterface": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.StyloliteInterface),
/* harmony export */   "StyloliteTeeth": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.StyloliteTeeth),
/* harmony export */   "TypeOfMovement": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.TypeOfMovement),
/* harmony export */   "add_Vectors": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.add_Vectors),
/* harmony export */   "angularDifStriations": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.angularDifStriations),
/* harmony export */   "arcCircle": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.arcCircle),
/* harmony export */   "cloneMatrix3x3": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.cloneMatrix3x3),
/* harmony export */   "cloneMisfitCriteriunSolution": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.cloneMisfitCriteriunSolution),
/* harmony export */   "constant_x_Vector": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.constant_x_Vector),
/* harmony export */   "createDataArgument": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.createDataArgument),
/* harmony export */   "createDataStatus": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.createDataStatus),
/* harmony export */   "createDefaultSolution": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.createDefaultSolution),
/* harmony export */   "createNodalPlane": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.createNodalPlane),
/* harmony export */   "createPlane": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.createPlane),
/* harmony export */   "createRuptureFrictionAngles": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.createRuptureFrictionAngles),
/* harmony export */   "createSigma1_nPlaneAngle": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.createSigma1_nPlaneAngle),
/* harmony export */   "createStriation": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.createStriation),
/* harmony export */   "crossProduct": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.crossProduct),
/* harmony export */   "decodeCSV": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.decodeCSV),
/* harmony export */   "deg2rad": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.deg2rad),
/* harmony export */   "directionExists": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.directionExists),
/* harmony export */   "dirs": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.dirs),
/* harmony export */   "displayMatrix3x3": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.displayMatrix3x3),
/* harmony export */   "faultParams": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.faultParams),
/* harmony export */   "faultStressComponents": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.faultStressComponents),
/* harmony export */   "fromAnglesToNormal": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.fromAnglesToNormal),
/* harmony export */   "fromDipTrendToNormal": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.fromDipTrendToNormal),
/* harmony export */   "getDirectionFromString": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.getDirectionFromString),
/* harmony export */   "getDomain2D": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.getDomain2D),
/* harmony export */   "getDomain3D": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.getDomain3D),
/* harmony export */   "getTypeOfMovementFromString": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.getTypeOfMovementFromString),
/* harmony export */   "hasOwn": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.hasOwn),
/* harmony export */   "isDefined": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.isDefined),
/* harmony export */   "isGeographicDirection": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.isGeographicDirection),
/* harmony export */   "isNumber": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.isNumber),
/* harmony export */   "isTypeOfMovement": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.isTypeOfMovement),
/* harmony export */   "lineSphericalCoords": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.lineSphericalCoords),
/* harmony export */   "minRotAngleRotationTensor": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.minRotAngleRotationTensor),
/* harmony export */   "mohrCircleLine": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.mohrCircleLine),
/* harmony export */   "mohrCirclePoint": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.mohrCirclePoint),
/* harmony export */   "multiplyTensors": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.multiplyTensors),
/* harmony export */   "mvts": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.mvts),
/* harmony export */   "newMatrix3x3": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3),
/* harmony export */   "newMatrix3x3Identity": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.newMatrix3x3Identity),
/* harmony export */   "newPoint3D": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.newPoint3D),
/* harmony export */   "newVector3D": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.newVector3D),
/* harmony export */   "normalVector": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.normalVector),
/* harmony export */   "normalizeVector": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.normalizeVector),
/* harmony export */   "normalizedCrossProduct": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.normalizedCrossProduct),
/* harmony export */   "properRotationTensor": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.properRotationTensor),
/* harmony export */   "rad2deg": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.rad2deg),
/* harmony export */   "rotationParamsFromRotTensor": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.rotationParamsFromRotTensor),
/* harmony export */   "rotationTensor_Sa_Sb": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.rotationTensor_Sa_Sb),
/* harmony export */   "scalarProduct": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.scalarProduct),
/* harmony export */   "scalarProductUnitVectors": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.scalarProductUnitVectors),
/* harmony export */   "sensOfMovementExists": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.sensOfMovementExists),
/* harmony export */   "setValueInUnitInterval": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.setValueInUnitInterval),
/* harmony export */   "signedAngularDifStriations": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.signedAngularDifStriations),
/* harmony export */   "spherical2unitVectorCartesian": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.spherical2unitVectorCartesian),
/* harmony export */   "stressTensorDelta": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.stressTensorDelta),
/* harmony export */   "stressTensorPrincipalAxes": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.stressTensorPrincipalAxes),
/* harmony export */   "tensor_x_Vector": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.tensor_x_Vector),
/* harmony export */   "toFloat": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.toFloat),
/* harmony export */   "toInt": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.toInt),
/* harmony export */   "transposeTensor": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.transposeTensor),
/* harmony export */   "trend2phi": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.trend2phi),
/* harmony export */   "trendPlunge2unitAxis": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.trendPlunge2unitAxis),
/* harmony export */   "trimAll": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.trimAll),
/* harmony export */   "unitVectorCartesian2Spherical": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.unitVectorCartesian2Spherical),
/* harmony export */   "vectorMagnitude": () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.vectorMagnitude)
/* harmony export */ });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./lib/index.ts");


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=stress.js.map