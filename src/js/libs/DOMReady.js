/**
 * 외부에서 접근 가능한 함수 - DOMReady
 * 문서객체모델(DOM)이 준비되면, 전달된 fn 함수 실행
 */
var DOMReady = function(fn) {
    if (typeof fn != 'function') { throw new Error('DOMReady 함수에 전달인자가 함수인지 확인하세요.') }
    if (window.addEventListener) { window.addEventListener("DOMContentLoaded", fn, false) }
    else { window.setTimeout(fn,0) }
};