#Improve IR(Image Replacement) & Sprites<br>Accessible Technique

Windows High Contrast Mode 감지 및 CSS 활성화 Images 비활성화 상태 체크 감지 스크립트<br>
ImproveIR.js를 활용한 IR 테크닉 접근성 향상

#### 발표 슬라이드

<p><a href="//www.slideshare.net/jeehoon/1209-10-2014" title="Improve CSS IR &amp; Sprites Image Techniques for Accessibility" target="_blank">Improve CSS IR &amp; Sprites Image Techniques for Accessibility</a> </strong> from <strong><a href="//www.slideshare.net/jeehoon" target="_blank">yamoo9</a></strong></p>

![Slideshare에 올린 발표자료](http://image.slidesharecdn.com/css-irspritesaccessiblesolutionimproveir-141208181643-conversion-gate02/95/improve-css-ir-sprites-image-techniques-for-accessibility-1-638.jpg?cb=1418084455)

====

#### 사용법

build/improveIR.min.js 파일을 HTML 문서 \</head> 앞에서 호출하도록 \<script> 코드를 작성합니다.

```javascript
<script type="text/javascript" src="build/improveIR.min.js"></script>
```

demo/style.css 파일의 '.ir', '.ir-look' 클래스를 사용하여 CSS 이미지 대체 기법 및<br>
스프라이트 이미지의 웹 접근성을 향상시킬 수 있습니다.

```html
<!-- 텍스트만 화면에 표시할 경우 -->
<a href="/" class="btn ir" role="button">검색</a>

<!-- 텍스트+외형을 화면에 표시할 경우 -->
<a href="/" class="btn ir ir-look" role="button">검색</a>
```
