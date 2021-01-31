export const routes = [
  {
    path: '/api/getDirectory',
    name: 'getDirectory',
    method: 'GET',
    controller: () => import('../models/getDirectory/index.js')
  }
]
