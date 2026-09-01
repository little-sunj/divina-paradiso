document.addEventListener("DOMContentLoaded", () => {
    const introScreen = document.getElementById("intro-screen");
    const introContent = document.getElementById("intro-content");
    const featherContainer = document.getElementById("feather-container");
    const mainContainer = document.getElementById("main-container");
    const detailContainer = document.getElementById("detail-container");
    const closeBtn = document.querySelector(".close-btn");
    
    // ----------------------------------------------------
    // ----------------------------------------------------
    // 1. Generate Realistic Anatomical SVG Feathers for Intro Screen
    // ----------------------------------------------------
    const featherCount = 70;
    const feathers = [];

    // 4 Ultra-Realistic Feather SVG Templates with Notches, Quill Shafts, Downy Fluff, and Barb Textures
    const featherTemplates = [
        // Type 1: High-Fantasy Archangel Primary Flight Feather (갈라진 깃홈과 깃가지 결이 섬세한 주익깃)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="rf_grad1_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                        <stop offset="35%" stop-color="#f8fafc" stop-opacity="0.85"/>
                        <stop offset="70%" stop-color="#e2e8f0" stop-opacity="0.6"/>
                        <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.25"/>
                    </linearGradient>
                    <linearGradient id="rf_spine_${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                        <stop offset="80%" stop-color="#e2e8f0" stop-opacity="0.9"/>
                        <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.6"/>
                    </linearGradient>
                </defs>
                <!-- Feather Silhouette with Deep Barbs Notches (갈라진 깃털 톱니홈) -->
                <path d="M60,12 
                         C65,22 72,32 78,44 
                         L71,48 L79,56 
                         C82,68 83,80 81,94 
                         L73,98 L80,106 
                         C77,118 70,128 62,138 
                         C60,140 59,142 58,144
                         C57,143 55,138 52,132 
                         L56,128 L49,122 
                         C43,110 39,96 38,82 
                         L44,78 L38,72 
                         C39,58 43,44 50,30 
                         C54,22 57,16 60,12 Z" 
                      fill="url(#rf_grad1_${id})"/>
                <!-- Central Rachis & Calamus Shaft (중심 깃대 대롱) -->
                <path d="M60,10 Q59,80 58,168" stroke="url(#rf_spine_${id})" stroke-width="1.6" stroke-linecap="round" fill="none"/>
                <path d="M58,144 L58,168" stroke="rgba(255,255,255,0.95)" stroke-width="2.2" stroke-linecap="round" fill="none"/>
                <!-- Downy fluff at base (하단 솜털 가닥들) -->
                <path d="M58,142 Q50,146 45,152 M58,140 Q52,143 48,148 M58,138 Q65,143 70,150 M58,136 Q64,140 68,145" stroke="rgba(255,255,255,0.7)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
                <!-- Fine Feather Barb Strands (촘촘한 빗살 깃가지 결) -->
                <path d="M47,38 L59,46 M44,52 L59,60 M41,66 L59,74 M41,80 L59,88 M43,96 L58,104 M47,110 L58,118 M51,124 L58,130
                         M73,32 L60,40 M76,46 L60,54 M79,62 L60,70 M81,78 L59,86 M80,92 L59,100 M75,108 L59,116 M68,122 L58,130" 
                      stroke="rgba(255,255,255,0.35)" stroke-width="0.75" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // Type 2: Wind-Swept Asymmetric Quill (바람에 휘날리는 비대칭 주익 깃털)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="rf_grad2_${id}" x1="10%" y1="0%" x2="90%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                        <stop offset="35%" stop-color="#f1f5f9" stop-opacity="0.8"/>
                        <stop offset="75%" stop-color="#e0e7ff" stop-opacity="0.55"/>
                        <stop offset="100%" stop-color="#c7d2fe" stop-opacity="0.2"/>
                    </linearGradient>
                </defs>
                <!-- Curving Asymmetric Silhouette with Notches -->
                <path d="M68,10 
                         C74,22 84,38 86,56 
                         L78,60 L85,68 
                         C86,84 81,102 70,118 
                         L64,121 L69,127
                         C63,135 57,141 52,146 
                         C51,145 50,140 48,134 
                         L53,130 L46,124 
                         C39,108 38,90 41,72 
                         L48,68 L42,62 
                         C46,44 54,26 68,10 Z" 
                      fill="url(#rf_grad2_${id})"/>
                <!-- Curved Shaft & Calamus -->
                <path d="M68,8 Q60,75 50,170" stroke="rgba(255,255,255,0.92)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                <path d="M51,146 L50,170" stroke="rgba(255,255,255,0.95)" stroke-width="2.2" stroke-linecap="round" fill="none"/>
                <!-- Base Fluff -->
                <path d="M51,144 Q42,148 36,155 M51,142 Q44,146 40,150 M51,140 Q58,145 64,152 M51,138 Q57,142 62,147" stroke="rgba(255,255,255,0.7)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
                <!-- Herringbone Barbs -->
                <path d="M49,34 L65,44 M45,48 L63,58 M43,64 L61,74 M43,80 L59,90 M46,96 L57,106 M49,112 L55,122
                         M79,32 L67,42 M83,48 L65,58 M85,64 L63,74 M84,80 L61,90 M78,96 L59,106 M71,112 L56,122" 
                      stroke="rgba(255,255,255,0.36)" stroke-width="0.75" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // Type 3: Soft Angelic Down Feather (사방으로 흩날리는 부드러운 솜깃털)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="rf_grad3_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                        <stop offset="40%" stop-color="#fdf4ff" stop-opacity="0.8"/>
                        <stop offset="80%" stop-color="#e0e7ff" stop-opacity="0.5"/>
                        <stop offset="100%" stop-color="#d8b4fe" stop-opacity="0.2"/>
                    </linearGradient>
                </defs>
                <!-- Multi-Fringed Fluffy Body -->
                <path d="M60,16 
                         C66,26 76,36 82,48 
                         L74,52 L83,60 
                         C86,72 84,86 78,98 
                         L70,102 L78,110 
                         C72,122 64,132 56,140 
                         C55,138 52,134 48,128 
                         L54,124 L46,118 
                         C40,106 38,92 41,78 
                         L49,74 L42,68 
                         C44,54 50,38 60,16 Z" 
                      fill="url(#rf_grad3_${id})"/>
                <!-- Thin Shaft & Calamus -->
                <path d="M60,14 L56,166" stroke="rgba(255,255,255,0.9)" stroke-width="1.3" stroke-linecap="round" fill="none"/>
                <path d="M56,140 L56,166" stroke="rgba(255,255,255,0.95)" stroke-width="2.0" stroke-linecap="round" fill="none"/>
                <!-- Rich Downy Fluff Tufts (사방으로 흩날리는 솜털) -->
                <path d="M57,138 Q46,144 38,154 M57,135 Q48,141 42,148 M57,130 Q47,136 40,143
                         M57,138 Q68,144 76,154 M57,135 Q66,141 72,148 M57,130 Q67,136 74,143
                         M45,46 C52,49 56,53 59,56 M42,60 C50,63 55,67 58,70 M43,76 C51,79 55,83 58,86 M45,92 C52,95 55,98 57,102
                         M76,46 C69,49 65,53 61,56 M78,60 C70,63 65,67 61,70 M75,76 C67,79 63,83 60,86 M72,92 C65,95 62,98 59,102" 
                      stroke="rgba(255,255,255,0.45)" stroke-width="0.85" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // Type 4: Seraphim Grand Primary Feather (세라핌의 웅장한 대형 주익 깃털)
        (id) => `
            <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="rf_grad4_${id}" x1="30%" y1="0%" x2="70%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                        <stop offset="35%" stop-color="#f8fafc" stop-opacity="0.82"/>
                        <stop offset="70%" stop-color="#cbd5e1" stop-opacity="0.55"/>
                        <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.2"/>
                    </linearGradient>
                </defs>
                <!-- Distinct Notched Wing Vanes -->
                <path d="M60,8 
                         C67,18 78,32 84,48 
                         L76,52 L85,62 
                         C88,78 84,94 76,110 
                         L68,114 L76,122 
                         C70,132 63,140 57,146 
                         C56,144 53,138 48,130 
                         L54,126 L46,120 
                         C38,104 36,86 40,68 
                         L48,64 L41,56 
                         C44,40 51,22 60,8 Z" 
                      fill="url(#rf_grad4_${id})"/>
                <!-- Strong Quill Rachis & Hollow Calamus -->
                <path d="M60,6 L57,172" stroke="rgba(255,255,255,0.95)" stroke-width="1.7" stroke-linecap="round" fill="none"/>
                <path d="M57,146 L57,172" stroke="rgba(255,255,255,0.98)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
                <ellipse cx="57" cy="171" rx="1.3" ry="0.6" fill="rgba(200,210,230,0.8)"/>
                <!-- Downy Fluff & Detailed Barbs -->
                <path d="M57,144 Q46,149 40,158 M57,141 Q49,145 44,152 M57,144 Q68,149 74,158 M57,141 Q65,145 70,152" stroke="rgba(255,255,255,0.72)" stroke-width="0.85" stroke-linecap="round" fill="none"/>
                <path d="M47,32 L59,42 M43,46 L59,56 M41,60 L59,70 M41,74 L58,84 M43,88 L58,98 M46,102 L58,112 M50,116 L57,126
                         M75,28 L60,38 M80,42 L60,52 M83,56 L59,66 M83,70 L59,80 M80,84 L59,94 M74,98 L58,108 M67,112 L58,122" 
                      stroke="rgba(255,255,255,0.38)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
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
