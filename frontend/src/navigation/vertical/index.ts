// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'HOME',
      icon: 'tabler:messages',
      path: '/home',
      action: 'read',
      subject: 'acl-page'
    },
    {
      title: 'User',
      icon: 'tabler:user',
      path: '/user',
      action: 'read',
      subject: 'acl-page'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      icon: 'tabler:shield',
      title: 'Access Control'
    },

    {
      path: '/login',
      icon: 'tabler:shield',
      title: 'Login'
    },
    {
      title: 'Register',
      children: [
        {
          openInNewTab: true,
          title: 'Register v1',
          path: '/pages/auth/register-v1'
        },
        {
          openInNewTab: true,
          title: 'Register v2',
          path: '/pages/auth/register-v2'
        },
        {
          openInNewTab: true,
          title: 'Register Multi-Steps',
          path: '/pages/auth/register-multi-steps'
        }
      ]
    }
  ]
}

export default navigation
