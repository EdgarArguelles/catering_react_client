/* eslint-disable max-lines */
import $ from 'jquery';
import 'jquery-easing';

export const completeLoading = () => {
  $('#loading').hide();
  $('#content').show();
};

export const initJQuery = () => {
  completeLoading();

  const topMenu = $('#nav-menu-container');
  const topMenuHeight = topMenu.outerHeight() + 70;
  const menuItems = topMenu.find('a');
  let sectionItems = $('#content').find('section');
  sectionItems = sectionItems.map(index => {
    if (sectionItems[index].id) {
      return sectionItems[index];
    }
    return null;
  });

  // Header fixed
  $(window).scroll(event => {
    if ($(event.target).scrollTop() > 10) {
      $('#header').addClass('header-fixed');
      $('#mobile-nav-toggle').addClass('mobile-header-fixed');
    } else {
      $('#header').removeClass('header-fixed');
      $('#mobile-nav-toggle').removeClass('mobile-header-fixed');
    }

    // active menu when scroll
    const fromTop = $(event.target).scrollTop() + topMenuHeight;
    let currentSection = sectionItems.map(index => {
      if ($(sectionItems[index]).offset().top < fromTop) {
        return sectionItems[index];
      }
      return null;
    });
    currentSection = currentSection[currentSection.length - 1];

    // if scroll is at page bottom active last menu
    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
      currentSection = sectionItems[sectionItems.length - 1];
    }

    const id = currentSection && currentSection.id ? currentSection.id : '';
    menuItems.parent().removeClass('menu-active')
      .end().filter(`[href='#${id}']`).parent().addClass('menu-active');

    $('#mobile-nav').find('a').parent().removeClass('menu-active')
      .end().filter(`[href='#${id}']`).parent().addClass('menu-active');
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    if ($('#mobile-nav-logo').length) {
      $('#mobile-nav-toggle').removeClass('mobile-nav-hidden');
      $('#mobile-nav').find('a').parent().removeClass('menu-active')
        .end().filter('[href="#home"]').parent().addClass('menu-active');
    } else {
      const mobileNav = $('#nav-menu-container').clone().prop({id: 'mobile-nav'});
      mobileNav.find('> ul').attr({class: '', id: ''});
      mobileNav.append('<img id="mobile-nav-logo" class="company-logo" src="/assets/logo.png" alt="logo">');
      $('body').append(mobileNav);
      $('body')
        .prepend('<button type="button" id="mobile-nav-toggle"><i class="fas fa-bars" aria-hidden="true"/></button>');
      $('body').append('<div id="mobile-body-overly"></div>');
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fas fa-chevron-down" aria-hidden="true"/>');

      $(document).on('click', '.menu-has-children i', event => {
        $(event.target).next().toggleClass('menu-item-active');
        $(event.target).nextAll('ul').eq(0).slideToggle();
        $(event.target).toggleClass('fa-chevron-up fa-chevron-down');
      });

      $(document).on('click', '#mobile-nav-toggle', () => {
        $('body').toggleClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('#mobile-body-overly').toggle();
      });

      $(document).click(e => {
        const container = $('#mobile-nav, #mobile-nav-toggle');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
          }
        }
      });
    }
  } else if ($('#mobile-nav, #mobile-nav-toggle').length) {
    $('#mobile-nav, #mobile-nav-toggle').hide();
  }

  // swipe gesture
  let touchstartX = 0;
  $('#layout').add('#mobile-body-overly').add('#mobile-nav').on('touchstart', event => {
    touchstartX = event.changedTouches[0].pageX;
  });
  $('#layout').add('#mobile-body-overly').add('#mobile-nav').on('touchend', event => {
    const touchendX = event.changedTouches[0].pageX;
    // swiped right
    if ($('#mobile-body-overly').is(':hidden') && touchendX - touchstartX > 100) {
      $('#mobile-nav-toggle').click();
    }

    // swiped left
    if ($('#mobile-body-overly').is(':visible') && touchendX - touchstartX < -100) {
      $('#mobile-nav-toggle').click();
    }
  });

  // Smooth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').unbind('click').on('click', event => {
    const target = event.target.id === 'logo' ? $('#home') : $(event.target.hash);
    if (target.length) {
      let topSpace = 0;
      if ($('#header').length && target[0].id !== 'contact') {
        topSpace = 72;
        if (!$('#header').hasClass('header-fixed')) {
          topSpace = topSpace - 20;
        }
      }

      window.scroll({top: target.offset().top - topSpace, left: 0, behavior: 'smooth'});

      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('#mobile-body-overly').fadeOut();
      }
      return false;
    }

    return true;
  });
};