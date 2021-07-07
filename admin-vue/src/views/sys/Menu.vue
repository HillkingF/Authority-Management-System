<template>
  <div>
    <!--行内表单部分-->
    <el-form :inline="true">
      <el-form-item>
        <!--@click="dialogVisible=true": 点击按钮,弹窗状态变成可见从而显示-->
        <el-button type="primary" @click="dialogVisible=true">新增</el-button>
      </el-form-item>
    </el-form>
    <!--树形表单部分-->
    <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        stripe
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <!--el-table标签的属性说明
       row-key与表单的每一行有关
      :data表示从<script>中传来的数据
      border表示有边框的
      stripe表示行与行之间有斑马线的效果
      -->
      <el-table-column
          prop="name"
          label="名称"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="perm"
          label="权限编码"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="图标">
      </el-table-column>
      <el-table-column
          prop="type"
          label="类型">
        <!--采用饿了么表单中的插槽属性,-->
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.type === 0">目录</el-tag>
          <el-tag size="small" v-else-if="scope.row.type === 1" type="success">菜单</el-tag>
          <el-tag size="small" v-else-if="scope.row.type === 2" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="path"
          label="菜单URL">
      </el-table-column>
      <el-table-column
          prop="component"
          label="菜单组件">
      </el-table-column>
      <el-table-column
          prop="orderNum"
          label="排序号">
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
          prop="icon"
          label="操作">
        <!--采用饿了么表单中的插槽属性,-->
        <template slot-scope="scope">
          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <!--弹框再次确认删除-->
          <template>
            <el-popconfirm title="是否删除?">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!--弹窗:
    参数说明:
    :visible.sync="dialogVisible" 对话框是否显示 -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="600px"
        >
      <!--:before-close="handleClose"-->
      <!--在弹窗中显示表单-->
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">

        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="editForm.parentId" placeholder="请选择上级菜单">
            <template v-for="item in tableData">
              <el-option :label="item.name" :value="item.id"></el-option>
              <template v-for="child in item.children">
                <el-option :label="child.name" :value="child.id">
                  <span>{{"- " + child.name}}</span>
                </el-option>
              </template>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomlete="off"></el-input>
        </el-form-item>

        <el-form-item label="权限编码" prop="perms" label-width="100px">
          <el-input v-model="editForm.perms" autocomlete="off"></el-input>
        </el-form-item>

        <el-form-item label="图标" prop="icon" label-width="100px">
          <el-input v-model="editForm.icon" autocomlete="off"></el-input>
        </el-form-item>

        <el-form-item label="菜单URL" prop="path" label-width="100px">
          <el-input v-model="editForm.path" autocomlete="off"></el-input>
        </el-form-item>

        <el-form-item label="菜单组件" prop="component" label-width="100px">
          <el-input v-model="editForm.component" autocomlete="off"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type" label-width="100px">
          <el-radio-group v-model="editForm.type">
            <el-radio :label=0>目录</el-radio>
            <el-radio :label=1>菜单</el-radio>
            <el-radio :label=2>按钮</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态" prop="statu" label-width="100px">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label=0>禁用</el-radio>
            <el-radio :label=1>正常</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序号" prop="orderNum" label-width="100px">
          <el-input-number v-model="editForm.orderNum" :min="1" label="排序号">1</el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      dialogVisible: false,  // 弹出的对话框默认不显示

      editForm: { // 弹窗中的表格

      },

      editFormRules: { //弹窗表单的校验规则
        parentId: [
          {required: true, message: '请选择上级菜单', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        perms: [
          {required: true, message: '请输入权限密码', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择类型', trigger: 'blur'}
        ],
        orderNum: [
          {required: true, message: '请填入排序号', trigger: 'blur'}
        ],
        statu: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ],
      },

      // 树形表单的内容
      tableData: []
    }
  },

  created(){
    this.getMenuTree() // 创建一个获取树形表单数据的方法
  },
  methods:{
    getMenuTree(){  // 从mockjs中获取树形表单的模拟数据的方法
      this.$axios.get("/sys/menu/list").then(res => {
        this.tableData = res.data.data
      })
    },
    submitForm(formName){ //弹窗表单数据提交到后台,并更新页面显示 的方法
      this.$refs[formName].validate((valid) =>{
        // 判断表单数据是否有效
        if (valid){
          this.$axios.post('/sys/menu/' + (this.editForm.id? 'update': 'save'), this.editForm).then(res => {
              this.$message({
                showClose: 'true',
                message: '恭喜你, 操作成功',
                type: 'success',
                onClose:() =>{  // 回调后端信息
                  this.getMenuTree() // 重新获取后端传来的表单数据
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
      this.$axios.get('/sys/menu/info/' + id).then(res => {
        // 将获取到的这个信息传入对话框  并显示对话框
        this.editForm = res.data.data
        this.dialogVisible = true
      })
    }
  }
}
</script>

<style scoped>

</style>