/**
 * 전달된 el 변수에 참조된 요소를 부모 요소로부터 제거하는 함수
 */
var removeElement = function(el) {
    el.parentNode.removeChild(el)
};