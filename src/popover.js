Cabernet.Popover = Ember.View.extend({
    linkText: '',
    defaultLinkTemplate: '<a {{action "toggle"}}>{{linkText}}</a>',
    linkTemplate: null,
    contentTemplate: '',
    placement: 'below',

    init: function() {
        this.set('template', this.generateTemplate());
        return this._super();
    },

    toggle: function(e) {
        if (e) e.stopPropagation();

        var popover = this.$('div.popover');
        popover.toggle();
        if (popover.is(':visible')) {
            $('div.popover.active').removeClass('active').hide();
            popover.addClass('active');
            var params = this.getPositionParams(popover);
            popover.position({
                of: this.$('a'),
                my : params.my,
                at: params.at,
                //offset: '20'
            });
            if (params.left !== undefined) popover.children('div.arrow').css('left', params.left);
            
            popover.bind('clickoutside', function(e) {
                $(this).removeClass('active').hide().unbind('clickoutside');
            });
        } else {
            popover.removeClass('active').hide().unbind('clickoutside');
        }
    },

    generateTemplate: function() {
        var linkTmpl = Ember.none(this.get('linkTemplate')) ? this.get('defaultLinkTemplate') : this.get('linkTemplate');
        var placementClass = this.get('placement');
        if (placementClass == 'below left' || placementClass == 'below right') placementClass = 'below';
        else if (placementClass == 'above left' || placementClass == 'above right') placementClass = 'above';
        return Ember.Handlebars.compile(
            linkTmpl +
            '<div class="popover ' + placementClass + '"> \
                <div class="arrow"></div> \
                <div class="inner"> \
                    <div class="content">' +
                        this.get('contentTemplate') +
                    '</div> \
                </div> \
            </div>');
    },

    getPositionParams: function(popoverElt) {console.log(popoverElt.css('width'));
        var params = {
            'right': { my: 'left', at: 'right' },
            'below': { my: 'top', at: 'bottom' },
            'above': { my: 'bottom', at: 'center' },
            'left': { my: 'right', at: 'left' },
            'below right': { my: 'left top', at: 'center bottom', left: '20px' },
            'above right': { my: 'left bottom', at: 'center top', left: '20px' },
        }
        return params[this.get('placement')];
    }
});