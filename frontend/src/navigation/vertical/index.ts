// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'HOME',
      icon: 'tabler:messages',
      path: '/home'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      icon: 'tabler:shield',
      title: 'Access Control'
    },
    {
      title: 'User',
      icon: 'tabler:user',
      path: '/user',
      action: 'read',
      subject: 'acl-page'
    }
  ]
}

export default navigation
