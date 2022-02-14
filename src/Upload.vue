<template>
  <fragment>
    <el-upload
      v-if="!justShow && type === 'image'"
      class="common-uploader avatar-uploader"
      :action="action"
      :show-file-list="false"
      :on-change="handleChange"
      :on-success="onSuccess"
      :before-upload="beforeAvatarUpload"
      :limit="1"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，文件大小不超过{{ limit }}M</div>
    </el-upload>
    <el-upload
      v-else-if="!justShow && type === 'file'"
      :show-file-list="false"
      class="common-uploader"
      :action="action"
      :on-change="onchange"
      :on-success="onSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div>
        <el-button size="small">点击上传文件</el-button>
        <span v-if="showName" class="fime-name">&nbsp;&nbsp;<i class="el-icon-circle-check" />{{ showName }}</span>
      </div>
      <div slot="tip" class="el-upload__tip">
        {{ hint ? hint : `文件大小不超过${limit}M` }}
      </div>
    </el-upload>
    <div v-else-if="justShow && type === 'image'">
      <img v-if="imageUrl" :src="imageUrl" alt="上传的图片" style="width: 100px">
      <span v-else>未上传</span>
      <el-button v-if="imageUrl" icon="el-icon-download" size="mini" @click="handleDownload">下载</el-button>
    </div>
    <div v-else-if="justShow && type === 'file'&&imageUrl">
      <el-button icon="el-icon-download" size="mini" @click="handleDownload">查看</el-button>
    </div>
  </fragment>
</template>
<script>
// TODO 只是展示的情况，图片显示和文件名称显示
// TODO 后续加上进度上传进度
export default {
  name: 'Uploader',
  props: {
    onSuccess: {
      require: true,
      type: Function,
      default: () => {}
    },
    handleChange: {
      require: false,
      type: Function,
      default: () => {}
    },
    action: {
      require: true,
      type: String,
      default: ''
    },
    type: {
      require: true,
      type: String,
      default: 'image',
      validator: function (value) {
        return ['image', 'file'].indexOf(value) !== -1
      }
    },
    limit: {
      // 文件数量限制
      type: Number,
      default: 1
    },
    maxSize: {
      type: Number,
      default: 3 // 单位M
    },
    imageUrl: {
      default: '',
      type: String,
      require: false
    },
    fileList: {
      default: () => [],
      type: Array,
      require: false
    },
    patterns:  {
        default: () => ['image/jpeg', 'image/png'],
        type: Array,
        require: true
    },
  },
  inject: ['isShow'],
  data() {
    return {
      showName: ''
    }
  },
  computed: {
    justShow() {
      return this.isShow ? this.isShow() : false
    }
  },
  methods: {
    onchange(file, fileList) {
      this.showName = file.name
      this.handleChange && this.handleChange(file, fileList)
    },
    beforeAvatarUpload(file) {
      if (file.size / 1024 / 1024 > this.limit) {
        return this.$error(`文件大小不能超过${this.limit}M!`)
      }

      // file类型，不校验文件类型
      if (this.type === 'file') return true

      // 校验文件类型
      const isPatternOk = this.patterns.includes(file.type)
      if (isPatternOk) return true
      else {
        switch (this.type) {
          case 'image':
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
            break
          default:
            this.$message.error('上传的文件格式错误！')
        }
        return false
      }
    },
    handleDownload() {
      if (!this.imageUrl) {
        this.$message.error('未上传文件')
        return
      }
      window.open(this.imageUrl, '_target')
    }
  }
}
</script>
<style lang="scss">
.common-uploader {
  .el-upload__tip {
    margin: 0;
    color: #999;
    line-height: 20px;
  }
  .fime-name {
    color: green;
  }
}
.common-uploader.avatar-uploader {
  .el-upload__tip {
    position: relative;
    top: -10px;
  }
  .el-upload {
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
