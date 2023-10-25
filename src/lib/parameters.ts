import { Data } from "../../../stress/src/lib";
import { CostDomain } from "./CostDomain";
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
    setData: (data: Data[]) => {
        parameters.model.addData(data)
    }
}
