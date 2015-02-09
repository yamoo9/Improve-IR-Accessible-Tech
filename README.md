#Improve IR(Image Replacement) & Sprites<br>Accessible Technique

#### Windows 운영체제 Internet Explorer 고대비 모드에서의 접근성 이슈
Windows 운영체제 IE 웹 브라우저에서는 고대비 모드에서 배경이미지가 보이지 않는 접근성 문제가 발생합니다. 반면 OSX 운영체제에서는 이와 같은 문제가 발생하지 않습니다. 고대비 모드 접근성 문제 해결책으로 `improveIR.js`를 사용할 수 있습니다. [사용법](#user-content-improveirjs-사용법)을 참고하세요.

![](./demo/images/high-contrast-ie-accessibility-problem.gif?raw=true)

**고대비(High Contrast) 모드 활성화 단축키**<br>
`Alt + Shift + PrintScreen`

-

#### 세미나 발표 자료 슬라이드

<p><a href="//www.slideshare.net/jeehoon/1209-10-2014" title="Improve CSS IR &amp; Sprites Image Techniques for Accessibility" target="_blank">Improve CSS IR &amp; Sprites Image Techniques for Accessibility</a> </strong>, 작성자 <strong><a href="//www.slideshare.net/jeehoon" target="_blank">yamoo9</a></strong></p>

![발표 슬라이드 커버](http://image.slidesharecdn.com/css-irspritesaccessiblesolutionimproveir-141208181643-conversion-gate02/95/improve-css-ir-sprites-image-techniques-for-accessibility-1-638.jpg "Improve CSS IR & Sprites Image Techniques for Accessibility 발표 슬라이드 커버")

-

#### improveIR.js 사용법

`build/improveIR.min.js` 파일을 HTML 문서 `</head>` 앞에서 호출하도록 `<script>` 코드를 작성합니다.

```javascript
// <head> 영역에 <scirpt> 코드 삽입
<script type="text/javascript" src="build/improveIR.min.js"></script>
```
-

`demo/css/style.css` 파일의 `.ir`, `.ir-look` 클래스를 사용하여<br>
CSS 이미지 대체 기법 및 스프라이트 이미지의 웹 접근성을 향상시킬 수 있습니다.

```css
/* Phark Method: 참고 URL(darum.daum.net/convention/css/css_ir) */
.ir { overflow: hidden; text-indent: -9999em; }

/* Windows OS 고대비(High Contrast) 모드일 경우, 적용되는 스타일 코드 */
.no-img .ir { overflow: auto; text-indent: 0; }

.no-img .ir.ir-look { display: inline-block; border: 1px solid; border-radius: 4px; }
```
-
HTML 마크업은 IR, Sprites 기법을 적용할 요소에 속성 클래스 `ir` 값을 추가합니다. 간단하죠? ^o^<br>
요소의 외형을 표시하고자 할 경우에는 속성 클래스 `ir-look` 값을 추가로 붙여줍니다.

```html
<!-- 텍스트만 화면에 표시할 경우 -->
<a href="/" class="btn ir" role="button">버튼</a>

<!-- 텍스트+외형을 화면에 표시할 경우 -->
<a href="/" class="btn ir ir-look" role="button">버튼</a>
```

-

Copyright © 2014 yamoo9 <yamoo9@naver.com> / [@yamoo9](https://facebook.com/yamoo9) / [yamoo9.net](http://yamoo9.net/)