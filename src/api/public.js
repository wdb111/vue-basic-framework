import fetch from '../utils/fetch';
//获取验证码
export function findSvg() {
  
  return fetch({
    url: "/api/authCode",
    method: "get"
  })
}
//注册
export function reg(params) {
  let a = JSON.stringify(params)
  let data = {
    params: a
  }
  return fetch({
    url: "/api/reg",
    method: "post",
    params: data
  })
}
//登录
export function login(params) {
  let a = JSON.stringify(params)
  let data = {
    params: a
  }
  return fetch({
    url: "/api/login",
    method: "post",
    params: data
  })
}
//查询数据
export function selectValue({tableName, params}) {
  let a = JSON.stringify(params||[])
  let data = {
    tableName: tableName,
    params: a
  }
  return fetch({
    url: "/api/selectValue",
    method: "post",
    params: data
  })
}
//添加数据
export function addValue(tableName, params) {
  let a=JSON.stringify(params)
  let data = {
    tableName: tableName,
    params: a
  }
  return fetch({
    url: '/api/addValue',
    method: 'post',
    params: data
  });
}

//删除数据
export function deleteValue({tableName, params}) {
  let a = JSON.stringify(params)
  let data = {
    tableName: tableName,
    params: a
  }
  return fetch({
    url: '/api/deleteValue',
    method: 'post',
    params: data
  });
}

//更新数据
export function updateValue(tableName, params, newData) {
  let a = JSON.stringify(params)
  let b=JSON.stringify(newData)
  let data = {
    tableName: tableName,
    params: a,
    newData:b
  }
  return fetch({
    url: "/api/updateValue",
    method: "post",
    params: data
  })
}
export function getValue(ciKey, parameterList, page, pageSize, sortList) {
  if (parameterList.length < 1) parameterList = [];
  const data = {
    page: page,
    pageSize: pageSize,
    ciKey,
    sortList,
    paraList: parameterList
  };
  return fetch({
    url: "/apj/publicController/getValueByApp/" + ciKey,
    method: "post",
    data
  });
}

//上传文件
export function fileUpload(formData, config) {
  console.log(formData, config)
  let a = JSON.stringify(formData);
  let b = JSON.stringify(config)
  let data = {
    formData: a,
    config: b
  }
  return fetch({
    url: '/api/fileUpload',
    method: 'post',
    params: data
  });
}