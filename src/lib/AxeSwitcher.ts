
enum AxeEnum {
    R = 1,
    psi = 2,
    theta = 4,
    phi = 8
}

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

    getSx() {
        return this.axeName.get(this.sx)
    }

    getSy() {
        return this.axeName.get(this.sy)
    }

    setX(name: string): boolean {
        if (this.x === name || this.y === name) {
            return false
        }
        const oldName = this.x
        this.x = name
        this.update(oldName)
        return true
    }

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
