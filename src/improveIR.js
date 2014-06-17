/*! improveIR.js © yamoo9.net, 2014
 *  CSS (on), Img (off) 로컬호스팅, 웹서버 환경에서만 테스팅 가능
 *  Windows High Contrast 모드 테스팅은 로컬 환경에서도 가능
 */

// 즉시 실행 함수 [전역을 오염시키지 않는 스코프 함수]
(function(global, doc, undefined) {

    // 스코프 함수 내부에서 사용되는 지역 변수 선언
    var UA = global.navigator.userAgent,
        _body, _img, checkImgHide, checkWinHC, getStyle, bodyAddClassNoImg, removeElement, DOMReady, isLtIE8;

    /*  ==========================================================================
        로컬 함수
        ========================================================================== */
    /**
     * IE 6,7 브라우저 감지 함수
     */
    isLtIE8 = function () {
        return UA.match(/(msie 6)|(msie 7)/ig);
    };

    /**
     * 이미지 숨김 모드인지 체크하는 함수
     * @param  {string}     src 이미지 주소 (문자열)
     */
    checkImgHide = function () {
        var data_uri, _img_w;
        // isLteIE8() 함수의 결과 값에 따른 조건 처리문
        if (!isLtIE8()) {
            // dataURIs >> IE8+
            // http://css-tricks.com/data-uris/
            // http://www.phpied.com/mhtml-when-you-need-data-uris-in-ie7-and-under/
            data_uri = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
            _body.insertAdjacentHTML('afterbegin', '<img id="checkImg" src="'+data_uri+'" alt>');
            _img = doc.getElementById('checkImg');
        }
        // IE 6,7의 경우 처리 구문
        else {
            _img = doc.createElement('img');
            _img.src = 'http://yamoo9.net/blank1x1.gif';
            _img.alt = '';
            _body.appendChild(_img);
        }
        _img_w = _img.offsetWidth;
        removeElement( _img );
        return _img_w == 1 ? false : true;
    };

    /**
     * Windows OS 고대비 모드(high contrast mode) 활성화 체크 함수
     * 단축키: shift + alt + 프린트스크린(Print Screen) 키를 눌러 모드 Toggle 변경
     */
    checkWinHC = function () {
        var _checkDiv, _color, _rgb = 'rgb(1,1,1)';
        _body.insertAdjacentHTML('beforeend', '<div id="checkDiv">');
        _checkDiv = doc.getElementById('checkDiv');
        _checkDiv.style.color = _rgb;
        _color = getStyle(_checkDiv, 'color').replace(/ /g, '');
        removeElement( _checkDiv );
        return _color != _rgb ? true : false;
    };

    /**
     * 전달된 el 변수에 참조된 요소의 prop 변수 속성 값을 반환하는 함수
     */
    getStyle = function (el, prop) {
        return doc.defaultView ? doc.defaultView.getComputedStyle(el,null)[prop] : el.currentStyle[prop];
    };

    /**
     * 전달된 el 변수에 참조된 요소를 부모 요소로부터 제거하는 함수
     */
    removeElement = function(el) {
        el.parentNode.removeChild(el);
    };

    /**
     * <body> 요소에 'no-img' 클래스 추가 함수
     * 외부에서 improveIR_class 값을 설정 가능
     */
    bodyAddClassNoImg = function () {
        var class_name = global.improveIR_class || 'no-img';
        if (_body.classList) { _body.classList.add(class_name); }
        else { _body.className += ' '+class_name; }
        if(String.prototype.trim) { _body.className.trim(); }
    };

    /*  ==========================================================================
        글로벌 함수
        ========================================================================== */
    /**
     * 외부에서 접근 가능한 함수 - improveIR
     */
    global.improveIR = function() {
        _body = doc.body;
        if ( checkImgHide() || checkWinHC() ) {
            bodyAddClassNoImg();
        }
    };

    /**
     * 외부에서 접근 가능한 함수 - DOMReady
     * 문서객체모델(DOM)이 준비되면, 전달된 fn 함수 실행
     */
    global.DOMReady = function (fn) {
        if (typeof fn != 'function') { throw new Error('DOMReady 함수에 전달인자가 함수인지 확인하세요.'); }
        if (doc.addEventListener) {
            doc.addEventListener("DOMContentLoaded", fn, false); }
        else {
            global.setTimeout(fn,0); }
    };

    // DOMReady() 함수에 전달인자 improveIR 함수를 전달하여 실행
    global.DOMReady( global.improveIR );

})(window, document);

