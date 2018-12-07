const channelStructrue = {
  'id': Number,
  'createdBy': '',
  'createdDate': '',
  'updatedBy': '',
  'updatedDate': '',
  'deletedFlag': '',
  'channelId': '',
  'moduleId': Number,
  'moduleSort': Number,
  'moduleList': []
}

const channelViewColumn = [{
  label: '渠道编号',
  prop: 'merchantId'
}, {
  label: '渠道名称',
  prop: 'channelName'
}, {
  label: '创建时间',
  prop: 'createdData',
  formatter: (cellValue) => {
    if (cellValue.createdDate) {
      return new Date(cellValue.createdDate).format('yyyy-mm-dd')
    }
  }
}, {
  label: '修改时间',
  prop: 'updatedDate',
  formatter: (cellValue) => {
    if (cellValue.updatedDate) {
      return new Date(cellValue.updatedDate).format('yyyy-mm-dd')
    }
  }
}, {
  label: '操作人',
  prop: 'createdBy'
}]

export {
  channelStructrue,
  channelViewColumn
}
