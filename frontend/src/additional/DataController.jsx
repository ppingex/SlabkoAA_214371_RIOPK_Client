import axios from "axios";

const POST_HEADERS = {
    'Content-Type': '*/*'
}

const PATCH_HEADERS = {
    'Content-Type': '*/*'
}

async function fetchData(url, callbacks = []) {
    try {
        const response = await axios.get(url);
        const data = response.data;
        callbacks.forEach((callback) => callback(data));
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

async function handlePatch(url, data) {
    try {
        const result = await axios.patch(url, data, { PATCH_HEADERS })
        return result;
    }
    catch (error) {
        return error;
    }
}

async function handlePost(url, data) {
    try {
        const result = await axios.post(url, data, { POST_HEADERS })
        return result;
    }
    catch (error) {
        return error;
    }
}

async function handleDelete(url, data ) {
    try {
        const result = await axios.delete(url)
        return result;
    }
    catch (error) {
        return error;
    }
}

export default { fetchData, handleDelete, handlePatch, handlePost }