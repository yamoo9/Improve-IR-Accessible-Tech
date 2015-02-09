/**
 * 외부에서 접근 가능한 함수 - DOMReady
 * 문서객체모델(DOM)이 준비되면, 전달된 fn 함수 실행
 */
var DOMReady = function(fn) {
    if (typeof fn != 'function') { throw new Error('DOMReady 함수에 전달인자가 함수인지 확인하세요.') }
    if (window.addEventListener) { window.addEventListener("DOMContentLoaded", fn, false) }
    else { window.setTimeout(fn,0) }
};
/**
 * <body> 요소에 'no-img' 클래스 추가 함수
 * 외부에서 improveIR_class 값을 설정 가능
 */
var addClass = function (el, class_name) {
    if (el.classList) { el.classList.add(class_name); }
    else { el.className += ' '+class_name; }
    if(String.prototype.trim) { el.className.trim(); }
};
/**
 * 전달된 el 변수에 참조된 요소의 prop 변수 속성 값을 반환하는 함수
 */
var getStyle = function (el, prop) {
    return document.defaultView ? document.defaultView.getComputedStyle(el,null)[prop] : el.currentStyle[prop];
};
/**
 * 전달된 el 변수에 참조된 요소를 부모 요소로부터 제거하는 함수
 */
var removeElement = function(el) {
    el.parentNode.removeChild(el)
};
/*! improveIR.js © yamoo9.net, 2014
 *  CSS (on), Img (off) 로컬호스팅, 웹서버 환경에서만 테스팅 가능
 *  Windows 고대비(High Contrast) 모드 테스팅은 로컬 환경에서도 가능
 */

// 즉시 실행 함수 [전역을 오염시키지 않는 스코프 함수]
(function(global, doc) {

    // 스코프 함수 내부에서 사용되는 지역 변수 선언
    var UA = global.navigator.userAgent,
        _body, _img, checkImgHide, checkWinHC, isLtIE8, checkMobile, checkOSX_Safari;

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
     * 모바일 기기 체크 함수
     * http://detectmobilebrowsers.com/
     */
    checkMobile = (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){
            return true;
        }
    })(navigator.userAgent||navigator.vendor||window.opera);

    /**
     * 데스크탑 OSX Safari 체크 함수
     */
    checkOSX_Safari = (function(a,o){
        if( !checkMobile && (/safari/i.test(a))&&(/apple/i.test(o)) ){ return true; }
    })(navigator.userAgent, navigator.vender);

    /*  ==========================================================================
        글로벌 함수
        ========================================================================== */
    /**
     * 외부에서 접근 가능한 함수 - improveIR
     * 데스크탑일 경우에만 <body> 요소에 no-img 클래스 추가
     * 데스크탑 OSX Safari일 경우, 제외
     */
    global.improveIR = function() {
        _body = doc.body;
        console.log(!checkMobile && checkImgHide());
        if ( !checkMobile && checkWinHC() ) {
            if (!checkOSX_Safari) {
                addClass(_body, 'no-img');
            }
        }
    };

    // DOMReady() 함수에 전달인자 improveIR 함수를 전달하여 실행
    DOMReady(global.improveIR);

})(window, document);


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRPTVJlYWR5LmpzIiwiYWRkQ2xhc3MuanMiLCJnZXRTdHlsZS5qcyIsInJlbW92ZUVsZW1lbnQuanMiLCJpbXByb3ZlSVIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbXByb3ZlSVIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOyZuOu2gOyXkOyEnCDsoJHqt7wg6rCA64ql7ZWcIO2VqOyImCAtIERPTVJlYWR5XG4gKiDrrLjshJzqsJ3ssrTrqqjrjbgoRE9NKeydtCDspIDruYTrkJjrqbQsIOyghOuLrOuQnCBmbiDtlajsiJgg7Iuk7ZaJXG4gKi9cbnZhciBET01SZWFkeSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPSAnZnVuY3Rpb24nKSB7IHRocm93IG5ldyBFcnJvcignRE9NUmVhZHkg7ZWo7IiY7JeQIOyghOuLrOyduOyekOqwgCDtlajsiJjsnbjsp4Ag7ZmV7J247ZWY7IS47JqULicpIH1cbiAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHsgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZuLCBmYWxzZSkgfVxuICAgIGVsc2UgeyB3aW5kb3cuc2V0VGltZW91dChmbiwwKSB9XG59OyIsIi8qKlxuICogPGJvZHk+IOyalOyGjOyXkCAnbm8taW1nJyDtgbTrnpjsiqQg7LaU6rCAIO2VqOyImFxuICog7Jm467aA7JeQ7IScIGltcHJvdmVJUl9jbGFzcyDqsJLsnYQg7ISk7KCVIOqwgOuKpVxuICovXG52YXIgYWRkQ2xhc3MgPSBmdW5jdGlvbiAoZWwsIGNsYXNzX25hbWUpIHtcbiAgICBpZiAoZWwuY2xhc3NMaXN0KSB7IGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NfbmFtZSk7IH1cbiAgICBlbHNlIHsgZWwuY2xhc3NOYW1lICs9ICcgJytjbGFzc19uYW1lOyB9XG4gICAgaWYoU3RyaW5nLnByb3RvdHlwZS50cmltKSB7IGVsLmNsYXNzTmFtZS50cmltKCk7IH1cbn07IiwiLyoqXG4gKiDsoITri6zrkJwgZWwg67OA7IiY7JeQIOywuOyhsOuQnCDsmpTshozsnZggcHJvcCDrs4DsiJgg7IaN7ISxIOqwkuydhCDrsJjtmZjtlZjripQg7ZWo7IiYXG4gKi9cbnZhciBnZXRTdHlsZSA9IGZ1bmN0aW9uIChlbCwgcHJvcCkge1xuICAgIHJldHVybiBkb2N1bWVudC5kZWZhdWx0VmlldyA/IGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWwsbnVsbClbcHJvcF0gOiBlbC5jdXJyZW50U3R5bGVbcHJvcF07XG59OyIsIi8qKlxuICog7KCE64us65CcIGVsIOuzgOyImOyXkCDssLjsobDrkJwg7JqU7IaM66W8IOu2gOuqqCDsmpTshozroZzrtoDthLAg7KCc6rGw7ZWY64qUIO2VqOyImFxuICovXG52YXIgcmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbClcbn07IiwiLyohIGltcHJvdmVJUi5qcyDCqSB5YW1vbzkubmV0LCAyMDE0XG4gKiAgQ1NTIChvbiksIEltZyAob2ZmKSDroZzsu6ztmLjsiqTtjIUsIOybueyEnOuyhCDtmZjqsr3sl5DshJzrp4wg7YWM7Iqk7YyFIOqwgOuKpVxuICogIFdpbmRvd3Mg6rOg64yA67mEKEhpZ2ggQ29udHJhc3QpIOuqqOuTnCDthYzsiqTtjIXsnYAg66Gc7LusIO2ZmOqyveyXkOyEnOuPhCDqsIDriqVcbiAqL1xuXG4vLyDsponsi5wg7Iuk7ZaJIO2VqOyImCBb7KCE7Jet7J2EIOyYpOyXvOyLnO2CpOyngCDslYrripQg7Iqk7L2U7ZSEIO2VqOyImF1cbihmdW5jdGlvbihnbG9iYWwsIGRvYykge1xuXG4gICAgLy8g7Iqk7L2U7ZSEIO2VqOyImCDrgrTrtoDsl5DshJwg7IKs7Jqp65CY64qUIOyngOyXrSDrs4DsiJgg7ISg7Ja4XG4gICAgdmFyIFVBID0gZ2xvYmFsLm5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgIF9ib2R5LCBfaW1nLCBjaGVja0ltZ0hpZGUsIGNoZWNrV2luSEMsIGlzTHRJRTgsIGNoZWNrTW9iaWxlLCBjaGVja09TWF9TYWZhcmk7XG5cbiAgICAvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAg66Gc7LusIO2VqOyImFxuICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuICAgIC8qKlxuICAgICAqIElFIDYsNyDruIzrnbzsmrDsoIAg6rCQ7KeAIO2VqOyImFxuICAgICAqL1xuICAgIGlzTHRJRTggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBVQS5tYXRjaCgvKG1zaWUgNil8KG1zaWUgNykvaWcpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiDsnbTrr7jsp4Ag7Iio6rmAIOuqqOuTnOyduOyngCDssrTtgaztlZjripQg7ZWo7IiYXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgc3JjIOydtOuvuOyngCDso7zshowgKOusuOyekOyXtClcbiAgICAgKi9cbiAgICBjaGVja0ltZ0hpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkYXRhX3VyaSwgX2ltZ193O1xuICAgICAgICAvLyBpc0x0ZUlFOCgpIO2VqOyImOydmCDqsrDqs7wg6rCS7JeQIOuUsOuluCDsobDqsbQg7LKY66as66y4XG4gICAgICAgIGlmICghaXNMdElFOCgpKSB7XG4gICAgICAgICAgICAvLyBkYXRhVVJJcyA+PiBJRTgrXG4gICAgICAgICAgICAvLyBodHRwOi8vY3NzLXRyaWNrcy5jb20vZGF0YS11cmlzL1xuICAgICAgICAgICAgLy8gaHR0cDovL3d3dy5waHBpZWQuY29tL21odG1sLXdoZW4teW91LW5lZWQtZGF0YS11cmlzLWluLWllNy1hbmQtdW5kZXIvXG4gICAgICAgICAgICBkYXRhX3VyaSA9ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFQLy8vd0FBQUNINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQ1JBRUFPdz09JztcbiAgICAgICAgICAgIF9ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8aW1nIGlkPVwiY2hlY2tJbWdcIiBzcmM9XCInK2RhdGFfdXJpKydcIiBhbHQ+Jyk7XG4gICAgICAgICAgICBfaW1nID0gZG9jLmdldEVsZW1lbnRCeUlkKCdjaGVja0ltZycpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElFIDYsN+ydmCDqsr3smrAg7LKY66asIOq1rOusuFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF9pbWcgPSBkb2MuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBfaW1nLnNyYyA9ICdodHRwOi8veWFtb285Lm5ldC9ibGFuazF4MS5naWYnO1xuICAgICAgICAgICAgX2ltZy5hbHQgPSAnJztcbiAgICAgICAgICAgIF9ib2R5LmFwcGVuZENoaWxkKF9pbWcpO1xuICAgICAgICB9XG4gICAgICAgIF9pbWdfdyA9IF9pbWcub2Zmc2V0V2lkdGg7XG4gICAgICAgIHJlbW92ZUVsZW1lbnQoIF9pbWcgKTtcbiAgICAgICAgcmV0dXJuIF9pbWdfdyA9PSAxID8gZmFsc2UgOiB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBXaW5kb3dzIE9TIOqzoOuMgOu5hCDrqqjrk5woaGlnaCBjb250cmFzdCBtb2RlKSDtmZzshLHtmZQg7LK07YGsIO2VqOyImFxuICAgICAqIOuLqOy2le2CpDogc2hpZnQgKyBhbHQgKyDtlITrprDtirjsiqTtgazrprAoUHJpbnQgU2NyZWVuKSDtgqTrpbwg64iM65+sIOuqqOuTnCBUb2dnbGUg67OA6rK9XG4gICAgICovXG4gICAgY2hlY2tXaW5IQyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9jaGVja0RpdiwgX2NvbG9yLCBfcmdiID0gJ3JnYigxLDEsMSknO1xuICAgICAgICBfYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsICc8ZGl2IGlkPVwiY2hlY2tEaXZcIj4nKTtcbiAgICAgICAgX2NoZWNrRGl2ID0gZG9jLmdldEVsZW1lbnRCeUlkKCdjaGVja0RpdicpO1xuICAgICAgICBfY2hlY2tEaXYuc3R5bGUuY29sb3IgPSBfcmdiO1xuICAgICAgICBfY29sb3IgPSBnZXRTdHlsZShfY2hlY2tEaXYsICdjb2xvcicpLnJlcGxhY2UoLyAvZywgJycpO1xuICAgICAgICByZW1vdmVFbGVtZW50KCBfY2hlY2tEaXYgKTtcbiAgICAgICAgcmV0dXJuIF9jb2xvciAhPSBfcmdiID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiDrqqjrsJTsnbwg6riw6riwIOyytO2BrCDtlajsiJhcbiAgICAgKiBodHRwOi8vZGV0ZWN0bW9iaWxlYnJvd3NlcnMuY29tL1xuICAgICAqL1xuICAgIGNoZWNrTW9iaWxlID0gKGZ1bmN0aW9uKGEpe1xuICAgICAgICBpZigvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhKXx8LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLDQpKSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pKG5hdmlnYXRvci51c2VyQWdlbnR8fG5hdmlnYXRvci52ZW5kb3J8fHdpbmRvdy5vcGVyYSk7XG5cbiAgICAvKipcbiAgICAgKiDrjbDsiqTtgaztg5EgT1NYIFNhZmFyaSDssrTtgawg7ZWo7IiYXG4gICAgICovXG4gICAgY2hlY2tPU1hfU2FmYXJpID0gKGZ1bmN0aW9uKGEsbyl7XG4gICAgICAgIGlmKCAhY2hlY2tNb2JpbGUgJiYgKC9zYWZhcmkvaS50ZXN0KGEpKSYmKC9hcHBsZS9pLnRlc3QobykpICl7IHJldHVybiB0cnVlOyB9XG4gICAgfSkobmF2aWdhdG9yLnVzZXJBZ2VudCwgbmF2aWdhdG9yLnZlbmRlcik7XG5cbiAgICAvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAg6riA66Gc67KMIO2VqOyImFxuICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuICAgIC8qKlxuICAgICAqIOyZuOu2gOyXkOyEnCDsoJHqt7wg6rCA64ql7ZWcIO2VqOyImCAtIGltcHJvdmVJUlxuICAgICAqIOuNsOyKpO2BrO2DkeydvCDqsr3smrDsl5Drp4wgPGJvZHk+IOyalOyGjOyXkCBuby1pbWcg7YG0656Y7IqkIOy2lOqwgFxuICAgICAqIOuNsOyKpO2BrO2DkSBPU1ggU2FmYXJp7J28IOqyveyasCwg7KCc7Jm4XG4gICAgICovXG4gICAgZ2xvYmFsLmltcHJvdmVJUiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBfYm9keSA9IGRvYy5ib2R5O1xuICAgICAgICBjb25zb2xlLmxvZyghY2hlY2tNb2JpbGUgJiYgY2hlY2tJbWdIaWRlKCkpO1xuICAgICAgICBpZiAoICFjaGVja01vYmlsZSAmJiBjaGVja1dpbkhDKCkgKSB7XG4gICAgICAgICAgICBpZiAoIWNoZWNrT1NYX1NhZmFyaSkge1xuICAgICAgICAgICAgICAgIGFkZENsYXNzKF9ib2R5LCAnbm8taW1nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRE9NUmVhZHkoKSDtlajsiJjsl5Ag7KCE64us7J247J6QIGltcHJvdmVJUiDtlajsiJjrpbwg7KCE64us7ZWY7JesIOyLpO2WiVxuICAgIERPTVJlYWR5KGdsb2JhbC5pbXByb3ZlSVIpO1xuXG59KSh3aW5kb3csIGRvY3VtZW50KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9