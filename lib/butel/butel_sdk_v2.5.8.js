/**
 * corporation www.butel.com
 * author zhoucs
 * email zhoucs@butel.com
 * date 2017/10/9
 */


/**
 * @desc automatic execute function for  injecting ButelSDK into global Object
 * @param window
 * */
(function(window){
    var version = "2.5.8";  // version


    // test
    /*var _host = {
        auth:"http://testmedical.butel.com:81", // authenticate
        group:"http://testmedical.butel.com:81", // group url
        meeting:"http://testmedical.butel.com:81", //meeting url
        gmBridge:"http://testmedical.butel.com:81", // group and meeting bind url
        imMessage:"http://210.14.151.40:45566", //imMessage url
        imLocal:"http://127.0.0.1:65534" // enter group or meeting url
    };*/

    // online
    var _host = {
         auth:"http://medical.butel.com", // authenticate url
         group:"http://medical.butel.com", // group url
         meeting:"http://medical.butel.com", //meeting url
         gmBridge:"http://medical.butel.com",// group and meeting bind url
         imMessage:"http://webim.butel.com:10141", //imMessage main url
         imMessageSH: "http://webimsh.butel.com:10141", // imMessage backup shanghai url
         imMessageBJ: "http://webimbj.butel.com:10141", // imMessage backup beijing url
         imLocal:"http://127.0.0.1:65534" // enter group or meeting url
     };

    /*var _host = {
        auth:"http://125.88.254.162:41002", // authenticate url
        group:"http://125.88.254.162:41002", // group url
        meeting:"http://125.88.254.162:41002", //meeting url
        gmBridge:"http://125.88.254.162:41002",// group and meeting bind url
        imMessage:"http://125.88.254.162:41002", //imMessage url
        imLocal:"http://127.0.0.1:65534" // enter group or meeting url
    };*/



   // test for ButelSDK:COMBAT init
   /*var _config_param = {
       "nube":"66800000",//
       "pwd":"e10adc3949ba59abbe56e057f20f883e",
       "appKey":"d946367a98b94c3a9560a76e3c3f46fa"
   };*/

    // online for ButelSDK:COMBAT init
    var _config_param = {
        "nube":"67003195",// nube just for development
        "pwd":"9b2622681c7b07c5a70aaab93948d593",
        "appKey":"c87f7d597e5444249879a8150eef12bf"
    };




    var _authSignature = {
            login:"/BaikuUserCenterV2/auth",
        },
        _groupSignature = {
            createGroup:"/groupManager/CreateGroup.html",
            addMember:"/groupManager/GroupAddUsers.html",
            delMember:"/groupManager/GroupDelUsers.html",
            editGroupName:"/groupManager/EditGroupInfo.html",
            delGroup:"/groupManager/DeleteGroup.html"
        },
        _meetingSignature = {
            createMeeting:"/MeetingManage/callService",
            delMeeting: "/MeetingManage/callService",
            bindToken:"/MeetingManage/callService"
        },
        _gmBridgeSignature = {
            gmBind:"/csl/externalservice/appBindGroupCsl",
            gmModifyNickname:"/csl/externalservice/appUpdateNickNameCsl"
        },
        _imMessageSignature = {
            userLogin:"butelUserLogin",
            getHistoryMsg:"butelGetIMHistoryMsg"
        },
        _imLocalSignature = {
            enterGroup:"/enterGroup",
            enterMeeting:"/enterMeeting",
            login: "/login",
            hide: "/hide",
            groupMessageStatus: "/groupsMessageStatus"
        };





    var _config = {
        "_logLevel":1,
        "_busy":false,
        "_busy_apiName":""
    };

    var _default_request_prop = {
        timeout: 30000,
        responseType: "json",
        withCredentials: false,
    };
    /**
     * @desc ajax request function,the supported methods are get,post,put,delete
     * @param { Object } options configuration object
     * {
     *     method: string; //'get'|'post'|'delete'|'put', default get
     *     timeout: number; // millisecond, default 30000(30s),optional
     *     responseType: string; //an enumerated value that returns the type of the response ,default 'json',optional
     *     withCredentials: boolean; //indicates whether or not cross-site Access-Control requests  default false,optional
     *     data: object; //object will be serialized for request among post or put,optional
     *     url: string; // request url,required
     *     headers: object ; //object with key-value pairs will set  header before requesting,optional
     *     success: function; // context invoke success callback after successful response with status  200,required
     *     error: function; // context invoke error callback after network broken or server fail or parse response error,required
     * }
     * */
    function _ajax(options){
        var xhr = null,key;
        var method = options.method?options.method.toLowerCase():"get";

        if(window.XMLHttpRequest){
            //code for IE7, Firefox, Opera, ect.

            xhr = new window.XMLHttpRequest();
        }else if(window.ActiveXObject){
            //code for IE6, IE5

            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }else{
            throw new Error("Your browser does not support XMLHTTP.")
        }

        // request error callback handler for access control error
        xhr.onerror = function(evt){
            options.error({"code":99,"msg":"access control error"},"error");

        };

        // request done callback handler ,that is xhr.readyState is equal to 4
        xhr.onload = function(){
            if(xhr.status === 200){
                if(options.success instanceof window.Function){
                    options.success(xhr.response,"success")
                }
            }else{
                if(options.error instanceof window.Function){
                    options.error({"code":xhr.status,"msg":xhr.statusText},"error")
                }
            }
        };

        // abort callback handler
        xhr.onabort = function(){
            if(options.error instanceof window.Function){
                options.error({"code":98,"msg":"request aborted"},"abort" );
            }
        };

        // timeout callback handler
        xhr.ontimeout = function(){
            if(options.error instanceof window.Function){
                options.error({"code":408,"msg":"request timeout"},"timeout" );
            }
        };


        xhr.open(method,options.url,true);

        //set request xhr property like timeout、withCredentials
        for(key in _default_request_prop){
            if(options.hasOwnProperty(key)){
                xhr[key] = options[key];
            }else{
                xhr[key] = _default_request_prop[key];
            }
        }

        //set request header if any
        if(options.headers){
            for(key in options.headers){
                xhr.setRequestHeader(key,options.headers[key])
            }
        }

        //send xhr request
        switch(method){
            case "get":
            case "delete":
                xhr.send();
                break;

            case "post":
            case "put":
                xhr.send(options.data?window.JSON.stringify(options.data):"");
                break;
        }

        return xhr;
    }

    /**
     * @desc obj query format for first level,after that, json serialize
     * @param { Object } obj, serialize request param
     * */
    function _objToParamAndSerialize(obj){
        var param = "",key;

        if(obj instanceof Object){
            for(key in obj){
                if( obj[key] instanceof Object){
                    param+=key+"="+ window.JSON.stringify(obj[key])+"&";
                }else{
                    param+=key+"="+obj[key]+"&";
                }
            }

            return param.replace(/&$/,"")
        }

        return obj;
    }

    /**
     * @desc setUp im
     * @param { String } account
     * @param { String } pwd
     * */
    function _setUpIm(account,pwd) {
        window.location.href = 'ButelIM://?account=' + account + '&password=' + pwd + '&from=web';
    }

    /*
     * 0: not log
     * 1: log error,warn,info,log
     * 2: log warn,info,log
     * 3: log info,log
     * 4: log log
     * */

    /**
     * @desc logger function,support log output via _logLevel
     * @param { String } type,  type: error、warn、info、log
     * @param { * } msg
     * */
    function _log(type,msg){

        var level = this["_logLevel"];


        switch(level){
            case 1:
                if(/^(error|warn|info|log)$/i.test(type)){
                    window.console[type].apply(this,Array.prototype.slice.call(arguments,1));
                }
                break;
            case 2:
                if(/^(warn|info|log)$/i.test(type)){
                    window.console[type].apply(this,Array.prototype.slice.call(arguments,1));
                }
                break;
            case 3:
                if(/^(info|log)$/i.test(type)){
                    window.console[type].apply(this,Array.prototype.slice.call(arguments,1));
                }
                break;
            case 4:
                if(/^(log)$/i.test(type)){
                    window.console[type].apply(this,Array.prototype.slice.call(arguments,1));
                }
                break;

        }

    }

    /**
     * @desc wrap log function,support log
     * @param { Object } thiz, context
     * @param { String } type,
     * @param { * } msg,
     * */
    function _wrapLog(thiz,type,msg){
        _log.apply(arguments[0],Array.prototype.slice.call(arguments,1));
    }

    /**
     * @desc get ButelSDK instance data with key
     * @param { String } key
     * */
    function _getStoreData(key){
        return this["_data"][key];
    }

    /**
     * @desc wrap getStoreData function
     * @param { Object } thiz, context
     * @param { String } key,
     * */
    function _wrapGetData(thiz,key){
        return _getStoreData.call(thiz,key);
    }

    /**
     * @desc set ButelSDK data with key-value pairs
     * @param { String } key
     * @param { * } value
     * */
    function _setStoreData(key,value){
        this["_data"][key] = value;
    }

    /**
     * @desc wrap getStoreData function
     * @param { Object } thiz, context
     * @param { String } key,
     * */
    function _wrapSetData(thiz,key,value){
        _setStoreData.call(thiz,key,value);
    }

    /**
     * @desc set ButelSDK instance log level
     * @param { Number } level, log level
     * */
    function _setLogLevel(level){
        this["_logLevel"] = level;
        _config["_logLevel"] = level;
    }

    /**
     * @desc wrap _setLogLevel function
     * @param { Object } thiz, context
     * @param { String } level,
     * */
    function _wrapSetLogLevel(thiz,level){
        _setLogLevel.call(thiz,level);
    }


    /**
     * @desc set object property with readonly
     * @param { String }key; property name
     * @param { * }value; property value
     * */
    function _setPropWithReadonly(key,value){
        if(Object.defineProperty){
            Object.defineProperty(this,key,{
                configurable:true,
                writable:false,
                value:value
            })
        }else{
            this[key] = value;
        }
    }

    /**
     * @desc set ButelSDK instance init status
     * @param { Boolean } isInit, whether init
     * */
    function _setInitStatus(isInit){
        _setPropWithReadonly.call(this,"_init",isInit);
        /*if(Object.defineProperty){
            Object.defineProperty(this,"_init",{
                configurable:true,
                writable:false,
                value:isInit
            })
        }else{
            this["_init"] = isInit;
        }*/
    }

    /**
     * @desc wrap _setLogLevel function
     * @param { Object } thiz, context
     * @param { Boolean } isInit,
     * */
    function _wrapSetInitStatus(thiz,isInit){
        _setInitStatus.call(thiz,isInit);
    }

    /**
     * @desc return ButelSDK init status function
     * @param { Object } thiz, sdk instance object
     * */
    function _wrapGetInitStatus(thiz){
        return thiz["_init"];
    }

    /**
     * @desc set ticket status function
     * @param { Boolean } valid; set _ticketValid valid of true or invalid of false
     * */
    function _setTicketStatus(valid){
        _setPropWithReadonly.call(this,"_ticketValid",valid);
        /*if(Object.defineProperty){
            Object.defineProperty(this,"_ticketValid",{
                configurable:true,
                writable:false,
                value:valid
            })
        }else{
            this["_ticketValid"] = valid;
        }*/
    }

    /**
     * @desc wrap set ticket status function
     * @param { Object } thiz;sdk instance
     * @param { Boolean } valid; status of true or false
     * */
    function _wrapSetTicketStatus(thiz,valid){
        _setTicketStatus.call(thiz,valid);
    }


    /**
     * @desc set api busy
     * @param { Boolean } busy;
     * @param { String } apiName; api name
     * */
    function _setAPIBusy(busy,apiName){
        _setPropWithReadonly.call(this,"_busy",busy);
        _setPropWithReadonly.call(this,"_busy_apiName",apiName);
    }

    /**
     * @desc wrap set api busy function
     * @param { Object } thiz;sdk interface
     * @param { Boolean } busy; whether busy
     * @param { String } apiName; api name
     * */
    function _wrapSetAPIBusy(thiz,busy,apiName){
        _setAPIBusy.call(thiz,busy,apiName)
    }

    /**
     * @desc get api busy function
     * @param { Object } thiz, sdk instance object or _config object
     * */
    function _wrapGetAPIBusy(thiz){
        return {
            "busy":thiz["_busy"],
            "busy_apiName":thiz["_busy_apiName"]
        }
    }


    /**
     * @desc get ticket status function
     * @param { Object } thiz, sdk instance object
     * */
    function _wrapGetTicketStatus(thiz){
        return thiz["_ticketValid"];
    }

    /**
     * @desc return ButelSDK:COMBAT API true or false representing  whether it can invoke function,
     * @param { Object } thiz,ButelSDK:COMBAT instance
     * @param { Function } cb,error callback
     * @param { String } funcName,api function name
     * @param { Boolean } external,whether the function  is enterGroup or enterMeeting
     * @return { Boolean }
     * */
    function _wrapGetCanInvokeStatus(thiz,cb,funcName,external){
        var busyObj = _wrapGetAPIBusy(thiz);


        //for sdk instance or enter chat and meeting
        if(busyObj["busy"]){
            _wrapLog(thiz,"error","ButelSDK:COMBAT "+funcName+",error,["+busyObj["busy_apiName"]+"] being busy");
            cb(JSON.stringify({
                "code": 606,
                "msg": "["+busyObj["busy_apiName"]+"] being busy"
            }),"internal error");
            return false;
        }

        //for sdk  instance except its init function
        if(!_wrapGetInitStatus(thiz) && funcName !== "init" && !external){
            _wrapLog(thiz,"error","ButelSDK:COMBAT "+funcName+",error,have to init before invoking this function");
            cb(JSON.stringify({
                "code": 602,
                "msg": "no init",
            }),"internal error");

            return false;
        }else if(_wrapGetInitStatus(thiz) && funcName === "init" && !external){
            //for sdk instance of init function

            _wrapLog(thiz,"error","ButelSDK:COMBAT init,error,had initialized ");
            cb(JSON.stringify({
                "code": 605,
                "msg": "had initialized",
            }),"internal error");
            return false;
        }


        //for sdk instance of api function except init and release
        if(!_wrapGetTicketStatus(thiz) && funcName !== "init" && funcName !== "release" && !external){
            _wrapLog(thiz,"error","ButelSDK:COMBAT "+funcName+",error,ticket had expired");
            cb(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"internal error");

            return false;
        }



        return true;
    }


    /**
     * @desc filter im message via type
     * @param { Object } origin, original  message json object
     * */
    function _filterMessage(origin){
        var des = null;
        if(origin instanceof Object && Object){
            des = {};

            des["type"] = origin["type"];
            des["msg_id"] = origin["msg_id"];
            des["create_time"] = +origin["create_time"];
            des["sender_uid"] = origin["sender_uid"];
            des["sender_nube"] = origin["sender_nube"];
            des["sender_nickname"] = origin["sender_nickname"];
            des["sender_extra_info"] = origin["sender_extra_info"];

            switch ( origin.type ) {
                case "picture2":

                    des["url"] = origin["file_url"]["url"];
                    des["width"] = origin["width"];
                    des["height"] = origin["height"];
                    des["fileName"] = origin["file_url"]["fileName"];
                    des["fileSize"] = Math.round(origin["file_url"]["fileSize"]/1024); //B to KB


                    break;

                case "audio2":

                    des["url"] = origin["file_url"]["url"];
                    des["fileName"] = origin["file_url"]["fileName"];
                    des["fileSize"] = Math.round(origin["file_url"]["fileSize"]/1024); //B to KB
                    des["audioLen"] = +origin["file_url"]["audiolen"];

                    break;

                case "videomessage2":

                    des["url"] = origin["file_url"]["url"];
                    des["fileName"] = origin["file_url"]["fileName"];
                    des["fileSize"] = Math.round(origin["file_url"]["fileSize"]/1024); //B to KB
                    des["vedioLen"] = +origin["file_url"]["vediolen"];

                    if(origin["file_url"]["thumbUrls"] && origin["file_url"]["thumbUrls"].length && origin["file_url"]["thumbUrls"].length >0){
                        des["posterUrl"] = origin["file_url"]["thumbUrls"]["reverse"]()[0];
                    }else{
                        des["posterUrl"] = "";
                    }


                    break;

                case "attachment":

                    des["url"] = origin["file_url"]["thumbUrls"][0];
                    des["fileName"] = origin["file_url"]["fileName"];
                    des["fileSize"] = +origin["file_url"]["fileSize"];//KB


                    break;

                case "text2":

                    des["content"] = origin["content"];


                    break;

                default:

                    des["type"] = "unknown";

            }

            return des;

        }

        return origin;
    }

    /**
     * @desc combat init im login callback
     * @param { String } uid 
     * @param { String } token 
     * @param { Object } thiz, context 
     * @param { Function } successCB 
     * @param { Function } errorCB 
     */
    function _initImLogin(uid, token, thiz, successCB, errorCB) {
        var imMessageUrl = _host.imMessage ;
        var imMessageSHUrl = _host.imMessageSH;
        var imMessageBJUrl = _host.imMessageBJ;
        //im login request

        /**
         * @desc simple req function 
         * @param { String } url 
         * @param { String } domainText 
         * @param { Function } success 
         * @param { Function } error 
         */
        function req (url,domainText,success,error) {
            _wrapLog(thiz,"log","ButelSDK:COMBAT init,"+ domainText +" address request");
            _ajax({
                url:url,
                method:"post",
                data:{
                    "cmd_name":_imMessageSignature.userLogin,
                    "parameter":{
                        "uid":uid ,
                        "appkey":_config_param.appKey,
                        "nickname":"",
                        "nube":_config_param.nube,
                        "token": token,
                        "user_type":"2",
                        "extra_info":"",
                        "webim_version":"2.4.4"
                    }
                },
                success:function(data,resultText){
                    _wrapLog(thiz,"log","ButelSDK:COMBAT init,"+ domainText +" address request successfully,invoke cb");
                    success(data, resultText);
                },
                error:function(err,resultText){
                    _wrapLog(thiz,"log","ButelSDK:COMBAT init,"+ domainText +" address request with error,invoke cb");
                    error(err, resultText);
                }
            })
        }

        req(imMessageUrl,"start main domain",successCB,function(err, resultText){
            req(imMessageSHUrl,"start shanghai domain", successCB, function(err, resultText){
                req(imMessageBJUrl,"start beijing domain", successCB, errorCB)
            })
        })
       
    }



    /**
     * @desc initialize config required
     * @param { Number } logLevel;enum {0,1,2,3,4}
     * @param { Function } success;callback
     * @param { Function } error;callback
     * @param { String } adminNube;administrator of nube;optional for key-value pairs
     * @param { String } adminPwd; administrator of pwd;optional for key-value pairs
     * */
    function init(logLevel,success,error,adminNube,adminPwd){
        var thiz = this;


        _wrapLog(thiz,"log","ButelSDK:COMBAT init,start");
        if(!_wrapGetCanInvokeStatus(thiz,error,"init")){
            return;
        }

        //logLevel is not number or value
        if(typeof logLevel !== "number" || (typeof logLevel === "number" && (logLevel < 0 || logLevel > 4 ))){
            window.error("ButelSDK:COMBAT init,error,param [logLevel] expected to be number between 0 and 4");
            error(JSON.stringify({
                "code":601,
                "msg":"logLevel error"
            }),"internal error");


            return;
        }

        _wrapSetLogLevel(thiz,logLevel);

        if(arguments.length >= 4 && typeof adminNube !=="string"){
            //verify adminNube type

            _wrapLog(thiz,"error","ButelSDK:COMBAT init,error,param [adminNube] expected to be string");
            error(JSON.stringify({
                "code":604,
                "msg":"param type error"
            }),"internal error");

            return;
        }else if(arguments.length === 4 ){
            //not pass adminPwd parameter,but passed adminNube

            _wrapLog(thiz,"error","ButelSDK:COMBAT init,error,param [adminPwd] missed");
            error(JSON.stringify({
                "code":600,
                "msg":"param missed"
            }),"internal error");

            return;
        }else if(arguments.length >= 5 && typeof adminPwd !=="string"){
            //pass adminNube and adminPwd

            _wrapLog(thiz,"error","ButelSDK:COMBAT init,error,param [adminPwd] expected to be string");
            error(JSON.stringify({
                "code":604,
                "msg":"param type error"
            }),"internal error");

            return;
        }


        _wrapSetLogLevel(thiz,logLevel);
        _wrapSetAPIBusy(thiz,true,"init");


        var paramObj = {
            "params":{
                "account":adminNube?adminNube:_config_param.nube+"|"+_config_param.appKey,
                "password":adminPwd?adminPwd:_config_param.pwd,
                "appKey":_config_param.appKey,
                "imei":"imei",
                "productId":"all",
                "deviceType":"IOS_KESHI",
                "appType":"pc"
            },
            "service":"authorize"
        };
        var url = _host.auth+_authSignature.login+"?"+_objToParamAndSerialize(paramObj);

        _wrapLog(thiz,"log","ButelSDK:COMBAT init,start,auth request");



        //get token request
        _ajax({
            url:url,
            method:"post",
            headers:{
                'Content-Type':'text/plain;charset=utf-8'//'text/plain;charset=utf-8'
            },
            success:function(data,resultText){
                _wrapLog(thiz,"log","ButelSDK:COMBAT init,start,auth request successfully");

                if(+data.status !== 0){
                    _wrapSetAPIBusy(thiz,false,"init");
                }

                if(+data.status === 0){
                    _wrapLog(thiz,"log","ButelSDK:COMBAT init,start,auth request successfully,bindToken  meeting request");


                    var token = data["user"]["accessToken"];
                    var uid = data["user"]["uid"];
                    var paramObj = {
                        "service":"BindToken",
                        "params":{
                            "phoneId":_config_param.nube,
                            "token":token,
                            "name":_config_param.nube
                        }
                    };
                    var bindTokenUrl = _host.meeting + _meetingSignature.bindToken + "?"+_objToParamAndSerialize(paramObj);

                    //bindToken into meeting request
                    _ajax({
                        url: bindTokenUrl,
                        method:"post",
                        success: function(data,resultText){
                            _wrapLog(thiz,"log","ButelSDK:COMBAT init,start,bindToken meeting request successfully ");


                            if(+data["result"]["rc"] !== 0){
                                _wrapSetAPIBusy(thiz,false,"init");
                            }

                            if(+data["result"]["rc"] === 0){

                                _wrapLog(thiz,"log","ButelSDK:COMBAT init,start,bindToken meeting request successfully,im login request");

                                //im login request

                                _initImLogin(uid, token, thiz, function(data,resultText){
                                    _wrapLog(thiz,"log","ButelSDK:COMBAT init,start,im login request successfully");
                                    
                                    _wrapSetAPIBusy(thiz,false,"init");

                                    if(data.code === 0 || data.code === -9){
                                        _wrapLog(thiz,"log","ButelSDK:COMBAT init,done,im login request successfully,invoke success cb");
                                        _wrapSetData(thiz,"token",token);
                                        _wrapSetData(thiz,"sid",data["sid"]);

                                        _wrapSetInitStatus(thiz,true);
                                        _wrapSetTicketStatus(thiz,true);
                                        
                                        success();
                                    }else if(data.code === -7){

                                        _wrapLog(thiz,
                                            "error",
                                            "ButelSDK:COMBAT init,done,im login request successfully,but ticket invalid",
                                            JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error"
                                        );
                                        error(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error");
                                    }else if(data.code === -26){
                                        _wrapLog(thiz,
                                            "error",
                                            "ButelSDK:COMBAT init,done,im login request successfully,but service internal error",
                                            JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                                        );
                                        error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                                    }else{
                                        _wrapLog(thiz,
                                            "error",
                                            "ButelSDK:COMBAT init,done,im login request successfully,but param error",
                                            JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                                        );
                                        error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                                    }
                                }, function(err,resultText){
                                    _wrapSetAPIBusy(thiz,false,"init");
                                    _wrapLog(thiz,
                                        "error",
                                        "ButelSDK:COMBAT init,done,im login request with error",
                                        JSON.stringify(err),resultText
                                    );
                                    error(JSON.stringify(err),resultText);
                                })

                            }else if(+data["result"]["rc"] === -999){
                                _wrapLog(thiz,
                                    "error",
                                    "ButelSDK:COMBAT init,done,bindToken meeting request successfully,but service internal error",
                                    JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                                );
                                error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                            }else if(+data["result"]["rc"] === -903){
                                _wrapLog(thiz,
                                    "error",
                                    "ButelSDK:COMBAT init,done,bindToken meeting request successfully,but ticket invalid",
                                    JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error"
                                );
                                error(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error");

                            }else{
                                _wrapLog(thiz,
                                    "error",
                                    "ButelSDK:COMBAT init,done,bindToken meeting request successfully,but param error",
                                    JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                                );
                                error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                            }


                        },
                        error: function(err,resultText){
                            _wrapSetAPIBusy(thiz,false,"init");
                            _wrapLog(thiz,"error","ButelSDK:COMBAT init,done,bindToken meeting request  with error",JSON.stringify(err),resultText);
                            error(JSON.stringify(err),resultText);
                        }
                    })

                }else if(+data.status === -79){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT init,done,auth request successfully,but service internal error",
                        JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                    );
                    error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                }else if(+data.status === -1){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT init,done,auth request successfully,but param error",
                        JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                    );
                    error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                }else{
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT init,done,auth request successfully,but authentication fail",
                        JSON.stringify({"code":-1,"msg":"authentication fail"}),"business error"
                    );
                    error(JSON.stringify({"code":-1,"msg":"authentication fail"}),"business error");
                }
            },
            error:function(err,resultText){
                _wrapSetAPIBusy(thiz,false,"init");
                _wrapLog(thiz,"error","ButelSDK:COMBAT init,done,auth request  with error",JSON.stringify(err),resultText);
                error(JSON.stringify(err),resultText);
            }
        });


    }

    /**
     * @desc delete group after bind group and meeting failed
     * @param { String } groupId group id
     * @param { String } token 
     */
    function _deleteGroup(groupId,token){
        var paramObj = {
            "groupId":groupId,
            "UserToken":token,
            "manageFlg":"1"
        };
        //deleteGroup url
        var deleteGroupUrl = _host.group+_groupSignature.delGroup + "?" + _objToParamAndSerialize(paramObj);

        _ajax({
            url: deleteGroupUrl,
            method:"get",
            success: function(){},
            error: function() {}
        });
    }

    /**
     * @desc delete meeting 
     * @param { String } meetingId
     */
    function _deleteMeeting(meetingId){
        var paramObj = {
            "service":"ModifyMeetingStatus",
            "params":{
                "meetingId":meetingId,
                "status": 3 // 3 end 2 meeting
            }
        };
        //deleteMeeting url
        var deleteMeetingUrl = _host.meeting +_meetingSignature.delMeeting + "?" + _objToParamAndSerialize(paramObj);

        _ajax({
            url: deleteMeetingUrl,
            method:"post",
            success: function(){},
            error: function() {}
        });
    }

    /**
     * @desc create combat room
     * @param { String } combatName
     * @param { Array } nubes
     * @param { String } combatOwnerNube
     * @param { Function } success
     * @param { Function } error
     * */
    function createCombatRoom(combatName,nubes,combatOwnerNube,success,error){
        var thiz = this;


        _wrapLog(thiz,"log","ButelSDK:COMBAT createCombatRoom,start");
        if(!_wrapGetCanInvokeStatus(thiz,error,"createCombatRoom")){
            return;
        }


        if(typeof combatName !== "string" ){
            _wrapLog(thiz,"error","ButelSDK:COMBAT createCombatRoom,error,param [combatName] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }),"internal error");
            return;
        }else if(!(nubes instanceof Array)){
            _wrapLog(thiz,"error","ButelSDK:COMBAT createCombatRoom,error,param [nubes] expected to be array");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }),"internal error");

            return;
        }else if(typeof combatOwnerNube !== "string" ){
            _wrapLog(thiz,"error","ButelSDK:COMBAT createCombatRoom,error,param [combatOwnerNube] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }),"internal error");

            return;
        }else if(nubes["indexOf"](combatOwnerNube) < 0 ){
            _wrapLog(thiz,"error","ButelSDK:COMBAT createCombatRoom,error,param [combatOwnerNube] expected to be string in [nubes]");
            error(JSON.stringify({
                "code": 603,
                "msg": "owner nube missed in nubes",
            }),"internal error");

            return;
        }

        var token = _wrapGetData(thiz,"token");
        var invotedUsers = []

        nubes.forEach( function(item) {
            invotedUsers.push({
                "phoneId": item
            })
        })

        

        _wrapSetAPIBusy(thiz,true,"createCombatRoom");
        _wrapLog(thiz,"log","ButelSDK:COMBAT createCombatRoom,start,create meeting request");

        var effectiveHour = 365*24; // offset one year
        var startDate = Math.floor(Date.now()/1000);
        var paramObj = {
            "service":"CreateMeeting",
            "params":{
                "token":token,
                "meetingType":"2", //1 即时会议 2 预约会议
                "beginDateTime": "" + startDate,
                "effectiveHour":""+ effectiveHour,
                "app": "JIHY",
                "topic": combatName,
                "manageNube": combatOwnerNube,
                "invotedUsers": invotedUsers,
                "username":  combatOwnerNube
            }
        };

        var createMeetingUrl = _host.meeting+_meetingSignature.createMeeting+"?"+_objToParamAndSerialize(paramObj);


        // create meeting request,secondly create meeting ,lastly bind group and meeting
        _ajax({
            url:createMeetingUrl,
            method:"post",
            success:function(data,resultText){
                _wrapLog(thiz,"log","ButelSDK:COMBAT createCombatRoom,start,create meeting request successfully");

                if(data["result"]["rc"] !== 0){
                    _wrapSetAPIBusy(thiz,false,"createCombatRoom");
                }

                if(data["result"]["rc"] === 0){
                    _wrapLog(thiz,"log","ButelSDK:COMBAT createCombatRoom,start,create meeting request successfully,create group request");
                    

                    var meetingId = data["response"]["meetingId"];

                    //create group request 
                    var paramObj = {
                        "groupName":combatName,
                        "UserList":nubes["join"](","),
                        "UserToken":token,
                        "manageNube":combatOwnerNube,
						"extendInfo": "zhoucs 添加的群" + combatName
                    };

                    
                    var createGroupUrl = _host.group+_groupSignature.createGroup + "?" + _objToParamAndSerialize(paramObj);
                    _ajax({
                        url: createGroupUrl,
                        method:"post",
                        success:function(data,resultText){
                            _wrapLog(thiz,"log","ButelSDK:COMBAT createCombatRoom,start,create group request successfully");

                            if(+data.status !== 0){
                                _wrapSetAPIBusy(thiz,false,"createCombatRoom");
                                _deleteMeeting(meetingId);
                            }

                            if(+data.status === 0){

                                _wrapLog(thiz,"log","ButelSDK:COMBAT createCombatRoom,start,create group request successfully,bind group and meeting request");

                                var groupId = data["GroupDetail"]["gid"];

                                var bindGMUrl = _host.gmBridge + _gmBridgeSignature.gmBind;
                                
            
                                // bind group and meeting request
                                _ajax({
                                    url:bindGMUrl,
                                    method:"post",
                                    data:{
                                        "token":token,
                                        "groupId":groupId,
                                        "cslRoomNo":meetingId
                                    },
                                    success: function(data,resultText){
                                        _wrapLog(thiz,"log","ButelSDK:COMBAT createCombatRoom,start,bind group and meeting request successfully");
                                        _wrapSetAPIBusy(thiz,false,"createCombatRoom");

                                        if(data.code !== 0){
                                            _deleteMeeting(meetingId);
                                            _deleteGroup(groupId,token);
                                        }
            
                                        if(data.code === 0){
                                            _wrapLog(thiz,
                                                "log",
                                                "ButelSDK:COMBAT createCombatRoom,start,bind group and meeting request successfully,invoke success cb");
                                            success(JSON.stringify({"code":0,msg:"ok","data":{
                                                "groupId":""+groupId,
                                                "meetingId":""+meetingId
                                            }}),resultText)
                                        }else if(data.code === -999){
                                            _wrapLog(thiz,
                                                "error",
                                                "ButelSDK:COMBAT createCombatRoom,done,bind group and meeting request successfully,but service internal error",
                                                JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                                            );
                                            error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                                        }else if(data.code === -907){
                                            _wrapSetTicketStatus(thiz,false);
                                            _wrapLog(thiz,
                                                "error",
                                                "ButelSDK:COMBAT createCombatRoom,done,bind group and meeting request successfully,but ticket invalid",
                                                JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error"
                                            );
                                            error(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error");
                                        }else{
                                            _wrapLog(thiz,
                                                "error",
                                                "ButelSDK:COMBAT createCombatRoom,done,bind group and meeting request successfully,but param error",
                                                JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                                            );
                                            error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                                        }
                                    },
                                    error:function(err,resultText){
                                        _deleteGroup(groupId,token);
                                        _deleteMeeting(meetingId);
                                        _wrapSetAPIBusy(thiz,false,"createCombatRoom");
                                        _wrapLog(thiz,
                                            "error",
                                            "ButelSDK:COMBAT createCombatRoom,done,bind group and meeting request with error",
                                            JSON.stringify(err),resultText);
                                        error(JSON.stringify(err),resultText);
                                    }
                                })
                                

                            }else if(+data.status === -5){
                                _wrapLog(thiz,
                                    "error",
                                    "ButelSDK:COMBAT createCombatRoom,done,create group request successfully,but service internal error",
                                    JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                                );
                                error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                            }else if(+data.status === -211){
                                _wrapLog(thiz,
                                    "error",
                                    "ButelSDK:COMBAT createCombatRoom,done,create group request successfully,but no valid user",
                                    JSON.stringify({"code":-6,"msg":"no valid user"}),"business error"
                                );
                                error(JSON.stringify({"code":-6,"msg":"no valid user"}),"business error");
                            }else if(+data.status === -201){
                                _wrapSetTicketStatus(thiz,false);
                                _wrapLog(thiz,
                                    "error",
                                    "ButelSDK:COMBAT createCombatRoom,done,create group request successfully,but ticket invalid",
                                    JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error"
                                );
                                error(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error");
                            }else{
                                _wrapLog(thiz,
                                    "error",
                                    "ButelSDK:COMBAT createCombatRoom,done,create group request successfully,but param error",
                                    JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                                );
                                error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                            }


                        },
                        error:function(err,resultText){
                            _deleteMeeting(meetingId);
                            _wrapSetAPIBusy(thiz,false,"createCombatRoom");
                            _wrapLog(thiz,"error","ButelSDK:COMBAT createCombatRoom,done,create group request with error",JSON.stringify(err),resultText);
                            error(JSON.stringify(err),resultText);
                        }
                    })
                   
                    
                }else  if(data["result"]["rc"] === -999){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT createCombatRoom,done,create meeting request successfully,but service internal error",
                        JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                    );
                    error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                }else if(data["result"]["rc"] === -902){
                    _wrapSetTicketStatus(thiz,false);
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT createCombatRoom,done,create meeting request successfully,but ticket invalid",
                        JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error"
                    );
                    error(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error");
                }else{
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT createCombatRoom,done,create meeting request successfully,but param error",
                        JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                    );
                    error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                }
            },
            error:function(err,resultText){
                _wrapSetAPIBusy(thiz,false,"createCombatRoom");
                _wrapLog(thiz,"error","ButelSDK:COMBAT createCombatRoom,done,create meeting request with error",JSON.stringify(err),resultText);
                error(JSON.stringify(err),resultText);
            }
        })

        


    }

    /**
     * @desc edit combat room name
     * @param { String } groupId
     * @param { String } combatName
     * @param { Function } success
     * @param { Function } error
     * */
    function editCombatName(groupId,combatName,success,error){
        var thiz = this;

        _wrapLog(thiz,"log","ButelSDK:COMBAT editCombatName,start");
        if(!_wrapGetCanInvokeStatus(thiz,error,"editCombatName")){
            return;
        }

        /*if(!_wrapGetInitStatus(thiz)){
            _wrapLog(thiz,"error","ButelSDK:COMBAT editCombatName,error,have to init before invoking this function");
            error(JSON.stringify({
                "code": 602,
                "msg": "no init",
            }),"internal error");

            return;
        }*/

        if(typeof groupId !== "string"){
            _wrapLog(thiz,"error","ButelSDK:COMBAT editCombatName,error,param [groupId] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }),"internal error");
            return;
        }else if(typeof combatName !== "string"){
            _wrapLog(thiz,"error","ButelSDK:COMBAT editCombatName,error,param [combatName] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }),"internal error");
            return;
        }


        var paramObj = {
            "groupId":groupId,
            "groupName":combatName,
            "UserToken":_wrapGetData(thiz,"token")
        };
        //editGroupName url
        var editGroupNameUrl = _host.group+_groupSignature.editGroupName + "?" + _objToParamAndSerialize(paramObj);

        _wrapSetAPIBusy(thiz,true,"editCombatName");
        _wrapLog(thiz,"log","ButelSDK:COMBAT editCombatName,start,editGroupName request");
        _ajax({
            url: editGroupNameUrl,
            method:"get",
            success:function(data,resultText){
                _wrapLog(thiz,"log","ButelSDK:COMBAT editCombatName,start,editGroupName request successfully");
                _wrapSetAPIBusy(thiz,false,"editCombatName");
                if(+data.status === 0){
                    _wrapLog(thiz,"log","ButelSDK:COMBAT editCombatName,done,editGroupName request successfully,invoke success cb");
                    success(JSON.stringify({"code":0,"msg":"ok","data":null}),resultText);
                }else if(+data.status === -5){

                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT editCombatName,done,editGroupName request successfully,but service internal error",
                        JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                    );
                    error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                }else if(+data.status === -201){
                    _wrapSetTicketStatus(thiz,false);
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT editCombatName,done,editGroupName request successfully,but ticket invalid",
                        JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error"
                    );
                    error(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error");
                }else {
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT editCombatName,done,editGroupNamep request successfully,but param error",
                        JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                    );
                    error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                }
            },
            error:function(err,resultText){
                _wrapSetAPIBusy(thiz,false,"editCombatName");
                _wrapLog(thiz,"error","ButelSDK:COMBAT editCombatName,error, editGroupName request with error",JSON.stringify(err),resultText);
                error(JSON.stringify(err),resultText);
            }
        })

    }

    /**
     * @desc add member
     * @param { String }  groupId
     * @param { Array } nubes
     * @param { Function } success
     * @param { Function } error
     * */
    function addMember(groupId,nubes,success,error){
        var thiz = this;


        _wrapLog(thiz,"log","ButelSDK:COMBAT addMember,start");
        if(!_wrapGetCanInvokeStatus(thiz,error,"addMember")){
            return;
        }

        /*if(!_wrapGetInitStatus(thiz)){
            _wrapLog(thiz,"error","ButelSDK:COMBAT addMember,error,have to init before invoking this function");
            error(JSON.stringify({
                "code": 602,
                "msg": "no init",
            }),"internal error");

            return;
        }*/

        if(typeof groupId !== "string"){
            _wrapLog(thiz,"error","ButelSDK:COMBAT addMember,error,param [groupId] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }),"internal error");
            return;
        }else if( !(nubes instanceof Array) ){
            _wrapLog(thiz,"error","ButelSDK:COMBAT addMember,error,param [nubes] expected to be array");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }),"internal error");
            return;
        }


        var paramObj = {
            "groupId":groupId,
            "UserList":nubes["join"](","),
            "UserToken":_wrapGetData(thiz,"token")
        };
        //addMember url
        var addMemberUrl = _host.group+_groupSignature.addMember + "?" + _objToParamAndSerialize(paramObj);
        _wrapLog(thiz,"log","ButelSDK:COMBAT addMember,start,addMember request");
        _wrapSetAPIBusy(thiz,true,"addMember");
        _ajax({
            url: addMemberUrl,
            method:"get",
            success:function(data,resultText){
                _wrapLog(thiz,"log","ButelSDK:COMBAT addMember,start,addMember request successfully");
                _wrapSetAPIBusy(thiz,false,"addMember");

                if(+data.status === 0){
                    var users = [];
                    data["AddUsers"].forEach(function(user){
                        users.push(user["nubeNumber"]);
                    });
                    _wrapLog(thiz,"log","ButelSDK:COMBAT addMember,done,addMember request successfully,invoke success cb");
                    success(JSON.stringify({"code":0,"msg":"ok","data":users}),resultText);
                }else if(+data.status === -5){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT addMember,done,addMember request successfully,but service internal error",
                        JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                    );
                    error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                }else if(+data.status === -211){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT addMember,done,addMember request successfully,but no valid user",
                        JSON.stringify({"code":-6,"msg":"no valid user"}),"business error"
                    );
                    error(JSON.stringify({"code":-6,"msg":"no valid user"}),"business error");
                }else if(+data.status === -201){
                    _wrapSetTicketStatus(thiz,false);
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT addMember,done,addMember request successfully,but ticket invalid",
                        JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error"
                    );
                    error(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error");
                }else if(+data.status === -209){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT addMember,done,addMember request successfully,but user had added",
                        JSON.stringify({"code":-4,"msg":"user had added"}),"business error"
                    );
                    error(JSON.stringify({"code":-4,"msg":"user had added"}),"business error");
                }else {
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT addMember,done,addMember request successfully,but param error",
                        JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                    );
                    error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                }
            },
            error:function(err,resultText){
                _wrapSetAPIBusy(thiz,false,"addMember");
                _wrapLog(thiz,"error","ButelSDK:COMBAT addMember,error,addMember request with error",JSON.stringify(err),resultText);
                error(JSON.stringify(err),resultText);
            }
        })
    }

    /**
     * @desc remove member
     * @param { String } groupId
     * @param { Array } nubes
     * @param { Function } success
     * @param { Function } error
     * */
    function removeMember(groupId,nubes,success,error){
        var thiz = this;


        _wrapLog(thiz,"log","ButelSDK:COMBAT removeMember,start");
        if(!_wrapGetCanInvokeStatus(thiz,error,"removeMember")){
            return;
        }

        if(typeof groupId !== "string"){
            _wrapLog(thiz,"error","ButelSDK:COMBAT removeMember,error,param [groupId] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }),"internal error");
            return;
        }else if( !(nubes instanceof Array) ){
            _wrapLog(thiz,"error","ButelSDK:COMBAT removeMember,error,param [nubes] expected to be array");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }),"internal error");
            return;
        }


        var paramObj = {
            "groupId":groupId,
            "UserList":nubes["join"](","),
            "UserToken":_wrapGetData(thiz,"token"),
            "manageFlg":"1"
        };
        //removeMember url
        var removeMemberUrl = _host.group+_groupSignature.delMember + "?" + _objToParamAndSerialize(paramObj);

        _wrapSetAPIBusy(thiz,true,"removeMember");
        _wrapLog(thiz,"log","ButelSDK:COMBAT removeMember,start,removeMember request");

        _ajax({
            url: removeMemberUrl,
            method:"get",
            success:function(data,resultText){
                _wrapLog(thiz,"log","ButelSDK:COMBAT removeMember,start,removeMember request successfully");
                _wrapSetAPIBusy(thiz,false,"removeMember");
                if(+data.status === 0){
                    var users = [];
                    data["DeleteUsers"].forEach(function(user){
                        users.push(user["nubeNumber"]);
                    });
                    _wrapLog(thiz,"log","ButelSDK:COMBAT removeMember,done,removeMember request successfully,invoke success cb");
                    success(JSON.stringify({"code":0,"msg":"ok","data":users}),resultText);
                }else if(+data.status === -5){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT removeMember,done,removeMember request successfully,but service internal error",
                        JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                    );
                    error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                }else if(+data.status === -205){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT removeMember,done,removeMember request successfully,but invalid group member",
                        JSON.stringify({"code":-7,"msg":"invalid group member"}),"business error"
                    );
                    error(JSON.stringify({"code":-7,"msg":"invalid group member"}),"business error");
                }else if(+data.status === -204){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT removeMember,done,removeMember request successfully,but no authority delete user",
                        JSON.stringify({"code":-5,"msg":"no authority delete user"}),"business error"
                    );
                    error(JSON.stringify({"code":-5,"msg":"no authority delete user"}),"business error");

                }else if(+data.status === -201){
                    _wrapSetTicketStatus(thiz,false)
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT removeMember,done,removeMember request successfully,but ticket invalid",
                        JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error"
                    );
                    error(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error");
                }else {
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT removeMember,done,removeMember request successfully,but param error",
                        JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                    );
                    error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                }
            },
            error:function(err,resultText){
                _wrapSetAPIBusy(thiz,false,"removeMember");
                _wrapLog(thiz,"error","ButelSDK:COMBAT removeMember,error,removeMember request with error",JSON.stringify(err),resultText);
                error(JSON.stringify(err),resultText);
            }
        })
    }


    /**
     * @desc delete combat room
     * @param { String } groupId
     * @param { String } meetingId
     * @param { Function } success
     * @param { Function } error
     * */
    function deleteCombatRoom(groupId,meetingId,success,error){
        var thiz = this;

        _wrapLog(thiz,"log","ButelSDK:COMBAT deleCombatRoom,start");

        if(!_wrapGetCanInvokeStatus(thiz,error,"deleCombatRoom")){
            return;
        }

        /*if(!_wrapGetInitStatus(thiz)){
            _wrapLog(thiz,"error","ButelSDK:COMBAT deleCombatRoom,error,have to init before invoking this function");
            error(JSON.stringify({
                "code": 602,
                "msg": "no init",
            }),"internal error");

            return;
        }*/

        if(typeof groupId !== "string") {
            _wrapLog(thiz, "error", "ButelSDK:COMBAT deleCombatRoom,error,param [groupId] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }), "internal error");
            return;
        }
        
        if(typeof meetingId !== "string") {
            _wrapLog(thiz, "error", "ButelSDK:COMBAT deleCombatRoom,error,param [meetingId] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }), "internal error");
            return;
        }


        var paramObj = {
            "groupId":groupId,
            "UserToken":_wrapGetData(thiz,"token"),
            "manageFlg":"1"
        };
        //deleteGroup url
        var deleteGroupUrl = _host.group+_groupSignature.delGroup + "?" + _objToParamAndSerialize(paramObj);

        _wrapSetAPIBusy(thiz,true,"deleteCombatRoom");
        _wrapLog(thiz,"log","ButelSDK:COMBAT deleteCombatRoom,start,deleteGroup request");
        _ajax({
            url: deleteGroupUrl,
            method:"get",
            success:function(data,resultText){
                _wrapLog(thiz,"log","ButelSDK:COMBAT deleteCombatRoom,start,deleteGroup request successfully");
                _wrapSetAPIBusy(thiz,false,"deleteCombatRoom");
                if(+data.status === 0){
                    _deleteMeeting(meetingId); //delete meeting
                    
                    _wrapLog(thiz,"log","ButelSDK:COMBAT deleteCombatRoom,done,deleteGroup request successfully,invoke success cb");
                    success(JSON.stringify({"code":0,"msg":"ok","data":null}),resultText);
                }else if(+data.status === -5){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT deleteCombatRoom,done,deleteGroup request successfully,but service internal error",
                        JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                    );
                    error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                }else if(+data.status === -201){
                    _wrapSetTicketStatus(thiz,false)
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT deleteCombatRoom,done,deleteGroup request successfully,but ticket invalid",
                        JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error"
                    );
                    error(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error");
                }else if(+data.status === -202){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT deleteCombatRoom,done,deleteGroup request successfully,but invalid group",
                        JSON.stringify({"code":-9,"msg":"invalid group"}),"business error"
                    );
                    error(JSON.stringify({"code":-9,"msg":"invalid group"}),"business error");
                }else {
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT deleteCombatRoom,done,deleteGroup request successfully,but param error",
                        JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                    );
                    error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                }

            },
            error:function(err,resultText){
                _wrapSetAPIBusy(thiz,false,"deleteCombatRoom");
                _wrapLog(thiz,"error","ButelSDK:COMBAT deleteCombatRoom,error,deleteGroup request with error",JSON.stringify(err),resultText);
                error(JSON.stringify(err),resultText);
            }
        })
    }

    /**
     * @desc get group messages
     * @param { String } groupId
     * @param { Number } beginTime
     * @param { Number } endTime
     * @param { Number } maxNum
     * @param { String } ind
     * @param { Function } success
     * @param { Function } error
     * */
    function getGroupMessages(groupId,beginTime,endTime,maxNum,ind,success,error){
        var thiz = this;


        _wrapLog(thiz,"log","ButelSDK:COMBAT getGroupMessages,start");
        if(!_wrapGetCanInvokeStatus(thiz,error,"getGroupMessages")){
            return;
        }

        /*if(!_wrapGetInitStatus(thiz)){
            _wrapLog(thiz,"error","ButelSDK:COMBAT getGroupMessages,error,have to init before invoking this function");
            error(JSON.stringify({
                "code": 602,
                "msg": "no init",
            }),"internal error");

            return;
        }*/

        if(typeof groupId !== "string") {
            _wrapLog(thiz, "error", "ButelSDK:COMBAT getGroupMessages,error,param [groupId] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }), "internal error");
            return;
        }else if(typeof beginTime !== "number") {
            _wrapLog(thiz, "error", "ButelSDK:COMBAT getGroupMessages,error,param [beginTime] expected to be number");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }), "internal error");
            return;
        }else if(typeof endTime !== "number") {
            _wrapLog(thiz, "error", "ButelSDK:COMBAT getGroupMessages,error,param [endTime] expected to be number");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }), "internal error");
            return;
        }else if(typeof maxNum !== "number") {
            _wrapLog(thiz, "error", "ButelSDK:COMBAT getGroupMessages,error,param [maxNum] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }), "internal error");
            return;
        }else if(typeof ind !== "string") {
            _wrapLog(thiz, "error", "ButelSDK:COMBAT getGroupMessages,error,param [index] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }), "internal error");
            return;
        }

        var sid = _wrapGetData(thiz,"sid");




        _wrapSetAPIBusy(thiz,true,"getGroupMessages");
        _wrapLog(thiz,"log","ButelSDK:COMBAT getGroupMessages,start,getMessage request");

        //getMessage url
        var getMessageUrl = _host.imMessage;

        _ajax({
            url: getMessageUrl,
            method:"post",
            data:{
                "cmd_name":_imMessageSignature.getHistoryMsg,
                "parameter":{
                    "dest_id":groupId,
                    "dest_type":"0", //0 group id ; 1 nube
                    "begin_time":""+beginTime,
                    "end_time": ""+endTime,
                    "max_num": ""+maxNum,
                    "sid": sid,
                    "index":ind
                }
            },
            success:function(data,resultText){
                _wrapLog(thiz,"log","ButelSDK:COMBAT getGroupMessages,start,getMessage request successfully");
                _wrapSetAPIBusy(thiz,false,"getGroupMessages");
                if(data.code === 0){

                    _wrapLog(thiz,"log","ButelSDK:COMBAT getGroupMessages,done,getMsg request successfully,invoke success cb");

                    var ind = data["index"];

                    var res = {
                        "index":ind,
                        "msgs":[]
                    };

                    if(data["msgs"]){
                        data["msgs"].forEach(function(msg){
                            res["msgs"].push(_filterMessage(msg))
                        });

                        data["msgs"] = null;
                    }


                    success(JSON.stringify({"code":0,"msg":"ok","data":res}),resultText);



                }else if(data.code === -2){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT getGroupMessages,done,getMessage request successfully,but param error",
                        JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                    );
                    error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                }else if(data.code === -7 || data.code === -10){
                    _wrapSetTicketStatus(thiz,false);
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT getGroupMessages,done,getMessage request successfully,but ticket invalid",
                        JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error"
                    );
                    error(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error");
                }else if(data.code === 154){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT getGroupMessages,done,getMessage request successfully,but group no msgs",
                        JSON.stringify({"code":-8,"msg":"group no msgs"}),"business error"
                    );
                    error(JSON.stringify({"code":-8,"msg":"group no msgs"}),"business error");
                }else {
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT getGroupMessages,done,getMessage request successfully,but service internal error",
                        JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                    );
                    error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                }
            },
            error:function(err,resultText){
                _wrapSetAPIBusy(thiz,false,"getGroupMessages");
                _wrapLog(thiz,"error","ButelSDK:COMBAT getGroupMessages,error,getMessage sid request with error",JSON.stringify(err),resultText);
                error(JSON.stringify(err),resultText);
            }
        })
    }



    /**
     * @desc release
     * @param { Function } success
     * @param { Function } error
     * */
    function release(success,error){
        var thiz = this;

        _wrapLog(thiz,"log","ButelSDK:COMBAT release,start");
        if(!_wrapGetCanInvokeStatus(thiz,error,"release")){
            return;
        }


        _wrapLog(thiz,"log","ButelSDK:COMBAT release done");

        _wrapSetLogLevel(thiz,1);
        _wrapSetInitStatus(thiz,false);
        _wrapSetAPIBusy(thiz,false,"");


        thiz["_data"] = null;
        thiz["_data"] = {};

        success();
    }



    /**
     * @desc return true for error , otherwise, return false for valid
     * @param { Array } userList
     * @param { Object } thiz
     * @param { Function } error
     * */
    function _modifyNicknameUserListVerify(userList,thiz,error){

        if(!userList instanceof Array){
            _wrapLog(thiz,"error","ButelSDK:COMBAT modifyNickname,error,param [userList] expected to be array");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }),"internal error");
            return true;
        }else {
            userList.forEach(function(user){

                if(!user.hasOwnProperty("nube") || typeof user["nube"] !== "string"){
                    _wrapLog(thiz,"error","ButelSDK:COMBAT modifyNickname,error,param [userList:{nube}] expected to be string");
                    error(JSON.stringify({
                        "code": 604,
                        "msg": "param type error",
                    }),"internal error");

                    return true;
                }else if(!user.hasOwnProperty("nickname") || typeof user["nickname"] !== "string"){
                    _wrapLog(thiz,"error","ButelSDK:COMBAT modifyNickname,error,param [userList:{nickname}] expected to be string");
                    error(JSON.stringify({
                        "code": 604,
                        "msg": "param type error",
                    }),"internal error");

                    return true;
                }
            })
        }

        return false;
    }


    /**
     * @desc modify nickname
     * @param { Array } userList
     * @param { Function } success
     * @param { Function } error
     * */
    function modifyNickname(userList,success,error){
        var thiz = this;


        _wrapLog(thiz,"log","ButelSDK:COMBAT modifyNickname,start");
        if(!_wrapGetCanInvokeStatus(thiz,error,"modifyNickname") || _modifyNicknameUserListVerify(userList,thiz,error)){
            return;
        }




        var paramObj = {
            "userList":userList,
            "token":_wrapGetData(thiz,"token")
        };

        var bindGMModifyNicknameUrl = _host.gmBridge + _gmBridgeSignature.gmModifyNickname;

        _wrapSetAPIBusy(thiz,true,"modifyNickname");
        _wrapLog(thiz,"log","ButelSDK:COMBAT modifyNickname,start,modifyNickname request");

        _ajax({
            url: bindGMModifyNicknameUrl,
            method:"post",
            data:paramObj,
            success:function(data,resultText){
                _wrapLog(thiz,"log","ButelSDK:COMBAT modifyNickname,start,modifyNickname request successfully");
                _wrapSetAPIBusy(thiz,false,"modifyNickname");


                if(data.code === 0){
                    _wrapLog(thiz,
                        "log",
                        "ButelSDK:COMBAT modifyNickname,done,modifyNickname request,invoke success cb");
                    success(JSON.stringify({"code":0,msg:"ok","data":data["data"]}),resultText)
                }else if(data.code === -999){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT modifyNickname,done,modifyNickname request successfully,but service internal error",
                        JSON.stringify({"code":-999,"msg":"service internal error"}),"business error"
                    );
                    error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                }else if(data.code === -907){
                    _wrapSetTicketStatus(thiz,false);
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT modifyNickname,done,modifyNickname request successfully,but ticket invalid",
                        JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error"
                    );
                    error(JSON.stringify({"code":-2,"msg":"ticket invalid"}),"business error");
                }else{
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:COMBAT modifyNickname,done,modifyNickname request successfully,but param error",
                        JSON.stringify({"code":-3,"msg":"param error"}),"business error"
                    );
                    error(JSON.stringify({"code":-3,"msg":"param error"}),"business error");
                }
            },
            error:function(err,resultText){
                _wrapSetAPIBusy(thiz,false,"modifyNickname");
                _wrapLog(thiz,"error","ButelSDK:COMBAT modifyNickname,error,modifyNickname request with error",JSON.stringify(err),resultText);
                error(JSON.stringify(err),resultText);
            }
        })
    }


    /**
     * @desc return ButelSDK:AGENT API true or false representing  whether it can invoke function,
     * @param { Object } thiz,ButelSDK:AGENT instance
     * @param { Function } cb,error callback
     * @param { String } funcName,api function name
     * @param { Boolean } external,whether the function  is enterGroup or enterMeeting
     * @return { Boolean }
     * */
    function _wrapGetCanInvokeAgentExceptChatMonitor(thiz,cb,funcName,external){
        var busyObj = _wrapGetAPIBusy(thiz);


        //for sdk instance or enter chat and meeting
        if(busyObj["busy"]){
            _wrapLog(thiz,"error","ButelSDK:AGENT "+funcName+",error,["+busyObj["busy_apiName"]+"] being busy");
            cb(JSON.stringify({
                "code": 606,
                "msg": "["+busyObj["busy_apiName"]+"] being busy"
            }),"internal error");
            return false;
        }

        //for sdk  instance except its init function
        if(!_wrapGetInitStatus(thiz) && funcName !== "init"){
            _wrapLog(thiz,"error","ButelSDK:AGENT "+funcName+",error,have to init before invoking this function");
            cb(JSON.stringify({
                "code": 602,
                "msg": "no init",
            }),"internal error");

            return false;
        }else if(_wrapGetInitStatus(thiz) && funcName === "init"){
            //for sdk instance of init function

            _wrapLog(thiz,"error","ButelSDK:AGENT init,error,had initialized ");
            cb(JSON.stringify({
                "code": 605,
                "msg": "had initialized",
            }),"internal error");
            return false;
        }

        return true;
    }


    /**
     * @param { Object } thiz,
     * @param { String } nube
     * @param { String } pwd
     * @param { Function } success
     * @param { Function } error
     * */
    function _imLogin(thiz,nube,pwd,success,error,funcName){
        funcName = funcName ? funcName : "_imLogin";
        // setup im
        _setUpIm(nube,pwd);
        _wrapLog(thiz,"log","ButelSDK:AGENT "+funcName+",start,setup im");


        var attempts = 0;
        var maxAttempts = 10;

        _wrapLog(thiz,"log","ButelSDK:AGENT "+funcName+",start,login request");
        call();


        function call() {
            var loopAjaxXhr = _ajax({
                method: 'get',
                url: _host.imLocal + _imLocalSignature.login + '?nube=' + nube + '&pwd=' + pwd,
                success: function(data,resultText) {
                    if(!_wrapGetData(thiz,"release")){

                        if(data.code === 0){
                            _wrapLog(thiz,"log","ButelSDK:AGENT "+funcName+",done,login request successfully,invoke success cb");
                            success(JSON.stringify({"code":0,"msg":"ok","data":null}),resultText);

                        }else if(data.code === -991){
                            // app authenticating
                            if( attempts < maxAttempts){
                                attempts++;
                                _wrapLog(thiz,"warn","ButelSDK:AGENT "+funcName+",warn,app authenticating");
                                _wrapLog(thiz,"warn","ButelSDK:AGENT "+funcName+",warn,login request retry "+attempts+" time");

                                window.setTimeout(call,2000)
                            }else{
                                _wrapLog(thiz,
                                    "error",
                                    "ButelSDK:AGENT "+funcName+",done,login request successfully,but app authenticating",
                                    JSON.stringify({"code":-996,"msg":"app authenticating"}),"business error"
                                );
                                error(JSON.stringify({"code":-996,"msg":"app authenticating"}),"business error");
                            }

                        }else if(data.code === -994){
                            _wrapLog(thiz,
                                "error",
                                "ButelSDK:AGENT "+funcName+",done,login request successfully,but fail to switch user",
                                JSON.stringify({"code":-995,"msg":"fail to switch user"}),"business error"
                            );
                            error(JSON.stringify({"code":-995,"msg":"fail to switch user"}),"business error");
                        }else {
                            _wrapLog(thiz,
                                "error",
                                "ButelSDK:AGENT "+funcName+",done,login request successfully,but service internal error",
                                JSON.stringify({"code":-999,"msg":"service internal error"}),"business error,"+ data.msg
                            );
                            error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
                        }
                    }

                },
                error: function(err,resultText) {
                    if(!_wrapGetData(thiz,"release")){
                        if(err.code >=98 && err.code <600 &&  attempts < maxAttempts ){
                            attempts++;
                            _wrapLog(thiz,"warn","ButelSDK:AGENT "+funcName+",warn,login request retry "+attempts+" time");

                            window.setTimeout(call,2000)
                        }else{
                            _wrapLog(thiz,"error","ButelSDK:AGENT "+funcName+",error,login request with error",JSON.stringify(err),resultText);
                            error(JSON.stringify(err),resultText);
                        }
                    }
                }
            });

            _wrapSetData(thiz,"loopAjaxXhr",loopAjaxXhr);
        }
    }

    /**
     * @desc initialize config required
     * @param { Number } logLevel;enum {0,1,2,3,4}
     * @param { String } nube;
     * @param { String } pwd;
     * @param { Function } success;callback
     * @param { Function } error;callback
     * */
    function agentInit(logLevel,nube,pwd,success,error){
        var thiz = this;


        if(!_wrapGetCanInvokeAgentExceptChatMonitor(thiz,error,"init")){
            return;
        }

        //logLevel is not number or value
        if(typeof logLevel !== "number" || (typeof logLevel === "number" && (logLevel < 0 || logLevel > 4 ))){
            window.error("ButelSDK:AGENT init,error,param [logLevel] expected to be number between 0 and 4");
            error(JSON.stringify({
                "code":601,
                "msg":"logLevel error"
            }),"internal error");


            return;
        }

        _wrapSetLogLevel(thiz,logLevel);


        if(typeof nube !== "string"){
            _wrapLog(thiz,"error","ButelSDK:AGENT init,error,param [nube] expected to be string");
            error(JSON.stringify({
                "code":604,
                "msg":"param type error"
            }),"internal error");
        }else if(typeof pwd !== "string"){
            _wrapLog(thiz,"error","ButelSDK:AGENT init,error,param [pwd] expected to be string");
            error(JSON.stringify({
                "code":604,
                "msg":"param type error"
            }),"internal error");
        }

        _wrapSetAPIBusy(thiz,true,"init");

        _wrapSetData(thiz,"release",false);
        _wrapSetData(thiz,"nube",nube);
        _wrapSetData(thiz,"pwd",pwd);


        _imLogin(thiz,nube,pwd,function(data,resultText){
            _wrapSetAPIBusy(thiz,false,"init");
            _wrapSetInitStatus(thiz,true);

            success(data,resultText);

            _wrapSetData(thiz,"loop",true);


            _loopGetGroupMessageStatus(thiz);
        },function(data,resultText){
            _wrapSetAPIBusy(thiz,false,"init");
            error(data,resultText)
        },"init");
    }


    /**
     * @desc enter group
     * @param { String } groupId
     * @param { Function } success
     * @param { Function } error
     * */
    function agentEnterChat(groupId,success,error){
        var thiz = this;


        _wrapLog(thiz,"log","ButelSDK:AGENT enterChat,start");
        if(!_wrapGetCanInvokeAgentExceptChatMonitor(thiz,error,"enterChat")){
            return;
        }

        if(typeof groupId !== "string") {
            _wrapLog(thiz, "error", "ButelSDK:AGENT enterChat,error,param [groupId] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }), "internal error");
            return;
        }

        _wrapSetAPIBusy(thiz,true,"enterChat");

        _wrapLog(thiz,"log","ButelSDK:AGENT enterChat,start,enterChat request");

        var nube = _wrapGetData(thiz,"nube");
        var pwd = _wrapGetData(thiz,"pwd");

        var enterGroupUrl = _host.imLocal + _imLocalSignature.enterGroup + '?groupId=' + groupId+ '&nube=' + nube + '&pwd=' + pwd;
        var _success = function(data,resultText) {
            _wrapSetAPIBusy(thiz,false,"enterChat");
            _wrapLog(thiz,"log","ButelSDK:AGENT enterChat,done,enterChat request successfully");

            if(data.code === 0){
                _wrapLog(thiz,"log","ButelSDK:AGENT enterChat,done,enterChat request successfully,invoke success cb");
                success(JSON.stringify({"code":0,"msg":"ok","data":null}),resultText);
            }else if(data.code === -993){
                _wrapLog(thiz,
                    "error",
                    "ButelSDK:AGENT enterChat,done,enterChat request successfully,but invalid group member",
                    JSON.stringify({"code":-994,"msg":"invalid group member"}),"business error"
                );
                error(JSON.stringify({"code":-994,"msg":"invalid group member"}),"business error");
            }else if(data.code === -998){
                _wrapLog(thiz,
                    "error",
                    "ButelSDK:AGENT enterChat,done,enterChat request successfully,but group not found",
                    JSON.stringify({"code":-998,"msg":"group not found"}),"business error"
                );
                error(JSON.stringify({"code":-998,"msg":"group not found"}),"business error");
            }else {
                _wrapLog(thiz,
                    "error",
                    "ButelSDK:AGENT enterChat,done,enterChat request successfully,but service internal error",
                    JSON.stringify({"code":-999,"msg":"service internal error"}),"business error,"+ data.msg
                );
                error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
            }
        };
        var _error = function(err,resultText) {
            _wrapSetAPIBusy(thiz,false,"enterChat");
            _wrapLog(thiz,"error","ButelSDK:AGENT enterChat,error,enterChat request with error",JSON.stringify(err),resultText);
            error(JSON.stringify(err),resultText);

        };

        _ajax({
            method: 'get',
            url: enterGroupUrl,
            success: _success,
            error: function(err,resultText) {

                //startUp im
                _imLogin(thiz,nube,pwd,function(){
                    //success im
                    _ajax({
                        method: 'get',
                        url: enterGroupUrl,
                        success: _success,
                        error: _error
                    })
                },function(err,resultText){
                    //fail startUp im
                    if( err.code>=98 && err.code <600 ){
                        _error(err,resultText);
                    }else{
                        //success startUp im but code < 0
                        _ajax({
                            method: 'get',
                            url: enterGroupUrl,
                            success: _success,
                            error: _error
                        })
                    }
                } ,'_imLogin_enterChat');

            }
        });


    }

    /**
     * @desc enter meeting
     * @param { String } meetingId
     * @param { Function } success
     * @param { Function } error
     * */
    function agentEnterMeeting(meetingId,success,error){
        var thiz = this;


        _wrapLog(thiz,"log","ButelSDK:AGENT enterMeeting,start");
        if(!_wrapGetCanInvokeAgentExceptChatMonitor(thiz,error,"enterMeeting")){
            return;
        }

        if(typeof meetingId !== "string") {
            _wrapLog(thiz, "error", "ButelSDK:AGENT enterMeeting,error,param [meetingId] expected to be string");
            error(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }), "internal error");
            return;
        }

        _wrapSetAPIBusy(thiz,true,"enterMeeting");

        _wrapLog(thiz,"log","ButelSDK:AGENT enterMeeting,start,enterMeeting request");

        var nube = _wrapGetData(thiz,"nube");
        var pwd = _wrapGetData(thiz,"pwd");

        var enterMeetingUrl = _host.imLocal + _imLocalSignature.enterMeeting + '?meetingId=' + meetingId+ '&nube=' + nube + '&pwd=' + pwd;
        var _success = function(data,resultText) {
            _wrapSetAPIBusy(thiz,false,"enterMeeting");
            _wrapLog(thiz,"log","ButelSDK:AGENT enterMeeting,done,enterMeeting request successfully");

            if(data.code === 0){
                _wrapLog(thiz,"log","ButelSDK:AGENT enterMeeting,done,enterMeeting request successfully,invoke success cb");
                success(JSON.stringify({"code":0,"msg":"ok","data":null}),resultText);
            }else if(data.code === -994){
                _wrapLog(thiz,
                    "error",
                    "ButelSDK:AGENT enterMeeting,done,enterMeeting request successfully,but fail to switch user",
                    JSON.stringify({"code":-995,"msg":"fail to switch user"}),"business error"
                );
                error(JSON.stringify({"code":-995,"msg":"fail to switch user"}),"business error");
            }else {
                _wrapLog(thiz,
                    "error",
                    "ButelSDK:AGENT enterMeeting,done,enterMeeting request successfully,but service internal error",
                    JSON.stringify({"code":-999,"msg":"service internal error"}),"business error" + data.msg
                );
                error(JSON.stringify({"code":-999,"msg":"service internal error"}),"business error");
            }
        };
        var _error = function(err,resultText) {
            _wrapSetAPIBusy(thiz,false,"enterMeeting");
            _wrapLog(thiz,"error","ButelSDK:AGENT enterMeeting,error,enterMeeting request with error",JSON.stringify(err),resultText);
            error(JSON.stringify(err),resultText);

        };

        _ajax({
            method: 'get',
            url: enterMeetingUrl,
            success: _success,
            error: function(err,resultText) {

                //startUp im
                _imLogin(thiz,nube,pwd,function(){
                    //success im
                    _ajax({
                        method: 'get',
                        url: enterMeetingUrl,
                        success: _success,
                        error: _error
                    })
                },function(err,resultText){
                    //fail startUp im
                    if( err.code>=98 && err.code <600 ){
                        _error(err,resultText);
                    }else{
                        //success startUp im but code < 0
                        _ajax({
                            method: 'get',
                            url: enterMeetingUrl,
                            success: _success,
                            error: _error
                        })
                    }
                } ,'_imLogin_enterMeeting');

            }
        });

    }

    /**
     * @desc can invoke addChatMonitor or removeChatMonitor
     * @param { Object } thiz,ButelSDK:COMBAT instance
     * @param { Function } cb,error callback
     * @param { String } funcName,api function name
     * @param { Array } groupIds
     * */
    function _wrapCanInvokeChatMonitor(thiz,cb,funcName,groupIds){
        if(!_wrapGetInitStatus(thiz)){
            _wrapLog(thiz,"error","ButelSDK:AGENT "+funcName+",error,have to init before invoking this function");
            cb(JSON.stringify({
                "code": 602,
                "msg": "no init",
            }),"internal error");
            return false;
        }

        if( ! groupIds instanceof Array ) {
            _wrapLog(thiz, "error", "ButelSDK:AGENT "+funcName+",error,param [groudIds] expected to be array ");
            cb(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }), "internal error");
            return false;
        }else if(groupIds.length === 0){
            _wrapLog(thiz, "error", "ButelSDK:AGENT "+funcName+",error,param [groudIds] expected to be array,but it's empty ");
            cb(JSON.stringify({
                "code": 604,
                "msg": "param type error",
            }), "internal error");
            return false;
        }else{
            groupIds.forEach(function(item){
                if(!typeof item === "string"){
                    _wrapLog(
                        thiz,
                        "error",
                        "ButelSDK:AGENT "+funcName+",error,param [groudIds] expected to be array with string element");
                    cb(JSON.stringify({
                        "code": 604,
                        "msg": "param type error",
                    }), "internal error");
                    return false;
                }
            })
        }

        return true;
    }

    /**
     * @desc loop get group message status
     * @param { Object } thiz; context object
     * */
    function _loopGetGroupMessageStatus(thiz){

        var groupMessageObj = _wrapGetData(thiz,"groupMessageObj");

        var logLevel = _wrapGetData(thiz,"logLevel");
        var nube = _wrapGetData(thiz,"nube");
        var pwd = _wrapGetData(thiz,"pwd");
        var loop = _wrapGetData(thiz,"loop");

        var groupIds = [];
        var cb = null;

        if(groupMessageObj){
            cb = groupMessageObj["cb"];
            groupIds = groupMessageObj["groupIds"] || [];
        }


        var groudIdsStr = JSON.stringify(groupIds);

        _ajax({
            method: 'get',
            url: _host.imLocal + _imLocalSignature.groupMessageStatus + '?groupIds=' + groudIdsStr,
            success: function(data,resultText) {


                if(loop){

                    if(data.code === 0){

                        if(data.data && data.data.length && data.data.length > 0){
                            _wrapLog(thiz,"log","ButelSDK:AGENT _loopGetGroupMessageStatus,done,groupMessage request successfully");
                            _wrapLog(thiz,"log","ButelSDK:AGENT _loopGetGroupMessageStatus,done,groupMessage request successfully,invoke success cb");
                        }

                        cb?cb(JSON.stringify(data)):true;

                    }else {
                        _wrapLog(thiz,"log","ButelSDK:AGENT _loopGetGroupMessageStatus,done,groupMessage request successfully");
                        _wrapLog(thiz,
                            "error",
                            "ButelSDK:AGENT _loopGetGroupMessageStatus,done,groupMessage request successfully,but service internal error",
                            JSON.stringify({"code":-999,"msg":"service internal error"}),"business error," + data.msg
                        );


                    }

                    setTimeout(function(){
                        _loopGetGroupMessageStatus(thiz);
                    },2000);
                }

            },
            error: function(err,resultText) {


                if(loop){
                    _wrapLog(thiz,
                        "error",
                        "ButelSDK:AGENT _loopGetGroupMessageStatus,done,groupMessage request with error",
                        JSON.stringify(err)
                    );

                    _imLogin(thiz,nube,pwd,function(){
                        setTimeout(function(){
                            _loopGetGroupMessageStatus(thiz)
                        },2000);
                    },function(){
                        setTimeout(function(){
                            _loopGetGroupMessageStatus(thiz)
                        },2000);
                    },'_imLogin_loopGetGroupMessageStatus')
                }

            }
        });
    }

    /**
     * @desc monitor combat message status
     * @param { Array } groupIds
     * @param { Function } cb
     * */
    function agentAddChatMonitor( groupIds, cb ){
        var thiz = this;

        _wrapLog(thiz,"log","ButelSDK:AGENT addChatMonitor");

        if(!_wrapCanInvokeChatMonitor(thiz, cb ,"addChatMonitor", groupIds )){
            return;
        }

        var groupMessageObj = _wrapGetData(thiz,"groupMessageObj");


        if(groupMessageObj && groupMessageObj["groupIds"] && groupMessageObj["groupIds"].length >0){
            groupIds.forEach(function(id){
                if(groupMessageObj["groupIds"].indexOf(id) < 0){
                    groupMessageObj["groupIds"].push(id);
                }
            });

            groupIds = groupMessageObj["groupIds"];
        }
        _wrapSetData(thiz,"groupMessageObj",{
            "groupIds": groupIds,
            "cb": cb
        });



        var nube = _wrapGetData(thiz,"nube");
        var pwd = _wrapGetData(thiz,"pwd");


        _ajax({
            method: 'get',
            url: _host.imLocal + _imLocalSignature.groupMessageStatus + '?groupIds=[]',
            success: function(data,resultText) {},
            error: function(err,resultText) {
                _setUpIm(nube,pwd);
            }
        });


    }

    /**
     * @desc remove monitor combat message status
     * @param { Array } groupIds
     * @param { Function } cb
     * */
    function agentRemoveChatMonitor( groupIds, cb ){
        var thiz = this;

        _wrapLog(thiz,"log","ButelSDK:AGENT removeChatMonitor");

        if(!_wrapCanInvokeChatMonitor(thiz, cb ,"removeChatMonitor", groupIds )){
            return;
        }

        var groupMessageObj = _wrapGetData(thiz,"groupMessageObj");

        var data = {
            code: 0,
            msg: "ok",
            data: []
        }
        var temp = null;

        groupIds.forEach(function(id){
            temp = {
                gid: id,
                hasRemoved: 0
            }

            if(groupMessageObj && groupMessageObj["groupIds"] && groupMessageObj["groupIds"].indexOf(id) >= 0){
                groupMessageObj["groupIds"].splice(groupMessageObj["groupIds"].indexOf(id),1);
                temp.hasRemoved = 1;
            }else{
                temp.hasRemoved = -1;
            }

            data.data.push(temp);
        });

        //set cb null when groupIds is empty
        if(groupMessageObj && groupMessageObj["groupIds"] && groupMessageObj["groupIds"].length <= 0){
            groupMessageObj.cb = null;
        }

        cb?cb(JSON.stringify(data)):true;
    }

    /**
     * @desc hide chat
     * @param { Function } cb
     * */
    function agentHideChat( cb ){
        var thiz = this;

        _wrapLog(thiz,"log","ButelSDK:AGENT hideChat,start");
        if(!_wrapGetCanInvokeAgentExceptChatMonitor(thiz,cb,"hideChat")){
            return;
        }

        _wrapSetAPIBusy(thiz,true,"");

        _wrapLog(thiz,"log","ButelSDK:AGENT hideChat,hideChat request start");


        _ajax({
            method: 'get',
            timeout: 5000,
            url: _host.imLocal + _imLocalSignature.hide,
            success: function(data,resultText) {
                _wrapSetAPIBusy(thiz,false,"hideChat");
                _wrapLog(thiz,"log","ButelSDK:AGENT hideChat,error,hideChat request successfully,invoke cb");
                cb(JSON.stringify({code:0,msg:"ok",data:null}));
            },
            error: function(err,resultText) {
                _wrapSetAPIBusy(thiz,false,"hideChat");
                _wrapLog(thiz,"error","ButelSDK:AGENT hideChat,error,hideChat request with error,but invoke cb",JSON.stringify(err),resultText);
                cb(JSON.stringify({code:0,msg:"ok",data:null}));
            }
        });
    }

    /**
     * @desc release agent instance
     * @param { Function } success;
     * @param { Function } error;
     * */
    function agentRelease( success, error ) {
        var thiz = this;

        _wrapLog(thiz,"log","ButelSDK:AGENT release,start");
        if(!_wrapGetCanInvokeAgentExceptChatMonitor(thiz,error,"release")){
            return;
        }

        thiz["_data"] = null;
        thiz["_data"] = {
            "release": true
        };
        var loopAjaxXhr = _wrapGetData(thiz,"loopAjaxXhr");
        loopAjaxXhr?loopAjaxXhr.abort():true;


        _wrapLog(thiz,"log","ButelSDK:AGENT release done");

        _wrapSetLogLevel(thiz,1);
        _wrapSetInitStatus(thiz,false);
        _wrapSetAPIBusy(thiz,false,"");





        success();
    }


    /**
     * @desc create combat api instance
     * */
    function createCombatInstance(){
        return new ButelCombatSDK();
    }

    /**
     * @desc  ButelCombatSDK instance constructor
     * */
    function ButelCombatSDK(){
        //logLevel default 1
        this._logLevel = 1;


        //data store
        this._data = {

        };

        _wrapSetInitStatus(this,false);
        _wrapSetAPIBusy(this,false,"");
    }

    ButelCombatSDK.prototype =  {
        "init":init,
        "createCombatRoom":createCombatRoom,
        "editCombatName":editCombatName,
        "addMember":addMember,
        "removeMember":removeMember,
        "deleteCombatRoom":deleteCombatRoom,
        "getGroupMessages":getGroupMessages,
        "modifyNickname":modifyNickname,
        "release":release
    };

    /**
     * @desc  ButelAgentSDK instance constructor
     * */
    function ButelAgentSDK(){
        //logLevel default 1
        this._logLevel = 1;


        //data store
        this._data = {};

        _wrapSetInitStatus(this,false);
        _wrapSetAPIBusy(this,false,"");
    }

    ButelAgentSDK.prototype = {
        "init": agentInit,
        "enterChat": agentEnterChat,
        "enterMeeting": agentEnterMeeting,
        "addChatMonitor": agentAddChatMonitor,
        "removeChatMonitor": agentRemoveChatMonitor,
        "hideChat": agentHideChat,
        "release": agentRelease,
    };


    /**
     * @desc create im desktop app agent api instance
     * */
    function createAgentInstance(){
        return new ButelAgentSDK();
    }

    var _sdk = {
        "version": version,
        "createCombatInstance": createCombatInstance,
        "createAgentInstance": createAgentInstance
    };


    window["ButelSDK"] = _sdk;
})(window || global);




