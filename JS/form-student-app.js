///<reference path="util.js"/>
///<reference path="js.js"/>

var preferredCampus = '';

function getFormValues() {
    var frm = {
        FirstName: $('#ecApply_tbFname #textBox_write').val(),
        LastName: $('#ecApply_tbLname #textBox_write').val(),
        StreetAddress: $('#ecApply_tbStreet #textBox_write').val(),
        AptNumber: $('#ecApply_tbApt #textBox_write').val(),
        City: $('#ecApply_tbCity #textBox_write').val(),
        Zip: $('#ecApply_tbZip #textBox_write').val(),
        Email: $('#ecApply_tbEmail #textBox_write').val(),
        Phone: $('#ecApply_tbPhone #textBox_write').val(),
        AltPhone: $('#ecApply_tbAltPhone #textBox_write').val(),
        DOB: $('#ecApply_tbDOB #textBox_write').val(),
        Gender: $('#ecApply_ddlGender #dropDown').val(),
        ApplyBefore: $('#ecApply_ddlApplyBefore #dropDown').val(),
        PreferredCampus: $('#ecApply_ddlPreferredCampus #dropDown').val(),
        HowHear: $('#ecApply_ddlHowHear #dropDown').val()
    } 
    return frm;
}

function getPreferredCampus() {
    var c = $.getUrlVar('campus'); 
    var pref = 'Michigan St.';

    if (c !== null) {
        switch (c) {
            case "anderson":
                pref = "Anderson, IN";
                break;
            case "decatur":
                pref = "Decatur";
                break;
            case "franklin":
                pref = "Franklin Rd.";
                break;
            case "meadows":
                pref = "Meadows";
                break;
            default:
                pref = "Michigan St.";
        }
        
    }
    preferredCampus = pref;
}

function submitForm() {
    
    var vals = getFormValues();
    var wsparams = serviceParam
        .addVal('clientIp', clientIP)
        .addVal('fname', vals.FirstName)
        .addVal('lname', vals.LastName)
        .addVal('address', vals.StreetAddress)
        .addVal('apt', vals.AptNumber)
        .addVal('city', vals.City)
        .addVal('zip', vals.Zip)
        .addVal('email', vals.Email)
        .addVal('phone', vals.Phone)
        .addVal('altPhone', vals.AltPhone)
        .addVal('dob', vals.DOB)
        .addVal('gender', vals.Gender)
        .addVal('applied', vals.ApplyBefore)
        .addVal('campus', vals.PreferredCampus)
        .addVal('ddlHAU', vals.HowHear)
        .addVal('other', '')
        .params;
   
    serviceParam.clear();

    wsparams = '{ ' + wsparams + ' }';

    getRemoteContentAsJSON(baseServiceURL + '/SubmitApplication', wsparams, function (result) {

        var success = result[0];
        var message = result[1];

        if (!success)
            alert(message);
        else
            $.get('/apply/confirmation/', function (data) {
                var confData = $(data).find('div.confirmation-cms-block').html();
                var frm = $('.sf_cols .application-form');
                frm.fadeOut(300,
                  function () {
                    $(frm).parent().html(confData);
                    $('html,body').animate({ scrollTop: 0 }, 2000, 'swing');
                    if (message)
                        alert(message);
                    return false;
                })
            });
    });
}

function initObjects() {
    getPreferredCampus();
}
// SUBMITTING THE FORM FROM THE JS.JS FILE INSTEAD DUE TO THE ERROR CHECKING

function initEvents() {
    //$('#ecApply_btnSubmit').click(function (e) {
    //    e.preventDefault();
    //    submitForm();
    //});

}

$(document).ready(function () {
    
    initObjects();
    initEvents();
    
    if (preferredCampus != '')
        $('#ddlPreferredCampus #dropDown').val();
});