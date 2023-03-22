import axios from "axios";
import { API_HOST_PREFIX, onGlobalError, onGlobalSuccess } from "./serviceHelpers";
const endpoint = { militaryProfileUrl: `${API_HOST_PREFIX}/api/profiles/military` };

const addProfile = (payload) => {
    const config = {
        method: 'POST',
        url: `${endpoint.militaryProfileUrl}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json"}
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const getProfile = (id) => {
    const config = {
        method: "GET",
        url: `${endpoint.militaryProfileUrl}` + id,
        withCredentials: true,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    }
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const getLists = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `${endpoint.militaryProfileUrl}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    }
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const searchPaginate = (pageIndex, pageSize, query) => {
    const config = {
        method: "GET",
        url: `${endpoint.militaryProfileUrl}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        withCredentials: true,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    }
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const deleteProfile = (id) => {
    const config = {
        method: "DELETE",
        url: `${endpoint.militaryProfileUrl}/` + id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json"}
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const editProfile = (id, payload) => {
    const config = {
        method: "PUT",
        url: `${endpoint.militaryProfileUrl}/` + id,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json"}
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const militaryProfileService = { getProfile, deleteProfile, addProfile, editProfile, getLists, searchPaginate };
export default militaryProfileService;
