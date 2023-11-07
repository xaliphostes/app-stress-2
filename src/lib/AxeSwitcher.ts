
enum AxeEnum {
    R = 1,
    psi = 2,
    theta = 4,
    phi = 8
}

/**
 * Helper to switch for axis in a 4 dim parameters space.
 * When changing the domain axis, it automatically setup the other
 * three parameters (e.g., the other axis and the two other parameters
 * as sliders)
 */
export class AxeSwitcher {
    x = 'R'
    y = 'theta'
    sx = 'psi'
    sy = 'phi'
    private nameIndexEnum: Map<string, AxeEnum> = new Map()
    private axeName: Map<string, string> = new Map()

    constructor() {
        this.nameIndexEnum.set('R', AxeEnum.R)
        this.nameIndexEnum.set('psi', AxeEnum.psi)
        this.nameIndexEnum.set('theta', AxeEnum.theta)
        this.nameIndexEnum.set('phi', AxeEnum.phi)

        this.axeName.set('R', 'R')
        this.axeName.set('psi', 'ψ')
        this.axeName.set('theta', 'θ')
        this.axeName.set('phi', 'φ')
    }

    /**
     * Get the real name (not the greek letter) of the 3rd parameter
     */
    getSx() {
        return this.axeName.get(this.sx)
    }

    /**
     * Get the real name (not the greek letter) of the 4th parameter
     */
    getSy() {
        return this.axeName.get(this.sy)
    }

    /**
     * Set the first parameter of the 2D domain
     */
    setX(name: string): boolean {
        if (this.x === name || this.y === name) {
            return false
        }
        const oldName = this.x
        this.x = name
        this.update(oldName)
        return true
    }

    /**
     * Set the second parameter of the 2D domain
     */
    setY(name: string): boolean {
        if (this.x === name || this.y === name) {
            return false
        }
        const oldName = this.y
        this.y = name
        this.update(oldName)
        return true
    }

    private update(name: string) {
        const haveToChangeSx = this.sx === this.x || this.sx === this.y

        if (haveToChangeSx) {
            this.sx = this.missing(this.x, this.y, this.sy)
        }
        else {
            this.sy = this.missing(this.x, this.y, this.sx)
        }
    }

    private getKey = (axe: AxeEnum) => {
        for (var [key, value] of this.nameIndexEnum) {
            if (value === axe) {
                return key
            }
        }
        return undefined
    }

    private missing(n1: string, n2: string, n3: string) {
        const a = 15 - ((this.nameIndexEnum.get(n1) as AxeEnum) | (this.nameIndexEnum.get(n2) as AxeEnum) | (this.nameIndexEnum.get(n3) as AxeEnum))
        return this.getKey(a)
    }

}
