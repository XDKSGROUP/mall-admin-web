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
        >重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
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
      <el-table ref="memberTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="帐号ID" align="center">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="改变类型" align="center">
          <template slot-scope="scope">{{scope.row.changeType | formatChangeType}}</template>
        </el-table-column>
        <el-table-column label="变更前数量" align="center">
          <template slot-scope="scope">{{scope.row.startNumber}}</template>
        </el-table-column>
        <el-table-column label="变更的数量" align="center">
          <template slot-scope="scope">{{scope.row.changeCount}}</template>
        </el-table-column>
        <el-table-column label="变更后数量" align="center">
          <template slot-scope="scope">{{scope.row.endNumber}}</template>
        </el-table-column>

        <el-table-column label="来源" width="120" align="center">
          <template slot-scope="scope">{{scope.row.sourceType | formatSourceType}}</template>
        </el-table-column>

        <el-table-column label="来源ID" align="center">
          <template slot-scope="scope">{{scope.row.sourceId}}</template>
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
  } from "@/api/bmsHusdtChangeHistory";
  import {formatDate} from "@/utils/date";

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
      formatChangeType(value) {
        if (value === 0) {
          return '增加';
        } else if (value === 1) {
          return '减少';
        }
      }, formatSourceType(value) {
        if (value === 2) {
          return '充值';
        } else if (value === 3) {
          return '抢购入场券';
        } else if (value === 4) {
          return '后台充值';
        }else if (value === 5) {
          return '入场卷兑换冻结代币A';
        }else if (value === 7) {
          return '购买合约矿机';
        }else if (value === 8) {
          return '矿机释放收益';
        }else if (value === 9) {
          return '推广收益';
        }else if (value === 10) {
          return 'USDT兑换GFC';
        }else if (value === 10) {
          return 'GFC兑换USDT';
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
      lookDetail(index, row) {
        this.$router.push({path: "/mms/memberDetail", query: {id: row.id}});
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


