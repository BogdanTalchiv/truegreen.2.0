<template>
  <section
    :id="embedded ? 'coverage' : undefined"
    class="provinces-coverage"
    :class="embedded ? 'tg-section-alt' : 'tg-section'"
  >
    <div class="container-xl">

      <!-- Header -->
      <div class="text-center mb-5" data-aos="fade-up">
        <span class="prov-eyebrow">{{ locale === 'es' ? 'Cobertura nacional' : 'National coverage' }}</span>
        <component :is="embedded ? 'h2' : 'h1'" class="prov-heading">
          {{ locale === 'es' ? 'Mapa de provincias' : 'Province map' }}
        </component>
        <p class="prov-lead">
          {{
            locale === 'es'
              ? 'Haz clic en cualquier provincia para ver los detalles del servicio. Las provincias verdes forman parte de nuestra área de actuación actual.'
              : 'Click any province to view service details. Green provinces are within our current service area.'
          }}
        </p>
      </div>

      <!-- MAP -->
      <div class="map-card mb-5" data-aos="fade-up">
        <div class="map-inner">
          <svg viewBox="0 0 900 620" class="spain-svg" role="img"
               aria-label="Mapa de provincias de España">

            <!-- ─── GALICIA ─── -->
            <!-- A Coruña (inactive) -->
            <path class="prov-inactive" d="M 45,50 L 98,38 L 143,47 L 161,72 L 153,106 L 121,119 L 78,113 L 47,94 Z"
              @click="go('a-coruna')" @mouseenter="tip='A Coruña'" @mouseleave="tip=null" />
            <text x="88" y="78" class="pl">A Coruña</text>

            <!-- Lugo (ACTIVE) -->
            <path class="prov-active" d="M 143,47 L 202,35 L 251,51 L 258,83 L 249,119 L 228,136 L 196,140 L 165,130 L 153,106 L 161,72 Z"
              @click="go('lugo')" @mouseenter="tip='Lugo'" @mouseleave="tip=null" />
            <text x="197" y="90" class="pl pl-a">Lugo</text>

            <!-- Pontevedra (inactive) -->
            <path class="prov-inactive" d="M 47,94 L 78,113 L 121,119 L 140,133 L 148,159 L 128,182 L 89,188 L 55,174 L 44,147 Z"
              @click="go('pontevedra')" @mouseenter="tip='Pontevedra'" @mouseleave="tip=null" />
            <text x="87" y="153" class="pl">Pontevedra</text>

            <!-- Ourense (ACTIVE) -->
            <path class="prov-active" d="M 121,119 L 153,106 L 165,130 L 196,140 L 228,136 L 247,162 L 239,193 L 209,213 L 173,215 L 148,207 L 128,185 L 148,159 L 140,133 Z"
              @click="go('ourense')" @mouseenter="tip='Ourense'" @mouseleave="tip=null" />
            <text x="181" y="172" class="pl pl-a">Ourense</text>

            <!-- ─── ASTURIAS (ACTIVE) ─── -->
            <path class="prov-active" d="M 202,35 L 256,21 L 326,24 L 376,35 L 394,57 L 383,82 L 354,93 L 317,98 L 281,92 L 255,85 L 249,67 L 258,51 Z"
              @click="go('asturias')" @mouseenter="tip='Asturias'" @mouseleave="tip=null" />
            <text x="285" y="61" class="pl pl-a">Asturias</text>

            <!-- ─── CANTABRIA (ACTIVE) ─── -->
            <path class="prov-active" d="M 376,35 L 422,24 L 461,35 L 467,59 L 452,80 L 428,90 L 403,92 L 383,82 L 394,57 Z"
              @click="go('cantabria')" @mouseenter="tip='Cantabria'" @mouseleave="tip=null" />
            <text x="418" y="61" class="pl pl-a">Cantabria</text>

            <!-- ─── PAÍS VASCO ─── -->
            <!-- Bizkaia (inactive) -->
            <path class="prov-inactive" d="M 422,24 L 455,18 L 479,28 L 484,53 L 471,73 L 452,80 L 428,72 L 423,52 Z"
              @click="go('bizkaia')" @mouseenter="tip='Bizkaia'" @mouseleave="tip=null" />
            <text x="451" y="50" class="pl pl-xs">Bizkaia</text>

            <!-- Gipuzkoa (inactive) -->
            <path class="prov-inactive" d="M 455,18 L 488,12 L 509,25 L 511,52 L 495,70 L 471,73 L 484,53 L 479,28 Z"
              @click="go('gipuzkoa')" @mouseenter="tip='Gipuzkoa'" @mouseleave="tip=null" />
            <text x="484" y="44" class="pl pl-xs">Gipuzkoa</text>

            <!-- Álava (inactive) -->
            <path class="prov-inactive" d="M 423,52 L 428,72 L 452,80 L 471,73 L 495,70 L 504,95 L 483,119 L 455,126 L 428,119 L 412,101 Z"
              @click="go('alava')" @mouseenter="tip='Álava'" @mouseleave="tip=null" />
            <text x="454" y="98" class="pl pl-xs">Álava</text>

            <!-- ─── LA RIOJA (ACTIVE) ─── -->
            <path class="prov-active" d="M 354,93 L 383,82 L 403,92 L 412,101 L 428,119 L 455,126 L 463,145 L 446,158 L 418,158 L 392,145 L 371,122 L 361,107 Z"
              @click="go('la-rioja')" @mouseenter="tip='La Rioja'" @mouseleave="tip=null" />
            <text x="413" y="130" class="pl pl-a pl-xs">La Rioja</text>

            <!-- ─── NAVARRA (ACTIVE) ─── -->
            <path class="prov-active" d="M 488,12 L 511,7 L 558,18 L 582,47 L 586,90 L 570,126 L 549,149 L 518,158 L 497,153 L 481,134 L 463,145 L 455,126 L 483,119 L 504,95 L 495,70 L 511,52 Z"
              @click="go('navarra')" @mouseenter="tip='Navarra'" @mouseleave="tip=null" />
            <text x="524" y="98" class="pl pl-a">Navarra</text>

            <!-- ─── ARAGÓN ─── -->
            <!-- Huesca (ACTIVE) -->
            <path class="prov-active" d="M 511,7 L 558,18 L 582,47 L 602,53 L 652,46 L 705,50 L 709,86 L 701,102 L 676,122 L 646,131 L 610,130 L 579,118 L 570,126 L 586,90 L 582,47 Z"
              @click="go('huesca')" @mouseenter="tip='Huesca'" @mouseleave="tip=null" />
            <text x="622" y="82" class="pl pl-a">Huesca</text>

            <!-- Zaragoza (ACTIVE) -->
            <path class="prov-active" d="M 570,126 L 579,118 L 610,130 L 646,131 L 676,122 L 701,102 L 714,150 L 713,190 L 696,226 L 665,239 L 633,242 L 602,232 L 579,215 L 558,189 L 550,158 L 549,149 L 570,126 Z"
              @click="go('zaragoza')" @mouseenter="tip='Zaragoza'" @mouseleave="tip=null" />
            <text x="630" y="183" class="pl pl-a">Zaragoza</text>

            <!-- Teruel (ACTIVE) -->
            <path class="prov-active" d="M 549,149 L 550,158 L 558,189 L 579,215 L 602,232 L 633,242 L 665,239 L 686,267 L 682,305 L 655,331 L 625,336 L 596,326 L 570,306 L 548,276 L 538,246 L 542,211 L 551,168 Z"
              @click="go('teruel')" @mouseenter="tip='Teruel'" @mouseleave="tip=null" />
            <text x="602" y="272" class="pl pl-a">Teruel</text>

            <!-- ─── CATALUÑA ─── -->
            <!-- Lleida (inactive) -->
            <path class="prov-inactive" d="M 652,46 L 705,50 L 709,86 L 701,102 L 715,132 L 705,162 L 683,173 L 657,166 L 637,151 L 610,130 L 646,131 L 676,122 L 701,102 L 668,80 L 648,76 Z"
              @click="go('lleida')" @mouseenter="tip='Lleida'" @mouseleave="tip=null" />
            <text x="668" y="118" class="pl">Lleida</text>

            <!-- Girona (inactive) -->
            <path class="prov-inactive" d="M 705,50 L 752,42 L 800,52 L 834,82 L 826,118 L 804,136 L 776,142 L 750,133 L 728,120 L 720,102 L 748,76 Z"
              @click="go('girona')" @mouseenter="tip='Girona'" @mouseleave="tip=null" />
            <text x="770" y="96" class="pl">Girona</text>

            <!-- Barcelona (inactive) -->
            <path class="prov-inactive" d="M 715,132 L 720,102 L 728,120 L 750,133 L 776,142 L 806,155 L 798,186 L 775,203 L 749,208 L 726,200 L 708,182 L 700,160 L 705,138 Z"
              @click="go('barcelona')" @mouseenter="tip='Barcelona'" @mouseleave="tip=null" />
            <text x="750" y="168" class="pl">Barcelona</text>

            <!-- Tarragona (inactive) -->
            <path class="prov-inactive" d="M 700,160 L 708,182 L 726,200 L 749,208 L 775,218 L 768,248 L 744,263 L 718,259 L 699,241 L 692,220 L 696,192 Z"
              @click="go('tarragona')" @mouseenter="tip='Tarragona'" @mouseleave="tip=null" />
            <text x="730" y="224" class="pl">Tarragona</text>

            <!-- ─── CASTILLA Y LEÓN ─── -->
            <!-- León (ACTIVE) -->
            <path class="prov-active" d="M 255,85 L 281,92 L 317,98 L 338,95 L 339,170 L 312,178 L 280,178 L 249,174 L 226,190 L 209,213 L 247,163 L 228,136 L 249,119 L 258,83 Z"
              @click="go('leon')" @mouseenter="tip='León'" @mouseleave="tip=null" />
            <text x="278" y="142" class="pl pl-a">León</text>

            <!-- Palencia (ACTIVE) -->
            <path class="prov-active" d="M 338,95 L 354,93 L 361,107 L 371,122 L 380,148 L 380,180 L 362,182 L 339,170 Z"
              @click="go('palencia')" @mouseenter="tip='Palencia'" @mouseleave="tip=null" />
            <text x="355" y="142" class="pl pl-a pl-xs">Palencia</text>

            <!-- Burgos (ACTIVE) -->
            <path class="prov-active" d="M 354,93 L 383,82 L 403,92 L 428,90 L 428,119 L 412,101 L 392,145 L 418,158 L 446,158 L 463,145 L 468,200 L 447,210 L 420,208 L 395,196 L 380,180 L 380,148 L 371,122 L 361,107 Z"
              @click="go('burgos')" @mouseenter="tip='Burgos'" @mouseleave="tip=null" />
            <text x="416" y="157" class="pl pl-a">Burgos</text>

            <!-- Soria (ACTIVE) -->
            <path class="prov-active" d="M 463,145 L 549,149 L 551,168 L 542,211 L 516,230 L 480,232 L 455,220 L 450,200 L 468,200 L 463,158 Z"
              @click="go('soria')" @mouseenter="tip='Soria'" @mouseleave="tip=null" />
            <text x="500" y="193" class="pl pl-a">Soria</text>

            <!-- Zamora (ACTIVE) -->
            <path class="prov-active" d="M 209,213 L 226,190 L 249,174 L 280,178 L 312,178 L 328,200 L 320,232 L 296,252 L 265,257 L 234,252 L 211,240 Z"
              @click="go('zamora')" @mouseenter="tip='Zamora'" @mouseleave="tip=null" />
            <text x="265" y="215" class="pl pl-a">Zamora</text>

            <!-- Valladolid (ACTIVE) -->
            <path class="prov-active" d="M 312,178 L 339,170 L 362,182 L 380,180 L 395,196 L 400,225 L 384,240 L 358,242 L 336,238 L 320,232 L 328,200 Z"
              @click="go('valladolid')" @mouseenter="tip='Valladolid'" @mouseleave="tip=null" />
            <text x="358" y="212" class="pl pl-a">Valladolid</text>

            <!-- Salamanca (ACTIVE) -->
            <path class="prov-active" d="M 211,240 L 234,252 L 265,257 L 296,252 L 320,260 L 322,296 L 300,318 L 268,322 L 235,314 L 210,294 L 203,270 Z"
              @click="go('salamanca')" @mouseenter="tip='Salamanca'" @mouseleave="tip=null" />
            <text x="262" y="283" class="pl pl-a">Salamanca</text>

            <!-- Ávila (ACTIVE) -->
            <path class="prov-active" d="M 320,260 L 336,238 L 358,242 L 384,240 L 400,258 L 402,285 L 384,308 L 355,318 L 328,314 L 322,296 Z"
              @click="go('avila')" @mouseenter="tip='Ávila'" @mouseleave="tip=null" />
            <text x="360" y="280" class="pl pl-a">Ávila</text>

            <!-- Segovia (ACTIVE) -->
            <path class="prov-active" d="M 384,240 L 400,225 L 420,208 L 447,210 L 468,200 L 480,232 L 468,252 L 445,262 L 420,262 L 402,255 L 402,245 Z"
              @click="go('segovia')" @mouseenter="tip='Segovia'" @mouseleave="tip=null" />
            <text x="432" y="232" class="pl pl-a">Segovia</text>

            <!-- ─── MADRID (ACTIVE) ─── -->
            <path class="prov-active prov-madrid" d="M 402,255 L 420,262 L 445,262 L 458,275 L 462,298 L 446,318 L 420,325 L 398,318 L 388,300 L 392,278 Z"
              @click="go('madrid')" @mouseenter="tip='Madrid'" @mouseleave="tip=null" />
            <text x="423" y="295" class="pl pl-a pl-xs">Madrid</text>

            <!-- ─── CASTILLA-LA MANCHA ─── -->
            <!-- Guadalajara (ACTIVE) -->
            <path class="prov-active" d="M 468,200 L 480,232 L 516,230 L 542,211 L 548,249 L 538,278 L 516,292 L 490,288 L 466,270 L 458,252 L 468,248 Z"
              @click="go('guadalajara')" @mouseenter="tip='Guadalajara'" @mouseleave="tip=null" />
            <text x="502" y="252" class="pl pl-a">Guadalajara</text>

            <!-- Cuenca (ACTIVE) -->
            <path class="prov-active" d="M 490,288 L 516,292 L 538,278 L 548,249 L 570,306 L 596,326 L 604,360 L 584,385 L 556,390 L 524,378 L 504,352 L 494,318 Z"
              @click="go('cuenca')" @mouseenter="tip='Cuenca'" @mouseleave="tip=null" />
            <text x="544" y="336" class="pl pl-a">Cuenca</text>

            <!-- Toledo (ACTIVE) -->
            <path class="prov-active" d="M 322,296 L 328,314 L 355,318 L 384,308 L 402,318 L 420,325 L 446,318 L 466,328 L 468,360 L 445,382 L 412,392 L 378,392 L 350,378 L 326,358 L 316,332 Z"
              @click="go('toledo')" @mouseenter="tip='Toledo'" @mouseleave="tip=null" />
            <text x="390" y="352" class="pl pl-a">Toledo</text>

            <!-- Ciudad Real (ACTIVE) -->
            <path class="prov-active" d="M 316,332 L 326,358 L 350,378 L 378,392 L 412,392 L 445,382 L 468,360 L 494,378 L 504,412 L 490,442 L 459,455 L 420,458 L 380,450 L 346,434 L 318,410 L 304,380 Z"
              @click="go('ciudad-real')" @mouseenter="tip='Ciudad Real'" @mouseleave="tip=null" />
            <text x="400" y="415" class="pl pl-a">Ciudad Real</text>

            <!-- Albacete (ACTIVE) -->
            <path class="prov-active" d="M 494,318 L 504,352 L 524,378 L 556,390 L 584,385 L 604,360 L 625,336 L 655,331 L 672,360 L 664,402 L 635,430 L 598,438 L 560,430 L 524,420 L 504,412 L 494,378 L 468,360 L 466,328 L 490,318 Z"
              @click="go('albacete')" @mouseenter="tip='Albacete'" @mouseleave="tip=null" />
            <text x="572" y="390" class="pl pl-a">Albacete</text>

            <!-- ─── EXTREMADURA ─── -->
            <!-- Cáceres (inactive) -->
            <path class="prov-inactive" d="M 203,270 L 210,294 L 235,314 L 268,322 L 300,318 L 316,332 L 304,380 L 278,400 L 242,404 L 206,395 L 178,370 L 168,335 L 175,305 Z"
              @click="go('caceres')" @mouseenter="tip='Cáceres'" @mouseleave="tip=null" />
            <text x="238" y="348" class="pl">Cáceres</text>

            <!-- Badajoz (inactive) -->
            <path class="prov-inactive" d="M 168,335 L 178,370 L 206,395 L 242,404 L 278,400 L 304,380 L 318,410 L 304,448 L 278,468 L 240,476 L 195,465 L 158,444 L 136,415 L 132,378 L 150,352 Z"
              @click="go('badajoz')" @mouseenter="tip='Badajoz'" @mouseleave="tip=null" />
            <text x="220" y="428" class="pl">Badajoz</text>

            <!-- ─── COMUNIDAD VALENCIANA ─── -->
            <!-- Castellón (inactive) -->
            <path class="prov-inactive" d="M 686,267 L 692,220 L 699,241 L 718,259 L 720,290 L 710,320 L 690,336 L 668,340 L 654,320 L 655,295 L 660,270 L 670,265 Z"
              @click="go('castellon')" @mouseenter="tip='Castellón'" @mouseleave="tip=null" />
            <text x="685" y="303" class="pl">Castellón</text>

            <!-- Valencia (inactive) -->
            <path class="prov-inactive" d="M 655,295 L 654,320 L 668,340 L 690,336 L 710,320 L 718,352 L 710,382 L 692,400 L 670,408 L 648,400 L 636,378 L 638,348 L 644,320 Z"
              @click="go('valencia')" @mouseenter="tip='Valencia'" @mouseleave="tip=null" />
            <text x="672" y="362" class="pl">Valencia</text>

            <!-- Alicante (inactive) -->
            <path class="prov-inactive" d="M 638,348 L 636,378 L 648,400 L 670,408 L 692,400 L 710,420 L 704,452 L 680,468 L 654,466 L 634,452 L 622,430 L 620,400 L 630,375 Z"
              @click="go('alicante')" @mouseenter="tip='Alicante'" @mouseleave="tip=null" />
            <text x="658" y="430" class="pl">Alicante</text>

            <!-- ─── MURCIA ─── -->
            <path class="prov-inactive" d="M 560,430 L 598,438 L 635,430 L 664,402 L 672,360 L 686,380 L 690,418 L 704,452 L 680,468 L 654,466 L 622,458 L 595,465 L 570,455 L 552,438 Z"
              @click="go('murcia')" @mouseenter="tip='Murcia'" @mouseleave="tip=null" />
            <text x="624" y="442" class="pl">Murcia</text>

            <!-- ─── ANDALUCÍA ─── -->
            <!-- Huelva (inactive) -->
            <path class="prov-inactive" d="M 132,415 L 136,378 L 168,365 L 175,405 L 175,445 L 160,468 L 140,492 L 112,506 L 90,498 L 80,470 L 96,444 Z"
              @click="go('huelva')" @mouseenter="tip='Huelva'" @mouseleave="tip=null" />
            <text x="124" y="462" class="pl">Huelva</text>

            <!-- Sevilla (inactive) -->
            <path class="prov-inactive" d="M 175,405 L 206,395 L 242,404 L 278,400 L 304,420 L 318,448 L 308,478 L 285,496 L 255,502 L 222,496 L 195,478 L 172,456 L 160,428 Z"
              @click="go('sevilla')" @mouseenter="tip='Sevilla'" @mouseleave="tip=null" />
            <text x="240" y="456" class="pl">Sevilla</text>

            <!-- Cádiz (inactive) -->
            <path class="prov-inactive" d="M 160,428 L 172,456 L 195,478 L 175,510 L 158,534 L 135,548 L 112,542 L 96,526 L 90,498 L 112,506 L 140,492 L 160,468 L 175,445 Z"
              @click="go('cadiz')" @mouseenter="tip='Cádiz'" @mouseleave="tip=null" />
            <text x="130" y="510" class="pl">Cádiz</text>

            <!-- Córdoba (inactive) -->
            <path class="prov-inactive" d="M 278,400 L 304,380 L 318,410 L 346,434 L 380,450 L 400,476 L 388,508 L 360,524 L 330,525 L 300,514 L 274,498 L 255,502 L 285,496 L 308,478 L 318,448 L 304,420 Z"
              @click="go('cordoba')" @mouseenter="tip='Córdoba'" @mouseleave="tip=null" />
            <text x="320" y="476" class="pl">Córdoba</text>

            <!-- Jaén (inactive) -->
            <path class="prov-inactive" d="M 380,450 L 420,458 L 459,455 L 490,470 L 498,502 L 482,526 L 455,538 L 425,538 L 400,528 L 388,508 L 400,476 Z"
              @click="go('jaen')" @mouseenter="tip='Jaén'" @mouseleave="tip=null" />
            <text x="434" y="497" class="pl">Jaén</text>

            <!-- Málaga (inactive) -->
            <path class="prov-inactive" d="M 255,502 L 274,498 L 300,514 L 330,525 L 360,524 L 388,534 L 378,558 L 352,572 L 316,574 L 280,564 L 256,546 L 244,524 Z"
              @click="go('malaga')" @mouseenter="tip='Málaga'" @mouseleave="tip=null" />
            <text x="312" y="544" class="pl">Málaga</text>

            <!-- Granada (inactive) -->
            <path class="prov-inactive" d="M 388,508 L 400,528 L 425,538 L 455,538 L 482,526 L 510,535 L 520,558 L 504,578 L 472,588 L 440,588 L 408,578 L 382,562 L 378,540 L 388,534 L 360,524 Z"
              @click="go('granada')" @mouseenter="tip='Granada'" @mouseleave="tip=null" />
            <text x="446" y="556" class="pl">Granada</text>

            <!-- Almería (inactive) -->
            <path class="prov-inactive" d="M 490,470 L 524,462 L 560,465 L 595,480 L 612,505 L 608,532 L 582,550 L 545,558 L 520,558 L 510,535 L 482,526 L 498,502 Z"
              @click="go('almeria')" @mouseenter="tip='Almería'" @mouseleave="tip=null" />
            <text x="550" y="514" class="pl">Almería</text>

            <!-- ─── ISLANDS INSETS ─── -->
            <!-- Baleares (inactive) — inset box -->
            <rect x="752" y="348" width="130" height="62" rx="6" class="inset-box"
              @click="go('illes-balears')" @mouseenter="tip='Illes Balears'" @mouseleave="tip=null" />
            <text x="817" y="370" text-anchor="middle" class="inset-title">Illes Balears</text>
            <text x="817" y="390" text-anchor="middle" class="inset-sub">(isla — clic para ver)</text>

            <!-- Canarias (2 provinces) — inset box -->
            <rect x="42" y="508" width="185" height="88" rx="6" class="inset-box"
              @click="go('las-palmas')" @mouseenter="tip='Islas Canarias'" @mouseleave="tip=null" />
            <text x="134" y="530" text-anchor="middle" class="inset-title">Islas Canarias</text>
            <text x="134" y="550" text-anchor="middle" class="inset-sub">Las Palmas · Sta. Cruz Tenerife</text>
            <text x="134" y="568" text-anchor="middle" class="inset-sub">(islas — clic para ver)</text>

            <!-- Tooltip -->
            <g v-if="tip">
              <rect :x="tipX" :y="tipY - 22" :width="tip.length * 7.2 + 18" height="26" rx="5" fill="#1b5e20" />
              <text :x="tipX + (tip.length * 7.2 + 18) / 2" :y="tipY - 4"
                text-anchor="middle" fill="#fff" font-size="12" font-weight="700" font-family="Montserrat,sans-serif">
                {{ tip }}
              </text>
            </g>
          </svg>
        </div>

        <!-- Legend -->
        <div class="map-legend">
          <span class="leg-item"><span class="leg-dot leg-dot--active"></span>
            {{ locale === 'es' ? 'Provincia activa — clic para ver detalle' : 'Active province — click for details' }}</span>
          <span class="leg-item"><span class="leg-dot leg-dot--inactive"></span>
            {{ locale === 'es' ? 'Fuera de cobertura' : 'Outside coverage' }}</span>
        </div>
      </div>

      <!-- REGION CARDS -->
      <div class="region-cards-title text-center mb-4" data-aos="fade-up">
        <h3 class="fw-bold">{{ locale === 'es' ? 'Regiones en las que actuamos' : 'Regions where we operate' }}</h3>
      </div>

      <div class="row g-4" data-aos="fade-up">
        <div
          v-for="(group, i) in regionGroups"
          :key="group.slug"
          class="col-12 col-sm-6 col-lg-4"
          :data-aos-delay="i * 70"
        >
          <router-link :to="getRegionRoute(group.slug)" class="text-decoration-none d-block h-100">
            <div class="region-card h-100">
              <div class="region-card-top">
                <div class="region-icon"><i class="bi bi-geo-alt-fill"></i></div>
                <div>
                  <h4 class="region-name">{{ locale === 'es' ? group.nameEs : group.nameEn }}</h4>
                  <span class="region-count">
                    {{ group.provinces.length }}
                    {{ locale === 'es' ? (group.provinces.length === 1 ? 'provincia' : 'provincias') : (group.provinces.length === 1 ? 'province' : 'provinces') }}
                  </span>
                </div>
              </div>
              <div class="region-tags">
                <span v-for="p in group.provinces" :key="p" class="rtag">{{ p }}</span>
              </div>
              <div class="region-cta">
                {{ locale === 'es' ? 'Ver detalle' : 'View details' }}
                <i class="bi bi-arrow-right-short"></i>
              </div>
            </div>
          </router-link>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  defineProps({ embedded: { type: Boolean, default: false } })

  const { locale } = useI18n()
  const router = useRouter()

  const tip = ref(null)

  /* Tooltip appears near top-center of map for simplicity */
  const tipX = computed(() => {
    if (!tip.value) return 0
    return Math.max(10, Math.min(820, 450 - (tip.value.length * 7.2 + 18) / 2))
  })
  const tipY = computed(() => 22)

  /* Navigate to province/region detail page */
  function go(slug) {
    const base = locale.value === 'es' ? 'provincias' : 'provinces'
    router.push(`/${locale.value}/${base}/${slug}`)
  }

  /* Region route */
  function getRegionRoute(slug) {
    const base = locale.value === 'es' ? 'provincias' : 'provinces'
    return `/${locale.value}/${base}/${slug}`
  }

  /* Region groups for the cards */
  const regionGroups = [
    {
      slug: 'castilla-y-leon', nameEs: 'Castilla y León', nameEn: 'Castile and León',
      provinces: ['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora']
    },
    {
      slug: 'castilla-la-mancha', nameEs: 'Castilla-La Mancha', nameEn: 'Castile-La Mancha',
      provinces: ['Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo']
    },
    {
      slug: 'madrid', nameEs: 'Madrid', nameEn: 'Madrid',
      provinces: ['Madrid']
    },
    {
      slug: 'galicia', nameEs: 'Galicia (Lugo · Ourense)', nameEn: 'Galicia (Lugo · Ourense)',
      provinces: ['Lugo', 'Ourense']
    },
    {
      slug: 'aragon', nameEs: 'Aragón', nameEn: 'Aragon',
      provinces: ['Huesca', 'Teruel', 'Zaragoza']
    },
    {
      slug: 'otras-regiones', nameEs: 'Otras Regiones', nameEn: 'Other Regions',
      provinces: ['Asturias', 'Cantabria', 'La Rioja', 'Navarra']
    }
  ]
</script>

<style lang="scss" scoped>
  /* ── Section ── */
  .provinces-coverage { background: #fff; }

  /* ── Header ── */
  .prov-eyebrow {
    display: inline-block;
    background: rgba($tg-primary, 0.1);
    color: $tg-primary;
    font-weight: 700;
    font-size: 0.8rem;
    padding: 0.3rem 1rem;
    border-radius: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 0.875rem;
  }

  .prov-heading {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 800;
    color: $tg-text-primary;
    margin-bottom: 1rem;
  }

  .prov-lead {
    font-size: 1rem;
    color: $tg-text-secondary;
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.65;
  }

  /* ── Map card ── */
  .map-card {
    background: #fff;
    border: 1.5px solid #e2ebe4;
    border-radius: 22px;
    padding: 1.75rem 1.5rem 1.25rem;
    box-shadow:
      0 2px 8px rgba(13, 59, 15, 0.05),
      0 20px 50px rgba(13, 59, 15, 0.09);
  }

  .map-inner { overflow: hidden; }

  .spain-svg {
    width: 100%;
    height: auto;
    display: block;
    overflow: visible;
  }

  /* ── Province paths ── */
  .prov-inactive {
    fill: #eef2ef;
    stroke: #c8d4ca;
    stroke-width: 1;
    cursor: pointer;
    transition: fill 0.2s ease;

    &:hover { fill: #dde6de; }
  }

  .prov-active {
    fill: #c8e6c9;
    stroke: #4caf50;
    stroke-width: 1.2;
    cursor: pointer;
    transition: fill 0.2s ease, stroke-width 0.2s ease;

    &:hover {
      fill: #a5d6a7;
      stroke: #2e7d32;
      stroke-width: 1.8;
    }
  }

  .prov-madrid {
    fill: #b2dfdb;
    stroke: #009688;

    &:hover { fill: #80cbc4; stroke: #00796b; }
  }

  /* ── Province labels ── */
  .pl {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 700;
    fill: #283a28;
    pointer-events: none;
    user-select: none;

    &-a  { fill: #1b3a1e; }
    &-xs { font-size: 7.5px; }

    @media (max-width: 575.98px) { font-size: 7px; }
  }

  /* ── Inset boxes ── */
  .inset-box {
    fill: #f4f8f5;
    stroke: #c8d4ca;
    stroke-width: 1;
    stroke-dasharray: 5 3;
    cursor: pointer;
    transition: fill 0.2s ease;

    &:hover { fill: #dde8de; }
  }

  .inset-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 700;
    fill: #2e7d32;
    pointer-events: none;
  }

  .inset-sub {
    font-family: 'Montserrat', sans-serif;
    font-size: 7.5px;
    font-weight: 500;
    fill: #6c757d;
    pointer-events: none;
  }

  /* ── Legend ── */
  .map-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
    justify-content: center;
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid #e9edea;
  }

  .leg-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    color: $tg-text-secondary;
    font-weight: 500;
  }

  .leg-dot {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    flex-shrink: 0;

    &--active   { background: #c8e6c9; border: 1.5px solid #4caf50; }
    &--inactive { background: #eef2ef; border: 1.5px solid #c8d4ca; }
  }

  /* ── Region cards ── */
  .region-card {
    background: #fff;
    border: 1.5px solid #e2ebe4;
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    color: inherit;

    &:hover {
      border-color: $tg-primary;
      box-shadow: 0 8px 32px rgba(46, 125, 50, 0.12);
      transform: translateY(-3px);
    }
  }

  .region-card-top {
    display: flex;
    align-items: flex-start;
    gap: 0.875rem;
  }

  .region-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, $tg-primary, $tg-primary-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .region-name {
    font-size: 1rem;
    font-weight: 700;
    color: $tg-text-primary;
    margin-bottom: 0.15rem;
  }

  .region-count {
    font-size: 0.78rem;
    color: $tg-text-secondary;
    font-weight: 500;
  }

  .region-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    flex-grow: 1;
  }

  .rtag {
    display: inline-block;
    background: rgba($tg-primary, 0.08);
    color: $tg-primary-dark;
    font-size: 0.73rem;
    font-weight: 500;
    padding: 0.18rem 0.55rem;
    border-radius: 6px;
  }

  .region-cta {
    font-size: 0.85rem;
    font-weight: 700;
    color: $tg-primary;
    display: flex;
    align-items: center;
    padding-top: 0.75rem;
    border-top: 1px solid #f0f0f0;
  }
</style>
