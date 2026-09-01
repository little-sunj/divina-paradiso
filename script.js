document.addEventListener("DOMContentLoaded", () => {
    const introScreen = document.getElementById("intro-screen");
    const introContent = document.getElementById("intro-content");
    const featherContainer = document.getElementById("feather-container");
    const mainContainer = document.getElementById("main-container");
    const detailContainer = document.getElementById("detail-container");
    const closeBtn = document.querySelector(".close-btn");
    
    // ----------------------------------------------------
    // ----------------------------------------------------
    // 1. Generate Hand-Drawn Sketch Feathers (8 Distinct Styles)
    // ----------------------------------------------------
    const featherCount = 75;
    const feathers = [];

    // 8 Hand-Drawn Sketch Line Art Feather SVG Templates (Adobe Stock Inspired)
    const featherTemplates = [
        // 1. S-Curved Swirling Flight Feather (S자 회오리형 깃털)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="hd1_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
                        <stop offset="50%" stop-color="#e2e8f0" stop-opacity="0.55"/>
                        <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.15"/>
                    </linearGradient>
                </defs>
                <path d="M72,12 C78,24 86,42 84,62 C82,78 72,94 62,112 C56,122 52,132 48,142 C47,138 46,130 44,120 C40,98 42,76 50,54 C56,38 64,22 72,12 Z" fill="url(#hd1_${id})"/>
                <path d="M72,10 Q60,78 44,168" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                <path d="M44,142 L43,168" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                <path d="M72,12 C78,24 86,42 84,62 L76,66 L83,74 C80,88 73,100 62,112 L56,116 L61,123 C56,132 52,138 48,142 M48,142 C46,135 44,124 43,116 L49,112 L42,104 C40,88 41,70 49,52 L55,48 L48,42 C54,28 64,18 72,12" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
                <path d="M52,44 L67,52 M49,54 L65,62 M47,64 L63,72 M46,74 L61,82 M46,84 L59,92 M47,94 L57,102 M48,104 L55,112 M47,114 L53,122 M46,124 L50,132
                         M82,38 L68,46 M84,48 L67,56 M85,58 L65,66 M81,68 L63,76 M78,78 L61,86 M73,88 L59,96 M68,98 L57,106 M62,108 L55,116 M57,118 L53,126
                         M44,142 Q36,146 30,154 M44,139 Q37,143 33,149 M44,136 Q52,142 58,150 M44,133 Q51,138 56,145" 
                      stroke="rgba(255,255,255,0.72)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // 2. Plump & Rounded Down Feather (통통하고 둥근 솜깃털)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="hd2_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.88"/>
                        <stop offset="60%" stop-color="#f1f5f9" stop-opacity="0.55"/>
                        <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.15"/>
                    </linearGradient>
                </defs>
                <path d="M57,18 C70,28 84,44 86,68 C88,92 80,114 66,132 C62,136 58,140 57,142 C56,140 52,136 48,132 C34,114 26,92 28,68 C30,44 44,28 57,18 Z" fill="url(#hd2_${id})"/>
                <path d="M57,18 C67,26 80,40 85,58 L77,62 L86,72 C87,88 82,106 72,122 L65,125 L70,131 C65,137 61,140 57,142 M57,142 C53,140 49,137 44,131 L49,125 L42,122 C32,106 27,88 28,72 L37,62 L29,58 C34,40 47,26 57,18" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
                <path d="M57,16 L57,168" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                <path d="M57,142 L57,168" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                <path d="M38,42 L56,52 M34,54 L56,64 M31,66 L56,76 M31,78 L56,88 M34,90 L56,100 M38,102 L56,112 M44,114 L56,122 M49,124 L56,132
                         M76,42 L58,52 M80,54 L58,64 M83,66 L58,76 M83,78 L58,88 M80,90 L58,100 M76,102 L58,112 M70,114 L58,122 M65,124 L58,132
                         M57,140 Q44,146 36,155 M57,137 Q47,142 41,149 M57,140 Q70,146 78,155 M57,137 Q67,142 73,149"
                      stroke="rgba(255,255,255,0.72)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // 3. Slender Straight Primary Quill (길고 날렵한 스트레이트 주익깃)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="hd3_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
                        <stop offset="50%" stop-color="#e2e8f0" stop-opacity="0.6"/>
                        <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.2"/>
                    </linearGradient>
                </defs>
                <path d="M60,6 C66,20 74,40 76,65 C78,90 72,115 62,138 L58,144 C56,140 52,126 48,112 C42,90 44,65 48,42 C52,24 56,12 60,6 Z" fill="url(#hd3_${id})"/>
                <path d="M60,6 C66,20 74,40 76,65 L68,69 L76,77 C77,95 72,116 62,138 L58,144 M58,144 C54,136 50,122 47,108 L53,104 L46,96 C42,76 43,54 48,36 C52,22 56,12 60,6" stroke="#ffffff" stroke-width="1.2" fill="none"/>
                <path d="M60,4 L58,172" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                <path d="M58,144 L58,172" stroke="#ffffff" stroke-width="2.7" stroke-linecap="round" fill="none"/>
                <path d="M50,28 L59,38 M47,42 L59,52 M45,56 L59,66 M45,70 L59,80 M46,84 L59,94 M48,98 L58,108 M51,112 L58,122 M53,126 L58,134
                         M70,24 L60,34 M74,38 L60,48 M76,52 L60,62 M76,66 L60,76 M74,80 L60,90 M71,94 L59,104 M67,108 L59,118 M63,122 L58,130"
                      stroke="rgba(255,255,255,0.72)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // 4. Multi-Notched Rough Wing Feather (여러 군데 갈라진 거친 깃털)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="hd4_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.88"/>
                        <stop offset="50%" stop-color="#e0e7ff" stop-opacity="0.55"/>
                        <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.15"/>
                    </linearGradient>
                </defs>
                <path d="M60,10 C66,22 75,34 78,48 L70,52 L79,62 C82,76 80,92 72,108 L64,112 L71,120 C65,130 58,138 54,142 C53,140 48,132 44,124 L50,120 L42,112 C36,96 35,78 39,60 L47,56 L40,48 C44,32 52,18 60,10 Z" fill="url(#hd4_${id})"/>
                <path d="M60,10 C66,22 75,34 78,48 L70,52 L79,62 C82,76 80,92 72,108 L64,112 L71,120 C65,130 58,138 54,142 M54,142 C53,140 48,132 44,124 L50,120 L42,112 C36,96 35,78 39,60 L47,56 L40,48 C44,32 52,18 60,10" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
                <path d="M60,8 L54,168" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                <path d="M54,142 L54,168" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                <path d="M47,38 L58,46 M43,50 L57,58 M40,64 L56,72 M40,76 L56,84 M42,90 L55,98 M45,102 L55,110 M48,114 L54,122
                         M72,34 L59,42 M76,46 L58,54 M78,58 L57,66 M78,72 L57,80 M76,86 L56,94 M70,100 L55,108 M64,114 L54,122
                         M54,140 Q44,145 38,153 M54,137 Q46,142 41,148 M54,140 Q64,145 70,153 M54,137 Q62,142 67,148"
                      stroke="rgba(255,255,255,0.72)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // 5. Right-Bent Asymmetric Feather (우측 굴곡 깃털)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="hd5_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
                        <stop offset="50%" stop-color="#f8fafc" stop-opacity="0.55"/>
                        <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.15"/>
                    </linearGradient>
                </defs>
                <path d="M80,14 C86,28 92,48 88,68 C84,88 74,106 62,124 C57,132 52,138 48,142 C47,138 45,128 42,118 C37,96 38,74 46,52 C54,34 66,20 80,14 Z" fill="url(#hd5_${id})"/>
                <path d="M80,14 C86,28 92,48 88,68 L80,72 L87,80 C82,96 73,112 62,124 L56,128 L61,135 C56,139 52,141 48,142 M48,142 C47,138 45,128 42,118 L48,114 L41,106 C36,88 38,70 46,52 L53,48 L46,42 C54,28 66,18 80,14" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
                <path d="M80,12 Q66,80 48,170" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                <path d="M48,142 L48,170" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                <path d="M51,46 L69,56 M47,58 L66,68 M45,70 L63,80 M44,82 L60,92 M45,94 L57,104 M47,106 L55,114 M48,116 L53,124
                         M87,42 L72,50 M89,54 L70,62 M87,66 L67,74 M83,78 L64,86 M78,90 L61,98 M71,102 L58,110 M63,114 L55,122
                         M48,140 Q38,145 32,153 M48,137 Q41,142 36,148 M48,140 Q58,145 64,153 M48,137 Q56,142 61,148"
                      stroke="rgba(255,255,255,0.72)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // 6. Left-Bent Asymmetric Feather (좌측 굴곡 깃털)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="hd6_${id}" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
                        <stop offset="50%" stop-color="#f8fafc" stop-opacity="0.55"/>
                        <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.15"/>
                    </linearGradient>
                </defs>
                <path d="M40,14 C34,28 28,48 32,68 C36,88 46,106 58,124 C63,132 68,138 72,142 C73,138 75,128 78,118 C83,96 82,74 74,52 C66,34 54,20 40,14 Z" fill="url(#hd6_${id})"/>
                <path d="M40,14 C34,28 28,48 32,68 L40,72 L33,80 C38,96 47,112 58,124 L64,128 L59,135 C64,139 68,141 72,142 M72,142 C73,138 75,128 78,118 L72,114 L79,106 C84,88 82,70 74,52 L67,48 L74,42 C66,28 54,18 40,14" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
                <path d="M40,12 Q54,80 72,170" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                <path d="M72,142 L72,170" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                <path d="M69,46 L51,56 M73,58 L54,68 M75,70 L57,80 M76,82 L60,92 M75,94 L63,104 M73,106 L65,114 M72,116 L67,124
                         M33,42 L48,50 M31,54 L50,62 M33,66 L53,74 M37,78 L56,86 M42,90 L59,98 M49,102 L62,110 M57,114 L65,122
                         M72,140 Q82,145 88,153 M72,137 Q79,142 84,148 M72,140 Q62,145 56,153 M72,137 Q64,142 59,148"
                      stroke="rgba(255,255,255,0.72)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // 7. Wild Fluffy Down Plumelet (사방으로 뻗친 아기 솜깃털)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="hd7_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
                        <stop offset="50%" stop-color="#fdf4ff" stop-opacity="0.5"/>
                        <stop offset="100%" stop-color="#c4b5fd" stop-opacity="0.15"/>
                    </linearGradient>
                </defs>
                <path d="M60,24 C72,34 82,48 84,66 C86,84 80,102 70,118 C66,124 62,130 58,136 C54,130 50,124 46,118 C36,102 30,84 32,66 C34,48 44,34 60,24 Z" fill="url(#hd7_${id})"/>
                <path d="M60,20 L58,164" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" fill="none"/>
                <path d="M58,136 L58,164" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" fill="none"/>
                <!-- Wild Fluffy Pen Hatching Curves -->
                <path d="M59,32 Q42,38 34,48 M59,44 Q38,50 28,62 M59,56 Q36,64 26,78 M59,68 Q38,76 30,90 M59,80 Q40,88 34,102 M59,92 Q44,98 38,112 M59,104 Q46,110 42,122 M59,116 Q49,122 46,130
                         M59,32 Q76,38 84,48 M59,44 Q80,50 90,62 M59,56 Q82,64 92,78 M59,68 Q80,76 88,90 M59,80 Q78,88 84,102 M59,92 Q74,98 80,112 M59,104 Q72,110 76,122 M59,116 Q69,122 72,130
                         M58,134 Q44,140 36,150 M58,130 Q47,136 41,144 M58,134 Q72,140 80,150 M58,130 Q69,136 75,144"
                      stroke="rgba(255,255,255,0.75)" stroke-width="0.85" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // 8. Classic Hand-Drawn Quill Pen Feather (핸드 드로잉 깃털펜 스타일)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="hd8_${id}" x1="20%" y1="0%" x2="80%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
                        <stop offset="50%" stop-color="#e2e8f0" stop-opacity="0.6"/>
                        <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.2"/>
                    </linearGradient>
                </defs>
                <path d="M60,6 C68,18 80,34 82,54 L74,58 L83,68 C84,86 78,104 68,122 L62,126 L67,134 C62,140 58,143 56,145 C54,142 50,135 46,126 L52,122 L44,114 C38,98 38,78 44,58 L52,54 L44,46 C48,28 54,16 60,6 Z" fill="url(#hd8_${id})"/>
                <path d="M60,6 C68,18 80,34 82,54 L74,58 L83,68 C84,86 78,104 68,122 L62,126 L67,134 C62,140 58,143 56,145 M56,145 C54,142 50,135 46,126 L52,122 L44,114 C38,98 38,78 44,58 L52,54 L44,46 C48,28 54,16 60,6" stroke="#ffffff" stroke-width="1.3" stroke-linejoin="round" fill="none"/>
                <!-- Prominent Quill Nib / Shaft -->
                <path d="M60,4 L56,174" stroke="#ffffff" stroke-width="1.9" stroke-linecap="round" fill="none"/>
                <path d="M56,145 L56,174" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" fill="none"/>
                <!-- Nib split slit -->
                <path d="M56,166 L56,174" stroke="rgba(180,200,230,0.9)" stroke-width="0.9" fill="none"/>
                <path d="M48,32 L58,42 M44,46 L58,56 M42,60 L57,70 M42,74 L57,84 M45,88 L57,98 M48,102 L56,112 M51,116 L56,124
                         M75,28 L59,38 M80,42 L59,52 M81,56 L58,66 M80,70 L58,80 M77,84 L57,94 M71,98 L57,108 M65,112 L56,122
                         M56,143 Q44,148 38,156 M56,140 Q47,144 42,150 M56,143 Q68,148 74,156 M56,140 Q65,144 70,150"
                      stroke="rgba(255,255,255,0.72)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            </svg>
        `
    ];

    // Generate feathers with depth-of-field variety
    for (let i = 0; i < featherCount; i++) {
        const featherDiv = document.createElement("div");
        featherDiv.className = "feather";
        
        // Pick random feather template
        const templateIdx = i % featherTemplates.length;
        featherDiv.innerHTML = featherTemplates[templateIdx](i);

        // Natural depth distribution (Foreground, Midground, Background)
        const depthTier = Math.random();
        let size, opacity, blurVal;

        if (depthTier < 0.2) {
            // Foreground (large, sharp, prominent)
            size = anime.random(46, 66);
            opacity = anime.random(75, 95) / 100;
            blurVal = 0;
            featherDiv.style.zIndex = "5";
        } else if (depthTier < 0.7) {
            // Midground (standard drifting)
            size = anime.random(30, 44);
            opacity = anime.random(45, 75) / 100;
            blurVal = 0;
            featherDiv.style.zIndex = "3";
        } else {
            // Background (tiny, soft atmospheric depth)
            size = anime.random(16, 26);
            opacity = anime.random(25, 45) / 100;
            blurVal = anime.random(0.5, 1.2);
            featherDiv.style.zIndex = "1";
        }

        featherDiv.style.width = `${size}px`;
        featherDiv.style.height = `${size * 1.5}px`;
        featherDiv.style.left = `${anime.random(1, 98)}%`;
        featherDiv.style.top = `${anime.random(1, 98)}%`;

        if (blurVal > 0) {
            featherDiv.style.filter = `drop-shadow(0 2px 6px rgba(200, 215, 255, 0.2)) blur(${blurVal}px)`;
        }

        const initialRotation = anime.random(-60, 60);
        featherDiv.style.transform = `rotate(${initialRotation}deg)`;
        featherDiv.style.opacity = opacity;

        featherContainer.appendChild(featherDiv);
        feathers.push(featherDiv);
    }

    // Natural multi-axis swaying & floating animation for feathers
    const driftAnimation = anime({
        targets: '.feather',
        translateX: () => anime.random(-25, 25),
        translateY: () => anime.random(-35, 35),
        rotate: () => `+=${anime.random(-35, 35)}`,
        scaleY: () => anime.random(90, 105) / 100, // 3D tilt fluttering effect
        duration: () => anime.random(4000, 7500),
        delay: () => anime.random(0, 3000),
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // ----------------------------------------------------
    // 2. Three.js WebGL 3D Planets Integration
    // ----------------------------------------------------
    let moonMesh, earthMesh;
    let moonRenderer, earthRenderer;
    let moonScene, earthScene;
    let moonCamera, earthCamera;



    // --- PROCEDURAL FANTASY TEXTURE GENERATORS ---
    
    // Generates a Silver-White Marble Moon with gold craters for a celestial vibe
    function createMoonTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // 1. Soft silver-white gradient base
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, '#f8fafc');
        grad.addColorStop(0.5, '#e2e8f0');
        grad.addColorStop(1, '#cbd5e1');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // 2. Delicate marble veins (fractured sacred lines)
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * 512, 0);
            ctx.bezierCurveTo(
                Math.random() * 512, Math.random() * 256,
                Math.random() * 512, 256 + Math.random() * 256,
                Math.random() * 512, 512
            );
            ctx.stroke();
        }

        // 3. Golden craters (magical impact markings)
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const r = 12 + Math.random() * 28;

            const goldGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
            goldGrad.addColorStop(0, 'rgba(253, 224, 71, 0.15)'); // soft gold center
            goldGrad.addColorStop(0.8, 'rgba(234, 179, 8, 0.05)');
            goldGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = goldGrad;
            ctx.fill();

            // Gold rim ring
            ctx.strokeStyle = 'rgba(234, 179, 8, 0.22)';
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }

        // 4. White stardust sparkles
        for (let i = 0; i < 600; i++) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
            ctx.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
        }

        return new THREE.CanvasTexture(canvas);
    }

    // Generates a cosmic nebula Earth with aurora currents and golden star ash
    function createEarthTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // 1. Deep cosmic ocean base
        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, 1024, 512);

        const seaGrad = ctx.createRadialGradient(512, 256, 120, 512, 256, 550);
        seaGrad.addColorStop(0, '#0b1e3d');
        seaGrad.addColorStop(0.6, '#13284d');
        seaGrad.addColorStop(1, '#02040a');
        ctx.fillStyle = seaGrad;
        ctx.fillRect(0, 0, 1024, 512);

        // 2. Swirling emerald/cyan ether auroras (replacing static landmasses)
        for (let i = 0; i < 14; i++) {
            const cx = 100 + Math.random() * 824;
            const cy = 100 + Math.random() * 312;
            const rx = 160 + Math.random() * 240;
            const ry = 70 + Math.random() * 110;

            const etherGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
            etherGrad.addColorStop(0, 'rgba(16, 185, 129, 0.25)'); // glowing emerald green
            etherGrad.addColorStop(0.4, 'rgba(6, 182, 212, 0.16)'); // cyan blue flow
            etherGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.save();
            ctx.translate(cx, cy);
            ctx.scale(1, ry / rx); // stretch into horizontal flows
            ctx.beginPath();
            ctx.arc(0, 0, rx, 0, Math.PI * 2);
            ctx.fillStyle = etherGrad;
            ctx.fill();
            ctx.restore();
        }

        // 3. Golden stellar dust belts orbiting along the equator
        ctx.fillStyle = 'rgba(253, 224, 71, 0.65)';
        for (let i = 0; i < 350; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const size = 1.2 + Math.random() * 2.2;
            
            // Limit coordinate distribution to create a celestial belt flow
            if (Math.abs(y - 256) < 160) {
                ctx.fillStyle = Math.random() > 0.5 ? 'rgba(253, 224, 71, 0.7)' : 'rgba(255, 255, 255, 0.75)';
                ctx.fillRect(x, y, size, size);
            }
        }

        // 4. Ethereal atmospheric cloud dust
        for (let i = 0; i < 8; i++) {
            const cx = Math.random() * 1024;
            const cy = Math.random() * 512;
            const r = 90 + Math.random() * 180;

            const cloudGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
            cloudGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
            cloudGrad.addColorStop(0.5, 'rgba(167, 139, 250, 0.08)'); // soft celestial purple clouds
            cloudGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = cloudGrad;
            ctx.fill();
        }

        return new THREE.CanvasTexture(canvas);
    }

    // --- SECURE LOCAL TEXTURE BINDER (Bypasses local file:// CORS blocks) ---
    function setupPlanetTexture(imgId, material, fallbackFunc, property = 'map') {
        const img = document.getElementById(imgId);
        if (!img) {
            material[property] = fallbackFunc();
            material.needsUpdate = true;
            return;
        }

        const apply = () => {
            try {
                // Convert the preloaded browser image tag into a ThreeJS Texture
                const texture = new THREE.Texture(img);
                texture.needsUpdate = true;
                material[property] = texture;
                material.needsUpdate = true;
            } catch (e) {
                // If browser local security still blocks the bitmap mapping, apply procedural canvas texture
                material[property] = fallbackFunc();
                material.needsUpdate = true;
            }
        };

        if (img.complete && img.naturalWidth !== 0) {
            apply();
        } else {
            img.onload = apply;
            img.onerror = () => {
                // Fail-safe trigger: fall back to magical gradients
                material[property] = fallbackFunc();
                material.needsUpdate = true;
            };
        }
    }

    function init3DPlanets() {
        const isMobile = window.innerWidth <= 900;
        const isLocalFile = window.location.protocol === 'file:';
        
        // Define exact sizing boundaries for desktop/mobile
        const moonSize = isMobile ? 140 : 220;
        const earthSize = isMobile ? 1000 : 1800;

        const textureLoader = new THREE.TextureLoader();

        // --- A. MOON 3D SETUP ---
        const moonContainer = document.getElementById("moon-canvas-container");
        
        moonScene = new THREE.Scene();
        moonCamera = new THREE.PerspectiveCamera(45, 1.0, 0.1, 1000);
        moonCamera.position.z = 2.8;

        moonRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        moonRenderer.setSize(moonSize, moonSize);
        moonRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        moonContainer.appendChild(moonRenderer.domElement);

        // Moon Lights
        const moonAmbient = new THREE.AmbientLight(0xffffff, 0.22);
        moonScene.add(moonAmbient);

        const moonDirectional = new THREE.DirectionalLight(0xfff5e6, 1.4);
        moonDirectional.position.set(5, 3, 5);
        moonScene.add(moonDirectional);

        // Moon material setup
        const moonMaterial = new THREE.MeshStandardMaterial({
            roughness: 0.95,
            metalness: 0.02,
            transparent: true,
            opacity: 0.85
        });

        // Smart CORS Bypass check: If loaded via file:// protocol directly, enforce offline procedural texture
        if (isLocalFile) {
            moonMaterial.map = createMoonTexture();
            moonMaterial.needsUpdate = true;
        } else {
            // If running on a local web server (http://), load custom images safely
            setupPlanetTexture("img-moon", moonMaterial, createMoonTexture);
        }

        const moonGeometry = new THREE.SphereGeometry(1, 64, 64);
        moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonScene.add(moonMesh);


        // --- B. EARTH 3D SETUP ---
        const earthContainer = document.getElementById("earth-canvas-container");
        
        earthScene = new THREE.Scene();
        earthCamera = new THREE.PerspectiveCamera(40, 1.0, 0.1, 1000);
        earthCamera.position.z = 3.25;

        earthRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        earthRenderer.setSize(earthSize, earthSize);
        earthRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        earthContainer.appendChild(earthRenderer.domElement);

        // Earth Lights
        const earthAmbient = new THREE.AmbientLight(0x567bfa, 0.35); // Slight blue/purple space shadow tone
        earthScene.add(earthAmbient);

        const earthDirectional = new THREE.DirectionalLight(0xffffff, 1.8);
        earthDirectional.position.set(2, 5, 4);
        earthScene.add(earthDirectional);

        // Earth material setup
        const earthMaterial = new THREE.MeshStandardMaterial({
            roughness: 0.65,
            metalness: 0.05,
            transparent: true,
            opacity: 0.88
        });

        if (isLocalFile) {
            // Apply offline procedural fantasy texture for local files to bypass CORS crash
            earthMaterial.map = createEarthTexture();
            earthMaterial.needsUpdate = true;
        } else {
            // Use earth_night.jpg as the primary map for a unified dark fantasy night globe
            setupPlanetTexture("img-earth-night", earthMaterial, createEarthTexture);
            
            // Set emissive brightness, then bind Earth Night lights to emissiveMap for glowing cities
            earthMaterial.emissive = new THREE.Color(0xbbbbbb);
            setupPlanetTexture("img-earth-night", earthMaterial, () => null, "emissiveMap");
        }

        const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
        earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        earthScene.add(earthMesh);

        // Tilt earth axis (23.5 degrees)
        earthMesh.rotation.z = 0.41;

        // Resize callback
        window.addEventListener("resize", handleResize);

        // Run rendering tick
        tickPlanets();
    }

    function handleResize() {
        const isMobile = window.innerWidth <= 900;

        const moonSize = isMobile ? 140 : 220;
        const earthSize = isMobile ? 1000 : 1800;

        // Update Moon
        if (moonRenderer && moonCamera) {
            moonCamera.aspect = 1.0;
            moonCamera.updateProjectionMatrix();
            moonRenderer.setSize(moonSize, moonSize);
        }

        // Update Earth
        if (earthRenderer && earthCamera) {
            earthCamera.aspect = 1.0;
            earthCamera.updateProjectionMatrix();
            earthRenderer.setSize(earthSize, earthSize);
        }
    }

    // 3D Rendering & Interaction Loop
    function tickPlanets() {
        requestAnimationFrame(tickPlanets);

        // 자전
        if (moonMesh) {
            moonMesh.rotation.y += 0.0004;
        }
        if (earthMesh) {
            earthMesh.rotation.y += 0.0001;
        }



        // 렌더링
        if (moonRenderer && moonScene && moonCamera) {
            moonRenderer.render(moonScene, moonCamera);
        }
        if (earthRenderer && earthScene && earthCamera) {
            earthRenderer.render(earthScene, earthCamera);
        }
    }

    // Pre-initialize 3D scene immediately
    init3DPlanets();

    // ----------------------------------------------------
    // 3. Intro Click Event - Feather Scatter Physics
    // ----------------------------------------------------
    introScreen.addEventListener("click", (e) => {
        driftAnimation.pause();

        const clickX = e.clientX;
        const clickY = e.clientY;

        feathers.forEach((feather) => {
            const rect = feather.getBoundingClientRect();
            const featherX = rect.left + rect.width / 2;
            const featherY = rect.top + rect.height / 2;

            let angle = Math.atan2(featherY - clickY, featherX - clickX);
            if (featherX === clickX && featherY === clickY) {
                angle = Math.random() * Math.PI * 2;
            }
            
            const distance = anime.random(600, 1200);
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;
            const targetRotate = anime.random(-720, 720);

            anime({
                targets: feather,
                translateX: targetX,
                translateY: targetY,
                rotate: targetRotate,
                scale: 0.1,
                opacity: 0,
                duration: anime.random(1200, 1800),
                easing: 'easeOutExpo'
            });
        });

        anime({
            targets: '#intro-content',
            opacity: 0,
            translateY: -100,
            duration: 800,
            easing: 'easeInQuad'
        });

        anime({
            targets: '#intro-screen',
            opacity: 0,
            duration: 1500,
            easing: 'easeOutQuad',
            complete: () => {
                introScreen.classList.add("hidden");
                revealMainPage();
            }
        });
    });

    // ----------------------------------------------------
    // 4. Reveal Main Space Container
    // ----------------------------------------------------
    function revealMainPage() {
        mainContainer.classList.remove("hidden");
        
        // Setup initial position for reveal fly-in
        anime.set('.moon-wrapper', { translateY: -250, opacity: 0 });
        anime.set('.earth-wrapper', { translateY: 350, opacity: 0 });
        anime.set('.orbit-line-wrapper', { scaleX: 0, opacity: 0 });

        // Trigger ThreeJS resize once visible to match canvas dimensions exactly
        handleResize();

        const entryTimeline = anime.timeline({
            easing: 'easeOutQuint',
            duration: 1600
        });

        entryTimeline
            .add({
                targets: '.moon-wrapper',
                translateY: 0,
                opacity: 1,
            }, 100)
            .add({
                targets: '.earth-wrapper',
                translateY: 0,
                opacity: 1,
            }, 200)
            .add({
                targets: '.orbit-line-wrapper',
                scaleX: [0, 1],
                opacity: [0, 1],
                delay: anime.stagger(180),
                duration: 1200,
                easing: 'easeOutExpo',
                complete: () => {
                    startPerpetualAnimations();
                }
            }, 400);
    }

    // ----------------------------------------------------
    // 5. Perpetual Moon Glow and Earth Floating Loops
    // ----------------------------------------------------
    function startPerpetualAnimations() {
        // Pulsing Moon Glow
        anime({
            targets: '.moon-glow',
            scale: [1, 1.18, 1],
            opacity: [0.7, 1, 0.7],
            duration: 5000,
            loop: true,
            easing: 'easeInOutSine'
        });
        
        // Gentle float animation on Earth wrapping container
        anime({
            targets: '.earth-wrapper',
            translateY: [0, -10, 0],
            duration: 8000,
            loop: true,
            easing: 'easeInOutQuad'
        });
    }

    // ----------------------------------------------------
    // 6. Interactive Orbits & Layer Selection
    // ----------------------------------------------------
    const orbitWrappers = document.querySelectorAll(".orbit-line-wrapper");
    orbitWrappers.forEach((wrapper) => {
        wrapper.addEventListener("click", () => {
            const layerNum = wrapper.getAttribute("data-layer");
            openDetailView(layerNum);
        });
    });

    // Transition into Layer Detail card Overlay
    function openDetailView(layerNum) {
        const exitTimeline = anime.timeline({
            easing: 'easeOutExpo',
            duration: 900
        });

        exitTimeline
            .add({
                targets: '.moon-wrapper',
                translateY: -250,
                opacity: 0
            }, 0)
            .add({
                targets: '.earth-wrapper',
                translateY: 350,
                opacity: 0
            }, 0)
            .add({
                targets: '.orbit-line-wrapper',
                opacity: 0,
                scale: 0.8,
                delay: anime.stagger(60)
            }, 0)
            .add({
                targets: '#detail-container',
                opacity: [0, 1],
                begin: () => {
                    detailContainer.classList.remove("hidden");
                    document.querySelectorAll(".detail-card").forEach(card => card.classList.remove("active"));
                    document.getElementById(`detail-${layerNum}`).classList.add("active");
                }
            }, 300)
            .add({
                targets: `#detail-${layerNum}`,
                translateY: [100, 0],
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeOutElastic(1, .8)'
            }, 450)
            .add({
                targets: '.close-btn',
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 500
            }, 600);
    }

    // Transition back from Detail card Overlay to Space View
    closeBtn.addEventListener("click", () => {
        const activeCard = document.querySelector(".detail-card.active");
        
        const returnTimeline = anime.timeline({
            easing: 'easeOutExpo',
            duration: 800
        });

        returnTimeline
            .add({
                targets: activeCard,
                translateY: 100,
                opacity: 0,
                duration: 600
            }, 0)
            .add({
                targets: '.close-btn',
                opacity: 0,
                duration: 400
            }, 0)
            .add({
                targets: '#detail-container',
                opacity: 0,
                complete: () => {
                    detailContainer.classList.add("hidden");
                }
            }, 200)
            .add({
                targets: '.moon-wrapper',
                translateY: 0,
                opacity: 1
            }, 350)
            .add({
                targets: '.earth-wrapper',
                translateY: 0,
                opacity: 1
            }, 350)
            .add({
                targets: '.orbit-line-wrapper',
                opacity: 1,
                scale: 1,
                delay: anime.stagger(60)
            }, 350);
    });
});
