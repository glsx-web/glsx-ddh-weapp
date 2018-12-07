import {
  GlAxios
} from 'glsx-vue-common'

const path = '/admin-ddh-weapp/channelManage'
const __sChannelList = `${path}/listWeappChannelByPage`
const __sChannelListAllModule = `${path}/listAllWeappModule`
const __sChannelModuleById = `${path}/listAllWeappChannelModuleByChannelId`
const __sUpdateChannel = `${path}/updateWeappChannelByCondition`
const __sDeleteChannel = `${path}/deleteWeappChannel`

const channelList = {
    p: [__sChannelList],
    req: params => GlAxios.get(__sChannelList, { params })
}

const channelListAllModule = {
    p: [__sChannelListAllModule],
    req: params => GlAxios.get(__sChannelListAllModule, { params })
}

const channelModuleById = {
    p: [__sChannelModuleById],
    req: params => GlAxios.get(__sChannelModuleById, { params })
}

const updateChannel = {
    p: [__sUpdateChannel],
    req: params => GlAxios.post(__sUpdateChannel, params )
}

const deleteChannel = {
    p: [__sDeleteChannel],
    req: params => GlAxios.get(__sDeleteChannel, { params })
}

export {
    channelList,
    channelListAllModule,
    channelModuleById,
    updateChannel,
    deleteChannel
}