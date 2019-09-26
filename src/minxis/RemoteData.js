// resources 是一个对象， 每个key是要添加的数据属性的名称， 值是需要对服务器请求的路径
export default function (resources) {
  return {
    data() {
      let initData = {
        remoteDataLoading: 0, //计算当前正在加载请求的数量， 以帮助我们显示加载动画
        remoteErrors: []
      }
      for (const key in resources) {
        initData[key] = null
        initData.remoteErrors[key] = null
      }
      return initData;
    },
    computed: {
      remoteDataBusy() {
        return this.$data.remoteDataLoading !== 0
      },
      hasRemoteErrors() {
        // 迭代remoteErrors对象并检查是否为空
        console.log('hasRemoteErrors this.$data.remoteErrors=', this.$data.remoteErrors);
        return Object.keys(this.$data.remoteErrors).some(
          key => this.$data.remoteErrors[key]
        )
      },
    },
    methods: {
      async fetchResource(key, url) { //获取资源并更新相应的数据
        this.$data.remoteDataLoading++;
        this.$data.remoteErrors[key] = null;
        try {
          this.$data[key] = await this.$fetch(url)
        } catch (e) {
          console.error(e);
          this.$data.remoteErrors[key] = e;
        }
        this.$data.remoteDataLoading--;
      },
    },
    created() {
      for (const key in resources) {
        let url = resources[key];

        //如果值是一个函数，侦听结果
        if (typeof url === 'function') {
          this.$watch(url, (val) => {
            this.fetchResource(key, val);
          }, {
            immediate: true //希望在侦听值之前第一次调用fetchResource
          })
        } else {
          this.fetchResource(key, url); 
        }
      }
    }
  }

}