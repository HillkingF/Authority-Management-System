<template>
  <div>
    <!--============================行内表单部分==========================-->
    <el-form :inline="true">

      <!-- el-input输入框:
        v-model="searchForm.name": 绑定输入框中的参数为searchForm.name
        placeholder="名称":输入框中默认显示的提示文本
        clearable : 支持清除    -->
      <el-form-item>
        <el-input
            v-model="searchForm.username"
            placeholder="用户名"
            clearable>
        </el-input>
      </el-form-item>

      <!--搜索按钮-->
      <el-form-item>
        <el-button @click="getUserList">搜索</el-button>
      </el-form-item>

      <!--新增按钮-->
      <el-form-item>
        <el-button type="primary" @click="dialogVisible=true">新增</el-button>
      </el-form-item>

      <!--@confirm是饿了么中一个内置事件,意思是:点击确认按钮时触发.(触发删除事件)-->
      <el-form-item>
        <el-popconfirm title="是否批量删除?" @confirm="delHandle(null)">
          <el-button type="danger" slot="reference" :disabled="delBtlStatu">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>

    </el-form>

    <!--============================主体表格部分==========================-->
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>

      <el-table-column
          label="头像"
          width="50">
        <template slot-scope="scope">
          <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column
          prop="username"
          label="用户名"
          width="120">
      </el-table-column>

      <el-table-column
          prop="code"
          label="角色名称">
        <template slot-scope="scope">
          <el-tag size="small" type="info" v-for="item in scope.row.roles">{{item.name}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="email"
          label="邮箱">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号">
      </el-table-column>

      <el-table-column
          prop="statu"
          label="状态">
        <!--采用饿了么表单中的插槽属性,-->
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.statu === 1" type="success">正常</el-tag>
          <el-tag size="small" v-else-if="scope.row.statu === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="created"
          width="200"
          label="创建事件">
      </el-table-column>

      <el-table-column
          prop="icon"
          width="260px"
          label="操作">
        <!--采用饿了么表单中的插槽属性,-->
        <template slot-scope="scope">
          <el-button type="text" @click="roleHandle(scope.row.id)">分配角色</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="repassHandle(scope.row.id, scope.row.username)">重置密码</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <!--弹框再次确认删除-->
          <template>
            <!--@confirm是饿了么中一个内置事件,意思是:点击确认按钮时触发.(触发删除事件)-->
            <el-popconfirm title="是否删除?" @confirm="delHandle(scope.row.id)">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>

    </el-table>


    <!--============================分页部分==========================-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="current"
        :page-size="size"
        :total="total">
    </el-pagination>

    <!--============================弹窗部分==========================-->
    <!--1.新增按钮的弹窗-->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose" >

      <!--在弹窗中显示表单-->
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">
        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomlete="off"></el-input>
        </el-form-item>

        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="editForm.code" autocomlete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="editForm.remark" autocomlete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="statu" label-width="100px">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label=0>禁用</el-radio>
            <el-radio :label=1>正常</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <!--2.分配权限的弹窗-->
    <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible" width="600px">
      <el-form :model="roleForm">
        <el-tree :data="roleTreeData"
                 show-checkbox
                 ref="roleTree"
                 node-key="id"
                 :default-expand-all=true
                 :check-strictly=true
                 :props="defaultProps"></el-tree>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRoleHandle('roleForm')">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      // searchForm  delBtlStatu是行内表单的参数===========
      searchForm : {},
      delBtlStatu: true,

      // tableData 是主体表格的参数========================
      tableData: [],
      multipleSelection: [], //用于批量删除的变量

      // 分页部分的参数 ==================================
      total: 0,
      size: 10,
      current: 1,

      // 新增按钮 弹窗部分的参数============================
      dialogVisible: false,  // 弹窗是否显示
      editForm: {            // 弹窗表格数据
      },
      editFormRules: {       //弹窗表单的校验规则
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入唯一编码', trigger: 'blur'}
        ],
        statu: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ],
      },

      // 分配权限的弹窗 参数 ================================
      roleDialogFormVisible: false,
      roleForm: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleTreeData: []


    }
  },
  // 使用created钩子,在html完成渲染前调用下面的方法显示后端数据
  created() {
    this.getUserList();
    this.$axios.get('/sys/role/list').then(res => {
      this.roleTreeData = res.data.data.records
    })
  },
  methods: {
    // 行内表单部分的方法===================================================
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
      // 根据选项数组的长度判断是否将 批量删除的按钮禁用
      this.delBtlStatu = (val.length === 0);
    },

    // 分页部分的方法 ======================================================
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val;
      this.getUserList();
    },

    // 新增按钮 弹窗部分的方法 =====================================================
    // 重置或者清除弹窗中表单内容的方法
    resetForm(formName){
      this.$refs[formName].resetFields(); //清空表单
      this.dialogVisible = true;  // 隐藏弹窗
      this.editForm = {}  // 将装载表单数据的变量设置为null
    },

    // 点击新增的时候,清空弹窗表格,显示空白表格
    newopen(formName){
      this.dialogVisible = true;  // 隐藏弹窗
      this.$refs[formName].resetFields(); //清空表单
      this.editForm = {}  // 将装载表单数据的变量设置为null
    },

    getUserList(){  // 从mockjs中获取表单主体内容的模拟数据的方法
      this.$axios.get("/sys/user/list", {
        params: {
          username: this.searchForm.username,
          current: this.current,
          size : this.size
        }
      }).then(res => {
        this.tableData = res.data.data.records
        this.size = res.data.data.size
        this.current = res.data.data.current
        this.total = res.data.data.total
      })
    },

    submitForm(formName){ //弹窗表单数据提交到后台,并更新页面显示 的方法
      this.$refs[formName].validate((valid) =>{
        // 判断表单数据是否有效
        if (valid){
          this.$axios.post('/sys/user/' + (this.editForm.id? 'update': 'save'), this.editForm).then(res => {
            this.$message({
              showClose: 'true',
              message: '恭喜你, 操作成功',
              type: 'success',
              onClose:() =>{  // 回调后端信息
                this.getUserList() // 重新获取后端传来的表单数据
              }
            });
            this.dialogVisible = false;
          })
        }else{
          console.log('error submit !');
          return false;
        }
      });
    },
    editHandle(id){  // 点击`编辑`按钮后触发这个事件
      // 先通过下面的请求获取这一行的基本信息
      this.$axios.get('/sys/user/info/' + id).then(res => {
        // 将获取到的这个信息传入对话框  并显示对话框
        this.editForm = res.data.data
        this.dialogVisible = true
      })
    },

    // 点击`删除` 按钮清除表格项
    // 注意这里可能是批量删除,所以需要将id放入一个数组,而不是直接删除一个简单的变量
    delHandle(id){
      var ids = []

      // 判断id是一个还是多个,多个需要循环删除
      if(id){
        ids.push(id);
      }else{
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
      }

      console.log(ids)

      this.$axios.post('/sys/user/delete' + ids).then(res => {
        this.$message({
          showClose: 'true',
          message: '恭喜你, 操作成功',
          type: 'success',
          onClose:() =>{  // 回调后端信息
            this.getUserList() // 重新获取后端传来的表单数据
          }
        });
      })
    },

    // 分配权限 弹窗部分的方法 =====================================================
    roleHandle(id){
      this.roleDialogFormVisible = true
      this.$axios.get("/sys/user/info/" + id).then(res =>{
        this.roleForm = res.data.data
        this.$refs.roleTree.setCheckedKeys(res.data.data.roleIds);

      })
    },
    submitRoleHandle(formName){ // 权限分配 弹窗中的 提交按钮触发事件
      var roleIds = this.$refs.permTree.getCheckedKeys()
      console.log(roleIds)
      // 提交信息要发出请求
      this.$axios.post("/sys/user/role/" + this.roleForm.id,  roleIds).then(res =>{
        this.$message({
          showClose: 'true',
          message: '恭喜你, 操作成功',
          type: 'success',
          onClose:() =>{  // 回调后端信息
            this.getUserList() // 重新获取后端传来的表单数据
          }
        });
        this.roleDialogFormVisible = false
      })

    },

    repassHandle(id, username){
      this.$confirm('将重置用户[' + username + ']的密码,是否继续?' , '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$axios.post('/sys/user/repass', id).then(res =>{
          this.$message({
            showClose: true,
            message: '恭喜你,操作成功',
            type: 'success',
            onClose: () =>{

            }
          })
        })
      })

    }


  }
}
</script>

<style scoped>
.el-pagination{
  float: right;
  margin-top: 22px;
}
</style>