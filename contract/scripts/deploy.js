const hre = require('hardhat')

const main = async() => {
    const [owner] = await hre.ethers.getSigners()
    const factory = await hre.ethers.getContractFactory('Contract')
    const contract = await factory.deploy()
    await contract.deployed()

    console.log('contract deployed to', contract.address)
    console.log('coontract owner address', owner.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })