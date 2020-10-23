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
       
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      
    </el-card>
    <div class="table-container">
      <el-table ref="memberTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="矿机名称" align="center">
          <template slot-scope="scope">{{scope.row.machineryName}}</template>
        </el-table-column>
        <el-table-column label="矿机简介" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="算力（单位：d）" align="center">
          <template slot-scope="scope">{{scope.row.hashrate}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="是否显示" align="center">
          <template slot-scope="scope">{{scope.row.isShow | formatShow}}</template>
        </el-table-column>
        <el-table-column label="矿机等级" align="center">
          <template slot-scope="scope">{{scope.row.grade}}</template>
        </el-table-column>
        <el-table-column label="停止采矿数" align="center">
          <template slot-scope="scope">{{scope.row.stopMiningValue}}</template>
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
} from "@/api/bmsMiningMachinery";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
};
const defaultMember = {
  id: null,
  // username: null,
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
    formatStatus(value) {
        if (value === 0) {
          return '启用';
        } else if (value === 1) {
          return '禁用';
        }
      },
    formatShow(value) {
        if (value === 0) {
          return '隐藏';
        } else if (value === 1) {
          return '显示';
        }
      }
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


