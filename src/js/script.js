$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        // variableWidth: true,
        prevArrow: '<button type="button" class="prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    }); 

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });



    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                } 
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
              }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask(("+7 (999) 999-99-99"));

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");  
            $('#consultation, #order').fadeOut();
            $('form').trigger('reset');
        });
        return false;
    });

    // Scroll

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});

const triggers = document.querySelectorAll('[data-modal="consultation"]'),
      closeBtn = document.querySelectorAll('[data-close="close"]'),   
      overlay = document.querySelector('.overlay'),
      miniBtn = document.querySelectorAll('.button_mini'),
      consultation = document.querySelector('#consultation'),
      order = document.querySelector('#order'),
      thanks = document.querySelector('#thanks'),
      catalog = document.querySelectorAll('.catalog-item__subtitle');

miniBtn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        catalog.forEach((item, j) => {
            if (i === j) {
                order.querySelector('.modal__descr').innerHTML = item.textContent;
            }
        });
    });
});

function showModal(modal) {
    document.body.style.overflow = 'hidden';
    overlay.style.display = 'block';
    modal.classList.add('animate__animated');
    modal.classList.add('animate__fadeIn');
    modal.style.display = 'block';
}

function hideModal(modal) {
    document.body.style.overflow = '';
    overlay.style.display = 'none';

    modal.style.display = 'none';
}

window.addEventListener('click', (e) => {
    if (e.target === overlay) {
        hideModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && consultation.style.display === 'block' || order.style.display === 'block') { 
        hideModal();
    }
});

function showModalByClick(triggers, modal) {
    triggers.forEach(btn => {
        btn.addEventListener('click', () => {
            showModal(modal);
        });
    });
}

function closeModal(modal) {
    closeBtn.forEach(close => {
        close.addEventListener('click', () => {
            hideModal(modal);
        });
    });
}

showModalByClick(triggers, consultation);
showModalByClick(miniBtn, order);
closeModal(consultation);
closeModal(order);


// const slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay: false,
//     controls: false,
//     nav: false
// });

// document.querySelector('.prev').addEventListener('click', function () {
//     slider.goTo('prev');
// });

// document.querySelector('.next').addEventListener('click', function () {
//     slider.goTo('next');
// });

// function progress(a, b) {
//     let sum = a;
//     let str = '';
//     if (typeof(b) != 'number' || b <= 0) {
//         return a
//     }
//     str += a
//     for (let i = 0; i < b - 1; ++i) {
//         sum += a
//         str += '---' + sum
//     }
//     return str;
// }

// console.log(progress(10, 0));