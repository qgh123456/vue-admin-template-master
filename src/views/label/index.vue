<template>
  <div>

  </div>

</template>

<script>
  import api from '@/api/label'
    export default {
        name: "Label",

        data() {
          return {
            list: [], // 封装列表数据
            page: { // 分页对象
              current: 1,
              size: 20,
              total: 0

            },
            query: {}
          }
        },

        created() {
          this.fetchData();
        },

        methods: {
          fetchData() {
            api.getList(this.query,this.page.current,this.page.size).then(response => {
                this.list = response.data.records;
                this.page.total = response.data.total;
            })
          }
        }

    }
</script>

<style scoped>

</style>
