import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { ethers } from 'ethers'

import { pinFileToIPFS, pinJSONToIPFS } from '../libs/pinata'
import { useAppContext } from '../contexts/AppContext'
import { HeaderObject, MetaData } from '../interfaces'
import { useFormInputs } from '../hooks/form-hook'
import { Button, ImagePicker, Input } from './'

declare let window: any
let metamask: any

if(typeof window !== 'undefined') metamask = window.ethereum

const initialState = { name: '', description: '', collection: '' }
const contractAddress = ''
const contractABI = ''

const createPinataRequestHeaders = (headers: Array<HeaderObject>) => {
    const requestHeaders: HeadersInit = new Headers()
    headers.forEach((header: any) => {
        requestHeaders.append(header.key, header.value)
    })
}

const AddNFT:React.FC = () => {
    const { handleUnclicked } = useAppContext()
    const { inputs, bind } = useFormInputs(initialState)
    const [previewURL, setPreviewURL] = useState<any>(null)
    const [image, setImage] = useState<File | null>(null)
    const { name, description, collection } = inputs

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

    const mint = async(e: FormEvent) => {
        e.preventDefault()
        
        if(!name || !description || !collection) return alert('Please fill all fields!')
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
                // const contract = new ethers.Contract(contractAddress, contractABI, signer)
                // const txn = await contract
                // const res = await TextEncoder.wait()
            }
        } catch (error) {
            
        }
        setImage(null); setPreviewURL(null)
    }

  return (
    <div className={style.backdrop}>
        <div className={style.container}>
            <div className='flex items-center justify-between mt-4 mb-8 px-3'>
                <p className='text-xl'>Add NFT</p>
                <button onClick={() => handleUnclicked('add')}>
                    <FiX />
                </button>
            </div>
            <form onSubmit={mint} className={style.form}>
                <Input label='Name' type='text' name='name' {...bind} />
                <Input label='Description' type='textarea' name='description' {...bind} />
                <Input label='Collection' type='input' name='collection' {...bind} />
                <ImagePicker name='image' previewURL={previewURL} onChange={handleImageSelect} onClick={() => setPreviewURL(null)} />
                <Button type='submit' label='Create NFT' />
            </form>
        </div>
    </div>
  )
}

const style = {
    backdrop: `w-screen h-screen fixed top-0 left-0 bg-half-transparent backdrop-blur-sm`,
    container: `w-400 h-full bg-white float-right`,
    form: `w-full flex flex-col gap-4 px-6`
}

export default AddNFT