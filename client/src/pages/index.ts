import { lazy } from 'react'

const Home = lazy(() => import('./Home'))
const Signup = lazy(() => import('./Signup'))

export { Home, Signup }