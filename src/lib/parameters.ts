import { Data } from "../../../stress/src/lib";
import { CostDomain } from "./CostDomain2D";
import { CostDomain3D } from "./CostDomain3D";
import { CostDomains } from "./CostDomains";
import { Model } from "./Model";

const model = new Model

/**
 * Global parameters
 */
export const parameters = {
    model,
    domain: new CostDomain({div: 'domainDiv', engine: model.engine}),
    domains: new CostDomains({div: 'domainsDiv', engine: model.engine}),
    domain3D: new CostDomain3D({div: 'domain3DDiv', engine: model.engine, n: 20}),
    setData: (data: Data[]) => {
        parameters.model.addData(data)
    }
}
