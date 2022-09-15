import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ethers } from 'ethers'

import { pinFileToIPFS, pinJSONToIPFS } from '../libs/pinata'
import { HeaderObject, MetaData } from '../interfaces'
import { useFormInputs } from '../hooks/form-hook'
import { Button, ImagePicker, Input } from '../components'

declare let window: any
let metamask: any

if(typeof window !== 'undefined') metamask = window.ethereum

const initialState = { name: '', description: '', collection: '', price: 0 }
const contractAddress = ''
const contractABI = ''

const createPinataRequestHeaders = (headers: Array<HeaderObject>) => {
    const requestHeaders: HeadersInit = new Headers()
    headers.forEach((header: any) => {
        requestHeaders.append(header.key, header.value)
    })
}

const Create:React.FC = () => {
    const { inputs, bind } = useFormInputs(initialState)
    const [previewURL, setPreviewURL] = useState<any>(null)
    const [image, setImage] = useState<File | null>(null)
    const { name, description, collection, price } = inputs

    const handleImageSelect  = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return
        let pickedFile
        pickedFile = e.currentTarget.files[0]
        const { type } = pickedFile
        if(type === 'image/png' || type ==='image/jpg' || type ==='image/jpeg' || type === 'image/svg' || type === 'image/gif') {
            const fileReader = new FileReader()
            fileReader.onload = () => setPreviewURL(fileReader.result)
            fileReader.readAsDataURL(pickedFile)
            setImage(pickedFile)
        } else {
            alert('Invalid file type!')
        }
    }

    const listNFT = async(e: FormEvent) => {
        e.preventDefault()
        
        if(!name || !description || !collection || !price) return alert('Please fill all fields!')
        if(!image) return alert('Please add an image')
        const pinataMetaData = { name: `${name} - ${description}`}
        const ipfsImageHash = await pinFileToIPFS(image, pinataMetaData)
        const imageMetaData: MetaData = {name, description, image: `ipfs://${ipfsImageHash}`}
        const ipfsJsonHash = await pinJSONToIPFS(imageMetaData)

        const payload = {name, description, collection, ipfsJsonHash}

        try {
            if(window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                let contract = new ethers.Contract(contractAddress, contractABI, signer)
                const Itemprice = ethers.utils.parseUnits(price, 'ether')
                let listingPrice = await contract.getListPrice()
                listingPrice = listingPrice.toString()
                let transaction = await contract.createToken(ipfsJsonHash, price, {value: listingPrice})
                const res = await transaction.wait()
            } else {
                alert('You need to have MetaMask installed')
            }
        } catch (error) {
            
        }
        setImage(null); setPreviewURL(null)
    }

  return (
    <div>

    </div>
  )
}

export default Create