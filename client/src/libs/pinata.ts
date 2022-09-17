import axios from 'axios'

import { MetaData } from "../interfaces"

const pinata_key = import.meta.env.VITE_PINATA_KEY
const pinata_secret = import.meta.env.VITE_PINATA_SECRET

export const pinJSONToIPFS = async(json: MetaData) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`

    return axios
    .post(url, json, {
        headers: {
            'Content-Type': 'application/json',
            pinata_api_key: <string> pinata_key,
            pinata_secret_api_key: <string> pinata_secret
        },
    })
    .then((response) => response.data.IpfsHash)
    .catch((err) => console.error(err))
}

export const pinFileToIPFS = async(file: File, pinataMetaData: any) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

    let formData = new FormData()
    formData.append('file', file)
    formData.append('pinataMetaData', JSON.stringify(pinataMetaData))

    return axios
    .post(url, formData, {
        maxBodyLength: Infinity,
        headers: {
            pinata_api_key: <string> pinata_key,
            pinata_secret_api_key: <string> pinata_secret
        },
    })
    .then((response) => response.data.IpfsHash)
    .catch((err) => console.error(err))
}