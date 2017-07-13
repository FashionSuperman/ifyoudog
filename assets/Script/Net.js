var properties = require("Properties");
/**
 * ajax方法封装
 */
function sendRequest(path,method,data,callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = xhr.responseText;
            // console.log(response);
            if(typeof callback == "function"){
                callback(response);
            }
            
        }else if(xhr.readyState == 4 && xhr.status == 0){
            window.location.href = properties.url.wxlogin;
        }
    };
    xhr.open(method, path, true);
    if("POST" == method || method == undefined){
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    }else if("GET" == method){//拼接参数,暂时不定义

    }
    
    
}

module.exports.sendRequest = sendRequest;
