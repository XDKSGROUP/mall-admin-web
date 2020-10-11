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
         
          <el-form-item label="账号ID：">
            <el-input v-model="listQuery.memberId" class="input-width" placeholder="账号ID" clearable></el-input>
          </el-form-item>
           <el-form-item label="状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

       
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      
    </el-card>
    <div class="table-container">
      <el-table ref="bmsTransactionLogTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="帐号ID" align="center">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
        <el-table-column label="发送地址" align="center">
          <template slot-scope="scope">{{scope.row.fromAddress}}</template>
        </el-table-column>
       
        <el-table-column label="交易数量" align="center">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
        <el-table-column label="接收地址" align="center">
          <template slot-scope="scope">{{scope.row.toAddress}}</template>
        </el-table-column>
        <el-table-column label="状态" width="120" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
 <el-table-column label="代币地址" align="center">
          <template slot-scope="scope">{{scope.row.tokenAddress}}</template>
        </el-table-column>
        <el-table-column label="矿工费" align="center">
          <template slot-scope="scope">{{scope.row.fee}}</template>
        </el-table-column>
<el-table-column label="交易哈希" align="center">
          <template slot-scope="scope">{{scope.row.txHash}}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
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
  </div>
</template>
<script>
import {
  fetchList,
} from "@/api/bmsTransactionLog";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
};
const defaultTransactionLog = {
  id: null,
  // username: null,
  // password: null,
  // nickName: null,
  // email: null,
  // note: null,
  // status: 1,
};
export default {
  name: "TransactionLog",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      transactionLog: Object.assign({}, defaultTransactionLog),
      isEdit: false,
      statusOptions: [
        {
          label: "正在打包",
          value: 0,
        },
        {
          label: "成功",
          value: 1,
        },
        {
          label: "失败",
          value: 2,
        },
      ],
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
    formatStatus(value) {
        if (value === 0) {
          return '正在打包';
        } else if (value === 1) {
          return '成功';
        } else if (value === 2) {
          return '失败';
        }
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
  },
};
</script>
<style></style>


