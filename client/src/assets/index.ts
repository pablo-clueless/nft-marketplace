import login_bg from './images/login.png'
import nft1 from './images/nft-1.jpeg'
import nft2 from './images/nft-2.png'
import nft3 from './images/nft-3.jpg'
import nft4 from './images/nft-4.png'
import nft5 from './images/nft-5.png'
import nft6 from './images/nft-6.png'

const FOOTER_LINKS = [
    {
        title: 'Page Name',
        links: [
            { title: 'Explore', link: 'explore' },
            { title: 'All NFTs', link: 'all-nfts' },
            { title: 'About', link: 'about' },
        ]
    },
    {
        title: 'My Account',
        links: [
            { title: 'Profile', link: 'profile' },
            { title: 'Favorites', link: 'favorites' },
            { title: 'Watchlist', link: 'watchlist' },
            { title: 'My Collections', link: 'collections' },
            { title: 'Settings', link: 'settings' },
        ]
    },
    {
        title: 'Resources',
        links: [
            { title: 'Platform Status', link: 'status' },
            { title: 'Partners', link: 'partners' },
            { title: 'Taxes', link: 'taxes' },
            { title: 'Newsletter', link: 'newsletter' },
        ]
    },
    {
        title: 'Community',
        links: [
            { title: 'Help Center', link: 'help' },
            { title: 'Token', link: 'token' },
            { title: 'Report Bug', link: 'bugs' },
            { title: 'Suggest Feature', link: 'features' },
            { title: 'Subscribe', link: 'subscribe' },
        ]
    },
]

const NFT_LIST = [
    {
        id: '001',
        name: '#001',
        description: 'NFTs are digital assets you actually own. Mint one today and it could be worth millions tomorrow',
        file: nft1,
        price: 3.5,
        creator: 'pablo_clueless',
        likes: 200
    },
    {
        id: '002',
        name: '#002',
        description: 'NFTs are digital assets you actually own. Mint one today and it could be worth millions tomorrow',
        file: nft2,
        price: 5.0,
        creator: 'pablo_clueless',
        likes: 200
    },
    {
        id: '003',
        name: '#003',
        description: 'NFTs are digital assets you actually own. Mint one today and it could be worth millions tomorrow',
        file: nft3,
        price: 4.8,
        creator: 'pablo_clueless',
        likes: 200
    },
    {
        id: '004',
        name: '#004',
        description: 'NFTs are digital assets you actually own. Mint one today and it could be worth millions tomorrow',
        file: nft4,
        price: 6.7,
        creator: 'pablo_clueless',
        likes: 200
    },
    {
        id: '005',
        name: '#005',
        description: 'NFTs are digital assets you actually own. Mint one today and it could be worth millions tomorrow',
        file: nft5,
        price: 5.9,
        creator: 'pablo_clueless',
        likes: 200
    },
    {
        id: '006',
        name: '#006',
        description: 'NFTs are digital assets you actually own. Mint one today and it could be worth millions tomorrow',
        file: nft6,
        price: 5.9,
        creator: 'pablo_clueless',
        likes: 200
    },
]

export { login_bg, FOOTER_LINKS, NFT_LIST }