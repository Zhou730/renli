<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="data" :props="defaultProps" default-expand-all @node-click="handleNodeClick"
        :expand-on-click-node="false">
        <template v-slot="{ data }">
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <!-- $event 实参 表示类型 -->
              <el-dropdown @command="operateDept($event, data.id)">
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template></el-tree>
      <add-dept :current-node-id="currentNodeId" :show-dialog.sync="showDialog" @updateDepartment="getDepartment" />
      <add-dept ref="addDept" :current-node-id="currentNodeId" :show-dialog.sync="showDialog"
        @updateDepartment="getDepartment" />
    </div>
    </div>
</template>

<script>
import { getDepartment, delDepartment } from '@/api/user'
import { transListToTreeData } from '@/utils'
import addDept from './components/add-dept.vue'
export default {
  components: {
    addDept
  },
  data() {
    return {
      currentNodeId: null, // 存储当前点击的id
      data: [{
        name: '传智教育',
        children: [
          { name: '总裁办' },
          { name: '行政部' },
          { name: '财务部' }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      showDialog: false
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    async getDepartment() {
      const result = await getDepartment()
      this.data = transListToTreeData(result, 0)
      // this.data = result
    },
    operateDept(type, id) {
      if (type === 'add') {
        // 添加子部门
        this.showDialog = true // 显示弹层
        this.currentNodeId = id
      }
    },
    // 操作部门方法
    operateDept(type, id) {
      if (type === 'add') {
        // 添加子部门
        this.showDialog = true // 显示弹层
        this.currentNodeId = id
      } else if (type === 'edit') {
        // 编辑部门场景
        this.showDialog = true
        this.currentNodeId = id // 记录id 要用它获取数据
        // 更新props- 异步动作
        // 直接调用了子组件的方法 同步的方法
        // 要在子组件获取数据
        // 父组件调用子组件的方法来获取数据
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail() // this.$refs.addDept等同于子组件的this
        })
      } else {
        // 删除部门
        this.$confirm('您确认要删除该部门吗').then(async () => {
          await delDepartment(id)
          // 提示消息
          this.$message.success('删除部门成功')
          this.getDepartment()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .app-container {
//   padding: 30px 140px;
//   font-size: 14px;
// }

.tree-manager {
  width: 70px;

  display: inline-block;
  margin: 10px;
  margin-right: 20px;
}

.el-tree {
  box-sizing: border-box;
  padding: 10px 55px;
}
</style>
