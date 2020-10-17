<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" @click="handleSearchList()" size="small">查询搜索</el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="币种：">
            <el-input v-model="listQuery.currency" class="input-width" placeholder="币种" clearable></el-input>
          </el-form-item>
          <el-form-item label="账号ID：">
            <el-input v-model="listQuery.memberId" class="input-width" placeholder="账号ID" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="memberTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="充值单号" align="center">
          <template slot-scope="scope">{{scope.row.rechargeNumber}}</template>
        </el-table-column>
        <el-table-column label="帐号ID" align="center">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
        <el-table-column label="充值时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.rechargeTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="充值数量" align="center">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
        <el-table-column label="交易记录ID" align="center">
          <template slot-scope="scope">{{scope.row.transactionId}}</template>
        </el-table-column>
       
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total"
      ></el-pagination>
    </div>
  <el-dialog
      :title="isEdit?'编辑充值':'添加充值'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="member"
               ref="adminForm"
               label-width="150px" size="small">
        <el-form-item label="会员ID：">
          <el-input v-model="member.memberId" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="充值数量：">
          <el-input v-model="member.number" style="width: 250px"></el-input>
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
  fetchList,addRechargeDetail
} from "@/api/bmsRechargeDetail";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
};
const defaultMember = {
  id: null,
  rechargeTime: null,
  number:null,
  rechargeNumber:null,
  memberId: null,
  transactionId:null,
  handlers:null,
  rechargeType:null
  // password: null,
  // nickName: null,
  // email: null,
  // note: null,
  // status: 1,
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
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.member = Object.assign({},defaultMember);
      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        
            
        let params = new URLSearchParams();
        params.append('memberId', this.member.memberId);
        params.append('husdt', this.member.number);
        addRechargeDetail(params).then(response=>{
         
          this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
        });



        })
      },

  },
};
</script>
<style></style>


