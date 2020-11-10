<template>
  <div class="app-container">

    <el-dialog width="30%" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="地址:" >
          <div>{{dataeth.address}}</div>
        </el-form-item>
        <el-form-item label="ETH" >
          <div>{{dataeth.balance | balances}}</div>
        </el-form-item>
        <el-form-item label="USDT">
          <div>{{dataeth.balance2}}</div>
        </el-form-item>
      </el-form>
    </el-dialog>



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

    </el-card>
    <div class="table-container">
      <el-table stripe ref="memberTable" :data="list" style="width: 100%" v-loading="listLoading" border>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="帐号ID" align="center">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
        <el-table-column label="币种" align="center">
          <template slot-scope="scope">{{scope.row.currency}}</template>
        </el-table-column>
        <el-table-column label="交易地址" align="center">
          <template slot-scope="scope">{{scope.row.tradingAddress}}</template>
        </el-table-column>
        <el-table-column label="代币" align="center">
          <template slot-scope="scope">{{scope.row.tokenCurrency}}</template>
        </el-table-column>
        <el-table-column label="交易地址" align="center">
          <template slot-scope="scope">{{scope.row.tokenTradingAddress}}</template>
        </el-table-column>

        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="lookDetail(scope.$index, scope.row)">查看</el-button>
          </template>
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
        :page-sizes="[10,15,20,100]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  fetchList,
  getBalanceOen,
  ethCallOne,
} from "@/api/memberTradingAddress";
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
      formLabelWidth: '120px',
      dialogFormVisible:false,
      dataeth:{},
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
    balances(val) {
      console.log(val)
      if(val==undefined){
        return val="未查到数据"
      }
      return val = val / 1000000000000000000;
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
    lookDetail(index, row) {

      let datasad={
        addresses:row.tradingAddress
      }
      console.log(datasad)
      let dsad={
        account	:row.tradingAddress,
        coinAddress:row.tokenTradingAddress,
      }
      getBalanceOen(datasad).then(res => {
        this.dataeth.balance = res.data.result[0].balance
        this.dataeth.address =row.tradingAddress;
        this.dialogFormVisible=true;
      })

        ethCallOne(dsad).then(res2 => {
          console.log(res2)
          this.dataeth.balance2=res2.data;

        })
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
<style scoped>
  /deep/.el-table th, .el-table tr {
    background-color: #fafaff;
    color: #000000;

  }
  /deep/.el-table {
    color: #595959;
  }

</style>


