/// <reference path="util.js"/>

var clientIP = '';
var preferredCampus = '';

function getFormValues_Learn() {
    var frm = {
        FirstName: $('#ecLearn_tbFname #textBox_write').val(),
        LastName: $('#ecLearn_tbLname #textBox_write').val(),
        Email: $('#ecLearn_tbEmail #textBox_write').val(),
        Phone: $('#ecLearn_tbPhone #textBox_write').val(),
        Comment: $('#ecLearn_tbComment #textBox_write').val()
    }
    return frm;
}

function getFormValues_Refer() {
    var frm = {
        YourName: $('#ecRefer_tbYourName #textBox_write').val(),
        YourPhone: $('#ecRefer_tbYourPhone #textBox_write').val(),
        YourEmail: $('#ecRefer_tbYourEmail #textBox_write').val(),
        FriendName: $('#ecRefer_tbFriendName #textBox_write').val(),
        FriendAddr: $('#ecRefer_tbFriendAddress #textBox_write').val(),
        FriendCity: $('#ecRefer_tbFriendCity #textBox_write').val(),
        FriendState: $('#ecRefer_ddlFriendState #dropDown').val(),
        FriendZip: $('#ecRefer_tbFriendZip #textBox_write').val(),
        FriendPhone: $('#ecRefer_tbFriendPhone #textBox_write').val(),
        FriendEmail: $('#ecRefer_tbFriendEmail #textBox_write').val(),
        FriendOver18: $('#ecRefer_rdFriendOver18 #checkBoxes input[type="checkbox"]').is(":checked")
    }
    return frm;
}

function getFormValues_Contact() {
    var frm = {
        Comment: $('#ecContact_tbComment #textBox_write').val(),
        WantsContact: $('#ecContact_chkWantsContact input[type="checkbox"]').is(":checked"),
        Email: $('#ecContact_tbEmail #textBox_write').val(),
        Phone: $('#ecContact_tbPhone #textBox_write').val()
    }
    return frm;
}

function submitForm_LearnMore() {
    var vals = getFormValues_Learn();
    var wsparams = serviceParam
        .addVal('fname', vals.FirstName)
        .addVal('lname', vals.LastName)
        .addVal('email', vals.Email)
        .addVal('phone', vals.Phone)
        .addVal('comment', vals.Comment)
        .params;

    serviceParam.clear();

    wsparams = '{ ' + wsparams + ' }';

    getRemoteContentAsJSON(baseServiceURL + '/SubmitLearnMoreRequest', wsparams, function (result) {

        var success = result[0];
        var message = result[1];

        if (!success)
            alert(message);
        else
            $.get('/home/learnmoreconfirmation/', function (data) {
                var confData = $(data).find('div.confirmation-cms-block').html();
                //var frm = $('.sf_cols .application-form');
                //frm.fadeOut(300,
                //function () {
                //$(frm).parent().html(confData);
                $('div.learn_more').html(confData).prepend('<img title="Close" src="/images/default-source/modal-window/close.png?sfvrsn=2" alt="Close" class="close" />');
                //$('html,body').animate({ scrollTop: 0 }, 2000, 'swing');
                if (message)
                    alert(message);
                return false;
                //})
            });
    });
}

function submitForm_Refer() {
    var vals = getFormValues_Refer();
    var wsparams = serviceParam
        .addVal('yourName', vals.YourName)
        .addVal('yourPhone', vals.YourPhone)
        .addVal('yourEmail', vals.YourEmail)
        .addVal('theirName', vals.FriendName)
        .addVal('theirAddress', vals.FriendAddr)
        .addVal('theirCity', vals.FriendCity)
        .addVal('theirState', vals.FriendState)
        .addVal('theirZip', vals.FriendZip)
        .addVal('theirPhone', vals.FriendPhone)
        .addVal('theirEmail', vals.FriendEmail)
        .addVal('over18', vals.FriendOver18)
        .params;

    serviceParam.clear();

    wsparams = '{ ' + wsparams + ' }';

    getRemoteContentAsJSON(baseServiceURL + '/SubmitReferral', wsparams, function (result) {

        var success = result[0];
        var message = result[1];

        if (!success)
            alert(message);
        else
            $.get('/home/referralconfirmation/', function (data) {
                var confData = $(data).find('div.confirmation-cms-block').html();
                $('div.refer_a_friend').html(confData);
                if (message)
                    alert(message);
                return false;
            });
    });
}

function submitForm_Contact() {
    var vals = getFormValues_Contact();
    var wsparams = serviceParam
        .addVal('contactEmailId', '')
        .addVal('contactComment', vals.Comment)
        .addVal('contactEmail', vals.Email)
        .addVal('contactPhone', vals.Phone)
        .addVal('contactRequested', vals.WantsContact)
        .params;


    serviceParam.clear();

    wsparams = '{ ' + wsparams + ' }';

    getRemoteContentAsJSON(baseServiceURL + '/SubmitContactForm', wsparams, function (result) {

        var success = result[0];
        var message = result[1];

        if (!success)
            alert(message);
        else
            $.get('/home/contactconfirmation/', function (data) {
                var confData = $(data).find('div.confirmation-cms-block').html();
                //var frm = $('.sf_cols .application-form');
                //frm.fadeOut(300,
                //function () {
                //$(frm).parent().html(confData);
                $('div.contact_form').html(confData);
                //$('html,body').animate({ scrollTop: 0 }, 2000, 'swing');
                if (message)
                    alert(message);
                return false;
                //})
            });
    });
}

function initObjects() {
    getClientIP(function (ip) { clientIP = ip; });

}

function initEvents() {
    $('#ecLearn_btnSubmit').click(function (e) {
        e.preventDefault();
        submitForm_LearnMore();
        return false;
    });

    $('#ecContact_btnSubmit').click(function (e) {
        e.preventDefault();
        submitForm_Contact();
        return false;
    });

    $('#ecRefer_tnSubmit').click(function (e) {
        e.preventDefault();
        submitForm_Refer();
        return false;
    });
}

$(document).ready(function () {

    initObjects();
    initEvents();


});