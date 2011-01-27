/*
 * A bridge between iPad and iPhone touch events and jquery draggable, sortable etc. mouse interactions.
 * @author Oleg Slobodskoi  
 */
/iPad|iPhone/.test( navigator.userAgent ) && (function( $ ) {
    
    var proto =  $.ui.mouse.prototype,
        _mouseInit = proto._mouseInit;
    
    $.extend( proto, {
        _mouseInit: function() {
            this.element
                .bind( "touchstart." + this.widgetName, $.proxy( this, "_touchStart" ) );

            _mouseInit.apply( this, arguments );
        },
        
        _touchStart: function( event ) {
            if ( event.originalEvent.targetTouches.length != 1 ) {
                return false;
            }
    
            this.element
                .bind( "touchmove." + this.widgetName, $.proxy( this, "_touchMove" ) )
                .bind( "touchend." + this.widgetName, $.proxy( this, "_touchEnd" ) );

            this._modifyEvent( event );

            this._mouseDown( event );

            return false;           
        },
        
        _touchMove: function( event ) {
            this._modifyEvent( event );
            this._mouseMove( event );   
        },
        
        _touchEnd: function( event ) {
            this.element
                .unbind( "touchmove." + this.widgetName )
                .unbind( "touchend." + this.widgetName );
            this._mouseUp( event ); 
        },
        
        _modifyEvent: function( event ) {
            event.which = 1;
            var target = event.originalEvent.targetTouches[0];
            event.pageX = target.clientX;
            event.pageY = target.clientY;
        }
        
    });

})( jQuery );
