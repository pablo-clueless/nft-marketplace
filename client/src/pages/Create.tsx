import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ethers } from 'ethers'
import {toast } from 'react-toastify'

import { pinFileToIPFS, pinJSONToIPFS } from '../libs/pinata'
import { Button, ImagePicker, Input } from '../components'
import { useAppSelector, useFormInputs, useHttpRequest } from '../hooks'
import { HeaderObject, MetaData } from '../interfaces'
import abi from '../contract/Contract.json'

declare let window: any
let metamask: any

if(typeof window !== 'undefined') metamask = window.ethereum

const initialState = { name: '', description: '', collection: '', price: 0 }
const contractAddress = '0x0b70CfC1EF9b95407a2292bc52636D41470B5901'
const contractABI = abi.abi
const url = import.meta.env.VITE_URL

const createPinataRequestHeaders = (headers: Array<HeaderObject>) => {
    const requestHeaders: HeadersInit = new Headers()
    headers.forEach((header: any) => {
        requestHeaders.append(header.key, header.value)
    })
}

const Create:React.FC = () => {
    const { inputs, bind } = useFormInputs(initialState)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [previewURL, setPreviewURL] = useState<any>(null)
    const [image, setImage] = useState<File | null>(null)
    const { name, description, collection, price } = inputs
    const { clearErr, error, fetcher, loading } = useHttpRequest()
    const { user } = useAppSelector(store => store.user)

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
        
        if(!user) return toast.error('Please login to create an NFT!')
        if(!name || !description || !collection || !price) return toast.error('Please fill all fields!')
        if(!image) return toast.error('Please add an image')
        
        try {
            setIsLoading(true)
            if(window.ethereum) {
                const pinataMetaData = { name: `${name} - ${description}`}
                const ipfsImageHash = await pinFileToIPFS(image, pinataMetaData)
                toast('Pining file to IPFS')
                if(!ipfsImageHash) return toast.error('Unable to pin file to IPFS')
                const imageMetaData: MetaData = {name, description, image: `ipfs://${ipfsImageHash}`}
                const ipfsJsonHash = await pinJSONToIPFS(imageMetaData)
                toast('Pining json to IPFS')
                if(!ipfsJsonHash) return toast.error('Unable to pin json to IPFS')

                if(ipfsImageHash && ipfsJsonHash) {
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    const signer = provider.getSigner()
                    toast('Getting contract')
                    let contract = new ethers.Contract(contractAddress, contractABI, signer)
                    const itemPrice = ethers.utils.parseUnits(price, 'ether')
                    let listingPrice = await contract.getListPrice()
                    listingPrice = listingPrice.toString()
                    let transaction = await contract.createNFT(`ipfs://${ipfsJsonHash}`,  itemPrice, {value: listingPrice})
                    console.log(transaction)
                    const response = await transaction.wait()
                    console.log(response)
                    
                    const payload = {name, description, collection, file: ipfsJsonHash, price, creator: user?._id }
                    const headers = { 'Content-Type': 'application/json' }
                    toast('Saving data to server')
                    const data = await fetcher(`${url}/nft/add`, 'POST', JSON.stringify(payload), headers)
                    console.log(data)
                    setIsLoading(false)
                } else {
                    console.log('image not uploaded')
                    setIsLoading(false)
                }
            } else {
                alert('You need to have MetaMask installed')
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
        setImage(null); setPreviewURL(null)
        setIsLoading(false)
    }

  return (
    <div className={style.container}>
        <form onSubmit={listNFT} className={style.form}>
            <Input label='Name' type='text' name='name' {...bind} placeholder='#001' />
            <Input label='Description' type='textarea' name='description' {...bind} placeholder='NFTs are digital assets' />
            <Input label='Collection' type='text' name='collection' {...bind} placeholder='Test Collection' />
            <Input label='Price' type='number' name='price' {...bind} placeholder='0.01' min={0.02} />
            <ImagePicker name='image' previewURL={previewURL} onChange={handleImageSelect} onClick={() => setPreviewURL(null)} />
            <Button type='submit' label='Mint' disabled={isLoading} />
        </form>
    </div>
  )
}

const style = {
    container: `grid place-items-center`,
    wrapper: ``,
    form: `w-4/5 md:w-500 flex flex-col gap-3`
}

export default Create