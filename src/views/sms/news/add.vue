<template> 
  <news-detail :isEdit="false"></news-detail>
</template>
<script>
  import NewsDetail from './components/NewsDetail'
  export default {
    name: 'addNews',
    components: { NewsDetail }
  }
</script>
<style></style>


