<script setup lang="ts">
import {genFileId} from 'element-plus'
import type {FormRules, FormInstance, UploadFile, UploadRawFile, UploadInstance, UploadProps} from 'element-plus'
import {FontFormatter} from './utils/FontFormatter'

interface CutterForm {
  file: UploadFile[],
  text: string
}
const cutterForm = reactive<CutterForm>({
	file: [],
	text: ''
})
const rules = ref({
	file: [{ validator: fileValidator }],
	text: [{ required: true, message: '还没写要裁的文本.' }]
})
const formRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()

const replaceNewFile: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}
function fileValidator(rule: FormRules, value: any[], cb: Function) {
	if (value.length <= 0) {
		cb(new Error('还没上传源字体文件.'))
	} else {
		const legalType = ['ttf', 'otf', 'fon', 'pfm']
		const illegalArr = value.filter(file => {
			const fileType = file.name.split('.').pop().toLowerCase()
			return legalType.indexOf(fileType) < 0
		})
		if (illegalArr.length > 0) {
			cb(new Error('上传文件的类型不对.'))
		} else {
			cb()
		}
	}
}
function cutAndDownload() {
	formRef.value?.validate((v: boolean) => {
		if (v) {
			const glyphs = cutterForm.text
				.split('')
				.filter(item => item !== ' ')
				.filter((item, i, arr) => arr.indexOf(item) === i)
				.join('')
			const fm = new FontFormatter(glyphs, cutterForm.file[0].raw as UploadRawFile)
			fm.readAsArrayBuffer()
		}
	})
}
</script>

<template>
  <div class="cutter-content">
    <el-form :model="cutterForm" ref="formRef" :rules="rules">
      <el-form-item prop="file" class="pb-4">
        <el-upload
            v-model:file-list="cutterForm.file"
            ref="uploadRef"
            :limit="1"
            :on-exceed="replaceNewFile"
            :on-change="() => formRef?.clearValidate('file')"
            :auto-upload="false"
            drag
        >
          <el-icon class="el-icon--upload"><i-ep-upload-filled /></el-icon>
          <div class="el-upload__text">
            <em>拖拽文件到虚框内</em> 或 <em>点击虚框内的区域</em> 上传文件
          </div>
          <template #tip>
            <div class="upload-tips">
              <el-text type="danger" tag="div">1、同时只能上传一个字体文件，多次上传会覆盖之前的文件。</el-text>
              <el-text type="danger" tag="div">2、只支持字体文件类型，如：.TTF，.OTF，.FON，.PFM</el-text>
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item prop="text">
        <el-input
            v-model="cutterForm.text"
            :rows="2"
            type="textarea"
            placeholder="输入要裁减出来的文字、数字、符号"
            :validate-event="false"
        />
      </el-form-item>
    </el-form>
    <div class="btn-wp">
      <el-button type="primary" @click="cutAndDownload">
        <el-icon class="mr-1"><i-ep-download /></el-icon>下载裁剪后的文件
      </el-button>
      <el-tooltip effect="dark" placement="right">
        <template #content>
          <ul>
            <li>使用说明：</li>
            <li>1、上传字体文件</li>
            <li>2、输入所需裁出的文字</li>
            <li>3、点击按钮下载裁剪后的字体文件</li>
          </ul>
        </template>
        <el-icon color="#666" size="16" class="ml-2"><i-ep-question-filled /></el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cutter-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
}
.upload-tips {
  line-height: 22px;
  margin-top: 8px;
}
.btn-wp {
  display: flex;
  justify-content: center;
}
</style>
