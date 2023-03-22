import axios from "axios";
import { API_HOST_PREFIX, onGlobalError, onGlobalSuccess } from "./serviceHelpers";
const endpoint = { siteReferenceUrl: `${API_HOST_PREFIX}/api/sitereferences` };

const getSummary = () => {
    const config = {
        method: "GET",
        url: `${endpoint.siteReferenceUrl}/summary`,
        withCredentials: true,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    }
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const siteReferenceService = { getSummary };

export default siteReferenceService;
