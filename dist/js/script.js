// Polyfill for Element.closest that falls back to Element.matches that falls back to querySelectorAll
// Created for blazy.js 1.8.1 - https://github.com/dinbror/blazy to ensure IE7+ support


(function () {
    if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.matchesSelector || 
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector || 
        Element.prototype.oMatchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;            
        };
	}

	if (!Element.prototype.closest) {
		Element.prototype.closest = Element.prototype.closest ||
		function(selector) {
			var element = this;
	        while (element.matches && !element.matches(selector)) element = element.parentNode;
	        return element.matches ? element : null;
		};
	}
})();
/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
  (function(q,m){"function"===typeof define&&define.amd?define(m):"object"===typeof exports?module.exports=m():q.Blazy=m()})(this,function(){function q(b){var c=b._util;c.elements=E(b.options);c.count=c.elements.length;c.destroyed&&(c.destroyed=!1,b.options.container&&l(b.options.container,function(a){n(a,"scroll",c.validateT)}),n(window,"resize",c.saveViewportOffsetT),n(window,"resize",c.validateT),n(window,"scroll",c.validateT));m(b)}function m(b){for(var c=b._util,a=0;a<c.count;a++){var d=c.elements[a],e;a:{var g=d;e=b.options;var p=g.getBoundingClientRect();if(e.container&&y&&(g=g.closest(e.containerClass))){g=g.getBoundingClientRect();e=r(g,f)?r(p,{top:g.top-e.offset,right:g.right+e.offset,bottom:g.bottom+e.offset,left:g.left-e.offset}):!1;break a}e=r(p,f)}if(e||t(d,b.options.successClass))b.load(d),c.elements.splice(a,1),c.count--,a--}0===c.count&&b.destroy()}function r(b,c){return b.right>=c.left&&b.bottom>=c.top&&b.left<=c.right&&b.top<=c.bottom}function z(b,c,a){if(!t(b,a.successClass)&&(c||a.loadInvisible||0<b.offsetWidth&&0<b.offsetHeight))if(c=b.getAttribute(u)||b.getAttribute(a.src)){c=c.split(a.separator);var d=c[A&&1<c.length?1:0],e=b.getAttribute(a.srcset),g="img"===b.nodeName.toLowerCase(),p=(c=b.parentNode)&&"picture"===c.nodeName.toLowerCase();if(g||void 0===b.src){var h=new Image,w=function(){a.error&&a.error(b,"invalid");v(b,a.errorClass);k(h,"error",w);k(h,"load",f)},f=function(){g?p||B(b,d,e):b.style.backgroundImage='url("'+d+'")';x(b,a);k(h,"load",f);k(h,"error",w)};p&&(h=b,l(c.getElementsByTagName("source"),function(b){var c=a.srcset,e=b.getAttribute(c);e&&(b.setAttribute("srcset",e),b.removeAttribute(c))}));n(h,"error",w);n(h,"load",f);B(h,d,e)}else b.src=d,x(b,a)}else"video"===b.nodeName.toLowerCase()?(l(b.getElementsByTagName("source"),function(b){var c=a.src,e=b.getAttribute(c);e&&(b.setAttribute("src",e),b.removeAttribute(c))}),b.load(),x(b,a)):(a.error&&a.error(b,"missing"),v(b,a.errorClass))}function x(b,c){v(b,c.successClass);c.success&&c.success(b);b.removeAttribute(c.src);b.removeAttribute(c.srcset);l(c.breakpoints,function(a){b.removeAttribute(a.src)})}function B(b,c,a){a&&b.setAttribute("srcset",a);b.src=c}function t(b,c){return-1!==(" "+b.className+" ").indexOf(" "+c+" ")}function v(b,c){t(b,c)||(b.className+=" "+c)}function E(b){var c=[];b=b.root.querySelectorAll(b.selector);for(var a=b.length;a--;c.unshift(b[a]));return c}function C(b){f.bottom=(window.innerHeight||document.documentElement.clientHeight)+b;f.right=(window.innerWidth||document.documentElement.clientWidth)+b}function n(b,c,a){b.attachEvent?b.attachEvent&&b.attachEvent("on"+c,a):b.addEventListener(c,a,{capture:!1,passive:!0})}function k(b,c,a){b.detachEvent?b.detachEvent&&b.detachEvent("on"+c,a):b.removeEventListener(c,a,{capture:!1,passive:!0})}function l(b,c){if(b&&c)for(var a=b.length,d=0;d<a&&!1!==c(b[d],d);d++);}function D(b,c,a){var d=0;return function(){var e=+new Date;e-d<c||(d=e,b.apply(a,arguments))}}var u,f,A,y;return function(b){if(!document.querySelectorAll){var c=document.createStyleSheet();document.querySelectorAll=function(a,b,d,h,f){f=document.all;b=[];a=a.replace(/\[for\b/gi,"[htmlFor").split(",");for(d=a.length;d--;){c.addRule(a[d],"k:v");for(h=f.length;h--;)f[h].currentStyle.k&&b.push(f[h]);c.removeRule(0)}return b}}var a=this,d=a._util={};d.elements=[];d.destroyed=!0;a.options=b||{};a.options.error=a.options.error||!1;a.options.offset=a.options.offset||100;a.options.root=a.options.root||document;a.options.success=a.options.success||!1;a.options.selector=a.options.selector||".b-lazy";a.options.separator=a.options.separator||"|";a.options.containerClass=a.options.container;a.options.container=a.options.containerClass?document.querySelectorAll(a.options.containerClass):!1;a.options.errorClass=a.options.errorClass||"b-error";a.options.breakpoints=a.options.breakpoints||!1;a.options.loadInvisible=a.options.loadInvisible||!1;a.options.successClass=a.options.successClass||"b-loaded";a.options.validateDelay=a.options.validateDelay||25;a.options.saveViewportOffsetDelay=a.options.saveViewportOffsetDelay||50;a.options.srcset=a.options.srcset||"data-srcset";a.options.src=u=a.options.src||"data-src";y=Element.prototype.closest;A=1<window.devicePixelRatio;f={};f.top=0-a.options.offset;f.left=0-a.options.offset;a.revalidate=function(){q(a)};a.load=function(a,b){var c=this.options;void 0===a.length?z(a,b,c):l(a,function(a){z(a,b,c)})};a.destroy=function(){var a=this._util;this.options.container&&l(this.options.container,function(b){k(b,"scroll",a.validateT)});k(window,"scroll",a.validateT);k(window,"resize",a.validateT);k(window,"resize",a.saveViewportOffsetT);a.count=0;a.elements.length=0;a.destroyed=!0};d.validateT=D(function(){m(a)},a.options.validateDelay,a);d.saveViewportOffsetT=D(function(){C(a.options.offset)},a.options.saveViewportOffsetDelay,a);C(a.options.offset);l(a.options.breakpoints,function(a){if(a.width>=window.screen.width)return u=a.src,!1});setTimeout(function(){q(a)})}});


$( document ).ready(function() {
    if( $( '.b-lazy' ).length ) {
    var bLazy = new Blazy({
        breakpoints: [{
            width: 420 // Max-width
            , src: 'data-src-small'
        }]
        , success: function (element) {
            setTimeout(function () {
                // We want to remove the loader gif now.
                // First we find the parent container
                // then we remove the "loading" class which holds the loader image
                var parent = element.parentNode;
                parent.className = parent.className.replace(/\bloading\b/, '');
            }, 200);
        }
    });
}
    $(function () {

    if ($(".card-container").length > 0) {

        var loffset = function loffset() {
            var e = $(window).innerWidth(),
                n = 0,
                t = $(".container").innerWidth();

            return n = ((e - t) / 2) + 15;
            n = parseInt(n);
            n;
        };

        $( ".card-container" ).each( function(){

            var prsl = new Swiper( this, {
                init: false,
                slidesOffsetBefore: loffset(),
                slidesOffsetAfter: loffset(),
                slidesPerView: 3,
                spaceBetween: 30,
                lazy: true,
                preloadImages: false,
                slideToClickedSlide: 1,
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1.2,
                        spaceBetween: 20
                    },
                    // when window width is >= 480px
                    767: {
                        slidesPerView: 2.5,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    1280: {
                        slidesPerView: 3.5,
                    },
                    1600: {
                        slidesPerView: 4.5,
                    },
                    2500: {
                        slidesPerView: 5.5,
                    },
                }

            });

            prsl.init();

            $(window).resize(function () {
                prsl.params.slidesOffsetBefore = loffset();
                prsl.update(!0);

            });

            $(window).on("orientationchange", function () {
                prsl.params.slidesOffsetBefore = loffset();
                prsl.update(!0);

            });
        });
    }

});

    ( function( $ ){

    // Настройки

    var settings = {
        select_value : 'select-value',
        action : 'select_edit',
        class_open : 'open',
        class_transfotm : 'transfotm',
        class_wrapper : 'wrapper-input',
        class_block : 'wrapper-size',
        class_buffer : 'input-buffer',
        class_items : 'list__itams',
        class_selector : 'js_size_selector',
        class_disabel : 'list__itams-disabel',
    };


    var hendler = {

        // Инициализация

        construct : function(){
            if( $( "." + settings.class_wrapper ).length ){
                $( "." + settings.class_wrapper ).unbind( "click." + settings.action );
                $( "." + settings.class_wrapper ).bind( "click." + settings.action, function (){
                    hendler.select_action( this );
                });
            }
        },

        // Нажатие на блок селекта

        select_action : function( elem ){

            var input = $( elem ).find( 'input' ); // Инпут блока
            var value = $( elem ).find( '.' + settings.select_value ); // Значение блока
            var block = $( elem ).closest( '.' + settings.class_block ); // Находим общую обертку
            var selector = $( block ).find( '.' + settings.class_selector ); // Находим облок элементов внутри общей обертки
            var items = $( selector ).find( '.' + settings.class_items ).not( '.' + settings.class_disabel ); // Находим все item внутри общей обертки

            // Закрыть селект

            var close_select = function(){
                $( items ).unbind( 'click.' + settings.action ); // Отменяем оброботчик кликов на item
                $( document ).unbind( 'mouseup.' + settings.action ); // Отменяем обработчик клика вне общей обертки
                $( selector ).removeClass( settings.class_open ); // Закрываем блок
                $( block ).removeClass( settings.class_transfotm ); // Изменяем стрелку селекта
            };

            $( selector ).toggleClass( settings.class_open ); // Открываем или скрываем

            // Если открыли блок селекта

            if( $( selector ).hasClass( settings.class_open ) ){

                $( block ).addClass( settings.class_transfotm ); // Изменяем стрелку селекта

                // Определяем обработчик клика на item

                $( items ).unbind( 'click.' + settings.action ).bind( 'click.' + settings.action, function(){

                    $( value ).text( $( this ).text() ); // Берем текст из item и сохраняем в видимое выбраное значение
                    $( input ).val( $( this ).data( 'value' ) || $( this ).text()).trigger("change"); // Берем дата параметр или текст из item и сохраняем в наш input

                    if(window.screen.width<=1023) {
                        $(value).text(value.text().substring(0, 27)); //ограничиваем кол-во символов на строке
                        if ($(value).text().length >= 27) { // считаем сколько символов и если больше или равно 27 добавлять ...
                            $(value).append("...");
                        }
                    } else {
                        $(value).text(value.text().substring(0, 50)); //ограничиваем кол-во символов на строке
                        if ($(value).text().length >= 50) { // считаем сколько символов и если больше или равно 27 добавлять ...
                            $(value).append("...");
                        }
                    }
                    close_select();
                });

                // Определяем обработчик клика вне блока

                $( document ).unbind( 'mouseup.' + settings.action ).bind( 'mouseup.' + settings.action, function( e ){

                    // Если нажали не на нашу общую обертку или не на блок внутри нее

                    if( !$( block ).is( e.target ) && $( block ).has( e.target ).length === 0 ){ close_select(); }
                });

            } else { close_select(); }
        }
    };

    window.obora_selector = hendler;

    $( document ).ready( function(){ hendler.construct(); });

})( jQuery );
    var swiper = new Swiper('.reviews-container', {
    spaceBetween: 15,
    navigation: {
        nextEl: '.nav-reviews-button-next',
        prevEl: '.nav-reviews-button-prev',
    }
});

    $(function () {

    if ($(".catalog-container").length > 0) {

        var loffset = function loffset() {
            var e = $(window).innerWidth(),
                n = 0,
                t = $(".container").innerWidth();

            return n = ((e - t) / 2) + 15;
            n = parseInt(n);
            n;
        };

        $( ".catalog-container" ).each( function(){

            var prsl = new Swiper( this, {
                init: false,
                slidesOffsetBefore: loffset(),
                slidesOffsetAfter: loffset(),
                slidesPerView: 1,
                spaceBetween: 15,
                lazy: true,
                preloadImages: false,
                slideToClickedSlide: 1,
                breakpoints: {

                    320: {
                        slidesPerView: 1.3,
                        spaceBetween: 15
                    },

                    767: {
                        slidesPerView: 3.5,
                        spaceBetween: 30
                    },

                    1920: {
                        slidesPerView: 5,

                    }
                }

            });

            prsl.init();

            $(window).resize(function () {
                prsl.params.slidesOffsetBefore = loffset();
                prsl.update(!0);

            });

            $(window).on("orientationchange", function () {
                prsl.params.slidesOffsetBefore = loffset();
                prsl.update(!0);

            });
        });
    }
});

// var swiper = new Swiper('.catalog-container', {
//     slidesPerView: 1,
//     spaceBetween: 15,
//     lazy: true,
//     preloadImages: false,
//     slideToClickedSlide: 1,
//     breakpoints: {
//
//         320: {
//             slidesPerView: 2,
//             spaceBetween: 15
//         },
//
//         767: {
//             slidesPerView: 3,
//             spaceBetween: 30
//         },
//
//         2000: {
//             slidesPerView: 4,
//
//         }
//     }
// });







})