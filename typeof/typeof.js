/**
 * One method to define typeof variable on crossbrowser manner and much more ...
 * 
 * @version 0.1
 * @license Dual licensed under the MIT and GPL licenses.
 * @author Oleg Slobodskoi aka Kof (http://jsui.de)
 */

(function( global, window, undefined ){
    var hasOwnProperty = window.hasOwnProperty,
        toString = Object.prototype.toString;

    var types = {
            '[object Array]': 'array',
            '[object Object]': 'object',
            '[object Function]': 'function',
            '[object Boolean]': 'boolean',
            '[object String]': 'string',
            '[object Number]': 'number'
        };
        
    function typeOf( obj, expectedType ) {
        var type;

        if ( obj === undefined ) {
            type = 'undefined';
        } else if ( obj === null ) {
            type = 'object';
        } else {
            type = types[toString.call(obj)];
        }

        if ( type === 'object' && expectedType ) {
            // this is original jquery implementation of plain object detection
            if ( expectedType === 'plainObject' ) {
                // Must be an Object.
                // Because of IE, we also have to check the presence of the constructor property.
                // Make sure that DOM nodes and window objects don't pass through, as well
                if ( obj.nodeType || obj.setInterval ) {
                    return false;
                }
                
                // Not own constructor property must be Object
                if ( obj.constructor
                    && !hasOwnProperty.call(obj, "constructor")
                    && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
                    return false;
                }
                
                // Own properties are enumerated firstly, so to speed up,
                // if last one is own, then all properties are own.
            
                for ( var key in obj ) {}
                
                return key === undefined || hasOwnProperty.call( obj, key );

            } else if ( expectedType === 'emptyObject' ) {
                for ( var name in obj ) {
                    return false;
                }
                return true;
            }
        }
      
        return expectedType === undefined ? type : type === expectedType;
    }
    
    global.typeOf = typeOf;
    
})( this, window ); 