/* Javascript for masterpage */
"use strict";

function ManageMasterpage() {
    var instance = {};

    var MIN_DESKTOP_WIDTH = 1200;

    var hamburgerButtonSlt = '.hamburger-button';

    var hideLeftPanel = function () {
        if ($(hamburgerButtonSlt).attr('collapsed') == 'true') {
            return;
        }

        $('.left-panel').animate({
            width: 0
        }, 250, function () {
            $(this).hide();
            $(hamburgerButtonSlt).attr('collapsed', 'true');
        });
        $('.fake-panel').animate({
            width: 0
        }, 250, function () {
            $(this).hide();
            $('.main-container').css('width', '100%');
        });
        $('.nav-top').animate({
            left: 0
        }, 250);

        $('.nav-top').css('width', '100%');

    };

    var showLeftPanel = function () {
        if ($(hamburgerButtonSlt).attr('collapsed') != 'true') {
            return;
        }

        $('.left-panel').show(0, function () {
            $(this).animate({
                width: '225px',
            }, 250, function () {
                $(hamburgerButtonSlt).attr('collapsed', 'false');
            });
        });

        $('.fake-panel').show(0, function () {
            $(this).animate({
                width: '225px'
            }, 250, function () {
                $('.main-container').css('width', 'calc(100% - 225px)');
            });
        });

        $('.nav-top').animate({
            left: '225px',
            width: 'calc(100% - 225px)'
        }, 250);

        $('.nav-top').css('width', 'calc(100% - 225px)');

    };

    var handleLeftPanel = function () {
        var windowWidth = $(window).width();
        if (windowWidth <= MIN_DESKTOP_WIDTH) {
            hideLeftPanel();
            $('.nav-top').css('width', '100%');
        } else {
            showLeftPanel();
            $('.nav-top').css('width', 'calc(100% - 225px)');
        }
    };

    var handleHamburgerButtonStatus = function () {
        var windowWidth = $(window).width();
        if (windowWidth <= MIN_DESKTOP_WIDTH) {
            $(hamburgerButtonSlt).attr('collapsed', 'true');
        } else {
            $(hamburgerButtonSlt).attr('collapsed', 'false');
        }
    };

    $(hamburgerButtonSlt).click(function () {
        var isCollapsed = $(this).attr('collapsed') == 'true';
        if (isCollapsed) {
            showLeftPanel();
        } else {
            hideLeftPanel();
        }
    });

    var menuContentTab = new ContentTab('.top-menu-item');

    var userMenuTooltip = new PopupTooltip('.user-action', 0);

    var onDocumentReadyEvents = function () {
        // handleLeftPanel();
        handleHamburgerButtonStatus();
    };

    var onWindowResizeEvents = function () {
        // handleLeftPanel();
    };

    var addEventHandlers = function () {
        // document ready
        onDocumentReadyEvents();

        // Window resize
        $(window).resize(function () {
            onWindowResizeEvents();
        });

        // Event handler when modal popup is shown/hidden
        $('.modal').on('hidden.bs.modal', function () {
            var $input = $(this).find('input');
            if ($input.length > 0) {
                $input.val('');
            }
        });

        $('.modal').on('shown.bs.modal', function () {
            var $input = $(this).find('input');
            if ($input.length > 0) {
                $input.eq(0).focus();
            }
        });

    };

    $('.minimize-sidebar').on('click', function () {
        $('.course-sidebar').hide();
        $('.expand-sidebar').show();
        $(this).hide();
    });

    $('.expand-sidebar').on('click', function () {
        $('.course-sidebar').show();
        $('.expand-sidebar').hide();
        $('.minimize-sidebar').show();
    });

    addEventHandlers();

    return instance;
}
