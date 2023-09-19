$(document).ready(function () {
  // slick
  $('.portfolio-slick').slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
  });

  //изменение textarea
  const textarea = $("#content");
  // Обработчик события одного клика на кнопку выбора
  textarea.one("click", () => {
    // Очищаем содержимое текстового поля
    textarea.val('');
  });

  // переход по ссылкам 
  // кнопка вариант 1
  $('.my-card-btn').on('click', () => {
    $('.contact')[0].scrollIntoView({
      behavior: 'smooth',             // Плавная анимация
      block: 'start',                 // Начало блока прокрутки
      inline: 'nearest',              // Ближайшая сторона блока
      scrollMargin: 20                // Дополнительный отступ
    });
  });

  // кнопка вариант 2
  $('.my-card-btn').on('click', () => {
    let contactOffsetTop = $('.contact').offset().top;
    $('html, body').animate({
      scrollTop: contactOffsetTop
    }, 1000); // время анимации в миллисекундах
  });

  // плавный переход по ссылкам меню циклом
  const menuItemsArr = ['.header-content', '.skills', '.portfolio', '.contact'];

  $('.menu-item').each(function (index, element) {
    $(element).click(() => {
      $('html, body').animate({
        scrollTop: $(menuItemsArr[index]).offset().top
      }, 800);
    });
  });

  // супер маска для телефона
  $('.phone').on('input', (e) => {
    let num = parseInt(e.key);
    if (!isNaN(num)) {
      return false;
    }
  })

  $('.phone').keydown((e) => {
    let keyCode = e.which;

    if (keyCode < 48 || keyCode > 57) {
      if (keyCode !== 8) { // возможность удалить через Backspace
        e.preventDefault();
      }
    }

    // Ограничение на 15 символов
    let inputValue = $('.phone').val();

    if (inputValue.length >= 15 && keyCode !== 8) {
      e.preventDefault();
    }

    if (inputValue.charAt(0) !== '+') {
      $('.phone').val('+' + inputValue); // Если символ "+" отсутствует, добавляем его в начало строки
    }

    if ((inputValue.length === 5 || inputValue.length === 9 || inputValue.length === 12) && keyCode !== 8) { // Если достигнуто 5, 8 или 11 цифр, добавляем "-"
      $('.phone').val(inputValue + '-');
    }
  });

  // вернуться на верх страницы
  $('.arrows-up').on('click', () => {
    $('html, body').animate({
      scrollTop: 0
    }, 1200);
  });


  // burger menu 
  const burger = $('.burger-menu');
  const menuItems = $('.menu-items');
  burger.on('click', () => {
    menuItems.css('display', 'block');
    menuItems.click(() => {
      menuItems.hide();
    });
  });

  // Добавляем обработчик события при изменении размеров окна
  $(window).on('resize', () => {
    // Получаем текущую ширину окна
    const windowWidth = $(window).width();

    if (windowWidth > 590) {
      // Применяем условие: если ширина окна больше 590px, показываем menuItems 
      menuItems.css('display', 'flex');
    } else {
      // Если ширина окна меньше или равна 590px, скрываем menuItems 
      menuItems.css('display', 'none');
    }
  });


  // iframe 

  $(".portfolio-content").click(function (e) {
    // исключить открытие фрейма при клике на элементе с классом "slick-dots" и его дочерних элементах
    if (!$(e.target).closest(".slick-dots").is(".slick-dots")) {
      let src = $(".slick-active").find(".portfolio-content img").attr("src");
      let urlIsland = "https://gennw.github.io/ITlogia-Island-lending/";
      let iframe = $("#frame iframe");
      let urlTea = "https://gennw.github.io/ITLogia-Tea-Lending/";
      // let urlPizza = "https://gennw.github.io/ITLogia-Pizza/";
      let urlMacaroons = "https://gennw.github.io/Itlogia-Macaroons-lending/";
      if (src === "img/island.png") {
        $(iframe).attr("src", urlIsland);
        console.log('Island');
      } else if (src === "img/tea-lending.png") {
        $(iframe).attr("src", urlTea);
        console.log('Tea');
      } else if (src === "img/macaroons-lending.png") {
        $(iframe).attr("src", urlMacaroons);
        console.log('Mac');
      }

      $("#frame").css("display", "block");
      $(".background-overlay").css("display", "block"); // Отображаем задний фон
      $(".portfolio").addClass("body-overlay"); // Добавляем класс для затемнения фона
      $("html, body").css("overflow", "hidden"); // Отключаем прокрутку
    }
  });

  $(".frame-close").click(function () {
    $("#frame").css("display", "none");
    $(".background-overlay").css("display", "none"); // Скрываем задний фон
    $(".portfolio").removeClass("body-overlay"); // Удаляем класс для затемнения фона
    $("html, body").css("overflow", "auto"); // Включаем прокрутку
  });


  // валидация формы
  let name = $('.base-input').eq(0);
  let email = $('.base-input').eq(1);
  let orderBtn = $('.form-btn');
  let loader = $('.loader');
  loader.hide();


  orderBtn.click(() => {
    let hasError = false;

    $('.error-input').hide();

    if (!name.val()) {
      name.next().show();
      hasError = true;
    }
    if (!email.val()) {
      email.next().show();
      hasError = true;
    }
    if (!hasError) {
      loader.show();

      let formData = {
        name: name.val(),
        email: email.val(),
        phone: $('.phone').val(),
        addres: $('.base-input[type="text"]').val(),
        content: $('.check-content').val(),
        agreed: $('#agreed').is(':checked')
      }
      $.ajax({
        url: 'https://formsubmit.co/9977788@mail.ru',
        method: 'POST',
        data: formData,
        dataType: 'json',
        success: function (response) {
          // Действия после успешной отправки формы
          loader.hide();
          $('.base-input').val('');
          alert('Данные успешно отправлены');
        },
        error: function (xhr, status, error) {
          // Действия при ошибке отправки формы
          alert('Сервис formsubmit.co вызвал ошибку. Свяжитесь со мной через Telegram');
          loader.hide();
        }
      });
    }
  })

  // анимация

  // Функция для проверки, виден ли элемент на экране
  function isElementVisible(element) {
    let rect = element.getBoundingClientRect();
    let windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    /*
    рассчитываем высоту элемента (`elementHeight`) путем 
    вычитания верхней границы (`rect.top`) из нижней границы 
    (`rect.bottom`).Затем мы проверяем, что верхняя граница 
    элемента находится выше или равна нулю, а нижняя граница
    элемента находится в двух третях экрана (`windowHeight / 3 * 2`) 
    и верхняя граница элемента находится ниже или равна высоте
    экрана минус одна треть высоты эемента (`windowHeight - elementHeight / 3`). */
    let elementHeight = rect.bottom - rect.top;
    return (
      rect.top >= 0 &&
      rect.bottom >= windowHeight / 3 * 2 &&
      rect.top <= windowHeight - elementHeight / 3
    );
  }

  // Функция для обработки скролла страницы
  function handleScroll() {
    let elements = document.querySelectorAll('.animation');

    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];

      if (isElementVisible(element)) {
        element.classList.add('fadeInRight');
      }
    }
  }

  // Обработчик события скролла
  window.addEventListener('scroll', handleScroll);

  // Вызов функции при загрузке страницы для отображения видимых блоков
  handleScroll();


});
