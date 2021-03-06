/**
 * Superfast crossbrowser implementation of "typeof" with some extras 
 * like plainObject, emptyObject, date and regexp.
 * 
 * 
 * Usage:
 * 
 * type(123, "number"); // true
 * type(123) === "number"; // true
 * type(document, "object"); // true
 * type(document, "plainObject"); // false
 * type({}, "plainObject"); // true
 * type({}, "emptyObject"); // true
 * type(new Date, "date"); // true
 * type(new Date, "object"); // true 
 * type( new RegExp, "regexp"); //true
 * type( new RegExp, "object"); //true
 * type( new RegExp) === "object"; //true
 * 
 * @version 0.1
 * @license Dual licensed under the MIT and GPL licenses.
 * @author Oleg Slobodskoi aka Kof (http://jsui.de)
 */

(function( global, window, undefined ){
    var hasOwnProperty = window.hasOwnProperty,
        toString = Object.prototype.toString;
        
        // types that work with "typeof"
    var types1 = {
            "string": true,
            "number": true,
            "boolean": true,
            "array": true,
            "object": true
        },
        // types that need extra attention in different cases
        types2 = {
            "[object Function]": "function",
            "[object Array]": "array",
            "[object Object]": "object",
            "[object RegExp]": "regexp",
            "[object Date]": "date"
        };
        
    function type( obj, expectedType ) {
        var type;
        
        // fast detection for null and undefined
        if ( obj === null ) {
            type = "object";
        } else if ( obj === undefined ) {
            type = "undefined";    
        } else {
            type = typeof obj;
            // only use toString call if its buggy type
            if ( !types1[type] ) {
                type = types2[toString.call(obj)];        
            }
        }
        
        if ( type === "object" && expectedType ) {
            
            // this is original jquery implementation of plain object detection
            if ( expectedType === "plainObject" ) {
                // Must be an Object.
                // Because of IE, we also have to check the presence of the constructor property.
                // Make sure that DOM nodes and window objects don"t pass through, as well
                if ( obj.nodeType || obj.setInterval || !types2[toString.call(obj)] ) {
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

            } else if ( expectedType === "emptyObject" ) {
                
                for ( var name in obj ) {
                    return false;
                }
                return true;

            } else if ( expectedType === "regexp" || expectedType === "date" ) {
                
                return types2[toString.call(obj)] === expectedType;
                    
            }
            
        }
      
        // if expected type was passed compare them, else return the type
        return expectedType === undefined ? type : type === expectedType;
    }
    
    global.type = type;
    
})( this, window ); 