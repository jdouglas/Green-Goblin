//var baseServiceURL = '/Sitefinity/Services/Custom/ExcelCenter.Lib.asmx';
var baseServiceURL = '/Sitefinity/Public/Services/Goodwill/ExcelCenter.Lib.asmx';

$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

var convertToWSParam = function (name, val) {
    return "'" + name + "': '" + ((val) ? val : 'n/a') + "'";
};

var serviceParam = {
    params: null,
    add: function (val) {
        this.params = (!this.params) ? val : this.params + ',' + val;
        return serviceParam;
    },
    addVal: function (name, val) {
        return this.add(convertToWSParam(name, val));
    },
    clear: function () { this.params = null; }
}

function safeLogItems(objArr, alertOnFail) {
    $.each(objArr, function (idx, val) {
        safeLog(val, alertOnFail);
    });
}

function safeLog(obj, alertOnFail) {
    try {
        console.log(obj);
    } catch (e) {
        if (alertOnFail)
            alert(obj);
    }
}

function testResponse(result, url, params, callback) {
    if (result)
        callback({ Success: true, Message: "simulated success" });
    else
        callback({ Success: false, Message: "simulated error" });
}

function getRemoteContentAsJSON(url, params, callback) {

    jQuery.ajax({
        type: "POST",
        data: params,
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            callback(result.d);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            safeLogItems(['failure', XMLHttpRequest, textStatus, errorThrown]);
            callback([false, 'Failed: ' + errorThrown]);
        }
    });
}

function getClientIP(callback) {
    $.getJSON("http://jsonip.appspot.com?callback=?",
    function (data) {
        callback(data.ip);
    });
}