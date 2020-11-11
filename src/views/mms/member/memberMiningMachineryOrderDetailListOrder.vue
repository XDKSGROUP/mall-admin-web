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
          <el-form-item label="订单编号：">
            <el-input v-model="listQuery.machineryCycleOrderId" class="input-width" placeholder="订单编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="运行状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="购买人Id：">
            <el-input v-model="listQuery.memberId" class="input-width" placeholder="购买人Id" clearable></el-input>
          </el-form-item>
          <el-form-item label="添加：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.timeStart"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker><span> ~ </span>
            <el-date-picker
              class="input-width"
              v-model="listQuery.timeEnd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="收益率：">
            <el-input  style="width: 48%" v-model="listQuery.yieldStart" class="input-width" placeholder="0.01" clearable></el-input>~
            <el-input  style="width: 48%" v-model="listQuery.yieldEnd" class="input-width" placeholder="0.01" clearable></el-input>
          </el-form-item>

        </el-form>
      </div>
    </el-card>

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-next" @click="handleClick" style="margin-left: 20px">导出1</el-button>
    </el-card>

    <div class="table-container">
      <el-table stripe ref="memberTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="订单编号" width="90" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="购买人Id" align="center">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
        <el-table-column label="购买型号" align="center">
          <template slot-scope="scope">{{scope.row.machineryName}}</template>
        </el-table-column>
        <el-table-column label="购买价格" align="center"width="110">
          <template slot-scope="scope">{{scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="日收益" align="center">
          <template slot-scope="scope">{{scope.row.outputDay|outputDays}}</template>
        </el-table-column>
        <el-table-column label="收益率" align="center">
          <template slot-scope="scope">{{scope.row.earningsRatio|earningsRatios}}</template>
        </el-table-column>
        <el-table-column label="合约收益" align="center">
          <template slot-scope="scope">{{scope.row.grantNumber}}</template>
        </el-table-column>

        <el-table-column label="购买时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.creatTime|formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="运行状态" width="160" align="center">
          <template slot-scope="scope" v-model="scope.row.grantStatus">
            <div class="success common" v-if="scope.row.grantStatus == 0">运行</div>
            <div class="fail common" v-else>结束</div>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.orderStopTime | formatDateTime2}}</template>
        </el-table-column>
        <el-table-column label="合约进程" width="160" align="center">
          <template slot-scope="scope">{{scope.row.day}}/{{scope.row.runCycle}}</template>
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
  import {BmsMiningMachineryOrderDetailList}from "@/api/memberMiningMachineryState";
  import { formatDate } from "@/utils/date";
  export default{
    data() {
      return {
        listQuery: {
          machineryCycleOrderId: null,
          status: null,
          memberId: null,
          model: null,
          timeStart: null,
          timeEnd: null,
          yieldStart: null,
          yieldEnd: null,
          outputDay:null,
          pageSize:10,
          pageNum:1,

        },
        statusOptions: [
          {
            label: "运行",
            value: 0,
          },
          {
            label: "结束",
            value: 1,
          },],
        total:null,
        list:null,
        listLoading: false,
      }
    },
    created() {
      this.getList();
    },
    methods: {
      RunCycle(time,runCycle,grantStatus,orderStopTime){

          console.log(time)
        console.log(time.split('T'))
        let times=time.split('T')[0]
        let orderStopTimes=orderStopTime.split('T')[0]

          return this.getTimes(times,orderStopTimes,grantStatus)

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
      handleResetSearch() {
        this.listQuery = {
          machineryCycleOrderId: null,
          status: null,
          memberId: null,
          model: null,
          timeStart: null,
          timeEnd: null,
          yieldStart: null,
          yieldEnd: null,
        };
      },
      handleSearchList() {
        this.getList();
      },
      handleClick(){
      },
      getList(){
        this.listLoading = true;
        let data = {
          machineryCycleOrderId: this.listQuery.machineryCycleOrderId,
          status: this.listQuery.status,
          timeStart: this.listQuery.timeStart,
          timeEnd: this.listQuery.timeEnd,
          memberId: this.listQuery.memberId,
          model: this.listQuery.model,
          yieldStart: this.listQuery.yieldStart,
          yieldEnd: this.listQuery.yieldEnd,
          pageSize:this.listQuery.pageSize,
          pageNum:this.listQuery.pageNum,

        }
        BmsMiningMachineryOrderDetailList(data).then((response) => {
          response.data.list.map(item => {
            if (item.grantStatus == 0) {
              item.day = this.getTimes(item.creatTime, item.grantStatus)
            } else if (item.grantStatus == 1) {
              item.day = this.getTimes(item.creatTime,item.grantStatus, item.orderStopTime)
            }
          })
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },

      getTimes (time,grantStatus, timer) {

        var BirthDay = new Date(time.split('T')[0]);
        if (grantStatus == 0) {
          var today = new Date();
        } else if (grantStatus == 1) {
          var today = new Date(timer.split('T')[0]);
        }
        var timeold = (today.getTime() - BirthDay.getTime());
        var sectimeold = timeold / 1000
        var secondsold = Math.floor(sectimeold);
        var msPerDay = 24 * 60 * 60 * 1000
        var e_daysold = timeold / msPerDay
        var daysold = Math.floor(e_daysold);
        var e_hrsold = (e_daysold - daysold) * 24;
        var hrsold = Math.floor(e_hrsold);
        var e_minsold = (e_hrsold - hrsold) * 60;
        var minsold = Math.floor((e_hrsold - hrsold) * 60);
        var seconds = Math.floor((e_minsold - minsold) * 60);
        var span_dt_dt = daysold + " 天 " + hrsold + " 小时 " + minsold + " 分 " + seconds + " 秒了";
        if (daysold == -1) {
          daysold = 0
        }
        return daysold
      },
    },
    filters:{
      outputDays(val){
        return val=val
      },
      earningsRatios(val){
        return val=val*100+"%"
      },
      formatDateTime(time) {
        if (time == null || time === "") {
          return "N/A";
        }
        let date = new Date(time);

        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      },
      formatDateTime2(time) {
        if (time == null || time === "") {
          return "未结束";
        }
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      },
      creatTimes(time) {
        if (time == null || time === "") {
          return "未结束";
        }
        let date = new Date(time);

        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      },
    },
  }
</script>

<style scoped>
  /deep/.el-table .cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .common {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 43px;
    height: 22px;
    border-radius: 4px;
    border: 1px solid red;
  }
  .success {
    color: #B7EB8F;
    background: #F6FFED;
    border: 1px solid #B7EB8F;
  }
  .fail {
    color: #FF9191;
    background: #FFE6E6;
    border: 1px solid #FF9191;
  }
  /deep/.el-table th, .el-table tr {
    background-color: #fafaff;
    color: #000000;

  }
  /deep/.el-table {
    color: #595959;
  }

</style>


