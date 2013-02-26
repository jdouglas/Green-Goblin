
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function () {
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if (this.console) {
        arguments.callee = arguments.callee.caller;
        var newarr = [].slice.call(arguments);
        (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
    }
};

// make it safe to use console.log always
(function (b) { function c() { } for (var d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","), a; a = d.pop(); ) { b[a] = b[a] || c } })((function () {
    try
{ console.log(); return window.console; } catch (err) { return window.console = {}; } 
})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.
/* BROWSER CHECK */

    (function($) {

        $.fn.browserCheck = function( options ) {

            var settings = $.extend({


            }, options );

            this.each(function() {

                if( $.browser.msie && $.browser.version < 9.0 ) {

                    $(this).show().html('Your version of Internet Explorer is out of date and should be <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home">updated</a>. Please <a href="#" class="popup learn_more">contact us</a> if you have questions.');

                }

            });
            
        }

    })(jQuery);

/* END BROWSER CHECK */
/* CONTACT POPUP */

    (function($) {

        $.fn.contact = function( options ) {

            var settings = $.extend({

                'fade'    :   300

            }, options);

            this.each(function() {

                $(this).click(function() {
                    
                    var pos = $(this).position();

                    if( $('#contactPopup').is(':visible') ) {
                        
                        $('#contactPopup').fadeOut(settings.fade);
                            
                    } else {
                
                        $('#contactPopup').css('top',pos.top + 70).css('left',pos.left - 110).fadeIn(settings.fade);                        
                
                    };

                    return false;

                });

                $('#contactPopup > a').click(function() {

                    $('#contactPopup').fadeOut(settings.fade);

                });

            });

        }

    })(jQuery);

/* END CONTACT POPUP */
/* MODAL WINDOW */

    (function($) {

        $.fn.modal = function( options ) {

            var settings = $.extend({

                'fade'      :   300

            }, options);

            this.each(function() {

                var objClass       = $(this).attr('class');
            
                $(this).click(function() {

                    close_window();

                    var window      = objClass.split(' ');
                    var id          = 'div.' + window[1];
                    var left       	= $(id).width()/2;
                    var top 		= $(id).height()/2;

                    $(id).fadeIn(settings.fade).css('margin-left','-' + left + 'px').css('margin-top','-' + top + 'px');

                    return false;

                });

                $('.modal .close').live('click',function() {

                    close_window();

                });

                function close_window() {

                    $('.modal')
                        .fadeOut(settings.fade) // fade out the window
                        .end()
                        .find('.modal input[type="text"],.modal textarea') // clear the values of our inputs
                        .val('');

                }



//                var objClass       = $(this).attr('class');
//            
//                $(this).click(function() {
//
//                    close_window();
//
//                    var window      = objClass.split(' ');
//                    var id          = '#' + window[1];
//                    var left       = $(id).width()/2;
//                    
//                    $(id).fadeIn(settings.fade).css('margin-left','-' + left + 'px');
//
//                    if( window[1] == "contact_form" ) {
//
//                        var contactName = $(this).parent().find('strong').text();
//                        if (contactName != null && contactName != '')
//                            $('#contact_form > article > header span').text('- ' + contactName);
//                        
                        // copies email id so we know which address to use
//                        $('#contactEmailId').text($(this).attr('emailid'));
//                    }
//
//                    return false;
//
//                });
//
//                $('.modal > img.close').click(function() {
//
//                    close_window();
//
//                });
//
//                function close_window() {
//
//                    $('.modal')
//                        .fadeOut(settings.fade) // fade out the window
//                        .end()
//                        .find('.modal input[type="text"],.modal textarea') // clear the values of our inputs
//                        .val('');
//
//                }
                
            });

        }

    })(jQuery);

/* END MODAL WINDOW */
/* FAQ TEXT SELECTOR */

    (function($) {

        $.fn.textSelector = function( options ) {

            var settings = $.extend({

            }, options);

            this.each(function() {

                var element = $(this); // our object

                animate(0,element); // display the initial article

                $('div.faq div.group').each(function() { // create the nav links from the content articles

                    if($(this).index() == 0) {

                        $('p.faq-nav').append('<a href="#" class="selected">' + $(this).find('h2').text() + '</a>');

                    } else {
                     
                        $('p.faq-nav').append('<a href="#">' + $(this).find('h2').text() + '</a>');

                    }

                });

                $('.faq-nav a').click(function() { // display the selected content on a click event
                    var id = $(this).index(); // get the id of the selected body of text
                    
                    $(this).addClass(function() {
                    
                        $('.faq-nav a.selected').removeClass('selected');
                        return 'selected';
                    
                    });

                    animate(id,element); // call our animate function
                    
                    return false;
                });

                function animate(id,obj) {

                    var articleHeight = obj.children('div.group').eq(id).height(); // get the height of the selected article

                    $('div.faq').children('div.selected').fadeOut('slow',function() {
                        obj.stop().animate({ // adjust the height of the faq section to fit the faq copy
                            height: articleHeight
                        },400,function() {
                            obj.children('div.group').eq(id).fadeIn().addClass('selected'); // fade in the content and add the selected class
                        });
                    });
                }
            });
        };
    })(jQuery);

/* END TEXT SELECTOR */
/* FAQ SEARCH */

    (function() {

        $.fn.faqSearch = function( options ) {

            var settings = $.extend({

            }, options );

            this.each(function() {

                $(this).keyup(function(){

                    var obj         = $('div.faq div.group').not('div.group:eq(0)');
                    var charCount   = $(this).val().length;
                    var filter      = $(this).val();
                    var results     = new Array();
                    var num;
                    var data;
                    var split;

                    if( charCount > 2 ) { // we need at least 3 characters typed to do our search

                        obj.children('p').each(function() {

                            if( $(this).text().search( new RegExp(filter, 'i') ) > 0 ) {

                                num = $(this).parent().index() + '-' + $(this).index();

                                results.push( num );

                            }

                        });

                    }

                    $('div#search-results').html('').parent().show();

                    for( var i = 0; i < results.length; i++ ) { // iterate through the array of search results
                        
                        if ( $('div#search-results > p').attr('class') != results[i] ) { // if a duplicate does not exist

                            split = results[i].split('-');

                            $('div#search-results').append('<p class="' + results[i] + '"><strong><em>' + obj.eq(split[0]-1).find('h2').text() + '</em></strong>' + obj.eq(split[0]-1).children('p:eq(' + (split[1]-1) + ')').html() + '</p>');

                        } else {

                            $('div#search-results > p.' + results[i] ); // remove any duplicate

                        }

                        var height = $('div.group').eq(0).outerHeight();

                        $('div.faq').stop().animate({
                            height  :   height
                        });

                    }

                });

            });

        };

    })(jQuery);

/* END SEARCH */
/* IMAGE ROTATOR */

	(function($) {
	
		$.fn.imagerotator = function ( options ) {

            var settings = $.extend({
                'fade'              : 300,          // in and out fade speed for the image
                'speed'             : 1000,         // speed for each image rotation
                'fade_in_color'     : '#fff',       // the color of the highlighted selector
                'fade_out_color'    : '#000',       // the default background color of the selector
                'hover_color'       : '#dfdfdf',    // color of the selector as we hover
                'progressbar'       : true          // enable the counter
            }, options);
			
			$('a',this).eq(0).fadeIn(settings.fade);

			var elem = $(this);
			
			var initialFadeIn = settings.fade;
			var itemInterval = settings.speed;
			var fadeTime = settings.fade;
			var numberOfItems = $('a',elem).length;
			var currentItem = 0;
			
			$('a',elem).eq(currentItem).fadeIn(initialFadeIn);
			
			var infiniteLoop = setInterval(function(){
			   $('a',elem).eq(currentItem).fadeOut(fadeTime);
			
			   if(currentItem == numberOfItems -1){
			       currentItem = 0;
			   }else{
			       currentItem++;
			   }
			   $('a',elem).eq(currentItem).fadeIn(fadeTime);
			
			}, itemInterval);
				
		};
	
	})(jQuery);

//    (function ($) {
//
//        $.fn.imagerotator = function ( options ) {
//
//            var settings = $.extend({
//                'fade'              : 300,          // in and out fade speed for the image
//                'speed'             : 1000,         // speed for each image rotation
//                'fade_in_color'     : '#fff',       // the color of the highlighted selector
//                'fade_out_color'    : '#000',       // the default background color of the selector
//                'hover_color'       : '#dfdfdf',    // color of the selector as we hover
//                'progressbar'       : true          // enable the counter
//            }, options);
//
//            this.each(function() {
//
//                var num     = $('a',this).length;           // number of images
//                var obj     = $(this);                      // our rotator object
//                var cur     = 0;                            // default position in rotation
//
//                for( var i = 0; i < num; i++) { // add a clickable space for each image in the rotator
//                    $('ul',this).append('<li></li>');
//                }
//
//                getImage(); // automatically start the rotator
//
//                $('section#image-rotator ul li').click(function() { // if our selector is clicked then lets display the selected image
//
//                    var id      = $(this).index();
//                    var img     = $('section#image-rotator a.selected').index();
//
//                    if( (id + 1) != img ) { // if the selection is already selected, do nothing
//
//                        clicker(id);
//                        getImage(id);
//
//                        $('div#counter').hide();
//
//                        clearInterval(t);   // stop the rotation on the click
//
//                    }
//
//                });
//
//                function countdown() {
//
//                    var speed = ((settings.speed) / 1000) - 1;
//                    var count = speed;  // get number of seconds for each image
//                    var t = setInterval(timer,1000);            // start the timer
//                    var width = $('div#counter').width();       // set our counter default width
//                    var increment = parseInt(width / count)     // how much we should decrement the width per second
//
//                    function timer() {
//
//                        if ( count > 0 ) {
//                            
//                            $('div#counter').animate({
//                                'width'  :   (width - increment)
//                            });
//
//                            if( width <= (increment*3) ) {
//
//                                $('div#counter').css('backgroundColor','#FFFF73');
//
//                            }
//
//                            width -= increment;
//                            count--;
//
//                        }
//
//                    }
//
//                }
//
//                function getImage(id) {
//
//                    var pos; // image index
//
//                    if( cur == num ) { // is the image the last one? if so lets reset the counter
//                        cur = 1;
//                    } else {
//                        cur++
//                    }
//
//                    pos = cur - 1; // if the image wasn't selected, it's BAU
//
//                    if(typeof id != 'undefined')
//                        pos = id; // if the selector was clicked then lets get the selected image's index
//
//                    obj
//                        .children('a.selected')     // find the current image
//                        .removeClass('selected')    // remove its class
//                        .fadeOut(settings.fade)     // fade it out
//                        .end()
//                        .find('a')
//                        .eq(pos)
//                        .addClass('selected')       // add class to the next image
//                        .fadeIn(settings.fade);     // fade in the new image
//
//                    clicker(pos,false);   
//
//                    /* IMAGE ROTATION COUNTDOWN */
//
//                        if(settings.progressbar == true) {
//                            countdown(); // start the countdown timer
//                        }
//
//                    /* END COUNTDOWN */
//
//                }
//
//                function clicker(id,clicked) {
//
//                    if(clicked == false) {
//
//                        var alttext = $('section#image-rotator a').eq(id).children('img').attr('alt'); // the image text
//
//                        $('section#image-rotator ul li').css('background-color',settings.fade_out_color);
//
//                        $('section#image-rotator ul li.selected')                                   // select the "selected" class element
//                            .css('background-color', settings.fade_out_color)                       // assign default background color
//                            .html('')                                                               // reset the image text
//                            .animate({                                                              // reset the select box to its default size
//                                'width' :   '2em'
//                            },200);
//
//                        $('section#image-rotator ul li')
//                            .eq(id)                                                                 // select the new select box
//                            .css('background-color', settings.fade_in_color)                        // assign highlight color
//                            .html('<div id="counter"></div><span>' + alttext + '</span>')                                   // assign the image text
//                            .animate({                                                              // resize the select box
//                                'width' :   $('ul li').eq(id).children('span').outerWidth() + 'px'
//                            },200,function(){
//                        
//                                $('ul li').eq(id).children('span').fadeIn();
//                        
//                            })
//                            .addClass('selected');                                                  // add the selected class
//
//                    }
//
//                }
//
//                var t = setInterval( getImage, settings.speed );
//
//            });
//
//        };
//    })(jQuery);

    /* END IMAGE ROTATOR */
    /* FORM FIELD MASK */

    (function ($) {
        var pasteEventName = ($.browser.msie ? 'paste' : 'input') + ".mask";
        var iPhone = (window.orientation != undefined);

        $.mask = {
            //Predefined character definitions
            definitions: {
                '9': "[0-9]",
                'a': "[A-Za-z]",
                '*': "[A-Za-z0-9]"
            }
        };

        $.fn.extend({
            //Helper Function for Caret positioning
            caret: function (begin, end) {
                if (this.length == 0) return;
                if (typeof begin == 'number') {
                    end = (typeof end == 'number') ? end : begin;
                    return this.each(function () {
                        if (this.setSelectionRange) {
                            this.focus();
                            this.setSelectionRange(begin, end);
                        } else if (this.createTextRange) {
                            var range = this.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', end);
                            range.moveStart('character', begin);
                            range.select();
                        }
                    });
                } else {
                    if (this[0].setSelectionRange) {
                        begin = this[0].selectionStart;
                        end = this[0].selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        var range = document.selection.createRange();
                        begin = 0 - range.duplicate().moveStart('character', -100000);
                        end = begin + range.text.length;
                    }
                    return { begin: begin, end: end };
                }
            },
            unmask: function () { return this.trigger("unmask"); },
            mask: function (mask, settings) {
                if (!mask && this.length > 0) {
                    var input = $(this[0]);
                    var tests = input.data("tests");
                    return $.map(input.data("buffer"), function (c, i) {
                        return tests[i] ? c : null;
                    }).join('');
                }
                settings = $.extend({
                    placeholder: "_",
                    completed: null
                }, settings);

                var defs = $.mask.definitions;
                var tests = [];
                var partialPosition = mask.length;
                var firstNonMaskPos = null;
                var len = mask.length;

                $.each(mask.split(""), function (i, c) {
                    if (c == '?') {
                        len--;
                        partialPosition = i;
                    } else if (defs[c]) {
                        tests.push(new RegExp(defs[c]));
                        if (firstNonMaskPos == null)
                            firstNonMaskPos = tests.length - 1;
                    } else {
                        tests.push(null);
                    }
                });

                return this.each(function () {
                    var input = $(this);
                    var buffer = $.map(mask.split(""), function (c, i) { if (c != '?') return defs[c] ? settings.placeholder : c });
                    var ignore = false;  			//Variable for ignoring control keys
                    var focusText = input.val();

                    input.data("buffer", buffer).data("tests", tests);

                    function seekNext(pos) {
                        while (++pos <= len && !tests[pos]);
                        return pos;
                    };

                    function shiftL(pos) {
                        while (!tests[pos] && --pos >= 0);
                        for (var i = pos; i < len; i++) {
                            if (tests[i]) {
                                buffer[i] = settings.placeholder;
                                var j = seekNext(i);
                                if (j < len && tests[i].test(buffer[j])) {
                                    buffer[i] = buffer[j];
                                } else
                                    break;
                            }
                        }
                        writeBuffer();
                        input.caret(Math.max(firstNonMaskPos, pos));
                    };

                    function shiftR(pos) {
                        for (var i = pos, c = settings.placeholder; i < len; i++) {
                            if (tests[i]) {
                                var j = seekNext(i);
                                var t = buffer[i];
                                buffer[i] = c;
                                if (j < len && tests[j].test(t))
                                    c = t;
                                else
                                    break;
                            }
                        }
                    };

                    function keydownEvent(e) {
                        var pos = $(this).caret();
                        var k = e.keyCode;
                        ignore = (k < 16 || (k > 16 && k < 32) || (k > 32 && k < 41));

                        //delete selection before proceeding
                        if ((pos.begin - pos.end) != 0 && (!ignore || k == 8 || k == 46))
                            clearBuffer(pos.begin, pos.end);

                        //backspace, delete, and escape get special treatment
                        if (k == 8 || k == 46 || (iPhone && k == 127)) {//backspace/delete
                            shiftL(pos.begin + (k == 46 ? 0 : -1));
                            return false;
                        } else if (k == 27) {//escape
                            input.val(focusText);
                            input.caret(0, checkVal());
                            return false;
                        }
                    };

                    function keypressEvent(e) {
                        if (ignore) {
                            ignore = false;
                            //Fixes Mac FF bug on backspace
                            return (e.keyCode == 8) ? false : null;
                        }
                        e = e || window.event;
                        var k = e.charCode || e.keyCode || e.which;
                        var pos = $(this).caret();

                        if (e.ctrlKey || e.altKey || e.metaKey) {//Ignore
                            return true;
                        } else if ((k >= 32 && k <= 125) || k > 186) {//typeable characters
                            var p = seekNext(pos.begin - 1);
                            if (p < len) {
                                var c = String.fromCharCode(k);
                                if (tests[p].test(c)) {
                                    shiftR(p);
                                    buffer[p] = c;
                                    writeBuffer();
                                    var next = seekNext(p);
                                    $(this).caret(next);
                                    if (settings.completed && next == len)
                                        settings.completed.call(input);
                                }
                            }
                        }
                        return false;
                    };

                    function clearBuffer(start, end) {
                        for (var i = start; i < end && i < len; i++) {
                            if (tests[i])
                                buffer[i] = settings.placeholder;
                        }
                    };

                    function writeBuffer() { return input.val(buffer.join('')).val(); };

                    function checkVal(allow) {
                        //try to place characters where they belong
                        var test = input.val();
                        var lastMatch = -1;
                        for (var i = 0, pos = 0; i < len; i++) {
                            if (tests[i]) {
                                buffer[i] = settings.placeholder;
                                while (pos++ < test.length) {
                                    var c = test.charAt(pos - 1);
                                    if (tests[i].test(c)) {
                                        buffer[i] = c;
                                        lastMatch = i;
                                        break;
                                    }
                                }
                                if (pos > test.length)
                                    break;
                            } else if (buffer[i] == test[pos] && i != partialPosition) {
                                pos++;
                                lastMatch = i;
                            }
                        }
                        if (!allow && lastMatch + 1 < partialPosition) {
                            input.val("");
                            clearBuffer(0, len);
                        } else if (allow || lastMatch + 1 >= partialPosition) {
                            writeBuffer();
                            if (!allow) input.val(input.val().substring(0, lastMatch + 1));
                        }
                        return (partialPosition ? i : firstNonMaskPos);
                    };

                    if (!input.attr("readonly"))
                        input
					.one("unmask", function () {
					    input
							.unbind(".mask")
							.removeData("buffer")
							.removeData("tests");
					})
					.bind("focus.mask", function () {
					    focusText = input.val();
					    var pos = checkVal();
					    writeBuffer();
					    setTimeout(function () {
					        if (pos == mask.length)
					            input.caret(0, pos);
					        else
					            input.caret(pos);
					    }, 0);
					})
					.bind("blur.mask", function () {
					    checkVal();
					    if (input.val() != focusText)
					        input.change();
					})
					.bind("keydown.mask", keydownEvent)
					.bind("keypress.mask", keypressEvent)
					.bind(pasteEventName, function () {
					    setTimeout(function () { input.caret(checkVal(true)); }, 0);
					});

                    checkVal(); //Perform initial check for existing values
                });
            }
        });
    })(jQuery);

    /* END MASK */