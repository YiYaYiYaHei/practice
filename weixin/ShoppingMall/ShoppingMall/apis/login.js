import * as ajax from '@/utils/request.js';

export default {
	login: params => ajax.post('/wx/login', params),
	refreshToken: params => ajax.post('/wx/refreshToken', params),
	loginPhone: params => ajax.post('/wx/loginPhone', params),
	
	homeGetLimitList: params => ajax.get('/wx/home/limit/list', params),
	homeGetGroupList: params => ajax.get('/wx/home/group/list', params),
	homeGetGoodsList: params => ajax.post('/wx/home/goods/list', params, {showLoading: false}),
	homeGetGoodsDeatil: params => ajax.post('/wx/home/goods/detail', params),
	
  getList: (params, taskCallBack) => ajax.post('/plat/net', params, {isTask: true, taskCallBack: taskCallBack}),
  addTask: params => ajax.get('/plat/cabinet', params),
	fileUpload: params => ajax.upload('/upload', params),
	fileDownLoad: (params) => ajax.download('/download', params, {}),
};