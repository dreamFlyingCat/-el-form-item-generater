<template>
  <div id="app">
    <el-form ref="testForm">
      <el-form-item-generater :forms="projectForms" :models="userLeaveInfo">
        <!-- <template v-slot:test>
          <h1>Here might be a page title</h1>
        </template> -->
      </el-form-item-generater>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userLeaveInfo: {
        name: '',
        leaveTime: '',
        workSummary: '',
        doorState: '',
        workNetwork: '',
        accommodation: '',
        workingResources: '',
        deptCode: '',
        managerCode: '',
      }
    }
  },
  computed: {
       projectForms() {
      return [
        {
          type: 'date',
          label: '离岗日期',
          name: 'leaveTime',
          disabled: this.disabled,
          col: 12,
          required: true,
        },
        {
          slot: true,
          name: 'test'
        },
        {
          type: 'select',
          label: '门禁卡',
          name: 'doorState',
          data: [
            {
              dictValue: '已归还',
              dictKey: 0,
            },
            {
              dictValue: '未归还',
              dictKey: 1,
            },
          ],
          col: 12,
          optionValue: 'dictKey',
          optionLabel: 'dictValue',
          optionKey: 'dictKey',
          required: true,
          bindKey: 'doorState',
        },
        {
          type: 'select',
          label: '工作网络',
          name: 'workNetwork',
          data: [
            {
              dictValue: '已冻结',
              dictKey: 0,
            },
            {
              dictValue: '未冻结',
              dictKey: 1,
            },
          ],
          col: 12,
          optionValue: 'dictKey',
          optionLabel: 'dictValue',
          optionKey: 'dictKey',
        },
        {
          type: 'select',
          label: '住宿',
          name: 'accommodation',
          data: [
            {
              dictValue: '已退宿',
              dictKey: 0,
            },
            {
              dictValue: '未退宿',
              dictKey: 1,
            },
          ],
          col: 12,
          optionValue: 'dictKey',
          optionLabel: 'dictValue',
          optionKey: 'dictKey',
        },
        {
          type: 'select',
          label: '工作资源',
          name: 'workingResources',
          data: [
            {
              dictValue: '已归还',
              dictKey: 0,
            },
            {
              dictValue: '未归还',
              dictKey: 1,
            },
          ],
          col: 12,
          optionValue: 'dictKey',
          optionLabel: 'dictValue',
          optionKey: 'dictKey',
        },
        {
          type: 'textarea',
          label: '任务完成情况及工作总结',
          name: 'workSummary',
          disabled: this.disabled,
          col: 24,
          required: true,
          row: 6,
        },
      ];
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
