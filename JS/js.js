/// <reference path="~/js/libs/jquery-1.7.2.min.js" />
/// <reference path="~/js/libs/modernizr-2.0.6.min.js" />
/// <reference path="~/js/util.js" />

$(document).ready(function () {

    // BROWSER VERSION CHECK //
    //$('#browserCheck').browserCheck();
    // END BROWSER CHECK //

    // MODAL WINDOWS //
    $('a.popup').modal({
        'fade': 200
    });
    // END MODAL WINDOWS //
    // NAVIGATION //
//    $('a.contact').contact({ // contact popup box
//        'fade': 200
//    });
    // END NAVIGATION //
    // FRONT PAGE //
    $('div.image-rotator').imagerotator({ // our front page image rotator

        'fade': 3000,
        'speed': 6000,
        'fade_in_color': '#8189A0',
        'fade_out_color': '#A9B3D2',
        'hover_color': '#FF9900'

    });
    /*
    $('div#copy ul li').eq(0).show(); // show first copy by default

    $('div#copy > a').click(function () { // on link click

    if ($(this).hasClass('selected')) {
    return false;
    }

    var id = $(this).index(); // get the index of the selected copy
    var shown = $('div#copy ul li:visible').index(); // get id of current copy

    $('div#copy > a.selected').removeClass('selected'); // remove selected class
    $(this).addClass('selected'); // add selected class

    $('div#copy ul li').eq(shown).fadeOut(function () { // fade out the current copy

    $('div#copy ul li').eq(id).fadeIn(); // fade in the selected copy

    });

    return false;

    });
    
    /* LOGO HOME LINK */
    
    $('.logo').click(function() {

    	window.location.href = "/";
    
    });
    
    // END FRONT PAGE //
    // FAQ PAGE //

    $("input[type=text]#searchbox").focus();

    $('div.faq').textSelector(); // our FAQ selector

    $('#searchbox').faqSearch();

    // END FAQ //
    // LOCATIONS PAGE //

    //$('div.campuses ul li').eq(0).addClass('first-child'); // adjust the margin of the first location listed
    /*
    $('section#locations iframe').attr('src', function () { // show the default map
    return $('section#locations article > a').eq(1).attr('href');
    });
    */
    //$('section#locations article').eq(0).addClass('selected');

    $('a.map').click(function () { // on map selection

        //$('div.campuses li.selected').removeClass('selected');

        //$(this).parent().addClass('selected'); // highlight selection

        $('iframe')
                .attr('src', $(this).attr('href')) // update the map
                .end()
                .find('div.locations div#msg') // display the message
                .fadeIn(250, function () {

                    $('html,body').animate({ scrollTop: 0 }, 2000, 'swing');

                })
                .delay(1500)
                .fadeOut(3000);
//
        return false;

    });

    // END LOCATIONS //
    // PRESS RELEASE //
    $('#print').click(function () {

        var divToPrint = $('section#press-release aside').hide().parent().parent().html();
        var newWin = window.open('');

        newWin.document.open();
        newWin.document.write('<html><body onload="window.print()">' + divToPrint + '</body></html>');
        newWin.document.close();

        setTimeout(function () { newWin.close(); }, 10);

        return false;

    });
    // END PRESS RELEASE //
    // ARTICLE //

    $('.pq').clone().appendTo('p:eq(1)').addClass('pq-text');

    // END ARTICLE //
    // APPLICATION //

    $('.app-phone input,.app-altPhone input').mask('(999)999-9999');
    $('.app-zip input').mask('99999');
    $('.app-dob input').mask('99/99/9999');

    $('.btn-application input').click(function (e) {    

        e.preventDefault();

        var error = 0;

        $('.application-form select,.application-form input[type="text"]').not('.app-apt input,.app-altPhone input,.app-other input,.app-email input').each(function () { // form validation

            $(this).css('backgroundColor', 'white');
            $('.app-other input').css('backgroundColor', 'yellow'); // reset on submit

            if ($(this).className == 'app-ddlHAU' && ($(this).val() == 'Referral' || $(this).val() == 'Other') && $('.app-other input').val().length < 1) { // OTHER or REFERRAL dropdown field

                $('.app-other input').css('backgroundColor', 'pink'); // error
                error += 1;

            } else if ($(this).val() == 'No Selection' || $(this).val().length < 1) { // check to make sure something was inputted

                $(this).css('backgroundColor', 'pink'); // error
                error += 1;

            } else {

                if (($(this).className == '.app-fname' || $(this).className == '.app-lname' || $(this).className == '.app-city') && !$(this).val().match(/^[a-zA-Z- ]+$/)) { // check for letters only

                    $(this).css('backgroundColor', 'pink'); // error
                    error += 1;

                }

            }

        });

        $('.app-email input').each(function () { // check the email field

            $(this).css('backgroundColor', 'white');

            if ($('.app-email input').val().length > 0) { // if email is entered

                if (!$('.app-email input').val().match(/^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/)) { // check to make sure the email addy format is valid

                    $('.app-email input').css('backgroundColor', 'pink'); // error
                    error += 1;

                }

            }

        });

        if (error == 0) {
			submitForm();
			//console.log('yeah');

        } else {
        
			$('span#msg').html('You have ' + error + ' error(s) in the form');
        
        }
    });

    // OTHER FIELD

    $('.app-ddlHAU select').click(function () {

        if ($(this).val() == 'Referral' || $(this).val() == 'Other' || $(this).val() == 'Event') {

            $('.app-other').show();

        } else {

            $('.app-other').hide();

        }

    });

    // END OTHER

    // END APPLICATION //
    // LEARN MORE SUBMISSION //

    $('#btn_submit_learn').click(function () {

        var url = '/pages/util/learn-more/default.aspx';
        var wsparams = addServiceParam
            .addFromInput("fname")
            .addFromInput("lname")
            .addFromInput("email")
            .addFromInput("phone")
            .addFromInput("comment")
            .params;

        //alert(wsparams); return;
        addServiceParam.clear();

        $.ajax({
            type: 'POST',
            url: url + '/submit',
            data: "{" + wsparams + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            success: function (msg) {
                if (msg.d != true)
                    alert(msg.d);
                else
                    $.get(url, function (data) {
                        $('section#learn_more > article')
                                    .fadeOut(300, function () {
                                        $(this).parent().append(data);
                                        $('html,body').animate({ scrollTop: 0 }, 2000, 'swing');

                                    })
                    });
            }
        });

        return false;

    });

    // END LEARN MORE SUBMISSION //
    // REFER A FRIEND SUBMISSION //

    $('#btn_submit_refer').click(function () {

        var url = '/pages/util/refer-a-friend/default.aspx';
        var wsparams = addServiceParam
            .addFromInput("yourName")
            .addFromInput("yourPhone")
            .addFromInput("yourEmail")
            .addFromInput("theirName")
            .addFromInput("theirAddress")
            .addFromInput("theirCity")
            .addFromInput("theirState")
            .addFromInput("theirZip")
            .addFromInput("theirPhone")
            .addFromInput("theirEmail")
            .params;

        //alert(wsparams); return;
        addServiceParam.clear();

        $.ajax({
            type: 'POST',
            url: url + '/submit',
            data: "{" + wsparams + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            success: function (msg) {
                if (msg.d != true)
                    alert(msg.d);
                else
                    $.get(url, function (data) {
                        $('section#refer_a_friend > article')
                                    .fadeOut(300, function () {
                                        $(this).parent().append(data);
                                        $('html,body').animate({ scrollTop: 0 }, 2000, 'swing');

                                    })
                    });
            }
        });

        return false;

    });

    // END REFER A FRIEND SUBMISSION //
    // CONTACT SUBMISSION //

    $('#btn_contact_form').click(function () {

        var url = '/pages/util/contact/default.aspx';
        var wsparams = addServiceParam
            .addFromHtml("contactEmailId")
            .addFromInput("contactComment")
            .addFromInput("contactEmail")
            .addFromInput("contactPhone")
            .addFromCheckbox("contactRequested")
            .params;

        //alert(wsparams); return;
        addServiceParam.clear();

        $.ajax({
            type: 'POST',
            url: url + '/submit',
            data: "{" + wsparams + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            success: function (msg) {
                if (msg.d != true)
                    alert(msg.d);
                else
                    $.get(url, function (data) {
                        $('section#contact_form > article')
                            .fadeOut(300, function () {
                                $(this).parent().append(data);
                                $('html,body').animate({ scrollTop: 0 }, 2000, 'swing');
                            })
                    });
            }
        });

        return false;

    });

    $('div.contact_form input[type="checkbox"]').click(function () {

        $('div.contact_form div.more_info').slideToggle('slow');

    });

    // END CONTACT SUBMISSION //
	// MODAL WINDOW CLOSE //

    jQuery.extend({
        parseQuerystring: function () {
            var nvpair = {};
            var qs = window.location.search.replace('?', '');
            var pairs = qs.split('&');
            $.each(pairs, function (i, v) {
                var pair = v.split('=');
                nvpair[pair[0]] = pair[1];
            });
            return nvpair;
        }
    });

});

// functions //
