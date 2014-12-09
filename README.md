#Improve IR(Image Replacement) & Sprites<br>Accessible Technique

Windows High Contrast Mode 감지 및 CSS 활성화 Images 비활성화 상태 체크 감지 스크립트<br>
ImproveIR.js를 활용한 IR 테크닉 접근성 향상

<iframe src="//www.slideshare.net/slideshow/embed_code/42494622" width="510" height="420" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/jeehoon/1209-10-2014" title="Improve CSS IR &amp; Sprites Image Techniques for Accessibility" target="_blank">Improve CSS IR &amp; Sprites Image Techniques for Accessibility</a> </strong> from <strong><a href="//www.slideshare.net/jeehoon" target="_blank">yamoo9</a></strong> </div>

====

#### 사용법

build/improveIR.min.js 파일을 HTML 문서 \</head> 앞에서 호출하도록 \<script> 코드를 작성합니다.<br>
.ir, .ir-look 클래스를 사용하여 CSS 배경이미지 대체 기법의 접근성을 향상시킬 수 있습니다.<br>
<small>(해당 스타일은 demo/style.css, src/\*.sass 파일 참고)</small>

```
<!-- 텍스트만 화면에 표시할 경우 -->
<a href="/" class="btn ir" role="button">검색</a>

<!-- 텍스트+외형을 화면에 표시할 경우 -->
<a href="/" class="btn ir ir-look" role="button">검색</a>
```
