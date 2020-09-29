<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="News"
             :rules="rules"
             ref="NewsFrom"
             label-width="150px"
             size="small">
      <el-form-item label="资讯标题：" prop="name">
        <el-input v-model="News.title" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="资讯内容：" prop="name">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="News.content">
        </el-input>
      </el-form-item>
       <el-form-item label="访问次数：">
        <el-input v-model="News.visitCount" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="News.sort" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="显示状态：">
        <el-radio-group v-model="News.status">
          <el-radio :label="0">不显示</el-radio>
          <el-radio :label="1">显示</el-radio>
        </el-radio-group>
      </el-form-item>
     
      <el-form-item>
        <el-button type="primary" @click="onSubmit('NewsFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('NewsFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createNews, getNews, updateNews} from '@/api/news'
  const defaultNews = {
      Id:0,
    title: null,
    content: null,
    visitCount:0,
    sort: 0,
    status: 1,
  };
  export default {
    name: 'NewsDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        News: null,
        rules: {
          title: [
            {required: true, message: '请输入资讯标题', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入资讯内容', trigger: 'blur'}
          ]
        }
      }
    },
    created(){
      if (this.isEdit) {
        getNews(this.$route.query.id).then(response => {
          this.News = response.data;
        });
      }else{
        this.News = Object.assign({},defaultNews);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                
                updateNews(this.$route.query.id, this.News).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createNews(this.News).then(response => {
                  this.$refs[formName].resetFields();
                  this.News = Object.assign({},defaultNews);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.News = Object.assign({},defaultNews);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


