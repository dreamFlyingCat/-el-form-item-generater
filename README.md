## el-form-item-generater
根据传入的数据自动生成el-form-item

## 属性
| 参数     | 说明           | 类型    | 可选值                      | 默认值 |
| -------- | -------------- | ------- | --------------------------- | ------ |
| forms  | 用于生成formItem的数组  | Array[formItemData] |  --   |   []    |
| models | item的值绑定到该对象属性上  | Object |  {}    | {}  |
| justShow | 是否为展示模式  | Boolean |  true或false    | false  |
| showValues      | justShow为true时formItem使用该对象的key值 | Object |   --  | {}  |

## formItemData属性
| 参数     | 说明           | 类型    | 可选值                      | 是否必填 | 默认值 |
| -------- | -------------- | ------- | --------------------------- | ------ |------ |
| type  | 生成的item类型，slot为true时可以不填  | String |   input、number、date、daterange、select、radio、checkbox、textarea、upload、link | 是|   --   |
| label  | el-form-item中label的值  | String |  -- | 是|   --   |
| name  | 从models[name]获取初始值，默认绑定到name值对应的key上  | String |  -- |  是|  --   |
| placeholder  | 提示信息  | String |  -- |   否| --   |
| class  | 自定义el-form-item的class  | String |  -- |   否| --   |
| width  | 自定义el-form-item中lalel的宽度  | Boolean |  -- |   否| 300   |
| bindKey  | 绑定到models上的key  | String |  -- |   否| --   |
| disabled  | 是否禁止  | Boolean | true或者false |   否| false   |
| required  | 是否必填  | Boolean | true或者false |   否| false   |
| multiple  | select是否多选  | Boolean | true或者false |   否| false   |
| clearable  | select是否可以清除  | Boolean | true或者false |   否| false   |
| col  | 在一行中占用的列数，参考element-ui Layout布局  | Number | 1~24 |   否| 8   |
| data  | 用于生成select、radio、checkbox的选项 | Array[object] | -- |   否| []  |
| optionValue  | 选项中value的key  | String |  -- |   否|  value   |
| optionLabel  | 选项中label的key  | String |  -- |   否| label   |
| optionKey  | 选项中key的key  | String |  -- |   否| value   |
| format  | type为date或者daterange时日期格式  | String |  -- |   否| yyyy-MM-dd HH:mm:ss   |
| slot  | 是否为插槽  | boolean |  true或者false|   否| false   |

## type为upload时可用的属性

| 参数     | 说明           | 类型    | 可选值                      | 是否必填 | 默认值 |
| -------- | -------------- | ------- | --------------------------- | ------ |------ |
| uploadType  | 上传的类型  | String |   image、file | 否|   --  |
| action  | 上传地址  | String |   -- | 是|   --  |
| imageUrl  | 图片预览地址  | String |   image、file | 否|   --  |
| fileName  | 文件名称（uploadType为file时生效）  | String |  -- | 否|   --  |
| limit  | 文件大小限制 | Number |  -- | 否|   1  |
| patterns | 允许的文件类型 | Array[string] |  -- |否|   ['image/jpeg', 'image/png']  |
| onSuccess  | 上传成功回调 | Function |  -- | 否|   --  |
| handleChange  | 选择的文件改变时回调 | Function |  -- | 否|   --  |

## forms传值示例

        <GenerateFormItem
              :forms="projectForms"
              :models="projectData"
              :just-show="justShow"
              :show-values="projectData"

            <template v-slot:slotName>
                <p>自定义的form item</p>
            </template>
        </GenerateFormItem>

    <!-- projectForms -->
    [
        // 输入框
        {
          type: 'input',
          label: '项目名称',
          name: 'projectName',
        },
        // 日期
        {
          type: 'date',
          label: '离岗日期',
          name: 'leaveTime',
          disabled: this.disabled,
          col: 12,
          required: true,
        },
        // 选择
        {
          type: 'select',
          label: '门禁卡',
          name: 'doorState',
          data: [
            {
              dictValue: '已归还',
              dictKey: 0,
            },
            {
              dictValue: '未归还',
              dictKey: 1,
            },
          ],
          col: 12,
          optionValue: 'dictKey',
          optionLabel: 'dictValue',
          optionKey: 'dictKey',
          required: true,
          bindKey: 'doorState',
        },
        // 上传文件
         {
          type: 'upload',
          label: '个人身份证',
          name: 'personIdUrl',
          action: '/api/futurelab/oss/file/upload',
          imageUrl: this.form.personIdUrl,
          col: 12,
        },
        // 链接只有在展示模式下生效
        {
          type: 'link',
          label: '详细信息',
          name: '查看详细信息',
          tolink: 'http://www.baidu.com',
        },
        // slot
        {
          slot: true,
          name: 'slotName',
        },
        // 单选
        {
            type: 'radio',
            data:[
                {label: '男', value: 1},
                {label: '女', value: 2}
            ]
        }
    ]

