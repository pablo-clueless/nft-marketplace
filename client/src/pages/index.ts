import { lazy } from 'react'

const Community = lazy(() => import('./Community'))
const Create = lazy(() => import('./Create'))
const Explore = lazy(() => import('./Explore'))
const Home = lazy(() => import('./Home'))
const NFT = lazy(() => import('./NFT'))
const Profile = lazy(() => import('./Profile'))
const Resources = lazy(() => import('./Resources'))
const Settings = lazy(() => import('./Settings'))
const Signup = lazy(() => import('./Signup'))

export {Community, Create, Explore, Home, NFT, Profile, Resources, Settings, Signup}