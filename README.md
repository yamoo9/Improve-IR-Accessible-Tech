#Improve IR(Image Replacement) & Sprites<br>Accessible Technique

Windows High Contrast Mode 감지 및 CSS 활성화 Images 비활성화 상태 체크 감지 스크립트<br>
ImproveIR.js를 활용한 IR 테크닉 접근성 향상

#### 발표 슬라이드

<p><a href="//www.slideshare.net/jeehoon/1209-10-2014" title="Improve CSS IR &amp; Sprites Image Techniques for Accessibility" target="_blank">Improve CSS IR &amp; Sprites Image Techniques for Accessibility</a> </strong>, 작성자 <strong><a href="//www.slideshare.net/jeehoon" target="_blank">yamoo9</a></strong></p>

![Slideshare에 올린 발표 슬라이드 1](http://image.slidesharecdn.com/css-irspritesaccessiblesolutionimproveir-141208181643-conversion-gate02/95/improve-css-ir-sprites-image-techniques-for-accessibility-1-638.jpg?cb=1418084455)

![Slideshare에 올린 발표 슬라이드 25](http://image.slidesharecdn.com/css-irspritesaccessiblesolutionimproveir-141208181643-conversion-gate02/95/improve-css-ir-sprites-image-techniques-for-accessibility-25-638.jpg?cb=1418084455)

====

#### 사용법

build/improveIR.min.js 파일을 HTML 문서 \</head> 앞에서 호출하도록 \<script> 코드를 작성합니다.

```javascript
<script type="text/javascript" src="build/improveIR.min.js"></script>
```

demo/style.css 파일의 '.ir', '.ir-look' 클래스를 사용하여 CSS 이미지 대체 기법 및<br>
스프라이트 이미지의 웹 접근성을 향상시킬 수 있습니다.

```css
/* Phark Method: 참고 URL(darum.daum.net/convention/css/css_ir) */
.ir {
  overflow: hidden;
  text-indent: -9999em; }

/* Windows OS 고대비(High Contrast) 모드일 경우, 적용되는 스타일 코드 */
.no-img .ir {
  overflow: auto;
  text-indent: 0; }
  
.no-img .ir.ir-look {
  display: inline-block;
  border: 1px solid;
  border-radius: 4px; }
```

HTML 마크업은 IR, Sprites 기법을 적용할 요소에 속성 클래스 'ir' 값을 추가합니다. 간단하죠? :-)<br>
요소의 외형을 표시하고자 할 경우에는 속성 클래스 'ir-look' 값을 추가로 붙여줍니다.

```html
<!-- 텍스트만 화면에 표시할 경우 -->
<a href="/" class="btn ir" role="button">버튼</a>

<!-- 텍스트+외형을 화면에 표시할 경우 -->
<a href="/" class="btn ir ir-look" role="button">버튼</a>
```
