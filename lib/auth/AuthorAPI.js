var prefix = 'http://10.10.1.32:8089/security/1.0/authority/';
//V1 method

String.prototype.format = function() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function(m, i) {
            return args[i];
        });
}

//V2 static
String.format = function() {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

function generateMessageCode(account, callback) {

    var paraURL = 'generateMessageCode/{0}';
    var url = prefix + String.format(paraURL, account);
    getJsonObject('get', url, null, callback);

}

function login(account, password, type, callback) {
    var paras = [];
    paras.push(account);
    paras.push(password);
    paras.push(type);
    var paraURL = "login/{0}/{1}/{2}";

    var url = prefix + String.format(paraURL, account, password, type);
    getJsonObject('get', url, paras, callback);
}

function getUserbyUserId(userId, callback) {
    var paraURL = 'getUserbyUserId/{0}';
    var url = prefix + String.format(paraURL, userId);
    getJsonObject('get', url, null, callback);
}

function getOperationPrivilges(systemId, userId, callback) {
    var paraURL = 'getOperationPrivilges/{0}/{1}';
    var url = prefix + String.format(paraURL, systemId, userId);
    getJsonObject('get', url, null, callback);
}

function getAllDataPrivilges(systemId, userId, callback) {
    var paraURL = 'getAllDataPrivilges/{0}/{1}';
    var url = prefix + String.format(paraURL, systemId, userId);
    getJsonObject('get', url, null, callback);
}


function getJsonObject(method, url, paras, callback) {

    var result = "";
    var aj = $.ajax({
        url: url, // ��ת�� action  
        //url: 'http://localhost:8090/monitor/Manage/User/1',// ��ת�� action  /login/1/1/1',// ��ת�� action  
        //data:'',  
        type: method,
        cache: false,
        dataType: 'json',
        success: function(data) {
            callback(data);
            //          alert(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // view("�쳣��");  
            //          alert("error");
            var errInfo = XMLHttpRequest.responseText;
            if (errInfo !== '') {
                alert(errInfo);
            }
            //alert(errorThrown);
        }
    });

}