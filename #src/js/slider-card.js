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
