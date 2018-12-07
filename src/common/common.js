// 公共方法写这里
import { channelStructrue, channelViewColumn } from './channelConst'

function fn(data, pid) {
  var result = []
  var temp = null
  for (var i in data) {
    if (data[i].parentId == pid) {
      data[i].moduleName ? data[i].label = data[i].moduleName : ''
      result.push(data[i])
      temp = fn(data, data[i].id)
      if (temp.length > 0) {
          data[i].children = temp
      }
    }
  }
  return result
}

function treeCheckKeys(data, pid) {
  var result = []
  // console.log(data)
  for(var i in data) {
    if(pid && data[i].parent == pid) {
      result.push(data[i].id)
      treeCheckKeys(data, pid)
    }
    if(!pid){
      result.push(data[i].id)
    }
  }
  return result
}

export {
  channelStructrue,
  channelViewColumn,
  fn,
  treeCheckKeys
}