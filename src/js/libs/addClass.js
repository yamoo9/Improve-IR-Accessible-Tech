/**
 * <body> 요소에 'no-img' 클래스 추가 함수
 * 외부에서 improveIR_class 값을 설정 가능
 */
var addClass = function (el, class_name) {
    if (el.classList) { el.classList.add(class_name); }
    else { el.className += ' '+class_name; }
    if(String.prototype.trim) { el.className.trim(); }
};