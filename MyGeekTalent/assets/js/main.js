jQuery(function($) {
    'use strict';

    /**
     * make header transparent while scrolling
     * 
     */
     function makeHeaderTransparent() {
        try{ 
            let appHeader=document.querySelector('.header-layout'); 
            let scrollPosition=document.documentElement.scrollTop; 
            if(scrollPosition>76){
                appHeader.style.opacity="0.9"; 
            }else{
                appHeader.style.opacity="1";
            } 
        }catch(e){ 
        }
    }

    // Sticky Nav
    $(window).on('scroll', function() {
        $(window).scrollTop() >= 100 ?
        $('.navbar-area').addClass('stickyadd') :
        $('.navbar-area').removeClass('stickyadd');
        makeHeaderTransparent();
    });

    // Smooth Scrolling
    $('.nav_link').on('click', function(e) {
        var $this = $(this);
        $('html, body')
        .stop()
        .animate({
            scrollTop: $($this.attr('href')).offset().top - 60,
        }, 1000 );
        e.preventDefault();
    });

    // Search Popup
    $('.search-btn').on('click', function() {
        $('.search-popup').toggle(300);
    });

  
    $('#banner-hero').parallax("center", 0.3);
    
     $('.mobilemenu-toggle').on('click', function () {
      $(this)
        .toggleClass('cs-toggle_active');
        $('.nav-menus-wrapper').toggleClass('nav_active');
        $('.nav-menus-wrapper').fadeToggle( "slow", "linear" );;
        
    });

    
    // Preloader
    $(window).on('load', function(e) {
        $('.preloader-main')
        .delay(2000)
        .queue(function() {
            $(this).remove();
        });
    });

    //hover project image 
    $('.project-image').on('mouseover',function(){
        //var $this = $(this);
        $(this).children('.card-reveal-on-hover').show( );
    });
    $('.project-image').on('mouseleave',function(){ 
        $(this).children('.card-reveal-on-hover').hide( );
    });

    //banner projects
    // try{
    //     let banner=document.querySelector('.main-projects-banner');
    //     banner.style.backgroundPosition='center -150px';
    // }catch(e){

    // }
    /**
     * showing sample pages within each project details
     */
    try{
        let pages=document.querySelectorAll('.details-project-pages');
        let buttons=document.querySelectorAll('.details-project-menu a');  
        if(pages.length===buttons.length){
            let hideAllPages=function(pages, exceptPage ,buttons){
                for(let i=0,c=pages.length;i<c;i++){
                    if(i!=exceptPage){
                        pages[i].style.display="none";  
                        buttons[i].style.borderBottom="5px solid transparent";
                        buttons[i].style.fontWeight='normal';
                    }
                } 
            };
            let showBtClick=function(bt,menu, currentIndex){
                bt.addEventListener('click',function(e){
                    e.preventDefault();
                    menu.style.display="block";
                    bt.style.borderBottom="5px solid #a22742";
                    bt.style.fontWeight="bold";
                    hideAllPages(pages, currentIndex,buttons);
                });
            }; 
            // pages[0].style.display="block"; 
            hideAllPages(pages, 0, buttons);
            for(let i=0,c=pages.length;i<c;i++){
                showBtClick(buttons[i], pages[i],i); 
            }
         } 
    }catch(e){ 
        // console.log(e);
    }
    /**
     * toggle menus
     * 
     */
    try{ 
        let toggleButtons=document.querySelectorAll('.toggle-bt');
        let toggleMenus=document.querySelectorAll('.toggle-menu'); 
        let toggleIcon=document.querySelectorAll('.toggle-bt-icon');

        let toggleMenu=function(bt, menu,index){
            let hideMenu=function(){
                if(menu.style.display==="flex" ||menu.style.display==="block"){
                    menu.style.display="none";
                    toggleIcon[index].className= 'toggle-bt-icon fa fa-solid fa-chevron-down' ;
                }else{
                    menu.style.display="block";
                    menu.style.display="flex";
                    toggleIcon[index].className= 'toggle-bt-icon fa fa-solid fa-chevron-up';
                }
            };
            bt.addEventListener('mouseover',function(e){
                e.preventDefault();
                hideMenu();
            });
            bt.addEventListener('click',function(e){
                e.preventDefault();
                hideMenu();
            });
            menu.addEventListener('mouseleave',function(e){
                menu.style.display="none";
                toggleIcon[index].className= 'toggle-bt-icon fa fa-solid fa-chevron-down' ;
            })
        };
        for(let i=0,c=toggleMenus.length;i<c;i++){
            toggleMenus[i].style.display="none";
            toggleMenu(toggleButtons[i], toggleMenus[i],i);
        }
    }catch(e){
        console.log(e);
    }
    

}(jQuery));