// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
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
    }
  ]
}

export default navigation
