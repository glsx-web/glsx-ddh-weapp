<template>
  <div>
    <div class="default">
      <gl-form :inline="true" :model="searchCondition">
        <gl-form-item label="关键字">
           <gl-input v-model="searchCondition.content" class="input-with-select">
              <gl-select v-model="searchCondition.title" slot="prepend" placeholder="全部" >
                <gl-option label="全部" value="keywordAll"></gl-option>
                <gl-option label="渠道编号" value="merchantId"></gl-option>
                <gl-option label="渠道名称" value="channelName"></gl-option>
              </gl-select>
          </gl-input>
        </gl-form-item>
        <gl-form-item>
          <gl-button type="primary" @click="search">搜索</gl-button>
        </gl-form-item>
      </gl-form>
    </div>
    <div class="default m-b10">
      <gl-button class="newButton" type="primary" @click="updateDialog">新增渠道</gl-button>
      <channel-update
        :updateVisible="updateVisible"
        :updateForm="updateParams"
        :allModulelist="allModulelist"
        @updateClose="updateDialogClose">
      </channel-update>
      <gl-table :table="channelData"></gl-table>
      <gl-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10,20,30,40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      ></gl-pagination>
    </div>
  </div>
</template>

<script>
import { channelUpdate } from '@/components/index'
import { channelStructrue, channelViewColumn, fn, treeCheckKeys } from '@/common/common'
import { channelList, channelListAllModule, channelModuleById, updateChannel, deleteChannel } from '@/api/channelApi'
import notice from '@/common/notice'

export default {
  name: 'channel',
  components: {
    channelUpdate
  },
  data() {
    return {
      searchCondition: {
        title: '',
        content: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: 10,
      /* 组件params-start */
      updateVisible: false,
      updateParams: this.$deep_clone(channelStructrue),
      allModulelist: [],
      /* 组件params-end */
      channelData: {
        border: true,
        align: 'center',
        data: [],
        column: channelViewColumn,
        number: {
          label: '序号',
          index: (index) => {
            ++index
            return index < 10 && index > 0 ? '0' + index : index
          }
        },
        console: {
          show: true,
          label: '操作',
          prop: 'channelOptions',
          button: [{
            label: '复制链接',
            type: 'text',
            callback: (index, rows) => {
              const channelInfo = this.channelData.data[index]
              this.$copyText(channelInfo.channelUrl + '?channel={' + channelInfo.id + '}').then((e) => {
                // console.log(e.text)
                notice.okTips('复制链接成功')
              }).catch(() => {
                notice.errorTips('复制链接失败')
              })
            }
          }, {
            label: '编辑',
            type: 'text',
            callback: (index, rows) => {
              this.updateDialog(index)
              // this.updateVisible = true
            }
          }, {
            label: '删除',
            type: 'text',
            callback: (index, rows) => {
              // console.log(rows[index])
              this.deleteChannel(rows[index].id)
            }
          }, {
            label: '操作记录',
            type: 'text',
            callback: (index, rows) => {
              console.log(rows[index])
            }
          }]
        }
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    /* 接口请求-start */
    getParams() {
      const searchTitle = this.searchCondition.title
      return {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        merchantId: searchTitle === 'merchantId' ? this.searchCondition.content : '',
        channelName: searchTitle === 'channelName' ? this.searchCondition.content : ''
      }
    },
    getList() {
      const params = this.getParams()
      channelList.req(params).then(res => {
        this.total = res.total
        this.channelData.data = res.list
      }).catch(err => {
        notice.errorTips(err)
      })
    },
    // getListAllModule() {
    //   channelListAllModule.req().then(res => {
    //     // this.allModule = fn(res, null)
    //   }).catch(err => {
    //     notice.errorTips(err)
    //   })
    // },
    // getModulById(channelId) {
    //   channelModuleById.req({ channelId: channelId }).then(res => {
    //     // this.channelData.data[channelId].moduleList = res
    //     // console.log(this.channelData.data[channelId].moduleList)
    //   }).catch(err => {
    //     notice.errorTips(err)
    //   })
    // },
    updateChannel(params) {
      // console.log(params)
      updateChannel.req(params).then(res => {
        notice.okTips('操作成功')
        this.getList()
        this.updateVisibleChange()
      }).catch(err => {
        notice.errorTips(err)
      })
    },
    deleteChannel(params) {
      deleteChannel.req({ id: params} ).then(res => {
        notice.okTips(res)
        this.getList()
      }).catch(err => {
        notice.errorTips(err)
      })
    },
    /* 接口请求-end */
    search() {
      this.getList()
    },
    handleSizeChange() {
      this.getList()
    },
    handleCurrentChange() {
      this.getList()
    },
    updateVisibleChange() {
      this.updateVisible = !this.updateVisible
      // if(!this.updateVisible) {
      //   this.allModulelist = []
      //   this.updateParams = this.$deep_clone(channelStructrue)
      // }
    },
    updateDialog(index) {
      this.updateParams = this.$deep_clone(index > -1 ? this.channelData.data[index] : channelStructrue)
      // console.log(index)
      // console.log(this.channelData.data[index])
      // console.log(this.updateParams)
      Promise.all([channelListAllModule.req(), index > -1 ? channelModuleById.req({ channelId: this.updateParams.channelId }) : '']).then(res => {
        this.allModulelist = fn(res[0], null)
        // console.log(res[1])
        this.updateParams.moduleList = treeCheckKeys(res[1])
        // console.log(this.updateParams.moduleList)
        this.updateParams.moduleList = index > -1 ? [1,3] : []
        // console.log(this.updateParams)
        if(this.allModulelist && (!index || this.updateParams.moduleList)){
          this.updateVisibleChange()
        }
      })
    },
    updateDialogClose(updateData) {
      updateData ? this.updateChannel(updateData) : this.updateVisibleChange()
    }
  }
}
</script>

<style scoped>
.newButton{
  position: absolute;
  right: 25px;
  top: -63px;
  margin-bottom: 10px;
}
</style>
