import { Outlet } from '@remix-run/react'
import Header from '~/ui/header'

export default () => (
  <>
    <Header />
    <Outlet />
  </>
)
