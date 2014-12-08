/**
 * 전달된 el 변수에 참조된 요소의 prop 변수 속성 값을 반환하는 함수
 */
var getStyle = function (el, prop) {
    return doc.defaultView ? doc.defaultView.getComputedStyle(el,null)[prop] : el.currentStyle[prop];
};