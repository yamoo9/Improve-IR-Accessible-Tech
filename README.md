#Improve_IR_Accessible_Tech

Windows High Contrast Mode 감지 및 CSS 활성화 Images 비활성화 상태 체크 감지 스크립트<br />
ImproveIR.js를 활용한 IR 테크닉 접근성 향상

====

#### 사용법

src/improveIR.min.js 파일을 HTML 문서 \</head> 앞에서 호출하도록 \<script> 코드를 작성합니다.<br>
.ir, .ir-look 클래스를 사용하여 CSS 배경이미지 대체 기법의 접근성을 향상시킬 수 있습니다. (demo/css 파일 참고)

    <a href="/" class="btn ir" role="button">검색</a>
    <a href="/" class="btn ir ir-look" role="button">검색</a>

##### Source Tree
    .
    ├── README.md
    ├── demo
    │   ├── css
    │   │   ├── css-mq-4-HC.css
    │   │   ├── demo.css
    │   │   └── ir-demo.css
    │   ├── images
    │   │   ├── btn-search.jpg
    │   │   └── checkImgOff.gif
    │   ├── index.html
    │   └── js
    │       └── improveIR.min.js
    └── src
        ├── improveIR.js
        └── improveIR.min.js
