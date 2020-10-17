<template>
  <div class="app-container">
   
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      
    </el-card>
    <div class="table-container">
      <el-table ref="memberTable" :data="peopleArray" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="300" align="center">
          <template slot-scope="scope">{{scope.row.key}}</template>
        </el-table-column>
        <el-table-column label="帐号ID" align="center">
          <template slot-scope="scope">{{scope.row.value}}</template>
        </el-table-column>
       
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
   <el-dialog
      :title="isEdit?'编辑redis':'添加redis'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="member"
               ref="adminForm"
               label-width="150px" size="small">
        <el-form-item label="key：">
          <span>{{member.key}}</span>
          <!-- <el-input v-model="member.key" style="width: 250px"></el-input> -->
        </el-form-item>
        <el-form-item label="value：">
          <el-input v-model="member.value" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>
<script>
import {
  fetchList,updateRedis
} from "@/api/redisConfiguration";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
};
const defaultMember = {
  key: null,
  value:null
};
export default {
  name: "memberList",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      member: Object.assign({}, defaultMember),
      isEdit: false,
      obj: {},
      peopleArray: []
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.peopleArray = []
        this.list = response.data[0]
        this.obj = Object.keys(response.data[0])
        for(let i in this.list){
          var obj={
          key:i,
          value:this.list[i]
          }
          this.peopleArray.push(obj)
          }
        this.listLoading = false;
      });
    },
    handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.member = Object.assign({},row);
      },
    handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          let params = new URLSearchParams();
        params.append('key', this.member.key);
        params.append('value', this.member.value);

          if (this.isEdit) {
            updateRedis(params).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          } 
        })
      },

  },
};
</script>
<style></style>


