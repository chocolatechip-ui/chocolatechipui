export default (function() {

/**
 * ChocolateChip-UI Widget - Edit List.
 */
$.extend({
  /**
   * Setup an editable list, enabling reording of items and deletion:
   */
  EditList: function(options) {
    /**
      options = {
        editLabel: labelName,
        doneLabel: labelName,
        deleteLabel: labelName,
        cancelLabel: cancelName,
        callback: callback (Tapping "Done" fires this),
        deletable: false (no deletables),
        movable: false (no movables),
        model: myModel,
        modelProp: 'id',
        view: myView
      }
    */
    const settings = {
      editLabel: 'Edit',
      doneLabel: 'Done',
      deleteLabel: 'Delete',
      cancelLabel: 'Cancel',
      callback: $.noop,
      deletable: true,
      movable: true,
      model: undefined,
      modelProp: 'id',
      view: undefined
    };

    let __data = [];
    let __editMade = false;
    if (!options) {
      return;
    }
    $.extend(settings, options);
    const __model = settings.model || false;

    if (!settings.deletable && !settings.movable) {
      return;
    }
    const __view = settings.view;

    if (options) $.extend(settings, options);

    let deleteButton = undefined;
    let editButton = undefined;
    let deletionIndicator = undefined;
    let button = undefined;
    let dispelDeletable = 'swiperight';
    let enableDeletable = 'swipeleft';
    let moveUpIndicator = undefined;
    let moveDownIndicator = undefined;
    let element = settings.element;
    let deleteLabel = undefined;

    let dir = $('html').attr('dir');
    dir = dir ? dir.toLowerCase() : '';
    if (dir === 'rtl') {
      dispelDeletable = 'swipeleft';
      enableDeletable = 'swiperight';
    }

    if (settings.deletable) {
      deleteButton = 
        `<button class="delete">
          <label>${ settings.deleteLabel }</label>
          <svg width="27px" height="30px" viewBox="0 0 27 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="delete-icon" fill="#3A3A3A">
                <g transform="translate(3.000000, 1.000000)">
                  <path d="M1,6 L20,6 L20,24.9986131 C20,26.6562333 18.6639569,28 16.9998779,28 L4.00012207,28 C2.3432004,28 1,26.6569187 1,24.9986131 L1,6 Z M4,9 L5,9 L5,25 L4,25 L4,9 Z M8,9 L9,9 L9,25 L8,25 L8,9 Z M12,9 L13,9 L13,25 L12,25 L12,9 Z M16,9 L17,9 L17,25 L16,25 L16,9 Z" id="can"></path><path d="M0,4.96611425 L0,1.67759301 L5.1776507,1.7511163 L6.482399,0 L14.5847825,0 L15.8789491,1.7511163 L21,1.7511163 L21,4.9447157 L0,4.96611425 L0,4.96611425 Z" id="lid"></path>
                </g>
              </g>
            </g>        
          </svg>      
        </button>`;
      deletionIndicator = 
        `<span class="deletion-indicator">
          <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="deletion-indicator">
                <g id="ios-indicator">
                  <circle id="ios-circle" fill="#FF0000" cx="10" cy="10" r="10"></circle>
                  <path d="M3.5,10 L16.5,10" id="ios-bar" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square"></path>
                </g>
                <path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#FA0303" stroke-width="2"></path>
              </g>
            </g>
          </svg>
        </span>`;
      $(element).addClass('deletable');
    }
    if (settings.movable) {
      moveUpIndicator = 
        `<span class='move-up'>
          <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="move-indicator">
                <circle id="circle" cx="11" cy="11" r="10"></circle>
                <path d="M4,13.9645823 L10.9316382,5.94630319 L17.795297,13.9073417" id="move-up"></path>
              </g>
            </g>
          </svg>
        </span>`;
      moveDownIndicator = 
        `<span class='move-down'>
          <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="move-indicator">
                <circle id="circle" cx="11" cy="11" r="10"></circle>
                <path d="M4.0421421,7.98172087 L10.912246,16 L17.7960071,8.1103389" id="move-down"></path>
              </g>
            </g>
          </svg>
        </span>`;
      $(element).addClass('editable');
    }

    editButton = `<button class="edit">${ settings.editLabel }</button>`;
    const screen = $(element).closest('screen');
    const nav = $(element).closest('screen').find('nav');
    nav.append(editButton);
    nav.find('.back').hide();
    nav.prepend(`<button class="cancel">${ settings.cancelLabel }</button>`);
    nav.find('.cancel').hide();
    $.AdjustNavbarLayout($(element).closest('screen'));

    button = $(element).closest('screen').find('.edit');
    $(element).find('li').forEach(function (ctx) {
      if (!$(ctx).has('.deletion-indicator').length) {
        if (settings.deletable) {
          $(ctx).prepend(deletionIndicator);
        }
        if (settings.movable) {
          $(ctx).append(moveDownIndicator);
          $(ctx).append(moveUpIndicator);
        }
        if (settings.deletable) {
          $(ctx).append(deleteButton);
        }
      }
    });

    /**
     * Callback to setup indicator interactions:
     */
    const makeEditable = function makeEditable(callback, list, button) {
      $(function () {

        /**
         * Check for view and update its template:
         */
        if (__view) {
          const temp = $('<div></div>');
          temp[0].insertAdjacentHTML('afterbegin', __view.getTemplate());
          temp.find('li').prepend(deletionIndicator);
          temp.find('li').append(moveDownIndicator);
          temp.find('li').append(moveUpIndicator);
          const template = temp.html();
          __view.setTemplate(template);
        }

        button.on('tap', function () {
          const $this = this;

          /**
           * When button is in "Edit" state:
           */
          if (this.classList.contains('edit')) {
            $(list).addClass('editing');
            setTimeout(function () {
              $this.classList.remove('edit');
              $this.classList.add('done');
              $($this).text(settings.doneLabel);
              $(list).addClass('showIndicators');
              $($this).siblings('.back').hide();
              $($this).siblings('.cancel').show();
              $.AdjustNavbarLayout(screen);
            });

            /**
             * When button is in "Done" state:
             */
          } else if (this.classList.contains('done')) {
            $(list).removeClass('editing');
            /**
             * Execute callback if edit was performed:
             */
            setTimeout(function () {
              $this.classList.remove('done');
              $this.classList.add('edit');
              $($this).text(settings.editLabel);
              $(list).removeClass('showIndicators');
              $(list).find('li').removeClass('selected');
              $($this).siblings('.cancel').hide();
              if (settings.deletable) {
                if ($(list).find('button.delete')[0]) return;
                $(list).find('li').append(deleteButton);
              }
              $.AdjustNavbarLayout(screen);
            });
            if (!__editMade) return;
            const movedItems = [];
            $(list).find('li').forEach(function (ctx, idx) {
              __data.push($(ctx).attr('data-id'));
            });

            /**
             * Reorder model based on user choice:
             */
            if (__model) {
              (function () {
                let __newarray = [];
                __data.filter(function (item) {
                  const ret = __model.filter(function (b) {
                    return b[settings.modelProp] == item;
                  });
                  __newarray.push(ret[0]);
                });
                __data = [];
                __model.purge();
                __model.replace(__newarray, false);
                __newarray = [];
              })();
            }
            if ($(list).data('list-edit')) {
              callback.call(callback, __model);
            }
            __editMade = false;
          }
          setTimeout(function () {
            $.AdjustNavbarLayout(screen);
          });
        });

        /**
         * Handle deletion indicators:
         */
        $(list).off('tap', '.deletion-indicator');
        $(list).on('tap', '.deletion-indicator', function () {
          if ($(this).closest('li').hasClass('selected')) {
            $(this).closest('li').removeClass('selected');
            return;
          } else {
            $(this).closest('li').addClass('selected');
          }
        });

        /**
         * Handle swipe gestures:
         */
        $(list).on(dispelDeletable, 'li', function () {
          /**
           * If no deletables, disable swipes:
           */
          if (!settings.deletable) return;
          /**
           * Else reveal delete button:
           */
          $(this).removeClass('selected');
        });

        $(list).on(enableDeletable, 'li', function () {
          /**
           * If no deletables, disable swipes:
           */
          if (!settings.deletable) return;
          /**
           * Else reveal delete button:
           */
          $(this).addClass('selected');
        });

        /**
         * Move list item up:
         */
        $(list).on('tap', '.move-up', function (e) {
          const _this = this;
          __editMade = true;

          let item = $(this).closest('li');
          if (item.is('li:first-child')) {
            return;
          } else {
            (function () {
              /**
               * Mark list as edited:
               */
              $(list).data('list-edit', true);
              item = $(_this).closest('li');
              const prev = item.prev();
              /**
               * Clone the items to replace the transitioned ones alter:
               */
              const itemClone = item.clone();
              const prevClone = prev.clone();
              const height = item[0].offsetHeight;
              item.css({
                "-webkit-transform": 'translate3d(0,-' + height + 'px,0)',
                "transform": 'translate3d(0,-' + height + 'px,0)'
              });

              prev.css({
                "-webkit-transform": 'translate3d(0,' + height + 'px,0)',
                "transform": 'translate3d(0,' + height + 'px,0)'
              });
              setTimeout(function () {
                $.replace(prevClone, item);
                $.replace(itemClone, prev);
                /**
                 * Remove Android ripple from moved list item.
                 */
                $('ripple-sheath').remove();
              }, 250);
            })();
          }
        });

        /**
         * Move list item down:
         */
        $(list).on('tap', '.move-down', function (e) {
          __editMade = true;
          const item = $(this).closest('li');
          const next = item.next();
          if (item.is('li:last-child')) {
            return;
          } else {
            (function () {
              /**
               * Clone the items to replace the transitioned ones alter:
               */
              const itemClone = item.clone();
              const nextClone = next.clone();
              /**
               * Mark list as edited:
               */
              $(list).data('list-edit', true);

              const height = item[0].offsetHeight;
              item.css({
                '-webkit-transform': 'translate3d(0,' + height + 'px,0)',
                transform: 'translate3d(0,' + height + 'px,0)'
              });
              next.css({
                "-webkit-transform": 'translate3d(0,-' + height + 'px,0)',
                "transform": 'translate3d(0,-' + height + 'px,0)'
              });
              setTimeout(function () {
                
                $.replace(nextClone, item);
                $.replace(itemClone, next);
                /**
                 * Remove Android ripple from moved list item.
                 */
                $('ripple-sheath').remove();
              }, 250);
            })();
          }
        });

        /**
         * Handle deletion of list item:
         */
        $(list).on('tap', '.delete', function () {
          const $this = this;
          __editMade = true;
          const listItem = $(this).parent();

          /**
           * Mark list as edited:
           */
          $(list).data('list-edit', true);
          let direction = '-1200%';
          if ($('html').attr('dir') === 'rtl') direction = '1000%';
          $(this).siblings().css({
            '-webkit-transform': 'translate3d(' + direction + ',0,0)',
            '-webkit-transition': 'all 1s ease-out',
            'transform': 'translate3d(' + direction + ',0,0)',
            'transition': 'all 1s ease-out'
          });

          setTimeout(function () {
            listItem.remove();
          }, 500);
        });

        /**
         * Cancel edits:
         */
        nav.find('.cancel').on('tap', function () {
          __editMade = false;
          nav.find('.back').show();
          $(this).hide();
          __view.render();
          nav.find('.done').addClass('edit').removeClass('done').text(settings.editLabel);
          $(list).removeClass('showIndicators');
          $(list).find('li').removeClass('selected');
          $(this).hide();
          if (settings.deletable) {
            $(list).find('li').append(deleteButton);
          }
        });
      });
    };
    /**
     * Initialize the editable list:
     */
    makeEditable(settings.callback, element, button);

    return {
      getModel: function getModel() {
        return __model;
      },

      getView: function getView() {
        return __view;
      }
    };
  }
});
})();