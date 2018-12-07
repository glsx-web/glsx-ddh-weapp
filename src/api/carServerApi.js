import {
    GlAxios
} from 'glsx-vue-common'

const path = '/admin-ddh-weapp/carServer'
const __sCarServerList = `${path}/listWeappFunctionModuleByPage`
const __sCarServerUpdate = `${path}/updateWeappFunctionModule`

const carServerList = {
    p: [__sCarServerList],
    req: params => GlAxios.get(__sCarServerUpdate, { params })
}

const carServerUpdate = {
    p: [__sCarServerUpdate],
    req: params => GlAxios.get(__sCarServerUpdate, { params })
}

export {
    carServerList,
    carServerUpdate
}