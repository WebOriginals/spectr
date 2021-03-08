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





