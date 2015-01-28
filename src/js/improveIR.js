/*! improveIR.js © yamoo9.net, 2014
 *  CSS (on), Img (off) 로컬호스팅, 웹서버 환경에서만 테스팅 가능
 *  Windows 고대비(High Contrast) 모드 테스팅은 로컬 환경에서도 가능
 */

// 즉시 실행 함수 [전역을 오염시키지 않는 스코프 함수]
(function(global, doc) {

    // 스코프 함수 내부에서 사용되는 지역 변수 선언
    var UA = global.navigator.userAgent,
        _body, _img, checkImgHide, checkWinHC, isLtIE8, checkMobile;

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

    /*  ==========================================================================
        글로벌 함수
        ========================================================================== */
    /**
     * 외부에서 접근 가능한 함수 - improveIR
     * 데스크탑일 경우에만 <body> 요소에 no-img 클래스 추가
     */
    global.improveIR = function() {
        _body = doc.body;
        if ( !checkMobile() && (checkImgHide() || checkWinHC()) ) {
            addClass(_body, 'no-img');
        }
    };

    // DOMReady() 함수에 전달인자 improveIR 함수를 전달하여 실행
    DOMReady(global.improveIR);

})(window, document);

