<!--  -->
<template>
  <gl-dialog
    :title="title"
    :visible.sync="updateVisible"
    :before-close="handleClose">
    <gl-form :model="updateForm" label-width="120px">
      <gl-form-item label="渠道名称：">
        <gl-input v-model="updateForm.channelName"></gl-input>
      </gl-form-item>
      <gl-form-item label="渠道编号：">
        <gl-input v-model="updateForm.merchantId"></gl-input>
      </gl-form-item>
      <gl-form-item label="渠道地址：">
        <gl-input v-model="updateForm.channelUrl"></gl-input>
        <!-- <gl-input-tree v-model="updateForm.channelUrl"></gl-input-tree> -->
      </gl-form-item>
      <gl-form-item label="模板选择：">
        <gl-tree
          node-key="id"
          v-model="updateForm.moduleList"
          :data="allModulelist"
          :default-checked-keys="updateForm.moduleList"
          :props="props"
          show-checkbox
          @check="moduleChange"
          style="height:180px; overflow-y:auto;"
        >
        </gl-tree>
      </gl-form-item>
    </gl-form>
    <div slot="footer" class="dialog-footer">
      <gl-button type="primary" @click="handleSubmit">提交</gl-button>
      <gl-button @click="handleClose">取消</gl-button>
    </div>
  </gl-dialog>
</template>

<script>
export default {
  name: 'channelUpdate',
  props: {
    updateVisible: Boolean,
    updateForm: Object,
    allModulelist: Array
  },
  watch: {
    updateForm(val) {
      this.title = !val.merchantId ? '新增渠道' : '编辑渠道'
    }
  },
  data() {
    return {
      title: '',
      props: {
        children: 'children',
        label: 'label'
      },
    }
  },
  methods: {
    moduleChange(params, checked) {
      // console.log(checked.checkedKeys)
      this.updateForm.moduleList = checked.checkedKeys
    },
    handleSubmit() {
      // console.log(this.updateForm)
      this.$emit('updateClose', this.updateForm)
    },
    handleClose() {
      this.$emit('updateClose')
    }
  }
}

</script>
<style scoped>
.dialog-footer{
  margin-top: -40px;
}
</style>